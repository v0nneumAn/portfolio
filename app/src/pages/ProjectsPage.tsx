import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Command } from 'lucide-react';
import { useState } from 'react';
import PageHero from '../components/PageHero';
import ProjectCard from '../components/ProjectCard';
import Reveal from '../components/Reveal';
import { projectCategories, projects } from '../data/projects';
import type { ProjectCategory } from '../data/projects';

export default function ProjectsPage() {
  const [category, setCategory] = useState<'All' | ProjectCategory>('All');
  const reduceMotion = useReducedMotion();
  const filtered = category === 'All' ? projects : projects.filter((project) => project.category === category);

  return (
    <>
      <PageHero
        eyebrow="~/projects / evidence of work"
        title="Systems, software, and the decisions behind them."
        description="Production infrastructure, security architecture, and software projects — with honest status labels and enough technical detail to show how they work."
      />
      <section className="section">
        <div className="container-shell">
          <Reveal>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
              <div className="filter-row" role="group" aria-label="Filter projects by category">
                {projectCategories.map((item) => (
                  <button key={item} className={`filter-button ${category === item ? 'active' : ''}`} onClick={() => setCategory(item)} aria-pressed={category === item}>
                    {item}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2 mono-label"><Command size={12} />{filtered.length} project{filtered.length === 1 ? '' : 's'} in view</div>
            </div>
          </Reveal>
          <motion.div layout className="project-grid">
            <AnimatePresence mode="popLayout">
              {filtered.map((project) => (
                <motion.div
                  layout
                  key={project.slug}
                  initial={reduceMotion ? false : { opacity: 0, scale: .97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={reduceMotion ? undefined : { opacity: 0, scale: .97 }}
                  transition={{ duration: .25 }}
                >
                  <ProjectCard project={project} index={projects.indexOf(project)} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
          <Reveal className="mt-12">
            <div className="surface-card content-card flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
              <div><span className="mono-label">Status legend</span><p className="body-copy mt-2 !mb-0">Production means in regular use. Local MVP and active development are deliberately not presented as deployed cloud or finished products.</p></div>
              <span className="key-hint shrink-0">no inflated claims</span>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
