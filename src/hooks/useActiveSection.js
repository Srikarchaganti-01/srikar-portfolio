import { useEffect, useState } from "react";

/**
 * Returns the id of the section crossing the middle of the viewport.
 * `resetKey` (e.g. the pathname) re-attaches observers after a route change.
 */
export function useActiveSection(ids, resetKey) {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    const elements = ids.map((id) => document.getElementById(id)).filter(Boolean);
    if (elements.length === 0) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids, resetKey]);

  return active;
}
