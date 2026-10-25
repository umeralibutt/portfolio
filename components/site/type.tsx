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
export function Line({ children, className = '', style, drift, driftOut }: {
  children: ReactNode; className?: string; style?: CSSProperties;
  /** Slide sideways while scrolling past (see Effects: data-drift / data-drift-out). */
  drift?: number; driftOut?: number;
}) {
  // The style (usually the font size) sits on the mask so its em-based padding scales with the type.
  return (
    <span className="line-mask block" style={style} data-drift={drift} data-drift-out={driftOut}>
      <span data-line className={`block ${className}`}>{children}</span>
    </span>
  );
}
