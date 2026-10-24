import type { CSSProperties } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Arrow } from '../site/icons';

const shots = [
  { slug: 'crypto-wallet', name: 'Crypto Wallet', rot: -4 },
  { slug: 'trading-dashboard', name: 'Trading Dashboard', rot: 2.5 },
  { slug: 'wright-ai', name: 'Wright AI', rot: -1.5 },
  { slug: 'crypto-swap', name: 'Crypto Swap', rot: 3.5 },
  { slug: 'nft-crypto-app', name: 'NFT Crypto App', rot: -3 },
  { slug: 'crypto-vaults', name: 'Crypto Vaults', rot: 2 },
  { slug: 'metaverse-social', name: 'Metaverse Social', rot: -2.5 },
];

/** Tilted prints drifting past. Hovering (or focusing) the strip pauses it; the hovered print straightens and lifts. */
export default function PlaygroundStrip() {
  const print = (s: (typeof shots)[number], dup: boolean) => (
    <Link
      key={`${s.slug}${dup ? '-2' : ''}`}
      href={`/work/${s.slug}`}
      data-cursor="Open"
      tabIndex={dup ? -1 : undefined}
      aria-hidden={dup || undefined}
      className="group/print mx-[clamp(14px,1.6vw,24px)] block w-[clamp(240px,25vw,360px)] shrink-0 rotate-[var(--r)] py-6 transition-[rotate] duration-500 ease-brand hover:rotate-0 focus-visible:rotate-0"
      style={{ '--r': `${s.rot}deg` } as CSSProperties}
    >
      <span className="block rounded-xl bg-white p-2.5 shadow-[0_18px_40px_-14px_rgb(14_13_12/0.35)] transition-[rotate,translate,box-shadow] duration-500 ease-brand group-hover/print:-translate-y-2 group-hover/print:shadow-[0_30px_60px_-18px_rgb(14_13_12/0.4)]">
        <span className="relative block aspect-[357/278] overflow-hidden rounded-md">
          <Image src={`/work/${s.slug}.jpg`} alt="" fill sizes="360px" className="object-cover" />
        </span>
      </span>
      <span className="mt-4 flex items-baseline gap-2 text-[18px]">
        <span className="font-semibold transition-colors group-hover/print:text-orange">{s.name}</span>
        <span className="text-[15px] text-mute">Concept</span>
      </span>
    </Link>
  );

  return (
    <section data-bg="bone" className="section-pad overflow-hidden bg-bone">
      <div className="gutter flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
        <h2 data-reveal className="display text-[clamp(64px,7.5vw,108px)]">Play<span className="accent text-[0.92em]">ground</span></h2>
        <div className="flex flex-col gap-5 sm:items-end">
          <p className="max-w-[220px] text-[18px] leading-snug text-mute sm:text-right">Concepts &amp; side quests. No clients were harmed.</p>
          <Link href="/work" data-magnetic className="group inline-flex items-center gap-2 self-start rounded-full border-[1.5px] border-ink px-6 py-3 text-[16px] font-semibold transition-colors duration-300 hover:bg-ink hover:text-bone sm:self-auto">
            Explore all work <Arrow className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>

      <div className="group/strip mt-12 lg:mt-16">
        <div className="flex w-max animate-[marquee-x_60s_linear_infinite] group-hover/strip:[animation-play-state:paused] group-focus-within/strip:[animation-play-state:paused]">
          {shots.map((s) => print(s, false))}
          {shots.map((s) => print(s, true))}
        </div>
      </div>
    </section>
  );
}
