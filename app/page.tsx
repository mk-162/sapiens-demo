import Link from 'next/link';
import BrandLogo from './components/BrandLogo';
import HelpHint from './components/HelpHint';
import {
  cohorts,
  launchPackages,
  moduleBlocks,
  modules,
} from '@/lib/data';

const PILLARS = [
  {
    eyebrow: '01 · Catalog',
    title: 'Services Catalog',
    body: 'The full Sapiens subscription portfolio — SaaS, Evergreen, Decision, Digital and AMS — organised by the five building blocks. Lifecycle stance, target cohorts and pricing in one place.',
    href: '/modules',
    cta: 'Open catalog',
  },
  {
    eyebrow: '02 · Cohorts',
    title: 'Cohort Mapping',
    body: 'Five customer cohorts mapped to recommended paths, lifecycle stance and target packages — so every conversation starts from a credible point of view.',
    href: '/cohorts',
    cta: 'Open cohort mapping',
  },
  {
    eyebrow: '03 · Brain',
    title: 'Second Brain',
    body: 'Capture niche asks — Finland compliance, SaaS migration, SAS analytics modernisation — and turn them into reusable proposal intelligence for sales teams.',
    href: '/brain',
    cta: 'Open second brain',
  },
  {
    eyebrow: '04 · Toolkit',
    title: 'Sales Configurator',
    body: 'Apply Horizon or Intelligent presets, tailor add-ons, scale by GWP and see ARR, surcharges, managed cloud ops and professional services recalculate live. Generate a quote preview in seconds.',
    href: '/configurator',
    cta: 'Open configurator',
  },
];

const FLOW_STEPS = [
  {
    n: 1,
    title: 'Start in the Configurator',
    body: 'Land on the live toolkit. Pick a cohort and watch a credible default load in.',
    href: '/configurator',
    cta: 'Open the Configurator',
  },
  {
    n: 2,
    title: 'Browse Cohorts & Catalog',
    body: 'Need context? Review cohort plays and module-by-module detail before tailoring.',
    href: '/cohorts',
    cta: 'See cohort plays',
  },
  {
    n: 3,
    title: 'Anchor on the Packages',
    body: 'The two June 30 launch packages — Horizon and Intelligent — are the commercial spine.',
    href: '/packages',
    cta: 'View packages',
  },
];

