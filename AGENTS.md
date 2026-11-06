<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Sastech Consults website: agent guide

Read this whole file before changing anything. It is the shared brain for every coding agent
(Claude Code, Codex, OpenCode, Cursor, others). Step-by-step playbooks live in `.agents/skills/`.

## 1. What this is

- **Live site:** https://www.sastech.com.ng (Vercel, auto-deploys `main`).
- **Repo:** `LilProff/sastech-website`, **public**. It must stay public: the Vercel account is on the
  Hobby plan and blocks deploys from a private repo. Protect confidential material with `.gitignore`,
  never by making the repo private.
- **Owner:** Samuel Sholarin, founder of Sastech Consults (Lagos). Not a terminal user: explain in plain
  English, do the git work yourself, give him links to check on his phone.
- **Business:** a tech and AI consultancy for Nigerian SMEs. Positioning: "We help businesses earn more,
  save time and cut cost with AI systems and a web presence that works."
- **Three service pillars:** (1) Web presence and SEO, (2) Operations tools, (3) AI and automation.
  Service codes S1 to S7 live in `lib/content.ts`.
- **Goal of the site:** visitors find, verify and trust Sastech on their own, then book a free call.
  Primary CTA everywhere: "Book a free 15-min call" (Calendly). Secondary: WhatsApp.

### Private context (local only)
If `docs/` exists in your checkout, read these first. They are gitignored and never pushed:
- `docs/HANDOFF_PRIVATE.md`: history, decisions, client names, accounts, open items.
- `docs/Sastech_Claude_Knowledge_Base.md`: business source of truth (services, rules, voice).
- `docs/Sastech_Website_Rebuild_Brief.md`: original design and SEO brief.
- `docs/brand/`: logo files.
If they're missing, ask the owner for them rather than guessing facts.

## 2. Non-negotiable rules

1. **Never invent facts.** No made-up clients, numbers, results, testimonials, reviews, awards, partner
   logos, prices, certifications or registrations. If you don't know it, ask the owner. Do not put
   placeholder text such as `[FILL]` on the public site; add the question to the owner's private checklist
   (`docs/HANDOFF_PRIVATE.md`, section "Open items") instead.
2. **Client confidentiality.** Systems built for clients behind a login are shown anonymously
   ("a logistics company in Lagos", "a Lagos haulage company"), with redacted previews and no real
   figures, staff names, trucks, routes or customer data. Do not name those clients until the owner
   confirms written permission. Public client websites and Sastech's own products may be named.
3. **Paused service.** Never offer, mention or sell digital marketing, content creation, social media
   management, ads or publicity as a client service.
4. **No CAC/registration claims.** The business is not CAC-registered yet. Legal name: "Sastech Consults".
   Location: "Lagos, Nigeria". No street address.
5. **No secrets in the repo.** The repo is public. API keys go in Vercel environment variables only
   (`RESEND_API_KEY`, optional `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`). Never commit `.env*`, `docs/`,
   `.shots/` or `.claude/`. Before every push run the secret and name scan in
   `.agents/skills/ship-and-verify/SKILL.md`.
6. **Copy style.** Plain English, short sentences, Nigerian business audience first. **Zero em dashes
   (—) or en dashes (–) in visible copy**: use commas, colons, full stops or parentheses. No hype words
   ("revolutionary", "seamless", "unleash"). Hedge anything that changes (prices, laws, platform rules).
7. **Accessibility and performance are requirements.** WCAG AA contrast in both themes, one H1 per page,
   keyboard focus visible, `prefers-reduced-motion` respected, fast on a mid-range Android on mobile data.

## 3. Stack

- Next.js 16 App Router (Turbopack), React 19, TypeScript, Tailwind CSS v4 (`@tailwindcss/postcss`).
  Every page is statically generated. The only server code is `app/api/contact/route.ts`.
- Node **22.x** (pinned in `package.json` `engines`). Next 16 needs Node 20.9 or newer.
- `three` for the homepage hero only (lazy-loaded). `@phosphor-icons/react` for all icons (use
  `@phosphor-icons/react/dist/ssr` in server components). `@vercel/analytics` (cookieless).
