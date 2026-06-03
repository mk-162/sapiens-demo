'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  benchmarkConfigs,
  cohorts,
  getBlockById,
  getCohortById,
  getModuleById,
  getPackageById,
  launchPackages,
  moduleBlocks,
  modules,
} from '@/lib/data';
import {
  F_SCALE_REFERENCE_GWP,
  calculatePricing,
  formatCurrency,
  formatGWP,
} from '@/lib/pricing';
import type { ModuleBlockId } from '@/lib/types';
import BrandLogo from '../components/BrandLogo';
import HelpHint from '../components/HelpHint';

const GWP_MIN = 30_000_000;
const GWP_MAX = 5_000_000_000;
const GWP_STEP = 10_000_000;

const FOUNDATIONAL_CORE_IDS = modules
  .filter((m) => m.block === 'foundational-core')
  .map((m) => m.id);

const DEFAULT_COHORT_ID = 'midmarket';

const HOW_TO_STEPS = [
  {
    n: 1,
    title: 'Pick a cohort',
    body: 'Choose the customer profile you are pitching to. A starting GWP and recommended module set load automatically.',
  },
  {
    n: 2,
    title: 'Load a package or benchmark',
    body: 'Apply Sapiens Horizon or Intelligent — or jump to a fully calibrated benchmark scenario.',
  },
  {
    n: 3,
    title: 'Tailor & quote',
    body: 'Adjust GWP and toggle add-on modules. Watch ARR recalculate, then generate a quote preview to share.',
  },
];

function uniq(ids: string[]): string[] {
  return Array.from(new Set(ids));
}

function applyCohort(cohortId: string): {
  selectedModuleIds: string[];
  gwp: number;
} {
  const cohort = getCohortById(cohortId);
  if (!cohort) {
    return { selectedModuleIds: FOUNDATIONAL_CORE_IDS, gwp: 450_000_000 };
  }
  return {
    selectedModuleIds: uniq([
      ...FOUNDATIONAL_CORE_IDS,
      ...cohort.recommendedModuleIds,
    ]),
    gwp: cohort.gwpMidpoint,
  };
}

function applyPackage(packageId: string, currentModuleIds: string[]): string[] {
  const pkg = getPackageById(packageId);
  if (!pkg) return currentModuleIds;
  return uniq([...FOUNDATIONAL_CORE_IDS, ...pkg.modules]);
}

