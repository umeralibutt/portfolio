import { Alert } from '../site/icons';

const crimes = [
  ['Lorem ipsum in production', 'Penalty: rewrite the copy'],
  ['47 shades of almost-black', 'Penalty: build the colour styles'],
  ['Buttons that say “Submit”', 'Penalty: name them like a human'],
  ['Spacing based on vibes', 'Penalty: 8pt grid, forever'],
  ['“Make it pop” with no why', 'Penalty: define “pop” in writing'],
  ['Centered paragraphs', 'Penalty: left-align and reflect'],
];

/** Hover (or focus) a row: a strike sweeps through it left → right and a BUSTED stamp springs in. */
export default function DesignCrimes() {
  return (
    <section data-bg="orange" className="gutter section-pad bg-orange text-ink">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <h2 data-reveal className="display text-[clamp(64px,9.2vw,132px)]">
          Design crimes<br /><span className="font-serif text-[0.82em] italic normal-case tracking-[-0.02em]">I won’t commit.</span>
        </h2>
        <p className="text-[17px] font-semibold leading-snug lg:text-right">Design lint report:<br />6 warnings, 0 excuses.</p>
      </div>

      <ol className="mt-12 border-b border-ink/25 lg:mt-14">
        {crimes.map(([crime, penalty], i) => (
          <li key={crime} tabIndex={0} className="group relative flex flex-col gap-2 border-t border-ink/25 py-5 outline-none focus-visible:bg-ink/5 md:flex-row md:items-center md:gap-6 md:py-[18px]">
            <span className="flex w-14 shrink-0 items-center gap-1.5 text-[13px] font-semibold"><Alert className="size-4" />0{i + 1}</span>
            <span className="relative inline-block self-start">
              <span className="display block text-[clamp(32px,4.2vw,60px)] leading-none">{crime}</span>
              {/* The strike. */}
              <span aria-hidden="true" className="absolute left-0 right-0 top-1/2 h-[clamp(3px,0.3vw,4px)] origin-left scale-x-0 bg-ink transition-transform duration-500 ease-brand group-hover:scale-x-100 group-focus-visible:scale-x-100" />
              {/* The stamp: a joke, so it's allowed to bounce. */}
              <span
                aria-hidden="true"
                className="display absolute left-[calc(100%+clamp(16px,3vw,48px))] top-1/2 hidden -translate-y-1/2 scale-150 rotate-[14deg] rounded-xl border-[3px] border-ink px-4 py-1.5 text-[clamp(28px,3.3vw,48px)] leading-none opacity-0 transition-[opacity,scale,rotate] duration-300 ease-[cubic-bezier(0.34,1.8,0.64,1)] group-hover:scale-100 group-hover:rotate-[8deg] group-hover:opacity-100 group-focus-visible:scale-100 group-focus-visible:rotate-[8deg] group-focus-visible:opacity-100 sm:block"
              >
                Busted
              </span>
            </span>
            <span className="text-[15px] md:ml-auto md:text-right">{penalty}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}
