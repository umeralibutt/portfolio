import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import '@fontsource/silkscreen/700.css';
import '@fontsource/caveat/400.css';
import '@fontsource/jetbrains-mono/500.css';
import '@fontsource/jetbrains-mono/700.css';
import '@fontsource/unbounded/700.css';
import './globals.css';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Umar Ali Butt — Product Designer for dashboards, fintech & Web3',
  description: 'I design dashboards that don’t need a manual. Product designer in Islamabad for fintech, Web3 and SaaS.',
  openGraph: {
    title: 'Umar Ali Butt — Product Designer for dashboards, fintech & Web3',
    description: 'I design dashboards that don’t need a manual.',
    images: ['/work/youngs-capital.jpg'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={GeistSans.variable}>
      <body>
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
