'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_ITEMS = [
  { href: '/', label: 'Dashboard' },
  { href: '/modules', label: 'Services Catalog' },
  { href: '/cohorts', label: 'Cohort Mapping' },
  { href: '/configurator', label: 'Configurator' },
  { href: '/packages', label: 'Launch Packages' },
];

export default function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="border-b border-[var(--color-border)] bg-white sticky top-0 z-30 backdrop-blur supports-[backdrop-filter]:bg-white/85">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-4 flex items-center justify-between gap-8">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-md bg-[var(--color-primary)] text-white grid place-items-center font-display font-medium text-lg leading-none shadow-sm">
            S
          </div>
          <div className="leading-tight">
            <div className="font-semibold tracking-tight text-[15px] text-[var(--color-ink)]">
              Sapiens
            </div>
            <div className="label-small text-[var(--color-text-muted)] uppercase tracking-[0.14em] text-[10px]">
              Subscription Services Toolkit
            </div>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-7">
          {NAV_ITEMS.map((item) => {
            const isActive =
              item.href === '/'
                ? pathname === '/'
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                data-active={isActive}
                className="nav-link"
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <span className="label-eyebrow text-[var(--color-text-muted)]">
            Internal · Sales Enablement
          </span>
          <Link href="/configurator" className="btn-primary">
            Open Configurator
          </Link>
        </div>
      </div>
    </header>
  );
}
