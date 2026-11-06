---
name: edit-services-content
description: Change Sastech service copy, pillar pages, the S1-S7 catalogue, FAQs, process steps, pricing models, target sectors or the homepage case-study text. Use for "update my services", "add a FAQ", "show prices", "change the process".
---

# Edit services and core copy

Core copy is data in **`lib/content.ts`**:

| Export | Drives |
|---|---|
| `pillars[]` | the 3 service pillar pages (`/services/<slug>`), homepage pillar cards, footer, metadata (`metaTitle`, `metaDescription`), H1, problems, builds, FAQ (+ FAQPage JSON-LD), which mockup shows |
| `serviceCatalogue` (S1 to S7) | `/services` lists and pillar "What we build" codes |
| `commercialModels` | pricing explanation on `/services` and `/process#pricing` |
| `processSteps` | the 4-step timeline (home, process, pillar pages) |
| `sectors` | "Built for Nigerian businesses" chips |
| `pilot` | homepage case study + system diagram (anonymised logistics client) |
| `homeFaq` | homepage FAQ + FAQPage JSON-LD |
| `values` | About page values |

## Rules
- The three pillars and S1 to S7 are the current offer. Do not add digital marketing, content, social media
  management or ads services (paused by the owner).
- S1 (AI Business Audit) is **paid**; the discovery call is **free**. Never write "free audit".
- No prices on the site unless the owner gives them. If he does, add them to `commercialModels` or a new
  field and show them on `/process#pricing`; keep the "platform costs billed at cost" sentence.
- Pillar slugs (`websites-seo`, `operations-tools`, `ai-automation`) are live URLs: never rename without a
  redirect in `next.config.ts`.
- Pillar `metaTitle` targets search phrases ("website design Lagos", "WhatsApp automation Nigeria"). Keep
  them about 60 chars, descriptions <= 155.
- Plain English, zero em dashes, no invented numbers.

## Then
`npm run build` and `ship-and-verify`.
