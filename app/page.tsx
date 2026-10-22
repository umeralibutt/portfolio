import Link from 'next/link';
import { projects, site } from '@/lib/data';
import { Icon } from '@/components/icons';
import { Btn, HandArrow, Polaroid, Sticky, Tape } from '@/components/bits';
import TickerCard from '@/components/TickerCard';
import Folder from '@/components/Folder';
import Reveal from '@/components/Reveal';

const stats = [
  { n: '12', note: 'products designed & shipped', icon: 'coins', color: 'var(--yellow)', rot: 3 },
  { n: '5+', note: 'years in fintech, web3 & AI', icon: 'users', color: 'var(--mint)', rot: -2 },
  { n: '4 mo', note: 'for Youngs Capital to hit Top-10 broker', icon: 'trophy', color: 'var(--pink)', rot: 2 },
  { n: '<24h', note: 'my reply time. every. time.', icon: 'clock', color: 'var(--tape1)', rot: -3 },
];

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <SelectedWork />
      <Numbers />
      <LetsTalk />
    </>
  );
}

function Hero() {
  return (
    <section className="hero">
      <div className="wrap hero-in">
        <p className="hello">
          hi, my name is
          <svg width="84" height="10" viewBox="0 0 84 10" fill="none" stroke="var(--ink)" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
            <path d="M2 6c6-5 10 3 16 0s10-5 16 0 10 3 16 0 10-5 16 0 10 3 14 0" />
          </svg>
        </p>

        <div className="ticker-wrap">
          <TickerCard />
          <Sticky color="var(--mint)" rot={4} className="deco st-dash">Dashboards &amp; data</Sticky>
          <Sticky color="var(--tape2)" rot={-4} className="deco st-ships">Ships, not just shots</Sticky>
          <Sticky color="var(--yellow)" rot={5} hand className="deco st-role">Product Designer</Sticky>
          <HandArrow w={50} h={56} d="M40 4c5 20 0 36-30 44" end={[10, 48]} head={165} style={{ left: -100, top: 136 }} />
          <Sticky color="var(--mint)" rot={-5} hand className="deco st-city">Islamabad, PK</Sticky>
          <HandArrow w={60} h={30} d="M2 12c14 14 34 12 52-2" end={[54, 10]} head={-25} style={{ left: 'calc(100% - 4px)', top: 186 }} />
        </div>

        <p className="open"><span className="dot blue" />Open to new work &amp; messy dashboards</p>

        <div className="headline-wrap">
          <img src="/me.jpg" alt="" className="avatar av-l" />
          <img src="/me.jpg" alt="" className="avatar av-r" />
          <h1 className="headline">
            I design dashboards <span className="h-ico green"><Icon name="trend" size={22} stroke="#fff" width={2.4} /></span>
            <br />
            that don’t need a manual. <span className="h-ico pink"><Icon name="spark" size={20} stroke="#fff" width={2.4} /></span>
          </h1>
        </div>

        <div className="hero-cta">
          <Btn href="/contact">Hire me</Btn>
          <span className="hand-note">(or just say hi)</span>
        </div>
      </div>
      <svg className="hero-curve" viewBox="0 0 1440 60" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 58C360 2 1080 2 1440 58" fill="none" stroke="#9a9a9a" strokeWidth="1" vectorEffect="non-scaling-stroke" />
      </svg>
    </section>
  );
}

