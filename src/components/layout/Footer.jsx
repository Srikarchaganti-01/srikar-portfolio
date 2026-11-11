import { site } from "../../config/site";
import { toMorse } from "../../lib/morse";
import { GitHubIcon, LinkedInIcon } from "../ui/Icons";
import Morse from "../ui/Morse";

const linkClass =
  "inline-flex items-center gap-2 transition-colors hover:text-signal-deep";

export default function Footer() {
  return (
    <footer className="border-t border-rule">
      <div className="container-page py-14 md:py-20">
        <div className="grid grid-cols-12 gap-y-10 lg:gap-x-10">
          <div className="col-span-12 lg:col-span-5">
            <p className="font-display text-4xl leading-none md:text-5xl">
              {site.name}
            </p>
            <p className="mt-4 max-w-xs text-sm text-ink-muted">{site.role}</p>
          </div>

          <nav
            aria-label="Footer"
            className="col-span-12 lg:col-span-4 lg:col-start-7"
          >
            <ul className="space-y-3 text-sm">
              <li>
                <a href={`mailto:${site.email}`} className={linkClass}>
                  {site.email}
                </a>
              </li>
              <li>
                <a
                  href={site.socials.github.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                >
                  <GitHubIcon className="size-4" /> {site.socials.github.label}
                  <span className="sr-only"> (opens in new tab)</span>
                </a>
              </li>
              <li>
                <a
                  href={site.socials.linkedin.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                >
                  <LinkedInIcon className="size-4" />{" "}
                  {site.socials.linkedin.label}
                  <span className="sr-only"> (opens in new tab)</span>
                </a>
              </li>
            </ul>
          </nav>

          <div className="col-span-12 lg:col-span-2 lg:text-right">
            <p className="meta text-ink-muted">{site.location}</p>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-rule pt-6 md:mt-20 md:flex-row md:items-center md:justify-between">
          <p className="meta text-ink-muted">
            © {new Date().getFullYear()} {site.name}. End of transmission.
          </p>
          <div className="flex items-center gap-3 text-ink-muted">
            <Morse
              code={toMorse(site.firstName)}
              className="text-[9px] text-signal"
            />
            <span className="sr-only">{site.firstName} in Morse code</span>
          </div>
        </div>

        <p className="meta mt-4 text-ink-muted/80">
          Set in Instrument Serif, Hanken Grotesk and JetBrains Mono.
        </p>
      </div>
    </footer>
  );
}
