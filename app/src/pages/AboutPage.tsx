import { BookOpen, Compass, DraftingCompass, Mountain, Network, ShieldCheck, Terminal, Wrench } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
import Reveal from '../components/Reveal';
import SectionHeading from '../components/SectionHeading';

const principles = [
  { icon: Wrench, title: 'Build to understand', text: 'I turn concepts into running systems. A design is not finished until I have tested the failure paths as well as the happy path.' },
  { icon: ShieldCheck, title: 'Make security structural', text: 'Isolation, identity, and recovery work best when they are part of the architecture rather than a final hardening pass.' },
  { icon: BookOpen, title: 'Leave a usable trail', text: 'Runbooks, decisions, and post-incident notes make the next change safer and turn troubleshooting into reusable knowledge.' },
];

export default function AboutPage() {
  return (
    <>
      <PageHero eyebrow="~/about / operator profile" title="Self-taught by choice. Production-tested by necessity." description="I’m Jasper, a Sydney-based infrastructure and security practitioner who learns by building systems other people rely on." />
      <section className="section">
        <div className="container-shell grid lg:grid-cols-[1.15fr_.85fr] gap-14 lg:gap-24">
          <Reveal>
            <span className="eyebrow">Background</span>
            <h2 className="section-title">Curiosity, with an operational budget.</h2>
            <div className="space-y-5 mt-7 body-copy">
              <p>My main classroom is a self-managed production environment providing household DNS, applications, monitoring, certificates, backups, and remote access. That means design choices have consequences: a careless change can interrupt real people, and a good one removes recurring work.</p>
              <p>I’m most at home around Linux, networking, virtualisation, and automation. I enjoy moving between layers — from a Python service or firewall rule to packet captures, certificate chains, and the physical hardware underneath.</p>
              <p>I completed a Google Cybersecurity Certificate, Cisco Network Fundamentals, and the DartmouthX/IMTx C Programming with Linux Professional Certificate. I also maintain more than 26,000 words of technical documentation.</p>
            </div>
            <Link to="/experience" className="button-secondary mt-8">See experience and milestones</Link>
          </Reveal>
          <Reveal delay={.08}>
            <div className="surface-card content-card">
              <div className="flex items-center justify-between"><span className="mono-label">Operator.conf</span><Terminal size={18} className="text-green" /></div>
              <div className="code-flow mt-6">{`location   = "Sydney, NSW"\nfocus      = ["infrastructure", "devops", "security"]\napproach   = "evidence-led"\nclearance  = "eligible to obtain"\nworkRights = "Australian citizen"\nstatus     = "open to opportunities"`}</div>
              <p className="body-copy mt-5 !mb-0 !text-sm">I bring hands-on technical depth, clear documentation, and a calm, layered approach to diagnosing unfamiliar systems.</p>
            </div>
          </Reveal>
        </div>
      </section>
      <section className="section section-border bg-[#0a0e0c]/85">
        <div className="container-shell">
          <Reveal><SectionHeading eyebrow="Operating principles" title="How I approach the work." /></Reveal>
          <div className="three-col">
            {principles.map((item, index) => {
              const Icon = item.icon;
              return <Reveal key={item.title} delay={index * .06}><div className="surface-card capability-card h-full"><div className="capability-icon"><Icon size={18} /></div><h3>{item.title}</h3><p>{item.text}</p></div></Reveal>;
            })}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container-shell grid lg:grid-cols-2 gap-14">
          <Reveal>
            <span className="eyebrow">Outside the terminal</span>
            <h2 className="section-title">Still curious offline.</h2>
            <div className="grid gap-4 mt-8">
              {[
                { icon: Mountain, title: 'Rock climbing', text: 'Former instructor; interested in movement, risk assessment, and deep-water soloing.' },
                { icon: Compass, title: 'Travel', text: 'Budget travel across Southeast Asia, learning to adapt quickly and plan with imperfect information.' },
                { icon: DraftingCompass, title: 'Systems and design', text: 'Minecraft automation, science and technology policy, and understanding how complex pieces fit together.' },
              ].map((item) => {
                const Icon = item.icon;
                return <div key={item.title} className="flex gap-4"><div className="capability-icon shrink-0"><Icon size={17} /></div><div><h3 className="font-semibold">{item.title}</h3><p className="body-copy mt-1">{item.text}</p></div></div>;
              })}
            </div>
          </Reveal>
          <Reveal delay={.08}>
            <div className="surface-card content-card h-full">
              <Network size={24} className="text-green" />
              <h2 className="text-2xl mt-6">What I’m looking for</h2>
              <p className="body-copy mt-4">A team where I can contribute practical systems knowledge and keep growing across infrastructure, cloud, DevOps, technical support, or cybersecurity.</p>
              <ul className="check-list mt-6">
                {['Infrastructure and systems operations', 'Junior DevOps and cloud engineering', 'Technical IT operations and support', 'Junior network or security engineering'].map((item) => <li key={item}>{item}</li>)}
              </ul>
              <p className="mono-label mt-8">Sydney metro · hybrid or on-site · full-time</p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
