import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * After navigation: scroll to the #hash target if there is one, otherwise to the
 * top of the page. Smooth scrolling is skipped for users who prefer reduced motion.
 */
export default function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (hash) {
      const target = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (target) {
        target.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
        return;
      }
    }
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname, hash]);

  return null;
}
