export type CaseStudy = {
  slug: string;
  status: string;
  titleLines: string[];
  tagline: string;
  meta: { label: string; value: string; color: string }[];
  problem: string;
  fix: string;
  /** Paths under /public. `screens[0]` is shown full width, the rest two per row. */
  cover: string;
  screens: { src: string; alt: string }[];
  stats: { value: string; note: string; color: string }[];
  /** Slug of the project shown in the "next up" folder. */
  next: string;
};

const dir = '/case/youngs-capital';

export const caseStudies: Record<string, CaseStudy> = {
  'youngs-capital': {
    slug: 'youngs-capital',
    status: 'Live',
    titleLines: ['Youngs', 'Capital'],
    tagline: 'Pakistan’s first profit-and-loss sharing brokerage — invest, trade and grow on the PSX, with a partner that stands beside you.',
    meta: [
      { label: 'Industry', value: 'FinTech', color: 'var(--yellow)' },
      { label: 'Platform', value: 'iOS & Android', color: 'var(--mint)' },
      { label: 'Timeline', value: '8 Weeks', color: 'var(--pink)' },
      { label: 'My role', value: 'Product Designer', color: 'var(--tape1)' },
    ],
    problem: 'Pakistan’s financial market lacks transparency and trust — leaving everyday investors without a reliable brokerage that stands beside them through market highs and lows.',
    fix: 'Youngs Capital introduces Pakistan’s first profit-and-loss sharing brokerage — a trusted partner that celebrates wins together and shoulders losses side by side.',
    cover: `${dir}/cover.jpg`,
    screens: [
      { src: `${dir}/ui.jpg`, alt: 'Youngs Capital app screens: profile, trade and learn' },
      { src: `${dir}/branding.jpg`, alt: 'Youngs Capital branding: logo, colours, type and icons' },
      { src: `${dir}/flows.jpg`, alt: 'Youngs Capital app flows: stock detail, portfolio and reports' },
    ],
    stats: [
      { value: 'Top-10', note: 'CDC-ranked broker within 4 months', color: 'var(--yellow)' },
      { value: '4.8★', note: 'on the App Store', color: 'var(--mint)' },
      { value: 'P&L sharing', note: 'a first for Pakistan', color: 'var(--pink)' },
    ],
    next: 'prime-traders',
  },
};
