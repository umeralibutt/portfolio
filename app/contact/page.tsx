import type { Metadata } from 'next';
import { site } from '@/lib/data';
import { Icon } from '@/components/icons';
import { HandArrow, Polaroid } from '@/components/bits';
import { Socials } from '@/components/Nav';
import ContactForm from '@/components/ContactForm';

export const metadata: Metadata = {
  title: 'Contact — Umar Ali Butt',
  description: 'Got a project, a messy dashboard, or just want to say hi? Umar replies within 24 hours.',
};

export default function ContactPage() {
  return (
    <section className="contact">
      <div className="contact-head">
        <p className="hand-note say-hi">say hi</p>
        <h1 className="sel-box sel-blue pixel contact-title"><i /><i /><i /><i />Contact</h1>
      </div>

      <div className="contact-grid">
        <Polaroid src="/me.jpg" alt={site.name} caption="hi, it’s me" rot={5} className="contact-pol-l" />
        <div className="contact-mid">
          <ContactForm />
          <div className="promise">
            <HandArrow w={46} h={36} d="M44 30C30 30 16 22 6 6" end={[6, 6]} head={-125} style={{ left: 0, top: -20 }} />
            <span className="hand-note">(the form works, promise)</span>
          </div>
        </div>
        <Polaroid src="/work/pulse-pair.jpg" alt="Pulse Pair dashboard" caption="recent work" rot={-5} className="contact-pol-r" />
      </div>

      <div className="contact-foot">
        <p className="open"><span className="dot square" />Open to new work &amp; good problems</p>
        <a href={`mailto:${site.email}`} className="contact-email"><Icon name="mail" size={24} />{site.email}</a>
        <Socials />
      </div>
    </section>
  );
}
