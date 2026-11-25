import type { ReactNode } from 'react';

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  action?: ReactNode;
}

export default function SectionHeading({ eyebrow, title, description, action }: SectionHeadingProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
      <div className="max-w-2xl">
        <span className="eyebrow">{eyebrow}</span>
        <h2 className="section-title">{title}</h2>
        {description && <p className="body-copy mt-4 max-w-xl">{description}</p>}
      </div>
      {action}
    </div>
  );
}
