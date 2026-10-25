/* eslint-disable @next/next/no-img-element */
import { Line, fluid } from '../site/type';

const items: [string, string, string][] = [
  ['1', 'Self-taught designer', '1'],
  ['5', 'Years shipping product', '5 yrs'],
  ['10+', 'Products, end to end', '10+'],
  ['3', 'Industries (Web3·Fin·AI)', '3'],
  ['999+', 'Files named final_v3', '999+'],
  ['4', 'Cups of chai, daily', '4'],
];

// Bar widths from the Figma barcode (1.5px / 3px, 2px apart).
const bars = [1, 1, 2, 2, 1, 1, 2, 1, 1, 1, 2, 1, 1, 2, 1, 2, 1, 2, 1, 1, 2, 2, 1, 1, 2, 1, 1, 2, 1, 1, 1, 2, 2, 1, 1, 2, 1, 2, 2, 1, 1, 1, 2, 1, 2, 1, 1, 2];

const Dashed = () => <span className="block h-px w-full bg-[repeating-linear-gradient(90deg,#B9B3A8_0_4px,transparent_4px_8px)]" aria-hidden="true" />;

/** Figma "The Receipt" 232:24 — ink with a dot grid, 140 / 96 padding; the receipt is 470px wide at −3°. */
export default function Receipt() {
  return (
    <section className="relative overflow-hidden bg-ink text-bone">
      <div className="dot-grid absolute inset-0" aria-hidden="true" />
      <div className="relative flex flex-col items-center gap-16 gutter py-20 lg:flex-row lg:justify-between lg:py-[140px]">
        <div className="flex flex-col items-start gap-7 self-start lg:self-center">
          <p className="font-serif italic leading-none text-orange" style={{ fontSize: fluid(34, 26) }}>receipts, not vibes</p>
          <h2 data-lines className="font-display leading-[0.88] whitespace-nowrap" style={{ fontSize: fluid(150, 84) }}>
            <Line>THE</Line>
            <Line>RECEIPT<span className="text-orange">.</span></Line>
          </h2>
          <p className="max-w-[460px] leading-[1.5] text-[#a8a399]" style={{ fontSize: fluid(20, 17) }}>Five years of shipping, itemised. Keep it for your records — or your hiring manager’s.</p>
          <p className="flex items-center gap-2.5 pt-3 font-serif text-[22px] italic leading-none text-bone/75">
            No refunds on good taste.
            <img src="/home/receipt-arrow.svg" alt="" width={60} height={20} />
          </p>
        </div>

        {/* Prints in from the top on scroll; tilts back on hover; the stamp lands last. */}
        <div data-receipt className="group relative w-full max-w-[470px] shrink-0 lg:mr-5">
          <div className="-rotate-3 [filter:drop-shadow(0_40px_40px_rgb(0_0_0/0.5))] transition-[rotate] duration-700 ease-brand group-hover:rotate-0">
            <div data-paper className="relative">
              <img src="/home/receipt-tear-top.svg" alt="" width={470} height={12} className="block h-3 w-full" />
              <div className="flex flex-col items-center gap-4 bg-[#f7f4ec] px-[clamp(20px,7.6%,36px)] pb-8 pt-7 font-mono text-ink">
                <p className="font-display text-[clamp(34px,9.4vw,44px)] leading-tight tracking-[0.01em]">UMAR ALI BUTT</p>
                <p className="text-[14px] font-semibold tracking-[0.02em]">— ORDER RECEIPT —</p>
                <p className="text-[12px] tracking-[0.02em] text-[#736e66]">PRODUCT DESIGN · ISLAMABAD, PK</p>
                <div className="flex w-full justify-between text-[12px] tracking-[0.02em] text-[#736e66]"><span>ORDER #2021</span><span>SEP 2021 — NOW</span></div>
                <Dashed />
                <div className="flex w-full justify-between text-[12px] font-semibold tracking-[0.02em]"><span className="whitespace-pre">QTY  ITEM</span><span>AMOUNT</span></div>
                {items.map(([q, label, amt]) => (
                  <div key={label} className="flex w-full items-end gap-2.5">
                    <span className="w-11 shrink-0 text-[14px] tracking-[0.02em] text-[#736e66]">{q}</span>
                    <span className="shrink-0 text-[clamp(13px,3.6vw,15px)] tracking-[0.02em]">{label}</span>
                    <span className="mb-[5px] h-px min-w-2 flex-1 bg-[repeating-linear-gradient(90deg,#B9B3A8_0_2px,transparent_2px_5px)]" />
                    <span className="shrink-0 text-[15px] font-semibold tracking-[0.02em]">{amt}</span>
                  </div>
                ))}
                <Dashed />
                <div className="flex w-full justify-between text-[13px] tracking-[0.02em]"><span className="text-[#736e66]">SUBTOTAL</span><span>products people enjoy</span></div>
                <div className="flex w-full items-center justify-between">
                  <span className="text-[16px] font-semibold tracking-[0.02em]">TOTAL</span>
                  <span className="bg-orange px-3 py-1.5 font-sans text-[22px] font-semibold leading-none tracking-[-0.02em]">worth the hire</span>
                </div>
                <div className="flex w-full justify-between text-[13px] tracking-[0.02em]"><span className="text-[#736e66]">PAID IN</span><span>pixels &amp; patience</span></div>
                <Dashed />
                <div className="flex items-end gap-0.5" aria-hidden="true">
                  {bars.map((w, i) => <span key={i} className="h-[52px] bg-ink" style={{ width: w * 1.5 }} />)}
                </div>
                <p className="text-[12px] tracking-[0.02em] text-[#736e66]">NO REFUNDS ON GOOD TASTE</p>
              </div>
              <img src="/home/receipt-tear-bottom.svg" alt="" width={470} height={12} className="block h-3 w-full" />

              <div data-stamp className="absolute left-[73%] top-[82%] rotate-[14deg] rounded-[28px] border-[2px] border-orange px-3 py-[7px] text-center font-mono leading-none text-orange opacity-90">
                <span className="block text-[15.3px] font-semibold tracking-[0.1em]">APPROVED</span>
                <span className="mt-0.5 block text-[7px] font-medium tracking-[0.12em]">BY ACTUAL USERS</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
