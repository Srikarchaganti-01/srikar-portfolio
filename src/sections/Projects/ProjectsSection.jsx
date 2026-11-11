import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { site } from "../../config/site";
import { getAllProjects, getFeaturedProjects } from "../../lib/projects";
import Section from "../../components/ui/Section";
import { Reveal } from "../../components/ui/Reveal";
import { getLayout } from "./layouts";

export default function ProjectsSection() {
  const featured = getFeaturedProjects();
  const total = getAllProjects().length;

  return (
    <Section
      id="projects"
      folio="02"
      label="Selected work"
      title="Selected work"
      intro="Web applications and one hardware build, each with the problem it solves, the stack behind it and where to find the code."
    >
      <div className="space-y-14 md:space-y-24">
        {featured.map((project, index) => {
          const Layout = getLayout(project.featuredLayout);
          return (
            <Reveal key={project.slug}>
              <Layout project={project} index={index} />
            </Reveal>
          );
        })}
      </div>

      <div className="mt-10 md:mt-20">
        <Link
          to={site.projectsPath}
          className="group flex items-end justify-between gap-6 shadow-2xs rounded-2xl p-5 transition-colors hover:shadow-orange-700 md:py-8"
        >
          <span>
            <span className="meta block text-ink-muted">
              {total} {total === 1 ? "project" : "projects"} in the archive
            </span>
            <span className="mt-2 block font-display text-3xl md:text-4xl">
              All projects
            </span>
          </span>
          <ArrowRight
            aria-hidden="true"
            className="mb-2 size-8 shrink-0 transition-transform duration-500 ease-[var(--ease-editorial)] group-hover:translate-x-2 group-hover:text-signal md:size-12"
          />
        </Link>
      </div>
    </Section>
  );
}
