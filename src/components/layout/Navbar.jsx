import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { site } from "../../config/site";
import { useActiveSection } from "../../hooks/useActiveSection";
import { cn } from "../../lib/cn";
import MobileMenu from "./MobileMenu";

const SECTION_IDS = ["home", "about", "projects", "experience", "skills", "activity", "contact"];

export default function Navbar() {
  const { pathname } = useLocation();
  const spy = useActiveSection(SECTION_IDS, pathname);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuButton = useRef(null);
  const closeMenu = useCallback(() => setOpen(false), []);

  const onArchive = pathname === site.projectsPath;
  const onHome = pathname === "/";
  const active = onArchive ? "projects" : onHome ? spy : null;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-40 bg-paper/95 transition-[border-color] duration-300",
          scrolled ? "border-b border-rule" : "border-b border-transparent",
        )}
      >
        <div className="container-page flex h-14 items-center justify-between md:h-16">
          <Link to="/#home" className="font-display text-2xl leading-none" aria-label={`${site.name}, home`}>
            {site.name}
          </Link>

          <nav aria-label="Primary" className="hidden md:block">
            <ul className="flex items-center gap-8">
              {site.nav.map((item) => {
                const isActive = active === item.id || item.includes?.includes(active);
                return (
                  <li key={item.id}>
                    <Link
                      to={`/#${item.id}`}
                      aria-current={isActive ? (onArchive ? "page" : "location") : undefined}
                      className={cn(
                        "meta relative block py-2 transition-colors duration-300 hover:text-signal-deep",
                        isActive ? "text-ink" : "text-ink-muted",
                      )}
                    >
                      {item.label}
                      {/* A dot that lengthens into a dash when the section is active. */}
                      <span
                        aria-hidden="true"
                        className={cn(
                          "absolute -bottom-0.5 left-0 h-[2px] rounded-full bg-signal transition-all duration-500",
                          isActive ? "w-4 opacity-100" : "w-[3px] opacity-0",
                        )}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <button
            ref={menuButton}
            type="button"
            onClick={() => setOpen(true)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="meta -mr-2 min-h-11 px-2 text-ink md:hidden"
          >
            Menu
          </button>
        </div>
      </header>

      <MobileMenu open={open} onClose={closeMenu} active={active} returnFocusTo={menuButton} />
    </>
  );
}
