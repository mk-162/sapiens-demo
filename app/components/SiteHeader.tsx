'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import BrandLogo from './BrandLogo';

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
    <header className="border-b border-[var(--color-border)] bg-white sticky top-0 z-30 backdrop-blur supports-[backdrop-filter]:bg-white/90 shadow-[0_1px_0_rgba(5,14,49,0.04)]">
      <div className="brand-topline" />
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-4 flex items-center justify-between gap-8">
        <Link href="/" className="flex items-center gap-4 group" aria-label="Sapiens Subscription Services Toolkit home">
          <BrandLogo />
          <div className="hidden sm:block leading-tight pl-4 border-l border-[var(--color-border)]">
            <div className="label-small text-[var(--color-primary)] uppercase tracking-[0.16em] text-[10px] font-semibold">
              Subscription Services Toolkit
            </div>
            <div className="text-[11px] text-[var(--color-text-muted)] mt-0.5">
              Internal sales enablement
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
