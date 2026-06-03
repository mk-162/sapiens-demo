export default function SiteFooter() {
  return (
    <footer className="border-t border-[var(--color-border)] bg-white mt-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-sm text-[var(--color-text-muted)]">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded bg-[var(--color-primary)] text-white grid place-items-center text-xs font-medium">
            S
          </div>
          <span>
            Sapiens Subscription Services Toolkit · Internal sales enablement
            demo
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
