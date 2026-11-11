import { cn } from "../../lib/cn";

const mark = "absolute size-3 border-ink/70";

/** Print-style crop marks around its children. */
export default function CropMarks({ children, className }) {
  return (
    <div className={cn("relative p-3", className)}>
      <span aria-hidden="true" className={cn(mark, "left-0 top-0 border-l border-t")} />
      <span aria-hidden="true" className={cn(mark, "right-0 top-0 border-r border-t")} />
      <span aria-hidden="true" className={cn(mark, "bottom-0 left-0 border-b border-l")} />
      <span aria-hidden="true" className={cn(mark, "bottom-0 right-0 border-b border-r")} />
      {children}
    </div>
  );
}
