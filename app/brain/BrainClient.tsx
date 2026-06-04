'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { useDemoData } from '@/lib/demo-data-context';
import {
  brainAssets,
  buildProposalPack,
  useCaseTemplates,
} from '@/lib/sales-brain';
import type { Cohort, RecommendedPath } from '@/lib/types';

const PATH_OPTIONS: RecommendedPath[] = [
  'Direct-to-SaaS',
  'SaaS Native Growth',
  'Hybrid Bridge',
  'Data & Decision Led',
  'Maintain → Future Pilot',
];

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 60);
}

function newCohort(): Cohort {
  return {
    id: `cohort-${Date.now()}`,
    name: 'New sales cohort',
    tagline: 'Define the buyer profile and sales motion.',
    gwpRange: '$100M–$500M',
    gwpMidpoint: 250_000_000,
    characteristics: ['Define buyer signals', 'Add line-of-business context'],
    recommendedPath: 'Hybrid Bridge',
    lifecycleMapping: {
      futurePlatform: 'Lead with the future-state subscription platform.',
      maintain: 'Identify bridge dependencies and managed transition needs.',
      endOfLife: 'Use as the trigger for modernisation discovery.',
    },
    recommendedPackageId: 'sapiens-horizon',
    recommendedModuleIds: [],
    salesRationale: 'Explain why this cohort should buy now and which package gives sales the cleanest story.',
  };
}

function joinList(items: string[]): string {
  return items.join('\n');
}

