import Image from 'next/image';
import LayersPanel from './LayersPanel';
import { ArrowUp } from '../site/icons';

export default function AboutTeaser() {
  return (
    <section data-bg="beige" className="gutter section-pad bg-beige">
      <div className="grid items-start gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,579px)] lg:gap-10">
        <div className="relative">
          <p className="eyebrow text-orange">About</p>
          <h2 data-reveal className="display mt-6 text-[clamp(84px,9.2vw,132px)]">
            Hi, I’m<br /><span className="accent text-[1.03em] leading-[0.95]">Umar.</span>
          </h2>

          {/* Polaroid sits beside the headline on desktop, below it on small screens. */}
          <figure className="mt-10 w-[220px] rotate-[4deg] rounded-md bg-white p-3 pb-2 shadow-[0_20px_40px_-12px_rgb(14_13_12/0.3)] transition-transform duration-700 ease-brand hover:rotate-0 hover:-translate-y-1 sm:absolute sm:left-[clamp(300px,30vw,430px)] sm:top-[-10px] sm:mt-0 sm:w-[258px]">
            <div className="relative aspect-[227/253] overflow-hidden rounded-sm">
              <Image src="/me.jpg" alt="Umar Ali Butt" fill sizes="258px" className="object-cover" />
            </div>
            <figcaption className="flex items-center gap-1.5 px-1 pt-3 font-serif text-[22px] italic">that’s me, 2026 <ArrowUp className="size-4" /></figcaption>
          </figure>

          <p className="mt-12 max-w-[600px] text-[clamp(18px,1.55vw,22px)] leading-[1.5] sm:mt-14">
            Self-taught designer from Islamabad. No design degree - just a high-school diploma, a lot of YouTube, and a mildly concerning relationship with Figma.
          </p>
          <p className="mt-7 max-w-[600px] text-[18px] leading-[1.55] text-mute">
            Since 2021 I’ve gone from UI/UX Designer to Senior Product Designer, shipping for Web3, fintech and AI teams. Now independent - and pickier about pixels than ever.
          </p>
        </div>
        <div className="lg:pt-40">
          <LayersPanel />
        </div>
      </div>
    </section>
  );
}
