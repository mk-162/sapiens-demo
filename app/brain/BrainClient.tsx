'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { useDemoData } from '@/lib/demo-data-context';
import { buildProposalPack, useCaseTemplates } from '@/lib/sales-brain';
import type { MarkdownBrainAsset, BrainStatus } from '@/lib/brain-markdown';
import type { Cohort, LaunchPackage, Module } from '@/lib/types';

const STATUSES: BrainStatus[] = ['draft', 'agent_proposed', 'needs_validation', 'validated', 'retired'];
const NAV = [
  ['command-centre', 'Command Centre'],
  ['workflow', 'Workflow'],
  ['library', 'Brain Board'],
  ['map', 'Product Map'],
  ['composer', 'Composer'],
  ['ai-context', 'AI Context'],
];

const WORKFLOW = [
  {
    step: '01',
    title: 'Capture signals',
    status: 'Live intake',
    body: 'Drop in a niche request, region, migration trigger or buyer pain. Agents turn it into a proposed brain asset with sources attached.',
    anchor: '#library',
  },
  {
    step: '02',
    title: 'Validate intelligence',
    status: 'Governance gate',
    body: 'Review confidence, source URLs, owner and status before any product claim becomes part of the sales brain.',
    anchor: '#library',
  },
  {
    step: '03',
    title: 'Map product fit',
    status: 'Relationship layer',
    body: 'Connect each asset to Sapiens products, modules, cohorts and package plays so the system knows why the recommendation exists.',
    anchor: '#map',
  },
  {
    step: '04',
    title: 'Compose sales pack',
    status: 'Reusable output',
    body: 'Select a use case and buyer need, then generate proposal sections, discovery questions, guardrails and product fit.',
    anchor: '#composer',
  },
  {
    step: '05',
    title: 'Advise / export',
    status: 'AI-ready context',
    body: 'Approved context is compiled into a transparent prompt payload that can power Deal Advisor or be copied into a proposal workflow.',
    anchor: '#ai-context',
  },
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
  const { cohorts, modules, launchPackages, knowledgeSnapshot } = useDemoData();
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
        ...asset.relatedModules,
        ...asset.relatedCohorts,
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
    const productAreas = new Set(assets.flatMap((asset) => asset.productFit));
    return {
      total: assets.length,
      validated: assets.filter((asset) => asset.status === 'validated').length,
      review: assets.filter((asset) => ['needs_validation', 'agent_proposed', 'draft'].includes(asset.status)).length,
      sources: assets.reduce((sum, asset) => sum + asset.sourceUrls.length, 0),
      products: productAreas.size,
    };
  }, [assets]);

  const signalQueue = useMemo(
    () => assets.filter((asset) => asset.status !== 'validated' && asset.status !== 'retired').slice(0, 4),
    [assets],
  );

  const generatedCatalogue = useMemo(() => {
    return [
      `SALES PACK: ${template.title}`,
      `Buyer: ${buyerName || template.defaultBuyer}`,
      `Region: ${template.region}`,
      `Category: ${template.category}`,
      `Urgency: ${template.urgency}`,
      `Confidence: ${confidence}`,
      '',
      'Client need',
      specificNeed || template.clientNeed,
      '',
      'Recommended Sapiens products/modules',
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
    const liveAssets = assets
      .filter((asset) => asset.status !== 'retired')
      .map((asset) => {
        const risks = asset.sections['Risks / validation notes'] ?? asset.sections.Risks ?? '';
        return [
          `Asset: ${asset.title}`,
          `Status: ${asset.status}`,
          `Category/region: ${asset.category} / ${asset.region}`,
          `Confidence: ${asset.confidence}`,
          `Buyer signals: ${asset.buyerSignals.join(', ')}`,
          `Product fit: ${asset.productFit.join(', ')}`,
          `Related modules: ${asset.relatedModules.join(', ')}`,
          `Related cohorts: ${asset.relatedCohorts.join(', ')}`,
          `Sources: ${asset.sourceUrls.join(', ')}`,
          risks ? `Risks: ${risks}` : '',
        ]
          .filter(Boolean)
          .join('\n');
      })
      .join('\n\n---\n\n');
    return `${liveAssets}\n\n=== Cohort/package/module operating snapshot ===\n\n${knowledgeSnapshot}`;
  }, [assets, knowledgeSnapshot]);

  const updateAsset = <K extends keyof MarkdownBrainAsset>(key: K, value: MarkdownBrainAsset[K]) => {
    setAssets((current) => current.map((asset) => (asset.id === selectedAsset.id ? { ...asset, [key]: value } : asset)));
  };

  const addAsset = () => {
    const asset = newAsset();
    setAssets((current) => [asset, ...current]);
    setSelectedId(asset.id);
    setSaveMessage('New draft created in the browser. Save it to write the Markdown file locally, or copy the export for GitHub/Vercel.');
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
      setSaveMessage(`Production-safe fallback: ${error instanceof Error ? error.message : 'save endpoint unavailable'}. Copy the Markdown export and commit through Git/GitHub.`);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-8 sm:py-12">
      <section id="command-centre" className="relative overflow-hidden rounded-[28px] border border-[#18347f] bg-[var(--color-primary-deep)] text-white shadow-[0_24px_80px_rgba(6,18,55,0.28)] scroll-mt-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(255,89,0,0.42),transparent_22rem),radial-gradient(circle_at_88%_0%,rgba(42,63,173,0.8),transparent_26rem)]" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-[linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(0deg,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:38px_38px] opacity-45" />
        <div className="relative grid lg:grid-cols-[1.08fr_0.92fr] gap-8 p-6 sm:p-8 lg:p-10 items-stretch">
          <div className="flex flex-col justify-between gap-8">
            <div>
              <BreadcrumbTrail
                items={[
                  { label: 'Toolkit', href: '/' },
                  { label: 'Brain DB', href: '#command-centre' },
                  { label: 'Operating workflow' },
                ]}
                dark
              />
              <div className="mt-6 inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/80">
                Sapiens Platform Brain
              </div>
              <h1 className="mt-5 max-w-4xl text-[42px] sm:text-[58px] lg:text-[72px] font-light tracking-tight leading-[0.98]">
                Research, validate, map and compose from one visible brain.
              </h1>
              <p className="mt-6 max-w-3xl text-base sm:text-lg leading-relaxed text-white/76">
                A demo command centre for turning Sapiens product intelligence into governed sales advice. The workflow is deliberately visible: assets enter as sourced signals, move through validation, map to products and cohorts, then feed Composer and Deal Advisor.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#workflow" className="btn-accent">Walk the workflow</a>
                <a href="#library" className="rounded-md border border-white/25 bg-white/10 px-5 py-3 text-sm font-semibold text-white hover:bg-white/16">Open Brain Board</a>
                <Link href="/configurator" className="rounded-md border border-white/25 bg-white/10 px-5 py-3 text-sm font-semibold text-white hover:bg-white/16">Open Composer</Link>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <CommandMetric label="Assets" value={counts.total.toString()} note="Markdown-backed" />
              <CommandMetric label="Sources" value={counts.sources.toString()} note="URLs attached" />
              <CommandMetric label="Product fits" value={counts.products.toString()} note="Mapped signals" />
              <CommandMetric label="Review queue" value={counts.review.toString()} note="Needs action" />
            </div>
          </div>

          <div className="rounded-[24px] border border-white/15 bg-white/10 p-5 sm:p-6 backdrop-blur shadow-2xl">
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/60">Live operating state</div>
                <h2 className="mt-2 text-2xl font-light">From source to sales pack</h2>
              </div>
              <span className="rounded-full bg-[#11A36A] px-3 py-1 text-xs font-semibold text-white">System online</span>
            </div>
            <div className="mt-6 space-y-3">
              {WORKFLOW.map((item, index) => (
                <a key={item.step} href={item.anchor} className="group grid grid-cols-[44px_1fr_auto] gap-4 rounded-2xl border border-white/12 bg-white/[0.07] p-4 transition hover:border-[var(--color-accent)] hover:bg-white/[0.12]">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-sm font-bold text-[var(--color-primary)]">{item.step}</div>
                  <div>
                    <div className="font-semibold text-white">{item.title}</div>
                    <div className="mt-1 text-xs text-white/62">{item.status}</div>
                  </div>
                  <div className="self-center text-white/40 group-hover:text-[var(--color-accent)]">→</div>
                  {index < WORKFLOW.length - 1 ? <div className="col-start-1 mx-auto -mb-5 h-5 w-px bg-white/20" /> : null}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <nav className="sticky top-[65px] z-20 my-6 rounded-2xl border border-[var(--color-border)] bg-white/95 p-3 shadow-sm backdrop-blur">
        <div className="flex flex-wrap items-center gap-2">
          <span className="label-small font-semibold text-[var(--color-text-muted)] mr-2">Brain workflow</span>
          {NAV.map(([href, label]) => (
            <a key={href} href={`#${href}`} className="rounded-full border border-[var(--color-border)] px-3 py-1.5 text-xs font-semibold text-[var(--color-ink)] hover:border-[var(--color-primary)] hover:bg-[var(--color-surface-alt)]">
              {label}
            </a>
          ))}
          <Link href="/configurator" className="ml-auto text-xs font-semibold text-[var(--color-primary)] hover:text-[var(--color-accent)]">Open Deal Composer →</Link>
        </div>
      </nav>

      <section id="workflow" className="scroll-mt-32 mb-8">
        <SectionHeading eyebrow="End-to-end workflow" title="The app story is now visible on the page." body="This is the workflow MK should be able to demo without explaining hidden code: capture sourced intelligence, validate it, map it, compose with it, then show the exact context the AI receives." />
        <div className="mt-6 grid lg:grid-cols-5 gap-4">
          {WORKFLOW.map((item) => (
            <article key={item.step} className="relative overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white p-5 shadow-sm">
              <div className="absolute right-4 top-4 text-5xl font-light text-[var(--color-bg)] mono">{item.step}</div>
              <div className="relative">
                <span className="pill pill-status">{item.status}</span>
                <h3 className="mt-5 text-xl font-semibold text-[var(--color-ink)]">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--color-text-muted)]">{item.body}</p>
                <a href={item.anchor} className="mt-5 inline-flex text-sm font-semibold text-[var(--color-primary)] hover:text-[var(--color-accent)]">Jump to step →</a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="grid lg:grid-cols-[0.82fr_1.18fr] gap-6 mb-8">
        <div className="card-elevated p-6 sm:p-7">
          <div className="label-eyebrow mb-3">Research inbox</div>
          <h2 className="text-2xl sm:text-4xl font-light tracking-tight text-[var(--color-ink)]">Signals waiting for validation.</h2>
          <p className="mt-3 text-sm leading-relaxed text-[var(--color-text-muted)]">This makes the agent workflow legible. Anything not validated should be treated as a working sales hypothesis, not doctrine.</p>
          <div className="mt-6 space-y-3">
            {signalQueue.length ? signalQueue.map((asset) => (
              <button key={asset.id} onClick={() => setSelectedId(asset.id)} className="w-full rounded-2xl border border-[#FFD9AE] bg-[#FFF8EC] p-4 text-left hover:border-[var(--color-accent)]">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="font-semibold text-[var(--color-ink)]">{asset.title}</div>
                    <div className="mt-1 text-xs text-[var(--color-text-muted)]">{asset.sourceUrls.length} sources · {asset.confidence}</div>
                  </div>
                  <StatusPill status={asset.status} />
                </div>
              </button>
            )) : <div className="rounded-2xl border border-[var(--color-border)] bg-white p-4 text-sm text-[var(--color-text-muted)]">No open review items. Validated assets are ready for demo use.</div>}
          </div>
        </div>
        <ValidationPanel assets={assets} />
      </section>

      <section id="library" className="grid xl:grid-cols-[0.95fr_1.05fr] gap-6 mb-8 scroll-mt-32">
        <div className="card-elevated p-6 sm:p-7">
          <div className="flex items-start justify-between gap-4 mb-5">
            <div>
              <div className="label-eyebrow mb-3">Brain Board</div>
              <h2 className="text-2xl sm:text-4xl font-light tracking-tight text-[var(--color-ink)]">Searchable product intelligence, not a hidden prompt.</h2>
              <p className="mt-3 text-sm text-[var(--color-text-muted)]">Each card is a Git-backed brain asset with its own validation state, source trail and product-fit tags.</p>
            </div>
            <button type="button" onClick={addAsset} className="btn-primary shrink-0">Add signal</button>
          </div>
          <div className="grid sm:grid-cols-3 gap-3 mb-5">
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search products, cohorts, buyer signals…" className="rounded-lg border border-[var(--color-border)] bg-white px-3 py-2 text-sm sm:col-span-1" />
            <select value={categoryFilter} onChange={(event) => setCategoryFilter(event.target.value)} className="rounded-lg border border-[var(--color-border)] bg-white px-3 py-2 text-sm">
              <option value="all">All categories</option>
              {categories.map((category) => <option key={category} value={category}>{category}</option>)}
            </select>
            <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} className="rounded-lg border border-[var(--color-border)] bg-white px-3 py-2 text-sm">
              <option value="all">All statuses</option>
              {STATUSES.map((status) => <option key={status} value={status}>{status.replace(/_/g, ' ')}</option>)}
            </select>
          </div>
          <div className="grid sm:grid-cols-2 gap-4 max-h-[780px] overflow-auto pr-1">
            {filteredAssets.map((asset) => (
              <AssetCard key={asset.id} asset={asset} selected={selectedAsset.id === asset.id} onSelect={() => setSelectedId(asset.id)} />
            ))}
          </div>
        </div>

        <AssetDetail asset={selectedAsset} modules={modules} cohorts={cohorts.map((cohort) => cohort.name)} onStatusChange={(status) => updateAsset('status', status)} />
      </section>

      <section id="map" className="card-elevated p-6 sm:p-8 mb-8 scroll-mt-32 overflow-hidden">
        <SectionHeading eyebrow="Product relationship map" title="Why this recommendation exists." body="The map connects public product intelligence to Sapiens modules, cohorts, launch packages and the generated sales pack. It is intentionally visual so the demo feels like an operating system, not a spreadsheet." />
        <RelationshipMap asset={selectedAsset} modules={modules} cohorts={cohorts} packages={launchPackages} />
      </section>

      <section id="editor" className="grid xl:grid-cols-[1fr_0.9fr] gap-6 mb-8 scroll-mt-32">
        <div className="card-elevated p-6 sm:p-7">
          <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
            <div>
              <div className="label-eyebrow mb-3">Validation editor</div>
              <h2 className="text-2xl sm:text-4xl font-light tracking-tight text-[var(--color-ink)]">Approve, correct or retire the selected brain asset.</h2>
              <p className="text-sm text-[var(--color-text-muted)] mt-3 max-w-3xl">Local/dev saves write Markdown files. On Vercel, use the export until this is wired to GitHub commits or PRs.</p>
            </div>
            <button type="button" onClick={saveAsset} className="btn-accent">Save / export Markdown</button>
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
                {STATUSES.map((status) => <option key={status} value={status}>{status.replace(/_/g, ' ')}</option>)}
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
          <h2 className="text-2xl sm:text-3xl font-light tracking-tight text-[var(--color-ink)] mb-4">Repo-ready brain file.</h2>
          <p className="text-sm text-[var(--color-text-muted)] mb-4">Path: <code className="mono">content/brain/assets/{selectedAsset.id}.md</code></p>
          <pre className="mono whitespace-pre-wrap text-xs leading-relaxed text-[var(--color-ink)] p-4 max-h-[720px] overflow-auto bg-[var(--color-surface-mist)] rounded-xl border border-[var(--color-border)]">{assetToMarkdown(selectedAsset)}</pre>
        </div>
      </section>

      <section className="grid lg:grid-cols-[0.8fr_1.2fr] gap-6 mb-8 scroll-mt-32" id="composer">
        <div className="card-elevated p-6 sm:p-7">
          <div className="label-eyebrow mb-3">Composer</div>
          <h2 className="text-2xl sm:text-4xl font-light tracking-tight text-[var(--color-ink)]">Generate a sales pack from validated context.</h2>
          <p className="mt-3 text-sm text-[var(--color-text-muted)]">Choose a use case, add the buyer&apos;s language, and turn the brain into a clean, copy-ready proposal starter.</p>
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
            <Link href="/configurator" className="btn-primary w-full">Open pricing configurator</Link>
          </div>
        </div>
        <div className="card-elevated p-6 sm:p-7 overflow-hidden relative">
          <div className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,var(--color-primary),var(--color-accent))]" />
          <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
            <div>
              <div className="label-eyebrow mb-2">Generated pack</div>
              <h2 className="text-2xl sm:text-4xl font-light tracking-tight text-[var(--color-ink)]">{template.title}</h2>
              <p className="mt-2 text-sm text-[var(--color-text-muted)]">{buyerName || template.defaultBuyer} · {template.region}</p>
            </div>
            <span className={`pill ${confidence === 'Grounded' ? 'pill-future' : 'pill-maintain'}`}>{confidence}</span>
          </div>
          <div className="grid md:grid-cols-3 gap-4 mb-5">
            <PackBlock title="Recommended modules" items={template.recommendedModules} />
            <PackBlock title="Discovery questions" items={discoveryQuestions.slice(0, 5)} />
            <PackBlock title="Validation guardrails" items={risks.slice(0, 5)} tone="warning" />
          </div>
          <pre className="mono whitespace-pre-wrap text-xs leading-relaxed text-[var(--color-ink)] p-4 max-h-[430px] overflow-auto bg-[var(--color-surface-mist)] rounded-xl border border-[var(--color-border)]">{generatedCatalogue}</pre>
        </div>
      </section>

      <section id="ai-context" className="card-elevated p-6 sm:p-8 scroll-mt-32">
        <SectionHeading eyebrow="AI context preview" title="The prompt payload is inspectable before Deal Advisor uses it." body="The preview combines Git-backed brain assets with the live cohort/package/module snapshot. This is the handoff from validated knowledge into sales advice." />
        <div className="mt-6 grid lg:grid-cols-[1.08fr_0.92fr] gap-5">
          <div>
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <span className="pill pill-future">Validated + active assets</span>
              <span className="pill pill-status">{compiledAiContext.length.toLocaleString()} chars</span>
              <Link href="/configurator" className="text-sm font-semibold text-[var(--color-primary)] hover:text-[var(--color-accent)]">Open Deal Advisor →</Link>
            </div>
            <pre className="mono whitespace-pre-wrap text-xs leading-relaxed text-[var(--color-ink)] p-4 max-h-[560px] overflow-auto bg-[var(--color-surface-mist)] rounded-xl border border-[var(--color-border)]">{compiledAiContext}</pre>
          </div>
          <div>
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <span className="pill pill-maintain">Server snapshot</span>
              <span className="pill pill-status">Initial Git state</span>
            </div>
            <pre className="mono whitespace-pre-wrap text-xs leading-relaxed text-[var(--color-ink)] p-4 max-h-[560px] overflow-auto bg-[var(--color-surface-mist)] rounded-xl border border-[var(--color-border)]">{markdownSnapshot}</pre>
          </div>
        </div>
      </section>
    </div>
  );
}

function SectionHeading({ eyebrow, title, body }: { eyebrow: string; title: string; body: string }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-6">
      <div>
        <div className="label-eyebrow mb-3">{eyebrow}</div>
        <h2 className="text-2xl sm:text-4xl font-light tracking-tight text-[var(--color-ink)] max-w-3xl">{title}</h2>
      </div>
      <p className="text-sm leading-relaxed text-[var(--color-text-muted)] max-w-xl">{body}</p>
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

function CommandMetric({ label, value, note }: { label: string; value: string; note: string }) {
  return (
    <div className="rounded-2xl border border-white/14 bg-white/10 p-4 backdrop-blur">
      <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/55">{label}</div>
      <div className="mono mt-2 text-3xl font-light text-white">{value}</div>
      <div className="mt-1 text-xs text-white/55">{note}</div>
    </div>
  );
}

function StatusPill({ status }: { status: BrainStatus }) {
  const className = status === 'validated' ? 'pill-recommended' : status === 'retired' ? 'pill-eol' : status === 'needs_validation' ? 'pill-maintain' : status === 'agent_proposed' ? 'pill-future' : 'pill-status';
  return <span className={`pill ${className} shrink-0`}>{status.replace(/_/g, ' ')}</span>;
}

function BreadcrumbTrail({ items, compact = false, dark = false }: { items: { label: string; href?: string }[]; compact?: boolean; dark?: boolean }) {
  return (
    <nav aria-label="Breadcrumb" className={compact ? 'overflow-hidden' : ''}>
      <ol className={`flex items-center gap-2 ${compact ? 'text-[11px]' : 'text-xs'} ${dark ? 'text-white/55' : 'text-[var(--color-text-muted)]'} whitespace-nowrap overflow-hidden`}>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={`${item.label}-${index}`} className="flex min-w-0 items-center gap-2">
              {index > 0 ? <span className={dark ? 'text-white/25' : 'text-[var(--color-border-strong)]'}>/</span> : null}
              {item.href && !isLast ? (
                <a href={item.href} className={`font-semibold ${dark ? 'text-white hover:text-[var(--color-accent)]' : 'text-[var(--color-primary)] hover:text-[var(--color-accent)]'}`}>
                  {item.label}
                </a>
              ) : (
                <span className={`truncate ${isLast ? dark ? 'font-semibold text-white' : 'font-semibold text-[var(--color-ink)]' : ''}`}>{item.label}</span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

function AssetCard({ asset, selected, onSelect }: { asset: MarkdownBrainAsset; selected: boolean; onSelect: () => void }) {
  return (
    <button type="button" onClick={onSelect} className={`group relative overflow-hidden rounded-2xl border p-4 text-left transition ${selected ? 'border-[var(--color-primary)] bg-[#F4F6FF] shadow-[0_14px_34px_rgba(13,37,111,0.14)]' : 'border-[var(--color-border)] bg-white hover:-translate-y-0.5 hover:border-[var(--color-primary)] hover:shadow-md'}`}>
      <div className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,var(--color-primary),var(--color-accent))] opacity-0 transition group-hover:opacity-100" />
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="label-small text-[var(--color-text-muted)] font-semibold">{asset.category} · {asset.region}</div>
          <h3 className="mt-2 text-base font-semibold leading-snug text-[var(--color-ink)]">{asset.title}</h3>
        </div>
        <StatusPill status={asset.status} />
      </div>
      <div className="mt-4 flex flex-wrap gap-2 text-xs text-[var(--color-text-muted)]">
        {asset.productFit.slice(0, 3).map((fit) => <span key={fit} className="rounded-full border border-[var(--color-border)] bg-white px-2 py-1">{fit}</span>)}
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2 text-center">
        <MiniStat label="Signals" value={asset.buyerSignals.length.toString()} />
        <MiniStat label="Sources" value={asset.sourceUrls.length.toString()} />
        <MiniStat label="Links" value={(asset.relatedModules.length + asset.relatedCohorts.length).toString()} />
      </div>
    </button>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-mist)] px-2 py-2">
      <div className="mono text-lg font-light text-[var(--color-ink)]">{value}</div>
      <div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--color-text-muted)]">{label}</div>
    </div>
  );
}

function ValidationPanel({ assets }: { assets: MarkdownBrainAsset[] }) {
  const statusCounts = STATUSES.map((status) => ({ status, count: assets.filter((asset) => asset.status === status).length }));
  const total = Math.max(assets.length, 1);
  return (
    <div className="card-elevated p-6 sm:p-7">
      <div className="label-eyebrow mb-3">Validation console</div>
      <h2 className="text-2xl sm:text-4xl font-light tracking-tight text-[var(--color-ink)]">Governance before generation.</h2>
      <p className="mt-3 text-sm leading-relaxed text-[var(--color-text-muted)]">This is the workflow control surface: sales can see what is approved, what needs product review and what should stay out of active advice.</p>
      <div className="mt-6 space-y-4">
        {statusCounts.map(({ status, count }) => (
          <div key={status}>
            <div className="mb-2 flex items-center justify-between gap-3">
              <StatusPill status={status} />
              <span className="mono text-sm font-semibold text-[var(--color-ink)]">{count}</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-[var(--color-border)]">
              <div className="h-full rounded-full bg-[linear-gradient(90deg,var(--color-primary),var(--color-accent))]" style={{ width: `${Math.max(4, Math.round((count / total) * 100))}%` }} />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-mist)] p-4 text-sm leading-relaxed text-[var(--color-text-muted)]">
        Demo rule: only <strong className="text-[var(--color-ink)]">validated</strong> assets should be positioned as reliable. Draft and agent-proposed assets are useful for exploration, not client-facing claims.
      </div>
    </div>
  );
}

function AssetDetail({ asset, modules, cohorts, onStatusChange }: { asset: MarkdownBrainAsset; modules: Module[]; cohorts: string[]; onStatusChange: (status: BrainStatus) => void }) {
  const moduleNames = asset.relatedModules.map((id) => modules.find((module) => module.id === id)?.name ?? id);
  const missingCohorts = asset.relatedCohorts.filter((name) => !cohorts.includes(name));
  const salesUse = asset.sections['Sales use'] || asset.sections.Summary || asset.body.split('\n').slice(0, 5).join('\n');
  return (
    <article className="card-elevated p-6 sm:p-7 overflow-hidden relative">
      <div className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,var(--color-primary),var(--color-accent))]" />
      <BreadcrumbTrail
        compact
        items={[
          { label: 'Brain Board', href: '#library' },
          { label: asset.category, href: '#library' },
          { label: asset.region, href: '#map' },
          { label: asset.title },
        ]}
      />
      <div className="mt-5 flex flex-wrap items-center gap-2 mb-4">
        <span className="pill pill-status">{asset.category}</span>
        <span className="pill pill-future">{asset.region}</span>
        <StatusPill status={asset.status} />
      </div>
      <h2 className="text-2xl sm:text-4xl font-light tracking-tight text-[var(--color-ink)]">{asset.title}</h2>
      <p className="text-sm text-[var(--color-text-muted)] mt-3">File: <code className="mono">{asset.filePath}</code></p>
      <div className="mt-5 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-mist)] p-5">
        <div className="label-small font-semibold text-[var(--color-text-muted)]">Demo talk track</div>
        <pre className="mt-3 whitespace-pre-wrap font-sans text-sm leading-relaxed text-[var(--color-ink)]">{salesUse}</pre>
      </div>
      <div className="divider-soft my-5" />
      <div className="grid md:grid-cols-2 gap-4 mb-5">
        <PackBlock title="Buyer signals" items={asset.buyerSignals} />
        <PackBlock title="Product fit" items={asset.productFit} />
        <PackBlock title="Related modules" items={moduleNames.length ? moduleNames : ['No modules linked yet']} />
        <PackBlock title="Review state" items={[`Owner: ${asset.owner}`, `Last reviewed: ${asset.lastReviewed || 'Not set'}`, `Confidence: ${asset.confidence}`, missingCohorts.length ? `Missing cohort matches: ${missingCohorts.join(', ')}` : 'Cohort links recognised']} tone={asset.status === 'validated' ? 'default' : 'warning'} />
      </div>
      <div className="flex flex-wrap gap-2">
        {STATUSES.map((status) => <button key={status} type="button" onClick={() => onStatusChange(status)} className="rounded-full border border-[var(--color-border)] px-3 py-1.5 text-xs font-semibold hover:border-[var(--color-primary)]">Set {status.replace(/_/g, ' ')}</button>)}
      </div>
    </article>
  );
}

