import Link from 'next/link';
import {
  getBlockById,
  getModuleById,
  launchPackages,
  moduleBlocks,
} from '@/lib/data';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Launch Packages · Sapiens Subscription Toolkit',
};

export default function PackagesPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-10 py-12">
      <div className="card-elevated brand-card p-8 mb-10">
        <div className="label-eyebrow mb-3">June 30 launch</div>
        <h1 className="text-5xl font-light tracking-tight text-[var(--color-ink)] mb-4">
          Two packages, one Evergreen core
        </h1>
        <p className="text-[var(--color-text-muted)] max-w-3xl">
          Both packages share the Foundational Core SaaS and Evergreen Platform
          baseline. Sapiens Horizon is the modernisation play; Sapiens
          Intelligent layers Decision, Digital and Data on top for cohorts that
          can absorb the surcharge.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {launchPackages.map((pkg) => {
          const includedModules = pkg.modules
            .map((id) => getModuleById(id))
            .filter((m): m is NonNullable<ReturnType<typeof getModuleById>> =>
              Boolean(m),
            );

          const blockBreakdown = moduleBlocks
            .slice()
            .sort((a, b) => a.order - b.order)
            .map((block) => ({
              block,
              modules: includedModules.filter((m) => m.block === block.id),
            }))
            .filter((b) => b.modules.length > 0);

          return (
            <article
              key={pkg.id}
              className="card-elevated p-8 flex flex-col"
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <div className="label-eyebrow mb-2">{pkg.subtitle}</div>
                  <h2 className="text-3xl font-light tracking-tight text-[var(--color-ink)]">
                    {pkg.name}
                  </h2>
                </div>
                <span className="pill pill-status">{pkg.status}</span>
              </div>

              <p className="text-[var(--color-text-muted)] mb-6">
                {pkg.valueProposition}
              </p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-3 rounded-lg bg-[var(--color-surface-alt)] border border-[var(--color-border)]">
                  <div className="label-small text-[var(--color-text-muted)]">
                    Pricing model
                  </div>
                  <div className="text-sm text-[var(--color-ink)] font-medium mt-1">
                    {pkg.surchargeSummary}
                  </div>
                  <div className="text-xs text-[var(--color-text-muted)] mt-1">
                    {pkg.pricingModel.description}
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-[var(--color-surface-alt)] border border-[var(--color-border)]">
                  <div className="label-small text-[var(--color-text-muted)]">
                    Timeline
                  </div>
                  <div className="text-sm text-[var(--color-ink)] font-medium mt-1">
                    {pkg.timeline}
                  </div>
                  <div className="text-xs text-[var(--color-text-muted)] mt-1">
                    Combined surcharge ≈{' '}
                    {Math.round(pkg.pricingModel.baseSurchargePercent * 100)}%
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <div className="label-eyebrow mb-2">Target cohorts</div>
                <div className="flex flex-wrap gap-1.5">
                  {pkg.targetCohorts.map((c) => (
                    <span
                      key={c}
                      className="text-xs px-2.5 py-1 rounded-md bg-white border border-[var(--color-border)] text-[var(--color-ink)]"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <div className="label-eyebrow mb-3">Why customers buy it</div>
                <ul className="space-y-2">
                  {pkg.valueBullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="text-sm text-[var(--color-ink)] flex gap-2"
                    >
                      <span className="text-[var(--color-accent)] mt-0.5">
                        ◆
                      </span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-6">
                <div className="label-eyebrow mb-3">
                  Included modules ({includedModules.length})
                </div>
                <div className="space-y-3">
                  {blockBreakdown.map(({ block, modules: mods }) => (
                    <div key={block.id}>
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="text-xs font-semibold text-[var(--color-primary)] uppercase tracking-wider">
                          {block.shortName}
                        </div>
                        <div className="text-[11px] text-[var(--color-text-muted)]">
                          {block.surchargeLabel}
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {mods.map((m) => (
                          <span
                            key={m.id}
                            className="text-xs px-2.5 py-1 rounded-md bg-[var(--color-surface-alt)] border border-[var(--color-border)] text-[var(--color-ink)]"
                            title={getBlockById(m.block)?.name}
                          >
                            {m.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-auto p-4 rounded-lg border border-[var(--color-border-strong)] bg-[var(--color-cream)]">
                <div className="label-eyebrow mb-1.5">Guardrail</div>
                <p className="text-sm text-[var(--color-ink)] leading-relaxed">
                  {pkg.guardrail}
                </p>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href={`/configurator?package=${pkg.id}`}
                  className="btn-primary"
                >
                  Configure {pkg.name} →
                </Link>
                <Link href="/cohorts" className="btn-ghost">
                  See cohort fit
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
