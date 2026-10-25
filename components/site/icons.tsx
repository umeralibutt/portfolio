import type { SVGProps } from 'react';

type P = SVGProps<SVGSVGElement>;
const base = { fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round', viewBox: '0 0 24 24', 'aria-hidden': true } as const;

export const Arrow = (p: P) => <svg {...base} {...p}><path d="M5 12h14M13 6l6 6-6 6" /></svg>;
export const ArrowDown = (p: P) => <svg {...base} {...p}><path d="M12 5v14M6 13l6 6 6-6" /></svg>;
export const ArrowUp = (p: P) => <svg {...base} {...p}><path d="M12 19V5M6 11l6-6 6 6" /></svg>;
export const ArrowLeft = (p: P) => <svg {...base} {...p}><path d="M19 12H5M11 6l-6 6 6 6" /></svg>;
export const ArrowUpRight = (p: P) => <svg {...base} {...p}><path d="M7 17 17 7M8 7h9v9" /></svg>;
export const Plus = (p: P) => <svg {...base} {...p}><path d="M12 5v14M5 12h14" /></svg>;
export const Chevron = (p: P) => <svg {...base} {...p}><path d="m9 6 6 6-6 6" /></svg>;
export const Alert = (p: P) => <svg {...base} {...p}><path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z" /><path d="M12 9v4M12 17h.01" /></svg>;
export const Eye = (p: P) => <svg {...base} {...p}><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" /><circle cx="12" cy="12" r="3" /></svg>;
export const EyeOff = (p: P) => <svg {...base} {...p}><path d="M9.9 4.2A9.5 9.5 0 0 1 12 4c6.5 0 10 8 10 8a17 17 0 0 1-2.2 3.2M6.6 6.6C3.8 8.4 2 12 2 12s3.5 8 10 8a9.4 9.4 0 0 0 5.4-1.6M14.1 14.1a3 3 0 0 1-4.2-4.2M2 2l20 20" /></svg>;
export const Lock = (p: P) => <svg {...base} {...p}><rect x="4" y="11" width="16" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></svg>;
export const Frame = (p: P) => <svg {...base} {...p}><path d="M4 9h16M4 15h16M9 4v16M15 4v16" /></svg>;
export const Stack = (p: P) => <svg {...base} {...p}><rect x="4" y="4" width="16" height="6" rx="1" /><rect x="4" y="14" width="16" height="6" rx="1" /></svg>;
export const Diamond = (p: P) => <svg {...base} {...p}><path d="m12 3 9 9-9 9-9-9z" /></svg>;
export const TextT = (p: P) => <svg {...base} {...p}><path d="M5 6V5h14v1M12 5v14M9 19h6" /></svg>;
export const ImageIcon = (p: P) => <svg {...base} {...p}><rect x="4" y="4" width="16" height="16" rx="2" /><circle cx="9" cy="9" r="1.6" /><path d="m20 15-4-4-8 8" /></svg>;
export const Check = (p: P) => <svg {...base} {...p}><path d="m5 12.5 4.5 4.5L19 7.5" /></svg>;
export const Copy = (p: P) => <svg {...base} {...p}><rect x="8" y="8" width="12" height="12" rx="2" /><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" /></svg>;
export const Shuffle = (p: P) => <svg {...base} {...p}><path d="M16 3h5v5M4 20 21 3M21 16v5h-5M15 15l6 6M4 4l5 5" /></svg>;
export const Dashed =(p: P) => <svg {...base} {...p}><circle cx="12" cy="12" r="8" strokeDasharray="3 3" /></svg>;

/** The four-point star used between marquee words. */
export const Sparkle = (p: P) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...p}><path fill="currentColor" d="M12 0c.9 7.2 4.8 11.1 12 12-7.2.9-11.1 4.8-12 12-.9-7.2-4.8-11.1-12-12C7.2 11.1 11.1 7.2 12 0z" /></svg>
);
