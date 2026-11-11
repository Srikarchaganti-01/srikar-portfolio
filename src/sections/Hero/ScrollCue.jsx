/** Thin line with a travelling dot. Hidden on small screens. */
export default function ScrollCue() {
  return (
    <a href="#about" className="meta hidden shrink-0 items-center gap-3 text-ink-muted md:flex">
      Scroll
      <span aria-hidden="true" className="relative block h-10 w-px bg-rule">
        <span className="scroll-dot absolute left-1/2 size-1.5 -translate-x-1/2 rounded-full bg-signal" />
      </span>
    </a>
  );
}
