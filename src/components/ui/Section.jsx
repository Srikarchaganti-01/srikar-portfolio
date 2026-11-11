import { cn } from "../../lib/cn";
import MorseRule from "./MorseRule";
import MaskedLine from "./MaskedLine";

/**
 * Standard page section: Morse rule, folio + title header, then content.
 * `intro` (optional) sits in the right-hand column beside the title.
 */
export default function Section({
  id,
  folio,
  label,
  title,
  intro,
  children,
  className,
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={cn("py-5 md:py-10", className)}
    >
      <div className="container-page">
        <MorseRule className="mb-6 md:mb-10" />
        <header className="mb-6 grid grid-cols-12 gap-y-5 md:mb-10 lg:gap-x-10">
          <p className="meta col-span-12 text-ink-muted lg:col-span-3 lg:pt-4">
            <span className="text-signal-deep">{folio}</span> / {label}
          </p>
          <div className="col-span-12 lg:col-span-9">
            <h2 id={`${id}-title`} className="text-display-md">
              <MaskedLine inView>{title}</MaskedLine>
            </h2>
            {intro && <p className="mt-6 max-w-xl text-ink-muted">{intro}</p>}
          </div>
        </header>
        {children}
      </div>
    </section>
  );
}
