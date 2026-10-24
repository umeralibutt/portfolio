import type { CSSProperties, ReactNode } from 'react';

/**
 * Fluid size that equals `px` on the 1440px Figma frame and scales down with the viewport,
 * never going below `min`.
 */
export const fluid = (px: number, min = Math.round(px * 0.42)) => `clamp(${min}px, ${(px / 14.4).toFixed(3)}vw, ${px}px)`;

/**
 * One headline line that slides up out of its own mask (see Effects: data-lines / data-line).
 * The mask is padded so italic overhangs and descenders aren't clipped at rest.
 */
export function Line({ children, className = '', style }: { children: ReactNode; className?: string; style?: CSSProperties }) {
  return (
    <span className="line-mask block">
      <span data-line className={`block ${className}`} style={style}>{children}</span>
    </span>
  );
}
