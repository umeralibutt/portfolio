'use client';

import { useRef, useState, type CSSProperties, type PointerEvent } from 'react';
import { Polaroid, Sticky } from './bits';

type Shot = { src: string; cap: string; x: number; y: number; w: number; rot: number };
type Label = { text: string; color: string; x: number; y: number; rot: number };

// Positions come from the 1440×1300 Figma collage and scale with the viewport.
const W = 1440;
const H = 1300;
const place = (x: number, y: number, w?: number) =>
  ({ left: `${(x / W) * 100}%`, top: `${(y / H) * 100}%`, width: w ? `${(w / W) * 100}%` : undefined }) as CSSProperties;

const ZOOM_MIN = 0.8;
const ZOOM_MAX = 1.2;

/** Desktop: drag the polaroids around and zoom the board. Small screens fall back to a masonry list. */
export default function Collage({ shots, labels }: { shots: Shot[]; labels: Label[] }) {
  const [offsets, setOffsets] = useState<Record<number, [number, number]>>({});
  const [order, setOrder] = useState<number[]>([]);
  const [dragging, setDragging] = useState<number | null>(null);
  const [zoom, setZoom] = useState(1);
  const drag = useRef<{ i: number; x: number; y: number; ox: number; oy: number } | null>(null);

  const canDrag = () => matchMedia('(min-width: 900px)').matches;

  const down = (i: number) => (e: PointerEvent<HTMLDivElement>) => {
    if (!canDrag() || e.button !== 0) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    const [ox, oy] = offsets[i] ?? [0, 0];
    drag.current = { i, x: e.clientX, y: e.clientY, ox, oy };
    setDragging(i);
    setOrder((o) => [...o.filter((n) => n !== i), i]);
  };
  const move = (e: PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d) return;
    setOffsets((o) => ({ ...o, [d.i]: [d.ox + (e.clientX - d.x) / zoom, d.oy + (e.clientY - d.y) / zoom] }));
  };
  const up = () => { drag.current = null; setDragging(null); };

  const moved = Object.keys(offsets).length > 0;

  return (
    <section className="collage" aria-label="Concepts and Dribbble shots">
      <div className="collage-inner" style={{ transform: `scale(${zoom})` }}>
        {shots.map((s, i) => {
          const [ox, oy] = offsets[i] ?? [0, 0];
          const z = order.indexOf(i);
          return (
            <div
              key={s.src}
              className={`play-item${dragging === i ? ' dragging' : ''}`}
              style={{ ...place(s.x, s.y, s.w), translate: `${ox}px ${oy}px`, zIndex: z >= 0 ? 10 + z : undefined }}
              onPointerDown={down(i)}
              onPointerMove={move}
              onPointerUp={up}
              onPointerCancel={up}
            >
              <Polaroid src={s.src} alt={s.cap} caption={s.cap} rot={s.rot} className="play-pol" />
            </div>
          );
        })}
        {labels.map((l) => (
          <div key={l.text} className="play-label" style={place(l.x, l.y)}>
            <Sticky color={l.color} rot={l.rot} hand>{l.text}</Sticky>
          </div>
        ))}
      </div>
      <div className="zoom-ctrl" style={place(1370, 1200)}>
        <button type="button" aria-label="Zoom in" disabled={zoom >= ZOOM_MAX} onClick={() => setZoom((z) => Math.min(ZOOM_MAX, +(z + 0.1).toFixed(1)))}>+</button>
        <button type="button" aria-label="Zoom out" disabled={zoom <= ZOOM_MIN} onClick={() => setZoom((z) => Math.max(ZOOM_MIN, +(z - 0.1).toFixed(1)))}>–</button>
      </div>
      <p className="hand-note drag-hint">{moved || zoom !== 1
        ? <button type="button" onClick={() => { setOffsets({}); setOrder([]); setZoom(1); }}>tidy up ↺</button>
        : '(go on, drag them around)'}</p>
    </section>
  );
}
