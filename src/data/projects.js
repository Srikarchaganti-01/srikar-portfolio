/**
 * Central project data. This is the ONLY file you edit to add a project.
 *
 * Array order = display order. Numbers (01, 02, …) are derived from position in
 * src/lib/projects.js, so never number projects by hand.
 *
 * @typedef {Object} Project
 * @property {string} slug                 Unique, URL-safe id.
 * @property {string} title
 * @property {string} [subtitle]
 * @property {string} tagline              One-line summary.
 * @property {string} description
 * @property {string} [problem]            The real-world problem it addresses.
 * @property {string[]} stack
 * @property {string[]} features
 * @property {number|null} year            null until confirmed (hidden in the UI).
 * @property {string|null} github          null shows "Repository link pending".
 * @property {string|null} demo            null hides the live-demo link.
 * @property {string|null} image           Path under /public (e.g. "/projects/nextask.png"); null shows a placeholder.
 * @property {string} imageAlt
 * @property {boolean} featured            Shown on the home page when true.
 * @property {"lead"|"offset"|"panorama"|"compact"} [featuredLayout]
 *           Composition on the home page. Omit it and a fallback composition
 *           that alternates sides is used. New compositions are added in
 *           src/sections/Projects/layouts.jsx only.
 * @property {"building"|"shipped"|null} status
 */

/** @type {Project[]} */
export const projects = [
  {
    slug: "nextask",
    title: "NexTask",
    tagline: "Task management built around organizational hierarchy.",
    description:
      "A full-stack task management platform designed for structured task assignment and communication within an organizational hierarchy.",
    problem:
      "Most task tools ignore who reports to whom. NexTask builds that structure in: members register with employee credentials, and what each person can see and assign follows their place in the hierarchy.",
    stack: [
      "React",
      "Vite",
      "Tailwind CSS",
      "Node.js",
      "Express.js",
      "MongoDB",
    ],
    features: [
      "User authentication",
      "Email verification",
      "Role-based access",
      "Employee credential-based registration",
      "Task creation and assignment",
      "Task status and priority management",
      "Filtering and sorting",
      "Hierarchical access control",
    ],
    year: null,
    github: "https://github.com/Srikarchaganti-01/NexTask",
    demo: "https://nex-task-sigma.vercel.app/",
    image: "/nextask.png",
    imageAlt: "NexTask dashboard screenshot",
    featured: true,
    featuredLayout: "lead",
    status: "building",
  },
  {
    slug: "telemetrix",
    title: "TelemetriX",
    tagline: "Formula 1 data in one interface.",
    description:
      "An F1 analytics and statistics platform that brings racing information, driver standings, team standings, schedules, session records and results into one interface.",
    stack: ["React", "Vite", "Tailwind CSS", "Chart.js", "Appwrite"],
    features: [
      "Driver and constructor standings",
      "Race schedules",
      "Session records and results",
      "Head-to-head comparisons",
      "FIA-related news",
      "Admin-only content management",
      "Appwrite authentication and database integration",
    ],
    year: null,
    github: "https://github.com/Srikarchaganti-01/Telemetrix",
    demo: null,
    image: "/Telemetrix.jpg",
    imageAlt: "TelemetriX standings screenshot",
    featured: true,
    featuredLayout: "offset",
    status: null,
  },
  {
    slug: "lynk",
    title: "LynK",
    subtitle: "Messages in Motion",
    tagline: "Morse code between a web page and a microcontroller.",
    description:
      "An IoT-based Morse code communication system connecting a web interface with an ESP32 device.",
    stack: [
      "React",
      "Vite",
      "Tailwind CSS",
      "ESP32",
      "Arduino",
      "HTTP / Wi-Fi",
    ],
    features: [
      "Web-to-hardware communication",
      "Hardware-to-web communication",
      "Morse code translation",
      "Physical button-based input",
      "LED-based signal indicators",
      "Buzzer feedback",
      "ESP32 HTTP communication",
    ],
    year: null,
    github: "https://github.com/Srikarchaganti-01/Lynk_v1",
    demo: null,
    image: null,
    imageAlt: "LynK web interface and ESP32 device",
    featured: true,
    featuredLayout: "compact",
    status: null,
  },
  {
    slug: "after-credits",
    title: "After Credits",
    tagline: "A personal log for movies and TV.",
    description:
      "A movie and television tracking application for managing personal watchlists, reviews, ratings and collections.",
    stack: ["JavaScript", "Node.js", "Express.js", "MongoDB"],
    features: [
      "User authentication",
      "Personal watchlists",
      "Movie and TV tracking",
      "Ratings and reviews",
      "Collections",
      "Protected routes",
    ],
    year: null,
    github: null, // TODO: add the repository URL once confirmed
    demo: null,
    image: "/aftercredits.png",
    imageAlt: "After Credits watchlist screenshot",
    featured: true,
    featuredLayout: "panaroma",
    status: null,
  },
];
