import { projects } from "../data/projects";

const pad = (n) => String(n).padStart(2, "0");

// Numbers are derived from array order so they can never drift or collide.
const numbered = projects.map((project, index) => ({
  ...project,
  number: pad(index + 1),
}));

if (import.meta.env.DEV) {
  const seen = new Set();
  for (const { slug } of projects) {
    if (seen.has(slug)) console.warn(`[projects] Duplicate slug: "${slug}"`);
    seen.add(slug);
  }
}

export const getAllProjects = () => numbered;
export const getFeaturedProjects = () => numbered.filter((p) => p.featured);

/** Unique stack entries across all projects, sorted (archive filters). */
export const getAllTags = () =>
  [...new Set(numbered.flatMap((p) => p.stack))].sort((a, b) => a.localeCompare(b));

/** The link a project image should open: live demo first, then source. */
export const getPrimaryLink = (project) => project.demo ?? project.github ?? null;
