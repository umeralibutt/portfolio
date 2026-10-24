const items: [string, string, string][] = [
  ['1', 'Self-taught designer', '1'],
  ['5', 'Years shipping product', '5 yrs'],
  ['10+', 'Products, end to end', '10+'],
  ['3', 'Industries (Web3·Fin·AI)', '3'],
  ['999+', 'Files named final_v3', '999+'],
  ['4', 'Cups of chai, daily', '4'],
];

// Bar widths for a believable barcode.
const bars = [4, 4, 6, 6, 4, 4, 6, 4, 4, 4, 6, 4, 4, 6, 4, 6, 4, 6, 4, 4, 6, 6, 4, 4, 6, 4, 4, 6, 4, 4, 4, 6, 6, 4, 4, 6, 4, 6, 6, 4, 4, 4, 6, 4, 6, 4, 4, 6];

export default function Receipt() {
  return (
    <section data-bg="ink" className="relative overflow-hidden bg-ink text-bone">
      <div className="dot-grid absolute inset-0" aria-hidden="true" />
      <div className="gutter section-pad relative grid items-center gap-16 lg:grid-cols-[minmax(0,1fr)_509px] lg:pl-[88px]">
        <div>
          <p className="font-serif text-[clamp(30px,3vw,44px)] italic leading-none text-orange">receipts, not vibes</p>
          <h2 data-reveal className="display mt-5 text-[clamp(84px,9.2vw,132px)]">
            The<br />Receipt<span className="text-orange">.</span>
          </h2>
          <p className="mt-8 max-w-[460px] text-[19px] leading-[1.55] text-bone/65">Five years of shipping, itemised. Keep it for your records — or your hiring manager’s.</p>
          <p className="mt-10 flex items-center gap-3 font-serif text-[22px] italic text-bone/80">
            No refunds on good taste.
            <svg width="54" height="16" viewBox="0 0 54 16" fill="none" stroke="var(--color-orange)" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M2 10c14-6 30-7 48-2" /><path d="M44 3l7 5-7 5" />
            </svg>
          </p>
        </div>

        {/* Prints in from the top on scroll; tilts back on hover; the stamp lands last. */}
        <div data-receipt className="group relative mx-auto w-full max-w-[470px] [perspective:1200px]">
          <div data-paper className="torn-y relative rotate-[3deg] bg-paper px-[clamp(20px,4vw,40px)] pt-12 pb-14 font-mono text-[15px] text-ink shadow-2xl transition-transform duration-700 ease-brand group-hover:rotate-[-1deg]">
            <p className="display text-center text-[clamp(44px,4.6vw,66px)] leading-none">Umar Ali Butt</p>
            <p className="mt-4 text-center text-[13px] font-semibold tracking-[0.1em]">— ORDER RECEIPT —</p>
            <p className="mt-3 text-center text-[12px] text-ink/55">PRODUCT DESIGN · ISLAMABAD, PK</p>
            <div className="mt-6 flex justify-between border-b border-dashed border-ink/40 pb-3 text-[12px] text-ink/60">
              <span>ORDER #2021</span><span>SEP 2021 — NOW</span>
            </div>
            <div className="mt-4 flex justify-between text-[12px] font-semibold"><span>QTY&nbsp;&nbsp;ITEM</span><span>AMOUNT</span></div>
            <ul className="mt-2 space-y-2.5">
              {items.map(([q, label, amt]) => (
                <li key={label} className="flex items-baseline gap-3">
                  <span className="w-10 shrink-0 text-[13px] text-ink/55">{q}</span>
                  <span className="shrink-0">{label}</span>
                  <span className="mb-1 flex-1 border-b border-dotted border-ink/30" />
                  <span className="shrink-0 font-semibold">{amt}</span>
                </li>
              ))}
            </ul>
            <div className="mt-5 border-t border-dashed border-ink/40 pt-4 text-[13px]">
              <div className="flex justify-between"><span className="text-ink/55">SUBTOTAL</span><span>products people enjoy</span></div>
              <div className="mt-3 flex items-center justify-between">
                <span className="font-semibold">TOTAL</span>
                <span className="bg-orange px-3 py-1.5 font-sans text-[clamp(18px,1.7vw,22px)] font-semibold">worth the hire</span>
              </div>
              <div className="mt-3 flex justify-between border-b border-dashed border-ink/40 pb-4"><span className="text-ink/55">PAID IN</span><span>pixels &amp; patience</span></div>
            </div>
            <div className="mt-6 flex justify-center gap-px" aria-hidden="true">
              {bars.map((w, i) => <span key={i} className="h-[52px] bg-ink" style={{ width: w / 1.6, marginRight: i % 3 ? 1 : 2 }} />)}
            </div>
            <p className="mt-3 text-center text-[11px] text-ink/55">NO REFUNDS ON GOOD TASTE</p>

            <div data-stamp className="absolute bottom-16 right-[6%] -rotate-[8deg] rounded-[50%] border-[2.5px] border-orange px-4 py-2 text-center text-orange">
              <span className="block font-sans text-[18px] font-bold tracking-[0.08em]">APPROVED</span>
              <span className="block text-[8px] tracking-[0.18em]">BY ACTUAL USERS</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
