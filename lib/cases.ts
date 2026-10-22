// Detail pages for /work/[slug], copied from the Figma case-study and concept frames.
// Images live in /public/case/<slug>/ (cover.jpg + screen-N.jpg).

type Folder = 'ink' | 'blue' | 'mint' | 'yellow' | 'pink';

export type CaseStudy = {
  slug: string;
  /** Projects get problem/fix + stats; concepts are a lighter "side quest" page. */
  kind: 'project' | 'concept';
  kicker: string;
  titleLines: string[];
  tagline: string;
  /** Four label/value notes; colours are assigned by position (yellow, mint, pink, blue). */
  meta: [string, string][];
  note: string;
  story?: { kicker: string; problem: string; fix: string };
  cover: string;
  screens: string[];
  stats?: [string, string][];
  next: { slug: string; blurb: string; color: Folder };
};

const img = (slug: string, screens: number) => ({
  cover: `/case/${slug}/cover.jpg`,
  screens: Array.from({ length: screens }, (_, i) => `/case/${slug}/screen-${i + 1}.jpg`),
});

const role: [string, string] = ['My role', 'Product Designer'];
const broken = 'so, what was broken?';
const receipts = '↓ the receipts';
const sideQuest = 'a side quest, not a client brief ↓';
const handoff: [string, string] = ['8 weeks', 'from first flow to handoff'];
const selfInitiated: [string, string] = ['Concept', 'self-initiated exploration'];