- Fonts via `next/font/google`: Montserrat 600/700 (`--font-display`, headings), Inter (`--font-sans`,
  body, not preloaded on purpose so the headline font wins the bandwidth race).
- No CMS: content is typed TypeScript data in `lib/`. Edit the data, not the page components.
- `vercel.json` forces `framework: nextjs` and `outputDirectory: .next` because the Vercel project was
  first created for an old Vite site. Do not remove it.

## 4. Codebase map (the layers)

```
lib/                      DATA AND CONFIG LAYER (edit here for most content changes)
  site.ts                 business facts: name, URL, email, booking link, WhatsApp, socials, founder, nav
  content.ts              service pillars (copy, FAQs, metadata), S1-S7 catalogue, process steps,
                          pricing models, sectors, the logistics pilot case, home FAQ, values
  projects.ts             portfolio entries (screenshot or redacted preview per project)
  insights.ts             blog articles as typed blocks (p, h2, ul, callout) + date helper
  seo.ts                  pageMetadata() helper + JSON-LD builders (Organization, Service, FAQ, Person...)
  og.tsx                  branded 1200x630 social image renderer
  mark.ts                 SVG path data of the hexagon S logo (used by Logo, 3D scene, icons)
  theme.ts                theme colours + the no-flash inline script

app/                      ROUTES LAYER (Next.js App Router, one folder per URL)
  layout.tsx              fonts, theme script, Header/Footer, org JSON-LD, analytics
  page.tsx                homepage: Hero > Problems > Pillars > SelectedWork > Proof > Process >
                          Sectors > FAQ > CTA
  services/, services/[slug]/   overview + 3 pillar pages (slugs from lib/content.ts)
  portfolio/, portfolio/[slug]/ grid + one page per project (from lib/projects.ts)
  insights/, insights/[slug]/   article index + article pages (from lib/insights.ts)
  events/                 events list (empty state until real events are added in the file)
  process/, about/, contact/, privacy/, terms/, not-found.tsx
  api/contact/route.ts    POST form handler -> Resend REST API (honeypot + timing bot checks)
  sitemap.ts, robots.ts, manifest.ts, opengraph-image.tsx, apple-icon.tsx, icon.svg

components/               UI LAYER
  ui.tsx                  primitives: Container, BookCallButton, WhatsAppButton, TextLink, HexMark,
                          HexDivider, JsonLd, Breadcrumbs, SocialLinks, Fact, cn()
  Header.tsx (client)     floating pill nav, mobile menu, ThemeToggle
  Footer.tsx, PageIntro.tsx (inner page hero), CtaBand.tsx, Faq.tsx (native <details>)
  ProjectCard.tsx         portfolio card + ProjectVisual (screenshot or RedactedPreview)
  RedactedPreview.tsx     confidential app previews: real layouts, every value blurred
  ContactForm.tsx (client), CalendlyEmbed.tsx (client, click-to-load for privacy)
  Reveal.tsx (client)     one IntersectionObserver for every [data-reveal] element
  ThemeToggle.tsx (client)
  home/Sections.tsx       homepage sections + ProcessTimeline, SystemDiagram, PillarWork
  mockups/Mockups.tsx     live animated pillar demos (search, orders, chat), "Sample" labelled
  hero/Hero.tsx           hero layout; HeroCanvas.tsx (client loader); scene.ts (three.js);
                          HeroFallback.tsx (static animated SVG for phones/reduced motion)

app/globals.css           DESIGN SYSTEM LAYER: tokens, light theme, .btn/.card, motion keyframes
public/                   brand SVGs, founder photo (samuel-sholarin.jpg), project screenshots (work/*.webp)
```

## 5. Design system

- **Dark is the brand default**; light mode via the header toggle (stored in `localStorage.theme`).
  Theming works by redefining CSS variables under `:root[data-theme="light"]` in `app/globals.css`.
  Never hard-code colours in components; use the tokens (`bg-navy-900`, `text-ink-2`, `border-line`...).
  Tailwind's `dark:` variant is bound to `data-theme`, not the OS setting.
