import type { CSSProperties } from 'react';
import type { Project } from '@/lib/data';
import { Sticky, Tape } from './bits';

const tabOffsets = ['0%', '39%', '58.5%', '19.5%'];

/** `next` renders the static "next up" variant used at the end of a case study. */
export default function Folder({ project, index, next }: { project: Project; index: number; next?: boolean }) {
  const f = project.folder!;
  const href = project.caseStudy ? `/work/${project.slug}` : '/work';
  return (
    <article className={`folder folder-${next ? 'blue folder-next' : f.color}`} style={{ '--i': index, '--tab-x': next ? '0%' : tabOffsets[index % 4] } as CSSProperties}>
      <div className="folder-tab">✦ Project {String(index + 1).padStart(2, '0')}</div>
      <div className="folder-body">
        <div className="folder-text">
          {!next && <p className="folder-label"><span className="dot" />{f.label}</p>}
          <h3>{project.name}</h3>
          <p className="folder-tagline">{f.tagline}</p>
          {next
            ? (project.caseStudy ? <a href={href} className="folder-link">View case study ↗</a> : <span className="folder-link">View case study ↗</span>)
            : <a href={href} className="folder-link">View project ↗</a>}
          {!next && (
            <div className="folder-stats">
              <Sticky color="var(--tape2)" rot={4}>{f.stats[0]}</Sticky>
              <Sticky color="var(--mint)" rot={-3}>{f.stats[1]}</Sticky>
            </div>
          )}
        </div>
        <div className="folder-shot">
          <Tape rot={28} color="rgba(255,255,255,.9)" style={{ left: -34, top: 2 }} />
          <Tape rot={-28} color="rgba(255,255,255,.9)" style={{ right: -34, top: -6 }} />
          <img src={project.img} alt={`${project.name} screens`} />
        </div>
      </div>
    </article>
  );
}
