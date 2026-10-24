import Link from 'next/link';
import RotatingWords from './RotatingWords';
import { Arrow, ArrowDown } from '../site/icons';

export default function Hero() {
  return (
    <section data-bg="bone" className="gutter bg-bone pt-[120px] pb-20 lg:pt-[150px] lg:pb-[120px]">
      <ul className="eyebrow flex justify-between gap-4 text-mute">
        <li>Senior Product Designer</li>
        <li className="hidden md:block">Web3 · Fintech · AI</li>
        <li className="hidden lg:block">Islamabad → Everywhere</li>
        <li>Est. 2021</li>
      </ul>

      <h1 data-reveal="hero" className="display mt-8 text-[clamp(56px,17.4vw,250px)] lg:mt-10">
        I design <span className="accent text-[0.6em] leading-none">(almost)</span>
        <br />
        everything.
      </h1>

      <div className="mt-4 lg:mt-2">
        <RotatingWords />
      </div>

      <div className="mt-14 flex flex-col gap-10 lg:mt-[72px] lg:flex-row lg:items-end lg:justify-between">
        <p className="max-w-[520px] text-[clamp(18px,1.55vw,22px)] leading-[1.45]">
          I make products for Web3, fintech &amp; AI teams who are tired of “good enough.” Messy flows in, things people actually enjoy using out.
        </p>
        <div className="flex flex-wrap items-center gap-6">
          <a href="#work" data-magnetic className="group inline-flex items-center gap-4 rounded-full bg-ink py-3 pl-3 pr-7 text-[18px] font-semibold text-bone transition-colors duration-300 hover:bg-ink-2">
            <span className="grid size-10 place-items-center rounded-full bg-orange text-ink transition-transform duration-500 ease-brand group-hover:translate-y-0.5">
              <ArrowDown className="size-4" strokeWidth={2.4} />
            </span>
            See the work
          </a>
          <Link href="/contact" className="group inline-flex items-center gap-1.5 text-[17px] text-mute transition-colors hover:text-ink">
            or just say hi <Arrow className="size-4 transition-transform duration-300 ease-brand group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