const list: CaseStudy[] = [
  {
    slug: 'youngs-capital', kind: 'project', kicker: 'Project 01 · Live', titleLines: ['Youngs', 'Capital'],
    tagline: 'Pakistan’s first profit-and-loss sharing brokerage — invest, trade and grow on the PSX, with a partner that stands beside you.',
    meta: [['Industry', 'FinTech'], ['Platform', 'iOS & Android'], ['Timeline', '8 Weeks'], role], note: receipts,
    story: {
      kicker: broken,
      problem: 'Pakistan’s financial market lacks transparency and trust — leaving everyday investors without a reliable brokerage that stands beside them through market highs and lows.',
      fix: 'Youngs Capital introduces Pakistan’s first profit-and-loss sharing brokerage — a trusted partner that celebrates wins together and shoulders losses side by side.',
    },
    cover: '/case/youngs-capital/cover.jpg',
    screens: ['/case/youngs-capital/ui.jpg', '/case/youngs-capital/branding.jpg', '/case/youngs-capital/flows.jpg'],
    stats: [['Top-10', 'CDC-ranked broker within 4 months'], ['4.8★', 'on the App Store'], ['P&L sharing', 'a first for Pakistan']],
    next: { slug: 'prime-traders', blurb: 'Buy, sell and trade 350+ cryptocurrencies in one fast, secure platform.', color: 'blue' },
  },
  {
    slug: 'prime-traders', kind: 'project', kicker: 'Project 02 · Live', titleLines: ['Prime', 'Traders'],
    tagline: 'Buy, sell and trade 350+ cryptocurrencies in one fast, secure platform built for simplicity, speed and serious traders.',
    meta: [['Industry', 'FinTech'], ['Platform', 'Web & Mobile'], ['Timeline', '8 Weeks'], role], note: receipts,
    story: {
      kicker: broken,
      problem: 'Buying and selling cryptocurrency today involves complex interfaces, high transaction fees, and unreliable platforms — making it difficult for both beginners and experienced traders to trade digital assets with confidence and ease.',
      fix: 'Prime Traders brings together 350+ cryptocurrencies, advanced trading tools, and industry-leading security in one seamless platform — giving every trader the easiest and most affordable way to buy, sell, and grow their crypto portfolio.',
    },
    ...img('prime-traders', 3),
    stats: [['350+', 'cryptocurrencies, one platform'], ['Web + mobile', 'one consistent trading experience'], handoff],
    next: { slug: 'traqstock', blurb: 'Verified market data, transparent trading activity and trusted investor discussions.', color: 'mint' },
  },
  {
    slug: 'traqstock', kind: 'project', kicker: 'Project 03 · Live', titleLines: ['Traqstock'],
    tagline: 'Verified market data, transparent trading activity and trusted investor discussions — brought together in one platform.',
    meta: [['Industry', 'FinTech'], ['Platform', 'Web Platform'], ['Timeline', '8 Weeks'], role], note: receipts,
    story: {
      kicker: broken,
      problem: 'Public company data, share structure information, trading activity, and investor discussions are often fragmented across multiple sources. This makes it difficult for investors to verify information, understand market activity, and participate in trustworthy discussions.',
      fix: 'TraqStock creates a transparent market intelligence platform where public companies can publish verified share data and investors can access trusted company information, transparent trading activity, blockchain-anchored records, and identity-verified discussions—all in one place.',
    },
    ...img('traqstock', 3),
    stats: [['Verified', 'company share data, from the source'], ['Transparent', 'trading activity in one view'], handoff],
    next: { slug: 'veyro', blurb: 'A smarter crypto wallet — track, send, swap and pay with full control.', color: 'yellow' },
  },
  {
    slug: 'veyro', kind: 'project', kicker: 'Project 04 · Live', titleLines: ['VEYRO'],
    tagline: 'Take control, send and swap crypto — one smarter wallet built for simplicity, security and control.',
    meta: [['Industry', 'FinTech • Web3'], ['Platform', 'iOS & Android'], ['Timeline', '8 Weeks'], role], note: receipts,
    story: {
      kicker: broken,
      problem: 'Managing crypto today means dealing with complex interfaces, fragmented apps, and risky swaps — making it difficult for everyday users to hold, send, and control their digital assets with confidence.',
      fix: 'VEYRO brings together asset tracking, instant swaps, card payments, and portfolio management in one clean, secure wallet — giving users full control of their crypto without the complexity.',
    },
    ...img('veyro', 3),
    stats: [['Swaps + cards', 'spend and swap in one wallet'], ['Self-custody', 'your keys, your assets'], handoff],
    next: { slug: 'legion', blurb: 'Blockchain, Web3 gaming and crypto — one network for digital ownership.', color: 'ink' },
  },
  {
    slug: 'legion', kind: 'project', kicker: 'Project 05 · Live', titleLines: ['Legion'],
    tagline: 'Experience blockchain, Web3 gaming and crypto — one powerful network built for the next generation of digital ownership.',
    meta: [['Industry', 'FinTech • Web3'], ['Platform', 'iOS & Android'], ['Timeline', '8 Weeks'], role], note: receipts,
    story: {
      kicker: broken,
      problem: 'Accessing blockchain technology, crypto wallets, and Web3 gaming content requires multiple platforms — making it overwhelming for users to manage assets, explore NFTs, and engage with digital experiences in one place.',
      fix: 'Legion Network unifies crypto management, Web3 gaming, and blockchain technology in one seamless app — giving users full control of their digital assets, NFTs, and Web3 experiences without switching between platforms.',
    },
    ...img('legion', 3),
    stats: [['Crypto + NFTs', 'managed in one place'], ['Web3 gaming', 'built into the same app'], handoff],
    next: { slug: 'pace-wallet', blurb: 'Crypto, stocks and real-world assets in one secure wallet.', color: 'blue' },
  },
  {
    slug: 'pace-wallet', kind: 'project', kicker: 'Project 06 · Concept', titleLines: ['Pace', 'Wallet'],
    tagline: 'Manage crypto, stocks and real-world assets in one secure wallet with a seamless investing experience.',
    meta: [['Industry', 'FinTech • Web3'], ['Platform', 'iOS & Android'], ['Timeline', '8 Weeks'], role], note: receipts,
    story: {
      kicker: broken,
      problem: 'Managing digital wealth today means switching between multiple apps for crypto, stocks, and investments, making portfolio management fragmented, inefficient, and difficult to navigate.',
      fix: 'Manage cryptocurrencies, stocks, and tokenized real-world assets from a single secure wallet, eliminating the need to switch between multiple platforms.',
    },
    ...img('pace-wallet', 3),
    stats: [['3-in-1', 'crypto, stocks & real-world assets'], ['Guided', 'onboarding for first-time investors'], handoff],
    next: { slug: 'pulse-pair', blurb: 'Prediction markets, made chunky — a trading dashboard you read at a glance.', color: 'pink' },
  },
  {
    slug: 'pulse-pair', kind: 'project', kicker: 'Project 07 · Concept', titleLines: ['Pulse', 'Pair'],
    tagline: 'Prediction markets, made chunky — a trading dashboard you can read at a glance and trade in seconds.',
    meta: [['Industry', 'Trading'], ['Platform', 'Web + Mobile'], ['Type', 'Concept'], role], note: receipts,
    story: {
      kicker: 'the idea',
      problem: 'Prediction markets pack odds, volume, charts and order books into dense screens — hard to read at a glance and harder to trade on with confidence.',
      fix: 'Pulse Pair uses chunky, colour-coded market cards, a calm chart + trade view and a short mobile trade sheet, so you can read a market and place a trade in seconds.',
    },
    ...img('pulse-pair', 3),
    stats: [['Chunky cards', 'markets you can read at a glance'], ['Desktop + mobile', 'one trade flow on both'], selfInitiated],
    next: { slug: 'ember', blurb: 'Your SaaS metrics, at a glance — revenue, customers and alerts in one calm app.', color: 'blue' },
  },
  {
    slug: 'ember', kind: 'project', kicker: 'Project 08 · Concept', titleLines: ['Ember'],
    tagline: 'Your SaaS metrics, at a glance — revenue, customers and alerts in one calm mobile app.',
    meta: [['Industry', 'SaaS'], ['Platform', 'iOS & Android'], ['Type', 'Concept'], role], note: receipts,
    story: {
      kicker: 'the idea',
      problem: 'SaaS founders bounce between dashboards to answer simple questions: how is revenue doing, who churned, and what needs my attention today?',
      fix: 'Ember puts revenue, customers and alerts into one calm mobile app with a clear home view, account detail and smart alerts — designed in violet and orange colourways.',
    },
    ...img('ember', 3),
    stats: [['2 colourways', 'violet and orange themes'], ['3 core views', 'revenue, customers & alerts'], selfInitiated],
    next: { slug: 'vion', blurb: 'A blockchain brand built for mass adoption — powerful, fast, for everyone.', color: 'ink' },
  },
  {
    slug: 'vion', kind: 'project', kicker: 'Project 09 · Brand + Web', titleLines: ['VION'],
    tagline: 'Blockchain is broken for people. VION is a brand and website built for mass adoption — powerful, fast, for everyone.',
    meta: [['Industry', 'Web3'], ['Platform', 'Brand + Web'], ['Type', 'Identity + UI'], role], note: receipts,
    story: {
      kicker: broken,
      problem: 'Blockchain still feels built for insiders — complex, slow and intimidating — so everyday people never get past the first screen.',
      fix: 'A confident brand system — deep near-blacks with a single electric signal green — and a website that walks people through landing, learning, joining and contributing in clear steps.',
    },
    ...img('vion', 3),
    stats: [['4 tones', 'near-black palette, one signal green'], ['Brand + web', 'identity, UI and site'], ['Mass adoption', 'designed for everyone']],
    next: { slug: 'zkop', blurb: 'A privacy-first EVM blockchain, made easy to understand.', color: 'mint' },
  },
  {
    slug: 'zkop', kind: 'project', kicker: 'Project 10 · Website', titleLines: ['ZKOP'],
    tagline: 'The privacy-first EVM blockchain — complex zero-knowledge technology, explained in one clear, engaging website.',
    meta: [['Industry', 'Web3'], ['Platform', 'Website'], ['Type', 'Web design'], role], note: receipts,
    story: {
      kicker: broken,
      problem: 'Modern blockchain platforms often force users and developers to compromise between privacy, scalability, and usability. Most networks expose transaction data publicly, creating concerns around data security and user confidentiality.',
      fix: 'We designed a modern, privacy-first blockchain experience that clearly communicates the platform’s value while making complex technology easy to understand. The website highlights key performance metrics, explains the privacy ecosystem through intuitive visual diagrams, and showcases developer benefits with a clean, structured layout.',
    },
    ...img('zkop', 3),
    stats: [['Privacy-first', 'EVM blockchain'], ['Zero-knowledge', 'explained with visual diagrams'], ['Wireframe → UI', 'structured from the first sketch']],
    next: { slug: 'youngs-capital', blurb: 'Pakistan’s first profit-and-loss sharing brokerage.', color: 'yellow' },
  },
  {
    slug: 'crypto-wallet', kind: 'concept', kicker: '11 · Concept · Crypto', titleLines: ['Crypto', 'Wallet'],
    tagline: 'A bold, high-contrast crypto wallet — balances, coins and trades in a few thumb-friendly taps.',
    meta: [['Type', 'Crypto'], ['Platform', 'iOS & Android'], ['Status', 'Concept'], role], note: sideQuest,
    ...img('crypto-wallet', 1),
    next: { slug: 'crypto-swap', blurb: 'A calm swap flow that shows rates, fees and price impact before you commit.', color: 'blue' },
  },
  {
    slug: 'crypto-swap', kind: 'concept', kicker: '12 · Concept · DeFi', titleLines: ['Crypto', 'Swap'],
    tagline: 'A calm swap flow that shows rates, fees and price impact before you commit.',
    meta: [['Type', 'DeFi'], ['Platform', 'Web app'], ['Status', 'Concept'], role], note: sideQuest,
    ...img('crypto-swap', 3),
    next: { slug: 'nft-crypto-app', blurb: 'Browse, collect and track NFT floor prices in a playful, card-first mobile app.', color: 'mint' },
  },
  {
    slug: 'nft-crypto-app', kind: 'concept', kicker: '13 · Concept · NFT', titleLines: ['NFT Crypto', 'App'],
    tagline: 'Browse, collect and track NFT floor prices in a playful, card-first mobile app.',
    meta: [['Type', 'NFT'], ['Platform', 'iOS & Android'], ['Status', 'Concept'], role], note: sideQuest,
    ...img('nft-crypto-app', 2),
    next: { slug: 'trading-dashboard', blurb: 'Wallet, exchange, markets and community in one dense-but-readable trading dashboard.', color: 'yellow' },
  },
  {
    slug: 'trading-dashboard', kind: 'concept', kicker: '14 · Concept · Trading', titleLines: ['Trading', 'Dashboard'],
    tagline: 'Wallet, exchange, markets and community in one dense-but-readable trading dashboard.',
    meta: [['Type', 'Trading'], ['Platform', 'Web app'], ['Status', 'Concept'], role], note: sideQuest,
    ...img('trading-dashboard', 3),
    next: { slug: 'wright-ai', blurb: 'A landing page for an AI content tool — features, pricing and FAQ, wrapped in deep violet.', color: 'ink' },
  },
  {
    slug: 'wright-ai', kind: 'concept', kicker: '15 · Concept · AI', titleLines: ['Wright', 'AI'],
    tagline: 'A landing page for an AI content tool — features, pricing and FAQ, wrapped in deep violet.',
    meta: [['Type', 'AI'], ['Platform', 'Website'], ['Status', 'Concept'], role], note: sideQuest,
    ...img('wright-ai', 3),
    next: { slug: 'crypto-vaults', blurb: 'Create and manage multiple crypto vaults, each with its own address and balance.', color: 'pink' },
  },
  {
    slug: 'crypto-vaults', kind: 'concept', kicker: '16 · Concept · DeFi', titleLines: ['Crypto', 'Vaults'],
    tagline: 'Create and manage multiple crypto vaults, each with its own address and balance.',
    meta: [['Type', 'DeFi'], ['Platform', 'Web app'], ['Status', 'Concept'], role], note: sideQuest,
    ...img('crypto-vaults', 4),
    next: { slug: 'metaverse-social', blurb: 'A social app for the metaverse — profiles, followers, referrals and 3D assets.', color: 'blue' },
  },
  {
    slug: 'metaverse-social', kind: 'concept', kicker: '17 · Concept · Metaverse', titleLines: ['Metaverse', 'Social'],
    tagline: 'A social app for the metaverse — profiles, followers, referrals and 3D assets.',
    meta: [['Type', 'Metaverse'], ['Platform', 'iOS & Android'], ['Status', 'Concept'], role], note: sideQuest,
    ...img('metaverse-social', 3),
    next: { slug: 'crypto-wallet', blurb: 'A bold, high-contrast crypto wallet — balances, coins and trades in a few thumb-friendly taps.', color: 'mint' },
  },
];

export const caseStudies: Record<string, CaseStudy> = Object.fromEntries(list.map((c) => [c.slug, c]));

export const hasCase = (slug: string) => slug in caseStudies;
