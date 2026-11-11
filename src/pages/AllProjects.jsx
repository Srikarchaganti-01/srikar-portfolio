import { useState } from "react";
import { Link } from "react-router-dom";
import { useDocumentMeta } from "../hooks/useDocumentMeta";
import { getAllProjects, getAllTags } from "../lib/projects";
import { cn } from "../lib/cn";
import MorseRule from "../components/ui/MorseRule";
import TextLink from "../components/ui/TextLink";
import MaskedLine from "../components/ui/MaskedLine";
import { GitHubIcon } from "../components/ui/Icons";

function ProjectRow({ project }) {
  return (
    <li className="group grid grid-cols-12 gap-x-6 gap-y-4 border-b border-rule py-7 transition-colors hover:border-ink md:items-baseline md:py-9">
      <span className="meta col-span-2 text-ink-muted transition-colors group-hover:text-signal-deep md:col-span-1">
        {project.number}
      </span>

      <div className="col-span-10 md:col-span-4">
        <h2 className="font-display text-4xl leading-none transition-transform duration-500 ease-editorial group-hover:translate-x-1 md:text-5xl">
          {project.title}
        </h2>
        {project.subtitle && (
          <p className="mt-1 font-display text-lg italic text-ink-muted">
            {project.subtitle}
          </p>
        )}
        <p className="mt-3 text-sm text-ink-muted">{project.tagline}</p>
        {project.status === "building" && (
          <p className="meta mt-3 inline-flex items-center gap-2 text-signal-deep">
            <span
              aria-hidden="true"
              className="size-1.5 rounded-full bg-signal"
            />{" "}
            Currently building
          </p>
        )}
      </div>

      <p className="meta col-span-12 text-ink-muted md:col-span-4 md:col-start-6">
        {project.stack.join(", ")}
      </p>

      <p className="meta col-span-4 text-ink-muted md:col-span-1">
        {project.year ?? ""}
      </p>

      <ul className="col-span-12 flex flex-wrap items-center gap-x-5 gap-y-2 md:col-span-2 md:justify-end">
        {project.demo && (
          <li>
            <TextLink href={project.demo}>Live demo</TextLink>
          </li>
        )}
        <li>
          {project.github ? (
            <TextLink href={project.github} icon={GitHubIcon}>
              Source
            </TextLink>
          ) : (
            <span className="meta text-ink-muted">Repository pending</span>
          )}
        </li>
      </ul>
    </li>
  );
}

export default function AllProjects() {
  useDocumentMeta({
    title: "All projects",
    description:
      "The full archive of Srikar Chaganti's projects, filterable by technology.",
  });

  const all = getAllProjects();
  const tags = getAllTags();
  const [tag, setTag] = useState(null);
  const visible = tag ? all.filter((p) => p.stack.includes(tag)) : all;

  const chip = (active) =>
    cn(
      "meta min-h-9 border px-3 transition-colors duration-300",
      active
        ? "border-ink bg-ink text-paper"
        : "border-rule text-ink-muted hover:border-ink hover:text-ink",
    );

  return (
    <div className="container-page pb-24 pt-28 md:pb-36 md:pt-36">
      <MorseRule className="mb-10" />

      <Link
        to="/#projects"
        className="meta text-ink-muted transition-colors hover:text-signal-deep"
      >
        ← Back to selected work
      </Link>

      <h1 className="mt-8 text-display-lg">
        <MaskedLine>All projects</MaskedLine>
      </h1>
      <p className="mt-6 max-w-xl text-ink-muted">
        Everything in one list. Filter by technology to see where a tool was
        used.
      </p>

      <div
        role="group"
        aria-label="Filter by technology"
        className="mt-12 flex flex-wrap gap-2"
      >
        <button
          type="button"
          aria-pressed={tag === null}
          onClick={() => setTag(null)}
          className={chip(tag === null)}
        >
          All
        </button>
        {tags.map((t) => (
          <button
            key={t}
            type="button"
            aria-pressed={tag === t}
            onClick={() => setTag(t)}
            className={chip(tag === t)}
          >
            {t}
          </button>
        ))}
      </div>

      <p className="meta mt-8 text-ink-muted" aria-live="polite">
        Showing {visible.length} of {all.length}{" "}
        {all.length === 1 ? "project" : "projects"}
        {tag ? ` using ${tag}` : ""}
      </p>

      <ul className="mt-4 border-t border-rule">
        {visible.map((project) => (
          <ProjectRow key={project.slug} project={project} />
        ))}
      </ul>

      {visible.length === 0 && (
        <p className="py-10 text-ink-muted">
          No projects match that filter.{" "}
          <button
            type="button"
            onClick={() => setTag(null)}
            className="underline underline-offset-4 hover:text-signal-deep"
          >
            Show all projects
          </button>
        </p>
      )}
    </div>
  );
}
