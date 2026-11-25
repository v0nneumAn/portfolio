export type ProjectCategory = 'Infrastructure' | 'Software' | 'Security';
export type ProjectStatus = 'Production' | 'Complete' | 'Active development' | 'Local MVP' | 'Retired';

export interface ProjectLink {
  label: string;
  href: string;
}

export interface Project {
  slug: string;
  title: string;
  shortTitle: string;
  category: ProjectCategory;
  status: ProjectStatus;
  period: string;
  summary: string;
  description: string;
  outcome: string;
  stack: string[];
  highlights: string[];
  architecture: string[];
  metrics: { value: string; label: string }[];
  featured?: boolean;
  links?: ProjectLink[];
}

export const projects: Project[] = [
  {
    slug: 'network-segmentation',
    title: 'Production Network Segmentation',
    shortTitle: 'Network Segmentation',
    category: 'Infrastructure',
    status: 'Production',
    period: 'Aug–Nov 2026',
    summary: 'Rebuilt a flat household network into seven isolated zones without losing the services everyone depends on.',
    description: 'A staged production migration across OpenWrt, Cisco switching, Proxmox, wireless access points, DNS, PKI, and remote access. Every phase had backups, explicit verification, and a rollback path before the legacy network was retired.',
    outcome: 'The legacy flat network is fully retired. Management, servers, trusted clients, IoT, guest, cameras, and DMZ now have separate policy boundaries, with core services verified after cutover.',
    stack: ['OpenWrt', 'Cisco IOS XE', 'VLAN / 802.1Q', 'nftables', 'Proxmox VE', 'Pi-hole', 'Tailscale'],
    highlights: [
      'Designed seven zones with consistent addressing, DHCP, DNS, and NTP behaviour.',
      'Migrated live server and management planes while preserving certificates, cluster quorum, and public access.',
      'Replaced temporary migration access with narrow service rules and verified both allowed and denied paths.',
      'Diagnosed loop, logging, routing, wireless, and firewall faults from runtime evidence rather than assumptions.',
    ],
    architecture: ['Client zones → Cisco switching → OpenWrt policy', 'Server and management zones → Proxmox / Pi-hole', 'Tailscale → approved management, server, and trusted routes'],
    metrics: [{ value: '7', label: 'isolated zones' }, { value: '0', label: 'legacy hosts remaining' }, { value: '100%', label: 'core acceptance passed' }],
    featured: true,
    links: [
      {
        label: 'Full case study on GitHub',
        href: 'https://github.com/v0nneumAn/homelab/blob/main/case-studies/network-segmentation/README.md',
      },
    ],
  },
  {
    slug: 'internal-pki',
    title: 'Internal Certificate Authority',
    shortTitle: 'Internal PKI',
    category: 'Security',
    status: 'Production',
    period: '2026',
    summary: 'A two-tier private PKI with an offline root, ACME issuance, and failure-safe certificate renewal.',
    description: 'Built an offline root CA and an online step-ca intermediate on Proxmox. The root key stays in a VM with no network interfaces; the intermediate issues internal service certificates through ACME.',
    outcome: 'Internal management and application services use trusted certificates with automated renewals. A reusable wrapper guarantees service cleanup even when a renewal fails.',
    stack: ['step-ca', 'ACME', 'X.509', 'Proxmox VE', 'Bash', 'OpenSSL'],
    highlights: [
      'Offline root signing and controlled intermediate transfer.',
      'ACME enrolment across routers, hypervisors, DNS, monitoring, and web services.',
      'Reusable renewal wrapper with always-runs cleanup and explicit renewal semantics.',
      'Certificate SANs and client trust updated through network migrations.',
    ],
    architecture: ['Offline root VM → signed intermediate', 'step-ca intermediate → ACME clients', 'Renewal wrapper → deploy certificate → verify service recovery'],
    metrics: [{ value: '2', label: 'CA tiers' }, { value: '0', label: 'root network interfaces' }, { value: '24/7', label: 'automated lifecycle' }],
    featured: true,
  },
  {
    slug: 'backup-recovery',
    title: 'Backup & Recovery Architecture',
    shortTitle: 'Backup & Recovery',
    category: 'Infrastructure',
    status: 'Production',
    period: 'Aug 2026',
    summary: 'Rebuilt Proxmox and device backups after a full root filesystem exposed gaps in the original jobs.',
    description: 'A central backup design combining scheduled vzdump archives with encrypted restic repositories, dedicated storage, uniform SFTP access, retention policy, and operational status tooling.',
    outcome: 'All covered guests received fresh archives, client backups run on schedules, and restore tests proved the design works beyond simply creating files.',
    stack: ['Proxmox VE', 'vzdump', 'restic', 'LVM', 'SFTP', 'systemd'],
    highlights: [
      'Separated backup data from the Proxmox root filesystem and added mountpoint safeguards.',
      'Applied daily, weekly, and monthly retention with scheduled pruning.',
      'Used restricted SFTP access and per-client SSH identities.',
      'Restore-tested host and guest data before calling the system complete.',
    ],
    architecture: ['Guests → scheduled vzdump → dedicated backup storage', 'Hosts / router / workstation → restic over SFTP', 'Retention + status checks + restore tests'],
    metrics: [{ value: '7d/4w/6m', label: 'restic retention' }, { value: '2', label: 'backup layers' }, { value: 'Passed', label: 'restore tests' }],
  },
  {
    slug: 'observability',
    title: 'Network Observability Stack',
    shortTitle: 'Observability',
    category: 'Infrastructure',
    status: 'Production',
    period: '2026',
    summary: 'Centralised logs, metrics, and thermal telemetry for faster, evidence-led troubleshooting.',
    description: 'A Loki, Grafana, Prometheus, Promtail, and rsyslog stack collecting router, hypervisor, DNS, container, web, and hardware telemetry. Dashboards cover infrastructure logs, web traffic, and thermals.',
    outcome: 'Incidents can be investigated across hosts from one place. The stack has helped isolate logging storms, wireless issues, missing agents, certificate failures, and service health problems.',
    stack: ['Grafana', 'Loki', 'Prometheus', 'Promtail', 'rsyslog', 'Docker'],
    highlights: [
      'Structured web access logs and network syslog collection.',
      'Prometheus scraping for cross-host thermal monitoring.',
      'Provisioned Grafana dashboards and data sources.',
      'Hardened service bindings and remote collection paths after a security review.',
    ],
    architecture: ['Hosts / network devices → Promtail / rsyslog → Loki', 'Metrics endpoints → Prometheus', 'Loki + Prometheus → Grafana dashboards'],
    metrics: [{ value: '5+', label: 'telemetry sources' }, { value: '3', label: 'core dashboards' }, { value: '1', label: 'shared evidence trail' }],
  },
  {
    slug: 'aws-backup-service',
    title: 'AWS Backup Service',
    shortTitle: 'AWS Backup API',
    category: 'Software',
    status: 'Local MVP',
    period: '2026',
    summary: 'A Dockerised FastAPI backup API designed as a stepping stone to a cost-conscious ECS Fargate deployment.',
    description: 'A working local service for uploading files, listing backup jobs, retrieving job state, and checking real storage health. The current implementation deliberately uses local storage and in-memory job state while the cloud control plane is designed.',
    outcome: 'The local MVP and container are complete. Terraform and AWS deployment remain future work; the planned architecture uses ALB, ECS Fargate, S3, DynamoDB, VPC endpoints, and CloudWatch.',
    stack: ['Python', 'FastAPI', 'Docker', 'REST APIs', 'AWS ECS', 'S3', 'DynamoDB'],
    highlights: [
      'File upload and backup-job lifecycle endpoints.',
      'Health check that verifies actual storage access.',
      'Containerised local runtime with a documented API workflow.',
      'Cloud design avoids a NAT gateway and uses gateway VPC endpoints to control cost.',
    ],
    architecture: ['Current: client → FastAPI container → local storage', 'Planned: ALB → ECS Fargate → S3 + DynamoDB', 'Planned: CloudWatch logs, metrics, and alarms'],
    metrics: [{ value: '4', label: 'working endpoints' }, { value: '1', label: 'containerised service' }, { value: 'Next', label: 'Terraform + AWS' }],
    featured: true,
    links: [{ label: 'GitHub profile', href: 'https://github.com/v0nneumAn' }],
  },
  {
    slug: 'minecraft-automation',
    title: 'Minecraft Farm Automation',
    shortTitle: 'Minecraft Automation',
    category: 'Software',
    status: 'Retired',
    period: '2026',
    summary: 'A Fabric and Baritone client mod that turned schematic data into executable build plans.',
    description: 'An automation project spanning Java, client modding, pathfinding, schematic conversion, build ordering, and test infrastructure. The mod used Baritone’s builder process with JSON schematics and supported offline plan generation.',
    outcome: 'Retired in November 2026 before full in-game acceptance. The preserved implementation includes a published Prism test bundle, orientation-aware schematic parsing, plan-driven building, and an optional CUDA pathfinding service. Remaining block-state cases and full acceptance were not completed.',
    stack: ['Java', 'Fabric', 'Baritone', 'Python', 'CUDA', 'Node.js'],
    highlights: [
      'Converted Litematic schematics into a documented JSON format.',
      'Built plan generation and Baritone execution workflows.',
      'Added block-state orientation handling and automated test-site helpers.',
      'Implemented optional GPU-assisted stand-block and A* path calculations.',
    ],
    architecture: ['Litematic → JSON schematic → ordered build plan', 'Fabric client → Baritone builder / plan executor', 'Optional local PyTorch/CUDA service → pathfinding candidates'],
    metrics: [{ value: '957', label: 'blocks in first farm' }, { value: '2', label: 'build workflows' }, { value: 'GPU', label: 'optional pathfinding' }],
    featured: true,
    links: [{ label: 'Test bundle release', href: 'https://github.com/v0nneumAn/mc-farm-bot/releases/download/v1.1.2-prism/mc-farm-bot-1.20.4.zip' }],
  },
  {
    slug: 'shulker-store',
    title: 'Shulker Store',
    shortTitle: 'Shulker Store',
    category: 'Software',
    status: 'Retired',
    period: '2026',
    summary: 'A full-stack storefront prototype combining web orders, Discord workflows, payment webhooks, and game-bot handoff.',
    description: 'A React and FastAPI system that combined item browsing, carts, Stripe test-mode checkouts, order-state tracking, and delivery coordination through Discord and ZenithProxy integrations.',
    outcome: 'Retired in November 2026. The public instance remains a non-transactional demo: checkout is disabled and Discord automation is stopped. The implementation covered order-to-delivery state transitions, but autonomous production delivery was not completed.',
    stack: ['React', 'TypeScript', 'FastAPI', 'SQLAlchemy', 'Stripe', 'Discord.py', 'Redis'],
    highlights: [
      'Web and Discord ordering flows with live order-status polling.',
      'Stripe Checkout and idempotent payment-webhook handling.',
      'Bot registry, ownership checks, and per-bot API credentials.',
      'Nginx, Cloudflare Tunnel, and containerised demo deployment.',
    ],
    architecture: ['React / Discord → FastAPI → order database', 'Stripe webhook → paid order → delivery workflow', 'Backend → bot API → customer handoff states'],
    metrics: [{ value: '2', label: 'ordering channels' }, { value: '3', label: 'integration layers' }, { value: 'Demo', label: 'non-transactional release' }],
    links: [{ label: 'Open demo', href: 'https://shulker-store.devsnull.net' }],
  },
  {
    slug: 'fancontrol',
    title: 'fancontrold',
    shortTitle: 'fancontrold',
    category: 'Software',
    status: 'Active development',
    period: '2026',
    summary: 'A safety-first Python daemon for hardware telemetry and eventually closed-loop fan control.',
    description: 'A pluggable sensor and fan backend system with per-host YAML, structured logs, systemd deployment, and a Prometheus endpoint. It supports sysfs, lm-sensors, IPMI, and NVIDIA data sources.',
    outcome: 'Monitoring is deployed on the primary server and Raspberry Pi, with other hosts restored or enabled individually. Active control remains deliberately disabled until each hardware path and baseline is reviewed.',
    stack: ['Python', 'Prometheus', 'Grafana', 'systemd', 'IPMI', 'YAML'],
    highlights: [
      'Pluggable sensor and actuator backends across unlike hardware.',
      'Emergency-temperature and sensor-failure fail-safe behaviour.',
      'Rate-limited fan changes and monitor-only default configuration.',
      'Grafana thermal dashboard fed by Prometheus metrics.',
    ],
    architecture: ['Hardware sensors → backend adapters → control loop', 'Control loop → Prometheus metrics / structured logs', 'Optional verified actuator → rate-limited fan output'],
    metrics: [{ value: '4', label: 'sensor backend types' }, { value: '0', label: 'unreviewed control loops' }, { value: '100%', label: 'monitor-first rollout' }],
  },
  {
    slug: 'self-hosted-platform',
    title: 'Self-Hosted Platform & Operations',
    shortTitle: 'Self-Hosted Platform',
    category: 'Security',
    status: 'Production',
    period: '2025–Present',
    summary: 'The operational layer behind the lab: encrypted DNS, hardened containers, secure remote access, knowledge sync, and recurring key hygiene.',
    description: 'A collection of production practices rather than a single service: Pi-hole and a custom Python DoH proxy, rootless containers, Cloudflare edge controls, Tailscale access, CouchDB-backed Obsidian sync, and a repeatable SSH rotation/audit workflow.',
    outcome: 'Household services run on owned infrastructure with documented controls, remote administration, versioned operational knowledge, and tested credential rotation.',
    stack: ['Pi-hole', 'Python', 'Docker', 'Cloudflare', 'Tailscale', 'CouchDB', 'SSH'],
    highlights: [
      'Custom standard-library DNS-over-HTTPS proxy with split-horizon resolution.',
      'Rootless Docker, AppArmor, capability restrictions, and controlled public ingress.',
      'Tailscale SSH with check-mode access and scoped subnet routes.',
      'Reachable-host SSH rotation, monthly audits, and encrypted retirement of old keys.',
    ],
    architecture: ['Clients → Pi-hole → DoH proxy → encrypted upstream', 'Internet → Cloudflare → outbound tunnel → Caddy', 'Managed devices → Tailscale → explicitly approved services'],
    metrics: [{ value: '85', label: 'lines in DoH proxy' }, { value: '0', label: 'open inbound web ports' }, { value: 'Monthly', label: 'SSH hygiene audit' }],
  },
];

export const featuredProjects = projects.filter((project) => project.featured);
export const projectCategories: Array<'All' | ProjectCategory> = ['All', 'Infrastructure', 'Software', 'Security'];

export function getProject(slug: string | undefined) {
  return projects.find((project) => project.slug === slug);
}
