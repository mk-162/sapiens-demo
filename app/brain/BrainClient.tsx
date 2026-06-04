'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { useDemoData } from '@/lib/demo-data-context';
import { buildProposalPack, useCaseTemplates } from '@/lib/sales-brain';
import type { MarkdownBrainAsset, BrainStatus } from '@/lib/brain-markdown';

const STATUSES: BrainStatus[] = ['draft', 'agent_proposed', 'needs_validation', 'validated', 'retired'];
const NAV = [
  ['overview', 'Overview'],
  ['library', 'Asset library'],
  ['editor', 'Visual editor'],
  ['relationships', 'Map'],
  ['generator', 'Pack generator'],
  ['ai-context', 'AI context'],
];

type Props = {
  markdownAssets: MarkdownBrainAsset[];
  markdownSnapshot: string;
};

function listToText(items: string[]): string {
  return items.join('\n');
}

function textToList(value: string): string[] {
  return value
    .split('\n')
    .map((item) => item.replace(/^[-•]\s*/, '').trim())
    .filter(Boolean);
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 64);
}

function assetToMarkdown(asset: MarkdownBrainAsset): string {
  const arrayBlock = (key: string, values: string[]) => `${key}:\n${values.map((value) => `  - ${value}`).join('\n')}`;
  return `---\nid: ${asset.id}\ntitle: ${asset.title}\nstatus: ${asset.status}\ncategory: ${asset.category}\nregion: ${asset.region}\nconfidence: ${asset.confidence}\n${arrayBlock('buyerSignals', asset.buyerSignals)}\n${arrayBlock('productFit', asset.productFit)}\n${arrayBlock('relatedModules', asset.relatedModules)}\n${arrayBlock('relatedCohorts', asset.relatedCohorts)}\n${arrayBlock('sourceUrls', asset.sourceUrls)}\nlastReviewed: ${asset.lastReviewed}\nowner: ${asset.owner}\n---\n\n${asset.body.trim()}\n`;
}

function newAsset(): MarkdownBrainAsset {
  const id = `new-brain-asset-${Date.now()}`;
  return {
    id,
    title: 'New brain asset',
    status: 'draft',
    category: 'Proposal Asset',
    region: 'Global',
    confidence: 'Needs validation',
    buyerSignals: ['Define buyer signal'],
    productFit: ['Define product fit'],
    relatedModules: [],
    relatedCohorts: [],
    sourceUrls: [],
    lastReviewed: new Date().toISOString().slice(0, 10),
    owner: 'Sales Enablement',
    filePath: `content/brain/assets/${id}.md`,
    sections: {},
    body: `## Sales use\n\nExplain when sales should use this asset.\n\n## Discovery questions\n\n- Add discovery question\n\n## Proposal angles\n\n- Add proposal angle\n\n## Risks / validation notes\n\nMark anything that needs product, legal or commercial validation.`,
  };
}

