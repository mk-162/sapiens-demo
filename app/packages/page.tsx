import Link from 'next/link';
import {
  getBlockById,
  getModuleById,
  launchPackages,
  moduleBlocks,
} from '@/lib/data';
import HelpHint from '../components/HelpHint';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Launch Packages · Sapiens Subscription Toolkit',
};

export default function PackagesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-10 sm:py-12">
      <div className="card-elevated brand-card p-6 sm:p-8 mb-8 sm:mb-10">
        <div className="label-eyebrow mb-3">June 30 launch</div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-[var(--color-ink)] mb-4">
          Two packages, one Evergreen core
        </h1>
        <p className="text-[var(--color-text-muted)] max-w-3xl text-sm sm:text-base">
          Both packages share the Foundational Core SaaS and Evergreen
          Platform baseline. Sapiens Horizon is the modernisation path for
          carriers that want a clean Evergreen core; Sapiens Intelligent
          layers Decision, Digital and Data on top for cohorts ready to absorb
          the surcharge and unlock AI-driven outcomes across the lifecycle.
        </p>
        <div className="caveat mt-5 max-w-3xl">
          <span>
            <strong>Illustrative packaging.</strong> &ldquo;Horizon&rdquo; and
            &ldquo;Intelligent&rdquo; package names, combined surcharge
            percentages and the June 30 launch framing are demo constructs
            for stakeholder conversations — not officially published Sapiens
            commercial packages.
          </span>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
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
              className="card-elevated p-6 sm:p-8 flex flex-col"
            >
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="min-w-0">
                  <div className="label-eyebrow mb-2">{pkg.subtitle}</div>
                  <h2 className="text-2xl sm:text-3xl font-light tracking-tight text-[var(--color-ink)] break-words">
                    {pkg.name}
                  </h2>
                </div>
                <span className="pill pill-status shrink-0">{pkg.status}</span>
              </div>

              <p className="text-[var(--color-text-muted)] mb-6 text-sm sm:text-base">
                {pkg.valueProposition}
              </p>

              <div className="grid sm:grid-cols-2 gap-3 sm:gap-4 mb-6">
                <div className="p-3 rounded-lg bg-[var(--color-surface-alt)] border border-[var(--color-border)]">
                  <div className="flex items-center">
                    <span className="label-small text-[var(--color-text-muted)]">
                      Pricing model
                    </span>
                    <HelpHint label="Pricing model">
                      Combined surcharge applied to base Platform ARR.{' '}
                      <strong>Illustrative</strong> — real deals are scoped
                      with Sapiens Finance.
                    </HelpHint>
                  </div>
                  <div className="text-sm text-[var(--color-ink)] font-medium mt-1 break-words">
                    {pkg.surchargeSummary}
                  </div>
                  <div className="text-xs text-[var(--color-text-muted)] mt-1">
                    {pkg.pricingModel.description}
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-[var(--color-surface-alt)] border border-[var(--color-border)]">
                  <div className="flex items-center">
                    <span className="label-small text-[var(--color-text-muted)]">
                      Timeline
                    </span>
                    <HelpHint label="Timeline">
                      Indicative implementation window from kick-off to
                      go-live, assuming the Beta Migration Programme
                      guardrails below.
                    </HelpHint>
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
                      <div className="flex items-center justify-between mb-1.5 gap-2">
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
                <div className="flex items-center mb-1.5">
                  <span className="label-eyebrow">Guardrail</span>
                  <HelpHint label="Beta Migration Programme guardrail">
                    Internal deal-desk framing for the June 30 launch: phased
                    implementation, billing tied to go-live milestones.{' '}
                    <strong>Demo construct</strong>, not a Sapiens-issued
                    commercial standard.
                  </HelpHint>
                </div>
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

      <div className="mt-10 sm:mt-12 card p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="label-eyebrow">Next step</div>
          <p className="text-sm text-[var(--color-ink)] mt-1">
            Build a live configuration for either package, or explore the
            module-by-module detail.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link href="/modules" className="btn-ghost">
            Browse the catalog →
          </Link>
          <Link href="/configurator" className="btn-primary">
            Open the Configurator →
          </Link>
        </div>
      </div>
    </div>
  );
}
