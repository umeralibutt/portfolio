import Link from 'next/link';
import type { CSSProperties, ReactNode } from 'react';
import { Icon } from './icons';

type Css = CSSProperties & Record<`--${string}`, string | number>;

export function Tape({ color = 'var(--tape1)', rot = 0, style }: { color?: string; rot?: number; style?: CSSProperties }) {
  return <span className="tape" style={{ '--tape': color, transform: `rotate(${rot}deg)`, ...style } as Css} aria-hidden="true" />;
}

export function Sticky({ children, color = 'var(--yellow)', rot = 0, hand, className = '', style }: {
  children: ReactNode; color?: string; rot?: number; hand?: boolean; className?: string; style?: CSSProperties;
}) {
  return (
    <span className={`sticky${hand ? ' hand' : ''} ${className}`} style={{ background: color, '--rot': `${rot}deg`, ...style } as Css}>
      {children}
    </span>
  );
}

export function Polaroid({ src, alt, caption, rot = 0, className = '', children }: {
  src?: string; alt?: string; caption: string; rot?: number; className?: string; children?: ReactNode;
}) {
  return (
    <figure className={`polaroid ${className}`} style={{ '--rot': `${rot}deg` } as Css}>
      <Tape rot={-28} color="var(--tape1)" style={{ left: -26, top: 6 }} />
      <Tape rot={28} color="var(--tape2)" style={{ right: -26, top: 6 }} />
      {src ? <img src={src} alt={alt ?? caption} /> : children}
      <figcaption>{caption}</figcaption>
    </figure>
  );
}

export function Btn({ href, children }: { href: string; children: ReactNode }) {
  const inner = (
    <>
      <span className="btn-sq"><Icon name="arrow" size={14} stroke="#fff" /></span>
      {children}
      <Icon name="arrow" size={11} />
    </>
  );
  return href.startsWith('/') ? <Link href={href} className="btn">{inner}</Link> : <a href={href} className="btn">{inner}</a>;
}

/** Hand-drawn arrow; `d` is the shaft, the head is drawn at the end point pointing along `head` (deg). */
export function HandArrow({ d, end, head, w, h, style }: { d: string; end: [number, number]; head: number; w: number; h: number; style?: CSSProperties }) {
  const [x, y] = end;
  return (
    <svg className="hand-arrow" width={w} height={h} viewBox={`0 0 ${w} ${h}`} fill="none" stroke="var(--ink)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={style} aria-hidden="true">
      <path d={d} pathLength={1} data-draw="" />
      <path d={`M${x - 8} ${y - 5} L${x} ${y} L${x - 8} ${y + 5}`} transform={`rotate(${head} ${x} ${y})`} pathLength={1} data-draw="head" />
    </svg>
  );
}
