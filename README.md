# Jasper Hale — Portfolio

Public source for [jasper.devsnull.net](https://jasper.devsnull.net), my portfolio and project-evidence site.

The site presents production infrastructure, security architecture, and software projects with explicit status labels. Detailed infrastructure narratives are published separately in the [homelab case-study repository](https://github.com/v0nneumAn/homelab).

## Stack

- React 19 and TypeScript
- Vite
- Tailwind CSS
- GSAP and Framer Motion
- A custom low-power WebGL background
- Self-hosted fonts and static public assets

## Run locally

```bash
cd app
npm ci
npm run dev
```

Vite prints the local development URL after startup.

## Production build

From the repository root:

```bash
./scripts/build.sh
```

Or run the steps directly:

```bash
cd app
npm ci
npm run build
```

The generated static site is written to `app/dist/`.

## Other checks

```bash
cd app
npm run lint
npm run preview
```

## Project content

Project summaries, status labels, metrics, architecture notes, and external case-study links live in:

```text
app/src/data/projects.ts
```

The project-detail pages are rendered from that shared data rather than maintaining separate copies of each description.

## Self-hosting architecture

The production site is a static build served by Caddy from an unprivileged Proxmox LXC. Public traffic reaches it through Cloudflare and an outbound Cloudflare Tunnel; there is no public application backend or inbound web-port forwarding.

The deployment design uses:

```text
Internet → Cloudflare edge → outbound tunnel → Caddy → static files
```

Real deployment credentials, internal addressing, private automation, and server-specific configuration are intentionally excluded from this public repository. The included build script produces the website only; it does not deploy to production.

## Links

- [Live portfolio](https://jasper.devsnull.net)
- [Selected projects](https://jasper.devsnull.net/projects)
- [Homelab engineering case studies](https://github.com/v0nneumAn/homelab)
- [GitHub profile](https://github.com/v0nneumAn)
