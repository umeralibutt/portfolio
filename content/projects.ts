// Detail pages for /work/[slug], copied verbatim from the Figma frames on "Umar's Website 2":
// case studies 234:296 (Youngs Capital) + 249:24 … 249:1360, concepts 252:24 … 252:1050.
// Images live in /public/case/<slug>/. "Next up" follows this order and loops within each kind.

export type Meta = { label: string; value: string };

type Base = {
  slug: string;
  /** Eyebrow, e.g. "Project 01 · Live". */
  label: string;
  name: string;
  tagline: string;
  /** Shorter line used when another page points here as "next up" (defaults to the tagline). */
  teaser?: string;
  meta: Meta[];
  cover: string;
  screens: string[];
};

export type CaseStudy = Base & {
  kind: 'case';
  receipts: { sub: string; rows: { text: string; value: string }[] };
  problem: { label: string; text: string };
  fix: string;
};

export type Concept = Base & { kind: 'concept' };

export type Project = CaseStudy | Concept;

const LAUNCHED = 'What happened after launch.';
const DELIVERS = 'What the work delivers.';
const BROKEN = 'so, what was broken?';
const IDEA = 'the idea';
const HANDOFF = { text: 'From first flow to handoff', value: '8 WKS' };
const SELF_LED = { text: 'A self-initiated exploration', value: 'SELF-LED' };

const role: Meta = { label: 'My role', value: 'Product Designer' };
const caseMeta = (industry: string, platform: string, third: Meta = { label: 'Timeline', value: '8 weeks' }): Meta[] => [
  { label: 'Industry', value: industry },
  { label: 'Platform', value: platform },
  third,
  role,
];
const conceptMeta = (type: string, platform: string): Meta[] => [
  { label: 'Type', value: type },
  { label: 'Platform', value: platform },
  { label: 'Status', value: 'Concept' },
  role,
];
const img = (slug: string, screens: number) => ({
  cover: `/case/${slug}/cover.jpg`,
  screens: Array.from({ length: screens }, (_, i) => `/case/${slug}/screen-${i + 1}.jpg`),
});

