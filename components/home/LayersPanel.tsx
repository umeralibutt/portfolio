'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Chevron, Dashed, Diamond, Eye, EyeOff, Frame, ImageIcon, Lock, Stack, TextT } from '../site/icons';

type Row = { id: string; depth: number; icon: ReactNode; name: string; meta?: ReactNode; group?: string; parent?: string; tone?: 'selected' };

const rows: Row[] = [
  { id: 'root', depth: 0, icon: <Frame />, name: 'Umar Ali Butt', meta: 'Frame · 1440 × ∞', group: 'root' },
  { id: 'brain', depth: 1, icon: <Stack />, name: 'Brain', meta: 'Auto layout · gap: chaotic', group: 'brain', parent: 'root' },
  { id: 'ideas', depth: 2, icon: <Diamond />, name: 'Ideas', meta: '1,284 unnamed layers', parent: 'brain' },
  { id: 'what', depth: 2, icon: <TextT />, name: '“What if we just…”', parent: 'brain' },
  { id: 'pin', depth: 2, icon: <ImageIcon />, name: 'pinterest_board_final_v9.png', parent: 'brain' },
  { id: 'fuel', depth: 1, icon: <Stack />, name: 'Fuel', group: 'fuel', parent: 'root' },
  { id: 'chai', depth: 2, icon: <ImageIcon />, name: 'chai.png', meta: '×4 daily', parent: 'fuel' },
  { id: 'pixel', depth: 1, icon: <Diamond />, name: 'Pixel-perfectionism', meta: 'Main component', parent: 'root', tone: 'selected' },
  { id: 'imposter', depth: 1, icon: <Dashed />, name: 'Imposter syndrome', parent: 'root' },
  { id: 'balance', depth: 1, icon: <Stack />, name: 'Work–life balance', meta: <span className="inline-flex items-center gap-1"><Lock className="size-3" />locked</span>, parent: 'root' },
];

const props = [
  ['Fill', '#FF4D00 · 100%'],
  ['Stroke', 'Strong opinions, 1px'],
  ['Effects', 'Drop shadow of confidence'],
  ['Export', 'Usually at 2×, always on time'],
];

/** A fake Figma layers panel about Umar. Groups fold, rows lift on hover, and the eye un-hides imposter syndrome for 2s. */
export default function LayersPanel() {
  const [closed, setClosed] = useState<Record<string, boolean>>({});
  const [imposterShown, setImposterShown] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);

  const visible = (r: Row): boolean => {
    let p = r.parent;
    while (p) {
      if (closed[p]) return false;
      p = rows.find((x) => x.id === p)?.parent;
    }
    return true;
  };

  const peek = () => {
    setImposterShown(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setImposterShown(false), 2000);
  };

  return (
    <div className="w-full max-w-[579px] -rotate-2 rounded-[22px] bg-white text-[#1E1E1E] shadow-[0_30px_60px_-20px_rgb(14_13_12/0.35)] transition-transform duration-700 ease-brand hover:rotate-0">
      <div className="flex items-center justify-between border-b border-black/10 px-5 py-4 text-[14px]">
        <div className="flex gap-4"><span className="font-semibold">Layers</span><span className="text-black/45">Assets</span></div>
        <span className="flex items-center gap-1 text-black/60">Umar v26 <Chevron className="size-3 rotate-90" /></span>
      </div>

      <ul className="py-2 text-[15px]" aria-label="Layers of Umar">
        {rows.filter(visible).map((r) => {
          const isImposter = r.id === 'imposter';
          const hidden = isImposter && !imposterShown;
          return (
            <li
              key={r.id}
              className={`group flex items-center gap-2 py-2 pr-5 transition-[padding,background-color] duration-300 ease-brand hover:py-3 ${r.tone === 'selected' ? 'bg-[#E5F2FF] text-[#0D99FF]' : 'hover:bg-black/[0.04]'}`}
              style={{ paddingLeft: 20 + r.depth * 20 }}
            >
              {r.group ? (
                <button
                  type="button"
                  aria-label={`${closed[r.group] ? 'Expand' : 'Collapse'} ${r.name}`}
                  aria-expanded={!closed[r.group]}
                  onClick={() => setClosed((c) => ({ ...c, [r.group!]: !c[r.group!] }))}
                  className="grid size-4 place-items-center rounded text-black/50 hover:text-black"
                >
                  <Chevron className={`size-3 transition-transform duration-300 ease-brand ${closed[r.group] ? '' : 'rotate-90'}`} />
                </button>
              ) : <span className="w-4" />}
              <span className={`size-4 shrink-0 [&_svg]:size-4 ${hidden ? 'opacity-40' : ''}`}>{r.icon}</span>
              <span className={`truncate transition-colors duration-300 ${r.depth === 0 ? 'font-semibold' : ''} ${hidden ? 'text-black/35' : ''}`}>{r.name}</span>
              <span className={`ml-auto shrink-0 pl-3 text-[12px] transition-opacity duration-300 ${r.tone === 'selected' ? '' : 'text-black/45 group-hover:text-black/70'}`}>
                {isImposter ? (
                  <button
                    type="button"
                    onClick={peek}
                    aria-pressed={imposterShown}
                    className="inline-flex items-center gap-1 rounded px-1 hover:text-orange"
                    aria-label={imposterShown ? 'Imposter syndrome is visible (it hides itself again)' : 'Show imposter syndrome'}
                  >
                    {imposterShown ? <><Eye className="size-3.5" />visible</> : <><EyeOff className="size-3.5" />hidden</>}
                  </button>
                ) : r.meta}
              </span>
            </li>
          );
        })}
      </ul>

      <dl className="rounded-b-[22px] bg-[#F5F5F5] px-5 py-4 text-[13px]">
        <dt className="mb-2 font-semibold">Properties</dt>
        {props.map(([k, v]) => (
          <div key={k} className="flex justify-between py-1">
            <dt className="text-black/50">{k}</dt>
            <dd>{v}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
