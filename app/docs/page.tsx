import Link from 'next/link';
import type { Metadata } from 'next';
import BrandLogo from '../components/BrandLogo';

export const metadata: Metadata = {
  title: 'Knowledge Base · Sapiens Subscription Toolkit',
  description:
    'Stakeholder documentation, demo explainer, construction notes, terminology audit and pricing maths for the Sapiens Subscription Toolkit.',
};

const DOC_CARDS = [
  {
    eyebrow: 'Start here',
    title: 'Demo guide',
    body: 'What the toolkit is for, who should use it, the outcome of the demo, and a 5-minute talk track.',
    href: 'https://github.com/mk-162/sapiens-demo/blob/main/docs/README.md',
    cta: 'Open source document',
  },
  {
    eyebrow: 'Build notes',
    title: 'Construction summary',
    body: 'How the demo is structured: routes, static data model, UI components, assumptions and limitations.',
    href: 'https://github.com/mk-162/sapiens-demo/blob/main/docs/construction-summary.md',
    cta: 'Open source document',
  },
  {
    eyebrow: 'Evidence check',
    title: 'Terminology audit',
    body: 'What is grounded in public Sapiens terminology versus what is derived or illustrative for this prototype.',
    href: 'https://github.com/mk-162/sapiens-demo/blob/main/docs/sapiens-terminology-audit.md',
    cta: 'Open source document',
  },
  {
    eyebrow: 'Maths',
    title: 'Pricing maths explainer',
    body: 'Plain-English explanation of GWP, F_scale, module scaling, surcharges, ARR and first-year total.',
    href: 'https://github.com/mk-162/sapiens-demo/blob/main/docs/pricing-maths.md',
    cta: 'Open source document',
  },
];

const MATH_STEPS = [
  {
    title: '1. Start with GWP',
    body: 'Gross Written Premium is the size of the insurer’s book. The demo uses it as a proxy for complexity: bigger insurer, larger Sapiens footprint.',
  },
  {
    title: '2. Convert GWP into F_scale',
    body: 'F_scale is the multiplier. It starts at 1.0 around the reference point and grows gradually using a logarithm, so a ten-times-bigger insurer does not get a ten-times-bigger price.',
  },
  {
    title: '3. Scale selected modules',
    body: 'Each selected module has a base ARR anchor. The demo multiplies each anchor by F_scale to estimate the scaled module value.',
  },
  {
    title: '4. Add block surcharges',
    body: 'Decision, Digital/Data, Evergreen and AMS blocks add extra percentages to reflect commercial complexity and managed-service effort.',
  },
  {
    title: '5. Add professional services',
    body: 'Professional services are shown as a one-time first-year implementation estimate, separate from recurring ARR.',
  },
];

export default function DocsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-8 sm:py-12">
      <section className="card-elevated brand-card p-6 sm:p-8 mb-8">
        <div className="inline-flex items-center gap-3 rounded-full border border-[var(--color-border)] bg-white/85 px-3 py-1.5 mb-5 shadow-sm">
          <BrandLogo variant="compact" />
          <span className="label-small uppercase tracking-[0.16em] text-[10px] text-[var(--color-primary)] font-semibold">
            Demo documents · Knowledge base
          </span>
        </div>
        <div className="label-eyebrow mb-3">Knowledge Base</div>
        <h1 className="text-3xl sm:text-5xl font-light tracking-tight text-[var(--color-ink)] max-w-4xl">
          Explain the demo before anyone asks what it is.
        </h1>
        <p className="text-[var(--color-text-muted)] max-w-3xl mt-4 text-sm sm:text-base leading-relaxed">
          This section turns the repo documentation into a readable in-app
          reference: the purpose of the toolkit, how it was constructed, which
          Sapiens terms are real versus illustrative, and how the pricing maths
          works.
        </p>
        <div className="caveat mt-5 max-w-3xl">
          <span>
            <strong>Important:</strong> this is a demo knowledge base. It does
            not make the pricing model official. Use it to explain assumptions
            and boundaries during stakeholder walkthroughs.
          </span>
        </div>
      </section>

      <section className="grid md:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        {DOC_CARDS.map((doc) => (
          <a
            key={doc.title}
            href={doc.href}
            className="card p-5 group hover:border-[var(--color-primary)] transition-colors flex flex-col"
            target="_blank"
            rel="noreferrer"
          >
            <div className="label-eyebrow mb-3">{doc.eyebrow}</div>
            <h2 className="text-xl font-semibold text-[var(--color-ink)] mb-2">
              {doc.title}
            </h2>
            <p className="text-sm text-[var(--color-text-muted)] leading-relaxed flex-1">
              {doc.body}
            </p>
            <div className="mt-5 text-sm font-medium text-[var(--color-primary)] group-hover:text-[var(--color-accent)]">
              {doc.cta} →
            </div>
          </a>
        ))}
      </section>

      <section id="pricing-maths" className="card-elevated p-6 sm:p-8 mb-8 scroll-mt-24">
        <div className="label-eyebrow mb-3">Pricing maths</div>
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-8 items-start">
          <div>
            <h2 className="text-2xl sm:text-4xl font-light tracking-tight text-[var(--color-ink)]">
              What the F_scale formula is doing
            </h2>
            <p className="text-[var(--color-text-muted)] mt-4 leading-relaxed">
              The configurator needs one simple way to show how a subscription
              grows when the customer is larger. It uses GWP as the input and
              turns it into a multiplier called F_scale.
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

      <section className="grid lg:grid-cols-3 gap-4">
        <div className="card p-5">
          <div className="label-eyebrow mb-2">Real anchors</div>
          <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
            Sapiens public product and business-line language: Insurance
            Platform, P&amp;C, Life &amp; Pensions, Reinsurance, DigitalSuite,
            DataSuite, Decision Management and Cloud Services.
          </p>
        </div>
        <div className="card p-5">
          <div className="label-eyebrow mb-2">Derived structure</div>
          <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
            The demo’s modular blocks, cohorts and launch package structure are
            a sales-enablement lens over the public terminology.
          </p>
        </div>
        <div className="card p-5">
          <div className="label-eyebrow mb-2">Illustrative numbers</div>
          <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
            Prices, surcharges, quote output, F_scale and professional-services
            values are prototype assumptions until validated by Sapiens.
          </p>
        </div>
      </section>
    </div>
  );
}
