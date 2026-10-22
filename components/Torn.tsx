import type { ButtonHTMLAttributes, ReactNode } from 'react';

/** Paper tag with zig-zag edges (both, or just the top). Renders a button when given onClick. */
export default function Torn({ children, color, text = 'var(--ink)', active, edge = 'both', ...rest }: {
  children: ReactNode; color: string; text?: string; active?: boolean; edge?: 'both' | 'top';
} & ButtonHTMLAttributes<HTMLButtonElement>) {
  const style = { background: color, color: text };
  if (!rest.onClick) return <span className={`torn${edge === 'top' ? ' torn-top' : ''}`} style={style}>{children}</span>;
  return (
    <button type="button" className={`torn${active ? ' on' : ''}`} style={style} aria-pressed={active} {...rest}>
      {children}
    </button>
  );
}
