import { ArrowUpRight, Cloud, Code2, Container, Database, Network, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
import Reveal from '../components/Reveal';
import SectionHeading from '../components/SectionHeading';

const groups = [
  { icon: Network, title: 'Networking & infrastructure', description: 'Designing connected systems and proving policy with positive and negative tests.', skills: ['VLANs / 802.1Q', 'OpenWrt / nftables', 'Cisco IOS XE', 'DNS / DHCP / NTP', 'Tailscale / WireGuard', 'TCP/IP troubleshooting'], proof: 'Seven-zone production migration', slug: 'network-segmentation' },
  { icon: Container, title: 'Linux & virtualisation', description: 'Running and recovering services across physical hosts, VMs, LXCs, and containers.', skills: ['Arch / Debian / Ubuntu', 'Proxmox VE', 'Docker / Compose', 'systemd / journald', 'LVM / storage', 'Bash / SSH'], proof: 'Self-managed production platform', slug: 'self-hosted-platform' },
  { icon: ShieldCheck, title: 'Security architecture', description: 'Building controls into identity, network boundaries, runtimes, and operational workflow.', skills: ['PKI / ACME / X.509', 'Least-privilege policy', 'AppArmor / rootless Docker', 'Key rotation / SSH hygiene', 'Cloudflare edge controls', 'Security review'], proof: 'Offline-root internal PKI', slug: 'internal-pki' },
  { icon: Database, title: 'Reliability & observability', description: 'Making system state visible and ensuring recovery is tested before it is needed.', skills: ['Grafana / Loki', 'Prometheus / Promtail', 'rsyslog / structured logs', 'restic / vzdump', 'Restore testing', 'Incident diagnosis'], proof: 'Restore-tested backup architecture', slug: 'backup-recovery' },
  { icon: Code2, title: 'Software & automation', description: 'Building focused tools that remove operational friction and manual failure points.', skills: ['Python 3', 'FastAPI / REST', 'Bash', 'Java / Fabric', 'React / TypeScript', 'Git'], proof: 'Dockerised backup API', slug: 'aws-backup-service' },
  { icon: Cloud, title: 'Cloud foundations', description: 'Applying cost, networking, and operational thinking to a planned AWS deployment.', skills: ['ECS Fargate design', 'S3 / DynamoDB design', 'ALB / VPC endpoints', 'CloudWatch design', 'Cost-aware architecture', 'Terraform — learning'], proof: 'Cost-aware AWS deployment design', slug: 'aws-backup-service' },
];

export default function SkillsPage() {
  return (
    <>
      <PageHero eyebrow="~/skills / capabilities + proof" title="Skills are only useful when they survive contact with reality." description="No arbitrary percentages. These are the capabilities I use, the tools behind them, and the work that demonstrates them." />
      <section className="section">
        <div className="container-shell">
          <Reveal><SectionHeading eyebrow="Capability map" title="What I can operate, build, and explain." /></Reveal>
          <div className="two-col">
            {groups.map((group, index) => {
              const Icon = group.icon;
              return (
                <Reveal key={group.title} delay={index * .04}>
                  <article className="surface-card content-card h-full flex flex-col">
                    <div className="flex items-center gap-4"><div className="capability-icon"><Icon size={19} /></div><h2 className="text-xl">{group.title}</h2></div>
                    <p className="body-copy mt-5">{group.description}</p>
                    <div className="tech-list mt-6">{group.skills.map((skill) => <span className="tech-pill" key={skill}>{skill}</span>)}</div>
                    <Link to={`/projects/${group.slug}`} className="flex items-center gap-2 text-xs text-green mt-auto pt-7">Proof: {group.proof}<ArrowUpRight size={13} /></Link>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
      <section className="section-compact section-border bg-[#0a0e0c]/85">
        <div className="container-shell">
          <Reveal>
            <div className="surface-card content-card grid md:grid-cols-[1fr_auto] items-center gap-7">
              <div><span className="eyebrow">Currently developing</span><h2 className="text-2xl mt-4">Cloud infrastructure as code, deeper CyberOps, and production-safe control loops.</h2><p className="body-copy mt-3">Next up: Terraform for the AWS Backup Service, Cisco Cybersecurity Operations, Security+ preparation, and carefully reviewed fan-control automation.</p></div>
              <Link to="/certifications" className="button-secondary">Learning and certifications</Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
