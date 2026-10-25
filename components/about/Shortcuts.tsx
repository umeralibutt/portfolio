'use client';

import { useEffect, useState } from 'react';
import { Line, fluid } from '../site/type';

type Shortcut = { keys: string[]; title: string; sub: string; match: (e: KeyboardEvent) => boolean };

const mod = (e: KeyboardEvent) => e.metaKey || e.ctrlKey;
const shortcuts: Shortcut[] = [
  { keys: ['Cmd', '/'], title: 'Ask the annoying question.', sub: 'Before anyone opens Figma.', match: (e) => mod(e) && e.key === '/' },
  { keys: ['Shift', 'A'], title: 'Auto-layout everything.', sub: 'Absolute positioning is a cry for help.', match: (e) => e.shiftKey && e.key.toLowerCase() === 'a' },
  { keys: ['Opt', 'Drag'], title: 'Duplicate what works.', sub: 'Then delete what doesn’t. Ruthlessly.', match: (e) => e.key === 'Alt' },
  { keys: ['Cmd', 'Z'], title: 'Undo bad ideas early.', sub: 'Ideally before the client sees them.', match: (e) => mod(e) && e.key.toLowerCase() === 'z' },
  { keys: ['R'], title: 'Rename every layer.', sub: 'Yes, every one. “Frame 2847” is not a name.', match: (e) => !mod(e) && !e.shiftKey && e.key.toLowerCase() === 'r' },
  { keys: ['Cmd', 'S'], title: 'Save.', sub: 'Figma already did. It just feels good.', match: (e) => mod(e) && e.key.toLowerCase() === 's' },
];

/**
 * Figma "My shortcuts" 239:24 — press the real keys (or hover a row) and its caps depress.
 * Cmd shortcuts also answer to Ctrl, so they work on Windows.
 */
export default function Shortcuts() {
  const [active, setActive] = useState(1);
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      const t = e.target;
      if (t instanceof Element && t.closest('input, textarea, [contenteditable]')) return;
      const i = shortcuts.findIndex((s) => s.match(e));
      if (i < 0) return;
      // Keep Cmd+S / Cmd+Z / Cmd+/ from triggering the browser while you're playing.
      if (mod(e)) e.preventDefault();
      setActive(i);
      setPressed(true);
    };
    const up = () => setPressed(false);
    addEventListener('keydown', down);
    addEventListener('keyup', up);
    return () => { removeEventListener('keydown', down); removeEventListener('keyup', up); };
  }, []);

  return (
    <section className="flex flex-col gap-12 bg-beige gutter pb-20 pt-20 lg:flex-row lg:gap-20 lg:pb-[140px] lg:pt-[120px]">
      <div className="flex shrink-0 flex-col items-start gap-7">
        <h2 data-lines className="whitespace-nowrap">
          <Line drift={-1} className="font-display leading-[0.88]" style={{ fontSize: fluid(130, 72) }}>MY</Line>
          <Line drift={1} className="font-serif italic leading-[0.85] text-orange" style={{ fontSize: fluid(120, 66) }}>shortcuts</Line>
        </h2>
        <p className="max-w-[400px] text-[20px] leading-[1.5] text-mute">How I actually work, in keyboard shortcuts. Press a key — seriously, try it.</p>
      </div>

      <ul data-rows className="flex min-w-0 flex-1 flex-col">
        {shortcuts.map((s, i) => {
          const on = i === active;
          const down = on && pressed;
          // Rules sit between rows, but not around the raised (white) one.
          const rule = i > 0 && !on && i - 1 !== active;
          return (
            <li
              key={s.title}
              onPointerEnter={() => setActive(i)}
              className={`flex flex-col gap-4 rounded-[18px] px-0 py-6 transition-[background-color,padding] duration-300 ease-brand sm:flex-row sm:items-center sm:gap-9 ${on ? 'bg-white !px-6' : ''} ${rule ? 'rounded-none border-t border-ink/[0.14]' : 'border-t border-transparent'}`}
            >
              <span className="flex items-center gap-2 sm:w-[230px] sm:shrink-0" aria-label={s.keys.join(' + ')}>
                {s.keys.map((k, j) => (
                  <span key={k} className="contents">
                    {j > 0 && <span aria-hidden="true" className="text-[18px] font-medium text-mute">+</span>}
                    <kbd
                      className={`inline-flex min-w-14 items-center justify-center rounded-[12px] border px-[18px] pb-3.5 pt-3 font-sans text-[20px] font-semibold leading-[1.21] tracking-[-0.01em] transition-[background-color,border-color,box-shadow,translate] duration-150 ${
                        on
                          ? `border-ink/40 bg-orange shadow-[0_1px_0_rgb(14_13_12/0.5)] translate-y-1 ${down ? 'scale-95' : ''}`
                          : 'border-ink/[0.14] bg-[#fbf9f5] shadow-[0_5px_0_rgb(14_13_12/0.22)]'
                      }`}
                    >
                      {k}
                    </kbd>
                  </span>
                ))}
              </span>
              <span className="flex min-w-0 flex-1 flex-col gap-1">
                <span className={`font-display leading-[1.05] transition-colors duration-300 ${on ? 'text-orange' : ''}`} style={{ fontSize: fluid(40, 28) }}>{s.title}</span>
                <span className="text-[17px] font-medium leading-[1.21] text-mute">{s.sub}</span>
              </span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
