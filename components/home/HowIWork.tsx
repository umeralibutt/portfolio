import { Line, fluid } from '../site/type';

const steps = [
  { n: '01', title: 'Listen first', body: 'I ask the annoying question before anyone opens Figma. Users, numbers, the real problem.' },
  { n: '02', title: 'Sketch ugly', body: 'Flows and rough wireframes before a single pretty pixel. Ugly is fast, fast is cheap.' },
  { n: '03', title: 'Ship pretty', body: 'Then I sweat the 2% nobody notices (spacing, states, motion) until it feels inevitable.' },
];

/** Figma "How I work" 223:74 — beige, 120 / 48 padding; three steps 48px apart, each rule draws on scroll. */
export default function HowIWork() {
  return (
    <section className="bg-beige gutter py-20 lg:py-[120px]">
      <div className="flex flex-col gap-6 pb-12 sm:flex-row sm:items-end sm:justify-between lg:pb-[72px]">
        <h2 data-lines className="leading-[0.9]">
          <Line drift={-1} className="flex items-baseline gap-x-[18px] whitespace-nowrap">
            <span className="font-display" style={{ fontSize: fluid(120, 60) }}>HOW I</span>
            <span className="font-serif italic text-orange" style={{ fontSize: fluid(110, 56) }}>work</span>
          </Line>
        </h2>
        <p className="text-[16px] font-medium leading-[1.4] text-mute sm:text-right lg:text-[18px]">Three rules.<br /> No 47-step framework.</p>
      </div>
      <ol data-rows className="grid gap-12 lg:grid-cols-3">
        {steps.map((s, i) => (
          <li key={s.n} className="flex flex-col gap-5">
            <div className="flex items-center gap-3">
              <span className={`size-3.5 shrink-0 rounded-full ${i === 0 ? 'bg-orange' : 'bg-ink'}`} />
              <span className="relative h-0.5 flex-1 bg-ink/[0.18]">
                <span data-draw-line className="absolute inset-0 origin-left bg-orange" />
              </span>
            </div>
            <p className="text-[14px] font-semibold leading-[1.21] tracking-[0.1em] text-orange-deep">{s.n}</p>
            <h3 className="font-display uppercase leading-[0.95] whitespace-nowrap" style={{ fontSize: fluid(56, 40) }}>{s.title}</h3>
            <p className="text-[17px] leading-[1.55] tracking-[-0.006em] text-mute lg:text-[18px]">{s.body}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
