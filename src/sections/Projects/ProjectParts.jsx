import { useRef } from "react";
import { getPrimaryLink } from "../../lib/projects";
import { cn } from "../../lib/cn";
import Tag from "../../components/ui/Tag";
import TextLink from "../../components/ui/TextLink";
import ImagePlaceholder from "../../components/ui/ImagePlaceholder";
import { GitHubIcon } from "../../components/ui/Icons";

/**
 * Image frame for a project. Lazy-loaded image or a labelled placeholder, a slow
 * zoom on hover, and a small "View" label that follows the pointer (mouse only).
 * `children` render on top of the image (e.g. the Morse trace).
 */
export function ProjectMedia({
  project,
  aspect,
  bleed = true,
  className,
  children,
}) {
  const href = getPrimaryLink(project);
  const label = useRef(null);

  const follow = (event) => {
    if (!label.current) return;
    const box = event.currentTarget.getBoundingClientRect();
    label.current.style.transform = `translate(${event.clientX - box.left}px, ${event.clientY - box.top}px)`;
  };

  const frame = (
    <div
      className={cn(
        "relative overflow-hidden border border-rule bg-paper",
        bleed && "max-sm:border-x-0",
        aspect,
      )}
    >
      <div className="absolute inset-0 transition-transform duration-700 ease-[var(--ease-editorial)] group-hover:scale-[1.03]">
        {project.image ? (
          <img
            src={project.image}
            alt={project.imageAlt}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 size-full object-cover"
          />
        ) : (
          <ImagePlaceholder
            label={project.imageAlt}
            hint="Screenshot pending"
          />
        )}
      </div>
      {children}
      {href && (
        <span
          ref={label}
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
        >
          <span className="meta block -translate-x-1/2 -translate-y-1/2 bg-ink px-3 py-1.5 text-paper">
            View
          </span>
        </span>
      )}
    </div>
  );

  const wrapper = cn(bleed && "max-sm:-mx-5", className);

  return href ? (
    // The links beside the image already expose this destination, so skip it for keyboards and screen readers.
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      tabIndex={-1}
      aria-hidden="true"
      onMouseMove={follow}
      className={cn("block cursor-pointer", wrapper)}
    >
      {frame}
    </a>
  ) : (
    <div className={wrapper}>{frame}</div>
  );
}

/** Large serif numeral that turns vermilion when the project is hovered. */
export function ProjectNumeral({ number }) {
  return (
    <span
      aria-hidden="true"
      className="block font-display text-[clamp(3.5rem,8vw,6.5rem)] leading-none text-ink/15 transition-colors duration-500 group-hover:text-signal"
    >
      {number}
    </span>
  );
}

export function ProjectTitle({ project, className }) {
  return (
    <div className={className}>
      <h3 className="text-display-md">{project.title}</h3>
      {project.subtitle && (
        <p className="mt-2 font-display text-xl italic text-ink-muted sm:text-2xl">
          {project.subtitle}
        </p>
      )}
      <span
        aria-hidden="true"
        className="mt-4 block h-px w-full origin-left scale-x-0 bg-signal transition-transform duration-500 ease-[var(--ease-editorial)] group-hover:scale-x-100"
      />
    </div>
  );
}

export function ProjectStack({ stack, className }) {
  return (
    <ul
      className={cn("flex flex-wrap gap-2", className)}
      aria-label="Technology stack"
    >
      {stack.map((tech) => (
        <li key={tech}>
          <Tag>{tech}</Tag>
        </li>
      ))}
    </ul>
  );
}

export function ProjectLinks({ project, className }) {
  return (
    <ul
      className={cn("flex flex-wrap items-center gap-x-6 gap-y-3", className)}
    >
      {project.demo && (
        <li>
          <TextLink href={project.demo}>Live demo</TextLink>
        </li>
      )}
      <li>
        {project.github ? (
          <TextLink href={project.github} icon={GitHubIcon}>
            Source on GitHub
          </TextLink>
        ) : (
          <span className="meta text-ink-muted">Repository link pending</span>
        )}
      </li>
    </ul>
  );
}

/** Description block shared by every composition. */
export function ProjectBody({ project, withProblem = false }) {
  return (
    <>
      <p className="text-lg leading-snug">{project.tagline}</p>
      <p className="mt-4 max-w-prose text-ink-muted">{project.description}</p>
      {withProblem && project.problem && (
        <p className="mt-4 max-w-prose border-l-2 border-signal pl-4 text-sm">
          {project.problem}
        </p>
      )}
    </>
  );
}
