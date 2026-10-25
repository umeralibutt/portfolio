import type { Metadata } from 'next';
import { Anton, IBM_Plex_Mono, Inter, Instrument_Serif, Unbounded } from 'next/font/google';
import './globals.css';
import Nav from '@/components/site/Nav';
import Footer from '@/components/site/Footer';
import Effects from '@/components/site/Effects';
import Cursor from '@/components/site/Cursor';
import Preloader from '@/components/site/Preloader';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

const anton = Anton({ subsets: ['latin'], weight: '400', variable: '--font-anton', display: 'swap' });
const instrument = Instrument_Serif({ subsets: ['latin'], weight: '400', style: ['normal', 'italic'], variable: '--font-instrument', display: 'swap' });
const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const unbounded = Unbounded({ subsets: ['latin'], weight: '700', variable: '--font-unbounded', display: 'swap' });
const plex = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-plex', display: 'swap' });

// Absolute base for Open Graph image URLs: an explicit site URL, else the Vercel deployment, else local dev.
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  ?? (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : 'http://localhost:3000');

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Umar Ali Butt — Product Designer for apps, web & brands',
  description: 'I design (almost) everything — apps, platforms, dashboards & brands. Product designer in Islamabad for fintech, Web3 and AI.',
  openGraph: {
    title: 'Umar Ali Butt — Product Designer for apps, web & brands',
    description: 'I design (almost) everything — apps, platforms, dashboards & brands.',
  },
};

// Runs before first paint: marks JS as available, and shows the preloader on the first visit of a session
// (never with reduced motion). Everything still renders and reads fine if this never runs.
const boot = `(function(d){var h=d.documentElement;h.classList.add('js');
var rm=matchMedia('(prefers-reduced-motion: reduce)').matches;if(rm)h.classList.add('rm');
try{if(!rm&&!sessionStorage.getItem('seen'))h.classList.add('preload');}catch(e){}})(document)`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${anton.variable} ${instrument.variable} ${inter.variable} ${plex.variable} ${unbounded.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: boot }} />
      </head>
      <body>
        <Preloader />
        <Nav />
        {/* overflow-x-clip: scroll effects slide things in from past the edges; that must never become sideways scroll. */}
        <main id="main" className="overflow-x-clip">{children}</main>
        <Footer />
        <Cursor />
        <Effects />
        {/* Vercel Web Analytics + Speed Insights (enable both in the Vercel project to start collecting). */}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
