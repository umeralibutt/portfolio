import type { Metadata } from 'next';
import { playShots } from '@/lib/data';
import Collage from '@/components/Collage';

export const metadata: Metadata = {
  title: 'Playground — Umar Ali Butt',
  description: 'Concepts, experiments & Dribbble shots — the stuff Umar makes when nobody’s asking.',
};

// Collage positions from the 1440-wide Figma frame: [x, y, width, rotation].
const shotPos: [number, number, number, number][] = [
  [80, 80, 588, 4],
  [700, 60, 540, -3.5],
  [1000, 440, 437, 4],
  [120, 520, 578, -2],
  [560, 680, 492, 2.5],
  [980, 830, 441, -3.5],
];
const labels = [
  { text: 'first try!', color: 'var(--mint)', x: 250, y: 40, rot: 8 },
  { text: 'hello world', color: 'var(--tape2)', x: 690, y: 10, rot: -5 },
  { text: 'practice', color: 'var(--pink)', x: 1200, y: 380, rot: -6 },
  { text: 'what is this', color: 'var(--mint)', x: 80, y: 1150, rot: 6 },
];

export default function PlaygroundPage() {
  const shots = playShots.map((s, i) => {
    const [x, y, w, rot] = shotPos[i % shotPos.length];
    return { ...s, x, y, w, rot };
  });
  return (
    <>
      <section className="play-head">
        <div className="wrap">
          <p className="hand-note play-sub">concepts, experiments &amp; dribbble shots — the stuff i make when nobody’s asking</p>
          <h1 className="pixel play-title">Just for fun</h1>
        </div>
      </section>
      <Collage shots={shots} labels={labels} />
    </>
  );
}
