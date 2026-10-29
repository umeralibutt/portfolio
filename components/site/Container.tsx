import type { ElementType, ReactNode } from 'react';

/**
 * The one content column every section sits in: 120px sides at 1440 and up (20px phones, 48px tablets).
 * Section backgrounds stay full-bleed outside it.
 */
export default function Container({ as: Tag = 'div', className = '', children }: { as?: ElementType; className?: string; children: ReactNode }) {
  return <Tag className={`container-site ${className}`}>{children}</Tag>;
}
