import { hero } from "../../data/content";
import { getAllProjects } from "../../lib/projects";

/** Points at the first project marked status: "building" in src/data/projects.js. */
export default function NowPanel() {
  const current = getAllProjects().find((p) => p.status === "building");
  if (!current) return null;

  return (
    <a href="#projects" className="group flex items-center gap-4">
      <span className="pulse-dot size-2.5 shrink-0 rounded-full bg-signal" aria-hidden="true" />
      <span>
        <span className="meta block text-ink-muted">{hero.nowLabel}</span>
        <span className="flex flex-wrap items-baseline gap-x-3">
          <span className="font-display text-2xl leading-tight transition-colors group-hover:text-signal-deep">
            {current.title}
          </span>
          <span className="meta text-ink-muted">{hero.nowMeta.join(", ")}</span>
        </span>
      </span>
    </a>
  );
}