function About() {
  return (
    <Reveal className="about">
      <div className="wrap about-in">
        <p className="hand-note about-me">about me!</p>
        <div className="you deco" aria-hidden="true">
          <svg width="16" height="18" viewBox="0 0 16 18"><path d="M1 1l13 7-6 1.5L5 16z" fill="var(--ink)" /></svg>
          <span>YOU</span>
        </div>

        <span className="sel-box"><i /><i /><i /><i />what’s up</span>

        <Polaroid src="/me.jpg" alt={site.name} caption="2026" rot={-9} className="pol-l" />
        <Polaroid caption="my desk" rot={-8} className="pol-r">
          <div className="desk-ph"><span>your desk</span></div>
        </Polaroid>

        <p className="big-line">
          I’m Umar <img src="/me.jpg" alt="" className="inline-me" /> a product designer in Islamabad who turns messy data{' '}
          <svg className="glyph" viewBox="0 0 24 24" aria-hidden="true"><g fill="var(--yellow)"><rect x="1" y="1" width="10" height="22" rx="2" /><rect x="13" y="1" width="10" height="10" rx="2" /><rect x="13" y="13" width="10" height="10" rx="2" /></g></svg>{' '}
          into screens that feel obvious{' '}
          <svg className="glyph" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 0c1 7 5 11 12 12-7 1-11 5-12 12-1-7-5-11-12-12 7-1 11-5 12-12z" fill="#E5306B" /></svg>
        </p>

        <div className="skills">
          <div className="skill-row">
            <span className="skill" style={{ background: 'var(--yellow)' }}>Dashboard Design</span>
            <span className="skill-ico" style={{ background: 'var(--yellow)', outline: '1.5px dashed var(--ink)', outlineOffset: -4 }}>
              <svg viewBox="0 0 24 24"><g fill="var(--ink)"><rect x="3" y="3" width="8" height="8" rx="1.5" /><rect x="13" y="3" width="8" height="8" rx="1.5" /><rect x="3" y="13" width="8" height="8" rx="1.5" /><path d="M17 12.5l4.5 4.5-4.5 4.5-4.5-4.5z" /></g></svg>
            </span>
            <span className="skill" style={{ background: 'var(--green)' }}>Prototyping</span>
            <span className="skill-ico" style={{ background: 'var(--green)' }}>
              <svg viewBox="0 0 24 24"><g stroke="var(--ink)" strokeWidth="1.6" strokeLinecap="round"><path d="M12 1v4M12 19v4M1 12h4M19 12h4M4.2 4.2l2.8 2.8M17 17l2.8 2.8M4.2 19.8 7 17M17 7l2.8-2.8" /></g><circle cx="12" cy="12" r="4.5" fill="#E5306B" /></svg>
            </span>
          </div>
          <div className="skill-row">
            <span className="skill light" style={{ background: '#E5306B' }}>UX Audits</span>
            <span className="skill-ico" style={{ background: '#E5306B' }}>
              <svg viewBox="0 0 24 24"><path d="M1.5 12S5.5 5 12 5s10.5 7 10.5 7-4 7-10.5 7S1.5 12 1.5 12z" fill="#fff" /><circle cx="12" cy="12" r="4" fill="var(--orange)" /><circle cx="12" cy="12" r="1.6" fill="var(--yellow)" /></svg>
            </span>
            <span className="skill" style={{ background: '#3CC8F0' }}>Design Systems</span>
            <span className="skill-ico" style={{ background: '#3CC8F0' }}>
              <svg viewBox="0 0 24 24"><g fill="var(--ink)"><circle cx="8" cy="9" r="1.5" /><circle cx="16" cy="13" r="1.5" /><circle cx="11" cy="17" r="1.5" /></g><g fill="#E5306B"><circle cx="4" cy="3" r="1.6" /><circle cx="18" cy="6" r="1.6" /><circle cx="20" cy="20" r="1.6" /></g></svg>
            </span>
          </div>
          <p className="hand-note love">← these are my love languages</p>
        </div>
      </div>
    </Reveal>
  );
}

function SelectedWork() {
  return (
    <section className="work">
      <div className="wrap">
        <Reveal as="div">
          <p className="hand-note kicker">stuff i’m proud of ↓</p>
          <h2 className="pixel section-title">Selected work</h2>
        </Reveal>
        <div className="folders">
          {projects.slice(0, 4).map((p, i) => <Folder key={p.slug} project={p} index={i} />)}
        </div>
        <div className="archive">
          <span className="hand-note">+ 13 more in the archive →</span>
          <Link href="/work"><Sticky color="var(--pink)" className="archive-sticky">Legion · Pace · Pulse · Ember · Vion · ZKOP + 7 concepts</Sticky></Link>
        </div>
      </div>
    </section>
  );
}

function Numbers() {
  return (
    <Reveal className="numbers">
      <div className="wrap">
        <p className="hand-note kicker">receipts, not vibes</p>
        <h2 className="pixel section-title">In numbers</h2>
        <div className="stat-grid">
          {stats.map((s) => (
            <div key={s.n} className="stat" style={{ background: s.color, '--rot': `${s.rot}deg` } as React.CSSProperties}>
              <Tape color="var(--tape2)" style={{ left: '50%', top: -13, marginLeft: -45 }} />
              <strong>{s.n}</strong>
              <p>{s.note}</p>
              <Icon name={s.icon} size={22} className="stat-ico" />
            </div>
          ))}
        </div>
      </div>
    </Reveal>
  );
}

function LetsTalk() {
  const bars = [2, 4, 3, 6, 5, 8];
  return (
    <Reveal className="talk">
      <div className="wrap talk-in">
        <div className="talk-top">
          <svg width="112" height="112" viewBox="0 0 112 112" aria-hidden="true">
            {bars.map((h, i) => {
              const x = i * 19;
              const top = 112 - h * 13;
              return (
                <g key={i}>
                  <rect x={x} y={top} width="15" height={h * 13} fill="var(--ink)" />
                  <rect x={x + 1} y={top + 1} width="13" height="11" fill="var(--lime)" />
                </g>
              );
            })}
          </svg>
          <span className="hand-note psst">psst — still here?</span>
        </div>
        <h2 className="pixel talk-title">Let’s talk</h2>
        <p className="talk-sub">Got a messy dashboard, a half-baked idea, or just want to say hi?<br />Send it over — I reply within 24 hours.</p>
        <div className="talk-cta">
          <a href={`mailto:${site.email}`} className="mail-sticky">
            <span className="mono-sm"><Icon name="mail" size={13} />Drop a line</span>
            <strong>{site.email}</strong>
          </a>
          <Btn href="/contact">Start a project</Btn>
        </div>
      </div>
    </Reveal>
  );
}
