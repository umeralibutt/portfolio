'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { animate, motion, useMotionValue, useReducedMotion } from 'motion/react';
import { Line, fluid } from '../site/type';
import { Shuffle } from '../site/icons';

// Figma "Canvas — draggable prints" 235:395 (1344 × 1180). Centre point, print width and tilt per print.
const W = 1344;
const H = 1180;
const prints = [
  { slug: 'crypto-wallet', name: 'Crypto Wallet', cx: 269, cy: 291, w: 440, rot: 6 },
  { slug: 'trading-dashboard', name: 'Trading Dashboard', cx: 762, cy: 216, w: 420, rot: -4 },
  { slug: 'wright-ai', name: 'Wright AI', cx: 1111, cy: 316, w: 380, rot: 3 },
  { slug: 'crypto-swap', name: 'Crypto Swap', cx: 334, cy: 676, w: 400, rot: -5 },
  { slug: 'nft-crypto-app', name: 'NFT Crypto App', cx: 790, cy: 668, w: 460, rot: 2 },
  { slug: 'crypto-vaults', name: 'Crypto Vaults', cx: 1165, cy: 693, w: 340, rot: -6 },
  { slug: 'metaverse-social', name: 'Metaverse Social', cx: 535, cy: 1022, w: 380, rot: 5 },
];

const pct = (v: number, of: number) => `${((v / of) * 100).toFixed(3)}%`;

export default function PlaygroundCanvas() {
  const [shuffle, setShuffle] = useState(0);
  const [canDrag, setCanDrag] = useState(false);
  const top = useRef(prints.length);
  const canvas = useRef<HTMLDivElement>(null);

  // Dragging is for mouse/trackpad on wide screens; phones get a plain stack that scrolls.
  useEffect(() => {
    const mq = matchMedia('(min-width: 1024px) and (pointer: fine)');
    const set = () => setCanDrag(mq.matches);
    set();
    mq.addEventListener('change', set);
    return () => mq.removeEventListener('change', set);
  }, []);

  return (
    <>
      <header className="gutter flex flex-col gap-6 pb-10 pt-[124px] lg:flex-row lg:items-end lg:justify-between lg:pt-[193px]">
        <h1 data-lines data-hero>
          <Line driftOut={-1} className="flex flex-wrap items-baseline gap-x-[18px] leading-[0.88] sm:flex-nowrap sm:whitespace-nowrap">
            <span className="font-display" style={{ fontSize: fluid(200, 76) }}>PLAY</span>
            <span className="font-serif italic text-orange" style={{ fontSize: fluid(198, 76) }}>ground</span>
          </Line>
        </h1>
        <div className="flex flex-col items-start gap-4 lg:items-end">
          <p className="text-[18px] font-medium leading-[1.4] text-mute lg:text-right">
            Concepts &amp; side quests.<br />{canDrag ? 'Drag the prints around - nobody’s watching.' : 'Tap a print to open it.'}
          </p>
          {canDrag && (
            <button type="button" onClick={() => setShuffle((s) => s + 1)} data-magnetic className="group inline-flex items-center gap-2.5 rounded-full border-[1.5px] border-ink py-3.5 pl-6 pr-[22px] text-[16px] font-semibold leading-[1.21] transition-colors duration-300 hover:bg-ink hover:text-bone">
              Shuffle the pile <Shuffle className="size-4 transition-transform duration-500 ease-brand group-hover:rotate-180" />
            </button>
          )}
        </div>
      </header>

      <div className="overflow-x-clip pb-20 lg:pb-[120px]">
        <div className="gutter">
          <div
            ref={canvas}
            data-deal
            className="dot-grid-ink relative flex flex-col gap-10 rounded-[32px] bg-beige p-6 sm:p-10 lg:block lg:aspect-[1344/1180] lg:w-[calc(100%+clamp(48px,8.333vw,120px)+24px)] lg:overflow-hidden lg:p-0"
          >
            {prints.map((p, i) => (
              <Print key={p.slug} {...p} index={i} shuffle={shuffle} canDrag={canDrag} bounds={canvas} raise={() => ++top.current} />
            ))}
            <p className="hidden rotate-3 font-serif text-[24px] italic leading-[1.21] text-mute lg:absolute lg:left-[70.1%] lg:top-[91.5%] lg:block">psst — throw one off the edge</p>
          </div>
        </div>
      </div>
    </>
  );
}

function Print({ slug, name, cx, cy, w, rot, index, shuffle, canDrag, bounds, raise }: (typeof prints)[number] & {
  index: number; shuffle: number; canDrag: boolean; bounds: React.RefObject<HTMLDivElement | null>; raise: () => number;
}) {
  const reduced = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotate = useMotionValue(rot);
  const [z, setZ] = useState(index + 1);
  const dragged = useRef(false);

  // Shuffle: every print (including ones thrown off the edge) lands somewhere new.
  useEffect(() => {
    if (!shuffle) return;
    const box = bounds.current?.getBoundingClientRect();
    const sx = box ? box.width * 0.18 : 120;
    const sy = box ? box.height * 0.14 : 100;
    const spring = { type: 'spring', stiffness: 160, damping: 20, delay: index * 0.04 } as const;
    animate(x, (Math.random() - 0.5) * 2 * sx, spring);
    animate(y, (Math.random() - 0.5) * 2 * sy, spring);
    animate(rotate, (Math.random() - 0.5) * 16, spring);
    setZ(Math.ceil(Math.random() * 20));
  }, [shuffle]); // eslint-disable-line react-hooks/exhaustive-deps

  const place = { '--l': pct(cx, W), '--t': pct(cy, H), '--w': pct(w, W) } as CSSProperties;

  return (
    <div className="relative lg:absolute lg:left-[var(--l)] lg:top-[var(--t)] lg:w-[var(--w)] lg:-translate-x-1/2 lg:-translate-y-1/2" style={{ ...place, zIndex: z }}>
      <motion.div
        drag={canDrag && !reduced}
        dragMomentum
        dragTransition={{ power: 0.35, timeConstant: 260 }}
        onDragStart={() => { dragged.current = true; setZ(raise()); }}
        onDragEnd={() => { setTimeout(() => { dragged.current = false; }, 0); }}
        whileDrag={{ scale: 1.05, rotate: 0, boxShadow: '0 25px 30px rgb(0 0 0 / 0.32)' }}
        style={{ x, y, rotate }}
        data-cursor={canDrag ? 'Drag' : undefined}
        className="mx-auto max-w-[460px] cursor-grab touch-pan-y rounded-[8px] bg-white px-2.5 pb-3.5 pt-2.5 shadow-[0_24px_28px_rgb(0_0_0/0.14)] active:cursor-grabbing lg:max-w-none"
      >
        <Link
          href={`/work/${slug}`}
          draggable={false}
          // A drag shouldn't count as a click on the print.
          onClick={(e) => { if (dragged.current) e.preventDefault(); }}
          className="flex flex-col gap-2.5"
        >
          <span className="relative block aspect-[4/3] overflow-hidden rounded-[4px]">
            <Image src={`/case/${slug}/cover.jpg`} alt="" fill priority={index < 2} draggable={false} sizes="(min-width: 1024px) 460px, 90vw" className="pointer-events-none select-none object-cover" />
          </span>
          <span className="font-serif text-[22px] italic leading-[1.21]">{name}</span>
        </Link>
      </motion.div>
    </div>
  );
}