export default function ConfiguratorClient() {
  const searchParams = useSearchParams();
  const cohortParam = searchParams.get('cohort');
  const packageParam = searchParams.get('package');

  const initialCohortId =
    cohortParam && getCohortById(cohortParam)
      ? cohortParam
      : DEFAULT_COHORT_ID;
  const initialState = applyCohort(initialCohortId);
  const initialPackageId =
    packageParam && getPackageById(packageParam) ? packageParam : null;
  const initialModuleIds = initialPackageId
    ? applyPackage(initialPackageId, initialState.selectedModuleIds)
    : initialState.selectedModuleIds;

  const [selectedCohortId, setSelectedCohortId] = useState(initialCohortId);
  const [selectedModuleIds, setSelectedModuleIds] =
    useState<string[]>(initialModuleIds);
  const [gwp, setGwp] = useState<number>(initialState.gwp);
  const [activePresetPackageId, setActivePresetPackageId] = useState<
    string | null
  >(initialPackageId);
  const [activeBenchmarkId, setActiveBenchmarkId] = useState<string | null>(
    null,
  );
  const [quoteVisible, setQuoteVisible] = useState(false);
  const [howToOpen, setHowToOpen] = useState(true);
  const quotePreviewRef = useRef<HTMLDivElement | null>(null);

  const cohort = getCohortById(selectedCohortId);
  const pricing = useMemo(
    () => calculatePricing(selectedModuleIds, gwp),
    [selectedModuleIds, gwp],
  );

  useEffect(() => {
    if (!quoteVisible) return;
    quotePreviewRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
    });
  }, [quoteVisible]);

  const handleSelectCohort = (cohortId: string) => {
    const next = applyCohort(cohortId);
    setSelectedCohortId(cohortId);
    setSelectedModuleIds(next.selectedModuleIds);
    setGwp(next.gwp);
    const newCohort = getCohortById(cohortId);
    setActivePresetPackageId(newCohort?.recommendedPackageId ?? null);
    setActiveBenchmarkId(null);
    setQuoteVisible(false);
  };

  const handleApplyPackage = (packageId: string) => {
    setSelectedModuleIds((current) => applyPackage(packageId, current));
    setActivePresetPackageId(packageId);
    setActiveBenchmarkId(null);
    setQuoteVisible(false);
  };

  const handleApplyBenchmark = (benchmarkId: string) => {
    const benchmark = benchmarkConfigs.find((b) => b.id === benchmarkId);
    if (!benchmark) return;
    setSelectedCohortId(benchmark.cohortId);
    setSelectedModuleIds(
      uniq([...FOUNDATIONAL_CORE_IDS, ...benchmark.moduleIds]),
    );
    setGwp(benchmark.gwp);
    setActivePresetPackageId(benchmark.packageId);
    setActiveBenchmarkId(benchmarkId);
    setQuoteVisible(false);
  };

  const toggleModule = (id: string) => {
    const mod = getModuleById(id);
    if (mod?.required) return;
    setSelectedModuleIds((current) =>
      current.includes(id) ? current.filter((m) => m !== id) : [...current, id],
    );
    setActiveBenchmarkId(null);
    setQuoteVisible(false);
  };

  const fitWarnings = useMemo(
    () =>
      buildFitWarnings(
        selectedModuleIds,
        selectedCohortId,
        activePresetPackageId,
      ),
    [selectedModuleIds, selectedCohortId, activePresetPackageId],
  );

  const selectedBlocks = useMemo(() => {
    const set = new Set<ModuleBlockId>();
    for (const id of selectedModuleIds) {
      const mod = getModuleById(id);
      if (mod) set.add(mod.block);
    }
    return set;
  }, [selectedModuleIds]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-8 lg:py-10">
      {/* Header */}
      <div className="card-elevated brand-card p-6 sm:p-8 mb-6">
        <div className="label-eyebrow mb-3">Sales Configurator</div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-[var(--color-ink)] mb-3">
          Configure a Sapiens subscription
        </h1>
        <p className="text-[var(--color-text-muted)] max-w-3xl text-sm sm:text-base">
          Start from a cohort or package preset, tailor the modular blocks and
          GWP, and watch first-year economics — base platform ARR, surcharges,
          managed cloud ops and professional services — recalculate live.
        </p>
        <div className="caveat mt-5 max-w-3xl">
          <span>
            <strong>Demo only.</strong> Pricing, surcharges, F_scale and
            package constructs are illustrative for stakeholder
            conversations — they are not official Sapiens commercial terms.
            See{' '}
            <Link
              href="/docs"
              className="font-medium text-[var(--color-primary)] underline-offset-2 hover:underline"
            >
              Knowledge Base
            </Link>{' '}
            for what is real vs illustrative.
          </span>
        </div>
      </div>

      {/* How to use this demo */}
      <section className="card p-5 sm:p-6 mb-6">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div>
            <div className="label-eyebrow">How to use this demo</div>
            <h2 className="text-lg font-semibold text-[var(--color-ink)] mt-1">
              Three steps from cohort to quote
            </h2>
          </div>
          <button
            type="button"
            onClick={() => setHowToOpen((o) => !o)}
            className="text-xs text-[var(--color-primary)] underline-offset-2 hover:underline shrink-0"
            aria-expanded={howToOpen}
            aria-controls="how-to-steps"
          >
            {howToOpen ? 'Hide' : 'Show steps'}
          </button>
        </div>
        {howToOpen ? (
          <ol id="how-to-steps" className="grid gap-3 md:grid-cols-3">
            {HOW_TO_STEPS.map((step) => (
              <li key={step.n} className="step-card">
                <span className="step-card-num" aria-hidden="true">
                  {step.n}
                </span>
                <div>
                  <div className="text-sm font-semibold text-[var(--color-ink)]">
                    {step.title}
                  </div>
                  <p className="text-xs text-[var(--color-text-muted)] mt-1 leading-snug">
                    {step.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        ) : null}
      </section>

      {/* Presets row */}
      <div className="grid lg:grid-cols-2 gap-4 mb-6">
        <div className="card p-5">
          <div className="flex items-center mb-3">
            <span className="label-eyebrow">Package preset</span>
            <HelpHint label="Package preset">
              Loads one of the two June 30 launch packages — Sapiens{' '}
              <strong>Horizon</strong> (Evergreen core) or Sapiens{' '}
              <strong>Intelligent</strong> (Evergreen + Decision + Digital +
              Data). Foundational Core modules stay on top of whatever you
              pick.
            </HelpHint>
          </div>
          <div className="flex flex-wrap gap-2">
            {launchPackages.map((pkg) => (
              <button
                key={pkg.id}
                onClick={() => handleApplyPackage(pkg.id)}
                className={
                  activePresetPackageId === pkg.id
                    ? 'btn-primary'
                    : 'btn-ghost'
                }
              >
                {pkg.name}
              </button>
            ))}
          </div>
          <p className="text-xs text-[var(--color-text-muted)] mt-3">
            Applies the package&apos;s included modules on top of the
            Foundational Core. Toggle add-ons below to tailor.
          </p>
        </div>

        <div className="card p-5">
          <div className="flex items-center mb-3">
            <span className="label-eyebrow">Benchmark configurations</span>
            <HelpHint label="Benchmark configurations">
              Pre-calibrated <strong>example deals</strong> — cohort, package
              and GWP all locked in. Use one to instantly show a credible
              starting point in the room, then tailor from there.
            </HelpHint>
          </div>
          <div className="flex flex-wrap gap-2">
            {benchmarkConfigs.map((bench) => (
              <button
                key={bench.id}
                onClick={() => handleApplyBenchmark(bench.id)}
                className={
                  activeBenchmarkId === bench.id ? 'btn-primary' : 'btn-ghost'
                }
                title={bench.description}
              >
                {bench.label}
              </button>
            ))}
          </div>
          <p className="text-xs text-[var(--color-text-muted)] mt-3">
            Realistic examples calibrated to GWP, cohort and package mix.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_1.1fr] gap-6">
        {/* Cohort + GWP column */}
        <div className="space-y-6">
          <div className="card p-5">
            <div className="flex items-center mb-3">
              <span className="label-eyebrow">Customer cohort</span>
              <HelpHint label="Customer cohort">
                The customer archetype you are selling to. Each cohort comes
                with a default GWP, recommended module set and recommended
                package — picking one resets the configurator to that
                starting point.
              </HelpHint>
            </div>
            <div className="space-y-2">
              {cohorts.map((c) => (
                <button
                  key={c.id}
                  onClick={() => handleSelectCohort(c.id)}
                  className={`w-full text-left p-3 rounded-lg border transition-all ${
                    selectedCohortId === c.id
                      ? 'border-[var(--color-primary)] bg-[var(--color-surface-alt)]'
                      : 'border-[var(--color-border)] hover:border-[var(--color-primary)]'
                  }`}
                >
                  <div className="font-medium text-sm text-[var(--color-ink)]">
                    {c.name}
                  </div>
                  <div className="text-xs text-[var(--color-text-muted)]">
                    {c.gwpRange} · {c.recommendedPath}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="card p-5">
            <div className="flex items-center justify-between mb-3 gap-3">
              <div className="flex items-center">
                <span className="label-eyebrow">Gross Written Premium</span>
                <HelpHint label="Gross Written Premium (GWP)">
                  Total annual premium the carrier writes. We use it as the{' '}
                  <strong>scaling input</strong> for pricing: bigger book →
                  bigger Sapiens footprint → higher base ARR. See F_scale
                  below.
                </HelpHint>
              </div>
              <div className="mono text-lg font-medium text-[var(--color-ink)]">
                {formatGWP(gwp)}
              </div>
            </div>
            <input
              type="range"
              min={GWP_MIN}
              max={GWP_MAX}
              step={GWP_STEP}
              value={gwp}
              aria-label="Gross Written Premium"
              onChange={(e) => {
                setGwp(Number(e.target.value));
                setActiveBenchmarkId(null);
                setQuoteVisible(false);
              }}
              className="range-sapiens"
              style={
                {
                  ['--range-pct' as string]: `${((gwp - GWP_MIN) / (GWP_MAX - GWP_MIN)) * 100}%`,
                } as React.CSSProperties
              }
            />
            <div className="flex justify-between text-[11px] text-[var(--color-text-muted)] mt-1">
              <span>{formatGWP(GWP_MIN)}</span>
              <span>{formatGWP(GWP_MAX)}</span>
            </div>
            <div className="mt-3">
              <input
                type="number"
                min={GWP_MIN}
                max={GWP_MAX}
                step={GWP_STEP}
                value={gwp}
                aria-label="Gross Written Premium (exact value)"
                onChange={(e) => {
                  const next = Number(e.target.value);
                  if (Number.isFinite(next))
                    setGwp(Math.min(Math.max(next, GWP_MIN), GWP_MAX));
                  setActiveBenchmarkId(null);
                  setQuoteVisible(false);
                }}
                className="w-full px-3 py-2 text-sm border border-[var(--color-border)] rounded-md mono bg-white text-[var(--color-ink)]"
              />
            </div>
          </div>

          <div className="card p-5">
            <div className="flex items-center mb-2">
              <span className="label-eyebrow">F_scale formula</span>
              <HelpHint label="F_scale">
                The <strong>illustrative</strong> multiplier that scales each
                module&apos;s base ARR by GWP. Floor 1.0 under $10M GWP, cap
                2.2 above ~$5B. Real Sapiens commercial terms are negotiated
                deal-by-deal.
              </HelpHint>
            </div>
            <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">
              Base ARR scales by{' '}
              <code className="mono text-[var(--color-ink)]">
                F = 1 + 0.25 · log₁₀(GWP / $10M)
              </code>
              , clamped to [1.0, 2.2].{' '}
              <Link
                href="/docs#pricing-maths"
                className="font-medium text-[var(--color-primary)] underline-offset-2 hover:underline"
              >
                Explain the maths
              </Link>
              . Below $10M GWP the floor of 1.0 holds; above ~$5B GWP the cap of 2.2 kicks in.
            </p>
            <div className="mt-3 flex items-center justify-between">
              <span className="text-xs text-[var(--color-text-muted)]">
                Current scale factor
              </span>
              <span className="mono text-xl font-medium text-[var(--color-primary)]">
                ×{pricing.scaleFactor.toFixed(2)}
              </span>
            </div>
            <div className="text-[11px] text-[var(--color-text-muted)] mt-1">
              Reference GWP: {formatGWP(F_SCALE_REFERENCE_GWP)}
            </div>
          </div>
        </div>

        {/* Module toggles column */}
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div className="flex items-center">
              <span className="label-eyebrow">Modular blocks</span>
              <HelpHint label="Modular blocks">
                Sapiens groups its subscription portfolio into five{' '}
                <strong>building blocks</strong>: Foundational Core (always
                on), Evergreen, Decision &amp; Intelligence, Digital &amp;
                Data, and Premium AMS. Each block has its own surcharge
                applied to base ARR.
              </HelpHint>
            </div>
            <div className="text-xs text-[var(--color-text-muted)]">
              {selectedModuleIds.length} of {modules.length} selected
            </div>
          </div>
          {moduleBlocks
            .slice()
            .sort((a, b) => a.order - b.order)
            .map((block) => {
              const blockModules = modules.filter((m) => m.block === block.id);
              return (
                <div key={block.id} className="card p-4">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="min-w-0">
                      <div className="text-sm font-semibold text-[var(--color-ink)] break-words">
                        {block.name}
                      </div>
                      <div className="text-[11px] text-[var(--color-text-muted)]">
                        {block.surchargeLabel}
                      </div>
                    </div>
                    {block.required ? (
                      <span className="pill pill-required shrink-0">Required</span>
                    ) : null}
                  </div>
                  <div className="space-y-1.5">
                    {blockModules.map((mod) => {
                      const checked = selectedModuleIds.includes(mod.id);
                      const isLocked = !!mod.required;
                      return (
                        <label
                          key={mod.id}
                          className={`flex items-start justify-between gap-3 p-2.5 rounded-md border transition-colors ${
                            checked
                              ? 'border-[var(--color-primary)] bg-[var(--color-surface-alt)]'
                              : 'border-[var(--color-border)] hover:border-[var(--color-primary)]'
                          } ${isLocked ? 'opacity-90 cursor-not-allowed' : 'cursor-pointer'}`}
                        >
                          <div className="flex items-start gap-2.5 min-w-0">
                            <input
                              type="checkbox"
                              className="mt-0.5 accent-[var(--color-primary)]"
                              checked={checked}
                              disabled={isLocked}
                              onChange={() => toggleModule(mod.id)}
                              aria-label={mod.name}
                            />
                            <div className="min-w-0">
                              <div className="text-sm font-medium text-[var(--color-ink)] flex items-center gap-1.5 flex-wrap">
                                <span className="break-words">{mod.name}</span>
                                {mod.required ? (
                                  <span className="pill pill-required">
                                    Required
                                  </span>
                                ) : null}
                                {mod.recommended ? (
                                  <span className="pill pill-recommended">
                                    Recommended
                                  </span>
                                ) : null}
                              </div>
                              <div className="text-[11px] text-[var(--color-text-muted)] mt-0.5">
                                {mod.type} · {mod.lifecycle}
                              </div>
                            </div>
                          </div>
                          <div className="text-right mono text-xs text-[var(--color-ink)] shrink-0">
                            {formatCurrency(mod.basePrice)}
                          </div>
                        </label>
                      );
                    })}
                  </div>
                </div>
              );
            })}
        </div>

        {/* Pricing / summary column */}
        <div className="space-y-4">
          <div className="lg:sticky lg:top-24 space-y-4">
            <div className="card-elevated p-5 sm:p-6">
              <div className="flex items-center mb-3">
                <span className="label-eyebrow">Pricing breakdown</span>
                <HelpHint label="Pricing breakdown" align="end">
                  All figures are <strong>illustrative</strong>. Base
                  Platform ARR is the sum of selected non-AMS modules scaled
                  by F_scale. Surcharges apply per block. Managed Cloud / AMS
                  is shown separately. Pro services is a one-time Y1 number
                  that also scales with F_scale.
                </HelpHint>
              </div>
              <div className="text-xs text-[var(--color-text-muted)] mb-4">
                {cohort ? `${cohort.name} · ` : ''}
                {formatGWP(gwp)} · F_scale ×{pricing.scaleFactor.toFixed(2)}
              </div>

              <dl className="space-y-2.5 text-sm">
                <Row
                  label="Base platform ARR"
                  value={formatCurrency(pricing.basePlatformARR)}
                />
                <Row
                  label="Surcharge / add-on ARR"
                  value={formatCurrency(pricing.surchargeARR)}
                />
                <Row
                  label="Managed cloud / AMS ops"
                  value={formatCurrency(pricing.cloudOpsARR)}
                />
                <div className="divider-soft my-2" />
                <Row
                  label="Annual recurring revenue"
                  value={formatCurrency(pricing.annualARR)}
                  emphasis
                />
                <Row
                  label="Professional services (Y1)"
                  value={formatCurrency(pricing.professionalServices)}
                  hint="One-time, scales with F_scale"
                />
                <div className="divider-soft my-2" />
                <Row
                  label="First-year total"
                  value={formatCurrency(pricing.firstYearTotal)}
                  emphasis
                  primary
                />
              </dl>

              <button
                onClick={() => setQuoteVisible(true)}
                type="button"
                className="btn-accent w-full mt-5"
                aria-controls="quote-preview"
                aria-expanded={quoteVisible}
              >
                {quoteVisible ? 'Quote Preview Generated' : 'Generate Quote Preview'}
              </button>
              <p className="text-[11px] text-[var(--color-text-muted)] mt-2 text-center">
                Indicative pricing — not official Sapiens commercial terms.
              </p>
            </div>

            {quoteVisible ? (
              <div ref={quotePreviewRef} className="scroll-mt-24" aria-live="polite">
                <QuotePreview
                  cohortName={cohort?.name ?? 'Unspecified cohort'}
                  packageName={
                    activePresetPackageId
                      ? getPackageById(activePresetPackageId)?.name ?? null
                      : null
                  }
                  gwp={gwp}
                  pricing={pricing}
                  selectedModuleIds={selectedModuleIds}
                  selectedBlocks={selectedBlocks}
                  onClose={() => setQuoteVisible(false)}
                />
              </div>
            ) : null}

            {fitWarnings.length > 0 ? (
              <div className="card p-5">
                <div className="flex items-center mb-3">
                  <span className="label-eyebrow">
                    Fit warnings &amp; recommendations
                  </span>
                  <HelpHint label="Fit warnings" align="end">
                    Heuristic checks that flag obvious cohort / module
                    mismatches — e.g. legacy carriers without the Migration
                    Bridge, MGAs missing digital/data, reinsurance without
                    DataSuite. <strong>Demo logic</strong>, not a Sapiens
                    deal-desk rule engine.
                  </HelpHint>
                </div>
                <ul className="space-y-2.5">
                  {fitWarnings.map((w) => (
                    <li
                      key={w.id}
                      className={`p-3 rounded-md border text-sm ${
                        w.severity === 'error'
                          ? 'bg-[#FDECEC] border-[#F5C2C2] text-[#7A1313]'
                          : w.severity === 'warning'
                            ? 'bg-[#FFF1E0] border-[#FFD9AE] text-[#8A4400]'
                            : 'bg-[#E0F0FD] border-[#C7DFFF] text-[#0D256F]'
                      }`}
                    >
                      <div className="font-semibold text-xs uppercase tracking-wider mb-1">
                        {w.title}
                      </div>
                      <div className="leading-snug">{w.body}</div>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="card p-5">
                <div className="label-eyebrow mb-2">Fit check</div>
                <p className="text-sm text-[var(--color-ink)]">
                  No blockers detected. Configuration aligns with the
                  recommended path for{' '}
                  <span className="font-medium">{cohort?.name}</span>.
                </p>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}

function Row({
  label,
  value,
  hint,
  emphasis,
  primary,
}: {
  label: string;
  value: string;
  hint?: string;
  emphasis?: boolean;
  primary?: boolean;
}) {
  return (
    <div className="flex justify-between items-start gap-3">
      <div className="min-w-0">
        <div
          className={`${emphasis ? 'font-medium text-[var(--color-ink)]' : 'text-[var(--color-text-muted)]'}`}
        >
          {label}
        </div>
        {hint ? (
          <div className="text-[11px] text-[var(--color-text-muted)]">
            {hint}
          </div>
        ) : null}
      </div>
      <div
        className={`mono shrink-0 ${
          primary
            ? 'text-xl font-medium text-[var(--color-primary)]'
            : emphasis
              ? 'font-medium text-[var(--color-ink)]'
              : 'text-[var(--color-ink)]'
        }`}
      >
        {value}
      </div>
    </div>
  );
}

function QuotePreview({
  cohortName,
  packageName,
  gwp,
  pricing,
  selectedModuleIds,
  selectedBlocks,
  onClose,
}: {
  cohortName: string;
  packageName: string | null;
  gwp: number;
  pricing: ReturnType<typeof calculatePricing>;
  selectedModuleIds: string[];
  selectedBlocks: Set<ModuleBlockId>;
  onClose: () => void;
}) {
  const today = new Date();
  const quoteId = `SAP-${today.getFullYear()}-${(today.getMonth() + 1)
    .toString()
    .padStart(2, '0')}${today.getDate().toString().padStart(2, '0')}`;

  const modulesByBlock = moduleBlocks
    .slice()
    .sort((a, b) => a.order - b.order)
    .map((block) => ({
      block,
      mods: selectedModuleIds
        .map((id) => getModuleById(id))
        .filter(
          (m): m is NonNullable<ReturnType<typeof getModuleById>> =>
            !!m && m.block === block.id,
        ),
    }))
    .filter(({ mods }) => mods.length > 0);

  return (
    <div id="quote-preview" className="quote-preview card-elevated overflow-hidden border-2 border-[var(--color-primary)]">
      <div className="quote-preview-header p-4 sm:p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-3 min-w-0">
            <BrandLogo variant="compact" />
            <div>
              <div className="label-eyebrow">Quote preview</div>
              <div className="text-xs text-[var(--color-text-muted)] mt-1 mono">
                {quoteId} · {today.toDateString()}
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="no-print text-xs text-[var(--color-text-muted)] hover:text-[var(--color-ink)] shrink-0"
            aria-label="Close quote preview"
          >
            ✕ Close
          </button>
        </div>
      </div>

      <div className="p-5 sm:p-6">
        <div className="space-y-1 mb-4">
          <div className="text-sm break-words">
            <span className="text-[var(--color-text-muted)]">Cohort: </span>
            <span className="font-medium text-[var(--color-ink)]">
              {cohortName}
            </span>
          </div>
          {packageName ? (
            <div className="text-sm break-words">
              <span className="text-[var(--color-text-muted)]">Package: </span>
              <span className="font-medium text-[var(--color-ink)]">
                {packageName}
              </span>
            </div>
          ) : null}
          <div className="text-sm">
            <span className="text-[var(--color-text-muted)]">GWP: </span>
            <span className="mono text-[var(--color-ink)]">
              {formatGWP(gwp)}
            </span>
          </div>
          <div className="text-sm break-words">
            <span className="text-[var(--color-text-muted)]">
              Blocks engaged:{' '}
            </span>
            <span className="text-[var(--color-ink)]">
              {Array.from(selectedBlocks)
                .map((id) => getBlockById(id)?.shortName)
                .filter(Boolean)
                .join(' · ')}
            </span>
          </div>
        </div>

        <div className="divider-soft my-3" />

        <div className="space-y-3 mb-4">
          {modulesByBlock.map(({ block, mods }) => (
            <div key={block.id}>
              <div className="text-[11px] uppercase tracking-wider font-semibold text-[var(--color-primary)] mb-1">
                {block.shortName}
              </div>
              <ul className="text-xs space-y-0.5">
                {mods.map((m) => {
                  const perMod = pricing.perModule.find((p) => p.id === m.id);
                  return (
                    <li
                      key={m.id}
                      className="flex justify-between gap-3 text-[var(--color-ink)]"
                    >
                      <span className="min-w-0 break-words">{m.name}</span>
                      <span className="mono text-[var(--color-text-muted)] shrink-0">
                        {perMod
                          ? formatCurrency(perMod.scaled + perMod.surcharge)
                          : ''}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        <div className="divider-soft my-3" />

        <dl className="space-y-1.5 text-sm">
          <Row
            label="Annual recurring revenue"
            value={formatCurrency(pricing.annualARR)}
            emphasis
          />
          <Row
            label="Professional services (Y1)"
            value={formatCurrency(pricing.professionalServices)}
          />
          <Row
            label="First-year total"
            value={formatCurrency(pricing.firstYearTotal)}
            emphasis
            primary
          />
        </dl>

        <p className="text-[11px] text-[var(--color-text-muted)] mt-4 italic">
          Indicative pricing for internal sales conversations. Not official
          Sapiens commercial terms — final pricing subject to Sapiens Finance
          approval and the June 30 launch guardrails.
        </p>
      </div>
    </div>
  );
}

type Severity = 'info' | 'warning' | 'error';
interface FitWarning {
  id: string;
  severity: Severity;
  title: string;
  body: string;
}

function buildFitWarnings(
  selectedModuleIds: string[],
  cohortId: string,
  activePackageId: string | null,
): FitWarning[] {
  const warnings: FitWarning[] = [];

  const foundationalSelected = FOUNDATIONAL_CORE_IDS.every((id) =>
    selectedModuleIds.includes(id),
  );
  if (!foundationalSelected) {
    warnings.push({
      id: 'foundational-missing',
      severity: 'error',
      title: 'Foundational Core SaaS missing',
      body: 'Every new SaaS customer must include the full Foundational Core block (hosting, security, environments, service desk). Re-enable the required modules before quoting.',
    });
  }

  const cohort = getCohortById(cohortId);
  const selectedSet = new Set(selectedModuleIds);

  if (cohort?.id === 'legacy' && !selectedSet.has('migration-bridge')) {
    warnings.push({
      id: 'legacy-needs-bridge',
      severity: 'warning',
      title: 'Legacy cohort without SaaS Migration Bridge',
      body: 'Legacy On-Prem Holdouts cannot rip-and-replace. Add the SaaS Migration Bridge so the on-prem core stays primary while Horizon is piloted on one LoB.',
    });
  }

  if (cohort?.id === 'mga') {
    const hasDigital = selectedSet.has('digitalsuite-portals');
    const hasData = selectedSet.has('datasuite-hub');
    const hasDecisionAi =
      selectedSet.has('ai-underwriting') || selectedSet.has('decision-core');
    if (!hasDigital || !hasData || !hasDecisionAi) {
      warnings.push({
        id: 'mga-digital-data',
        severity: 'info',
        title: 'MGAs benefit most from Digital + Data + AI',
        body: 'Strong MGA quotes bundle DigitalSuite Portals, DataSuite analytics and at least one AI/Decision module. Consider adding the missing pieces before sending the quote.',
      });
    }
  }

  if (cohort?.id === 'reinsurance') {
    if (!selectedSet.has('datasuite-hub')) {
      warnings.push({
        id: 'reinsurance-needs-data',
        severity: 'warning',
        title: 'Reinsurance buyers need data parity first',
        body: 'DataSuite Real-Time Analytics is effectively mandatory for reinsurance & global specialty. Add it before defending the quote with the buyer.',
      });
    }
    if (!selectedSet.has('premium-ams-pod')) {
      warnings.push({
        id: 'reinsurance-needs-ams',
        severity: 'info',
        title: 'Premium AMS Pod recommended for treaty cutover',
        body: 'Reinsurance cutover periods require a Premium AMS Pod to absorb treaty calc engine parity work. Add it if it is not already in scope.',
      });
    }
  }

  if (activePackageId && cohort) {
    const pkg = getPackageById(activePackageId);
    if (pkg && pkg.id !== cohort.recommendedPackageId) {
      const recommended = getPackageById(cohort.recommendedPackageId);
      warnings.push({
        id: 'package-mismatch',
        severity: 'warning',
        title: 'Package / cohort mismatch',
        body: `${pkg.name} is loaded but ${cohort.name} is normally led with ${recommended?.name ?? 'a different package'}. Reconfirm with the cohort owner before sending this quote externally.`,
      });
    }
  }

  return warnings;
}
