'use client';

import { createContext, useCallback, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import {
  cohorts as defaultCohorts,
  moduleBlocks as defaultModuleBlocks,
  modules as defaultModules,
} from './data';
import type { Cohort, Module, ModuleBlock } from './types';

interface DemoDataContextValue {
  moduleBlocks: ModuleBlock[];
  modules: Module[];
  cohorts: Cohort[];
  setModuleBlocks: (blocks: ModuleBlock[]) => void;
  setModules: (modules: Module[]) => void;
  setCohorts: (cohorts: Cohort[]) => void;
  resetToDefaults: () => void;
}

const DemoDataContext = createContext<DemoDataContextValue | null>(null);

export function DemoDataProvider({ children }: { children: ReactNode }) {
  const [moduleBlocks, setModuleBlocks] = useState<ModuleBlock[]>(defaultModuleBlocks);
  const [modules, setModules] = useState<Module[]>(defaultModules);
  const [cohorts, setCohorts] = useState<Cohort[]>(defaultCohorts);

  const resetToDefaults = useCallback(() => {
    setModuleBlocks(defaultModuleBlocks);
    setModules(defaultModules);
    setCohorts(defaultCohorts);
  }, []);

  return (
    <DemoDataContext.Provider
      value={{
        moduleBlocks,
        modules,
        cohorts,
        setModuleBlocks,
        setModules,
        setCohorts,
        resetToDefaults,
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
