import { site } from "../config/site";
import { useDocumentMeta } from "../hooks/useDocumentMeta";
import { toMorse } from "../lib/morse";
import Button from "../components/ui/Button";
import TextLink from "../components/ui/TextLink";
import Morse from "../components/ui/Morse";
import MaskedLine from "../components/ui/MaskedLine";

export default function NotFound() {
  useDocumentMeta({ title: "Page not found" });

  return (
    <div className="container-page flex min-h-svh flex-col justify-center pb-20 pt-28">
      <p className="meta flex items-center gap-4 text-ink-muted">
        404 <Morse code={toMorse("404")} className="text-[8px] text-signal" />
      </p>
      <h1 className="mt-6 text-display-xl">
        <MaskedLine>Signal</MaskedLine>
        <MaskedLine delay={0.12} className="pl-[0.4em]">
          <em className="text-signal">lost.</em>
        </MaskedLine>
      </h1>
      <p className="mt-8 max-w-md text-lg">That page doesn't exist, or it has moved.</p>
      <div className="mt-8 flex flex-wrap items-center gap-6">
        <Button to="/">Back to home</Button>
        <TextLink to={site.projectsPath} icon={null}>
          Browse projects
        </TextLink>
      </div>
    </div>
  );
}
