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
  /** Self-initiated concept: "Solo designer", no "Worked with" chips. */
  solo?: boolean;
  /** Figma "Key decisions": always three. */
  decisions: { title: string; text: string }[];
};

export type Concept = Base & { kind: 'concept' };

/** Figma "My role": the same two variants on every case study. */
export const roles = {
  lead: { title: 'Lead Product Designer', text: 'I owned the product experience end to end, from shaping the flows with the founder and PM, through UI and the design system, to handoff and QA with the developers.', team: ['Founder', 'Product Manager', 'Developers', 'QA'] },
  solo: { title: 'Solo designer', text: 'A self-initiated concept. I ran it end to end (problem framing, flows, UI and the component system) to explore how this product could feel.', team: [] as string[] },
};

/** Figma "How it came together": the same four steps on every case study. */
export const processSteps = [
  { step: 'ALIGN', text: 'Shaped goals, users and scope with the founder and PM.' },
  { step: 'MAP', text: 'User flows and wireframes for every key journey.' },
  { step: 'DESIGN', text: 'High-fidelity UI and a reusable component system.' },
  { step: 'SHIP', text: 'Dev handoff, review cycles and QA until it felt right.' },
];

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
    tagline: 'Pakistan’s first profit-and-loss sharing brokerage. Invest, trade and grow on the PSX, with a partner that stands beside you.',
    teaser: 'Pakistan’s first profit-and-loss sharing brokerage.',
    meta: caseMeta('FinTech', 'iOS & Android'),
    cover: '/case/youngs-capital/hero.png', screens: ['/case/youngs-capital/screens.png'],
    receipts: { sub: LAUNCHED, rows: [
      { text: 'CDC-ranked broker within 4 months of launch', value: 'TOP 10' },
      { text: 'Average rating on the App Store', value: '4.8' },
      { text: 'Profit-and-loss sharing brokerage in Pakistan', value: '1ST' },
    ] },
    problem: { label: BROKEN, text: 'Pakistan’s financial market lacks transparency and trust, leaving everyday investors without a reliable brokerage that stands beside them through market highs and lows.' },
    fix: 'Youngs Capital introduces Pakistan’s first profit-and-loss sharing brokerage: a trusted partner that celebrates wins together and shoulders losses side by side.',
    decisions: [
      { title: 'Lead with the partnership, not the ticker', text: 'The P&L-sharing model is the whole product, so it sits front and centre in onboarding and on the home screen, before a single chart.' },
      { title: 'Make every number explain itself', text: 'Holdings, returns and shared profit are shown together with plain-language labels, so first-time PSX investors never wonder where their money went.' },
      { title: 'Trust signals in the flow', text: 'Security and regulatory cues appear exactly where money moves (funding, buying, selling), not buried in settings.' },
    ],
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
    problem: { label: BROKEN, text: 'Buying and selling cryptocurrency today involves complex interfaces, high transaction fees, and unreliable platforms, making it difficult for both beginners and experienced traders to trade digital assets with confidence and ease.' },
    fix: 'Prime Traders brings together 350+ cryptocurrencies, advanced trading tools, and industry-leading security in one seamless platform, giving every trader the easiest and most affordable way to buy, sell, and grow their crypto portfolio.',
    decisions: [
      { title: 'One platform for 350+ coins', text: 'A fast search and watchlist pattern makes 350+ assets feel browsable instead of overwhelming.' },
      { title: 'Two depths, one product', text: 'Beginners get a simple buy/sell flow; serious traders unlock advanced tools without a second app.' },
      { title: 'Same feel on web and mobile', text: 'Shared components and one visual system keep trading consistent across devices.' },
    ],
  },
  {
    kind: 'case', slug: 'traqstock', label: 'Project 03 · Live', name: 'TRAQSTOCK',
    tagline: 'Verified market data, transparent trading activity and trusted investor discussions, brought together in one platform.',
    meta: caseMeta('FinTech', 'Web Platform'), ...img('traqstock', 1),
    receipts: { sub: LAUNCHED, rows: [
      { text: 'Company share data, from the source', value: 'VERIFIED' },
      { text: 'For transparent trading activity', value: '1 VIEW' },
      HANDOFF,
    ] },
    problem: { label: BROKEN, text: 'Public company data, share structure information, trading activity, and investor discussions are often fragmented across multiple sources. This makes it difficult for investors to verify information, understand market activity, and participate in trustworthy discussions.' },
    fix: 'TraqStock creates a transparent market intelligence platform where public companies publish verified share data and investors get trusted company information, transparent trading activity, blockchain-anchored records and identity-verified discussions, all in one place.',
    decisions: [
      { title: 'Verified data gets its own visual language', text: 'Company-published, verified share data is styled distinctly so investors can tell fact from chatter at a glance.' },
      { title: 'Activity before opinions', text: 'Transparent trading activity sits next to discussions, so every conversation has the real numbers beside it.' },
      { title: 'Identity you can see', text: 'Verified-identity markers on every post make the discussion layer trustworthy by default.' },
    ],
  },
  {
    kind: 'case', slug: 'veyro', label: 'Project 04 · Live', name: 'VEYRO',
    tagline: 'Take control, send and swap crypto with one smarter wallet built for simplicity, security and control.',
    meta: caseMeta('FinTech · Web3', 'iOS & Android'), ...img('veyro', 1),
    receipts: { sub: LAUNCHED, rows: [
      { text: 'Spend and swap in one wallet', value: 'SWAP + PAY' },
      { text: 'Your keys, your assets', value: 'SELF-CUSTODY' },
      HANDOFF,
    ] },
    problem: { label: BROKEN, text: 'Managing crypto today means dealing with complex interfaces, fragmented apps, and risky swaps, making it difficult for everyday users to hold, send, and control their digital assets with confidence.' },
    fix: 'VEYRO brings together asset tracking, instant swaps, card payments, and portfolio management in one clean, secure wallet, giving users full control of their crypto without the complexity.',
    decisions: [
      { title: 'Swap and spend in one place', text: 'Instant swaps and card payments live one tap from the balance, so users never leave the wallet to use their crypto.' },
      { title: 'Control without complexity', text: 'Self-custody is explained in human language and confirmed at the right moments, not drowned in warnings.' },
      { title: 'Calm, dark, confident UI', text: 'A restrained dark interface keeps attention on balances and actions, not decoration.' },
    ],
  },
  {
    kind: 'case', slug: 'legion', label: 'Project 05 · Live', name: 'LEGION',
    tagline: 'Experience blockchain, Web3 gaming and crypto in one powerful network built for the next generation of digital ownership.',
    meta: caseMeta('FinTech · Web3', 'iOS & Android'), ...img('legion', 1),
    receipts: { sub: LAUNCHED, rows: [
      { text: 'Crypto + NFTs, managed in one place', value: '1 APP' },
      { text: 'Built into the same app', value: 'WEB3 GAMING' },
      HANDOFF,
    ] },
    problem: { label: BROKEN, text: 'Accessing blockchain technology, crypto wallets, and Web3 gaming content requires multiple platforms, making it overwhelming for users to manage assets, explore NFTs, and engage with digital experiences in one place.' },
    fix: 'Legion Network unifies crypto management, Web3 gaming, and blockchain technology in one seamless app, giving users full control of their digital assets, NFTs, and Web3 experiences without switching platforms.',
    decisions: [
      { title: 'One home for three worlds', text: 'Crypto, NFTs and Web3 gaming share one navigation, so users switch context without switching apps.' },
      { title: 'Assets first', text: 'Wallet and NFT holdings are always reachable, because ownership ties everything together.' },
      { title: 'Gaming that feels like gaming', text: 'Game content gets richer, more expressive layouts while finance screens stay clean and calm.' },
    ],
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
    solo: true,
    decisions: [
      { title: 'Three asset types, one portfolio', text: 'Crypto, stocks and tokenised real-world assets roll up into a single portfolio view.' },
      { title: 'Guided first steps', text: 'Onboarding walks first-time investors through each asset type instead of dropping them into a dashboard.' },
      { title: 'Clarity over density', text: 'Every screen answers one question: what do I own, what is it worth, what can I do next.' },
    ],
  },
  {
    kind: 'case', slug: 'pulse-pair', label: 'Project 07 · Concept', name: 'PULSE PAIR',
    tagline: 'Prediction markets, made chunky: a trading dashboard you can read at a glance and trade in seconds.',
    meta: caseMeta('Trading', 'Web + Mobile', { label: 'Type', value: 'Concept' }), ...img('pulse-pair', 1),
    receipts: { sub: DELIVERS, rows: [
      { text: 'Market cards you read at a glance', value: 'CHUNKY' },
      { text: 'One trade flow, desktop + mobile', value: '2 SCREENS' },
      SELF_LED,
    ] },
    problem: { label: IDEA, text: 'Prediction markets pack odds, volume, charts and order books into dense screens that are hard to read at a glance and harder to trade on with confidence.' },
    fix: 'Pulse Pair uses chunky, colour-coded market cards, a calm chart + trade view and a short mobile trade sheet, so you can read a market and place a trade in seconds.',
    solo: true,
    decisions: [
      { title: 'Chunky, colour-coded market cards', text: 'Markets are scannable in a second: big odds, clear colour, one action.' },
      { title: 'Calm chart + trade view', text: 'Chart and order panel sit side by side so reading and trading never compete.' },
      { title: 'A short mobile trade sheet', text: 'On mobile, placing a trade is a single bottom sheet, no page jumps.' },
    ],
  },
  {
    kind: 'case', slug: 'ember', label: 'Project 08 · Concept', name: 'EMBER',
    tagline: 'Your SaaS metrics at a glance: revenue, customers and alerts in one calm mobile app.',
    meta: caseMeta('SaaS', 'iOS & Android', { label: 'Type', value: 'Concept' }), ...img('ember', 1),
    receipts: { sub: DELIVERS, rows: [
      { text: 'Colourways: violet and orange', value: '2' },
      { text: 'Core views: revenue, customers & alerts', value: '3' },
      SELF_LED,
    ] },
    problem: { label: IDEA, text: 'SaaS founders bounce between dashboards to answer simple questions: how is revenue doing, who churned, and what needs my attention today?' },
    fix: 'Ember puts revenue, customers and alerts into one calm mobile app with a clear home view, account detail and smart alerts, designed in violet and orange colourways.',
    solo: true,
    decisions: [
      { title: 'Answer the founder’s three questions', text: 'Home is built around revenue, customers and what needs attention today.' },
      { title: 'Alerts that earn the notification', text: 'Smart alerts surface only meaningful changes, so the app stays calm.' },
      { title: 'Two colourways, one system', text: 'Violet and orange themes run on the same tokens, proving the system flexes.' },
    ],
  },
  {
    kind: 'case', slug: 'vion', label: 'Project 09 · Brand + Web', name: 'VION',
    tagline: 'Blockchain is broken for people. VION is a brand and website built for mass adoption: powerful, fast, for everyone.',
    meta: caseMeta('Web3', 'Brand + Web', { label: 'Type', value: 'Identity + UI' }), ...img('vion', 1),
    receipts: { sub: DELIVERS, rows: [
      { text: 'Tones: near-black palette, one signal green', value: '4' },
      { text: 'Identity, UI and site', value: 'BRAND + WEB' },
      { text: 'Designed for mass adoption', value: 'EVERYONE' },
    ] },
    problem: { label: IDEA, text: 'Blockchain still feels built for insiders (complex, slow and intimidating), so everyday people never get past the first screen.' },
    fix: 'A confident brand system of deep near-blacks and a single electric signal green, plus a website that walks people through landing, learning, joining and contributing in clear steps.',
    decisions: [
      { title: 'One signal colour', text: 'Deep near-blacks with a single electric green make every important element impossible to miss.' },
      { title: 'Explain, then invite', text: 'The site moves visitors from landing to learning to joining to contributing, in that order.' },
      { title: 'Built for people, not insiders', text: 'Copy and visuals avoid jargon so blockchain feels approachable for everyone.' },
    ],
  },
  {
    kind: 'case', slug: 'zkop', label: 'Project 10 · Website', name: 'ZKOP',
    tagline: 'The privacy-first EVM blockchain: complex zero-knowledge technology, explained in one clear, engaging website.',
    meta: caseMeta('Web3', 'Website', { label: 'Type', value: 'Web design' }), ...img('zkop', 1),
    receipts: { sub: DELIVERS, rows: [
      { text: 'First EVM blockchain', value: 'PRIVACY' },
      { text: 'Explained with visual diagrams', value: 'ZK' },
      { text: 'Structured from the first wireframe', value: 'SKETCH → UI' },
    ] },
    problem: { label: IDEA, text: 'Modern blockchain platforms often force users and developers to compromise between privacy, scalability, and usability. Most networks expose transaction data publicly, creating concerns around data security and confidentiality.' },
    fix: 'A modern, privacy-first blockchain website that makes complex technology easy to understand: key performance metrics up front, the privacy ecosystem explained through intuitive diagrams, and developer benefits in a clean, structured layout.',
    decisions: [
      { title: 'Proof up front', text: 'Key performance metrics lead the page so developers see the substance immediately.' },
      { title: 'Diagrams over paragraphs', text: 'The privacy ecosystem is explained visually, turning zero-knowledge concepts into something you can follow.' },
      { title: 'Developer benefits, structured', text: 'A clean, scannable layout lets technical readers find what matters to them fast.' },
    ],
  },
];

