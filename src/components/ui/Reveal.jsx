import { m } from "motion/react";

const EASE = [0.22, 1, 0.36, 1];

/** Fade-and-rise when scrolled into view (once). Use sparingly. */
export function Reveal({ children, delay = 0, className }) {
  return (
    <m.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </m.div>
  );
}

/** Plain fade-in on load, for the hero entrance. */
export function FadeIn({ children, delay = 0, className }) {
  return (
    <m.div
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay, ease: EASE }}
    >
      {children}
    </m.div>
  );
}
