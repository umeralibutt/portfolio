import Link from 'next/link';
import type { CaseStudy } from '@/lib/cases';
import { caseStudies } from '@/lib/cases';
import { concepts, projects } from '@/lib/data';
import { Tape } from './bits';

/** The coloured "next up" folder at the end of a case study. */
export default function NextUp({ next }: { next: CaseStudy['next'] }) {
  const target = [...projects, ...concepts].find((p) => p.slug === next.slug);
  if (!target) return null;
  const concept = caseStudies[next.slug]?.kind === 'concept';
  const href = `/work/${next.slug}`;
  return (
    <article className={`folder folder-${next.color} folder-next`}>
      <div className="folder-tab">✦ Next {concept ? 'concept' : 'project'}</div>
      <div className="folder-body">
        <div className="folder-text">
          <h3>{target.name}</h3>
          <p className="folder-tagline">{next.blurb}</p>
          <Link href={href} className="folder-link">{concept ? 'View concept' : 'View case study'} ↗</Link>
        </div>
        <Link href={href} className="folder-shot" aria-label={target.name}>
          <Tape rot={28} color="rgba(255,255,255,.9)" style={{ left: -34, top: 2 }} />
          <Tape rot={-28} color="var(--tape1)" style={{ right: -34, top: -6 }} />
          <img src={target.img} alt="" />
        </Link>
      </div>
    </article>
  );
}
