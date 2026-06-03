import Link from 'next/link';
import BrandLogo from './components/BrandLogo';
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
    eyebrow: '03 · Toolkit',
    title: 'Sales Configurator',
    body: 'Apply Horizon or Intelligent presets, tailor add-ons, scale by GWP and see ARR, surcharges, managed cloud ops and professional services recalculate live. Generate a quote preview in seconds.',
    href: '/configurator',
    cta: 'Open configurator',
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
        <div className="relative max-w-7xl mx-auto px-6 lg:px-10 pt-16 pb-20">
          <div className="grid lg:grid-cols-[1.4fr_1fr] gap-12 items-end">
            <div>
              <div className="inline-flex items-center gap-4 rounded-full border border-[var(--color-border)] bg-white/85 px-4 py-2 mb-6 shadow-sm">
                <BrandLogo variant="compact" />
                <span className="label-small uppercase tracking-[0.16em] text-[10px] text-[var(--color-primary)] font-semibold">
                  Internal toolkit
                </span>
              </div>
              <div className="label-eyebrow text-[var(--color-primary)] mb-5">
                Sapiens Subscription Services Toolkit
              </div>
              <h1 className="text-[56px] lg:text-[68px] font-light text-[var(--color-ink)] leading-[1.02] tracking-tight">
                Advance the possible across
                <br />
                <span className="text-[var(--color-primary)]">
                  the Sapiens subscription portfolio
                </span>
                .
              </h1>
              <p className="mt-6 text-lg text-[var(--color-text-muted)] max-w-2xl">
                One workspace for every commercial conversation — services
                catalog, cohort strategy, June 30 Horizon &amp; Intelligent
                launch packages, and a live configurator — all aligned to the
                Future Platform, Maintain and End-of-Life portfolio
                segmentation.
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Link href="/configurator" className="btn-accent">
                  Configure a deal
                </Link>
                <Link href="/cohorts" className="btn-ghost">
                  Review cohort strategy
                </Link>
                <Link href="/packages" className="btn-ghost">
                  See June 30 packages
                </Link>
              </div>
            </div>

            <div className="card-elevated brand-card p-6">
              <div className="label-eyebrow mb-4">Portfolio at a glance</div>
              <dl className="grid grid-cols-2 gap-y-5 gap-x-6">
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
            </div>
          </div>
        </div>
      </section>

      {/* Three pillars */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
        <div className="flex items-end justify-between mb-10 gap-6 flex-wrap">
          <div>
            <div className="label-eyebrow mb-3">How the toolkit works</div>
            <h2 className="text-4xl font-light tracking-tight text-[var(--color-ink)]">
              Three pillars for every Sapiens conversation
            </h2>
          </div>
          <p className="text-[var(--color-text-muted)] max-w-md">
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
              className="card p-7 group hover:border-[var(--color-primary)] transition-colors flex flex-col"
            >
              <div className="label-eyebrow mb-4">{p.eyebrow}</div>
              <h3 className="text-2xl font-semibold tracking-tight text-[var(--color-ink)] mb-3">
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
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
          <div className="flex items-end justify-between mb-10 gap-6 flex-wrap">
            <div>
              <div className="label-eyebrow mb-3">June 30 launch</div>
              <h2 className="text-4xl font-light tracking-tight text-[var(--color-ink)]">
                Two packages, one Evergreen core
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
                className="card p-7 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 m-5">
                  <span className="pill pill-status">{pkg.status}</span>
                </div>
                <div className="label-eyebrow mb-3">{pkg.subtitle}</div>
                <h3 className="text-3xl font-light tracking-tight text-[var(--color-ink)] mb-3">
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
                    <dd className="text-[var(--color-ink)]">
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
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
