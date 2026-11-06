---
name: update-business-facts
description: Change Sastech business facts shown site-wide (phone/WhatsApp, email, booking link and label, social profiles, legal name, CAC number, location, founder details, navigation). Use for any "change my number / add my CAC / update socials / rename menu" request.
---

# Update business facts

All site-wide facts live in **`lib/site.ts`**. Components read from it, so one edit updates the header,
footer, contact page, CTAs, structured data and social images. Never hard-code these in pages.

## Where each fact lives

| Fact | Field in `lib/site.ts` | Shows up in |
|---|---|---|
| WhatsApp number | `site.whatsapp.number` (digits only, country code, no +) | every WhatsApp button, contact page, JSON-LD |
| Booking link / button text | `site.booking.url`, `site.booking.label` | every primary CTA, header, footer, Calendly embed |
| Email | `site.email`, `site.privacyEmail` | footer, contact, privacy page, JSON-LD, form errors |
| Legal name | `site.legal.name` | footer copyright, privacy, terms, About, JSON-LD `legalName` |
| CAC RC/BN number | `site.legal.registration` (empty string = hidden) | see "Adding the CAC number" |
| Location | `site.legal.address` (currently "Lagos, Nigeria") | footer, About, privacy, terms |
| Social profiles | `site.socials[]` (`label` must match a key in `SOCIAL_ICONS` in `components/ui.tsx`; `live: false` hides it) | footer icons, contact page, JSON-LD `sameAs` |
| Founder | `site.founder` (name, role, `image`, personal `sameAs` links) | About, article bylines, Person JSON-LD |
| Navigation | `nav` and `footerExtra` | header (keep it to one line at 1024px), footer |

## Steps

1. Edit the field in `lib/site.ts`.
2. **Adding the CAC number** (only once the owner has it): set `site.legal.registration`, then show it in
   `components/Footer.tsx` (copyright line), the About "Company details" grid (`app/about/page.tsx`) and
   the Terms intro (`app/terms/page.tsx`). Also add `"identifier"` to `organizationGraph()` in
   `lib/seo.ts`. Until then, never write "CAC-registered" anywhere.
3. **New social network:** add the icon to `SOCIAL_ICONS` in `components/ui.tsx` (Phosphor brand icon,
   e.g. `ThreadsLogo`), then add the entry to `site.socials`.
4. **New founder photo:** export a JPG (about 600 to 900 px wide, 3:4), save it under a NEW filename in
   `public/`, update `site.founder.image`, and update the `width`/`height` props on the `<Image>` in
   `app/about/page.tsx`. A new filename avoids stale cached versions.
5. Run `npm run build`, then follow `ship-and-verify`.

## Rules
- Facts come from the owner only. If asked to "fill in" something unknown, ask; do not guess.
- Keep `site.url` as `https://www.sastech.com.ng` (canonical host).