export const concepts: Concept[] = [
  { kind: 'concept', slug: 'crypto-wallet', label: 'Concept 11 · Crypto', name: 'CRYPTO WALLET', tagline: 'A bold, high-contrast crypto wallet: balances, coins and trades in a few thumb-friendly taps.', meta: conceptMeta('Crypto', 'iOS & Android'), ...img('crypto-wallet', 2) },
  { kind: 'concept', slug: 'crypto-swap', label: 'Concept 12 · DeFi', name: 'CRYPTO SWAP', tagline: 'A calm swap flow that shows rates, fees and price impact before you commit.', meta: conceptMeta('DeFi', 'Web app'), ...img('crypto-swap', 2) },
  { kind: 'concept', slug: 'nft-crypto-app', label: 'Concept 13 · NFT', name: 'NFT CRYPTO APP', tagline: 'Browse, collect and track NFT floor prices in a playful, card-first mobile app.', meta: conceptMeta('NFT', 'iOS & Android'), ...img('nft-crypto-app', 2) },
  { kind: 'concept', slug: 'trading-dashboard', label: 'Concept 14 · Trading', name: 'TRADING DASHBOARD', tagline: 'Wallet, exchange, markets and community in one dense-but-readable trading dashboard.', meta: conceptMeta('Trading', 'Web app'), ...img('trading-dashboard', 2) },
  { kind: 'concept', slug: 'wright-ai', label: 'Concept 15 · AI', name: 'WRIGHT AI', tagline: 'A landing page for an AI content tool: features, pricing and FAQ, wrapped in deep violet.', meta: conceptMeta('AI', 'Website'), ...img('wright-ai', 2) },
  { kind: 'concept', slug: 'crypto-vaults', label: 'Concept 16 · DeFi', name: 'CRYPTO VAULTS', tagline: 'Create and manage multiple crypto vaults, each with its own address and balance.', meta: conceptMeta('DeFi', 'Web app'), ...img('crypto-vaults', 2) },
  { kind: 'concept', slug: 'metaverse-social', label: 'Concept 17 · Metaverse', name: 'METAVERSE SOCIAL', tagline: 'A social app for the metaverse: profiles, followers, referrals and 3D assets.', meta: conceptMeta('Metaverse', 'iOS & Android'), ...img('metaverse-social', 2) },
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