export default function BrainClient() {
  const {
    cohorts,
    setCohorts,
    modules,
    setModules,
    launchPackages,
    setLaunchPackages,
    knowledgeSnapshot,
  } = useDemoData();

  const [activeTemplateId, setActiveTemplateId] = useState(useCaseTemplates[0]?.id ?? '');
  const [buyerName, setBuyerName] = useState('Example insurer');
  const [specificNeed, setSpecificNeed] = useState('');
  const [proposalVisible, setProposalVisible] = useState(true);
  const [query, setQuery] = useState('');
  const [pathFilter, setPathFilter] = useState<'all' | RecommendedPath>('all');
  const [sortBy, setSortBy] = useState<'name' | 'gwp' | 'package'>('name');
  const [editingCohort, setEditingCohort] = useState<Cohort>(cohorts[0] ?? newCohort());

  const pack = useMemo(() => buildProposalPack(activeTemplateId), [activeTemplateId]);
  const { template, confidence, discoveryQuestions, proposalAngles, risks } = pack;

  const packageById = useMemo(
    () => new Map(launchPackages.map((pkg) => [pkg.id, pkg])),
    [launchPackages],
  );


  const filteredCohorts = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return cohorts
      .filter((cohort) => {
        const matchesQuery =
          !needle ||
          [cohort.name, cohort.tagline, cohort.salesRationale, cohort.recommendedPath]
            .join(' ')
            .toLowerCase()
            .includes(needle);
        const matchesPath = pathFilter === 'all' || cohort.recommendedPath === pathFilter;
        return matchesQuery && matchesPath;
      })
      .slice()
      .sort((a, b) => {
        if (sortBy === 'gwp') return b.gwpMidpoint - a.gwpMidpoint;
        if (sortBy === 'package') {
          return (packageById.get(a.recommendedPackageId)?.name ?? a.recommendedPackageId).localeCompare(
            packageById.get(b.recommendedPackageId)?.name ?? b.recommendedPackageId,
          );
        }
        return a.name.localeCompare(b.name);
      });
  }, [cohorts, packageById, pathFilter, query, sortBy]);

  const generatedCatalogue = useMemo(() => {
    return [
      `Use case: ${template.title}`,
      `Buyer: ${buyerName || template.defaultBuyer}`,
      `Region: ${template.region}`,
      `Category: ${template.category}`,
      `Urgency: ${template.urgency}`,
      `Confidence: ${confidence}`,
      '',
      'Client need',
      specificNeed || template.clientNeed,
      '',
      'Recommended product/modules',
      joinList(template.recommendedModules.map((module) => `- ${module}`)),
      '',
      'Proposal sections',
      joinList(template.proposalSections.map((section) => `- ${section}`)),
      '',
      'Discovery questions',
      joinList(discoveryQuestions.map((question) => `- ${question}`)),
      '',
      'Sales angles',
      joinList(proposalAngles.map((angle) => `- ${angle}`)),
      '',
      'Risks and validation notes',
      joinList(risks.map((risk) => `- ${risk}`)),
    ].join('\n');
  }, [buyerName, confidence, discoveryQuestions, proposalAngles, risks, specificNeed, template]);

  const updateEditing = <K extends keyof Cohort>(key: K, value: Cohort[K]) => {
    setEditingCohort((current) => ({ ...current, [key]: value }));
  };

  const updateLifecycle = (key: keyof Cohort['lifecycleMapping'], value: string) => {
    setEditingCohort((current) => ({
      ...current,
      lifecycleMapping: { ...current.lifecycleMapping, [key]: value },
    }));
  };

  const toggleModule = (moduleId: string) => {
    setEditingCohort((current) => ({
      ...current,
      recommendedModuleIds: current.recommendedModuleIds.includes(moduleId)
        ? current.recommendedModuleIds.filter((id) => id !== moduleId)
        : [...current.recommendedModuleIds, moduleId],
    }));
  };

  const saveCohort = () => {
    const id = editingCohort.id || slugify(editingCohort.name) || `cohort-${Date.now()}`;
    const saved: Cohort = { ...editingCohort, id };
    const exists = cohorts.some((cohort) => cohort.id === id);
    const nextCohorts = exists
      ? cohorts.map((cohort) => (cohort.id === id ? saved : cohort))
      : [...cohorts, saved];

    setCohorts(nextCohorts);

    setLaunchPackages(
      launchPackages.map((pkg) => {
        const without = pkg.targetCohorts.filter((name) => name !== saved.name);
        return pkg.id === saved.recommendedPackageId
          ? { ...pkg, targetCohorts: Array.from(new Set([...without, saved.name])) }
          : { ...pkg, targetCohorts: without };
      }),
    );

    setModules(
      modules.map((module) => {
        const without = module.targetCohorts.filter((name) => name !== saved.name);
        return saved.recommendedModuleIds.includes(module.id)
          ? { ...module, targetCohorts: Array.from(new Set([...without, saved.name])) }
          : { ...module, targetCohorts: without.length ? without : module.targetCohorts };
      }),
    );
  };

  const createAdditionalCohort = () => {
    const cohort = newCohort();
    setEditingCohort(cohort);
    setCohorts([...cohorts, cohort]);
  };

  const deleteCohort = (id: string) => {
    const target = cohorts.find((cohort) => cohort.id === id);
    setCohorts(cohorts.filter((cohort) => cohort.id !== id));
    if (target) {
      setLaunchPackages(
        launchPackages.map((pkg) => ({
          ...pkg,
          targetCohorts: pkg.targetCohorts.filter((name) => name !== target.name),
        })),
      );
    }
    const next = cohorts.find((cohort) => cohort.id !== id) ?? newCohort();
    setEditingCohort(next);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-8 sm:py-12">
      <section className="card-elevated brand-card p-6 sm:p-8 mb-8 overflow-hidden relative">
        <div className="absolute inset-y-0 right-0 w-1/2 bg-[radial-gradient(circle_at_top_right,rgba(255,89,0,0.16),transparent_32rem)] pointer-events-none" />
        <div className="relative grid lg:grid-cols-[1.05fr_0.95fr] gap-8 items-end">
          <div>
            <div className="label-eyebrow mb-3">Second Brain · Sales Intelligence</div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-light tracking-tight text-[var(--color-ink)] max-w-4xl">
              Operate the sales brain, not just the cards.
            </h1>
            <p className="text-[var(--color-text-muted)] max-w-3xl mt-5 text-sm sm:text-base leading-relaxed">
              This is the operating layer behind the toolkit: capture niche use cases, create and configure cohorts,
              assign proposed packages, connect modules to those cohorts, and keep the AI knowledge base aligned so
              Deal Advisor gives sales advice that reflects the latest operating model.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#admin" className="btn-accent">Configure cohorts</a>
              <a href="#generator" className="btn-ghost">Generate sales pack</a>
              <a href="#catalogue" className="btn-ghost">Review catalogue</a>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <MetricCard label="Cohorts" value={cohorts.length.toString()} note="Admin-configurable" />
            <MetricCard label="Packages" value={launchPackages.length.toString()} note="Assignable sales offers" />
            <MetricCard label="Modules" value={modules.length.toString()} note="Mapped to cohorts" />
            <MetricCard label="Brain assets" value={brainAssets.length.toString()} note="Reusable intelligence" />
          </div>
        </div>
      </section>

      <section id="admin" className="grid xl:grid-cols-[0.85fr_1.15fr] gap-6 mb-8">
        <div className="card-elevated p-6 sm:p-7">
          <div className="flex items-start justify-between gap-4 mb-5">
            <div>
              <div className="label-eyebrow mb-3">Admin controls</div>
              <h2 className="text-2xl sm:text-4xl font-light tracking-tight text-[var(--color-ink)]">
                Sort, filter and select cohorts.
              </h2>
            </div>
            <button type="button" onClick={createAdditionalCohort} className="btn-primary shrink-0">
              Add cohort
            </button>
          </div>

          <div className="grid sm:grid-cols-3 gap-3 mb-5">
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search cohorts…"
              className="rounded-lg border border-[var(--color-border)] bg-white px-3 py-2 text-sm sm:col-span-1"
            />
            <select
              value={pathFilter}
              onChange={(event) => setPathFilter(event.target.value as 'all' | RecommendedPath)}
              className="rounded-lg border border-[var(--color-border)] bg-white px-3 py-2 text-sm"
            >
              <option value="all">All paths</option>
              {PATH_OPTIONS.map((path) => <option key={path} value={path}>{path}</option>)}
            </select>
            <select
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value as 'name' | 'gwp' | 'package')}
              className="rounded-lg border border-[var(--color-border)] bg-white px-3 py-2 text-sm"
            >
              <option value="name">Sort: name</option>
              <option value="gwp">Sort: GWP</option>
              <option value="package">Sort: package</option>
            </select>
          </div>

          <div className="space-y-3 max-h-[620px] overflow-auto pr-1">
            {filteredCohorts.map((cohort) => {
              const pkg = packageById.get(cohort.recommendedPackageId);
              const active = editingCohort.id === cohort.id;
              return (
                <button
                  key={cohort.id}
                  type="button"
                  onClick={() => setEditingCohort(cohort)}
                  className={`w-full rounded-xl border p-4 text-left transition-colors ${active ? 'border-[var(--color-primary)] bg-[#F4F6FF]' : 'border-[var(--color-border)] bg-white hover:border-[var(--color-primary)]'}`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-semibold text-[var(--color-ink)]">{cohort.name}</h3>
                      <p className="text-xs text-[var(--color-text-muted)] leading-relaxed mt-1">{cohort.tagline}</p>
                    </div>
                    <span className="pill pill-future shrink-0">{cohort.gwpRange}</span>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2 text-xs text-[var(--color-text-muted)]">
                    <span className="rounded-full border border-[var(--color-border)] px-2 py-1">{cohort.recommendedPath}</span>
                    <span className="rounded-full border border-[var(--color-border)] px-2 py-1">{pkg?.name ?? cohort.recommendedPackageId}</span>
                    <span className="rounded-full border border-[var(--color-border)] px-2 py-1">{cohort.recommendedModuleIds.length} modules</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="card-elevated p-6 sm:p-7">
          <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
            <div>
              <div className="label-eyebrow mb-3">Cohort model</div>
              <h2 className="text-2xl sm:text-4xl font-light tracking-tight text-[var(--color-ink)]">
                Configure product fit branches.
              </h2>
              <p className="text-sm text-[var(--color-text-muted)] mt-3 max-w-3xl">
                Saving a cohort updates the cohort record, package target cohorts, module target cohorts and the live AI knowledge snapshot.
              </p>
            </div>
            <div className="flex gap-3">
              <button type="button" onClick={saveCohort} className="btn-accent">Save branch</button>
              <button type="button" onClick={() => deleteCohort(editingCohort.id)} className="btn-ghost">Delete</button>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-4">
            <Field label="Cohort name" value={editingCohort.name} onChange={(value) => updateEditing('name', value)} />
            <Field label="Cohort ID" value={editingCohort.id} onChange={(value) => updateEditing('id', slugify(value))} />
            <Field label="Tagline" value={editingCohort.tagline} onChange={(value) => updateEditing('tagline', value)} />
            <Field label="GWP range" value={editingCohort.gwpRange} onChange={(value) => updateEditing('gwpRange', value)} />
            <label className="block">
              <span className="label-small text-[var(--color-text-muted)] font-semibold">GWP midpoint</span>
              <input
                type="number"
                value={editingCohort.gwpMidpoint}
                onChange={(event) => updateEditing('gwpMidpoint', Number(event.target.value))}
                className="mt-2 w-full rounded-lg border border-[var(--color-border)] bg-white px-3 py-3 text-sm"
              />
            </label>
            <label className="block">
              <span className="label-small text-[var(--color-text-muted)] font-semibold">Recommended path</span>
              <select
                value={editingCohort.recommendedPath}
                onChange={(event) => updateEditing('recommendedPath', event.target.value as RecommendedPath)}
                className="mt-2 w-full rounded-lg border border-[var(--color-border)] bg-white px-3 py-3 text-sm"
              >
                {PATH_OPTIONS.map((path) => <option key={path} value={path}>{path}</option>)}
              </select>
            </label>
            <label className="block lg:col-span-2">
              <span className="label-small text-[var(--color-text-muted)] font-semibold">Proposed package</span>
              <select
                value={editingCohort.recommendedPackageId}
                onChange={(event) => updateEditing('recommendedPackageId', event.target.value)}
                className="mt-2 w-full rounded-lg border border-[var(--color-border)] bg-white px-3 py-3 text-sm"
              >
                {launchPackages.map((pkg) => <option key={pkg.id} value={pkg.id}>{pkg.name} — {pkg.subtitle}</option>)}
              </select>
            </label>
          </div>

          <label className="block mt-4">
            <span className="label-small text-[var(--color-text-muted)] font-semibold">Sales rationale</span>
            <textarea
              value={editingCohort.salesRationale}
              onChange={(event) => updateEditing('salesRationale', event.target.value)}
              rows={4}
              className="mt-2 w-full rounded-lg border border-[var(--color-border)] bg-white px-3 py-3 text-sm"
            />
          </label>

          <div className="grid md:grid-cols-3 gap-3 mt-4">
            <TextArea label="Future Platform fit" value={editingCohort.lifecycleMapping.futurePlatform} onChange={(value) => updateLifecycle('futurePlatform', value)} />
            <TextArea label="Maintain fit" value={editingCohort.lifecycleMapping.maintain} onChange={(value) => updateLifecycle('maintain', value)} />
            <TextArea label="End-of-Life fit" value={editingCohort.lifecycleMapping.endOfLife} onChange={(value) => updateLifecycle('endOfLife', value)} />
          </div>

          <div className="mt-5">
            <div className="label-small text-[var(--color-text-muted)] font-semibold mb-3">Recommended modules for this cohort</div>
            <div className="grid md:grid-cols-2 gap-3 max-h-[420px] overflow-auto pr-1">
              {modules.map((module) => {
                const selected = editingCohort.recommendedModuleIds.includes(module.id);
                return (
                  <button
                    key={module.id}
                    type="button"
                    onClick={() => toggleModule(module.id)}
                    className={`rounded-xl border p-3 text-left ${selected ? 'border-[var(--color-primary)] bg-[#F4F6FF]' : 'border-[var(--color-border)] bg-white'}`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="text-sm font-semibold text-[var(--color-ink)]">{module.name}</div>
                        <div className="text-xs text-[var(--color-text-muted)] mt-1">{module.block} · {module.lifecycle}</div>
                      </div>
                      <span className={`pill ${selected ? 'pill-required' : 'pill-future'}`}>{selected ? 'Assigned' : 'Add'}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="grid lg:grid-cols-[0.85fr_1.15fr] gap-6 mb-8" id="generator">
        <div className="card-elevated p-6 sm:p-7">
          <div className="label-eyebrow mb-3">Pack generator</div>
          <h2 className="text-2xl sm:text-4xl font-light tracking-tight text-[var(--color-ink)]">
            Configure the niche ask.
          </h2>
          <p className="text-sm text-[var(--color-text-muted)] leading-relaxed mt-3">
            Pick a use case, add the buyer context, then use the generated pack as the first draft for a proposal, sales call prep note or product-offer discussion.
          </p>

          <div className="mt-6 space-y-5">
            <label className="block">
              <span className="label-small text-[var(--color-text-muted)] font-semibold">Use-case template</span>
              <select value={activeTemplateId} onChange={(event) => { setActiveTemplateId(event.target.value); setProposalVisible(true); }} className="mt-2 w-full rounded-lg border border-[var(--color-border)] bg-white px-3 py-3 text-sm">
                {useCaseTemplates.map((item) => <option key={item.id} value={item.id}>{item.title}</option>)}
              </select>
            </label>
            <Field label="Buyer / account" value={buyerName} onChange={setBuyerName} />
            <label className="block">
              <span className="label-small text-[var(--color-text-muted)] font-semibold">Specific client wording / ask</span>
              <textarea value={specificNeed} onChange={(event) => setSpecificNeed(event.target.value)} placeholder={template.clientNeed} rows={5} className="mt-2 w-full rounded-lg border border-[var(--color-border)] bg-white px-3 py-3 text-sm" />
            </label>
            <button type="button" onClick={() => setProposalVisible(true)} className="btn-accent w-full">Generate proposal intelligence</button>
          </div>
        </div>

        <div className="card-elevated p-6 sm:p-7">
          <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
            <div>
              <div className="label-eyebrow mb-2">Generated pack</div>
              <h2 className="text-2xl sm:text-4xl font-light tracking-tight text-[var(--color-ink)]">{template.title}</h2>
            </div>
            <span className={`pill ${confidence === 'Grounded' ? 'pill-future' : 'pill-maintain'}`}>{confidence}</span>
          </div>

          {proposalVisible ? (
            <div className="grid gap-5">
              <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-alt)] p-5">
                <div className="label-small text-[var(--color-text-muted)] font-semibold mb-2">Output promise</div>
                <p className="text-sm leading-relaxed text-[var(--color-ink)]">{template.outputPromise}</p>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <PackBlock title="Recommended modules" items={template.recommendedModules} />
                <PackBlock title="Proposal sections" items={template.proposalSections} />
                <PackBlock title="Discovery questions" items={discoveryQuestions.slice(0, 6)} />
                <PackBlock title="Validation guardrails" items={risks.slice(0, 6)} tone="warning" />
              </div>
              <div className="rounded-xl border border-[var(--color-border)] bg-white overflow-hidden">
                <div className="px-4 py-3 border-b border-[var(--color-border)] flex items-center justify-between gap-3">
                  <div>
                    <div className="label-small text-[var(--color-text-muted)] font-semibold">Copy-ready intelligence brief</div>
                    <p className="text-xs text-[var(--color-text-muted)] mt-1">Use as a sales prep note or proposal starter.</p>
                  </div>
                  <button type="button" className="text-xs font-semibold text-[var(--color-primary)] hover:text-[var(--color-accent)]" onClick={() => navigator.clipboard?.writeText(generatedCatalogue)}>Copy</button>
                </div>
                <pre className="mono whitespace-pre-wrap text-xs leading-relaxed text-[var(--color-ink)] p-4 max-h-[360px] overflow-auto bg-[var(--color-surface-mist)]">{generatedCatalogue}</pre>
              </div>
            </div>
          ) : null}
        </div>
      </section>

      <section id="catalogue" className="card-elevated p-6 sm:p-8 mb-8">
        <div className="label-eyebrow mb-3">Brain catalogue</div>
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl sm:text-4xl font-light tracking-tight text-[var(--color-ink)]">Reusable knowledge assets.</h2>
            <p className="text-sm text-[var(--color-text-muted)] leading-relaxed mt-3 max-w-3xl">
              Each asset has a sales use, product fit, discovery questions, proposal angles, risk notes and source confidence. That structure keeps the brain useful instead of becoming a dumping ground.
            </p>
          </div>
          <Link href="/docs#second-brain" className="btn-ghost">Read operating docs</Link>
        </div>
        <div className="grid md:grid-cols-2 gap-5">
          {brainAssets.map((asset) => (
            <article key={asset.id} className="card p-5 flex flex-col">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="pill pill-status">{asset.category}</span>
                <span className="pill pill-future">{asset.region}</span>
                {asset.sources.some((source) => source.confidence === 'Needs validation') ? <span className="pill pill-maintain">Needs validation</span> : <span className="pill pill-recommended">Grounded</span>}
              </div>
              <h3 className="text-xl font-semibold text-[var(--color-ink)]">{asset.title}</h3>
              <p className="text-sm text-[var(--color-text-muted)] leading-relaxed mt-3">{asset.summary}</p>
              <div className="divider-soft my-5" />
              <div className="space-y-4 text-sm flex-1">
                <div>
                  <div className="label-small font-semibold text-[var(--color-text-muted)] mb-1">Sales use</div>
                  <p className="text-[var(--color-ink)] leading-relaxed">{asset.salesUse}</p>
                </div>
                <div>
                  <div className="label-small font-semibold text-[var(--color-text-muted)] mb-2">Product fit</div>
                  <ul className="space-y-1 text-[var(--color-ink)]">{asset.productFit.slice(0, 5).map((item) => <li key={item}>• {item}</li>)}</ul>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="card-elevated p-6 sm:p-8">
        <div className="label-eyebrow mb-3">Live AI knowledge branch</div>
        <h2 className="text-2xl sm:text-4xl font-light tracking-tight text-[var(--color-ink)] mb-4">
          What Deal Advisor now receives.
        </h2>
        <p className="text-sm text-[var(--color-text-muted)] leading-relaxed max-w-3xl mb-5">
          The side-drawer AI receives this admin-configured cohort/package/module snapshot alongside the static product knowledge base, so its advice reflects the operating model you save here.
        </p>
        <pre className="mono whitespace-pre-wrap text-xs leading-relaxed text-[var(--color-ink)] p-4 max-h-[420px] overflow-auto bg-[var(--color-surface-mist)] rounded-xl border border-[var(--color-border)]">{knowledgeSnapshot}</pre>
      </section>
    </div>
  );
}

function Field({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <label className="block">
      <span className="label-small text-[var(--color-text-muted)] font-semibold">{label}</span>
      <input value={value} onChange={(event) => onChange(event.target.value)} className="mt-2 w-full rounded-lg border border-[var(--color-border)] bg-white px-3 py-3 text-sm" />
    </label>
  );
}

function TextArea({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <label className="block">
      <span className="label-small text-[var(--color-text-muted)] font-semibold">{label}</span>
      <textarea value={value} onChange={(event) => onChange(event.target.value)} rows={4} className="mt-2 w-full rounded-lg border border-[var(--color-border)] bg-white px-3 py-3 text-sm" />
    </label>
  );
}

function MetricCard({ label, value, note }: { label: string; value: string; note: string }) {
  return (
    <div className="card p-5 bg-white/90">
      <div className="label-small text-[var(--color-text-muted)] font-semibold">{label}</div>
      <div className="mono text-3xl font-light text-[var(--color-ink)] mt-2">{value}</div>
      <div className="text-xs text-[var(--color-text-muted)] mt-2">{note}</div>
    </div>
  );
}

function PackBlock({ title, items, tone = 'default' }: { title: string; items: string[]; tone?: 'default' | 'warning' }) {
  return (
    <div className={`rounded-xl border p-4 ${tone === 'warning' ? 'border-[#FFD9AE] bg-[#FFF8EC]' : 'border-[var(--color-border)] bg-white'}`}>
      <div className="label-small text-[var(--color-text-muted)] font-semibold mb-3">{title}</div>
      <ul className="space-y-2 text-sm text-[var(--color-ink)] leading-relaxed">{items.map((item) => <li key={item}>• {item}</li>)}</ul>
    </div>
  );
}
