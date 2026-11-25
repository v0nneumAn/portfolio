import { motion, useScroll, useSpring } from 'framer-motion';
import Lenis from 'lenis';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CommandPalette from './CommandPalette';
import FluidBackground from './FluidBackground';
import Footer from './Footer';
import Navbar from './Navbar';

gsap.registerPlugin(ScrollTrigger);

export default function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const lenisRef = useRef<Lenis | null>(null);
  const [commandOpen, setCommandOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 160, damping: 28, restDelta: 0.001 });
  const closeCommand = useCallback(() => setCommandOpen(false), []);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const lenis = new Lenis({ lerp: 0.09, smoothWheel: !reduceMotion });
    lenisRef.current = lenis;
    lenis.on('scroll', ScrollTrigger.update);
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    return () => { gsap.ticker.remove(raf); lenis.destroy(); };
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    lenisRef.current?.scrollTo(0, { immediate: true });
  }, [location.pathname]);

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setCommandOpen((value) => !value);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  return (
    <div className="site-shell flex flex-col">
      <a href="#main-content" className="skip-link">Skip to content</a>
      <motion.div className="scroll-progress" style={{ scaleX }} />
      <FluidBackground />
      <Navbar onCommand={() => setCommandOpen(true)} />
      <main id="main-content" className="flex-1">{children}</main>
      <Footer />
      <CommandPalette open={commandOpen} onClose={closeCommand} />
    </div>
  );
}
