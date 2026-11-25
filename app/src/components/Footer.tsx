import { ArrowUpRight, Github, Mail, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="section-border bg-[#070a09]">
      <div className="container-shell py-12">
        <div className="grid gap-10 md:grid-cols-[1.4fr_.8fr_.8fr]">
          <div>
            <div className="brand-mark"><span className="text-green">~/</span>jasper-hale</div>
            <p className="body-copy mt-4 max-w-sm">Self-managed infrastructure, pragmatic security, and software built to solve real operational problems.</p>
            <div className="hero-proof"><span className="pulse-dot" />Sydney, NSW · available for infrastructure and DevOps opportunities</div>
          </div>
          <div>
            <span className="mono-label">Explore</span>
            <div className="flex flex-col items-start gap-3 mt-5 text-sm text-muted">
              <Link to="/projects" className="hover:text-green">Selected work</Link>
              <Link to="/infrastructure" className="hover:text-green">How this site runs</Link>
              <Link to="/experience" className="hover:text-green">Experience</Link>
              <Link to="/certifications" className="hover:text-green">Certifications</Link>
            </div>
          </div>
          <div>
            <span className="mono-label">Connect</span>
            <div className="flex flex-col items-start gap-3 mt-5 text-sm text-muted">
              <a href="mailto:v0nneumAn@proton.me" className="flex items-center gap-2 hover:text-green"><Mail size={14} />Email</a>
              <a href="https://github.com/v0nneumAn" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-green"><Github size={14} />GitHub<ArrowUpRight size={12} /></a>
              <span className="flex items-center gap-2"><MapPin size={14} />Sydney, Australia</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row justify-between gap-3 mt-12 pt-6 border-t border-[#213128] mono-label">
          <span>© {new Date().getFullYear()} Jasper Hale</span>
          <span>Designed, built, and self-hosted <span className="text-green">end to end</span></span>
        </div>
      </div>
    </footer>
  );
}
