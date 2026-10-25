'use client';

import { useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react';
import { site } from '@/lib/data';
import { SocialCircle, socialLinks } from '../site/Socials';
import { Line, fluid } from '../site/type';
import { Arrow, ArrowUpRight, Check, Copy } from '../site/icons';

const topics = ['Product design', 'Dashboard', 'Design system', 'Prototype', 'Brand', 'Something weird'];
type Status = 'idle' | 'sending' | 'sent' | 'error';

/** Figma "06 Contact" 235:472 — header, the three-step form and the contact info column. */
export default function ContactPage() {
  return (
    <div className="bg-bone">
      <header className="gutter flex flex-col items-start gap-3 pb-12 pt-[124px] lg:pb-[72px] lg:pt-[193px]">
        <h1 data-lines data-hero>
          <Line driftOut={-1} className="flex items-baseline gap-x-6 whitespace-nowrap">
            <span className="font-display leading-[0.86]" style={{ fontSize: fluid(200, 96) }}>SAY</span>
            <span className="font-serif italic leading-[0.8] text-orange" style={{ fontSize: fluid(229, 110) }}>hi.</span>
          </Line>
        </h1>
        <p className="font-serif italic leading-[1.21] text-mute" style={{ fontSize: fluid(40, 28) }}>or don’t. (please do.)</p>
      </header>

      <div className="gutter flex flex-col gap-16 pb-20 lg:flex-row lg:items-start lg:pb-[100px]">
        <ContactForm />
        <Info />
      </div>
    </div>
  );
}

function Step({ n, title, hint, children }: { n: string; title: string; hint?: string; children: ReactNode }) {
  return (
    <fieldset className="flex min-w-0 flex-col gap-[18px]">
      <legend className="contents">
        <span className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <span className="text-[13px] font-semibold leading-[1.21] tracking-[0.1em] text-orange-deep">{n}</span>
          <span className="font-display leading-none" style={{ fontSize: fluid(36, 30) }}>{title}</span>
          {hint && <span className="font-serif text-[22px] italic leading-[1.21] text-mute">{hint}</span>}
        </span>
      </legend>
      {children}
    </fieldset>
  );
}

/** A Figma "Input" box: small caps label on top, value below; lifts and turns orange on focus. */
function Field({ label, name, type = 'text', placeholder, area, autoComplete }: { label: string; name: string; type?: string; placeholder: string; area?: boolean; autoComplete?: string }) {
  const input = 'peer block w-full bg-transparent px-[18px] pb-4 pt-[36px] text-[20px] font-medium leading-[1.21] tracking-[-0.01em] outline-none placeholder:text-mute/55';
  return (
    <label className={`group relative block min-w-0 flex-1 rounded-[16px] border border-ink/[0.08] bg-[#f6f4ee] transition-[background-color,border-color,box-shadow,translate] duration-300 ease-brand focus-within:-translate-y-0.5 focus-within:border-orange focus-within:bg-white focus-within:shadow-[0_0_0_1px_var(--color-orange),0_0_0_5px_rgb(255_77_0/0.15)] ${area ? 'h-[150px] flex-none' : 'h-20'}`}>
      <span className="absolute left-[18px] top-[14px] text-[12px] font-semibold uppercase leading-[1.21] tracking-[0.08em] text-mute transition-colors group-focus-within:text-orange-deep">{label}</span>
      {area ? (
        <textarea name={name} required placeholder={placeholder} className={`${input} h-full resize-none`} />
      ) : (
        <input name={name} type={type} required placeholder={placeholder} autoComplete={autoComplete} className={input} />
      )}
    </label>
  );
}

function ContactForm() {
  const [picked, setPicked] = useState<string[]>([]);
  const [status, setStatus] = useState<Status>('idle');
  const toggle = (t: string) => setPicked((p) => (p.includes(t) ? p.filter((x) => x !== t) : [...p, t]));

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get('name') ?? '');
    const email = String(data.get('email') ?? '');
    const message = String(data.get('message') ?? '');
    const about = picked.length ? picked.join(', ') : 'Not sure yet';

    // No Formspree ID configured yet: fall back to the visitor's mail app.
    if (!site.formspreeId) {
      const body = `${message}\n\nWhat we're making: ${about}\n\nFrom: ${name} (${email})`;
      window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(`Hi from ${name}`)}&body=${encodeURIComponent(body)}`;
      return;
    }

    setStatus('sending');
    try {
      const res = await fetch(`https://formspree.io/f/${site.formspreeId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ name, email, about, message }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus('sent');
      form.reset();
      setPicked([]);
    } catch {
      setStatus('error');
    }
  }

  return (
    <div className="flex min-w-0 flex-1 flex-col items-center gap-[34px]">
      <form onSubmit={onSubmit} className="flex w-full flex-col gap-11 rounded-[28px] bg-white p-6 sm:p-[52px]">
        <Step n="01" title="WHAT ARE WE MAKING?" hint="pick all that apply">
          <div className="flex flex-wrap gap-2.5">
            {topics.map((t) => {
              const on = picked.includes(t);
              return (
                <button
                  key={t}
                  type="button"
                  aria-pressed={on}
                  onClick={() => toggle(t)}
                  className={`flex items-center gap-2 rounded-full border-[1.5px] py-3 text-[16px] font-semibold leading-[1.21] transition-[background-color,border-color,color,scale,padding] duration-300 ease-[cubic-bezier(0.34,1.8,0.64,1)] active:scale-90 ${on ? 'border-ink bg-ink pl-3.5 pr-5 text-bone' : 'border-ink/20 px-5 hover:border-ink'}`}
                >
                  {on && (
                    <span className="grid size-[22px] place-items-center rounded-full bg-orange text-ink">
                      <Check className="size-[13px]" strokeWidth={3} />
                    </span>
                  )}
                  {t}
                </button>
              );
            })}
          </div>
        </Step>

        <Step n="02" title="WHO’S ASKING?">
          <div className="flex flex-col gap-5 sm:flex-row">
            <Field label="Your name" name="name" placeholder="What should I call you?" autoComplete="name" />
            <Field label="Email" name="email" type="email" placeholder="you@company.com" autoComplete="email" />
          </div>
        </Step>

        <Step n="03" title="THE GOSSIP" hint="what’s the product, what’s broken?">
          <Field label="Message" name="message" placeholder="Tell me everything. Links, deadlines, villains…" area />
        </Step>

        <div className="flex flex-wrap items-center gap-4">
          <button
            type="submit"
            disabled={status === 'sending'}
            data-magnetic
            className="group inline-flex items-center gap-3 rounded-full bg-orange py-4 pl-7 pr-4 text-[18px] font-semibold leading-[1.21] text-ink transition-[scale,background-color] duration-200 active:scale-[0.92] disabled:opacity-70"
          >
            {status === 'sending' ? 'Sending…' : 'Send it'}
            <span className="grid size-8 place-items-center rounded-full bg-ink text-bone">
              <Arrow className="size-4 transition-transform duration-300 ease-brand group-hover:translate-x-0.5" />
            </span>
          </button>
          <p className="font-serif text-[20px] italic leading-[1.21] text-mute">No spam. No newsletter. Just me.</p>
        </div>
      </form>

      <p role="status" aria-hidden={status !== 'sent' && status !== 'error'} className={`rounded-full px-[18px] py-2.5 text-[13px] font-semibold leading-[1.21] transition-[opacity,translate] duration-500 ease-brand ${status === 'sent' || status === 'error' ? 'translate-y-0 opacity-100' : 'pointer-events-none -translate-y-2 opacity-0'} ${status === 'error' ? 'bg-orange text-ink' : 'bg-ink text-bone'}`}>
        {/* Always holds text so the hidden toast keeps its height and nothing jumps when it appears. */}
        {status === 'error' ? <>That didn’t go through. Email me at {site.email}?</> : 'Sent. Faster than your last designer replies.'}
      </p>
    </div>
  );
}

