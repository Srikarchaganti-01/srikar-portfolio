import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { cn } from "../../lib/cn";

const classes =
  "group/link inline-flex items-center gap-1.5 border-b border-ink/30 pb-0.5 text-sm transition-colors duration-300 hover:border-signal-deep hover:text-signal-deep";

/** Underlined text link. Internal (`to`) or external (`href`, opens in a new tab). */
export default function TextLink({ href, to, children, className, icon: Icon = ArrowUpRight }) {
  // Pass icon={null} for a link without an arrow.
  const icon = Icon ? (
    <Icon
      aria-hidden="true"
      className="size-3.5 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
    />
  ) : null;

  if (to) {
    return (
      <Link to={to} className={cn(classes, className)}>
        {children}
        {icon}
      </Link>
    );
  }
  const external = /^https?:/i.test(href);
  return (
    <a
      href={href}
      className={cn(classes, className)}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
      {icon}
      {external && <span className="sr-only"> (opens in new tab)</span>}
    </a>
  );
}
