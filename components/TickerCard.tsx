// [body height, wick top, wick bottom, up?] — drawn in a 12px-wide slot each
const candles: [number, number, number, boolean][] = [
  [14, 4, 4, true], [18, 6, 3, false], [12, 3, 5, true], [22, 5, 4, false], [16, 4, 6, false], [30, 6, 3, true],
];

export default function TickerCard() {
  return (
    <div className="ticker">
      <div className="ticker-strip">
        <span className="lime">UMAR/DSGN</span>
        <span>▲ +5.0Y</span>
        <span>VOL 08</span>
        <span className="lime">STATUS: OPEN</span>
      </div>
      <div className="ticker-body">
        <span className="ticker-name">UMAR</span>
        <svg className="candles" width="72" height="46" viewBox="0 0 72 46" aria-hidden="true">
          {candles.map(([b, wt, wb, up], i) => {
            const x = i * 12 + 6;
            const bottom = 46 - wb - (i % 3) * 3;
            const top = bottom - b;
            const c = up ? 'var(--green)' : 'var(--orange)';
            return (
              <g key={i}>
                <line x1={x} x2={x} y1={top - wt} y2={bottom + wb} stroke="var(--ink)" strokeWidth="1.5" />
                <rect x={x - 3.5} y={top} width="7" height={b} fill={c} stroke="var(--ink)" strokeWidth="1" />
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
