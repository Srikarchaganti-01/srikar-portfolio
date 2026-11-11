/**
 * Central site configuration. Identity, links, resume, navigation and service
 * settings live here. Components read from this file; they never hardcode values.
 */

export const site = {
  name: "Srikar Chaganti",
  firstName: "Srikar",
  initials: "SC",
  role: "ECE student & software developer",
  location: "Agartala, India",
  timezone: "Asia/Kolkata",
  timezoneLabel: "IST",
  email: "srikarchaganti.16@gmail.com",

  // Replace with your Google Drive share link. Until then the Resume button
  // falls back to a pre-filled email request instead of a broken link.
  resumeUrl:
    "https://drive.google.com/file/d/1GtmcSfWpvsa0FLFEeq_vXEM4NI4P-N4Y/view?usp=sharing",

  // Portrait photo. Put the file in /public (e.g. public/portrait.jpg) and set
  // this to "/portrait.jpg". While null, a labelled placeholder is shown.
  portrait: "/portrait.png",
  portraitAlt: "Portrait of Srikar Chaganti",

  githubUsername: "Srikarchaganti-01",
  socials: {
    github: { label: "GitHub", url: "https://github.com/Srikarchaganti-01" },
    linkedin: {
      label: "LinkedIn",
      url: "https://www.linkedin.com/in/srikar-chaganti-57ba17319/",
    },
  },

  projectsPath: "/projects",

  /**
   * Navigation. `id` matches a section id on the home page. `includes` lists
   * extra section ids that keep this item highlighted (Skills sits under Experience).
   */
  nav: [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "projects", label: "Projects" },
    { id: "experience", label: "Experience", includes: ["skills"] },
    { id: "activity", label: "Activity" },
    { id: "contact", label: "Contact" },
  ],

  // Contact form service. Submission logic lives in src/lib/contact.js.
  contact: {
    provider: "web3forms",
    endpoint: "https://api.web3forms.com/submit",
    accessKey: import.meta.env.VITE_WEB3FORMS_KEY ?? "",
  },

  seo: {
    title: "Srikar Chaganti — ECE student & software developer",
    description:
      "Srikar Chaganti is an ECE student at NIT Agartala and a developer working across MERN-stack web development, problem-solving and IoT.",
  },
};

/** True once the placeholder has been replaced with a real URL. */
export const isResumeConfigured = () =>
  /^https?:\/\//i.test(site.resumeUrl ?? "");

/** Resume link, or an honest email request when no URL is configured. */
export const getResumeLink = () =>
  isResumeConfigured()
    ? { href: site.resumeUrl, label: "Download resume", configured: true }
    : {
        href: `mailto:${site.email}?subject=${encodeURIComponent("Resume request")}`,
        label: "Request resume",
        configured: false,
      };
