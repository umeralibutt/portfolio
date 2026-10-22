import type { Metadata } from 'next';
import type { CSSProperties } from 'react';
import { playShots } from '@/lib/data';
import { Polaroid, Sticky } from '@/components/bits';

export const metadata: Metadata = {
  title: 'Playground — Umar Ali Butt',
  description: 'Concepts, experiments & Dribbble shots — the stuff Umar makes when nobody’s asking.',
};

// Collage positions from the 1440-wide Figma frame: [x, y, width, rotation]. The collage is
// 1440×1300 and scales with the viewport, so positions are turned into percentages below.
const W = 1440;
const H = 1300;
const shotPos: [number, number, number, number][] = [
  [80, 80, 588, 4],
  [700, 60, 540, -3.5],
  [1000, 440, 437, 4],
  [120, 520, 578, -2],
  [560, 680, 492, 2.5],
  [980, 830, 441, -3.5],
];
const labels: { text: string; color: string; x: number; y: number; rot: number }[] = [
  { text: 'first try!', color: 'var(--mint)', x: 250, y: 40, rot: 8 },
  { text: 'hello world', color: 'var(--tape2)', x: 690, y: 10, rot: -5 },
  { text: 'practice', color: 'var(--pink)', x: 1200, y: 380, rot: -6 },
  { text: 'what is this', color: 'var(--mint)', x: 80, y: 1150, rot: 6 },
];

const place = (x: number, y: number, w?: number) =>
  ({ left: `${(x / W) * 100}%`, top: `${(y / H) * 100}%`, width: w ? `${(w / W) * 100}%` : undefined }) as CSSProperties;

export default function PlaygroundPage() {
  return (
    <>
      <section className="play-head">
        <div className="wrap">
          <p className="hand-note play-sub">concepts, experiments &amp; dribbble shots — the stuff i make when nobody’s asking</p>
          <h1 className="pixel play-title">Just for fun</h1>
        </div>
      </section>

      <section className="collage" aria-label="Concepts and Dribbble shots">
        {playShots.map((s, i) => {
          const [x, y, w, rot] = shotPos[i % shotPos.length];
          return (
            <div key={s.src} className="play-item" style={place(x, y, w)}>
              <Polaroid src={s.src} alt={s.cap} caption={s.cap} rot={rot} className="play-pol" />
            </div>
          );
        })}
        {labels.map((l) => (
          <div key={l.text} className="play-label" style={place(l.x, l.y)}>
            <Sticky color={l.color} rot={l.rot} hand>{l.text}</Sticky>
          </div>
        ))}
        <div className="zoom-ctrl" style={place(1370, 1200)} aria-hidden="true">
          <span>+</span>
          <span>–</span>
        </div>
      </section>
    </>
  );
}
