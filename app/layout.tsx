import type { Metadata } from 'next';
import './globals.css';
import SiteHeader from './components/SiteHeader';
import SiteFooter from './components/SiteFooter';
import DealAdvisor from './components/DealAdvisor';
import { DemoDataProvider } from '@/lib/demo-data-context';

export const metadata: Metadata = {
  title: 'Sapiens Subscription Services Toolkit',
  description:
    'Internal sales enablement workspace for the Sapiens subscription portfolio — services catalog, cohort mapping and the June 30 Horizon & Intelligent launch packages.',
  icons: {
    icon: '/brand/sapiens-logo.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <DemoDataProvider>
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <DealAdvisor />
          <SiteFooter />
        </DemoDataProvider>
      </body>
    </html>
  );
}
