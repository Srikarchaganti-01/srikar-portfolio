import { cn } from "../../lib/cn";

/** Clearly labelled stand-in for an image that doesn't exist yet. Never imitates a real interface. */
export default function ImagePlaceholder({ label, hint, className }) {
  return (
    <div
      role="img"
      aria-label={`${label}. Image not added yet.`}
      className={cn(
        "hatch absolute inset-0 flex flex-col items-start  justify-end gap-1 p-4 sm:p-5",
        className,
      )}
    >
      <span className="meta text-ink-muted">{label}</span>
      {hint && <span className="meta text-ink-muted/80">{hint}</span>}
    </div>
  );
}
