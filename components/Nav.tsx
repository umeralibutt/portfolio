'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Icon, Dribbble, LinkedIn, Upwork } from './icons';
import { site } from '@/lib/data';

const tabs = [
  { href: '/', label: 'Home', icon: 'home' },
  { href: '/about', label: 'About', icon: 'user' },
  { href: '/work', label: 'Work', icon: 'grid' },
  { href: '/playground', label: 'Playground', icon: 'sparkles' },
];

export function Socials({ size = 28 }: { size?: number }) {
  return (
    <div className="socials">
      <a href={site.links.dribbble} target="_blank" rel="noreferrer" aria-label="Dribbble"><Dribbble size={size} /></a>
      <a href={site.links.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><LinkedIn size={size} /></a>
      <a href={site.links.upwork} target="_blank" rel="noreferrer" aria-label="Upwork"><Upwork size={size} /></a>
    </div>
  );
}

export default function Nav() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(false), [path]);

  const isActive = (href: string) => (href === '/' ? path === '/' : path.startsWith(href));

  return (
    <header className="nav">
      <div className="nav-in">
        <Link href="/" className="wordmark">{site.name}</Link>
        <nav className="tabs" aria-label="Main">
          {tabs.map((t) => (
            <Link key={t.href} href={t.href} className={`tab${isActive(t.href) ? ' on' : ''}`}>
              <Icon name={t.icon} size={15} />
              {t.label}
            </Link>
          ))}
        </nav>
        <div className="nav-right">
          <Socials />
          <Link href="/contact" className="contact-btn"><Icon name="mail" size={15} />Contact</Link>
        </div>
        <button className="menu-btn" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(!open)}>
          <Icon name={open ? 'close' : 'menu'} size={22} />
        </button>
      </div>
      {open && (
        <div className="sheet">
          {tabs.map((t) => (
            <Link key={t.href} href={t.href} className={`tab${isActive(t.href) ? ' on' : ''}`}>
              <Icon name={t.icon} size={15} />
              {t.label}
            </Link>
          ))}
          <Link href="/contact" className="tab"><Icon name="mail" size={15} />Contact</Link>
          <Socials />
        </div>
      )}
    </header>
  );
}
