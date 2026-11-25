import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, CheckCircle2, Cloud, Code2, Database, Download, Network, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import NetworkTopology from '../components/NetworkTopology';
import ProjectCard from '../components/ProjectCard';
import Reveal from '../components/Reveal';
import SectionHeading from '../components/SectionHeading';
import { featuredProjects } from '../data/projects';

const milestones = [
  { date: '06 Nov 2026', title: 'Finished the seven-zone production migration', text: 'Retired the legacy flat network after DNS, NTP, ACME, logging, management, public ingress, and negative isolation tests passed.' },
  { date: '27 Oct 2026', title: 'Rotated and audited infrastructure access', text: 'Deployed new host and service identities, restricted backup access, and automated a recurring SSH hygiene audit.' },
  { date: '2026', title: 'Passed the AWS technical interview loop', text: 'Received unanimous positive feedback, including the Bar Raiser, for an Associate DevOps Analyst role. Offer requisition is pending.' },
];

const capabilities = [
  { icon: Network, title: 'Networks that enforce intent', text: 'VLANs, routing, DNS, DHCP, NTP, firewalls, and remote access designed as one coherent system.' },
  { icon: Cloud, title: 'Infrastructure with a recovery plan', text: 'Proxmox, containers, staged changes, scheduled backups, restore tests, and rollback paths.' },
  { icon: ShieldCheck, title: 'Security by architecture', text: 'Offline trust anchors, least-privilege service rules, hardened runtimes, and scoped credentials.' },
  { icon: Database, title: 'Observable by default', text: 'Structured logs, useful metrics, and dashboards built around real troubleshooting questions.' },
  { icon: Code2, title: 'Automation where it matters', text: 'Python, Bash, FastAPI, and deployment tooling that removes repetitive failure points.' },
  { icon: CheckCircle2, title: 'Evidence over adjectives', text: 'Every claim is backed by something running, measured, tested, or clearly labelled as in progress.' },
];

export default function Home() {
  const reduceMotion = useReducedMotion();
  const enter = (delay: number) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 22 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: .7, delay, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  });

  return (
    <>
      <section className="hero noise">
        <div className="absolute inset-0 grid-bg pointer-events-none" />
        <div className="absolute top-[-20%] left-[-10%] w-[55vw] h-[55vw] rounded-full bg-[#65e89b]/[.035] blur-[100px] pointer-events-none" />
        <div className="container-shell hero-grid relative">
          <div className="hero-copy">
            <motion.div {...enter(0)} className="eyebrow">Jasper Hale · Sydney / Australia</motion.div>
            <motion.h1 {...enter(.08)} className="display-title">
              I build systems<br />that <span className="text-green">hold up.</span>
            </motion.h1>
            <motion.p {...enter(.16)} className="body-large mt-7 max-w-xl">
              Infrastructure, DevOps, and cybersecurity practitioner running real services on owned hardware — from network design and secure deployment to observability and recovery.
            </motion.p>
            <motion.div {...enter(.24)} className="hero-actions">
              <Link to="/projects" className="button-primary">Explore selected work <ArrowRight size={15} /></Link>
              <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="button-secondary"><Download size={15} /> Download resume</a>
            </motion.div>
            <motion.div {...enter(.3)} className="hero-proof">
              <span className="pulse-dot" />Available for infrastructure, DevOps, and junior security roles
            </motion.div>
            <motion.div {...enter(.36)} className="hidden lg:flex items-center gap-2 mt-12 mono-label">
              <span className="key-hint">ctrl</span><span className="key-hint">k</span> quick navigation
            </motion.div>
          </div>
          <motion.div
            className="topology-wrap"
            initial={reduceMotion ? false : { opacity: 0, scale: .96, x: 24 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: .9, delay: .18, ease: [0.16, 1, 0.3, 1] }}
          >
            <NetworkTopology />
          </motion.div>
        </div>
      </section>

      <section className="section-compact section-border bg-[#0a0e0c]/90">
        <div className="container-shell grid grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-6">
          {[
            ['7', 'production network zones'],
            ['26k+', 'words of technical documentation'],
            ['2+', 'years operating real infrastructure'],
            ['0', 'inbound web ports exposed'],
          ].map(([value, label]) => (
            <Reveal key={label}>
              <div className="metric-value">{value}</div>
              <div className="metric-label">{label}</div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="container-shell">
          <Reveal>
            <SectionHeading
              eyebrow="Selected work / 01"
              title="Built for the real world, not a demo shelf."
              description="A selection of production systems and active software builds. Each case study shows the problem, architecture, and measurable result."
              action={<Link to="/projects" className="button-ghost">View all projects <ArrowUpRight size={15} /></Link>}
            />
          </Reveal>
          <div className="project-grid">
            {featuredProjects.map((project, index) => (
              <Reveal key={project.slug} delay={index * .06}><ProjectCard project={project} index={index} /></Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-border bg-[#0a0e0c]/85">
        <div className="container-shell grid lg:grid-cols-[.8fr_1.2fr] gap-14 lg:gap-24">
          <Reveal>
            <span className="eyebrow">Recently shipped / 02</span>
            <h2 className="section-title">Current work.<br />Verifiable progress.</h2>
            <p className="body-copy mt-5">The lab is not a static showroom. It is a changing production environment with incidents, design trade-offs, and follow-through.</p>
            <Link to="/experience" className="button-ghost mt-6 !pl-0">Experience and milestones <ArrowRight size={14} /></Link>
          </Reveal>
          <Reveal delay={.08}>
            <div className="timeline">
              {milestones.map((item) => (
                <div className="timeline-item" key={item.title}>
                  <span className="timeline-date">{item.date}</span>
                  <div className="timeline-content"><h3>{item.title}</h3><p>{item.text}</p></div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container-shell">
          <Reveal><SectionHeading eyebrow="How I work / 03" title="The operational details are the product." description="Good infrastructure is not just a clean diagram. It is how the system behaves during change, failure, and recovery." /></Reveal>
          <div className="capability-grid">
            {capabilities.map((item, index) => {
              const Icon = item.icon;
              return (
                <Reveal key={item.title} delay={index * .045}>
                  <div className="surface-card spotlight-card capability-card h-full">
                    <div className="capability-icon"><Icon size={18} /></div>
                    <h3>{item.title}</h3><p>{item.text}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-compact">
        <div className="container-shell">
          <Reveal>
            <div className="surface-card content-card flex flex-col md:flex-row md:items-center justify-between gap-8 !p-8 md:!p-12">
              <div>
                <span className="eyebrow">Open a connection</span>
                <h2 className="section-title">Have a real problem to solve?</h2>
                <p className="body-copy mt-4 max-w-xl">I’m looking for a team where curiosity, operational ownership, and careful engineering matter.</p>
              </div>
              <Link to="/contact" className="button-primary shrink-0">Start a conversation <ArrowUpRight size={15} /></Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
