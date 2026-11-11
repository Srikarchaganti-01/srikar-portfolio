import { about } from "../../data/content";
import Section from "../../components/ui/Section";
import { Reveal } from "../../components/ui/Reveal";
import { cn } from "../../lib/cn";

export default function About() {
  return (
    <Section id="about" folio="01" label="About" title="About">
      <div className="max-w-7xl grid grid-cols-12 gap-y-12 lg:gap-x-10">
        <div className="col-span-12 space-y-6 text-lg leading-relaxed lg:col-span-7 lg:col-start-2">
          {about.paragraphs.map((text, i) => (
            <Reveal key={i} delay={i === 0 ? 0 : 0.05}>
              <p
                className={cn(
                  "max-w-full",
                  i === 0 &&
                    "dropcap font-display text-2xl leading-snug sm:text-[1.7rem]",
                )}
              >
                {text}
              </p>
            </Reveal>
          ))}
        </div>

        <aside
          className="col-span-12 lg:col-span-3 lg:col-start-10"
          aria-label="Quick facts"
        >
          <dl className="border-t border-rule">
            {about.facts.map((fact) => (
              <div key={fact.label} className="border-b border-rule py-4">
                <dt className="meta text-ink-muted">{fact.label}</dt>
                <dd className="mt-1 text-sm">{fact.value}</dd>
              </div>
            ))}
          </dl>
          <p className="meta mt-6 hidden border-l-2 border-signal pl-4 text-ink-muted lg:block">
            Note. {about.margin}
          </p>
        </aside>
      </div>
    </Section>
  );
}