function RelationshipMap({ asset, modules, cohorts, packages }: { asset: MarkdownBrainAsset; modules: Module[]; cohorts: Cohort[]; packages: LaunchPackage[] }) {
  const relatedModules = asset.relatedModules.map((id) => modules.find((module) => module.id === id)?.name ?? id);
  const relatedCohorts = asset.relatedCohorts.length ? asset.relatedCohorts : cohorts.slice(0, 3).map((cohort) => cohort.name);
  const relatedPackages = packages.filter((pkg) => relatedCohorts.some((cohort) => pkg.targetCohorts.includes(cohort))).map((pkg) => pkg.name);
  return (
    <div className="mt-8 grid lg:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] gap-3 items-stretch">
      <MapNode eyebrow="Brain asset" title={asset.title} items={[asset.category, asset.region, asset.confidence]} strong />
      <MapConnector />
      <MapNode eyebrow="Products/modules" title="Product fit" items={relatedModules.length ? relatedModules : asset.productFit} />
      <MapConnector />
      <MapNode eyebrow="Cohorts/use cases" title="Buyer fit" items={relatedCohorts} />
      <MapConnector />
      <MapNode eyebrow="Commercial output" title="Sales pack" items={relatedPackages.length ? relatedPackages : ['Composer proposal pack', 'Deal Advisor context', 'Discovery questions']} strong />
    </div>
  );
}

function MapConnector() {
  return <div className="hidden lg:flex items-center justify-center text-2xl text-[var(--color-border-strong)]">→</div>;
}

function MapNode({ eyebrow, title, items, strong = false }: { eyebrow: string; title: string; items: string[]; strong?: boolean }) {
  return (
    <div className={`rounded-2xl border p-5 min-h-[220px] ${strong ? 'border-[var(--color-primary)] bg-[#F4F6FF]' : 'border-[var(--color-border)] bg-white'}`}>
      <div className="label-small text-[var(--color-text-muted)] font-semibold mb-3">{eyebrow}</div>
      <h3 className="text-lg font-semibold text-[var(--color-ink)]">{title}</h3>
      <ul className="mt-4 space-y-2 text-sm text-[var(--color-ink)] leading-relaxed">{items.slice(0, 8).map((item) => <li className="break-words rounded-lg bg-white/70 border border-[var(--color-border)] px-3 py-2" key={item}>{item}</li>)}</ul>
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
