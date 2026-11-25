import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useEffect } from 'react';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import AboutPage from './pages/AboutPage';
import CertificationsPage from './pages/CertificationsPage';
import ContactPage from './pages/ContactPage';
import ExperiencePage from './pages/ExperiencePage';
import Home from './pages/Home';
import InfrastructurePage from './pages/InfrastructurePage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import ProjectsPage from './pages/ProjectsPage';
import SkillsPage from './pages/SkillsPage';
import { getProject } from './data/projects';

const pageTitles: Record<string, string> = {
  '/': 'Jasper Hale — Infrastructure & DevOps',
  '/about': 'About — Jasper Hale',
  '/projects': 'Projects — Jasper Hale',
  '/skills': 'Skills — Jasper Hale',
  '/experience': 'Experience — Jasper Hale',
  '/certifications': 'Certifications — Jasper Hale',
  '/infrastructure': 'Infrastructure — Jasper Hale',
  '/contact': 'Contact — Jasper Hale',
};

function NotFound() {
  return (
    <section className="page-hero min-h-[70vh]">
      <div className="container-shell">
        <span className="eyebrow">404 / route not found</span>
        <h1 className="display-title page-title">Wrong network.</h1>
        <p className="body-large">This route does not exist, but the rest of the infrastructure is still here.</p>
        <Link to="/" className="button-primary mt-8">Return home</Link>
      </div>
    </section>
  );
}

export default function App() {
  const location = useLocation();
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const slug = location.pathname.startsWith('/projects/') ? location.pathname.split('/')[2] : undefined;
    document.title = slug ? `${getProject(slug)?.title ?? 'Project'} — Jasper Hale` : (pageTitles[location.pathname] ?? 'Jasper Hale');
  }, [location.pathname]);

  return (
    <Layout>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={location.pathname}
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduceMotion ? undefined : { opacity: 0 }}
          transition={{ duration: .18 }}
        >
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/projects/:slug" element={<ProjectDetailPage />} />
            <Route path="/skills" element={<SkillsPage />} />
            <Route path="/experience" element={<ExperiencePage />} />
            <Route path="/certifications" element={<CertificationsPage />} />
            <Route path="/infrastructure" element={<InfrastructurePage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
    </Layout>
  );
}
