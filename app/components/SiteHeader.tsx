'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import BrandLogo from './BrandLogo';

const NAV_ITEMS = [
  { href: '/', label: 'Dashboard' },
  { href: '/cohorts', label: 'Need mapper' },
  { href: '/packages', label: 'Portfolio' },
  { href: '/configurator', label: 'Composer' },
  { href: '/brain', label: 'Brain DB' },
  { href: '/docs', label: 'Knowledge Base' },
];

function isActiveHref(pathname: string, href: string): boolean {
  return href === '/' ? pathname === '/' : pathname.startsWith(href);
}

export default function SiteHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeMobileNav = () => setMobileOpen(false);

  const onConfigurator = pathname.startsWith('/configurator');

  return (
    <header className="border-b border-[var(--color-border)] bg-white sticky top-0 z-30 backdrop-blur supports-[backdrop-filter]:bg-white/90 shadow-[0_1px_0_rgba(5,14,49,0.04)]">
      <div className="brand-topline" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-3 flex items-center justify-between gap-4">
        <Link
          href="/"
          className="flex items-center gap-3 group min-w-0"
          aria-label="Sapiens Subscription Services Toolkit home"
        >
          <BrandLogo variant="header" />
          <span className="hidden sm:flex items-center leading-tight pl-3 border-l border-[var(--color-border)] min-w-0">
            <span className="label-small text-[var(--color-primary)] uppercase tracking-[0.14em] text-[10px] font-semibold whitespace-nowrap">
              Subscription Toolkit
            </span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-5 lg:gap-7 shrink-0">
          {NAV_ITEMS.map((item) => {
            const isActive = isActiveHref(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                data-active={isActive}
                className="nav-link whitespace-nowrap"
                aria-current={isActive ? 'page' : undefined}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:flex items-center gap-3 shrink-0">
          {!onConfigurator ? (
            <Link href="/configurator" className="btn-primary whitespace-nowrap">
              Start configuring
            </Link>
          ) : null}
          <Link
            href="/settings"
            aria-label="Settings"
            className="text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors inline-flex items-center justify-center p-1"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h.01a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51h.01a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v.01a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
            </svg>
          </Link>
        </div>

        <button
          type="button"
          className="icon-btn mobile-menu-btn md:!hidden"
          aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
          onClick={() => setMobileOpen((o) => !o)}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            aria-hidden="true"
          >
            {mobileOpen ? (
              <path
                d="M5 5l10 10M15 5L5 15"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            ) : (
              <>
                <path d="M3 6h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                <path d="M3 10h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                <path d="M3 14h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </>
            )}
          </svg>
        </button>
      </div>

      {mobileOpen ? (
        <div id="mobile-nav" className="mobile-nav md:!hidden">
          <nav className="max-w-7xl mx-auto px-4 sm:px-6 py-2 flex flex-col">
            {NAV_ITEMS.map((item) => {
              const isActive = isActiveHref(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="mobile-nav-link"
                  data-active={isActive}
                  aria-current={isActive ? 'page' : undefined}
                  onClick={closeMobileNav}
                >
                  <span>{item.label}</span>
                  <span aria-hidden="true" className="text-[var(--color-text-muted)] text-sm">
                    →
                  </span>
                </Link>
              );
            })}
            {!onConfigurator ? (
              <Link href="/configurator" className="btn-primary mt-3 mb-3 w-full" onClick={closeMobileNav}>
                Start configuring
              </Link>
            ) : null}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
