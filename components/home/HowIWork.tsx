const steps = [
  { n: '01', title: 'Listen first', body: 'I ask the annoying question before anyone opens Figma. Users, numbers, the real problem.' },
  { n: '02', title: 'Sketch ugly', body: 'Flows and rough wireframes before a single pretty pixel. Ugly is fast, fast is cheap.' },
  { n: '03', title: 'Ship pretty', body: 'Then I sweat the 2% nobody notices — spacing, states, motion — until it feels inevitable.' },
];

export default function HowIWork() {
  return (
    <section data-bg="beige" className="gutter section-pad bg-beige">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <h2 data-reveal className="display text-[clamp(64px,7.5vw,108px)]">How I <span className="accent text-[0.92em]">work</span></h2>
        <p className="max-w-[200px] text-[18px] leading-snug text-mute sm:text-right">Three rules. No 47-step framework.</p>
      </div>
      <ol className="mt-16 grid gap-14 md:grid-cols-3 md:gap-8 lg:mt-24">
        {steps.map((s, i) => (
          <li key={s.n}>
            <div className="flex items-center gap-3">
              <span className={`size-3.5 shrink-0 rounded-full ${i === 0 ? 'bg-orange' : 'bg-ink'}`} />
              <span className="relative h-0.5 flex-1 bg-rule">
                {/* Draws across as the step scrolls into view. */}
                <span data-draw-line className="absolute inset-0 origin-left bg-orange" />
              </span>
            </div>
            <p className="mt-5 text-[14px] font-semibold tracking-[0.12em] text-orange">{s.n}</p>
            <h3 className="display mt-3 text-[clamp(40px,3.7vw,53px)] leading-none">{s.title}</h3>
            <p className="mt-5 max-w-[416px] text-[18px] leading-[1.55] text-mute">{s.body}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
