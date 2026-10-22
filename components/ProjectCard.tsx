import Link from 'next/link';
import type { CSSProperties } from 'react';
import type { Project } from '@/lib/data';
import { Icon } from './icons';
import { Tape } from './bits';

const tilts = [-1.5, 1, -0.6];

export default function ProjectCard({ project, n }: { project: Project; n: number }) {
  const body = (
    <>
      <Tape color={n % 2 ? 'var(--tape1)' : 'var(--tape2)'} rot={2} style={{ left: '50%', top: -13, marginLeft: -45 }} />
      <img src={project.img} alt={`${project.name} cover`} className="card-cover" loading="lazy" />
      <p className="card-meta">{String(n).padStart(2, '0')} · {project.meta}</p>
      <h3>{project.name}</h3>
      <p className="card-desc">{project.desc}</p>
      <div className="card-foot">
        {project.platform && <span className="mini" style={{ background: 'var(--tape2)' }}>{project.platform}</span>}
        {project.timeline && <span className="mini" style={{ background: 'var(--mint)' }}>{project.timeline}</span>}
        <Icon name="arrow" size={16} className="card-arrow" />
      </div>
    </>
  );
  const style = { '--rot': `${tilts[(n - 1) % 3]}deg` } as CSSProperties;
  return project.caseStudy
    ? <Link href={`/work/${project.slug}`} className="card" style={style}>{body}</Link>
    : <article className="card" style={style}>{body}</article>;
}