function Info() {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const time = useIslamabadTime();

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${site.email}`;
    }
  };

  const order = ['linkedin', 'dribbble', 'upwork', 'behance'];
  const links = [...socialLinks].sort((a, b) => order.indexOf(a.key) - order.indexOf(b.key));

  return (
    <aside data-rows className="flex w-full shrink-0 flex-col gap-10 pt-2 lg:w-[400px]">
      <InfoBlock label="Email">
        <div className="flex flex-wrap items-center gap-3">
          <a href={`mailto:${site.email}`} className="text-[22px] font-medium leading-[1.21] tracking-[-0.02em] transition-colors hover:text-orange">{site.email}</a>
          <button type="button" onClick={copy} className="inline-flex items-center gap-1.5 rounded-full border border-ink/20 px-2.5 py-1.5 text-[12px] font-semibold leading-[1.21] transition-colors hover:border-ink">
            {copied ? <Check className="size-[13px] text-orange" strokeWidth={3} /> : <Copy className="size-[13px]" />}
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>
      </InfoBlock>

      <InfoBlock label="Elsewhere">
        <ul>
          {links.map((s, i) => (
            <li key={s.key} className={i ? 'border-t border-ink/12' : ''}>
              <a href={s.href} target="_blank" rel="noreferrer" className="group flex items-center justify-between py-3.5">
                <span className="flex items-center gap-3">
                  <SocialCircle network={s.key} size={28} />
                  <span className="text-[20px] font-medium leading-[1.21] transition-colors group-hover:text-orange">{s.label}</span>
                </span>
                <ArrowUpRight className="size-5 transition-transform duration-300 ease-brand group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </li>
          ))}
        </ul>
      </InfoBlock>

      <InfoBlock label="My local time">
        <p className="flex items-center gap-2.5 text-[18px] font-medium leading-[1.21]">
          <span className="relative size-2 rounded-full bg-[#22C55E]" aria-hidden="true">
            <span className="absolute inset-0 animate-ping rounded-full bg-[#22C55E]/60 motion-reduce:hidden" />
          </span>
          Islamabad · <span suppressHydrationWarning>{time}</span> (GMT+5)
        </p>
      </InfoBlock>

      <InfoBlock label="Reply time">
        <p className="font-serif text-[28px] italic leading-[1.21]">Fast. Like, suspiciously fast.</p>
      </InfoBlock>
    </aside>
  );
}

function InfoBlock({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-[12px] font-semibold uppercase leading-[1.21] tracking-[0.12em] text-mute">{label}</p>
      {children}
    </div>
  );
}

/** Umar's wall clock, ticking once a minute. */
function useIslamabadTime() {
  const fmt = () => new Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Karachi', hour: 'numeric', minute: '2-digit' }).format(new Date());
  const [t, setT] = useState('');
  useEffect(() => {
    setT(fmt());
    const id = setInterval(() => setT(fmt()), 20_000);
    return () => clearInterval(id);
  }, []);
  return t;
}
