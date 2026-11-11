import { experience } from "../../data/experience";
import { education } from "../../data/education";
import Section from "../../components/ui/Section";
import { Reveal } from "../../components/ui/Reveal";
import Tag from "../../components/ui/Tag";
import { cn } from "../../lib/cn";

/** Dot = finished, long dash = ongoing. */
function Marker({ ongoing }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-block h-2.5 rounded-full",
        ongoing ? "w-6 bg-signal" : "w-2.5 bg-ink",
      )}
    />
  );
}

function ExperienceEntry({ item }) {
  return (
    <li className="grid grid-cols-12 gap-y-5 border-t border-rule py-10 lg:gap-x-10 lg:py-14">
      <div className="col-span-12 lg:col-span-3">
        <div className="lg:sticky lg:top-28">
          <div className="flex items-center gap-3">
            <Marker ongoing={item.ongoing} />
            <p className="meta text-ink">{item.period}</p>
          </div>
          <p className="meta mt-2 text-ink-muted">
            {item.location}
            <span className="sr-only">
              {item.ongoing ? ", ongoing" : ", completed"}
            </span>
          </p>
        </div>
      </div>

      <div className="col-span-12 lg:col-span-8 lg:col-start-4">
        <h3 className="text-4xl">{item.role}</h3>
        <p className="mt-2 font-display text-2xl italic text-ink-muted sm:text-3xl">
          {item.organization}
        </p>

        <ul className="mt-8 max-w-2xl space-y-4">
          {item.bullets.map((bullet) => (
            <li key={bullet} className="flex gap-4">
              <span
                aria-hidden="true"
                className="mt-[0.8em] h-px w-4 shrink-0 bg-ink-muted"
              />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>

        {item.stack && (
          <ul
            className="mt-8 flex flex-wrap gap-2"
            aria-label="Technologies used"
          >
            {item.stack.map((tech) => (
              <li key={tech}>
                <Tag>{tech}</Tag>
              </li>
            ))}
          </ul>
        )}
      </div>
    </li>
  );
}

function EducationRow({ item }) {
  return (
    <div className="grid grid-cols-12 gap-y-4 border-y border-rule py-10 lg:gap-x-10 lg:py-14">
      <p className="meta col-span-12 text-ink-muted lg:col-span-3">Education</p>
      <div className="col-span-12 lg:col-span-8 lg:col-start-4">
        <h3 className="font-display text-3xl leading-tight sm:text-4xl">
          {item.institution}
        </h3>
        <p className="mt-3">{item.degree}</p>
        <p className="text-ink-muted">{item.field}</p>
        {item.period && (
          <p className="meta mt-3 text-ink-muted">{item.period}</p>
        )}
      </div>
    </div>
  );
}

export default function ExperienceSection() {
  return (
    <Section
      id="experience"
      folio="03"
      label="Experience"
      title="Experience"
      intro={
        <>
          A dot <Marker ongoing={false} /> marks a finished role, a long dash{" "}
          <Marker ongoing /> a role that is still going.
        </>
      }
    >
      <ol>
        {experience.map((item) => (
          <Reveal key={item.id}>
            <ExperienceEntry item={item} />
          </Reveal>
        ))}
      </ol>
      {education.map((item) => (
        <EducationRow key={item.id} item={item} />
      ))}
    </Section>
  );
}
