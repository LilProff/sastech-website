---
name: design-and-pages
description: Add a new page or homepage section, or change the Sastech visual design, theme colours, typography, motion or 3D hero, while keeping the design system, accessibility and performance intact.
---

# Pages, sections and design changes

Read `AGENTS.md` sections 4 to 6 first. The design direction is premium, calm, dark-tech with one cyan accent,
the hexagon motif, and real visuals (screenshots, live mini UIs) instead of stock filler.

## Add a page
1. Create `app/<route>/page.tsx` as a **server component**.
2. Export `metadata = pageMetadata({ title, description, path })` from `lib/seo.ts`.
3. Start with `<PageIntro crumbs title intro>` (gives breadcrumbs + the single H1), add
   `<JsonLd data={breadcrumbs([...])} />`, end with `<CtaBand />`.
4. Use `Container`, `.card`, tokens and `data-reveal` for sections. Keep client components small leaf files
   with `"use client"` only where interaction needs it.
5. Add the route to `app/sitemap.ts` and, if it belongs in navigation, to `nav`/`footerExtra` in
   `lib/site.ts` (header must stay on one line at 1024px: max 6 items).

## Add a homepage section
Add an exported component in `components/home/Sections.tsx` and place it in `app/page.tsx`. Each section
should use a different layout family from its neighbours (split, bento, list, timeline, chips, accordion).
Max one small uppercase "eyebrow" label per three sections.

## Change colours or theme
- Edit tokens in `app/globals.css`: dark values in `@theme`, light values in `:root[data-theme="light"]`.
- Keep WCAG AA: body text at least 4.5:1 in BOTH themes. Recheck `cyan` (text) and `muted` after changes.
- Button fills use the fixed `brand` colours with `on-brand` text; do not reuse `cyan` for fills.
- Theme-specific fixes that variables can't express go in the "Light theme adjustments" block.

## Motion
- Scroll reveals: `data-reveal` + optional `--d` delay. Entrances: `anim-rise`, `anim-fade`; use `anim-lift`
  (transform only) on the page's main headline so it still counts as the first paint.
- Animate only transform and opacity. No scroll event listeners, no GSAP/Framer additions without a reason.
- Every animation must collapse under `prefers-reduced-motion`.

## 3D hero (`components/hero/`)
- `scene.ts` builds the extruded logo from `lib/mark.ts` + node field + data pulses. Options: `lite`,
  `light`, `onSlow`.
- `HeroCanvas.tsx` gates loading (desktop, fine pointer, first interaction, no Save-Data/low memory,
  not reduced motion), handles slow-frame fallback and theme rebuilds. Do not load it eagerly or on phones.
- `HeroFallback.tsx` is what phones and most first paints see; keep it lightweight (CSS transforms only).

## Before you finish
Check desktop (1440px) and phone (375px) in dark AND light themes, no horizontal scroll, one H1,
visible focus states, then `ship-and-verify`.
