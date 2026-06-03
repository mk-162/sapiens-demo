import { Suspense } from 'react';
import type { Metadata } from 'next';
import ConfiguratorClient from './ConfiguratorClient';

export const metadata: Metadata = {
  title: 'Subscription Configurator · Sapiens Subscription Toolkit',
};

export default function ConfiguratorPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10 text-sm text-[var(--color-text-muted)]">
          Loading configurator…
        </div>
      }
    >
      <ConfiguratorClient />
    </Suspense>
  );
}
