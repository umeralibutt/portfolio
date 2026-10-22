'use client';

import { useState } from 'react';
import { concepts, projects, workTags, type Project, type Tag } from '@/lib/data';
import ProjectCard from './ProjectCard';
import Torn from './Torn';

const filters: { tag: Tag | 'All'; color: string; text?: string }[] = [
  { tag: 'All', color: 'var(--yellow)' },
  { tag: 'Fintech', color: 'var(--mint)' },
  { tag: 'Web3', color: 'var(--blue)', text: '#fff' },
  { tag: 'Trading', color: 'var(--pink)' },
  { tag: 'AI', color: 'var(--tape1)' },
  { tag: 'Concepts', color: 'var(--tape2)' },
];

export default function WorkGrid() {
  const [filter, setFilter] = useState<Tag | 'All'>('All');
  const keep = (p: Project) => filter === 'All' || workTags[p.slug]?.includes(filter);
  const shownProjects = projects.map((p, i) => ({ p, n: i + 1 })).filter(({ p }) => keep(p));
  const shownConcepts = concepts.map((p, i) => ({ p, n: projects.length + i + 1 })).filter(({ p }) => keep(p));

  return (
    <>
      <div className="work-filters-row">
        <div className="work-filters" role="group" aria-label="Filter projects">
          {filters.map((f) => (
            <Torn key={f.tag} color={f.color} text={f.text} active={filter === f.tag} onClick={() => setFilter(f.tag)}>
              {f.tag === 'All' ? `All ${projects.length + concepts.length}` : f.tag}
            </Torn>
          ))}
        </div>
      </div>

      {shownProjects.length > 0 && (
        <div className="card-grid">
          {shownProjects.map(({ p, n }) => <ProjectCard key={p.slug} project={p} n={n} />)}
        </div>
      )}

      {shownConcepts.length > 0 && (
        <section className="concepts">
          <p className="hand-note kicker">side quests, dribbble shots &amp; concepts ↓</p>
          <h2 className="pixel section-title">Concepts &amp; shots</h2>
          <div className="card-grid">
            {shownConcepts.map(({ p, n }) => <ProjectCard key={p.slug} project={p} n={n} />)}
          </div>
        </section>
      )}
    </>
  );
}
