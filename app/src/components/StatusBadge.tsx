import type { ProjectStatus } from '../data/projects';

export default function StatusBadge({ status }: { status: ProjectStatus }) {
  return (
    <span className={`status-badge status-${status.toLowerCase().replaceAll(' ', '-')}`}>
      <span className="status-dot" />
      {status}
    </span>
  );
}
