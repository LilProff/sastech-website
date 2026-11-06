---
name: add-portfolio-project
description: Add, edit, feature or remove a Sastech portfolio project, including capturing screenshots of public sites and protecting confidential client systems with redacted previews. Use for "add this project to my portfolio", "update the case study", "use this screenshot".
---

# Add or edit a portfolio project

Projects are data in **`lib/projects.ts`** (`projects` array, type `Project`). The grid at `/portfolio`,
each `/portfolio/<slug>` page, the homepage "Selected work", the "Recent work" strip on service pages, the
sitemap and JSON-LD are all generated from it. Do not edit the page components to add a project.

## Decide the visual first

1. **Public website or our own product** (no login, no client data): use a real screenshot.
   - Capture the live page at **1440x900**, viewport only, after it has finished animating.
   - Convert with sharp to WebP: `resize(1440, 900, { fit: "cover", position: "top" }).webp({ quality: 78 })`.
   - Save as `public/work/<slug>.webp` (aim under 80 KB). Raw captures go in `.shots/` (gitignored).
   - Set `image: "/work/<slug>.webp"` and `url: "<live url>"`.
2. **Client system behind a login** (CRM, ERP, internal tools): CONFIDENTIAL.
   - Never show real figures, staff or customer names, truck numbers, routes, money amounts or client logos.
   - Use `preview: "<kind>"` (renders `components/RedactedPreview.tsx`). Existing kinds: `crm`, `erp`,
     `driver`, `maintenance`, `payments`, `projects`, `portal`. For a new kind, add a case to `Body()` that
     mirrors the real layout with module names only and `<X />` blurred blocks for every value, and add a
     label to `LABELS`.
   - If the owner supplies screenshots, blur every name and number with sharp (composite blurred rectangles
     over those regions), confirm with the owner, then save to `public/work/` and switch to `image`.
   - Client name stays anonymous ("A logistics company in Lagos", "A Lagos haulage company") unless the
     owner confirms written permission (tracked in `docs/HANDOFF_PRIVATE.md`).

## Fields

- `slug` (URL, kebab-case, never change once live; add a redirect in `next.config.ts` if you must),
  `name`, `client`, `kind` (`Product`, `Client website`, `Client system`, `AI engineering`),
  `pillar` (`websites-seo`, `operations-tools`, `ai-automation`), `tagline` (one line),
  `summary` (<= 155 chars reads best; used as meta description), `challenge`, `built[]` (3 to 6 items),
  `outcome` (what is true now, no invented numbers), optional `stack[]`, `featured` (max 4 shown on home),
  optional `note` (renders as a highlighted owner note: do NOT ship one to production).

## Writing rules
- Outcomes must be things the owner told you. "Live", "in daily use" only if confirmed.
- No metrics unless the owner gives a real, checkable number with the client's permission.
- Do not describe client websites as marketing services (the marketing service is paused).
- Zero em dashes in copy.

## Then
`npm run build` and follow `ship-and-verify`. Check the new page at desktop and phone width in both themes.
