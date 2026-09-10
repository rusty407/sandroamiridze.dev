# rusty407 — portfolio

Personal portfolio site for Sandro Amiridze ([@rusty407](https://github.com/rusty407)) —
security engineer / systems programmer. Built with [Astro](https://astro.build),
TypeScript, [Tailwind CSS v4](https://tailwindcss.com), and React islands for
the interactive pieces only.

## Stack

- **Astro** — static-first HTML for every section; ships zero JS by default.
- **TypeScript** — strict mode, across both `.astro` files and React components.
- **Tailwind CSS v4** — via the `@tailwindcss/vite` plugin (no `tailwind.config`
  file; theme tokens live in `src/styles/global.css` under `@theme`).
- **React 19** — used *only* for the two components that need client-side
  state (the hero's rotating role badge and the Aegis session-lifecycle
  diagram), hydrated as [Astro islands](https://docs.astro.build/en/concepts/islands/)
  with `client:load` / `client:visible`. Everything else — including the
  hero's cursor-spotlight glow and the skills marquee — is plain static
  Astro/HTML/CSS with no JS shipped.

## Project structure

```
src/
  components/
    react/                    # React islands (interactive only)
      RoleRotator.tsx
      SessionLifecycleDiagram.tsx
    Nav.astro
    Hero.astro
    Marquee.astro
    Skills.astro
    Aegis.astro
    ProjectCard.astro
    OtherProjects.astro
    About.astro
    Footer.astro
  data/
    site.ts                   # name, links, project copy — edit here first
  layouts/
    Layout.astro               # <head>, fonts, global chrome
  pages/
    index.astro                 # assembles all sections
  styles/
    global.css                  # Tailwind import + design tokens/theme
public/
  favicon.svg
```

To update contact info, project descriptions, or links, start with
`src/data/site.ts` — it's the single source of truth consumed by the hero,
footer, and project grid.

## Getting started

Requires Node.js 22+ (see `engines` in `package.json`).

```bash
npm install
npm run dev        # http://localhost:4321
```

Other scripts:

```bash
npm run build      # type-check + build to dist/
npm run preview    # serve the production build locally
npx astro check    # type-check only
```

## Accessibility notes

- The hero's rotating role badge is `aria-hidden`: the real role text
  ("Security Engineer / Systems Programmer") is static, always-visible
  semantic HTML right next to it, so nothing is lost without JS.
- The Aegis lifecycle diagram renders its default stage's full description
  on the server before hydration, and the connecting-arrow SVGs are
  `aria-hidden` (purely decorative) — the stage buttons and description text
  are real, keyboard-operable content.
- The hero's cursor-spotlight glow and the skills marquee are both
  `aria-hidden`/decorative and skip their motion entirely under
  `prefers-reduced-motion: reduce`.
- Mobile navigation uses a native `<details>/<summary>` disclosure — no JS
  required for the menu to work.

## Deployment

The site builds to static HTML (`output: "static"`, the Astro default) — no
server adapter needed for either target below.

### Cloudflare Pages

- Build command: `npm run build`
- Output directory: `dist`
- Node version: 22 (set via project settings or a `.node-version` file)

### Netlify

A `netlify.toml` is already included (build command `npm run build`, publish
directory `dist`). Connect the repo and deploy — no extra configuration
needed.

## Before going live

- `src/data/site.ts` — the `email` field is a placeholder
  (`contact@rusty407.dev`); replace it with a real address.
- Swap `site.siteUrl` for the real production domain if you rely on absolute
  OG/meta URLs later.
