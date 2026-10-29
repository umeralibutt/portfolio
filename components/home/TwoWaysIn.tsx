import Link from 'next/link';
import type { ReactNode } from 'react';
import { site } from '@/lib/data';
import Container from '../site/Container';
import { Line, fluid } from '../site/type';
import { Arrow, ArrowUpRight, Calendar, Download } from '../site/icons';

const callHref = site.cal || '/contact';

/** A pill button; external links (the CV, the call link) are plain anchors. */
function Btn({ href, children, solid, download }: { href: string; children: ReactNode; solid: string; download?: boolean }) {
  const cls = `group/btn inline-flex items-center gap-2.5 rounded-full py-[15px] pl-6 pr-[22px] text-[16px] font-semibold leading-[1.21] transition-colors duration-300 ${solid}`;
  const external = download || href.startsWith('http');
  return external ? (
    <a href={href} data-magnetic className={cls} {...(download ? { download: 'Umar_Ali_Butt_CV.pdf' } : { target: '_blank', rel: 'noreferrer' })}>{children}</a>
  ) : (
    <Link href={href} data-magnetic className={cls}>{children}</Link>
  );
}

/** Figma "Two ways in" 281:24: two equal doors. The card lifts and its arrow turns 45° on hover. */
export default function TwoWaysIn() {
  const door = 'group flex min-h-[440px] flex-col justify-between gap-12 rounded-[32px] p-8 transition-[translate,box-shadow] duration-500 ease-brand hover:-translate-y-2 hover:shadow-[0_30px_60px_rgb(0_0_0/0.18)] sm:p-11 lg:h-[520px]';
  const arrow = 'grid size-14 shrink-0 place-items-center rounded-full border-[1.5px] transition-transform duration-500 ease-brand group-hover:rotate-45';

  return (
    <section className="border-y border-ink/10 bg-beige py-20 lg:py-[140px]">
      <Container className="flex flex-col gap-12 lg:gap-14">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <h2 data-lines>
            <Line drift={-1} className="flex items-baseline gap-x-[18px] whitespace-nowrap leading-[0.88]">
              <span className="font-display" style={{ fontSize: fluid(130, 68) }}>TWO WAYS</span>
              <span className="font-serif italic text-orange" style={{ fontSize: fluid(120, 62) }}>in</span>
            </Line>
          </h2>
          <p className="text-[18px] font-medium leading-[1.4] text-mute sm:text-right">Pick your door.<br />Both lead to me.</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <article className={`${door} bg-ink text-bone`}>
            <div className="flex flex-col gap-[22px]">
              <div className="flex items-center justify-between gap-4">
                <p className="text-[13px] font-semibold leading-[1.21] tracking-[0.12em] text-orange">01 - FOR CLIENTS</p>
                <span className={`${arrow} border-bone/30`}><ArrowUpRight className="size-[22px]" /></span>
              </div>
              <h3 className="font-display leading-[0.92]" style={{ fontSize: fluid(72, 48) }}>BUILDING<br />SOMETHING?</h3>
              <p className="max-w-[440px] text-[18px] leading-[1.5] text-bone/70">Tell me what you’re building. I’ll tell you what’s broken - nicely - and how to fix it.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Btn href="/contact" solid="bg-orange text-ink hover:bg-bone">Start a project <Arrow className="size-4 transition-transform duration-300 group-hover/btn:translate-x-0.5" /></Btn>
              <Btn href={callHref} solid="border-[1.5px] border-bone/45 text-bone hover:border-bone">Book a 20-min call <Calendar className="size-4" /></Btn>
            </div>
          </article>

          <article className={`${door} bg-orange text-ink`}>
            <div className="flex flex-col gap-[22px]">
              <div className="flex items-center justify-between gap-4">
                <p className="text-[13px] font-semibold leading-[1.21] tracking-[0.12em]">02 - FOR RECRUITERS</p>
                <span className={`${arrow} border-ink/30`}><ArrowUpRight className="size-[22px]" /></span>
              </div>
              <h3 className="font-display leading-[0.92]" style={{ fontSize: fluid(72, 48) }}>HIRING A SENIOR<br />DESIGNER?</h3>
              <p className="max-w-[440px] text-[18px] leading-[1.5] text-ink/80">Five years across fintech, Web3 &amp; AI. CV’s ready, references on request, notice period negotiable.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Btn href={site.cv} download solid="bg-ink text-bone hover:bg-ink-2">Grab my CV <Download className="size-4 transition-transform duration-300 group-hover/btn:translate-y-0.5" /></Btn>
              <Btn href={callHref} solid="border-[1.5px] border-ink/45 text-ink hover:border-ink">Book a 20-min call <Calendar className="size-4" /></Btn>
            </div>
          </article>
        </div>
      </Container>
    </section>
  );
}
