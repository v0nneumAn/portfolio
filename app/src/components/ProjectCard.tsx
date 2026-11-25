import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { PointerEvent } from 'react';
import type { Project } from '../data/projects';
import StatusBadge from './StatusBadge';

export default function ProjectCard({ project, index }: { project: Project; index: number }) {
  const handlePointer = (event: PointerEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty('--spot-x', `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty('--spot-y', `${event.clientY - rect.top}px`);
  };

  return (
    <article className="surface-card spotlight-card project-card" onPointerMove={handlePointer}>
      <div className="project-card-top">
        <StatusBadge status={project.status} />
        <span className="project-index">{String(index + 1).padStart(2, '0')} / {project.category}</span>
      </div>
      <h3>{project.title}</h3>
      <p>{project.summary}</p>
      <div className="project-card-footer">
        <div className="tech-list">
          {project.stack.slice(0, 4).map((item) => <span className="tech-pill" key={item}>{item}</span>)}
        </div>
        <Link to={`/projects/${project.slug}`} className="project-arrow" aria-label={`Read ${project.title} case study`}>
          <ArrowUpRight size={17} />
        </Link>
      </div>
      <Link to={`/projects/${project.slug}`} className="absolute inset-0 z-[2]" aria-label={`View ${project.title}`}>
        <span className="sr-only">View case study</span>
      </Link>
    </article>
  );
}
