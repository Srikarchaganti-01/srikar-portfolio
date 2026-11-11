import { m } from "motion/react";
import { site, getResumeLink } from "../../config/site";
import { hero } from "../../data/content";
import { useLocalTime } from "../../hooks/useLocalTime";
import MaskedLine from "../../components/ui/MaskedLine";
import { FadeIn } from "../../components/ui/Reveal";
import Button from "../../components/ui/Button";
import TextLink from "../../components/ui/TextLink";
import CropMarks from "../../components/ui/CropMarks";
import ImagePlaceholder from "../../components/ui/ImagePlaceholder";
import { GitHubIcon, LinkedInIcon } from "../../components/ui/Icons";
import { Download, Mail } from "lucide-react";
import NowPanel from "./NowPanel";
import ScrollCue from "./ScrollCue";

const EASE = [0.22, 1, 0.36, 1];

function Masthead() {
  const time = useLocalTime(site.timezone);
  return (
    <div className="relative">
      <m.span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px origin-left bg-ink"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1, ease: EASE }}
      />
      <FadeIn delay={0.3} className="meta flex items-center justify-between gap-4 pb-3 pt-3 text-ink-muted">
        <span>
          Portfolio <span aria-hidden="true">/</span> {new Date().getFullYear()}
        </span>
        <span>
          {site.location}, <time>{time}</time> {site.timezoneLabel}
        </span>
      </FadeIn>
    </div>
  );
}

function Portrait() {
  return (
    <figure className="mx-auto w-full max-w-xs sm:max-w-sm lg:max-w-none">
      <CropMarks>
        <div className="relative aspect-[4/5] overflow-hidden border border-rule">
          {site.portrait ? (
            <img
              src={site.portrait}
              alt={site.portraitAlt}
              width={800}
              height={1000}
              decoding="async"
              className="absolute inset-0 size-full object-cover"
            />
          ) : (
            <ImagePlaceholder label="Portrait" hint="Set site.portrait in src/config/site.js" />
          )}
        </div>
      </CropMarks>
      <figcaption className="meta mt-3 text-ink-muted">Fig. 1. {site.name}</figcaption>
    </figure>
  );
}

export default function Hero() {
  const resume = getResumeLink();

  return (
    <section id="home" aria-label="Introduction" className="relative flex min-h-svh flex-col pt-14 md:pt-16">
      {/* Faint 12-column guides (desktop only). */}
      <div aria-hidden="true" className="container-page pointer-events-none absolute inset-0 hidden lg:block">
        <div className="grid h-full grid-cols-12 gap-x-6 opacity-50">
          {Array.from({ length: 12 }, (_, i) => (
            <span key={i} className="border-l border-rule" />
          ))}
        </div>
      </div>

      <div className="container-page relative flex flex-1 flex-col">
        <Masthead />

        <div className="grid flex-1 grid-cols-12 gap-x-6 gap-y-10 pb-8 pt-8 lg:grid-rows-[1fr_auto] lg:pt-12">
          <div className="col-span-12 flex flex-col justify-center lg:col-span-8 lg:row-start-1">
            <h1 className="text-[clamp(4.5rem,13vw,11.5rem)] leading-[0.88] tracking-[-0.03em]">
              <MaskedLine delay={0.15}>{site.firstName}</MaskedLine>
              <MaskedLine delay={0.3} className="pl-[0.5em]">
                <em className="text-signal">Chaganti</em>
              </MaskedLine>
            </h1>

            <FadeIn delay={0.7} className="mt-8 grid gap-6 md:mt-12 md:grid-cols-[11rem_minmax(0,1fr)] md:gap-10">
              <p className="meta text-ink-muted">
                ECE student &amp; developer
                <br />
                NIT Agartala
              </p>
              <div>
                <p className="max-w-xl font-display text-[1.75rem] leading-[1.15] sm:text-4xl">{hero.statement}</p>

                <ul className="mt-6 flex flex-wrap gap-y-2 font-display text-xl italic text-ink-muted sm:text-2xl">
                  {hero.fields.map((field, i) => (
                    <li key={field} className={i > 0 ? "ml-4 border-l border-rule pl-4" : undefined}>
                      {field}
                    </li>
                  ))}
                </ul>

                <p className="mt-8 text-sm text-ink-muted">{hero.pull}</p>
                <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-4">
                  <Button
                    href={resume.href}
                    icon={resume.configured ? Download : Mail}
                    {...(resume.configured ? {} : { title: "Resume link isn't published yet; this opens an email request." })}
                  >
                    {resume.label}
                  </Button>
                  <TextLink href="#contact" icon={null}>
                    Get in touch
                  </TextLink>
                  <span className="flex items-center gap-5">
                    <a
                      href={site.socials.github.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="GitHub (opens in new tab)"
                      className="grid size-11 place-items-center transition-colors hover:text-signal-deep"
                    >
                      <GitHubIcon className="size-5" />
                    </a>
                    <a
                      href={site.socials.linkedin.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="LinkedIn (opens in new tab)"
                      className="grid size-11 place-items-center transition-colors hover:text-signal-deep"
                    >
                      <LinkedInIcon className="size-5" />
                    </a>
                  </span>
                </div>
              </div>
            </FadeIn>
          </div>

          <FadeIn delay={0.5} className="col-span-12 flex items-center justify-between gap-6 border-t border-rule pt-5 lg:col-span-8 lg:row-start-2">
            <NowPanel />
            <ScrollCue />
          </FadeIn>

          <FadeIn
            delay={0.9}
            className="col-span-12 lg:col-span-4 lg:col-start-9 lg:row-span-2 lg:row-start-1 lg:flex lg:items-center"
          >
            <Portrait />
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
