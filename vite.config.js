import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

/**
 * Resolves the public site URL for absolute SEO tags, the sitemap and robots.txt.
 * Order: VITE_SITE_URL, then Vercel's production URL. If neither exists, tags
 * that need an absolute URL are removed from the built HTML rather than left
 * pointing at nothing.
 */
function siteMeta(env) {
  const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  const raw = env.VITE_SITE_URL || (vercelUrl ? `https://${vercelUrl}` : "");
  const base = raw.replace(/\/+$/, "");

  return {
    name: "site-meta",
    transformIndexHtml(html) {
      if (base) return html.replaceAll("__SITE_URL__", base);
      return html
        .split("\n")
        .filter((line) => !line.includes("__SITE_URL__"))
        .join("\n");
    },
    generateBundle() {
      const robots = ["User-agent: *", "Allow: /"];
      if (base) robots.push(`Sitemap: ${base}/sitemap.xml`);
      this.emitFile({ type: "asset", fileName: "robots.txt", source: robots.join("\n") + "\n" });

      if (base) {
        const urls = ["/", "/projects"]
          .map((path) => `  <url><loc>${base}${path}</loc></url>`)
          .join("\n");
        this.emitFile({
          type: "asset",
          fileName: "sitemap.xml",
          source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
        });
      }
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [react(), tailwindcss(), siteMeta(env)],
  };
});
