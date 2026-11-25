import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Download, Github, Mail, Search } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { projects } from '../data/projects';

interface CommandAction {
  title: string;
  subtitle: string;
  icon: LucideIcon;
  run: () => void;
}

export default function CommandPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const reduceMotion = useReducedMotion();

  const actions = useMemo<CommandAction[]>(() => {
    const pages = [
      ['Home', '/'], ['Projects', '/projects'], ['About', '/about'], ['Skills', '/skills'],
      ['Experience', '/experience'], ['Certifications', '/certifications'], ['Infrastructure', '/infrastructure'], ['Contact', '/contact'],
    ];
    return [
      ...pages.map(([title, path]) => ({ title, subtitle: `Go to ${path}`, icon: ArrowRight, run: () => navigate(path) })),
      ...projects.map((project) => ({ title: project.title, subtitle: `${project.category} case study`, icon: ArrowRight, run: () => navigate(`/projects/${project.slug}`) })),
      { title: 'Download resume', subtitle: 'Open PDF in a new tab', icon: Download, run: () => window.open('/resume.pdf', '_blank', 'noopener,noreferrer') },
      { title: 'GitHub', subtitle: 'github.com/v0nneumAn', icon: Github, run: () => window.open('https://github.com/v0nneumAn', '_blank', 'noopener,noreferrer') },
      { title: 'Email Jasper', subtitle: 'v0nneumAn@proton.me', icon: Mail, run: () => { window.location.href = 'mailto:v0nneumAn@proton.me'; } },
    ];
  }, [navigate]);

  const filtered = actions.filter((action) => `${action.title} ${action.subtitle}`.toLowerCase().includes(query.toLowerCase()));

  useEffect(() => {
    if (!open) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.setTimeout(() => inputRef.current?.focus(), 30);
    const handleKey = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKey);
      previousFocus?.focus();
    };
  }, [open, onClose]);

  const runAction = (action: CommandAction) => {
    onClose();
    action.run();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="command-overlay"
          role="presentation"
          onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="command-panel"
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            initial={reduceMotion ? false : { opacity: 0, y: -12, scale: .98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: .98 }}
            transition={{ duration: .2 }}
          >
            <div className="command-input-row">
              <Search size={18} className="text-muted" />
              <input
                ref={inputRef}
                className="command-input"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search pages, projects, and actions…"
                aria-label="Search commands"
              />
              <span className="key-hint">esc</span>
            </div>
            <div className="command-list">
              {filtered.map((action) => {
                const Icon = action.icon;
                return (
                  <button className="command-item" key={`${action.title}-${action.subtitle}`} onClick={() => runAction(action)}>
                    <Icon size={17} />
                    <span className="command-item-text"><span>{action.title}</span><small>{action.subtitle}</small></span>
                  </button>
                );
              })}
              {filtered.length === 0 && <div className="command-empty">No matching commands.</div>}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
