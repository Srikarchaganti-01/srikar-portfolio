import { useEffect } from "react";
import { site } from "../config/site";

/** Sets the document title (and optionally the description) per route. */
export function useDocumentMeta({ title, description } = {}) {
  useEffect(() => {
    document.title = title ? `${title} — ${site.name}` : site.seo.title;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", description ?? site.seo.description);
  }, [title, description]);
}
