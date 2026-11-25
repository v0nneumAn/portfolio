import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Activity } from 'lucide-react';
import { useState } from 'react';

const nodes = [
  { id: 'edge', x: 210, y: 24, label: 'CLOUDFLARE', sub: 'public edge', detail: 'DNS, TLS, bot controls, and an outbound-only tunnel protect public ingress without exposing a home address.' },
  { id: 'gateway', x: 210, y: 116, label: 'OPENWRT', sub: 'policy gateway', detail: 'Seven network zones, segmented DHCP and NTP, DNS policy, and narrow inter-zone service rules.' },
  { id: 'dns', x: 28, y: 230, label: 'DNS + PKI', sub: 'trust services', detail: 'Pi-hole, a custom Python DoH proxy, split-horizon records, and certificates issued by an internal two-tier CA.' },
  { id: 'compute', x: 210, y: 230, label: 'PROXMOX', sub: 'virtualisation', detail: ' VMs and LXCs run web, monitoring, game, certificate, and test workloads with scheduled backups.' },
  { id: 'observe', x: 392, y: 230, label: 'OBSERVE', sub: 'logs + metrics', detail: 'Loki, Prometheus, and Grafana turn distributed logs and hardware telemetry into a shared troubleshooting trail.' },
  { id: 'clients', x: 28, y: 350, label: 'CLIENTS', sub: 'trust / guest / iot', detail: 'Trusted, guest, IoT, camera, and future DMZ workloads receive only the access their role requires.' },
  { id: 'remote', x: 392, y: 350, label: 'TAILSCALE', sub: 'remote access', detail: 'Split DNS, approved subnet routes, Tailscale SSH, and check-mode elevation provide controlled remote administration.' },
];

const paths = [
  { id: 'edge-gateway', d: 'M280 76 L280 116', from: 'edge', to: 'gateway' },
  { id: 'gateway-dns', d: 'M245 168 C200 195 150 198 98 230', from: 'gateway', to: 'dns' },
  { id: 'gateway-compute', d: 'M280 168 L280 230', from: 'gateway', to: 'compute' },
  { id: 'gateway-observe', d: 'M315 168 C360 195 410 198 462 230', from: 'gateway', to: 'observe' },
  { id: 'dns-clients', d: 'M98 282 L98 350', from: 'dns', to: 'clients' },
  { id: 'compute-clients', d: 'M245 282 C200 315 150 322 98 350', from: 'compute', to: 'clients' },
  { id: 'observe-remote', d: 'M462 282 L462 350', from: 'observe', to: 'remote' },
];

export default function NetworkTopology() {
  const [active, setActive] = useState('gateway');
  const reduceMotion = useReducedMotion();
  const activeNode = nodes.find((node) => node.id === active) ?? nodes[1];

  return (
    <div className="surface-card topology-card">
      <div className="topology-header">
        <div className="flex items-center gap-2">
          <Activity size={13} className="text-green" />
          <span className="mono-label">Architecture / live system map</span>
        </div>
        <span className="key-hint">select a node</span>
      </div>
      <svg className="topology-svg" viewBox="0 0 560 430" role="img" aria-label="Interactive diagram of Jasper's self-managed infrastructure">
        <defs>
          <radialGradient id="nodeGlow">
            <stop offset="0%" stopColor="#65e89b" stopOpacity=".09" />
            <stop offset="100%" stopColor="#65e89b" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="280" cy="205" r="205" fill="url(#nodeGlow)" />
        {paths.map((path) => (
          <path key={path.id} id={path.id} d={path.d} className={`topology-path ${active === path.from || active === path.to ? 'active' : ''}`} />
        ))}
        {!reduceMotion && paths.slice(0, 5).map((path, index) => (
          <circle key={`packet-${path.id}`} r="2.8" className="packet">
            <animateMotion dur={`${3.2 + index * 0.35}s`} begin={`${index * -0.7}s`} repeatCount="indefinite" path={path.d} />
          </circle>
        ))}
        {nodes.map((node) => (
          <g
            key={node.id}
            className={`topology-node ${active === node.id ? 'active' : ''}`}
            transform={`translate(${node.x} ${node.y})`}
            role="button"
            tabIndex={0}
            aria-label={`${node.label}: ${node.sub}`}
            onClick={() => setActive(node.id)}
            onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') setActive(node.id); }}
          >
            <rect width="140" height="52" rx="7" />
            <circle cx="15" cy="17" r="3" fill={active === node.id ? '#65e89b' : '#617367'} />
            <text x="26" y="21">{node.label}</text>
            <text x="15" y="39" className="node-sub">{node.sub}</text>
          </g>
        ))}
      </svg>
      <AnimatePresence mode="wait">
        <motion.div
          key={activeNode.id}
          className="topology-detail"
          initial={reduceMotion ? false : { opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduceMotion ? undefined : { opacity: 0, y: -5 }}
          transition={{ duration: 0.18 }}
          aria-live="polite"
        >
          <span className="mono-label text-green">{activeNode.label} / {activeNode.sub}</span>
          <p>{activeNode.detail}</p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
