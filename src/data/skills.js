/**
 * Skill groups. Items are plain strings. They are cross-referenced against
 * project and experience stacks by normalised name (see src/lib/skillIndex.js).
 */
export const skillGroups = [
  { id: "programming", label: "Languages", items: ["C", "C++", "JavaScript", "Python"] },
  { id: "frontend", label: "Frontend", items: ["HTML", "CSS", "Tailwind CSS", "React.js", "Vite"] },
  { id: "backend", label: "Backend", items: ["Node.js", "Express.js", "MongoDB", "REST APIs"] },
  { id: "tools", label: "Tools", items: ["Git", "GitHub", "Postman", "VS Code"] },
  { id: "hardware", label: "Hardware & IoT", items: ["ESP32", "Arduino", "IoT development"] },
];
