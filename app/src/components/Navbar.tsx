import { AnimatePresence, motion } from 'framer-motion';
import { Command, Menu, Terminal, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const navLinks = [
  { label: 'Projects', path: '/projects' },
  { label: 'Experience', path: '/experience' },
  { label: 'Skills', path: '/skills' },
  { label: 'Certifications', path: '/certifications' },
  { label: 'Infrastructure', path: '/infrastructure' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
];

export default function Navbar({ onCommand }: { onCommand: () => void }) {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previous; };
  }, [mobileOpen]);

  const isActive = (path: string) => location.pathname === path || (path !== '/' && location.pathname.startsWith(`${path}/`));

  return (
    <>
      <nav className={`nav-shell ${scrolled ? 'scrolled' : ''}`} aria-label="Main navigation">
        <div className="container-shell h-full flex items-center justify-between gap-5">
          <Link to="/" className="brand-mark" aria-label="Jasper Hale home">
            <span className="brand-icon"><Terminal size={15} /></span>
            <span>jasper<span className="text-green">@</span>devsnull</span>
          </Link>
          <div className="hidden min-[1100px]:flex items-center gap-5">
            {navLinks.map((link) => (
              <Link key={link.path} to={link.path} className={`nav-link ${isActive(link.path) ? 'active' : ''}`}>{link.label}</Link>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button className="icon-button" onClick={onCommand} aria-label="Open command palette" title="Command palette (Ctrl+K)"><Command size={16} /></button>
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="button-secondary hidden sm:inline-flex !min-h-[40px] !px-4">Resume</a>
            <button className="icon-button min-[1100px]:hidden" onClick={() => setMobileOpen(!mobileOpen)} aria-expanded={mobileOpen} aria-label="Toggle navigation menu">
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </nav>
      <AnimatePresence>
        {mobileOpen && (
          <motion.div className="mobile-menu" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="container-shell">
              <span className="mono-label">Navigate /</span>
              <div className="mt-5">
                {navLinks.map((link, index) => (
                  <motion.div key={link.path} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * .035 }}>
                    <Link to={link.path} className="mobile-link" onClick={() => setMobileOpen(false)}><span className={isActive(link.path) ? 'text-green' : ''}>{link.label}</span><span className="mono-label">0{index + 1}</span></Link>
                  </motion.div>
                ))}
              </div>
              <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="button-primary w-full mt-8">Download resume</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
