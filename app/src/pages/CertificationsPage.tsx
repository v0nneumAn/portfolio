import { Award, BookOpen, CheckCircle2, ShieldCheck } from 'lucide-react';
import PageHero from '../components/PageHero';
import Reveal from '../components/Reveal';
import SectionHeading from '../components/SectionHeading';

const credentials = [
  { icon: CheckCircle2, status: 'Completed', title: 'C Programming with Linux Professional Certificate', issuer: 'DartmouthX / IMTx · edX', date: 'Completed', text: 'Seven-course program covering C programming, memory management, pointers, advanced data types, the Linux command line, and Linux tools and libraries.' },
  { icon: CheckCircle2, status: 'Completed', title: 'Google Cybersecurity Certificate', issuer: 'Google · Coursera', date: 'Oct 2024', text: 'Security frameworks, network security, incident response, SIEM, Linux, SQL, and Python foundations.' },
  { icon: CheckCircle2, status: 'Completed', title: 'Cisco Network Fundamentals', issuer: 'Cisco Networking Academy', date: '2025', text: 'TCP/IP, subnetting, switching, routing, addressing, and practical network design with Packet Tracer.' },
  { icon: BookOpen, status: 'In progress', title: 'Cisco Cybersecurity Operations', issuer: 'Cisco Networking Academy', date: '2026', text: 'Security operations, incident response, threat analysis, monitoring, and SOC workflows.' },
  { icon: ShieldCheck, status: 'Target', title: 'CompTIA Security+', issuer: 'CompTIA', date: '2026 Q4 target', text: 'Planned industry certification to formalise broad security knowledge. Not yet held.' },
  { icon: Award, status: 'Active', title: 'White Card', issuer: 'SafeWork NSW · CPCCWHS1001', date: 'May 2024', text: 'Construction safety, hazard identification, risk management, and workplace health and safety obligations.' },
];

export default function CertificationsPage() {
  return (
    <>
      <PageHero eyebrow="~/certifications / verified learning" title="Formal learning, grounded in running systems." description="Completed credentials, current study, and future targets are labelled separately — with practical infrastructure work behind the theory." />
      <section className="section">
        <div className="container-shell">
          <Reveal><SectionHeading eyebrow="Credentials" title="Current and planned." /></Reveal>
          <div className="three-col">
            {credentials.map((credential, index) => {
              const Icon = credential.icon;
              return (
                <Reveal key={credential.title} delay={index * .04}>
                  <article className="surface-card content-card h-full flex flex-col">
                    <div className="flex items-center justify-between gap-3"><div className="capability-icon"><Icon size={18} /></div><span className="mono-label">{credential.status}</span></div>
                    <h2 className="text-xl mt-6">{credential.title}</h2>
                    <p className="text-sm text-green mt-2 !mb-0">{credential.issuer}</p>
                    <span className="mono-label block mt-2">{credential.date}</span>
                    <p className="body-copy mt-5">{credential.text}</p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
