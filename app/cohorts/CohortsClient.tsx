'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getModuleById, getPackageById } from '@/lib/data';
import { useDemoData } from '@/lib/demo-data-context';
import type { Cohort, RecommendedPath } from '@/lib/types';
import HelpHint from '../components/HelpHint';

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

const RECOMMENDED_PATHS: RecommendedPath[] = [
  'Direct-to-SaaS',
  'SaaS Native Growth',
  'Hybrid Bridge',
  'Data & Decision Led',
  'Maintain → Future Pilot',
];

type EditableFields = Pick<
  Cohort,
  'name' | 'tagline' | 'gwpRange' | 'gwpMidpoint' | 'recommendedPath' | 'salesRationale'
>;

export default function CohortsClient() {
  const { cohorts, moduleBlocks, setCohorts } = useDemoData();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState<EditableFields | null>(null);

  const openEdit = (cohort: Cohort) => {
    setEditingId(cohort.id);
    setDraft({
      name: cohort.name,
      tagline: cohort.tagline,
      gwpRange: cohort.gwpRange,
      gwpMidpoint: cohort.gwpMidpoint,
      recommendedPath: cohort.recommendedPath,
      salesRationale: cohort.salesRationale,
    });
  };

  const closeEdit = () => {
    setEditingId(null);
    setDraft(null);
  };

  const saveEdit = () => {
    if (!editingId || !draft) return;
    setCohorts(
      cohorts.map((c) =>
        c.id === editingId
          ? {
              ...c,
              name: draft.name,
              tagline: draft.tagline,
              gwpRange: draft.gwpRange,
              gwpMidpoint: Number.isFinite(draft.gwpMidpoint) ? draft.gwpMidpoint : c.gwpMidpoint,
              recommendedPath: draft.recommendedPath,
              salesRationale: draft.salesRationale,
            }
          : c,
      ),
    );
    closeEdit();
  };

  useEffect(() => {
    if (!editingId) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeEdit();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [editingId]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-10 sm:py-12">
      <div className="card-elevated brand-card p-6 sm:p-8 mb-8 sm:mb-10">
        <div className="label-eyebrow mb-3">Cohort Mapping</div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-[var(--color-ink)] mb-4">
          From customer cohort to recommended subscription path
        </h1>
        <p className="text-[var(--color-text-muted)] max-w-3xl text-sm sm:text-base">
          Five customer cohorts, five strategic plays. Each cohort has a
          recommended path, a portfolio lifecycle view (Future Platform /
          Maintain / End of Life) and a default package — a credible starting
          point that the team can tailor to the conversation.
        </p>
        <div className="caveat mt-5 max-w-3xl">
          <span>
            <strong>Demo framing.</strong> Cohort buckets and recommended
            paths are an internal point of view for the toolkit, not
            externally published Sapiens segmentation.
          </span>
        </div>
      </div>

      <div className="space-y-8 sm:space-y-10">
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
                <div className="p-6 sm:p-8">
                  <div className="flex items-center gap-2 mb-3 flex-wrap">
                    <span className="label-eyebrow">Cohort 0{idx + 1}</span>
                    <span className="pill pill-future">
                      {cohort.recommendedPath}
                    </span>
                    <HelpHint label={cohort.recommendedPath}>
                      {PATH_BLURB[cohort.recommendedPath]}
                    </HelpHint>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-light tracking-tight text-[var(--color-ink)] break-words">
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
                      <dd className="text-[var(--color-ink)] mono break-words">
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
                    <button
                      onClick={() => openEdit(cohort)}
                      className="btn-ghost"
                    >
                      Edit cohort
                    </button>
                    <Link href="/packages" className="btn-ghost">
                      View package detail
                    </Link>
                  </div>
                </div>

                {/* Right: lifecycle map + recommended modules */}
                <div className="p-6 sm:p-8 bg-[var(--color-surface-mist)]">
                  <div className="flex items-center mb-4">
                    <span className="label-eyebrow">
                      Portfolio lifecycle for this cohort
                    </span>
                    <HelpHint label="Portfolio lifecycle">
                      Sapiens portfolio segmentation:{' '}
                      <strong>Future Platform</strong> (sell-leading),{' '}
                      <strong>Maintain</strong> (keep stable), and{' '}
                      <strong>End of Life</strong> (sunset). Helps frame
                      which conversations to lead with for this cohort.
                    </HelpHint>
                  </div>

                  <div className="space-y-3">
                    <div className="flex gap-3 items-start">
                      <span className="pill pill-future mt-0.5 shrink-0">
                        Future Platform
                      </span>
                      <span className="text-sm text-[var(--color-ink)] flex-1 break-words">
                        {cohort.lifecycleMapping.futurePlatform}
                      </span>
                    </div>
                    <div className="flex gap-3 items-start">
                      <span className="pill pill-maintain mt-0.5 shrink-0">
                        Maintain
                      </span>
                      <span className="text-sm text-[var(--color-ink)] flex-1 break-words">
                        {cohort.lifecycleMapping.maintain}
                      </span>
                    </div>
                    <div className="flex gap-3 items-start">
                      <span className="pill pill-eol mt-0.5 shrink-0">End of Life</span>
                      <span className="text-sm text-[var(--color-ink)] flex-1 break-words">
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

      <div className="mt-10 sm:mt-12 card p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="label-eyebrow">Next step</div>
          <p className="text-sm text-[var(--color-ink)] mt-1">
            Build a live configuration for any of these cohorts, or anchor on
            the June 30 launch packages.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link href="/packages" className="btn-ghost">
            Launch packages →
          </Link>
          <Link href="/configurator" className="btn-primary">
            Open the Configurator →
          </Link>
        </div>
      </div>

      {/* Edit Modal */}
      {editingId && draft && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="card-elevated w-full max-w-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="label-eyebrow">Edit Cohort</div>
              <button onClick={closeEdit} className="text-[var(--color-text-muted)] hover:text-[var(--color-ink)]">✕</button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="label-small text-[var(--color-text-muted)]">Name</label>
                <input className="input mt-1" value={draft.name} onChange={e => setDraft({...draft, name: e.target.value})} />
              </div>
              <div>
                <label className="label-small text-[var(--color-text-muted)]">Tagline</label>
                <input className="input mt-1" value={draft.tagline} onChange={e => setDraft({...draft, tagline: e.target.value})} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label-small text-[var(--color-text-muted)]">GWP Range</label>
                  <input className="input mt-1" value={draft.gwpRange} onChange={e => setDraft({...draft, gwpRange: e.target.value})} />
                </div>
                <div>
                  <label className="label-small text-[var(--color-text-muted)]">GWP Midpoint</label>
                  <input type="number" className="input mt-1" value={draft.gwpMidpoint} onChange={e => setDraft({...draft, gwpMidpoint: parseInt(e.target.value) || 0})} />
                </div>
              </div>
              <div>
                <label className="label-small text-[var(--color-text-muted)]">Recommended Path</label>
                <select className="input mt-1" value={draft.recommendedPath} onChange={e => setDraft({...draft, recommendedPath: e.target.value as RecommendedPath})}>
                  {RECOMMENDED_PATHS.map(p => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="label-small text-[var(--color-text-muted)]">Sales Rationale</label>
                <textarea className="input mt-1 h-24" value={draft.salesRationale} onChange={e => setDraft({...draft, salesRationale: e.target.value})} />
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button onClick={closeEdit} className="btn-ghost flex-1">Cancel</button>
              <button onClick={saveEdit} className="btn-primary flex-1">Save changes</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
