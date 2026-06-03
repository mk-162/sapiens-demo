import { moduleBlocks, modules } from '@/lib/data';
import { formatCurrency } from '@/lib/pricing';
import LifecyclePill from '../components/LifecyclePill';
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
    <div className="max-w-7xl mx-auto px-6 lg:px-10 py-12">
      {/* Header */}
      <div className="card-elevated brand-card p-8 mb-10">
        <div className="label-eyebrow mb-3">Services Catalog</div>
        <h1 className="text-5xl font-light tracking-tight text-[var(--color-ink)] mb-4">
          Modular blocks across the Sapiens subscription portfolio
        </h1>
        <p className="text-[var(--color-text-muted)] max-w-3xl">
          Five building blocks anchor every subscription. The Foundational Core
          SaaS block is non-negotiable for new customers — the remaining four
          are add-ons priced as a surcharge on the base ARR.
        </p>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-4 mb-12">
        <div className="card p-5">
          <div className="label-eyebrow mb-2">Future Platform</div>
          <div className="text-3xl font-light text-[var(--color-ink)] mono">
            {futureCount}
          </div>
          <div className="text-xs text-[var(--color-text-muted)] mt-1">
            Modules powering the go-forward portfolio
          </div>
        </div>
        <div className="card p-5">
          <div className="label-eyebrow mb-2">Maintain</div>
          <div className="text-3xl font-light text-[var(--color-ink)] mono">
            {maintainCount}
          </div>
          <div className="text-xs text-[var(--color-text-muted)] mt-1">
            Kept for legacy continuity and transition
          </div>
        </div>
        <div className="card p-5">
          <div className="label-eyebrow mb-2">End of Life</div>
          <div className="text-3xl font-light text-[var(--color-ink)] mono">
            {eolCount}
          </div>
          <div className="text-xs text-[var(--color-text-muted)] mt-1">
            Slated for sunset — do not sell standalone
          </div>
        </div>
        <div className="card p-5">
          <div className="label-eyebrow mb-2">Base ARR range</div>
          <div className="text-3xl font-light text-[var(--color-ink)] mono">
            {formatCurrency(baseARRMin)} – {formatCurrency(baseARRMax)}
          </div>
          <div className="text-xs text-[var(--color-text-muted)] mt-1">
            Foundational Core, scaled by GWP (F_scale 1.0 – 2.2)
          </div>
        </div>
      </div>

      {/* Blocks */}
      <div className="space-y-12">
        {moduleBlocks
          .slice()
          .sort((a, b) => a.order - b.order)
          .map((block) => {
            const blockModules = modules.filter((m) => m.block === block.id);
            return (
              <section key={block.id}>
                <div className="flex items-end justify-between gap-6 flex-wrap mb-5">
                  <div className="max-w-3xl">
                    <div className="flex items-center gap-3 mb-2">
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
                    <h2 className="text-3xl font-light text-[var(--color-ink)] tracking-tight">
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
                  <table>
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
                            <div className="font-medium text-[var(--color-ink)] flex items-center gap-2">
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
                          <td className="text-right align-top mono text-[var(--color-ink)]">
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
              </section>
            );
          })}
      </div>
    </div>
  );
}
