'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import {
  cohorts as defaultCohorts,
  launchPackages as defaultLaunchPackages,
  moduleBlocks as defaultModuleBlocks,
  modules as defaultModules,
} from './data';
import type { Cohort, LaunchPackage, Module, ModuleBlock } from './types';

const STORAGE_KEY = 'sapiens-subscription-toolkit-admin-data-v2';

interface PersistedDemoData {
  moduleBlocks: ModuleBlock[];
  modules: Module[];
  cohorts: Cohort[];
  launchPackages: LaunchPackage[];
}

interface DemoDataContextValue extends PersistedDemoData {
  setModuleBlocks: (blocks: ModuleBlock[]) => void;
  setModules: (modules: Module[]) => void;
  setCohorts: (cohorts: Cohort[]) => void;
  setLaunchPackages: (packages: LaunchPackage[]) => void;
  resetToDefaults: () => void;
  knowledgeSnapshot: string;
}

const DemoDataContext = createContext<DemoDataContextValue | null>(null);

function defaultData(): PersistedDemoData {
  return {
    moduleBlocks: defaultModuleBlocks,
    modules: defaultModules,
    cohorts: defaultCohorts,
    launchPackages: defaultLaunchPackages,
  };
}

function isPersistedDemoData(value: unknown): value is PersistedDemoData {
  if (!value || typeof value !== 'object') return false;
  const candidate = value as Partial<PersistedDemoData>;
  return (
    Array.isArray(candidate.moduleBlocks) &&
    Array.isArray(candidate.modules) &&
    Array.isArray(candidate.cohorts) &&
    Array.isArray(candidate.launchPackages)
  );
}

function buildKnowledgeSnapshot(data: PersistedDemoData): string {
  const moduleNames = new Map(data.modules.map((module) => [module.id, module.name]));
  const packageNames = new Map(data.launchPackages.map((pkg) => [pkg.id, pkg.name]));

  const cohortLines = data.cohorts.map((cohort) => {
    const modules = cohort.recommendedModuleIds
      .map((id) => moduleNames.get(id) ?? id)
      .join(', ');
    const pkg = packageNames.get(cohort.recommendedPackageId) ?? cohort.recommendedPackageId;
    return `- ${cohort.name}: ${cohort.tagline}. Path: ${cohort.recommendedPath}. Package: ${pkg}. GWP: ${cohort.gwpRange}. Recommended modules: ${modules}. Sales rationale: ${cohort.salesRationale}`;
  });

  const packageLines = data.launchPackages.map((pkg) => {
    const modules = pkg.modules.map((id) => moduleNames.get(id) ?? id).join(', ');
    return `- ${pkg.name}: ${pkg.valueProposition}. Target cohorts: ${pkg.targetCohorts.join(', ')}. Modules: ${modules}. Guardrail: ${pkg.guardrail}`;
  });

  return [
    'ADMIN-CONFIGURED SALES KNOWLEDGE',
    'These cohorts, package assignments and module relationships come from the in-app admin controls and should be used when giving sales advice.',
    '',
    'Cohort → package → product fit branches',
    ...cohortLines,
    '',
    'Proposal packages',
    ...packageLines,
  ].join('\n');
}

function loadInitialData(): PersistedDemoData {
  if (typeof window === 'undefined') return defaultData();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultData();
    const parsed = JSON.parse(raw);
    return isPersistedDemoData(parsed) ? parsed : defaultData();
  } catch {
    return defaultData();
  }
}

export function DemoDataProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<PersistedDemoData>(() => loadInitialData());

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      // Ignore storage failures; the toolkit still works for the current session.
    }
  }, [data]);

  const setModuleBlocks = useCallback((moduleBlocks: ModuleBlock[]) => {
    setData((current) => ({ ...current, moduleBlocks }));
  }, []);

  const setModules = useCallback((modules: Module[]) => {
    setData((current) => ({ ...current, modules }));
  }, []);

  const setCohorts = useCallback((cohorts: Cohort[]) => {
    setData((current) => ({ ...current, cohorts }));
  }, []);

  const setLaunchPackages = useCallback((launchPackages: LaunchPackage[]) => {
    setData((current) => ({ ...current, launchPackages }));
  }, []);

  const resetToDefaults = useCallback(() => {
    setData(defaultData());
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // noop
    }
  }, []);

  const knowledgeSnapshot = useMemo(() => buildKnowledgeSnapshot(data), [data]);

  return (
    <DemoDataContext.Provider
      value={{
        ...data,
        setModuleBlocks,
        setModules,
        setCohorts,
        setLaunchPackages,
        resetToDefaults,
        knowledgeSnapshot,
      }}
    >
      {children}
    </DemoDataContext.Provider>
  );
}

export function useDemoData(): DemoDataContextValue {
  const context = useContext(DemoDataContext);
  if (!context) {
    throw new Error('useDemoData must be used within a DemoDataProvider');
  }
  return context;
}

export { DemoDataContext };
