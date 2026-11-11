# Srikar Chaganti — Portfolio

An editorial, Morse-inspired personal portfolio built with React, Vite, Tailwind CSS v4, React Router and Motion. Frontend-only, ready for Vercel.

## Quick start

Requires Node 20.19+ (or 22.12+).

```bash
npm install
cp .env.example .env     # Windows PowerShell: Copy-Item .env.example .env
npm run dev              # http://localhost:5173
```

Other scripts: `npm run lint`, `npm run build`, `npm run preview`.

## What to edit

| Want to change | File |
|---|---|
| Name, email, social links, nav, **resume URL**, **portrait** | `src/config/site.js` |
| Hero, About and Contact copy | `src/data/content.js` |
| Projects (add, reorder, links, screenshots) | `src/data/projects.js` |
| Experience / Education / Skills | `src/data/experience.js`, `education.js`, `skills.js` |
| Colours, fonts, type scale | `src/styles/index.css` (`@theme`) |

### Placeholders still to fill in
- **Resume:** set `resumeUrl` in `src/config/site.js` (currently `YOUR_RESUME_LINK_HERE`). Until then the button reads "Request resume" and opens an email to you. It never links to a fake URL.
- **Contact form key:** set `VITE_WEB3FORMS_KEY` (see below). Without it the form opens the visitor's email app and says so; it never claims a message was sent.
- **After Credits repository:** set `github` in `src/data/projects.js`.
- **Portrait / screenshots:** put files in `public/` and set `portrait` (config) or `image` (per project, e.g. `"/projects/nextask.png"`). Placeholders show until then.
- **Education period:** set `period` in `src/data/education.js`; it is hidden while `null`.
- **Project years/status:** optional fields in `projects.js`.

### Adding a project
Add one object to `src/data/projects.js`. Numbers are derived automatically, the archive page and skill cross-references update by themselves. For the home page, set `featured: true` and optionally `featuredLayout` (`lead | offset | panorama | compact`). If omitted, an alternating fallback composition is used. A brand-new composition is one function in `src/sections/Projects/layouts.jsx`.

## Contact form (Web3Forms)
1. Get a free access key at https://web3forms.com (use `srikarchaganti.16@gmail.com`).
2. Locally: put it in `.env` as `VITE_WEB3FORMS_KEY=...`.
3. On Vercel: Project → Settings → Environment Variables → add `VITE_WEB3FORMS_KEY`, then redeploy.
4. Restrict the key to your domain in the Web3Forms dashboard. The key is public by design (it ships in the bundle). Never commit `.env`.

## GitHub activity
Contributions come from the keyless public service `github-contributions-api.jogruber.de`; the repo count comes from GitHub's public REST API. No tokens are used. Results are cached in `sessionStorage` for an hour. If either call fails, the section shows a fallback with a link to your profile and a retry button; nothing is fabricated. If the third-party service proves unreliable, replace the body of `fetchGithubActivity` in `src/lib/github.js` with a call to your own serverless function.

## Deploy to Vercel
1. Push to GitHub (`.env` is git-ignored).
2. Import the repo at https://vercel.com/new. Framework preset: Vite (build `npm run build`, output `dist`).
3. Add `VITE_WEB3FORMS_KEY`. Deploy.

`vercel.json` rewrites all routes to `index.html`, so `/projects` survives a refresh and unknown URLs reach the custom 404.

**SEO URL tags:** canonical, `og:url`, `og:image`, `sitemap.xml` and `robots.txt`' sitemap line need an absolute URL. The build reads `VITE_SITE_URL` or Vercel's production URL automatically; with neither, those tags are omitted rather than left broken. Set `VITE_SITE_URL` if you use a custom domain.

## Structure
```
src/
  config/site.js      identity, links, resume, nav, form settings
  data/               projects, experience, education, skills, copy
  lib/                morse, project helpers, skill index, github, contact
  hooks/              active section, GitHub data, local time, document meta
  components/layout/  SiteLayout, Navbar, MobileMenu, Footer, ScrollManager
  components/ui/      Button, TextLink, Section, Morse, Reveal, ...
  sections/           Hero, About, Projects, Experience, Skills, Activity, Contact
  pages/              Home, AllProjects, NotFound
```

## Verification status
This project was written in an environment without network access.

**Run:** an esbuild parse of every `.js`/`.jsx` file (no syntax errors) and a check that all relative imports resolve.

**Not run (do these first):** `npm install`, `npm run lint`, `npm run build`, and any browser testing (layout, animations, mobile menu, contact form, live GitHub data). No `package-lock.json` is included because it can't be generated offline; `npm install` creates it, and you should commit it. Dependency versions in `package.json` are caret ranges chosen from memory and unverified. If one fails to resolve, relax it. The third-party contributions API (`github-contributions-api.jogruber.de`) was not tested against your profile.

If lint or build reports errors, send me the output and I'll fix them.