export const caseStudies: CaseStudy[] = [
  {
    kind: 'case', slug: 'youngs-capital', label: 'Project 01 · Live', name: 'YOUNGS CAPITAL',
    tagline: 'Pakistan’s first profit-and-loss sharing brokerage — invest, trade and grow on the PSX, with a partner that stands beside you.',
    teaser: 'Pakistan’s first profit-and-loss sharing brokerage.',
    meta: caseMeta('FinTech', 'iOS & Android'),
    cover: '/case/youngs-capital/hero.png', screens: ['/case/youngs-capital/screens.png'],
    receipts: { sub: LAUNCHED, rows: [
      { text: 'CDC-ranked broker within 4 months of launch', value: 'TOP 10' },
      { text: 'Average rating on the App Store', value: '4.8' },
      { text: 'Profit-and-loss sharing brokerage in Pakistan', value: '1ST' },
    ] },
    problem: { label: BROKEN, text: 'Pakistan’s financial market lacks transparency and trust — leaving everyday investors without a reliable brokerage that stands beside them through market highs and lows.' },
    fix: 'Youngs Capital introduces Pakistan’s first profit-and-loss sharing brokerage — a trusted partner that celebrates wins together and shoulders losses side by side.',
  },
  {
    kind: 'case', slug: 'prime-traders', label: 'Project 02 · Live', name: 'PRIME TRADERS',
    tagline: 'Buy, sell and trade 350+ cryptocurrencies in one fast, secure platform built for simplicity, speed and serious traders.',
    teaser: 'Buy, sell and trade 350+ cryptocurrencies in one fast, secure platform.',
    meta: caseMeta('FinTech', 'Web & Mobile'), ...img('prime-traders', 1),
    receipts: { sub: LAUNCHED, rows: [
      { text: 'Cryptocurrencies, one platform', value: '350+' },
      { text: 'One consistent trading experience', value: 'WEB + APP' },
      HANDOFF,
    ] },
    problem: { label: BROKEN, text: 'Buying and selling cryptocurrency today involves complex interfaces, high transaction fees, and unreliable platforms — making it difficult for both beginners and experienced traders to trade digital assets with confidence and ease.' },
    fix: 'Prime Traders brings together 350+ cryptocurrencies, advanced trading tools, and industry-leading security in one seamless platform — giving every trader the easiest and most affordable way to buy, sell, and grow their crypto portfolio.',
  },
  {
    kind: 'case', slug: 'traqstock', label: 'Project 03 · Live', name: 'TRAQSTOCK',
    tagline: 'Verified market data, transparent trading activity and trusted investor discussions — brought together in one platform.',
    meta: caseMeta('FinTech', 'Web Platform'), ...img('traqstock', 1),
    receipts: { sub: LAUNCHED, rows: [
      { text: 'Company share data, from the source', value: 'VERIFIED' },
      { text: 'For transparent trading activity', value: '1 VIEW' },
      HANDOFF,
    ] },
    problem: { label: BROKEN, text: 'Public company data, share structure information, trading activity, and investor discussions are often fragmented across multiple sources. This makes it difficult for investors to verify information, understand market activity, and participate in trustworthy discussions.' },
    fix: 'TraqStock creates a transparent market intelligence platform where public companies publish verified share data and investors get trusted company information, transparent trading activity, blockchain-anchored records and identity-verified discussions — all in one place.',
  },
  {
    kind: 'case', slug: 'veyro', label: 'Project 04 · Live', name: 'VEYRO',
    tagline: 'Take control, send and swap crypto — one smarter wallet built for simplicity, security and control.',
    meta: caseMeta('FinTech · Web3', 'iOS & Android'), ...img('veyro', 1),
    receipts: { sub: LAUNCHED, rows: [
      { text: 'Spend and swap in one wallet', value: 'SWAP + PAY' },
      { text: 'Your keys, your assets', value: 'SELF-CUSTODY' },
      HANDOFF,
    ] },
    problem: { label: BROKEN, text: 'Managing crypto today means dealing with complex interfaces, fragmented apps, and risky swaps — making it difficult for everyday users to hold, send, and control their digital assets with confidence.' },
    fix: 'VEYRO brings together asset tracking, instant swaps, card payments, and portfolio management in one clean, secure wallet — giving users full control of their crypto without the complexity.',
  },
  {
    kind: 'case', slug: 'legion', label: 'Project 05 · Live', name: 'LEGION',
    tagline: 'Experience blockchain, Web3 gaming and crypto — one powerful network built for the next generation of digital ownership.',
    meta: caseMeta('FinTech · Web3', 'iOS & Android'), ...img('legion', 1),
    receipts: { sub: LAUNCHED, rows: [
      { text: 'Crypto + NFTs, managed in one place', value: '1 APP' },
      { text: 'Built into the same app', value: 'WEB3 GAMING' },
      HANDOFF,
    ] },
    problem: { label: BROKEN, text: 'Accessing blockchain technology, crypto wallets, and Web3 gaming content requires multiple platforms — making it overwhelming for users to manage assets, explore NFTs, and engage with digital experiences in one place.' },
    fix: 'Legion Network unifies crypto management, Web3 gaming, and blockchain technology in one seamless app — giving users full control of their digital assets, NFTs, and Web3 experiences without switching platforms.',
  },
  {
    kind: 'case', slug: 'pace-wallet', label: 'Project 06 · Concept', name: 'PACE WALLET',
    tagline: 'Manage crypto, stocks and real-world assets in one secure wallet with a seamless investing experience.',
    meta: caseMeta('FinTech · Web3', 'iOS & Android'), ...img('pace-wallet', 1),
    receipts: { sub: DELIVERS, rows: [
      { text: 'Crypto, stocks & real-world assets', value: '3-IN-1' },
      { text: 'Onboarding for first-time investors', value: 'GUIDED' },
      HANDOFF,
    ] },
    problem: { label: IDEA, text: 'Managing digital wealth today means switching between multiple apps for crypto, stocks, and investments, making portfolio management fragmented, inefficient, and difficult to navigate.' },
    fix: 'Manage cryptocurrencies, stocks, and tokenized real-world assets from a single secure wallet, eliminating the need to switch between multiple platforms.',
  },
  {
    kind: 'case', slug: 'pulse-pair', label: 'Project 07 · Concept', name: 'PULSE PAIR',
    tagline: 'Prediction markets, made chunky — a trading dashboard you can read at a glance and trade in seconds.',
    meta: caseMeta('Trading', 'Web + Mobile', { label: 'Type', value: 'Concept' }), ...img('pulse-pair', 1),
    receipts: { sub: DELIVERS, rows: [
      { text: 'Market cards you read at a glance', value: 'CHUNKY' },
      { text: 'One trade flow, desktop + mobile', value: '2 SCREENS' },
      SELF_LED,
    ] },
    problem: { label: IDEA, text: 'Prediction markets pack odds, volume, charts and order books into dense screens — hard to read at a glance and harder to trade on with confidence.' },
    fix: 'Pulse Pair uses chunky, colour-coded market cards, a calm chart + trade view and a short mobile trade sheet, so you can read a market and place a trade in seconds.',
  },
  {
    kind: 'case', slug: 'ember', label: 'Project 08 · Concept', name: 'EMBER',
    tagline: 'Your SaaS metrics, at a glance — revenue, customers and alerts in one calm mobile app.',
    meta: caseMeta('SaaS', 'iOS & Android', { label: 'Type', value: 'Concept' }), ...img('ember', 1),
    receipts: { sub: DELIVERS, rows: [
      { text: 'Colourways — violet and orange', value: '2' },
      { text: 'Core views: revenue, customers & alerts', value: '3' },
      SELF_LED,
    ] },
    problem: { label: IDEA, text: 'SaaS founders bounce between dashboards to answer simple questions: how is revenue doing, who churned, and what needs my attention today?' },
    fix: 'Ember puts revenue, customers and alerts into one calm mobile app with a clear home view, account detail and smart alerts — designed in violet and orange colourways.',
  },
  {
    kind: 'case', slug: 'vion', label: 'Project 09 · Brand + Web', name: 'VION',
    tagline: 'Blockchain is broken for people. VION is a brand and website built for mass adoption — powerful, fast, for everyone.',
    meta: caseMeta('Web3', 'Brand + Web', { label: 'Type', value: 'Identity + UI' }), ...img('vion', 1),
    receipts: { sub: DELIVERS, rows: [
      { text: 'Tones: near-black palette, one signal green', value: '4' },
      { text: 'Identity, UI and site', value: 'BRAND + WEB' },
      { text: 'Designed for mass adoption', value: 'EVERYONE' },
    ] },
    problem: { label: IDEA, text: 'Blockchain still feels built for insiders — complex, slow and intimidating — so everyday people never get past the first screen.' },
    fix: 'A confident brand system — deep near-blacks with a single electric signal green — and a website that walks people through landing, learning, joining and contributing in clear steps.',
  },
  {
    kind: 'case', slug: 'zkop', label: 'Project 10 · Website', name: 'ZKOP',
    tagline: 'The privacy-first EVM blockchain — complex zero-knowledge technology, explained in one clear, engaging website.',
    meta: caseMeta('Web3', 'Website', { label: 'Type', value: 'Web design' }), ...img('zkop', 1),
    receipts: { sub: DELIVERS, rows: [
      { text: 'First EVM blockchain', value: 'PRIVACY' },
      { text: 'Explained with visual diagrams', value: 'ZK' },
      { text: 'Structured from the first wireframe', value: 'SKETCH → UI' },
    ] },
    problem: { label: IDEA, text: 'Modern blockchain platforms often force users and developers to compromise between privacy, scalability, and usability. Most networks expose transaction data publicly, creating concerns around data security and confidentiality.' },
    fix: 'A modern, privacy-first blockchain website that makes complex technology easy to understand — key performance metrics up front, the privacy ecosystem explained through intuitive diagrams, and developer benefits in a clean, structured layout.',
  },
];

