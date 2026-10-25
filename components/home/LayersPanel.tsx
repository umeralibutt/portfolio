'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Chevron, Dashed, Diamond, Eye, EyeOff, Frame, ImageIcon, Lock, Stack, TextT } from '../site/icons';

type Row = { id: string; depth: 0 | 1 | 2; icon: ReactNode; name: string; meta?: string; group?: boolean; parent?: string };

const rows: Row[] = [
  { id: 'root', depth: 0, icon: <Frame />, name: 'Umar Ali Butt', meta: 'Frame · 1440 × ∞', group: true },
  { id: 'brain', depth: 1, icon: <Stack />, name: 'Brain', meta: 'Auto layout · gap: chaotic', group: true, parent: 'root' },
  { id: 'ideas', depth: 2, icon: <Diamond />, name: 'Ideas', meta: '1,284 unnamed layers', parent: 'brain' },
  { id: 'what', depth: 2, icon: <TextT />, name: '“What if we just…”', parent: 'brain' },
  { id: 'pin', depth: 2, icon: <ImageIcon />, name: 'pinterest_board_final_v9.png', parent: 'brain' },
  { id: 'fuel', depth: 1, icon: <Stack />, name: 'Fuel', group: true, parent: 'root' },
  { id: 'chai', depth: 2, icon: <ImageIcon />, name: 'chai.png', meta: '×4 daily', parent: 'fuel' },
  { id: 'pixel', depth: 1, icon: <Diamond />, name: 'Pixel-perfectionism', meta: 'Main component', parent: 'root' },
  { id: 'imposter', depth: 1, icon: <Dashed />, name: 'Imposter syndrome', parent: 'root' },
  { id: 'balance', depth: 1, icon: <Stack />, name: 'Work-life balance', parent: 'root' },
];

const props = [
  ['Fill', '#FF4D00 · 100%'],
  ['Stroke', 'Strong opinions, 1px'],
  ['Effects', 'Drop shadow of confidence'],
  ['Export', 'Usually at 2×, always on time'],
];

const indent = ['pl-5', 'pl-10', 'pl-[60px]'];

/**
 * Figma "Layers panel" 216:42 — 560px, −2°. Groups fold, rows highlight on hover, and the eye
 * un-hides "Imposter syndrome" for two seconds before it hides itself again.
 */
export default function LayersPanel() {
  const [closed, setClosed] = useState<Record<string, boolean>>({});
  const [shown, setShown] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);

  const visible = (r: Row) => {
    for (let p = r.parent; p; p = rows.find((x) => x.id === p)?.parent) if (closed[p]) return false;
    return true;
  };
  const peek = () => {
    setShown(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setShown(false), 2000);
  };

  return (
    <div className="w-full max-w-[560px] -rotate-2 overflow-hidden rounded-[18px] border border-ink/[0.08] bg-white text-ink [filter:drop-shadow(0_30px_35px_rgb(0_0_0/0.12))]">
      <div className="flex items-center justify-between border-b border-ink/[0.08] px-5 py-4 text-[13px] leading-none">
        <div className="flex gap-4"><span className="font-semibold">Layers</span><span className="font-medium text-mute">Assets</span></div>
        <span className="flex items-center gap-1 text-[12px] font-medium text-mute">Umar v26 <Chevron className="size-3 rotate-90" /></span>
      </div>

      <ul aria-label="Layers of Umar" className="text-[14px] leading-[18px]">
        {rows.filter(visible).map((r) => {
          const selected = r.id === 'pixel';
          const imposter = r.id === 'imposter';
          const dim = imposter && !shown;
          return (
            <li
              key={r.id}
              className={`group flex items-center gap-2 py-[9px] pr-5 transition-colors duration-200 ${indent[r.depth]} ${selected ? 'bg-[rgb(13_153_255/0.1)] text-[#0d99ff]' : 'hover:bg-ink/[0.04]'}`}
            >
              {r.group ? (
                <button
                  type="button"
                  aria-label={`${closed[r.id] ? 'Expand' : 'Collapse'} ${r.name}`}
                  aria-expanded={!closed[r.id]}
                  onClick={() => setClosed((c) => ({ ...c, [r.id]: !c[r.id] }))}
                  className="grid size-3 shrink-0 place-items-center text-mute hover:text-ink"
                >
                  <Chevron className={`size-3 transition-transform duration-300 ease-brand ${closed[r.id] ? '' : 'rotate-90'}`} strokeWidth={2.4} />
                </button>
              ) : <span className="w-2.5 shrink-0" />}
              <span className={`size-[15px] shrink-0 [&_svg]:size-[15px] ${selected ? '' : 'text-ink/70'} ${dim ? 'opacity-40' : ''}`}>{r.icon}</span>
              <span className={`min-w-0 flex-1 truncate transition-colors duration-300 ${r.depth === 0 ? 'font-semibold' : 'font-medium'} ${dim ? 'text-ink/35' : ''}`}>{r.name}</span>
              <span className={`shrink-0 text-[12px] leading-none ${selected ? '' : 'text-mute'}`}>
                {imposter ? (
                  <button
                    type="button"
                    onClick={peek}
                    aria-pressed={shown}
                    aria-label={shown ? 'Imposter syndrome is visible for a moment' : 'Show imposter syndrome'}
                    className="inline-flex items-center gap-1 rounded text-[rgb(107_102_94/0.6)] transition-colors hover:text-orange"
                  >
                    {shown ? <Eye className="size-[13px]" /> : <EyeOff className="size-[13px]" />}{shown ? 'visible' : 'hidden'}
                  </button>
                ) : r.id === 'balance' ? (
                  <span className="inline-flex items-center gap-1"><Lock className="size-3" />locked</span>
                ) : r.meta}
              </span>
            </li>
          );
        })}
      </ul>

      <div className="flex flex-col gap-2.5 bg-[#f7f7f7] px-5 pb-5 pt-4 text-[12px] leading-none">
        <p className="font-semibold">Properties</p>
        <dl className="contents">
          {props.map(([k, v]) => (
            <div key={k} className="flex justify-between font-medium">
              <dt className="text-mute">{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
