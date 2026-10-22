import type { SVGProps } from 'react';

const paths: Record<string, string> = {
  home: '<path d="M3 10 12 3l9 7v10a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/>',
  grid: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
  sparkles: '<path d="M11 3l1.8 4.7L17.5 9.5l-4.7 1.8L11 16l-1.8-4.7L4.5 9.5l4.7-1.8z"/><path d="M19 14l.8 2.2L22 17l-2.2.8L19 20l-.8-2.2L16 17l2.2-.8z"/>',
  mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/>',
  arrow: '<path d="M7 17 17 7"/><path d="M7 7h10v10"/>',
  trend: '<path d="M22 7l-8.5 8.5-5-5L2 17"/><path d="M16 7h6v6"/>',
  spark: '<path d="M12 2l2.2 6.3L20.5 10.5l-6.3 2.2L12 19l-2.2-6.3L3.5 10.5l6.3-2.2z"/>',
  dash: '<rect x="3" y="3" width="7" height="9" rx="1"/><rect x="14" y="3" width="7" height="5" rx="1"/><rect x="14" y="12" width="7" height="9" rx="1"/><rect x="3" y="16" width="7" height="5" rx="1"/>',
  click: '<path d="M9 9l5 12 1.8-5.2L21 14z"/><path d="M7.2 2.2 8 5.1"/><path d="M5.1 8l-2.9-.8"/><path d="M14 4.1 12 6"/><path d="M6 12l-1.9 2"/>',
  search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
  component: '<path d="M5.5 8.5 9 12l-3.5 3.5L2 12z"/><path d="m12 2 3.5 3.5L12 9 8.5 5.5z"/><path d="M18.5 8.5 22 12l-3.5 3.5L15 12z"/><path d="m12 15 3.5 3.5L12 22l-3.5-3.5z"/>',
  coins: '<circle cx="8" cy="8" r="6"/><path d="M18.09 10.37A6 6 0 1 1 10.34 18"/><path d="M7 6h1v4"/>',
  users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
  trophy: '<path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>',
  clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
  msg: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
  globe: '<circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>',
  phone: '<rect x="5" y="2" width="14" height="20" rx="2"/><path d="M12 18h.01"/>',
  brief: '<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>',
  menu: '<path d="M4 7h16"/><path d="M4 12h16"/><path d="M4 17h16"/>',
  close: '<path d="M6 6l12 12"/><path d="M18 6 6 18"/>',
};

export function Icon({ name, size = 16, stroke = 'currentColor', width = 2, ...rest }: { name: keyof typeof paths | string; size?: number; stroke?: string; width?: number } & SVGProps<SVGSVGElement>) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={width} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...rest} dangerouslySetInnerHTML={{ __html: paths[name] || '' }} />
  );
}

export function Dribbble({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true"><circle cx="16" cy="16" r="16" fill="#EA4C89" /><g fill="none" stroke="#fff" strokeWidth="1.6"><circle cx="16" cy="16" r="9" /><path d="M9.5 9.8c3.6 4.2 5.6 9 6.6 14.2M7.2 15.2c4.7.1 9.6-1 13.4-4.6M12.4 24.2c2.4-3.8 6.6-6 11.4-5.2" /></g></svg>
  );
}
export function LinkedIn({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true"><circle cx="16" cy="16" r="16" fill="#0A66C2" /><path fill="#fff" d="M10.2 13.2h2.7V22h-2.7zM11.6 9a1.6 1.6 0 1 1 0 3.2 1.6 1.6 0 0 1 0-3.2zM14.6 13.2h2.6v1.2c.4-.7 1.3-1.4 2.7-1.4 2.8 0 3.3 1.8 3.3 4.2V22h-2.7v-4.2c0-1 0-2.3-1.4-2.3s-1.6 1.1-1.6 2.2V22h-2.7z" /></svg>
  );
}
export function Upwork({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true"><circle cx="16" cy="16" r="16" fill="#111" /><path fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" d="M8 11v5a3 3 0 0 0 6 0v-1.5c.8 2.6 2.2 4.5 4.6 4.5a3 3 0 0 0 0-6c-2 0-3.4 1.6-4.2 3.4L13.2 23" /></svg>
  );
}
