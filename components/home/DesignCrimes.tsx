/* eslint-disable @next/next/no-img-element */
import { Line, fluid } from '../site/type';

const crimes = [
  ['Lorem ipsum in production', 'Penalty: rewrite the copy'],
  ['47 shades of almost-black', 'Penalty: build the colour styles'],
  ['Buttons that say “Submit”', 'Penalty: name them like a human'],
  ['Spacing based on vibes', 'Penalty: 8pt grid, forever'],
  ['“Make it pop” with no why', 'Penalty: define “pop” in writing'],
  ['Centered paragraphs', 'Penalty: left-align and reflect'],
];

/**
 * Figma "Design crimes I won’t commit" 216:117 — orange, 140 / 48 padding. Hover (or focus) a row:
 * a strike sweeps through it left → right and a BUSTED stamp springs in beside it.
 */
export default function DesignCrimes() {
  return (
    <section className="bg-orange gutter py-20 text-ink lg:py-[140px]">
      <div className="flex flex-col gap-6 pb-10 lg:flex-row lg:items-end lg:justify-between lg:pb-14">
        <h2 data-lines className="whitespace-nowrap">
          <Line className="font-display leading-[0.88]" style={{ fontSize: fluid(150, 62) }}>DESIGN CRIMES</Line>
          <Line className="font-serif italic leading-[0.9]" style={{ fontSize: fluid(120, 50) }}>I won’t commit.</Line>
        </h2>
        <p className="text-[16px] font-semibold leading-[1.4] lg:text-right lg:text-[17px]">Design lint report:<br /> 6 warnings, 0 excuses.</p>
      </div>

      <ol className="border-b border-ink/25">
        {crimes.map(([crime, penalty], i) => (
          <li key={crime} tabIndex={0} className="group flex flex-col gap-2 border-t border-ink/25 py-[22px] outline-none focus-visible:bg-ink/5 md:flex-row md:items-center">
            <span className="flex shrink-0 items-center gap-[5px] text-[14px] font-semibold leading-none">
              <img src="/home/alert.svg" alt="" width={18} height={18} />
              <span className="w-10">0{i + 1}</span>
            </span>
            <span className="min-w-0 flex-1">
              <span className="relative inline-block">
                <span className="block font-display uppercase leading-none" style={{ fontSize: fluid(60, 30) }}>{crime}</span>
                {/* The strike. */}
                <span aria-hidden="true" className="absolute inset-x-0 top-[52%] h-[0.075em] origin-left scale-x-0 bg-ink transition-transform duration-500 ease-brand group-hover:scale-x-100 group-focus-visible:scale-x-100" style={{ fontSize: fluid(60, 30) }} />
                {/* The stamp — a joke, so it's allowed to bounce. */}
                <span
                  aria-hidden="true"
                  className="absolute left-[calc(100%+clamp(24px,3.8vw,56px))] top-1/2 hidden -translate-y-1/2 scale-[1.6] rounded-[8px] border-[3px] border-ink px-[22px] py-2.5 font-display text-[44px] leading-none tracking-[0.04em] opacity-0 transition-[opacity,scale,rotate] duration-300 ease-[cubic-bezier(0.34,1.8,0.64,1)] rotate-[18deg] group-hover:scale-100 group-hover:rotate-[10deg] group-hover:opacity-100 group-focus-visible:scale-100 group-focus-visible:rotate-[10deg] group-focus-visible:opacity-100 xl:block"
                >
                  BUSTED
                </span>
              </span>
            </span>
            <span className="shrink-0 text-[15px] font-medium text-ink/75 md:text-[16px]">{penalty}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}
