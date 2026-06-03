import Link from 'next/link';
import {
  cohorts,
  getModuleById,
  getPackageById,
  moduleBlocks,
} from '@/lib/data';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cohort Mapping · Sapiens Subscription Toolkit',
};

const PATH_BLURB: Record<string, string> = {
  'Direct-to-SaaS':
    'Move straight onto the SaaS core. Minimal hybrid footprint, fastest time-to-value.',
  'SaaS Native Growth':
    'SaaS from day one with pay-as-you-grow pricing — ideal for greenfield carriers.',
  'Hybrid Bridge':
    'Keep legacy stable while SaaS scales for new lines or geographies. Multi-year programme.',
  'Data & Decision Led':
    'Lead with analytics and decisioning parity, then layer the platform underneath.',
  'Maintain → Future Pilot':
    'Keep the on-prem core running, pilot Horizon on one LoB, expand on proof points.',
};

export default function CohortsPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-10 py-12">
      <div className="card-elevated brand-card p-8 mb-10">
        <div className="label-eyebrow mb-3">Cohort Mapping</div>
        <h1 className="text-5xl font-light tracking-tight text-[var(--color-ink)] mb-4">
          From customer cohort to recommended subscription path
        </h1>
        <p className="text-[var(--color-text-muted)] max-w-3xl">
          Five customer cohorts, five strategic plays. Each cohort has a
          recommended path, a portfolio lifecycle view (Future Platform /
          Maintain / End of Life) and a default package — a credible starting
          point that the team can tailor to the conversation.
        </p>
      </div>

      <div className="space-y-10">
        {cohorts.map((cohort, idx) => {
          const pkg = getPackageById(cohort.recommendedPackageId);
          const recommendedModules = cohort.recommendedModuleIds
            .map((id) => getModuleById(id))
            .filter((m): m is NonNullable<ReturnType<typeof getModuleById>> => Boolean(m));

          const blockBreakdown = moduleBlocks
            .slice()
            .sort((a, b) => a.order - b.order)
            .map((block) => ({
              block,
              modules: recommendedModules.filter((m) => m.block === block.id),
            }));

          return (
            <section
              key={cohort.id}
              className="card overflow-hidden"
            >
              <div className="grid lg:grid-cols-[2fr_1.4fr] divide-y lg:divide-y-0 lg:divide-x divide-[var(--color-border)]">
                {/* Left: identity */}
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="label-eyebrow">Cohort 0{idx + 1}</span>
                    <span className="pill pill-future">
                      {cohort.recommendedPath}
                    </span>
                  </div>
                  <h2 className="text-3xl font-light tracking-tight text-[var(--color-ink)]">
                    {cohort.name}
                  </h2>
                  <p className="text-sm text-[var(--color-text-muted)] mt-2">
                    {cohort.tagline}
                  </p>

                  <dl className="mt-6 grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <dt className="label-small text-[var(--color-text-muted)]">
                        GWP range
                      </dt>
                      <dd className="text-[var(--color-ink)] mono">
                        {cohort.gwpRange}
                      </dd>
                    </div>
                    <div>
                      <dt className="label-small text-[var(--color-text-muted)]">
                        Recommended package
                      </dt>
                      <dd>
                        {pkg ? (
                          <Link
                            href="/packages"
                            className="text-[var(--color-primary)] hover:underline font-medium"
                          >
                            {pkg.name}
                          </Link>
                        ) : (
                          '—'
                        )}
                      </dd>
                    </div>
                  </dl>

                  <div className="mt-6">
                    <div className="label-small text-[var(--color-text-muted)] mb-2">
                      Characteristics
                    </div>
                    <ul className="space-y-1.5">
                      {cohort.characteristics.map((c) => (
                        <li
                          key={c}
                          className="text-sm text-[var(--color-ink)] flex gap-2"
                        >
                          <span className="text-[var(--color-accent)]">·</span>
                          <span>{c}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6 p-4 rounded-lg bg-[var(--color-surface-alt)] border border-[var(--color-border)]">
                    <div className="label-eyebrow mb-2">Why this path</div>
                    <p className="text-sm text-[var(--color-ink)] leading-relaxed">
                      {cohort.salesRationale}
                    </p>
                    <p className="text-xs text-[var(--color-text-muted)] mt-2 italic">
                      {PATH_BLURB[cohort.recommendedPath]}
                    </p>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <Link
                      href={`/configurator?cohort=${cohort.id}`}
                      className="btn-primary"
                    >
                      Configure for this cohort →
                    </Link>
                    <Link href="/packages" className="btn-ghost">
                      View package detail
                    </Link>
                  </div>
                </div>

                {/* Right: lifecycle map + recommended modules */}
                <div className="p-8 bg-[var(--color-surface-mist)]">
                  <div className="label-eyebrow mb-4">
                    Portfolio lifecycle for this cohort
                  </div>

                  <div className="space-y-3">
                    <div className="flex gap-3 items-start">
                      <span className="pill pill-future mt-0.5">
                        Future Platform
                      </span>
                      <span className="text-sm text-[var(--color-ink)] flex-1">
                        {cohort.lifecycleMapping.futurePlatform}
                      </span>
                    </div>
                    <div className="flex gap-3 items-start">
                      <span className="pill pill-maintain mt-0.5">
                        Maintain
                      </span>
                      <span className="text-sm text-[var(--color-ink)] flex-1">
                        {cohort.lifecycleMapping.maintain}
                      </span>
                    </div>
                    <div className="flex gap-3 items-start">
                      <span className="pill pill-eol mt-0.5">End of Life</span>
                      <span className="text-sm text-[var(--color-ink)] flex-1">
                        {cohort.lifecycleMapping.endOfLife}
                      </span>
                    </div>
                  </div>

                  <div className="divider-soft my-6" />

                  <div className="label-eyebrow mb-3">
                    Recommended module set
                  </div>
                  <div className="space-y-4">
                    {blockBreakdown
                      .filter((b) => b.modules.length > 0)
                      .map(({ block, modules: mods }) => (
                        <div key={block.id}>
                          <div className="text-xs font-semibold text-[var(--color-primary)] mb-1.5 uppercase tracking-wider">
                            {block.shortName}
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {mods.map((m) => (
                              <span
                                key={m.id}
                                className="text-xs px-2.5 py-1 rounded-md bg-white border border-[var(--color-border)] text-[var(--color-ink)]"
                              >
                                {m.name}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
