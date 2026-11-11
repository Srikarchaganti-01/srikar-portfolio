/**
 * @typedef {Object} Experience
 * @property {string} id
 * @property {string} role
 * @property {string} organization
 * @property {string} location
 * @property {string} period
 * @property {boolean} ongoing
 * @property {string[]} bullets
 * @property {string[]} [stack]
 */

/** @type {Experience[]} Newest first. */
export const experience = [
  {
    id: "delta-automations",
    role: "Web Development Intern",
    organization: "Delta Automations",
    location: "Remote",
    period: "Aug 2026 – Sep 2026",
    ongoing: false,
    bullets: [
      "Audited and tested the official website, identifying frontend issues, UI inconsistencies, broken functionality and other web bugs.",
      "Debugged and resolved frontend issues where possible, improving functionality, responsiveness and user experience.",
      "Reported bugs and technical issues to the team lead with clear descriptions to support efficient troubleshooting.",
    ],
    stack: ["React.js", "JavaScript", "HTML", "Tailwind CSS", "Vite"],
  },
  {
    id: "open-source",
    role: "Open Source Contributor",
    organization: "GitHub Open Source Projects",
    location: "Remote",
    period: "2025 – Present",
    ongoing: true,
    bullets: [
      "Contribute to open-source software by reviewing codebases, identifying areas for improvement and submitting changes through GitHub workflows.",
      "Collaborate using Git branching, pull requests, issue tracking and code reviews.",
      "Improve developer workflows and project quality through collaborative contributions.",
    ],
  },
];
