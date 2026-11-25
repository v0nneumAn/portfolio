import { Award, BriefcaseBusiness, CheckCircle2, Cloud, MessageSquare, Network, Wrench } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
import Reveal from '../components/Reveal';
import SectionHeading from '../components/SectionHeading';

const milestones = [
  { icon: Cloud, date: '2026', title: 'AWS Associate DevOps Analyst — interview loop passed', text: 'Completed the full Amazon loop with unanimous positive feedback, including the Bar Raiser. Offer-ready pending a role requisition; this was an interview process, not employment.', tag: 'Technical interviews · systems design · operations' },
  { icon: Network, date: 'Jul 2026', title: 'Google Edge Networking SDE — interviewed', text: 'Interviewed for a parallel Edge Networking software development pathway, extending my infrastructure experience into a large-scale global networking context.', tag: 'Networking · distributed systems · communication' },
  { icon: Wrench, date: '2025–Present', title: 'Independent infrastructure engineering', text: 'Designed and operate self-managed production infrastructure: seven network zones, Proxmox, internal PKI, observability, backup and recovery, secure remote access, and public service delivery.', tag: 'Linux · networking · automation · reliability' },
];

const roles = [
  { title: 'Volunteer — Tier 1 IT Support', company: 'The Reconnect Project', period: 'Apr–Jun 2026', description: 'Diagnosed and repaired donated laptops, deployed Windows 10/11, securely wiped storage, documented specifications, and completed quality-assurance checks before devices reached community members.', skills: ['Hardware diagnostics', 'Windows deployment', 'Secure data wiping', 'QA'] },
  { title: 'Volunteer — MSP Shadow', company: 'Managed Services Provider', period: 'One month', description: 'Observed professional ticket triage, client onboarding, escalation, SLA management, and remote-support workflows across multiple customer environments.', skills: ['Ticket triage', 'Remote support', 'Service delivery'] },
  { title: 'Casual labour and hospitality', company: 'EXM Projects · Nico Taouk Building Services · Otto Ristorante', period: '2022–Present', description: 'Hands-on work across construction and hospitality, building reliability, teamwork, communication, time management, and the ability to stay effective under pressure.', skills: ['Reliability', 'Teamwork', 'Customer communication'] },
  { title: 'Rockclimbing Instructor', company: 'St Peters Rockclimbing Gym', period: '2020 · school holidays', description: 'Taught climbing technique and safety protocols to students with different experience levels, combining instruction, risk assessment, and calm group management.', skills: ['Instruction', 'Risk assessment', 'Mentoring'] },
];

export default function ExperiencePage() {
  return (
    <>
      <PageHero eyebrow="~/experience / work + milestones" title="Technical depth, built through ownership." description="Hands-on infrastructure work, technical interview milestones, volunteer IT support, and earlier roles that developed reliability and communication." />
      <section className="section">
        <div className="container-shell">
          <Reveal><SectionHeading eyebrow="Technical milestones" title="Evidence beyond a job title." /></Reveal>
          <div className="grid gap-4">
            {milestones.map((item, index) => {
              const Icon = item.icon;
              return (
                <Reveal key={item.title} delay={index * .05}>
                  <article className="surface-card content-card grid md:grid-cols-[52px_110px_1fr] gap-5 md:gap-7">
                    <div className="capability-icon"><Icon size={20} /></div>
                    <span className="mono-label pt-1">{item.date}</span>
                    <div><h2 className="text-xl">{item.title}</h2><p className="body-copy mt-3">{item.text}</p><span className="mono-label block mt-4 !text-[#65e89b]">{item.tag}</span></div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
      <section className="section section-border bg-[#0a0e0c]/85">
        <div className="container-shell">
          <Reveal><SectionHeading eyebrow="Work history" title="Technical and transferable experience." description="Clear separation between technical work, independent projects, and earlier employment." /></Reveal>
          <div className="timeline">
            {roles.map((role) => (
              <Reveal key={role.title}>
                <article className="timeline-item !grid-cols-1 md:!grid-cols-[150px_1fr]">
                  <span className="timeline-date">{role.period}</span>
                  <div className="timeline-content surface-card content-card !p-6">
                    <h3 className="!text-lg">{role.title}</h3>
                    <span className="block text-sm text-green mt-1">{role.company}</span>
                    <p className="mt-4">{role.description}</p>
                    <div className="tech-list mt-5">{role.skills.map((skill) => <span className="tech-pill" key={skill}>{skill}</span>)}</div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="section-compact">
        <div className="container-shell grid md:grid-cols-3 gap-4">
          {[
            { icon: CheckCircle2, title: 'Systematic', text: 'Isolate layers, test hypotheses, keep evidence.' },
            { icon: MessageSquare, title: 'Clear', text: 'Explain technical work without hiding behind jargon.' },
            { icon: BriefcaseBusiness, title: 'Accountable', text: 'Own the change, the verification, and the documentation.' },
          ].map((item) => {
            const Icon = item.icon;
            return <div className="surface-card capability-card" key={item.title}><Icon size={20} className="text-green" /><h3>{item.title}</h3><p>{item.text}</p></div>;
          })}
        </div>
        <div className="container-shell mt-10"><Link to="/projects" className="button-primary">See the technical work <Award size={15} /></Link></div>
      </section>
    </>
  );
}
