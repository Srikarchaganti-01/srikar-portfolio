import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, m } from "motion/react";
import { site } from "../../config/site";
import { GitHubIcon, LinkedInIcon } from "../ui/Icons";
import { cn } from "../../lib/cn";

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export default function MobileMenu({ open, onClose, active, returnFocusTo }) {
  const panel = useRef(null);
  const closeButton = useRef(null);

  // Lock page scroll, move focus into the menu, close on Escape, trap Tab.
  useEffect(() => {
    if (!open) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButton.current?.focus();
    const returnTarget = returnFocusTo.current;

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab" || !panel.current) return;
      const items = [...panel.current.querySelectorAll(FOCUSABLE)];
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      returnTarget?.focus();
    };
  }, [open, onClose, returnFocusTo]);

  return (
    <AnimatePresence>
      {open && (
        <m.div
          id="mobile-menu"
          ref={panel}
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-paper md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <div className="container-page flex h-14 shrink-0 items-center justify-between">
            <span className="font-display text-2xl leading-none">{site.name}</span>
            <button ref={closeButton} type="button" onClick={onClose} className="meta -mr-2 min-h-11 px-2">
              Close
            </button>
          </div>

          <nav aria-label="Mobile" className="container-page flex-1 py-8">
            <ul>
              {site.nav.map((item, i) => {
                const isActive = active === item.id || item.includes?.includes(active);
                return (
                  <m.li
                    key={item.id}
                    className="border-b border-rule"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 + i * 0.04, duration: 0.4 }}
                  >
                    <Link
                      to={`/#${item.id}`}
                      onClick={onClose}
                      aria-current={isActive ? "location" : undefined}
                      className={cn(
                        "flex min-h-16 items-center gap-4 font-display text-5xl leading-none",
                        isActive && "text-signal",
                      )}
                    >
                      {item.label}
                    </Link>
                  </m.li>
                );
              })}
            </ul>
          </nav>

          <div className="container-page flex flex-wrap items-center gap-x-6 gap-y-3 pb-10 pt-4">
            <a href={`mailto:${site.email}`} className="meta min-h-11 content-center underline underline-offset-4">
              {site.email}
            </a>
            <a href={site.socials.github.url} target="_blank" rel="noopener noreferrer" aria-label="GitHub (opens in new tab)" className="grid size-11 place-items-center">
              <GitHubIcon className="size-5" />
            </a>
            <a href={site.socials.linkedin.url} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn (opens in new tab)" className="grid size-11 place-items-center">
              <LinkedInIcon className="size-5" />
            </a>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
