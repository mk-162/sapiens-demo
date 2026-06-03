import type { Metadata } from 'next';
import CohortsClient from './CohortsClient';

export const metadata: Metadata = {
  title: 'Cohort Mapping · Sapiens Subscription Toolkit',
};

export default function CohortsPage() {
  return <CohortsClient />;
}
