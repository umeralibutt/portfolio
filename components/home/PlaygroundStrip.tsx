import type { CSSProperties } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Line, fluid } from '../site/type';
import { Arrow } from '../site/icons';

// Rotation and vertical offset per print, from the Figma track (a loose, wavy row).
const shots = [
  { slug: 'crypto-wallet', name: 'Crypto Wallet', rot: 4, y: 48 },
  { slug: 'trading-dashboard', name: 'Trading Dashboard', rot: -3, y: 0 },
  { slug: 'wright-ai', name: 'Wright AI', rot: -2, y: 20 },
  { slug: 'crypto-swap', name: 'Crypto Swap', rot: 3, y: 58 },
  { slug: 'nft-crypto-app', name: 'NFT Crypto App', rot: -4, y: 0 },
  { slug: 'crypto-vaults', name: 'Crypto Vaults', rot: 2, y: 48 },
  { slug: 'metaverse-social', name: 'Metaverse Social', rot: -3, y: 0 },
];

/**
 * Figma "Playground" 225:24 — 340 × 255 prints in 6px white frames drifting past. Hovering (or focusing)
 * the strip pauses it; the hovered print straightens, lifts and its title turns orange.
 */
export default function PlaygroundStrip() {
  const print = (s: (typeof shots)[number], dup: boolean) => (
    <Link
      key={`${s.slug}${dup ? '-2' : ''}`}
      href={`/work/${s.slug}`}
      data-cursor="Open"
      tabIndex={dup ? -1 : undefined}
      aria-hidden={dup || undefined}
      className="group/print flex w-[clamp(250px,23.6vw,340px)] shrink-0 flex-col gap-3 rotate-[var(--r)] transition-[rotate,translate] duration-500 ease-brand hover:-translate-y-2.5 hover:rotate-0 focus-visible:rotate-0"
      style={{ '--r': `${s.rot}deg`, marginTop: s.y } as CSSProperties}
    >
      <span className="relative block aspect-[340/255] overflow-hidden rounded-[16px] border-[6px] border-white bg-white shadow-[0_20px_44px_rgb(0_0_0/0.16)] transition-shadow duration-500 group-hover/print:shadow-[0_30px_60px_rgb(0_0_0/0.22)]">
        <Image src={`/home/play-${s.slug}.jpg`} alt="" fill sizes="340px" className="object-cover" />
      </span>
      <span className="flex items-center gap-2 leading-none">
        <span className="text-[15px] font-semibold transition-colors duration-300 group-hover/print:text-orange">{s.name}</span>
        <span className="text-[13px] font-medium text-mute">Concept</span>
      </span>
    </Link>
  );

  return (
    <section className="overflow-hidden bg-bone py-20 lg:py-[120px]">
      <div className="flex flex-col gap-8 px-5 sm:flex-row sm:items-end sm:justify-between md:px-12">
        <h2 data-lines className="leading-[0.9]">
          <Line className="flex items-baseline gap-x-3.5 whitespace-nowrap">
            <span className="font-display" style={{ fontSize: fluid(120, 60) }}>PLAY</span>
            <span className="font-serif italic text-orange" style={{ fontSize: fluid(110, 56) }}>ground</span>
          </Line>
        </h2>
        <div className="flex flex-col gap-4 sm:items-end">
          <p className="text-[16px] font-medium leading-[1.4] text-mute sm:text-right lg:text-[18px]">Concepts &amp; side quests.<br /> No clients were harmed.</p>
          <Link href="/work" data-magnetic className="group inline-flex items-center gap-2 self-start rounded-full border-[1.5px] border-ink px-5 py-3 text-[15px] font-semibold leading-none transition-colors duration-300 hover:bg-ink hover:text-bone sm:self-auto">
            Explore all work <Arrow className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>

      <div className="group/strip mt-12 h-[clamp(340px,29.9vw,430px)] lg:mt-16">
        <div className="flex w-max items-start gap-[clamp(28px,3vw,44px)] pr-[clamp(28px,3vw,44px)] pt-5 animate-[marquee-x_70s_linear_infinite] group-hover/strip:[animation-play-state:paused] group-focus-within/strip:[animation-play-state:paused]">
          {shots.map((s) => print(s, false))}
          {shots.map((s) => print(s, true))}
        </div>
      </div>
    </section>
  );
}
