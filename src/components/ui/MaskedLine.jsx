import { m } from "motion/react";
import { cn } from "../../lib/cn";

const EASE = [0.22, 1, 0.36, 1];

/**
 * A line of text that rises from behind its own baseline. Runs on load by
 * default, or when scrolled into view with `inView`.
 */
export default function MaskedLine({ children, delay = 0, inView = false, className }) {
  const motionProps = inView
    ? { whileInView: { y: 0 }, viewport: { once: true, margin: "0px 0px -10% 0px" } }
    : { animate: { y: 0 } };

  return (
    <span className={cn("block overflow-hidden pb-[0.14em] -mb-[0.14em]", className)}>
      <m.span
        className="block"
        initial={{ y: "105%" }}
        transition={{ duration: 0.9, delay, ease: EASE }}
        {...motionProps}
      >
        {children}
      </m.span>
    </span>
  );
}
