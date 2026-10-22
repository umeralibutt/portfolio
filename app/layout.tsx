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
import Motion from '@/components/Motion';

// Absolute base for Open Graph image URLs: an explicit site URL, else the Vercel deployment, else local dev.
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  ?? (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : 'http://localhost:3000');

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Umar Ali Butt — Product Designer for dashboards, fintech & Web3',
  description: 'I design dashboards that don’t need a manual. Product designer in Islamabad for fintech, Web3 and SaaS.',
  openGraph: {
    title: 'Umar Ali Butt — Product Designer for dashboards, fintech & Web3',
    description: 'I design dashboards that don’t need a manual.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={GeistSans.variable} suppressHydrationWarning>
      <head>
        {/* Turn on entrance animations before first paint, unless the visitor prefers reduced motion. */}
        <script dangerouslySetInnerHTML={{ __html: "if(!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('motion')" }} />
      </head>
      <body>
        <Motion />
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
