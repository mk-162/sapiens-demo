import Link from 'next/link';
import type { Metadata } from 'next';
import BrandLogo from '../components/BrandLogo';

export const metadata: Metadata = {
  title: 'Knowledge Base · Sapiens Subscription Toolkit',
  description:
    'In-app stakeholder documentation, demo explainer, construction notes, terminology audit and pricing maths for the Sapiens Subscription Toolkit.',
};

const DOC_SECTIONS = [
  {
    id: 'demo-guide',
    eyebrow: 'Start here',
    title: 'Demo guide',
    body: 'Purpose, audience, use case, outcome and suggested 5-minute stakeholder walkthrough.',
  },
  {
    id: 'construction-summary',
    eyebrow: 'Build notes',
    title: 'Construction summary',
    body: 'How the toolkit is structured, what is data-driven, and which assumptions underpin the demo.',
  },
  {
    id: 'terminology-audit',
    eyebrow: 'Evidence check',
    title: 'Terminology audit',
    body: 'What is publicly grounded Sapiens language versus derived or illustrative prototype framing.',
  },
  {
    id: 'pricing-maths',
    eyebrow: 'Maths',
    title: 'Pricing maths explainer',
    body: 'Plain-English explanation of GWP, F_scale, module scaling, surcharges, ARR and first-year total.',
  },
  {
    id: 'ai-advisor',
    eyebrow: 'AI layer',
    title: 'Deal Advisor',
    body: 'How the side-drawer AI assistant works, what context it receives, and how to enable Anthropic later.',
  },
];

const ROUTES = [
  ['/', 'Landing dashboard. Sets the story, portfolio at a glance, three pillars and package strip.'],
  ['/modules', 'Services catalog grouped by the five modular blocks, with base ARR anchors and target cohorts.'],
  ['/cohorts', 'Customer archetypes, recommended paths, lifecycle mapping and module sets.'],
  ['/packages', 'The two illustrative launch package propositions and included modules.'],
  ['/configurator', 'Live configuration surface: cohort, package, benchmark, GWP, modules, warnings, quote and AI analysis.'],
  ['/settings', 'Session-only management UI for editing demo modules, blocks and cohort detail.'],
  ['/docs', 'This in-app knowledge base. No dependency on public GitHub docs.'],
];

const MATH_STEPS = [
  {
    title: '1. Start with GWP',
    body: 'Gross Written Premium is the size of the insurer’s book. The demo uses it as a proxy for scale and complexity.',
  },
  {
    title: '2. Convert GWP into F_scale',
    body: 'F_scale grows gradually using a logarithm, so a ten-times-bigger insurer does not get a ten-times-bigger price.',
  },
  {
    title: '3. Scale selected modules',
    body: 'Each selected module has a base ARR anchor. The demo multiplies each anchor by F_scale to estimate scaled value.',
  },
  {
    title: '4. Add block surcharges',
    body: 'Decision, Digital/Data, Evergreen and AMS blocks add percentages to reflect commercial complexity and managed-service effort.',
  },
  {
    title: '5. Add professional services',
    body: 'Professional services are shown as a one-time first-year implementation estimate, separate from recurring ARR.',
  },
];

const PUBLIC_TERMS = [
  'Sapiens Insurance Platform',
  'Property & Casualty',
  'Life & Pensions',
  'Reinsurance',
  'IDITSuite for Property & Casualty',
  'CoreSuite for Life & Pensions',
  'DigitalSuite',
  'DataSuite',
  'Decision Management',
  'Cloud Services',
];

const DERIVED_TERMS = [
  'Subscription portfolio / commercial packaging lens',
  'Foundational Core SaaS',
  'Evergreen Platform',
  'Decision & Intelligence',
  'Digital & Data Layer',
  'Premium AMS & Cloud Ops',
  'Customer cohort model',
  'Future Platform / Maintain / End of Life segmentation',
];

