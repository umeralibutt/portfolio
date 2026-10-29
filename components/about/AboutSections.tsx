import type { ReactNode } from 'react';
import { Line, fluid } from '../site/type';
import { Arrow, ArrowUpRight } from '../site/icons';
import Container from '../site/Container';

/** Big two-part section title ("THE PLOT so far") with the grey aside on the right. */
export function SectionHead({ bold, italic, aside, className = '' }: { bold: string; italic: string; aside: ReactNode; className?: string }) {
  return (
    <div className={`flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between ${className}`}>
      <h2 data-lines>
        <Line drift={1} className="flex items-baseline gap-x-[18px] whitespace-nowrap leading-[0.88]">
          <span className="font-display" style={{ fontSize: fluid(120, 64) }}>{bold}</span>
          <span className="font-serif italic text-orange" style={{ fontSize: fluid(108, 58) }}>{italic}</span>
        </Line>
      </h2>
      <p className="text-[18px] font-medium leading-[1.4] text-mute sm:text-right">{aside}</p>
    </div>
  );
}

const plot = [
  { when: '2021', title: 'Taught myself design. Got hired as a UI/UX Designer.', sub: 'Learned more in month one than in every tutorial combined.' },
  { when: 'NEXT', title: 'Promoted to Product Designer.', sub: 'Started owning flows end to end - research to handoff.' },
  { when: 'NOW', title: 'Senior Product Designer.', sub: 'Web3, fintech & AI products, design systems and a lot of dashboards. Pickier about pixels than ever.' },
];

/** Figma "The plot so far" 235:90 — each rule draws across as you scroll. */
export function Plot() {
  return (
    <section className="bg-beige py-20 lg:py-[120px]">
      <Container>
        <SectionHead bold="THE PLOT" italic="so far" aside={<>Abridged. The director’s cut<br />has way more Figma files.</>} className="pb-12 lg:pb-16" />
        <ol>
          {plot.map((p, i) => {
            const now = i === plot.length - 1;
            return (
              <li key={p.when} data-slide-in={i % 2 ? 'right' : 'left'} className={`relative flex flex-col gap-3 py-9 md:flex-row md:items-center md:gap-12 ${now ? 'border-b border-ink/15' : ''}`}>
                <span aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-ink/15" />
                <span aria-hidden="true" data-draw-line className="absolute inset-x-0 top-0 h-px origin-left bg-ink/40" />
                <p className={`font-display leading-none md:w-[240px] md:shrink-0 ${now ? 'text-orange' : ''}`} style={{ fontSize: fluid(72, 48) }}>{p.when}</p>
                <div className="flex min-w-0 flex-1 flex-col gap-2">
                  <p className="font-semibold leading-[1.21] tracking-[-0.02em]" style={{ fontSize: fluid(28, 21) }}>{p.title}</p>
                  <p className="text-[18px] leading-[1.4] text-mute">{p.sub}</p>
                </div>
                <span aria-hidden="true" className={`hidden size-4 shrink-0 rounded-full md:block ${now ? 'bg-orange' : 'bg-ink/20'}`} />
              </li>
            );
          })}
        </ol>
      </Container>
    </section>
  );
}

const skills = [
  { name: 'PRODUCT DESIGN', sub: 'Apps and platforms, from the first flow to the last edge case.' },
  { name: 'DASHBOARDS', sub: 'Data-heavy UI that still feels calm.' },
  { name: 'DESIGN SYSTEMS', sub: 'Tokens, components and docs your devs won’t hate.' },
  { name: 'PROTOTYPES', sub: 'Interactive enough to test, real enough to sell.' },
  { name: 'BRANDS', sub: 'Identity that holds up from favicon to billboard.' },
];

/** Figma "What I’m good at" 235:120 — hovering a row sweeps it orange left → right. */
export function GoodAt() {
  return (
    <section className="container-site py-20 lg:py-[120px]">
      <SectionHead bold="GOOD" italic="at" aside={<>Things people actually<br />pay me for.</>} className="pb-12 lg:pb-14" />
      <ul>
        {skills.map((s, i) => (
          <li
            key={s.name}
            tabIndex={0}
            data-slide-in={i % 2 ? 'right' : 'left'}
            className={`group relative flex flex-col gap-3 overflow-hidden border-t border-ink/15 py-[26px] outline-none transition-[padding] duration-500 ease-brand hover:px-7 focus-visible:px-7 md:flex-row md:items-center md:justify-between ${i === skills.length - 1 ? 'border-b' : ''}`}
          >
            <span aria-hidden="true" className="absolute inset-0 origin-left scale-x-0 bg-orange transition-transform duration-500 ease-brand group-hover:scale-x-100 group-focus-visible:scale-x-100" />
            <span className="relative flex items-center gap-7">
              <span className="text-[14px] font-semibold leading-[1.21] text-orange-deep transition-colors duration-300 group-hover:text-ink group-focus-visible:text-ink">{String(i + 1).padStart(2, '0')}</span>
              <span className="font-display leading-none" style={{ fontSize: fluid(72, 40) }}>{s.name}</span>
            </span>
            <span className="relative flex items-center gap-6">
              <span className="text-[17px] font-medium leading-[1.21] text-mute transition-colors duration-300 group-hover:text-ink group-focus-visible:text-ink md:w-[380px]">{s.sub}</span>
              <span className="relative hidden size-7 shrink-0 md:block">
                <ArrowUpRight className="absolute inset-0 size-full transition-opacity duration-300 group-hover:opacity-0 group-focus-visible:opacity-0" strokeWidth={1.8} />
                <Arrow className="absolute inset-0 size-full opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100" strokeWidth={1.8} />
              </span>
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
