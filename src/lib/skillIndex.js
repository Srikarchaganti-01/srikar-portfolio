import { getAllProjects } from "./projects";
import { experience } from "../data/experience";

/** "React.js" and "React" both become "react"; "Tailwind CSS" becomes "tailwindcss". */
const normalise = (name) =>
  name
    .toLowerCase()
    .replace(/\.js$/, "")
    .replace(/[^a-z0-9+#]/g, "");

/** Maps a normalised skill name to where it was actually used. Built once. */
const index = new Map();

const add = (name, entry) => {
  const key = normalise(name);
  const list = index.get(key) ?? [];
  if (!list.some((e) => e.label === entry.label)) list.push(entry);
  index.set(key, list);
};

for (const project of getAllProjects()) {
  for (const tech of project.stack) add(tech, { type: "project", label: project.title });
}
for (const job of experience) {
  for (const tech of job.stack ?? []) add(tech, { type: "experience", label: job.organization });
}

/** @returns {{type: "project" | "experience", label: string}[]} */
export const getSkillUsage = (skill) => index.get(normalise(skill)) ?? [];