export const concepts: Concept[] = [
  { kind: 'concept', slug: 'crypto-wallet', label: 'Concept 11 · Crypto', name: 'CRYPTO WALLET', tagline: 'A bold, high-contrast crypto wallet — balances, coins and trades in a few thumb-friendly taps.', meta: conceptMeta('Crypto', 'iOS & Android'), ...img('crypto-wallet', 2) },
  { kind: 'concept', slug: 'crypto-swap', label: 'Concept 12 · DeFi', name: 'CRYPTO SWAP', tagline: 'A calm swap flow that shows rates, fees and price impact before you commit.', meta: conceptMeta('DeFi', 'Web app'), ...img('crypto-swap', 2) },
  { kind: 'concept', slug: 'nft-crypto-app', label: 'Concept 13 · NFT', name: 'NFT CRYPTO APP', tagline: 'Browse, collect and track NFT floor prices in a playful, card-first mobile app.', meta: conceptMeta('NFT', 'iOS & Android'), ...img('nft-crypto-app', 2) },
  { kind: 'concept', slug: 'trading-dashboard', label: 'Concept 14 · Trading', name: 'TRADING DASHBOARD', tagline: 'Wallet, exchange, markets and community in one dense-but-readable trading dashboard.', meta: conceptMeta('Trading', 'Web app'), ...img('trading-dashboard', 2) },
  { kind: 'concept', slug: 'wright-ai', label: 'Concept 15 · AI', name: 'WRIGHT AI', tagline: 'A landing page for an AI content tool — features, pricing and FAQ, wrapped in deep violet.', meta: conceptMeta('AI', 'Website'), ...img('wright-ai', 2) },
  { kind: 'concept', slug: 'crypto-vaults', label: 'Concept 16 · DeFi', name: 'CRYPTO VAULTS', tagline: 'Create and manage multiple crypto vaults, each with its own address and balance.', meta: conceptMeta('DeFi', 'Web app'), ...img('crypto-vaults', 2) },
  { kind: 'concept', slug: 'metaverse-social', label: 'Concept 17 · Metaverse', name: 'METAVERSE SOCIAL', tagline: 'A social app for the metaverse — profiles, followers, referrals and 3D assets.', meta: conceptMeta('Metaverse', 'iOS & Android'), ...img('metaverse-social', 2) },
];

export const projects: Project[] = [...caseStudies, ...concepts];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);

/** The next page in Work order, looping within case studies or concepts. */
export function nextProject(p: Project): Project {
  const list: Project[] = p.kind === 'case' ? caseStudies : concepts;
  return list[(list.indexOf(p) + 1) % list.length];
}

/** "01 · Live" → "01": the number in a project's eyebrow. */
export const projectNumber = (p: Project) => p.label.match(/\d+/)?.[0] ?? '';
