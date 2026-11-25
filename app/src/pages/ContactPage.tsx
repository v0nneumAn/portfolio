import { ArrowUpRight, Check, Copy, Download, Github, Mail, MapPin } from 'lucide-react';
import { useState } from 'react';
import PageHero from '../components/PageHero';
import Reveal from '../components/Reveal';

const email = 'v0nneumAn@proton.me';

export default function ContactPage() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <>
      <PageHero eyebrow="~/contact / open a connection" title="Let’s build something reliable." description="I’m available for infrastructure, DevOps, cloud, technical IT, and junior cybersecurity opportunities in Sydney." />
      <section className="section">
        <div className="container-shell grid lg:grid-cols-[1fr_.8fr] gap-16 lg:gap-24">
          <Reveal>
            <span className="eyebrow">Direct contact</span>
            <h2 className="section-title">No form. No black box.<br />Just email.</h2>
            <p className="body-large mt-6 max-w-xl">If you have a role, a technical problem, or a project worth discussing, send me a note. I’m happy to talk through the work in detail.</p>
            <div className="flex flex-wrap gap-3 mt-8">
              <a href={`mailto:${email}`} className="button-primary"><Mail size={16} />Email Jasper</a>
              <button className="button-secondary" onClick={copyEmail}>{copied ? <Check size={16} /> : <Copy size={16} />}{copied ? 'Email copied' : 'Copy email address'}</button>
            </div>
            <p className="mono-label mt-5 select-all">{email}</p>
            <div className="hero-proof mt-10"><span className="pulse-dot" />Australian citizen · eligible to obtain government security clearance</div>
          </Reveal>
          <Reveal delay={.08}>
            <div className="grid gap-4">
              <a href="https://github.com/v0nneumAn" target="_blank" rel="noopener noreferrer" className="surface-card spotlight-card content-card flex items-center justify-between group"><div className="flex items-center gap-4"><div className="capability-icon"><Github size={18} /></div><div><h2 className="text-lg">GitHub</h2><p className="body-copy !mb-0">Code, releases, and project history</p></div></div><ArrowUpRight size={18} className="text-green" /></a>
              <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="surface-card spotlight-card content-card flex items-center justify-between group"><div className="flex items-center gap-4"><div className="capability-icon"><Download size={18} /></div><div><h2 className="text-lg">Resume</h2><p className="body-copy !mb-0">Current public PDF</p></div></div><ArrowUpRight size={18} className="text-green" /></a>
              <div className="surface-card content-card flex items-center gap-4"><div className="capability-icon"><MapPin size={18} /></div><div><h2 className="text-lg">Sydney, NSW</h2><p className="body-copy !mb-0">Hybrid, on-site, or remote-friendly</p></div></div>
            </div>
          </Reveal>
        </div>
      </section>
      <section className="section-compact section-border bg-[#0a0e0c]/85">
        <div className="container-shell">
          <Reveal><div className="surface-card content-card text-center"><span className="eyebrow">Good fit</span><h2 className="text-2xl mt-5">Infrastructure · DevOps · Cloud · IT Operations · Junior Security</h2><p className="body-copy mt-4 max-w-2xl mx-auto">I bring practical systems experience, careful troubleshooting, clear documentation, and the motivation to keep learning from experienced engineers.</p></div></Reveal>
        </div>
      </section>
    </>
  );
}
