import { useDocumentMeta } from "../hooks/useDocumentMeta";
import Hero from "../sections/Hero/Hero";
import About from "../sections/About/About";
import ProjectsSection from "../sections/Projects/ProjectsSection";
import ExperienceSection from "../sections/Experience/ExperienceSection";
import SkillsSection from "../sections/Skills/SkillsSection";
import ActivitySection from "../sections/Activity/ActivitySection";
import ContactSection from "../sections/Contact/ContactSection";

export default function Home() {
  useDocumentMeta();

  return (
    <>
      <Hero />
      <About />
      <ActivitySection />
      <ProjectsSection />
      <ExperienceSection />
      <SkillsSection />
      <ContactSection />
    </>
  );
}
