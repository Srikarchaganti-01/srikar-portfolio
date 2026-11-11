import { site } from "../../config/site";
import { useGithubActivity } from "../../hooks/useGithubActivity";
import Section from "../../components/ui/Section";
import TextLink from "../../components/ui/TextLink";
import Button from "../../components/ui/Button";
import { GitHubIcon } from "../../components/ui/Icons";
import Heatmap, { HeatmapSkeleton } from "./Heatmap";

function Stat({ label, value }) {
  return (
    <div className="border-t border-rule py-4">
      <dt className="meta text-ink-muted">{label}</dt>
      <dd className="mt-1 font-display text-5xl leading-none">{value}</dd>
    </div>
  );
}

export default function ActivitySection() {
  const { status, data, retry } = useGithubActivity(site.githubUsername);
  const profile = site.socials.github.url;

  return (
    <Section
      id="activity"
      folio="05"
      label="GitHub activity"
      title="GitHub activity"
      intro="The last year of public contributions, read live from GitHub's contribution graph."
    >
      <div className="grid grid-cols-12 gap-y-10 lg:gap-x-10">
        <div className="col-span-12 lg:col-span-3">
          {status === "success" && (
            <dl className="mb-6">
              <Stat label="Contributions, last year" value={data.total.toLocaleString("en-US")} />
              {data.repos !== null && <Stat label="Public repositories" value={data.repos} />}
            </dl>
          )}
          <TextLink href={profile} icon={GitHubIcon}>
            @{site.githubUsername} on GitHub
          </TextLink>
        </div>

        <div className="col-span-12 lg:col-span-9">
          {status === "loading" && <HeatmapSkeleton />}
          {status === "success" && <Heatmap days={data.days} total={data.total} />}
          {status === "error" && (
            <div role="alert" className="hatch border border-rule p-6 sm:p-8">
              <p className="font-display text-3xl leading-tight">The contribution graph couldn't be loaded.</p>
              <p className="mt-3 max-w-md text-ink-muted">
                The data service didn't respond. My full activity is on GitHub, or you can try again.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-4">
                <Button href={profile} variant="outline">
                  View GitHub profile
                </Button>
                <button type="button" onClick={retry} className="text-sm underline underline-offset-4 hover:text-signal-deep">
                  Try again
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Section>
  );
}
