import { toMorse } from "../../lib/morse";
import { site } from "../../config/site";
import { cn } from "../../lib/cn";
import Morse from "./Morse";

const CODE = toMorse(site.initials);

/** Hairline divider that opens with the initials in Morse. */
export default function MorseRule({ className }) {
  return (
    <div aria-hidden="true" className={cn("flex items-center gap-4", className)}>
      <Morse code={CODE} className="text-[8px] text-signal" />
      <span className="h-px flex-1 bg-rule" />
    </div>
  );
}
