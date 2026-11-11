import { useEffect, useState } from "react";
import { Check, Copy } from "lucide-react";
import { site } from "../../config/site";
import { contact } from "../../data/content";
import Section from "../../components/ui/Section";
import { GitHubIcon, LinkedInIcon } from "../../components/ui/Icons";
import ContactForm from "./ContactForm";

const socialClass =
  "inline-flex items-center gap-2 text-sm transition-colors hover:text-signal-deep";

export default function ContactSection() {
  const [copy, setCopy] = useState(null); // null | "copied" | "failed"

  useEffect(() => {
    if (!copy) return undefined;
    const id = setTimeout(() => setCopy(null), 2500);
    return () => clearTimeout(id);
  }, [copy]);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopy("copied");
    } catch {
      setCopy("failed");
    }
  }

  return (
    <Section id="contact" folio="06" label="Contact" title="Get in touch">
      <div className="grid grid-cols-12 gap-y-14 lg:gap-x-10">
        <div className="col-span-12 lg:col-span-6">
          <p className="max-w-lg font-display text-2xl leading-[1.15] lg:text-2xl">
            {contact.statement}
          </p>

          <div className="mt-10">
            <a
              href={`mailto:${site.email}`}
              className="break-all font-display text-[1.6rem] underline decoration-signal decoration-2 underline-offset-8 transition-colors hover:text-signal-deep sm:text-3xl"
            >
              {site.email}
            </a>
            <div className="mt-4 flex items-center gap-3">
              <button
                type="button"
                onClick={copyEmail}
                className="meta inline-flex min-h-11 items-center gap-2 border border-rule px-3 transition-colors hover:border-ink"
              >
                {copy === "copied" ? (
                  <Check aria-hidden="true" className="size-3.5" />
                ) : (
                  <Copy aria-hidden="true" className="size-3.5" />
                )}
                Copy address
              </button>
              <span className="meta text-ink-muted" role="status">
                {copy === "copied" && "Copied to clipboard."}
                {copy === "failed" &&
                  "Couldn't copy. Select the address above."}
              </span>
            </div>
          </div>

          <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
            <li>
              <a
                href={site.socials.github.url}
                target="_blank"
                rel="noopener noreferrer"
                className={socialClass}
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
                className={socialClass}
              >
                <LinkedInIcon className="size-4" />{" "}
                {site.socials.linkedin.label}
                <span className="sr-only"> (opens in new tab)</span>
              </a>
            </li>
          </ul>
          <p className="mt-8 max-w-sm text-sm text-ink-muted">{contact.note}</p>
        </div>

        <div className="col-span-12 lg:col-span-5 lg:col-start-8">
          <ContactForm />
        </div>
      </div>
    </Section>
  );
}
