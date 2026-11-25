import { ArrowUpRight, CheckCircle2, Cloud, Container, GitBranch, Network, Server, ShieldCheck } from 'lucide-react';
import PageHero from '../components/PageHero';
import Reveal from '../components/Reveal';
import SectionHeading from '../components/SectionHeading';

const layers = [
  { icon: Cloud, title: 'Cloudflare edge', text: 'Public DNS, proxied ingress, TLS, HSTS, CAA, bot controls, and an outbound-only tunnel. No router web ports are forwarded.' },
  { icon: Server, title: 'Proxmox host', text: 'An unprivileged LXC on owned server hardware, isolated in the server zone and covered by scheduled backup jobs.' },
  { icon: Container, title: 'Caddy static hosting', text: 'A small web-serving layer with SPA fallback, security headers, internal TLS, and no application server exposed publicly.' },
  { icon: GitBranch, title: 'Git-push deployment', text: 'A bare repository receives main; its post-receive hook checks out source, installs locked dependencies, builds, publishes, and reloads Caddy.' },
  { icon: Network, title: 'Segmented operations', text: 'Management, server, trusted, and remote-access paths follow explicit network policy rather than a flat network.' },
  { icon: ShieldCheck, title: 'Observable and recoverable', text: 'Caddy access logs flow into Loki, the host is monitored, certificates renew automatically, and backups are restore-tested.' },
];

export default function InfrastructurePage() {
  return (
    <>
      <PageHero eyebrow="~/infrastructure / this website" title="This site is part of the portfolio, too." description="Not a managed-site shortcut: a static React build served from an unprivileged container on my own Proxmox host, published through a Cloudflare Tunnel." />
      <section className="section">
        <div className="container-shell">
          <Reveal>
            <div className="surface-card content-card">
              <span className="eyebrow">Request path</span>
              <div className="code-flow mt-6 !text-sm !leading-[2]">{`browser\n   ↓ HTTPS\nCloudflare edge\n   ↓ outbound-only tunnel\nunprivileged LXC in server zone\n   ↓\nCaddy → versioned static build`}</div>
            </div>
          </Reveal>
          <div className="two-col mt-5">
            {layers.map((layer, index) => {
              const Icon = layer.icon;
              return <Reveal key={layer.title} delay={index * .04}><article className="surface-card content-card h-full"><div className="capability-icon"><Icon size={18} /></div><h2 className="text-xl mt-5">{layer.title}</h2><p className="body-copy mt-3 !mb-0">{layer.text}</p></article></Reveal>;
            })}
          </div>
        </div>
      </section>
      <section className="section section-border bg-[#0a0e0c]/85">
        <div className="container-shell grid lg:grid-cols-[.8fr_1.2fr] gap-14">
          <Reveal><SectionHeading eyebrow="Deployment" title="One push. Reproducible output." description="The server builds from the lockfile rather than receiving a workstation-specific bundle." /></Reveal>
          <Reveal delay={.08}>
            <ol className="check-list !gap-5">
              {['Push the reviewed main branch to the deploy remote.', 'The post-receive hook checks out a clean source tree.', 'npm ci installs exact dependency versions.', 'TypeScript checks and Vite produce the static build.', 'The output is synced to the web root and Caddy reloads.', 'Public routes and assets are verified over HTTPS.'].map((step, index) => <li key={step}><span className="key-hint">{String(index + 1).padStart(2, '0')}</span><span>{step}</span></li>)}
            </ol>
            <div className="code-flow mt-7">{`$ cd ~/sandbox/portfolio\n$ ./scripts/deploy.sh\n# git push deploy main`}</div>
          </Reveal>
        </div>
      </section>
      <section className="section">
        <div className="container-shell">
          <Reveal><SectionHeading eyebrow="Operational choices" title="Simple where possible. Deliberate where it matters." /></Reveal>
          <div className="surface-card content-card">
            <ul className="check-list two-col">
              {['Static hosting keeps the public attack surface small.', 'Cloudflare Tunnel avoids inbound router exposure.', 'Self-hosted fonts avoid third-party font requests.', 'Reduced-motion and no-WebGL paths preserve usability.', 'Internal certificates use the lab’s offline-root PKI.', 'Backups and central logs cover the hosting workload.'].map((item) => <li key={item}><CheckCircle2 size={16} /><span>{item}</span></li>)}
            </ul>
          </div>
          <Reveal className="mt-8"><a href="https://jasper.devsnull.net" target="_blank" rel="noopener noreferrer" className="button-secondary">You are here · jasper.devsnull.net <ArrowUpRight size={14} /></a></Reveal>
        </div>
      </section>
    </>
  );
}
