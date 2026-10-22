export const site = {
  name: 'Umar Ali Butt',
  email: 'ub1894497@gmail.com',
  location: 'Islamabad, PK',
  links: {
    dribbble: 'https://dribbble.com/umar__ali__butt',
    linkedin: 'https://www.linkedin.com/in/umar-ali-butt-7213a7224/',
    upwork: 'https://www.upwork.com/freelancers/~01fbaab0f0eb29dd61',
  },
  formspreeId: process.env.NEXT_PUBLIC_FORMSPREE_ID || '',
};

export type Project = {
  slug: string;
  name: string;
  img: string;
  meta: string;
  desc: string;
  platform?: string;
  timeline?: string;
  caseStudy?: boolean;
  folder?: { label: string; tagline: string; stats: [string, string]; color: 'ink' | 'blue' | 'mint' | 'yellow' };
};

export const projects: Project[] = [
  {
    slug: 'youngs-capital', name: 'Youngs Capital', img: '/work/youngs-capital.jpg', meta: 'Fintech · Live',
    desc: 'Invest, trade and grow in Pakistan’s stock market — one profit-sharing brokerage built for every investor.',
    platform: 'iOS & Android', timeline: '8 Weeks', caseStudy: true,
    folder: { label: 'Fintech · iOS + Android', tagline: 'Pakistan’s first profit-and-loss sharing brokerage — invest, trade and grow on the PSX.', stats: ['Top-10 broker', '4.8★ App Store'], color: 'ink' },
  },
  {
    slug: 'prime-traders', name: 'Prime Traders', img: '/work/prime-traders.jpg', meta: 'Fintech · Web3',
    desc: 'Buy, sell and trade cryptocurrency — one secure platform built for simplicity, speed and serious traders.',
    platform: 'Web & Mobile', timeline: '8 Weeks',
    folder: { label: 'Crypto · Web + Mobile', tagline: 'Buy, sell and trade 350+ cryptocurrencies in one fast, secure platform built for serious traders.', stats: ['350+ coins', 'Pro trading'], color: 'blue' },
  },
  {
    slug: 'traqstock', name: 'Traqstock', img: '/work/traqstock.jpg', meta: 'Fintech · Market intel',
    desc: 'Verified market data, transparent trading activity and trusted investor discussions — in one platform.',
    platform: 'Web Platform', timeline: '8 Weeks',
    folder: { label: 'Market intel · Web', tagline: 'Verified market data, transparent trading activity and trusted investor discussions — in one place.', stats: ['Verified data', 'Web platform'], color: 'mint' },
  },
  {
    slug: 'veyro', name: 'VEYRO', img: '/work/veyro.jpg', meta: 'Fintech · Web3',
    desc: 'Take control, send and swap crypto — one smarter wallet built for simplicity, security and control.',
    platform: 'iOS & Android', timeline: '8 Weeks',
    folder: { label: 'Crypto wallet · iOS + Android', tagline: 'A smarter crypto wallet — track, send, swap and pay, with full control and none of the complexity.', stats: ['Swaps + cards', 'Self-custody'], color: 'yellow' },
  },
  { slug: 'legion', name: 'Legion', img: '/work/legion.jpg', meta: 'Fintech · Web3', desc: 'Blockchain, Web3 gaming and crypto — one powerful network built for the next generation of digital ownership.', platform: 'iOS & Android', timeline: '8 Weeks' },
  { slug: 'pace-wallet', name: 'Pace Wallet', img: '/work/pace-wallet.jpg', meta: 'Fintech · Concept', desc: 'Manage crypto, stocks and real-world assets in one secure wallet with a seamless investing experience.', platform: 'iOS & Android', timeline: '8 Weeks' },
  { slug: 'pulse-pair', name: 'Pulse Pair', img: '/work/pulse-pair.jpg', meta: 'Trading · Concept', desc: 'Prediction markets, made chunky — a trading dashboard you read at a glance.', platform: 'Web' },
  { slug: 'ember', name: 'Ember', img: '/work/ember.jpg', meta: 'SaaS · Concept', desc: 'Your SaaS metrics, at a glance — revenue, customers and alerts in one calm mobile app.', platform: 'iOS & Android' },
  { slug: 'vion', name: 'VION', img: '/work/vion.jpg', meta: 'Web3 · Brand + Web', desc: 'Blockchain is broken for people — a brand and site built for mass adoption: powerful, fast, for everyone.', platform: 'Brand + Web' },
  { slug: 'zkop', name: 'ZKOP', img: '/work/zkop.jpg', meta: 'Web3 · Website', desc: 'A privacy-first EVM blockchain, made easy to understand — complex zero-knowledge tech, explained in one clear site.', platform: 'Website' },
];

