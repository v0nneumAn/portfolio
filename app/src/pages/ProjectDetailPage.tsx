import { ArrowLeft, ArrowRight, ArrowUpRight, CheckCircle2, GitBranch, Target } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import PageHero from '../components/PageHero';
import Reveal from '../components/Reveal';
import StatusBadge from '../components/StatusBadge';
import { getProject, projects } from '../data/projects';

export default function ProjectDetailPage() {
  const { slug } = useParams();
  const project = getProject(slug);

  if (!project) {
    return (
      <section className="page-hero min-h-[70vh]">
        <div className="container-shell"><span className="eyebrow">404 / unknown project</span><h1 className="display-title page-title">No such workload.</h1><Link to="/projects" className="button-primary mt-8"><ArrowLeft size={15} />Back to projects</Link></div>
      </section>
    );
  }

  const projectIndex = projects.indexOf(project);
  const next = projects[(projectIndex + 1) % projects.length];

  return (
    <>
      <PageHero eyebrow={`~/projects/${project.slug}`} title={project.title} description={project.summary} />
      <section className="section-compact section-border">
        <div className="container-shell">
          <div className="flex flex-wrap items-center justify-between gap-5">
            <div className="flex items-center gap-4"><StatusBadge status={project.status} /><span className="mono-label">{project.category} · {project.period}</span></div>
            <Link to="/projects" className="button-ghost !pl-0"><ArrowLeft size={14} />All projects</Link>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-10">
            {project.metrics.map((metric) => (
              <div key={metric.label} className="surface-card p-4 sm:p-6"><div className="metric-value !text-[clamp(22px,4vw,38px)]">{metric.value}</div><div className="metric-label">{metric.label}</div></div>
            ))}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container-shell grid lg:grid-cols-[1.2fr_.8fr] gap-14 lg:gap-20">
          <div>
            <Reveal>
              <span className="eyebrow">The build</span>
              <p className="body-large mt-6 !text-[#edf5ef]">{project.description}</p>
              <div className="mt-10">
                <h2 className="font-heading text-2xl mb-6">What went into it</h2>
                <ul className="check-list">
                  {project.highlights.map((highlight) => <li key={highlight}><CheckCircle2 size={16} /><span>{highlight}</span></li>)}
                </ul>
              </div>
            </Reveal>
            <Reveal className="mt-12">
              <div className="surface-card content-card">
                <Target size={22} className="text-green" />
                <h2 className="text-2xl mt-5">Outcome</h2>
                <p className="body-copy mt-3 !mb-0">{project.outcome}</p>
              </div>
            </Reveal>
          </div>
          <aside>
            <Reveal delay={.08}>
              <div className="surface-card content-card">
                <GitBranch size={20} className="text-cyan" />
                <h2 className="text-xl mt-5">Architecture</h2>
                <div className="code-flow mt-5">{project.architecture.join('\n\n')}</div>
              </div>
              <div className="surface-card content-card mt-4">
                <span className="mono-label">Technologies</span>
                <div className="tech-list mt-5">{project.stack.map((item) => <span className="tech-pill" key={item}>{item}</span>)}</div>
              </div>
              {project.links && (
                <div className="surface-card content-card mt-4">
                  <span className="mono-label">External links</span>
                  <div className="flex flex-col items-start gap-3 mt-4">
                    {project.links.map((link) => <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" className="text-sm text-green flex items-center gap-2">{link.label}<ArrowUpRight size={13} /></a>)}
                  </div>
                </div>
              )}
            </Reveal>
          </aside>
        </div>
      </section>
      <section className="section-compact section-border">
        <div className="container-shell flex justify-end">
          <Link to={`/projects/${next.slug}`} className="group text-right">
            <span className="mono-label">Next case study</span>
            <span className="flex items-center gap-3 font-heading text-2xl mt-2 group-hover:text-green">{next.title}<ArrowRight size={20} /></span>
          </Link>
        </div>
      </section>
    </>
  );
}
