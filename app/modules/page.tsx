import Link from 'next/link';
import { moduleBlocks, modules } from '@/lib/data';
import { formatCurrency } from '@/lib/pricing';
import LifecyclePill from '../components/LifecyclePill';
import HelpHint from '../components/HelpHint';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Services Catalog · Sapiens Subscription Toolkit',
};

export default function ModulesPage() {
  const futureCount = modules.filter((m) => m.lifecycle === 'Future Platform').length;
  const maintainCount = modules.filter((m) => m.lifecycle === 'Maintain').length;
  const eolCount = modules.filter((m) => m.lifecycle === 'End of Life').length;

  const baseModules = modules.filter((m) => m.block === 'foundational-core');
  const baseARRMin = baseModules.reduce((acc, m) => acc + m.basePrice, 0);
  const baseARRMax = Math.round(baseARRMin * 2.2); // matches F_scale cap

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-10 sm:py-12">
      {/* Header */}
      <div className="card-elevated brand-card p-6 sm:p-8 mb-8">
        <div className="label-eyebrow mb-3">Services Catalog</div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-[var(--color-ink)] mb-4">
          The building blocks behind every Sapiens subscription
        </h1>
        <p className="text-[var(--color-text-muted)] max-w-3xl text-sm sm:text-base">
          Five modular blocks anchor every subscription. The Foundational Core
          SaaS block is the non-negotiable base for new customers; the
          remaining four layer on as add-ons, priced as a surcharge on base
          ARR.
        </p>
        <div className="caveat mt-5 max-w-3xl">
          <span>
            <strong>Indicative pricing.</strong> Base ARR figures are
            illustrative anchors, not Sapiens list prices. See the{' '}
            <Link href="/configurator" className="underline text-[var(--color-primary)]">
              configurator
            </Link>{' '}
            for live scaling by GWP.
          </span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-10 sm:mb-12">
        <div className="card p-4 sm:p-5">
          <div className="flex items-center">
            <span className="label-eyebrow">Future Platform</span>
            <HelpHint label="Future Platform">
              Modules positioned as the <strong>go-forward</strong> portfolio
              — the sell-leading layer.
            </HelpHint>
          </div>
          <div className="text-3xl font-light text-[var(--color-ink)] mono mt-2">
            {futureCount}
          </div>
          <div className="text-xs text-[var(--color-text-muted)] mt-1">
            Modules powering the go-forward portfolio
          </div>
        </div>
        <div className="card p-4 sm:p-5">
          <div className="flex items-center">
            <span className="label-eyebrow">Maintain</span>
            <HelpHint label="Maintain">
              Kept stable for legacy continuity and transition. Sold only as
              part of a Hybrid Bridge or migration motion.
            </HelpHint>
          </div>
          <div className="text-3xl font-light text-[var(--color-ink)] mono mt-2">
            {maintainCount}
          </div>
          <div className="text-xs text-[var(--color-text-muted)] mt-1">
            Kept for legacy continuity and transition
          </div>
        </div>
        <div className="card p-4 sm:p-5">
          <div className="flex items-center">
            <span className="label-eyebrow">End of Life</span>
            <HelpHint label="End of Life">
              Slated for sunset. Do not pitch standalone — only support to
              cover existing customers through migration.
            </HelpHint>
          </div>
          <div className="text-3xl font-light text-[var(--color-ink)] mono mt-2">
            {eolCount}
          </div>
          <div className="text-xs text-[var(--color-text-muted)] mt-1">
            Slated for sunset — do not sell standalone
          </div>
        </div>
        <div className="card p-4 sm:p-5">
          <div className="flex items-center">
            <span className="label-eyebrow">Base ARR range</span>
            <HelpHint label="Base ARR range" align="end">
              Sum of Foundational Core base prices scaled by F_scale.
              Illustrative anchor — actual contracts vary with GWP, geography
              and committed term.
            </HelpHint>
          </div>
          <div className="text-2xl sm:text-3xl font-light text-[var(--color-ink)] mono mt-2 break-words">
            {formatCurrency(baseARRMin)} – {formatCurrency(baseARRMax)}
          </div>
          <div className="text-xs text-[var(--color-text-muted)] mt-1">
            Foundational Core, scaled by GWP (F_scale 1.0 – 2.2)
          </div>
        </div>
      </div>

      {/* Blocks */}
      <div className="space-y-10 sm:space-y-12">
        {moduleBlocks
          .slice()
          .sort((a, b) => a.order - b.order)
          .map((block) => {
            const blockModules = modules.filter((m) => m.block === block.id);
            return (
              <section key={block.id}>
                <div className="flex items-end justify-between gap-6 flex-wrap mb-4 sm:mb-5">
                  <div className="max-w-3xl">
                    <div className="flex items-center gap-2 flex-wrap mb-2">
                      <div className="label-eyebrow">
                        Block 0{block.order}
                      </div>
                      {block.required ? (
                        <span className="pill pill-required">Required</span>
                      ) : null}
                      <span className="pill pill-eol">
                        {block.surchargeLabel}
                      </span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-light text-[var(--color-ink)] tracking-tight">
                      {block.name}
                    </h2>
                    <p className="text-sm text-[var(--color-text-muted)] mt-2">
                      {block.description}
                    </p>
                  </div>
                  <div className="text-xs text-[var(--color-text-muted)]">
                    {blockModules.length} module
                    {blockModules.length === 1 ? '' : 's'}
                  </div>
                </div>

                <div className="card overflow-hidden">
                  <div className="table-scroll">
                    <table className="min-w-[680px]">
                      <thead>
                        <tr>
                          <th>Module</th>
                          <th>Type</th>
                          <th>Target cohorts</th>
                          <th>Lifecycle</th>
                          <th className="text-right">Base ARR</th>
                        </tr>
                      </thead>
                      <tbody>
                        {blockModules.map((mod) => (
                          <tr key={mod.id}>
                            <td>
                              <div className="font-medium text-[var(--color-ink)] flex items-center gap-2 flex-wrap">
                                {mod.name}
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
                              <div className="text-xs text-[var(--color-text-muted)] mt-1 max-w-md">
                                {mod.description}
                              </div>
                            </td>
                            <td className="text-[var(--color-text-muted)] align-top">
                              {mod.type}
                            </td>
                            <td className="text-[var(--color-text-muted)] align-top">
                              <div className="flex flex-wrap gap-1.5">
                                {mod.targetCohorts.map((c) => (
                                  <span
                                    key={c}
                                    className="text-[11px] px-2 py-0.5 rounded border border-[var(--color-border)] bg-[var(--color-surface-alt)] text-[var(--color-ink)]"
                                  >
                                    {c}
                                  </span>
                                ))}
                              </div>
                            </td>
                            <td className="align-top">
                              <LifecyclePill status={mod.lifecycle} />
                            </td>
                            <td className="text-right align-top mono text-[var(--color-ink)] whitespace-nowrap">
                              {formatCurrency(mod.basePrice)}
                              {block.surchargePercent > 0 ? (
                                <div className="text-[11px] text-[var(--color-text-muted)] mt-0.5">
                                  + {Math.round(block.surchargePercent * 100)}%
                                  surcharge
                                </div>
                              ) : null}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </section>
            );
          })}
      </div>

      <div className="mt-12 card p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="label-eyebrow">Next step</div>
          <p className="text-sm text-[var(--color-ink)] mt-1">
            See how these modules combine for each customer profile, or build a
            live configuration.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link href="/cohorts" className="btn-ghost">
            Cohort mapping →
          </Link>
          <Link href="/configurator" className="btn-primary">
            Open the Configurator →
          </Link>
        </div>
      </div>
    </div>
  );
}
