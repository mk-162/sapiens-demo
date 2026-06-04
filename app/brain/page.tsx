import type { Metadata } from 'next';
import BrainClient from './BrainClient';

export const metadata: Metadata = {
  title: 'Second Brain · Sapiens Subscription Toolkit',
  description:
    'Sales intelligence brain for niche Sapiens proposal use cases, catalogue assets and product-offer generation.',
};

export default function BrainPage() {
  return <BrainClient />;
}
