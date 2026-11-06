---
name: add-insight-article
description: Write, edit or update an article in the Sastech Insights section (blog). Use for "write a blog post about...", "add an insight", "update the NDPA article".
---

# Add an Insights article

Articles are data in **`lib/insights.ts`** (`articles` array, type `Article`). The `/insights` index, the
`/insights/<slug>` page, Article JSON-LD, Open Graph article tags and the sitemap come from it.

## Fields
- `slug` kebab-case keyword phrase, e.g. `whatsapp-automation-nigeria-guide` (never change once live).
- `title` (about 60 chars), `description` (<= 155 chars, used as meta description).
- `published`, `updated`: ISO dates `YYYY-MM-DD`. When you revise an article, change only `updated`.
- `readMinutes` (about 200 words per minute), `pillar` (links the article to a service page), `topic` label.
- `body`: blocks of `{ type: "p", text }`, `{ type: "h2", text }`, `{ type: "ul", items: [] }`,
  `{ type: "callout", text }`. Use a callout for the closing CTA or a legal disclaimer.

## Editorial rules (from the business knowledge base)
- Topic clusters: WhatsApp automation for Nigerian businesses; websites and SEO for small businesses; AI for
  logistics, real estate, retail, short-lets; CRM and lead follow-up; data privacy (NDPA 2023) for
  businesses using AI.
- Original, practical, plain English. Real examples, no thin keyword pages.
- **Research before claims.** Never invent statistics. Prices, platform rules (Meta/WhatsApp) and laws change:
  hedge them and tell readers to check the current source. Legal topics get a "not legal advice" callout.
- Never name clients or show client data. No paused marketing services.
- Zero em dashes. 500 to 900 words. End with a callout that points to the free call.
- Author is the founder (`site.founder`); the byline and Person link are automatic.

## Then
`npm run build`, open the article locally, check headings read well and the measure is comfortable,
then follow `ship-and-verify`.