export const concepts: Project[] = [
  { slug: 'crypto-wallet', name: 'Crypto Wallet', img: '/work/crypto-wallet.jpg', meta: 'Crypto · Mobile', desc: 'A bold, high-contrast crypto wallet — balances, coins and trades in a few thumb-friendly taps.', platform: 'iOS & Android' },
  { slug: 'crypto-swap', name: 'Crypto Swap', img: '/work/crypto-swap.jpg', meta: 'DeFi · Web', desc: 'A calm swap flow that shows rates, fees and price impact before you commit.', platform: 'Web app' },
  { slug: 'nft-crypto-app', name: 'NFT Crypto App', img: '/work/nft-crypto-app.jpg', meta: 'NFT · Mobile', desc: 'Browse, collect and track NFT floor prices in a playful, card-first mobile app.', platform: 'iOS & Android' },
  { slug: 'trading-dashboard', name: 'Trading Dashboard', img: '/work/trading-dashboard.jpg', meta: 'Trading · Web', desc: 'Wallet, exchange, markets and community in one dense-but-readable trading dashboard.', platform: 'Web app' },
  { slug: 'wright-ai', name: 'Wright AI', img: '/work/wright-ai.jpg', meta: 'AI · Landing page', desc: 'A landing page for an AI content tool — features, pricing and FAQ, wrapped in deep violet.', platform: 'Website' },
  { slug: 'crypto-vaults', name: 'Crypto Vaults', img: '/work/crypto-vaults.jpg', meta: 'DeFi · Web', desc: 'Create and manage multiple crypto vaults, each with its own address and balance.', platform: 'Web app' },
  { slug: 'metaverse-social', name: 'Metaverse Social', img: '/work/metaverse-social.jpg', meta: 'Metaverse · Mobile', desc: 'A social app for the metaverse — profiles, followers, referrals and 3D assets.', platform: 'iOS & Android' },
];

export const playShots = [
  { src: '/play/markets-home.jpg', cap: 'markets home' },
  { src: '/play/portfolio.jpg', cap: 'portfolio' },
  { src: '/play/mobile-trade.jpg', cap: 'mobile trade flow' },
  { src: '/play/chart-trade.jpg', cap: 'chart + trade' },
  { src: '/play/market-cards.jpg', cap: 'market cards' },
  { src: '/work/pulse-pair.jpg', cap: 'pulse cover' },
];

export type Tag = 'Fintech' | 'Web3' | 'Trading' | 'AI' | 'Concepts';

/** Filter tags for the Work page, keyed by project/concept slug. */
export const workTags: Record<string, Tag[]> = {
  'youngs-capital': ['Fintech', 'Trading'],
  'prime-traders': ['Fintech', 'Web3', 'Trading'],
  traqstock: ['Fintech', 'Trading'],
  veyro: ['Fintech', 'Web3'],
  legion: ['Fintech', 'Web3'],
  'pace-wallet': ['Fintech', 'Web3', 'Concepts'],
  'pulse-pair': ['Trading', 'Concepts'],
  ember: ['Concepts'],
  vion: ['Web3'],
  zkop: ['Web3'],
  'crypto-wallet': ['Web3', 'Concepts'],
  'crypto-swap': ['Web3', 'Concepts'],
  'nft-crypto-app': ['Web3', 'Concepts'],
  'trading-dashboard': ['Trading', 'Concepts'],
  'wright-ai': ['AI', 'Concepts'],
  'crypto-vaults': ['Web3', 'Concepts'],
  'metaverse-social': ['Web3', 'Concepts'],
};
