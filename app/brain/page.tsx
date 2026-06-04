import type { Metadata } from 'next';
import BrainClient from './BrainClient';
import { buildBrainSnapshot, getMarkdownBrainAssets } from '@/lib/brain-markdown';

export const metadata: Metadata = {
  title: 'Second Brain · Sapiens Subscription Toolkit',
  description:
    'Git-backed sales intelligence brain for Sapiens proposal use cases, catalogue assets and product-offer generation.',
};

export default function BrainPage() {
  const markdownAssets = getMarkdownBrainAssets();
  const markdownSnapshot = buildBrainSnapshot(markdownAssets);

  return <BrainClient markdownAssets={markdownAssets} markdownSnapshot={markdownSnapshot} />;
}
