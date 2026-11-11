import { cn } from "../../lib/cn";

/** Small mono label for a technology. */
export default function Tag({ children, className }) {
  return (
    <span
      className={cn(
        "meta inline-block border border-rule px-2 py-0.5 text-ink-muted transition-colors duration-300 group-hover:border-ink/30",
        className,
      )}
    >
      {children}
    </span>
  );
}