export default function Home() {
  const futureCount = modules.filter((m) => m.lifecycle === 'Future Platform').length;
  const maintainCount = modules.filter((m) => m.lifecycle === 'Maintain').length;
  const eolCount = modules.filter((m) => m.lifecycle === 'End of Life').length;

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-[var(--color-border)] bg-white">
        <div className="absolute inset-0 bg-grid opacity-60 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 pt-12 sm:pt-16 pb-16 sm:pb-20">
          <div className="grid lg:grid-cols-[1.4fr_1fr] gap-10 lg:gap-12 items-end">
            <div>
              <div className="inline-flex items-center gap-3 rounded-full border border-[var(--color-border)] bg-white/85 px-3 py-1.5 mb-6 shadow-sm">
                <BrandLogo variant="compact" />
                <span className="label-small uppercase tracking-[0.16em] text-[10px] text-[var(--color-primary)] font-semibold">
                  Internal toolkit · Demo
                </span>
              </div>
              <div className="label-eyebrow text-[var(--color-primary)] mb-5">
                Sapiens Subscription Services Toolkit
              </div>
              <h1 className="text-[40px] sm:text-[56px] lg:text-[68px] font-light text-[var(--color-ink)] leading-[1.05] tracking-tight">
                Advance the possible across
                <br className="hidden sm:block" />{' '}
                <span className="text-[var(--color-primary)]">
                  the Sapiens subscription portfolio
                </span>
                .
              </h1>
              <p className="mt-6 text-base sm:text-lg text-[var(--color-text-muted)] max-w-2xl">
                One workspace for every commercial conversation — services
                catalog, cohort strategy, second-brain use-case intelligence,
                June 30 Horizon &amp; Intelligent launch packages, and a live
                configurator — all aligned to the Future Platform, Maintain and
                End-of-Life portfolio segmentation.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link href="/configurator" className="btn-accent">
                  Start here · Open the Configurator
                </Link>
                <Link href="/cohorts" className="btn-ghost">
                  Review cohort strategy
                </Link>
                <Link href="/packages" className="btn-ghost">
                  See June 30 packages
                </Link>
              </div>

              <div className="caveat mt-6 max-w-2xl">
                <span>
                  <strong>Demo notice.</strong> Pricing and some package /
                  commercial constructs are{' '}
                  <em>indicative for stakeholder conversations</em>, not
                  official Sapiens commercial terms. See{' '}
                  <Link
                    href="/docs"
                    className="font-medium text-[var(--color-primary)] underline-offset-2 hover:underline"
                  >
                    Knowledge Base
                  </Link>{' '}
                  for what is real vs illustrative.
                </span>
              </div>
            </div>

            <div className="card-elevated brand-card p-6">
              <div className="flex items-center">
                <span className="label-eyebrow">Portfolio at a glance</span>
                <HelpHint label="Portfolio at a glance" align="end">
                  Headline counts for this demo. The lifecycle pills follow
                  Sapiens&apos; portfolio segmentation language:{' '}
                  <strong>Future Platform</strong> (sell-forward),{' '}
                  <strong>Maintain</strong> (keep stable), and{' '}
                  <strong>End of Life</strong> (do not sell standalone).
                </HelpHint>
              </div>
              <dl className="grid grid-cols-2 gap-y-5 gap-x-6 mt-4">
                <div>
                  <dt className="label-small text-[var(--color-text-muted)]">
                    Modular blocks
                  </dt>
                  <dd className="text-3xl font-light text-[var(--color-ink)] mono">
                    {moduleBlocks.length}
                  </dd>
                </div>
                <div>
                  <dt className="label-small text-[var(--color-text-muted)]">
                    Modules in catalog
                  </dt>
                  <dd className="text-3xl font-light text-[var(--color-ink)] mono">
                    {modules.length}
                  </dd>
                </div>
                <div>
                  <dt className="label-small text-[var(--color-text-muted)]">
                    Customer cohorts
                  </dt>
                  <dd className="text-3xl font-light text-[var(--color-ink)] mono">
                    {cohorts.length}
                  </dd>
                </div>
                <div>
                  <dt className="label-small text-[var(--color-text-muted)]">
                    Launch packages
                  </dt>
                  <dd className="text-3xl font-light text-[var(--color-ink)] mono">
                    {launchPackages.length}
                  </dd>
                </div>
              </dl>

              <div className="divider-soft my-6" />

              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <span className="pill pill-future">Future Platform</span>
                  </span>
                  <span className="mono text-[var(--color-ink)] font-medium">
                    {futureCount}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <span className="pill pill-maintain">Maintain</span>
                  </span>
                  <span className="mono text-[var(--color-ink)] font-medium">
                    {maintainCount}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <span className="pill pill-eol">End of Life</span>
                  </span>
                  <span className="mono text-[var(--color-ink)] font-medium">
                    {eolCount}
                  </span>
                </div>
              </div>

              <div className="divider-soft my-6" />

              <Link
                href="/docs#pricing-maths"
                className="block rounded-xl border border-[var(--color-border)] bg-white p-4 hover:border-[var(--color-primary)] transition-colors group"
              >
                <div className="label-small text-[var(--color-text-muted)] mb-2">
                  Pricing formula
                </div>
                <code className="mono text-sm text-[var(--color-ink)] break-words">
                  F_scale = 1 + 0.25 × log₁₀(GWP / $10M)
                </code>
                <div className="text-xs font-medium text-[var(--color-primary)] group-hover:text-[var(--color-accent)] mt-3">
                  Explain the maths →
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Walk-the-flow ladder */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 pt-12 sm:pt-16">
        <div className="flex items-end justify-between gap-6 flex-wrap mb-6">
          <div>
            <div className="label-eyebrow mb-3">Demo flow</div>
            <h2 className="text-2xl sm:text-3xl font-light tracking-tight text-[var(--color-ink)]">
              Click through in this order
            </h2>
          </div>
          <p className="text-sm text-[var(--color-text-muted)] max-w-md">
            Built for a 5-minute stakeholder walk-through: open the
            configurator first, then use catalog &amp; cohort views to defend
            the choices.
          </p>
        </div>
        <ol className="grid gap-3 md:grid-cols-3">
          {FLOW_STEPS.map((step) => (
            <li key={step.n} className="step-card">
              <span className="step-card-num" aria-hidden="true">
                {step.n}
              </span>
              <div className="flex-1">
                <div className="text-sm font-semibold text-[var(--color-ink)]">
                  {step.title}
                </div>
                <p className="text-xs text-[var(--color-text-muted)] mt-1 leading-snug">
                  {step.body}
                </p>
                <Link
                  href={step.href}
                  className="text-xs font-medium text-[var(--color-primary)] hover:text-[var(--color-accent)] mt-2 inline-flex"
                >
                  {step.cta} →
                </Link>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* Three pillars */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-12 sm:py-16">
        <div className="flex items-end justify-between mb-8 gap-6 flex-wrap">
          <div>
            <div className="label-eyebrow mb-3">How the toolkit works</div>
            <h2 className="text-2xl sm:text-4xl font-light tracking-tight text-[var(--color-ink)]">
              Three pillars for every Sapiens conversation
            </h2>
          </div>
          <p className="text-[var(--color-text-muted)] max-w-md text-sm sm:text-base">
            Three connected views, one consistent story: catalog the portfolio,
            map it to customer cohorts, and configure the right package in
            minutes — with the operational detail to back the recommendation
            up.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {PILLARS.map((p) => (
            <Link
              key={p.href}
              href={p.href}
              className="card p-6 sm:p-7 group hover:border-[var(--color-primary)] transition-colors flex flex-col"
            >
              <div className="label-eyebrow mb-4">{p.eyebrow}</div>
              <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-[var(--color-ink)] mb-3">
                {p.title}
              </h3>
              <p className="text-sm text-[var(--color-text-muted)] leading-relaxed flex-1">
                {p.body}
              </p>
              <div className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[var(--color-primary)] group-hover:text-[var(--color-accent)] transition-colors">
                {p.cta} →
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Launch packages strip */}
      <section className="border-t border-[var(--color-border)] bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-12 sm:py-16">
          <div className="flex items-end justify-between mb-8 gap-6 flex-wrap">
            <div>
              <div className="label-eyebrow mb-3">June 30 launch</div>
              <h2 className="text-2xl sm:text-4xl font-light tracking-tight text-[var(--color-ink)]">
                Two launch packages, shared subscription foundations
              </h2>
            </div>
            <Link href="/packages" className="btn-ghost">
              Full launch package detail →
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {launchPackages.map((pkg) => (
              <div
                key={pkg.id}
                className="card p-6 sm:p-7 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 m-4">
                  <span className="pill pill-status">{pkg.status}</span>
                </div>
                <div className="label-eyebrow mb-3 pr-24">{pkg.subtitle}</div>
                <h3 className="text-2xl sm:text-3xl font-light tracking-tight text-[var(--color-ink)] mb-3">
                  {pkg.name}
                </h3>
                <p className="text-sm text-[var(--color-text-muted)] mb-5 max-w-md">
                  {pkg.valueProposition}
                </p>

                <dl className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <dt className="label-small text-[var(--color-text-muted)]">
                      Pricing
                    </dt>
                    <dd className="text-[var(--color-ink)] break-words">
                      {pkg.surchargeSummary}
                    </dd>
                  </div>
                  <div>
                    <dt className="label-small text-[var(--color-text-muted)]">
                      Timeline
                    </dt>
                    <dd className="text-[var(--color-ink)]">{pkg.timeline}</dd>
                  </div>
                </dl>

                <Link
                  href={`/configurator?package=${pkg.id}`}
                  className="btn-primary mt-6 w-full sm:w-auto"
                >
                  Configure {pkg.name} →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
