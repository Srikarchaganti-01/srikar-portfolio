import { useState } from "react";
import { skillGroups } from "../../data/skills";
import { getSkillUsage } from "../../lib/skillIndex";
import Section from "../../components/ui/Section";
import { cn } from "../../lib/cn";

function usageText(usage) {
  return `Used in ${usage.map((u) => u.label).join(", ")}`;
}

function SkillGroup({ group, activeKey, setActiveKey }) {
  const activeSkill = group.items.find(
    (item) => activeKey === `${group.id}:${item}`,
  );
  const note = activeSkill ? usageText(getSkillUsage(activeSkill)) : "";

  return (
    <div className="grid grid-cols-12  border-t border-rule  md:py-2 lg:gap-x-10">
      <h3 className="meta col-span-12 text-ink-muted lg:col-span-3 lg:pt-3">
        {group.label}
      </h3>

      <div className="col-span-12 lg:col-span-9">
        <ul className="flex flex-wrap items-baseline gap-x-3 gap-y-1 font-display  leading-[1.15] sm:text-2xl  md:text-3xl">
          {group.items.map((item, i) => {
            const usage = getSkillUsage(item);
            const key = `${group.id}:${item}`;
            const isActive = activeKey === key;
            return (
              <li
                key={item}
                className="flex items-baseline gap-3 text-gray-600"
              >
                {usage.length > 0 ? (
                  <button
                    type="button"
                    aria-pressed={isActive}
                    onPointerEnter={(e) =>
                      e.pointerType === "mouse" && setActiveKey(key)
                    }
                    onPointerLeave={(e) =>
                      e.pointerType === "mouse" && setActiveKey(null)
                    }
                    onClick={(e) => {
                      const mouse = e.nativeEvent.pointerType === "mouse";
                      setActiveKey(mouse || !isActive ? key : null);
                    }}
                    className={cn(
                      "relative min-h-11 underline decoration-signal decoration-2 underline-offset-[0.18em] transition-[text-decoration-color,color] duration-300",
                      isActive
                        ? "text-signal-deep"
                        : "decoration-transparent hover:text-signal-deep",
                    )}
                  >
                    {item}
                    {/* A small dot marks skills that appear in the work above. */}
                    <span
                      aria-hidden="true"
                      className="absolute -right-2 top-[0.35em] size-1.5 rounded-full bg-orange-400"
                    />
                  </button>
                ) : (
                  <span className="inline-block">{item}</span>
                )}
                {i < group.items.length - 1 && (
                  <span aria-hidden="true" className="text-ink/20">
                    /
                  </span>
                )}
              </li>
            );
          })}
        </ul>
        <p className="meta mt-2 min-h-5 text-signal-deep" aria-live="polite">
          {note}
        </p>
      </div>
    </div>
  );
}

export default function SkillsSection() {
  const [activeKey, setActiveKey] = useState(null);

  return (
    <Section
      id="skills"
      folio="04"
      label="Skills"
      title="Skills"
      intro="Grouped by what I use them for. A skill with a small dot appears in my projects or experience; hover or tap it to see where."
    >
      <div className="border-b border-rule">
        {skillGroups.map((group) => (
          <SkillGroup
            key={group.id}
            group={group}
            activeKey={activeKey}
            setActiveKey={setActiveKey}
          />
        ))}
      </div>
    </Section>
  );
}
