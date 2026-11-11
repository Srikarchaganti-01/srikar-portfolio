import { toMorse } from "../../lib/morse";
import { cn } from "../../lib/cn";
import Morse from "../../components/ui/Morse";
import {
  ProjectBody,
  ProjectLinks,
  ProjectMedia,
  ProjectNumeral,
  ProjectStack,
  ProjectTitle,
} from "./ProjectParts";

/**
 * Fixed compositions for featured projects. A project chooses one through
 * `featuredLayout` in src/data/projects.js. Adding a new composition means adding
 * a function here and one line to `layouts`; no other component changes.
 * Every layout receives { project, index }.
 */

/** 8/4 split: wide image, narrow text. Mobile: image bleeds edge to edge. */
function Lead({ project }) {
  return (
    <article className="group grid grid-cols-12 gap-y-8 lg:gap-x-10">
      <ProjectMedia
        project={project}
        aspect="aspect-[16/9] lg:aspect-[16/9]"
        className="col-span-12 lg:col-span-5 lg:self-start"
      />
      <div className="col-span-12 lg:col-span-6 lg:self-end">
        <ProjectNumeral number={project.number} />
        <ProjectTitle project={project} className="mt-2" />
        <div className="mt-6">
          <ProjectBody project={project} withProblem />
        </div>
        <ProjectStack stack={project.stack} className="mt-6" />
        <ProjectLinks project={project} className="mt-6" />
      </div>
    </article>
  );
}

/** Text left, tall image right, dropped lower to break the rhythm. */
function Offset({ project }) {
  return (
    <article className="group grid grid-cols-12 gap-y-8 lg:gap-x-10 lg:pt-16">
      <div className="col-span-12 lg:col-span-5 lg:self-center">
        <ProjectNumeral number={project.number} />
        <ProjectTitle project={project} className="mt-2" />
        <div className="mt-6">
          <ProjectBody project={project} />
        </div>
        <ProjectStack stack={project.stack} className="mt-6" />
        <ProjectLinks project={project} className="mt-6" />
      </div>
      <ProjectMedia
        project={project}
        aspect="aspect-[16/9] lg:aspect-[16/9]"
        className="col-span-12 lg:col-span-6 lg:col-start-7"
      />
    </article>
  );
}

/** Full-width panorama with the title traced in Morse on hover. */
function Panorama({ project }) {
  return (
    <article className="group">
      <ProjectMedia
        project={project}
        aspect="aspect-[4/3] sm:aspect-[4/3]"
      ></ProjectMedia>
      <div className="mt-8 grid grid-cols-12 gap-y-6 lg:gap-x-10">
        <div className="col-span-12 lg:col-span-5">
          <ProjectNumeral number={project.number} />
          <ProjectTitle project={project} className="mt-2" />
        </div>
        <div className="col-span-12 lg:col-span-6 lg:col-start-7 lg:self-end">
          <ProjectBody project={project} />
          <ProjectStack stack={project.stack} className="mt-6" />
          <ProjectLinks project={project} className="mt-6" />
        </div>
      </div>
    </article>
  );
}

/** Small 4:5 image on the left, text pushed into the middle columns. */
function Compact({ project }) {
  return (
    <article className="group grid grid-cols-12 gap-y-8 lg:gap-x-10">
      <ProjectMedia
        project={project}
        bleed={false}
        aspect="aspect-[4/5]"
        className="hidden sm:block sm:col-span-6 lg:col-span-4"
      />
      <div className="col-span-12 sm:col-span-6 lg:col-span-5 lg:col-start-6 lg:self-end">
        <ProjectNumeral number={project.number} />
        <ProjectTitle project={project} className="mt-2" />
        <div className="mt-6">
          <ProjectBody project={project} />
        </div>
        <ProjectStack stack={project.stack} className="mt-6" />
        <ProjectLinks project={project} className="mt-6" />
      </div>
    </article>
  );
}

/** Used when a featured project has no (or an unknown) featuredLayout. Alternates sides by position. */
function Fallback({ project, index }) {
  const flip = index % 2 === 1;
  return (
    <article className="group grid grid-cols-12 gap-y-8 lg:gap-x-10">
      <ProjectMedia
        project={project}
        aspect="aspect-[4/3]"
        className={cn(
          "col-span-12 lg:col-span-6",
          flip && "lg:order-2 lg:col-start-7",
        )}
      />
      <div
        className={cn(
          "col-span-12 lg:col-span-5 lg:self-center",
          flip ? "lg:order-1" : "lg:col-start-8",
        )}
      >
        <ProjectNumeral number={project.number} />
        <ProjectTitle project={project} className="mt-2" />
        <div className="mt-6">
          <ProjectBody project={project} />
        </div>
        <ProjectStack stack={project.stack} className="mt-6" />
        <ProjectLinks project={project} className="mt-6" />
      </div>
    </article>
  );
}

const layouts = {
  lead: Lead,
  offset: Offset,
  panorama: Panorama,
  compact: Compact,
};

export const getLayout = (name) => layouts[name] ?? Fallback;
