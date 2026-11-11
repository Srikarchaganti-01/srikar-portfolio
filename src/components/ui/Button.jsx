import { Link } from "react-router-dom";
import { cn } from "../../lib/cn";

const base =
  "group/btn inline-flex items-center gap-2.5 px-5 py-3 text-sm font-medium transition-colors duration-300";
const variants = {
  solid: "bg-ink text-paper hover:bg-signal-deep",
  outline: "border border-ink text-ink hover:bg-ink hover:text-paper",
};

const isExternal = (href) => /^https?:/i.test(href);

/** Renders a router Link (`to`), an anchor (`href`) or a button, with a consistent look. */
export default function Button({ href, to, variant = "solid", icon: Icon, children, className, ...rest }) {
  const classes = cn(base, variants[variant], className);
  const content = (
    <>
      {children}
      {Icon && (
        <Icon aria-hidden="true" className="size-4 transition-transform duration-300 group-hover/btn:translate-x-0.5" />
      )}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {content}
      </Link>
    );
  }
  if (href) {
    const external = isExternal(href);
    return (
      <a
        href={href}
        className={classes}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...rest}
      >
        {content}
        {external && <span className="sr-only"> (opens in new tab)</span>}
      </a>
    );
  }
  return (
    <button type="button" className={classes} {...rest}>
      {content}
    </button>
  );
}