export default function BrainClient({ markdownAssets, markdownSnapshot }: Props) {
  const { cohorts, modules, knowledgeSnapshot } = useDemoData();
  const [assets, setAssets] = useState<MarkdownBrainAsset[]>(markdownAssets);
  const [selectedId, setSelectedId] = useState(markdownAssets[0]?.id ?? '');
  const [query, setQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [activeTemplateId, setActiveTemplateId] = useState(useCaseTemplates[0]?.id ?? '');
  const [buyerName, setBuyerName] = useState('Example insurer');
  const [specificNeed, setSpecificNeed] = useState('');
  const [saveMessage, setSaveMessage] = useState('');

  const selectedAsset = assets.find((asset) => asset.id === selectedId) ?? assets[0] ?? newAsset();
  const categories = Array.from(new Set(assets.map((asset) => asset.category))).sort();
  const pack = useMemo(() => buildProposalPack(activeTemplateId), [activeTemplateId]);
  const { template, confidence, discoveryQuestions, proposalAngles, risks } = pack;

  const filteredAssets = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return assets.filter((asset) => {
      const haystack = [
        asset.title,
        asset.category,
        asset.region,
        asset.status,
        asset.confidence,
        ...asset.buyerSignals,
        ...asset.productFit,
        asset.body,
      ]
        .join(' ')
        .toLowerCase();
      return (
        (!needle || haystack.includes(needle)) &&
        (categoryFilter === 'all' || asset.category === categoryFilter) &&
        (statusFilter === 'all' || asset.status === statusFilter)
      );
    });
  }, [assets, categoryFilter, query, statusFilter]);

  const counts = useMemo(() => {
    return {
      total: assets.length,
      validated: assets.filter((asset) => asset.status === 'validated').length,
      review: assets.filter((asset) => ['needs_validation', 'agent_proposed', 'draft'].includes(asset.status)).length,
      sources: assets.reduce((sum, asset) => sum + asset.sourceUrls.length, 0),
    };
  }, [assets]);

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
      ...template.recommendedModules.map((module) => `- ${module}`),
      '',
      'Proposal sections',
      ...template.proposalSections.map((section) => `- ${section}`),
      '',
      'Discovery questions',
      ...discoveryQuestions.map((question) => `- ${question}`),
      '',
      'Sales angles',
      ...proposalAngles.map((angle) => `- ${angle}`),
      '',
      'Risks and validation notes',
      ...risks.map((risk) => `- ${risk}`),
    ].join('\n');
  }, [buyerName, confidence, discoveryQuestions, proposalAngles, risks, specificNeed, template]);

  const compiledAiContext = useMemo(() => {
    const liveAssets = assets.map((asset) => {
      const risks = asset.sections['Risks / validation notes'] ?? '';
      return [`Asset: ${asset.title}`, `Status: ${asset.status}`, `Category/region: ${asset.category} / ${asset.region}`, `Product fit: ${asset.productFit.join(', ')}`, `Sources: ${asset.sourceUrls.join(', ')}`, risks ? `Risks: ${risks}` : ''].filter(Boolean).join('\n');
    }).join('\n\n---\n\n');
    return `${liveAssets}\n\n=== Cohort/package/module operating snapshot ===\n\n${knowledgeSnapshot}`;
  }, [assets, knowledgeSnapshot]);

  const updateAsset = <K extends keyof MarkdownBrainAsset>(key: K, value: MarkdownBrainAsset[K]) => {
    setAssets((current) => current.map((asset) => (asset.id === selectedAsset.id ? { ...asset, [key]: value } : asset)));
  };

  const addAsset = () => {
    const asset = newAsset();
    setAssets((current) => [asset, ...current]);
    setSelectedId(asset.id);
    setSaveMessage('New draft created in the browser. Save it to write the Markdown file locally.');
  };

  const saveAsset = async () => {
    setSaveMessage('Saving…');
    const markdown = assetToMarkdown(selectedAsset);
    try {
      const response = await fetch('/api/brain/save', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ asset: selectedAsset, markdown }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Save failed');
      setSaveMessage(`Saved ${data.path}. Commit the repo to publish/version this change.`);
    } catch (error) {
      setSaveMessage(`Could not save automatically: ${error instanceof Error ? error.message : 'unknown error'}. Copy the Markdown export instead.`);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-8 sm:py-12">
      <BreadcrumbTrail
        items={[
          { label: 'Toolkit', href: '/' },
          { label: 'Second Brain', href: '/brain' },
          { label: selectedAsset.category, href: '#library' },
          { label: selectedAsset.title },
        ]}
      />

      <section className="card-elevated brand-card p-6 sm:p-8 mb-6 overflow-hidden relative">
        <div className="absolute inset-y-0 right-0 w-1/2 bg-[radial-gradient(circle_at_top_right,rgba(255,89,0,0.16),transparent_32rem)] pointer-events-none" />
        <div className="relative grid lg:grid-cols-[1.15fr_0.85fr] gap-8 items-end">
          <div>
            <div className="label-eyebrow mb-3">Git-backed Second Brain</div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-light tracking-tight text-[var(--color-ink)] max-w-4xl">
              Manage the brain without getting lost inside it.
            </h1>
            <p className="text-[var(--color-text-muted)] max-w-3xl mt-5 text-sm sm:text-base leading-relaxed">
              The brain now starts from Markdown files in <code className="mono">content/brain/assets</code>. Agents can update those files in Git; client users can visualise, search, edit, validate and preview the AI context from this interface.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#library" className="btn-accent">Browse assets</a>
              <a href="#editor" className="btn-ghost">Edit selected asset</a>
              <a href="#relationships" className="btn-ghost">View map</a>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <MetricCard label="Brain assets" value={counts.total.toString()} note="Markdown-backed" />
            <MetricCard label="Validated" value={counts.validated.toString()} note="Approved for internal use" />
            <MetricCard label="Needs review" value={counts.review.toString()} note="Draft/proposed/validation" />
            <MetricCard label="Sources" value={counts.sources.toString()} note="Public URLs attached" />
          </div>
        </div>
      </section>

      <nav className="sticky top-0 z-30 mb-8 rounded-xl border border-[var(--color-border)] bg-white/95 p-3 shadow-sm backdrop-blur">
        <div className="mb-3 border-b border-[var(--color-border)] pb-3">
          <BreadcrumbTrail
            compact
            items={[
              { label: 'Brain', href: '#overview' },
              { label: selectedAsset.category, href: '#library' },
              { label: selectedAsset.status.replace(/_/g, ' '), href: '#editor' },
              { label: selectedAsset.title, href: '#relationships' },
            ]}
          />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="label-small font-semibold text-[var(--color-text-muted)] mr-2">Brain nav</span>
          {NAV.map(([href, label]) => (
            <a key={href} href={`#${href}`} className="rounded-full border border-[var(--color-border)] px-3 py-1.5 text-xs font-semibold text-[var(--color-ink)] hover:border-[var(--color-primary)] hover:bg-[var(--color-surface-alt)]">
              {label}
            </a>
          ))}
          <Link href="/configurator" className="ml-auto text-xs font-semibold text-[var(--color-primary)] hover:text-[var(--color-accent)]">Open configurator →</Link>
        </div>
      </nav>

      <section id="overview" className="grid lg:grid-cols-3 gap-5 mb-8 scroll-mt-24">
        <InfoCard title="Source of truth" items={["Markdown/YAML files live in the repo.", "Agent changes are visible as file diffs.", "Git gives history and rollback."]} />
        <InfoCard title="Front-end control" items={["Client sees assets, sources and validation status.", "Form fields edit frontmatter safely.", "Markdown body remains portable."]} />
        <InfoCard title="No black-box AI" items={["AI context preview shows what Deal Advisor receives.", "Statuses stop draft claims becoming doctrine.", "Sources travel with every asset."]} />
      </section>

      <section id="library" className="grid xl:grid-cols-[0.9fr_1.1fr] gap-6 mb-8 scroll-mt-24">
        <div className="card-elevated p-6 sm:p-7">
          <div className="flex items-start justify-between gap-4 mb-5">
            <div>
              <div className="label-eyebrow mb-3">Asset library</div>
              <h2 className="text-2xl sm:text-4xl font-light tracking-tight text-[var(--color-ink)]">Find the right piece of the brain.</h2>
            </div>
            <button type="button" onClick={addAsset} className="btn-primary shrink-0">Add asset</button>
          </div>
          <div className="grid sm:grid-cols-3 gap-3 mb-5">
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search assets, products, signals…" className="rounded-lg border border-[var(--color-border)] bg-white px-3 py-2 text-sm sm:col-span-1" />
            <select value={categoryFilter} onChange={(event) => setCategoryFilter(event.target.value)} className="rounded-lg border border-[var(--color-border)] bg-white px-3 py-2 text-sm">
              <option value="all">All categories</option>
              {categories.map((category) => <option key={category} value={category}>{category}</option>)}
            </select>
            <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} className="rounded-lg border border-[var(--color-border)] bg-white px-3 py-2 text-sm">
              <option value="all">All statuses</option>
              {STATUSES.map((status) => <option key={status} value={status}>{status}</option>)}
            </select>
          </div>
          <div className="space-y-3 max-h-[650px] overflow-auto pr-1">
            {filteredAssets.map((asset) => (
              <button key={asset.id} type="button" onClick={() => setSelectedId(asset.id)} className={`w-full rounded-xl border p-4 text-left transition-colors ${selectedAsset.id === asset.id ? 'border-[var(--color-primary)] bg-[#F4F6FF]' : 'border-[var(--color-border)] bg-white hover:border-[var(--color-primary)]'}`}>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-semibold text-[var(--color-ink)]">{asset.title}</h3>
                    <p className="text-xs text-[var(--color-text-muted)] leading-relaxed mt-1">{asset.category} · {asset.region}</p>
                  </div>
                  <StatusPill status={asset.status} />
                </div>
                <div className="mt-3 flex flex-wrap gap-2 text-xs text-[var(--color-text-muted)]">
                  {asset.buyerSignals.slice(0, 3).map((signal) => <span key={signal} className="rounded-full border border-[var(--color-border)] px-2 py-1">{signal}</span>)}
                  <span className="rounded-full border border-[var(--color-border)] px-2 py-1">{asset.sourceUrls.length} sources</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        <AssetDetail asset={selectedAsset} modules={modules} cohorts={cohorts.map((cohort) => cohort.name)} />
      </section>

      <section id="editor" className="grid xl:grid-cols-[1fr_0.9fr] gap-6 mb-8 scroll-mt-24">
        <div className="card-elevated p-6 sm:p-7">
          <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
            <div>
              <div className="label-eyebrow mb-3">Visual editor</div>
              <h2 className="text-2xl sm:text-4xl font-light tracking-tight text-[var(--color-ink)]">Edit Markdown without opening GitHub.</h2>
              <p className="text-sm text-[var(--color-text-muted)] mt-3 max-w-3xl">This edits the browser copy and can save to local repo files in dev. In production, wire this endpoint to GitHub App commits / PRs.</p>
            </div>
            <button type="button" onClick={saveAsset} className="btn-accent">Save Markdown file</button>
          </div>
          {saveMessage ? <div className="caveat mb-5"><span>{saveMessage}</span></div> : null}
          <div className="grid lg:grid-cols-2 gap-4">
            <Field label="Title" value={selectedAsset.title} onChange={(value) => updateAsset('title', value)} />
            <Field label="ID" value={selectedAsset.id} onChange={(value) => updateAsset('id', slugify(value))} />
            <Field label="Category" value={selectedAsset.category} onChange={(value) => updateAsset('category', value)} />
            <Field label="Region" value={selectedAsset.region} onChange={(value) => updateAsset('region', value)} />
            <label className="block">
              <span className="label-small text-[var(--color-text-muted)] font-semibold">Status</span>
              <select value={selectedAsset.status} onChange={(event) => updateAsset('status', event.target.value as BrainStatus)} className="mt-2 w-full rounded-lg border border-[var(--color-border)] bg-white px-3 py-3 text-sm">
                {STATUSES.map((status) => <option key={status} value={status}>{status}</option>)}
              </select>
            </label>
            <Field label="Confidence" value={selectedAsset.confidence} onChange={(value) => updateAsset('confidence', value)} />
            <Field label="Owner" value={selectedAsset.owner} onChange={(value) => updateAsset('owner', value)} />
            <Field label="Last reviewed" value={selectedAsset.lastReviewed} onChange={(value) => updateAsset('lastReviewed', value)} />
          </div>
          <div className="grid lg:grid-cols-2 gap-4 mt-4">
            <TextArea label="Buyer signals — one per line" value={listToText(selectedAsset.buyerSignals)} onChange={(value) => updateAsset('buyerSignals', textToList(value))} />
            <TextArea label="Product fit — one per line" value={listToText(selectedAsset.productFit)} onChange={(value) => updateAsset('productFit', textToList(value))} />
            <TextArea label="Related module IDs — one per line" value={listToText(selectedAsset.relatedModules)} onChange={(value) => updateAsset('relatedModules', textToList(value))} />
            <TextArea label="Related cohorts — one per line" value={listToText(selectedAsset.relatedCohorts)} onChange={(value) => updateAsset('relatedCohorts', textToList(value))} />
            <TextArea label="Source URLs — one per line" value={listToText(selectedAsset.sourceUrls)} onChange={(value) => updateAsset('sourceUrls', textToList(value))} />
            <TextArea label="Markdown body" value={selectedAsset.body} rows={12} onChange={(value) => updateAsset('body', value)} />
          </div>
        </div>
        <div className="card-elevated p-6 sm:p-7">
          <div className="label-eyebrow mb-3">Markdown export</div>
          <h2 className="text-2xl sm:text-3xl font-light tracking-tight text-[var(--color-ink)] mb-4">Repo-ready file.</h2>
          <p className="text-sm text-[var(--color-text-muted)] mb-4">Path: <code className="mono">content/brain/assets/{selectedAsset.id}.md</code></p>
          <pre className="mono whitespace-pre-wrap text-xs leading-relaxed text-[var(--color-ink)] p-4 max-h-[720px] overflow-auto bg-[var(--color-surface-mist)] rounded-xl border border-[var(--color-border)]">{assetToMarkdown(selectedAsset)}</pre>
        </div>
      </section>

      <section id="relationships" className="card-elevated p-6 sm:p-8 mb-8 scroll-mt-24">
        <div className="label-eyebrow mb-3">Navigation map</div>
        <h2 className="text-2xl sm:text-4xl font-light tracking-tight text-[var(--color-ink)] mb-4">How this asset connects to the selling system.</h2>
        <div className="grid lg:grid-cols-4 gap-4">
          <MapColumn title="Selected asset" items={[selectedAsset.title, selectedAsset.category, selectedAsset.region]} strong />
          <MapColumn title="Related cohorts" items={selectedAsset.relatedCohorts.length ? selectedAsset.relatedCohorts : ['No cohorts linked yet']} />
          <MapColumn title="Related modules" items={selectedAsset.relatedModules.map((id) => modules.find((module) => module.id === id)?.name ?? id)} />
          <MapColumn title="Source trail" items={selectedAsset.sourceUrls.length ? selectedAsset.sourceUrls : ['No sources attached']} />
        </div>
        <div className="mt-6 grid md:grid-cols-2 gap-4">
          <InfoCard title="Avoid getting lost" items={["Use search to find products, regions or buyer signals.", "Use status filters to separate validated content from drafts.", "Use the map to see why an asset appears in AI and proposal outputs."]} />
          <InfoCard title="Agent governance" items={["Agent-created assets should start as agent_proposed or needs_validation.", "Client approval moves items to validated.", "Retired items remain visible but should not feed new proposals."]} />
        </div>
      </section>

      <section className="grid lg:grid-cols-[0.85fr_1.15fr] gap-6 mb-8 scroll-mt-24" id="generator">
        <div className="card-elevated p-6 sm:p-7">
          <div className="label-eyebrow mb-3">Pack generator</div>
          <h2 className="text-2xl sm:text-4xl font-light tracking-tight text-[var(--color-ink)]">Turn the brain into a sales pack.</h2>
          <div className="mt-6 space-y-5">
            <label className="block">
              <span className="label-small text-[var(--color-text-muted)] font-semibold">Use-case template</span>
              <select value={activeTemplateId} onChange={(event) => setActiveTemplateId(event.target.value)} className="mt-2 w-full rounded-lg border border-[var(--color-border)] bg-white px-3 py-3 text-sm">
                {useCaseTemplates.map((item) => <option key={item.id} value={item.id}>{item.title}</option>)}
              </select>
            </label>
            <Field label="Buyer / account" value={buyerName} onChange={setBuyerName} />
            <label className="block">
              <span className="label-small text-[var(--color-text-muted)] font-semibold">Specific client wording / ask</span>
              <textarea value={specificNeed} onChange={(event) => setSpecificNeed(event.target.value)} placeholder={template.clientNeed} rows={5} className="mt-2 w-full rounded-lg border border-[var(--color-border)] bg-white px-3 py-3 text-sm" />
            </label>
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
          <div className="grid md:grid-cols-2 gap-4 mb-5">
            <PackBlock title="Recommended modules" items={template.recommendedModules} />
            <PackBlock title="Validation guardrails" items={risks.slice(0, 6)} tone="warning" />
          </div>
          <pre className="mono whitespace-pre-wrap text-xs leading-relaxed text-[var(--color-ink)] p-4 max-h-[430px] overflow-auto bg-[var(--color-surface-mist)] rounded-xl border border-[var(--color-border)]">{generatedCatalogue}</pre>
        </div>
      </section>

      <section id="ai-context" className="card-elevated p-6 sm:p-8 scroll-mt-24">
        <div className="label-eyebrow mb-3">AI context preview</div>
        <h2 className="text-2xl sm:text-4xl font-light tracking-tight text-[var(--color-ink)] mb-4">What Deal Advisor should know.</h2>
        <p className="text-sm text-[var(--color-text-muted)] leading-relaxed max-w-3xl mb-5">This preview combines Git-backed Markdown brain assets with the existing live cohort/package/module operating snapshot. It makes the brain inspectable instead of hidden in a prompt.</p>
        <div className="grid lg:grid-cols-2 gap-5">
          <pre className="mono whitespace-pre-wrap text-xs leading-relaxed text-[var(--color-ink)] p-4 max-h-[520px] overflow-auto bg-[var(--color-surface-mist)] rounded-xl border border-[var(--color-border)]">{compiledAiContext}</pre>
          <pre className="mono whitespace-pre-wrap text-xs leading-relaxed text-[var(--color-ink)] p-4 max-h-[520px] overflow-auto bg-[var(--color-surface-mist)] rounded-xl border border-[var(--color-border)]">Initial server snapshot:\n\n{markdownSnapshot}</pre>
        </div>
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

function TextArea({ label, value, onChange, rows = 5 }: { label: string; value: string; rows?: number; onChange: (value: string) => void }) {
  return (
    <label className="block">
      <span className="label-small text-[var(--color-text-muted)] font-semibold">{label}</span>
      <textarea value={value} onChange={(event) => onChange(event.target.value)} rows={rows} className="mt-2 w-full rounded-lg border border-[var(--color-border)] bg-white px-3 py-3 text-sm" />
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

function StatusPill({ status }: { status: BrainStatus }) {
  const className = status === 'validated' ? 'pill-recommended' : status === 'retired' ? 'pill-eol' : status === 'needs_validation' ? 'pill-maintain' : status === 'agent_proposed' ? 'pill-future' : 'pill-status';
  return <span className={`pill ${className} shrink-0`}>{status.replace(/_/g, ' ')}</span>;
}

function BreadcrumbTrail({ items, compact = false }: { items: { label: string; href?: string }[]; compact?: boolean }) {
  return (
    <nav aria-label="Breadcrumb" className={compact ? 'overflow-hidden' : 'mb-5'}>
      <ol className={`flex items-center gap-2 ${compact ? 'text-[11px]' : 'text-xs'} text-[var(--color-text-muted)] whitespace-nowrap overflow-hidden`}>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={`${item.label}-${index}`} className="flex min-w-0 items-center gap-2">
              {index > 0 ? <span className="text-[var(--color-border-strong)]">/</span> : null}
              {item.href && !isLast ? (
                <a href={item.href} className="font-semibold text-[var(--color-primary)] hover:text-[var(--color-accent)]">
                  {item.label}
                </a>
              ) : (
                <span className={`truncate ${isLast ? 'font-semibold text-[var(--color-ink)]' : ''}`}>{item.label}</span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

function InfoCard({ title, items }: { title: string; items: string[] }) {
  return (
    <article className="card p-5">
      <h3 className="text-lg font-semibold text-[var(--color-ink)] mb-3">{title}</h3>
      <ul className="space-y-2 text-sm text-[var(--color-text-muted)] leading-relaxed">{items.map((item) => <li key={item}>• {item}</li>)}</ul>
    </article>
  );
}

function AssetDetail({ asset, modules, cohorts }: { asset: MarkdownBrainAsset; modules: { id: string; name: string }[]; cohorts: string[] }) {
  const moduleNames = asset.relatedModules.map((id) => modules.find((module) => module.id === id)?.name ?? id);
  const missingCohorts = asset.relatedCohorts.filter((name) => !cohorts.includes(name));
  return (
    <article className="card-elevated p-6 sm:p-7">
      <BreadcrumbTrail
        compact
        items={[
          { label: 'Asset library', href: '#library' },
          { label: asset.category, href: '#library' },
          { label: asset.region, href: '#relationships' },
          { label: asset.title },
        ]}
      />
      <div className="mt-4" />
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <span className="pill pill-status">{asset.category}</span>
        <span className="pill pill-future">{asset.region}</span>
        <StatusPill status={asset.status} />
      </div>
      <h2 className="text-2xl sm:text-4xl font-light tracking-tight text-[var(--color-ink)]">{asset.title}</h2>
      <p className="text-sm text-[var(--color-text-muted)] mt-3">File: <code className="mono">{asset.filePath}</code></p>
      <div className="divider-soft my-5" />
      <div className="grid md:grid-cols-2 gap-4 mb-5">
        <PackBlock title="Buyer signals" items={asset.buyerSignals} />
        <PackBlock title="Product fit" items={asset.productFit} />
        <PackBlock title="Related modules" items={moduleNames.length ? moduleNames : ['No modules linked yet']} />
        <PackBlock title="Review state" items={[`Owner: ${asset.owner}`, `Last reviewed: ${asset.lastReviewed || 'Not set'}`, `Confidence: ${asset.confidence}`, missingCohorts.length ? `Missing cohort matches: ${missingCohorts.join(', ')}` : 'Cohort links recognised']} tone={asset.status === 'validated' ? 'default' : 'warning'} />
      </div>
      <div className="prose max-w-none rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-mist)] p-5 text-sm text-[var(--color-ink)]">
        <pre className="whitespace-pre-wrap font-sans leading-relaxed">{asset.body}</pre>
      </div>
    </article>
  );
}

function MapColumn({ title, items, strong = false }: { title: string; items: string[]; strong?: boolean }) {
  return (
    <div className={`rounded-xl border p-5 ${strong ? 'border-[var(--color-primary)] bg-[#F4F6FF]' : 'border-[var(--color-border)] bg-white'}`}>
      <div className="label-small text-[var(--color-text-muted)] font-semibold mb-3">{title}</div>
      <ul className="space-y-2 text-sm text-[var(--color-ink)] leading-relaxed">{items.map((item) => <li className="break-words" key={item}>• {item}</li>)}</ul>
    </div>
  );
}

function PackBlock({ title, items, tone = 'default' }: { title: string; items: string[]; tone?: 'default' | 'warning' }) {
  return (
    <div className={`rounded-xl border p-4 ${tone === 'warning' ? 'border-[#FFD9AE] bg-[#FFF8EC]' : 'border-[var(--color-border)] bg-white'}`}>
      <div className="label-small text-[var(--color-text-muted)] font-semibold mb-3">{title}</div>
      <ul className="space-y-2 text-sm text-[var(--color-ink)] leading-relaxed">{items.map((item) => <li className="break-words" key={item}>• {item}</li>)}</ul>
    </div>
  );
}
