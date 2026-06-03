import BrandLogo from './BrandLogo';

export default function SiteFooter() {
  return (
    <footer className="border-t border-[var(--color-border)] bg-white mt-20">
      <div className="brand-topline" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-7 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-sm text-[var(--color-text-muted)]">
        <div className="flex items-center gap-3">
          <BrandLogo variant="compact" />
          <span className="pl-3 border-l border-[var(--color-border)]">
            Subscription Toolkit · Internal sales enablement
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs">
          <span>Pricing &amp; package constructs are indicative — see docs/.</span>
          <span className="hidden md:inline-block w-px h-3 bg-[var(--color-border-strong)]" />
          <span>Confidential</span>
        </div>
      </div>
    </footer>
  );
}
