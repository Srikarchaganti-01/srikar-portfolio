import { cn } from "../../lib/cn";

/**
 * Renders a dot/dash string (e.g. "... -.-.") as shapes. Sized with font-size:
 * pass something like "text-[10px]". Decorative, so hidden from assistive tech.
 */
export default function Morse({ code, className }) {
  return (
    <span aria-hidden="true" className={cn("inline-flex items-center gap-[0.35em]", className)}>
      {[...code].map((char, i) => {
        if (char === ".") return <span key={i} className="size-[0.5em] rounded-full bg-current" />;
        if (char === "-") return <span key={i} className="h-[0.5em] w-[1.5em] rounded-full bg-current" />;
        if (char === "/") return <span key={i} className="w-[1.4em]" />;
        return <span key={i} className="w-[0.45em]" />;
      })}
    </span>
  );
}