const ILLUSTRATIVE_TERMS = [
  'Sapiens Horizon and Sapiens Intelligent package names unless validated internally',
  'June 30 launch status/framing',
  'All module prices, surcharges and GWP scaling',
  'Quote IDs and quote preview output',
  'Fit-warning logic and AI Deal Advisor recommendations',
];

export default function DocsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-8 sm:py-12">
      <section className="card-elevated brand-card p-6 sm:p-8 mb-8">
        <div className="inline-flex items-center gap-3 rounded-full border border-[var(--color-border)] bg-white/85 px-3 py-1.5 mb-5 shadow-sm">
          <BrandLogo variant="compact" />
          <span className="label-small uppercase tracking-[0.16em] text-[10px] text-[var(--color-primary)] font-semibold">
            Demo documents · In-app knowledge base
          </span>
        </div>
        <div className="label-eyebrow mb-3">Knowledge Base</div>
        <h1 className="text-3xl sm:text-5xl font-light tracking-tight text-[var(--color-ink)] max-w-4xl">
          Everything needed to explain and defend the demo.
        </h1>
        <p className="text-[var(--color-text-muted)] max-w-3xl mt-4 text-sm sm:text-base leading-relaxed">
          These notes are now embedded in the toolkit rather than relying on
          public repository links. If the repo becomes private, stakeholders can
          still read the operating guide, build summary, terminology caveats,
          pricing maths and AI advisor notes from inside the password-gated app.
        </p>
        <div className="caveat mt-5 max-w-3xl">
          <span>
            <strong>Important:</strong> this is a demo knowledge base. It does
            not make the pricing model official. Use it to explain assumptions
            and boundaries during stakeholder walkthroughs.
          </span>
        </div>
      </section>

      <section className="grid md:grid-cols-2 xl:grid-cols-5 gap-4 mb-8">
        {DOC_SECTIONS.map((doc) => (
          <a
            key={doc.id}
            href={`#${doc.id}`}
            className="card p-5 group hover:border-[var(--color-primary)] transition-colors flex flex-col"
          >
            <div className="label-eyebrow mb-3">{doc.eyebrow}</div>
            <h2 className="text-lg font-semibold text-[var(--color-ink)] mb-2">
              {doc.title}
            </h2>
            <p className="text-sm text-[var(--color-text-muted)] leading-relaxed flex-1">
              {doc.body}
            </p>
            <div className="mt-5 text-sm font-medium text-[var(--color-primary)] group-hover:text-[var(--color-accent)]">
              Jump to section →
            </div>
          </a>
        ))}
      </section>

      <section id="demo-guide" className="card-elevated p-6 sm:p-8 mb-8 scroll-mt-24">
        <div className="label-eyebrow mb-3">Demo guide</div>
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-8">
          <div>
            <h2 className="text-2xl sm:text-4xl font-light tracking-tight text-[var(--color-ink)]">
              One opinionated workspace from customer profile to configured subscription.
            </h2>
            <p className="text-[var(--color-text-muted)] mt-4 leading-relaxed">
              The toolkit helps a seller move from “this is the customer” to
              “this is the configured Sapiens subscription with credible
              indicative economics” in under five minutes. It is not a
              production CPQ tool; it is a subscription story-telling surface.
            </p>
          </div>
          <div className="space-y-4">
            <InfoBlock
              title="Audience"
              items={[
                'Primary: sales leadership, sales enablement and pre-sales.',
                'Secondary: product and finance stakeholders pressure-testing packaging and pricing logic.',
                'Tertiary: engineering/design reviewers assessing brand and enterprise UX fit.',
              ]}
            />
            <InfoBlock
              title="Outcome"
              items={[
                'Understand the five modular blocks.',
                'Repeat the cohort → package → quote mental model.',
                'Defend why a module set fits a given cohort.',
                'Know which numbers are real, derived or illustrative.',
              ]}
            />
          </div>
        </div>

        <div className="divider-soft my-6" />

        <div className="grid md:grid-cols-5 gap-3">
          {[
            ['1', 'Open dashboard', 'Frame the broad subscription portfolio and why the toolkit exists.'],
            ['2', 'Start configurator', 'Pick a cohort and show recommended GWP, modules and pricing.'],
            ['3', 'Toggle scope', 'Add/remove modules and point to fit warnings.'],
            ['4', 'Generate quote', 'Create the quote preview and review first-year economics.'],
            ['5', 'Analyse with AI', 'Use Deal Advisor to surface risk, upsell and sales talking points.'],
          ].map(([n, title, body]) => (
            <div key={n} className="step-card">
              <span className="step-card-num">{n}</span>
              <div>
                <h3 className="text-sm font-semibold text-[var(--color-ink)]">{title}</h3>
                <p className="text-xs text-[var(--color-text-muted)] mt-1 leading-relaxed">{body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="construction-summary" className="card-elevated p-6 sm:p-8 mb-8 scroll-mt-24">
        <div className="label-eyebrow mb-3">Construction summary</div>
        <h2 className="text-2xl sm:text-4xl font-light tracking-tight text-[var(--color-ink)] mb-4">
          Static internal toolkit, data-driven from TypeScript.
        </h2>
        <div className="grid lg:grid-cols-[1fr_1fr] gap-6">
          <div className="card p-5">
            <h3 className="font-semibold text-[var(--color-ink)] mb-3">Application routes</h3>
            <dl className="space-y-3 text-sm">
              {ROUTES.map(([route, purpose]) => (
                <div key={route}>
                  <dt className="mono text-[var(--color-primary)] font-medium">{route}</dt>
                  <dd className="text-[var(--color-text-muted)] mt-1">{purpose}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="space-y-4">
            <InfoBlock
              title="Data model"
              items={[
                'moduleBlocks: five commercial blocks, surcharges, required status and display order.',
                'modules: selectable line items with base price, lifecycle, target cohorts and optional surcharge.',
                'cohorts: buyer archetypes with GWP midpoint, recommended path, recommended package and rationale.',
                'launchPackages: Horizon and Intelligent demo propositions with modules, timelines and guardrails.',
                'benchmarkConfigs: one-click scenarios that load cohort, package, module set and GWP.',
              ]}
            />
            <InfoBlock
              title="Current limitations"
              items={[
                'No database or persistence; settings/cohort changes reset on refresh.',
                'No CRM, CPQ or finance integration.',
                'No official pricing authority.',
                'Public terminology research does not replace Sapiens internal product validation.',
              ]}
            />
          </div>
        </div>
      </section>

      <section id="terminology-audit" className="card-elevated p-6 sm:p-8 mb-8 scroll-mt-24">
        <div className="label-eyebrow mb-3">Terminology audit</div>
        <h2 className="text-2xl sm:text-4xl font-light tracking-tight text-[var(--color-ink)] mb-4">
          Real anchors, derived structure, illustrative commercial model.
        </h2>
        <p className="text-[var(--color-text-muted)] max-w-3xl leading-relaxed mb-6">
          The demo is not pure dummy content. It uses visible public Sapiens
          terminology as anchors, then wraps it in a prototype subscription
          packaging and pricing model created for stakeholder discussion.
        </p>
        <div className="grid lg:grid-cols-3 gap-4">
          <ListCard title="Real / publicly grounded" items={PUBLIC_TERMS} />
          <ListCard title="Derived / demo operating model" items={DERIVED_TERMS} />
          <ListCard title="Illustrative / validate before external use" items={ILLUSTRATIVE_TERMS} warning />
        </div>
        <div className="caveat mt-5">
          <span>
            <strong>Presenter wording:</strong> “The product and business-line
            language is grounded in public Sapiens terminology where possible.
            The package names, cohort model and pricing are illustrative so we
            can show how a subscription configurator could work.”
          </span>
        </div>
      </section>

      <section id="pricing-maths" className="card-elevated p-6 sm:p-8 mb-8 scroll-mt-24">
        <div className="label-eyebrow mb-3">Pricing maths</div>
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-8 items-start">
          <div>
            <h2 className="text-2xl sm:text-4xl font-light tracking-tight text-[var(--color-ink)]">
              What the F_scale formula is doing
            </h2>
            <p className="text-[var(--color-text-muted)] mt-4 leading-relaxed">
              The configurator uses Gross Written Premium as a proxy for
              customer size and complexity. A larger insurer usually has more
              volume, environments, governance and implementation effort, but
              platform economics do not scale in a straight line.
            </p>
            <div className="mt-5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-alt)] p-4">
              <div className="label-small text-[var(--color-text-muted)] mb-2">
                Demo formula
              </div>
              <code className="mono text-sm sm:text-base text-[var(--color-ink)] break-words">
                F_scale = 1 + 0.25 × log₁₀(GWP / $10M)
              </code>
              <p className="text-xs text-[var(--color-text-muted)] mt-3 leading-relaxed">
                The result is clamped between 1.0 and 2.2 so tiny or huge books
                do not produce silly numbers.
              </p>
            </div>
            <div className="mt-5 grid sm:grid-cols-3 gap-3 text-sm">
              <Example label="$100M GWP" value="F ≈ 1.25×" />
              <Example label="$1B GWP" value="F ≈ 1.50×" />
              <Example label="$5B GWP" value="F ≈ 1.67×" />
            </div>
            <Link href="/configurator" className="btn-primary mt-5">
              Try it in the configurator
            </Link>
          </div>

          <ol className="space-y-3">
            {MATH_STEPS.map((step) => (
              <li key={step.title} className="step-card">
                <div>
                  <h3 className="text-sm font-semibold text-[var(--color-ink)]">
                    {step.title}
                  </h3>
                  <p className="text-xs text-[var(--color-text-muted)] mt-1 leading-relaxed">
                    {step.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="ai-advisor" className="card-elevated p-6 sm:p-8 scroll-mt-24">
        <div className="label-eyebrow mb-3">AI Deal Advisor</div>
        <h2 className="text-2xl sm:text-4xl font-light tracking-tight text-[var(--color-ink)] mb-4">
          Product-aware chatbot layered over the current deal.
        </h2>
        <div className="grid lg:grid-cols-3 gap-4">
          <InfoBlock
            title="What it does"
            items={[
              'Slides out from the right via the global AI Deal Advisor button.',
              'Answers questions against the toolkit knowledge base.',
              'Analyses the current configurator deal for strengths, risks, upsell and sales talking points.',
            ]}
          />
          <InfoBlock
            title="What context it receives"
            items={[
              'Selected cohort, package, GWP and selected blocks.',
              'Selected modules with lifecycle, descriptions, target cohorts and live prices.',
              'Pricing breakdown, first-year total, fit warnings and selected extras.',
            ]}
          />
          <InfoBlock
            title="How to enable Anthropic"
            items={[
              'Set ANTHROPIC_API_KEY in the deployment environment.',
              'Optional: set ANTHROPIC_MODEL to override the default model.',
              'Until the key is added, the drawer runs in safe demo fallback mode so the UI still works.',
            ]}
          />
        </div>
      </section>
    </div>
  );
}

function InfoBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="card p-5">
      <h3 className="font-semibold text-[var(--color-ink)] mb-3">{title}</h3>
      <ul className="space-y-2 text-sm text-[var(--color-text-muted)]">
        {items.map((item) => (
          <li key={item} className="leading-relaxed">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function ListCard({
  title,
  items,
  warning,
}: {
  title: string;
  items: string[];
  warning?: boolean;
}) {
  return (
    <div className="card p-5">
      <h3 className="font-semibold text-[var(--color-ink)] mb-3">{title}</h3>
      <ul className="space-y-2 text-sm">
        {items.map((item) => (
          <li
            key={item}
            className={warning ? 'text-[#8A4400] leading-relaxed' : 'text-[var(--color-text-muted)] leading-relaxed'}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Example({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-[var(--color-border)] bg-white p-3">
      <div className="label-small text-[var(--color-text-muted)]">{label}</div>
      <div className="mono text-[var(--color-primary)] font-medium mt-1">{value}</div>
    </div>
  );
}
