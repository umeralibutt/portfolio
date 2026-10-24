import Image from 'next/image';
import LayersPanel from './LayersPanel';
import { Line, fluid } from '../site/type';
import { ArrowUp } from '../site/icons';

/** Figma "About — Layers of Umar" 216:34 — beige, 140px top/bottom; 150px sides on desktop (Umar's call, Figma has 48). */
export default function AboutTeaser() {
  return (
    <section className="relative bg-beige px-5 py-20 md:px-12 lg:py-[140px] xl:px-[150px]">
      <div className="flex flex-col gap-16 xl:flex-row xl:items-center xl:gap-[72px]">
        <div className="relative flex min-w-0 flex-1 flex-col items-start gap-8">
          <p className="text-[14px] font-semibold uppercase leading-[1.21] tracking-[0.12em] text-orange">About</p>
          <h2 data-lines className="whitespace-nowrap">
            <Line className="font-display leading-[0.88]" style={{ fontSize: fluid(150, 72) }}>HI, I’M</Line>
            <Line className="font-serif italic leading-[0.8] text-orange" style={{ fontSize: fluid(170, 82) }}>Umar.</Line>
          </h2>

          {/* Polaroid: tucked beside the headline (Figma: 386px in, 10px down, +7°). */}
          <figure className="relative w-[200px] rotate-[7deg] sm:absolute sm:left-[clamp(250px,26.8vw,386px)] sm:top-[10px] sm:w-[clamp(170px,15.5vw,224px)] rounded-[6px] bg-white px-3 pb-4 pt-3 [filter:drop-shadow(0_16px_20px_rgb(0_0_0/0.15))] transition-[rotate,translate] duration-700 ease-brand hover:-translate-y-1 hover:rotate-0">
            <div className="relative aspect-[200/230] overflow-hidden rounded-[2px]">
              <Image src="/home/polaroid-umar.png" alt="Umar Ali Butt" fill sizes="200px" className="object-cover" />
            </div>
            <figcaption className="mt-2.5 flex items-center gap-1.5 font-serif text-[clamp(14px,1.25vw,18px)] italic leading-none">that’s me, 2026 <ArrowUp className="size-[1em]" /></figcaption>
          </figure>

          <p className="max-w-[600px] leading-[1.5] tracking-[-0.01em]" style={{ fontSize: fluid(22, 18) }}>
            Self-taught designer from Islamabad. No design degree - just a high-school diploma, a lot of YouTube, and a mildly concerning relationship with Figma.
          </p>
          <p className="max-w-[600px] text-[17px] leading-[1.55] text-mute lg:text-[18px]">
            Since 2021 I’ve gone from UI/UX Designer to Senior Product Designer, shipping for Web3, fintech and AI teams. Now independent - and pickier about pixels than ever.
          </p>
        </div>
        <div className="flex shrink-0 justify-center xl:w-[579px]">
          <LayersPanel />
        </div>
      </div>
    </section>
  );
}
