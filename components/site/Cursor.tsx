'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

type Mode = 'default' | 'wrap' | 'label' | 'invert' | 'hidden';

const RING = 36;
const LABEL = 96;
const INVERT = 150;
const PAD = 8;

/**
 * Two-part cursor: a dot glued to the pointer and a springy ring that trails it.
 * - Ring stretches along the direction of travel, and squashes on press. Clicks send out a burst.
 * - Over small links and buttons it wraps the element (and follows it while it's magnetic).
 * - Over `data-cursor` it becomes the orange label blob ("View", "Drag", "Open"…).
 * - Over big headlines (h1/h2) it grows into a lens that inverts the type beneath it.
 * - Over text fields it steps aside for the normal caret.
 * Mouse/trackpad only; off for touch and reduced motion.
 */
export default function Cursor() {
  const ring = useRef<HTMLDivElement>(null);
  const shape = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);
  const bursts = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<Mode>('default');
  const [label, setLabel] = useState('');
  const [on, setOn] = useState(false);

  useEffect(() => {
    const r = ring.current, s = shape.current, d = dot.current;
    if (!r || !s || !d) return;
    if (!matchMedia('(pointer: fine)').matches || matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    setOn(true);
    document.documentElement.classList.add('cursor-on');

    const m = { x: -100, y: -100 };          // pointer
    const p = { x: -100, y: -100 };          // ring centre
    const size = { w: RING, h: RING, r: RING / 2 };
    let current: Mode = 'default';
    let wrapEl: HTMLElement | null = null;
    let wrapRadius = 12;
    let pressed = false;
    let visible = false;

    const setModeBoth = (next: Mode, text = '') => {
      if (next === current && text === '') return;
      current = next;
      setMode(next);
      if (text) setLabel(text);
    };

    const pick = (target: Element | null) => {
      const el = target instanceof Element ? target : null;
      if (!el) return setModeBoth('default');
      if (el.closest('input, textarea, select, [contenteditable="true"]')) { wrapEl = null; return setModeBoth('hidden'); }
      const labelled = el.closest<HTMLElement>('[data-cursor]');
      if (labelled?.dataset.cursor) { wrapEl = null; return setModeBoth('label', labelled.dataset.cursor); }
      const hit = el.closest<HTMLElement>('a, button, [role="button"], summary, [data-cursor-wrap]');
      if (hit && !hit.hasAttribute('data-cursor-nowrap')) {
        const b = hit.getBoundingClientRect();
        if (b.width <= 460 && b.height <= 140) {
          wrapEl = hit;
          const br = parseFloat(getComputedStyle(hit).borderTopLeftRadius) || 0;
          wrapRadius = Math.min(br + PAD, (b.height + PAD * 2) / 2);
          return setModeBoth('wrap');
        }
      }
      wrapEl = null;
      if (el.closest('h1, h2, [data-cursor-invert]')) return setModeBoth('invert');
      setModeBoth('default');
    };

    const move = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      m.x = e.clientX; m.y = e.clientY;
      if (!visible) {
        p.x = m.x; p.y = m.y; visible = true;
        gsap.to([r, d], { opacity: 1, duration: 0.3 });
      }
    };
    const over = (e: PointerEvent) => pick(e.target as Element);
    const leave = () => { visible = false; gsap.to([r, d], { opacity: 0, duration: 0.3 }); };
    const down = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      pressed = true;
      // A ring bursts out from the click point.
      const b = document.createElement('span');
      b.className = 'absolute left-0 top-0 size-10 rounded-full border-2 border-orange';
      bursts.current?.appendChild(b);
      gsap.fromTo(b, { x: e.clientX - 20, y: e.clientY - 20, scale: 0.3, opacity: 0.9 }, {
        scale: 2.6, opacity: 0, duration: 0.6, ease: 'power3.out', onComplete: () => b.remove(),
      });
    };
    const up = () => { pressed = false; };
    // Scrolling moves things under a still pointer, so re-check what it's over.
    const scroll = () => pick(document.elementFromPoint(m.x, m.y));

    const tick = () => {
      // Where the ring wants to be, and how big.
      let tx = m.x, ty = m.y, tw = RING, th = RING, tr = RING / 2;
      if (current === 'wrap' && wrapEl?.isConnected) {
        const b = wrapEl.getBoundingClientRect();
        const cx = b.left + b.width / 2, cy = b.top + b.height / 2;
        tx = cx + (m.x - cx) * 0.12;   // a little pull toward the pointer
        ty = cy + (m.y - cy) * 0.12;
        tw = b.width + PAD * 2; th = b.height + PAD * 2; tr = wrapRadius;
      } else if (current === 'label') { tw = th = LABEL; tr = LABEL / 2; }
      else if (current === 'invert') { tw = th = INVERT; tr = INVERT / 2; }
      else if (current === 'hidden') { tw = th = 0; tr = 0; }

      const follow = current === 'wrap' ? 0.3 : 0.17;
      const dx = tx - p.x, dy = ty - p.y;
      p.x += dx * follow; p.y += dy * follow;
      size.w += (tw - size.w) * 0.2; size.h += (th - size.h) * 0.2; size.r += (tr - size.r) * 0.2;

      r.style.transform = `translate3d(${p.x - size.w / 2}px, ${p.y - size.h / 2}px, 0)`;
      r.style.width = `${size.w}px`;
      r.style.height = `${size.h}px`;
      s.style.borderRadius = `${size.r}px`;

      // Squash and stretch along the direction of travel (not while wrapped around something).
      const speed = Math.min(Math.hypot(dx, dy), 160);
      const flat = current === 'wrap' || current === 'hidden';
      const stretch = flat ? 0 : speed / 260;
      // A wrapped outline must stay square to its button; circles can turn freely.
      const angle = flat ? 0 : Math.atan2(dy, dx) * (180 / Math.PI);
      const press = pressed ? 0.82 : 1;
      s.style.transform = `rotate(${angle}deg) scale(${(1 + stretch) * press}, ${(1 - stretch * 0.45) * press})`;

      d.style.transform = `translate3d(${m.x - 3}px, ${m.y - 3}px, 0) scale(${current === 'default' ? (pressed ? 1.8 : 1) : 0})`;
    };

    gsap.ticker.add(tick);
    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('pointerover', over, { passive: true });
    window.addEventListener('pointerdown', down, { passive: true });
    window.addEventListener('pointerup', up, { passive: true });
    window.addEventListener('scroll', scroll, { passive: true });
    document.documentElement.addEventListener('pointerleave', leave);
    return () => {
      gsap.ticker.remove(tick);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerover', over);
      window.removeEventListener('pointerdown', down);
      window.removeEventListener('pointerup', up);
      window.removeEventListener('scroll', scroll);
      document.documentElement.removeEventListener('pointerleave', leave);
      document.documentElement.classList.remove('cursor-on');
    };
  }, []);

  const lens = mode === 'invert';
  const blob = mode === 'label';
  // The blend must sit on the fixed layer itself: a fixed, z-indexed parent isolates anything blended inside it.
  // The orange label blob and the click bursts keep their real colour, so they live outside the blended layer.
  return (
    <div aria-hidden="true" className="contents" style={{ display: on ? 'contents' : 'none' }}>
      <div ref={bursts} className="pointer-events-none fixed inset-0 z-[90]" />
      <div className={`pointer-events-none fixed inset-0 z-[91] ${blob ? '' : 'mix-blend-difference'}`}>
        <div ref={ring} className="absolute left-0 top-0 opacity-0" style={{ width: RING, height: RING }}>
          <div
            ref={shape}
            className={`absolute inset-0 transition-[background-color,border-color,border-width] duration-300 ${
              blob ? 'border-0 bg-orange' : lens ? 'border-0 bg-white' : 'border-[1.5px] border-white bg-transparent'
            }`}
          />
          <span className={`absolute inset-0 grid place-items-center font-sans text-[16px] font-semibold text-ink transition-[opacity,scale] duration-300 ease-brand ${blob ? 'scale-100 opacity-100 delay-75' : 'scale-50 opacity-0'}`}>
            {label}
          </span>
        </div>
        <div ref={dot} className="absolute left-0 top-0 size-1.5 rounded-full bg-white opacity-0" />
      </div>
    </div>
  );
}
