import { site } from '@/lib/data';
import RotatingWords from './RotatingWords';
import { Line, fluid } from '../site/type';
import { Arrow, ArrowDown } from '../site/icons';

/** Figma "Hero" 221:24: sits under the 97px nav; 72px top and bottom padding, 120px sides. */
export default function Hero() {
  return (
    <section className="bg-bone container-site pb-20 pt-[116px] lg:pb-[72px] lg:pt-[169px]">
      <ul className="flex justify-between gap-4 pb-8 text-[11px] font-medium uppercase leading-none tracking-[0.12em] text-mute md:text-[12px] lg:pb-10">
        <li>Senior Product Designer</li>
        <li className="hidden md:block">Web3 · Fintech · AI</li>
        <li className="hidden lg:block">Islamabad → Everywhere</li>
        <li>Est. 2021</li>
      </ul>

      <h1 data-lines data-hero className="whitespace-nowrap leading-[0.88]">
        <Line driftOut={-1} className="flex flex-wrap items-baseline gap-x-[0.14em]" style={{ fontSize: fluid(200, 60) }}>
          <span className="font-display tracking-[-0.01em]">I DESIGN</span>
          <span className="font-serif italic tracking-[-0.02em] text-orange" style={{ fontSize: '0.68em' }}>(almost)</span>
        </Line>
        <Line driftOut={1} className="font-display tracking-[-0.01em]" style={{ fontSize: fluid(200, 60) }}>EVERYTHING.</Line>
      </h1>

      <div className="pb-12 pt-6 lg:pb-[72px] lg:pt-9">
        <RotatingWords />
      </div>

      <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
        <p className="max-w-[520px] leading-[1.45] tracking-[-0.01em]" style={{ fontSize: fluid(22, 18) }}>
          I make products for Web3, fintech &amp; AI teams who are tired of “good enough.” Messy flows in, things people actually enjoy using out.
        </p>
        <div className="flex flex-wrap items-center gap-5">
          <a href="#work" data-magnetic className="group inline-flex items-center gap-3.5 rounded-full bg-ink py-2.5 pl-2.5 pr-[26px] text-[17px] font-semibold leading-none text-bone transition-colors duration-300 hover:bg-ink-2">
            <span className="grid size-11 place-items-center rounded-full bg-orange text-ink transition-transform duration-500 ease-brand group-hover:translate-y-0.5">
              <ArrowDown className="size-[18px]" strokeWidth={2.2} />
            </span>
            See the work
          </a>
          <a href={site.cv} download="Umar_Ali_Butt_CV.pdf" className="group inline-flex items-center gap-1.5 text-[17px] font-medium leading-none text-ink/70 transition-colors hover:text-ink">
            Hiring? Grab my CV <Arrow className="size-4 transition-transform duration-300 ease-brand group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
}
