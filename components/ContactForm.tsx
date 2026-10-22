'use client';

import { useState, type FormEvent } from 'react';
import { site } from '@/lib/data';
import { Icon } from './icons';

const topics = [
  { label: 'Dashboard', icon: 'dash' },
  { label: 'Web app', icon: 'globe' },
  { label: 'Mobile app', icon: 'phone' },
  { label: 'UX audit', icon: 'search' },
  { label: 'Full-time role', icon: 'brief' },
];

type Status = 'idle' | 'sending' | 'sent' | 'error';

/** Posts to Formspree when NEXT_PUBLIC_FORMSPREE_ID is set, otherwise opens a pre-filled email. */
export default function ContactForm() {
  const [topic, setTopic] = useState('Dashboard');
  const [status, setStatus] = useState<Status>('idle');

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get('name') ?? '');
    const email = String(data.get('email') ?? '');
    const message = String(data.get('message') ?? '');

    if (!site.formspreeId) {
      const subject = `${topic} — hi from ${name}`;
      const body = `${message}\n\n— ${name} (${email})`;
      window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      return;
    }

    setStatus('sending');
    try {
      const res = await fetch(`https://formspree.io/f/${site.formspreeId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ name, email, topic, message }),
      });
      setStatus(res.ok ? 'sent' : 'error');
    } catch {
      setStatus('error');
    }
  }

  if (status === 'sent') {
    return (
      <div className="contact-card sent" role="status">
        <p className="pixel">Got it!</p>
        <p>Thanks for the note — I’ll reply within 24 hours.</p>
      </div>
    );
  }

  return (
    <form className="contact-card" onSubmit={onSubmit}>
      <p className="contact-intro">Got a project, a product idea, or just want to say hi? I read every message and reply within 24 hours.</p>

      <label className="field" style={{ '--rot': '0.4deg' } as React.CSSProperties}>
        <Icon name="user" size={18} />
        <span className="sr-only">Your name</span>
        <input name="name" placeholder="Your name" autoComplete="name" required />
      </label>
      <label className="field" style={{ '--rot': '0.3deg' } as React.CSSProperties}>
        <Icon name="mail" size={18} />
        <span className="sr-only">Email</span>
        <input name="email" type="email" placeholder="Email" autoComplete="email" required />
      </label>

      <p className="topic-label" id="topic-label"><Icon name="spark" size={13} />What’s it about?</p>
      <div className="chips" role="group" aria-labelledby="topic-label">
        {topics.map((t) => (
          <button key={t.label} type="button" className={`chip${topic === t.label ? ' on' : ''}`} aria-pressed={topic === t.label} onClick={() => setTopic(t.label)}>
            <Icon name={t.icon} size={13} />{t.label}
          </button>
        ))}
      </div>

      <label className="field field-msg" style={{ '--rot': '-0.4deg' } as React.CSSProperties}>
        <Icon name="msg" size={18} />
        <span className="sr-only">Message</span>
        <textarea name="message" placeholder="Tell me about your product…" rows={5} required />
      </label>

      <button type="submit" className="btn" disabled={status === 'sending'}>
        <span className="btn-sq"><Icon name="arrow" size={14} stroke="#fff" /></span>
        {status === 'sending' ? 'Sending…' : 'Send it'}
      </button>
      {status === 'error' && (
        <p className="form-error" role="alert">That didn’t go through. Try again, or email <a href={`mailto:${site.email}`}>{site.email}</a>.</p>
      )}
    </form>
  );
}