- **Tokens:** `navy-950/900/850/800` are surfaces (they turn near-white in light mode), `line`,
  `line-strong` borders, `ink`, `ink-2`, `muted` text, `faint` (decorative only), `cyan`/`cyan-deep`
  accent text, `brand`/`brand-deep` fixed logo cyan for button fills, `on-brand` text on cyan, `success`
  for real status pills only. Cyan is the only accent colour.
- **Shapes:** buttons are full pills, cards 20px (`--radius-card`), inputs 12px.
- **Type:** Montserrat headings, Inter body. Sizes via `--text-display` and `--text-title`.
- **Motif:** the hexagon (HexMark bullets, HexDivider, hex background `.bg-hex`, 3D hero).
- **Motion:** add `data-reveal` (plus optional `style={{"--d":"80ms"}}`) for scroll reveals; CSS-only
  entrances (`anim-rise`, `anim-lift` for LCP text, `anim-fade`). Everything respects reduced motion.
  No scroll listeners, no new animation libraries.
- **3D hero rules:** loads only on desktop with a fine pointer, after the first user interaction, never
  under reduced motion, Save-Data or low memory; skips software WebGL; falls back if frames run slow;
  rebuilds on theme change. Phones always get `HeroFallback`. Keep it that way for performance.
- **Images:** screenshots are 1440x900 WebP in `public/work/`. Rename a file when replacing an image
  (the image optimiser caches by URL).

## 6. SEO

- Every page exports metadata through `pageMetadata({ title, description, path })` in `lib/seo.ts`.
  Titles about 60 characters max (the brand suffix is added automatically only when it fits), descriptions
  155 max, one H1, canonical on `https://www.sastech.com.ng`.
- JSON-LD: Organization + ProfessionalService site-wide (layout), BreadcrumbList on inner pages,
  Service + FAQPage on pillar pages, Article on insights, CreativeWork on projects, Person on About.
- New routes must be added to `app/sitemap.ts` (data-driven routes are added automatically).
- Old URLs are kept alive with 301s in `next.config.ts`. Never break an existing URL; add a redirect.

## 7. Commands

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # must pass before every push (type-checks too)
npm run start        # serve the production build locally
```

## 8. How to make common changes (playbooks)

| Task | Playbook |
|---|---|
| Change phone, email, socials, booking link, legal details, nav | `.agents/skills/update-business-facts/SKILL.md` |
| Add or edit a portfolio project (incl. screenshots, confidentiality) | `.agents/skills/add-portfolio-project/SKILL.md` |
| Write or edit an Insights article | `.agents/skills/add-insight-article/SKILL.md` |
| Add an event | `.agents/skills/add-event/SKILL.md` |
| Change service copy, FAQs, pricing models | `.agents/skills/edit-services-content/SKILL.md` |
| Add a page or section, change design or motion | `.agents/skills/design-and-pages/SKILL.md` |
| Build, check, commit, push, deploy, verify live | `.agents/skills/ship-and-verify/SKILL.md` |

## 9. Git and deploy workflow

- Work on a branch for anything larger than a copy fix; `main` deploys to production automatically.
- Commit author must be `Lilproff <ayomidesholarin13@gmail.com>` (set per repo) or Vercel may block it.
- After pushing, check the Vercel status on the commit:
  `gh api repos/LilProff/sastech-website/commits/<sha>/statuses --jq '.[0].description'`.
- Always finish with the live checks in `ship-and-verify`.

## 10. Current status (keep this section up to date)

- Live since 1 Nov 2026 (commit 2669861). 39 static pages, 13 portfolio projects, 4 articles,
  Events page in empty state.
- Contact form needs `RESEND_API_KEY` set in Vercel (Settings > Environment Variables) and a redeploy.
  The Resend domain sastech.com.ng is verified. Until then the form replies "not connected yet".
- Waiting on the owner (details in `docs/HANDOFF_PRIVATE.md`): WhatsApp number confirmation, CAC number,
  booking call length (button says 15 min, Calendly event is 30 min), client naming permissions, internal
  app screenshots to blur, Ndara and PayFlow details, public prices, event dates, legal review.
- Known gap: phone Lighthouse performance measured about 75 on a slow dev machine. Verify with PageSpeed
  Insights on the live URL before optimising further.
