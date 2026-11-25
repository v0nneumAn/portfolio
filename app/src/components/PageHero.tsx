import { motion, useReducedMotion } from 'framer-motion';

interface PageHeroProps {
  eyebrow: string;
  title: string;
  description: string;
}

export default function PageHero({ eyebrow, title, description }: PageHeroProps) {
  const reduceMotion = useReducedMotion();
  return (
    <section className="page-hero noise">
      <div className="absolute inset-0 grid-bg pointer-events-none" />
      <motion.div
        className="container-shell relative"
        initial={reduceMotion ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="eyebrow">{eyebrow}</span>
        <h1 className="display-title page-title">{title}</h1>
        <p className="body-large">{description}</p>
      </motion.div>
    </section>
  );
}
