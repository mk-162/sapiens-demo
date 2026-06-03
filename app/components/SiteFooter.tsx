import BrandLogo from './BrandLogo';

export default function SiteFooter() {
  return (
    <footer className="border-t border-[var(--color-border)] bg-white mt-20">
      <div className="brand-topline" />
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-sm text-[var(--color-text-muted)]">
        <div className="flex items-center gap-4">
          <BrandLogo variant="compact" />
          <span className="pl-4 border-l border-[var(--color-border)]">
            Subscription Services Toolkit · Internal sales enablement workspace
          </span>
        </div>
        <div className="flex items-center gap-5">
          <span>June 30 launch playbook</span>
          <span className="hidden md:inline-block w-px h-3 bg-[var(--color-border-strong)]" />
          <span>Confidential</span>
        </div>
      </div>
    </footer>
  );
}
