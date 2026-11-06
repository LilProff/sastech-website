---
name: add-event
description: Add, update or remove a Sastech event (workshop, webinar, live session) on the Events page. Use for "add my workshop on...", "list our next webinar".
---

# Add an event

Events are a typed array at the top of **`app/events/page.tsx`** (`const events: SastechEvent[]`).
While it is empty the page shows a "first sessions are being scheduled" state with a WhatsApp button.
Each event automatically gets an Event JSON-LD entry.

## Fields
```ts
{
  title: "WhatsApp automation clinic",
  date: "2026-12-05T15:00:00+01:00",   // ISO with Lagos offset (+01:00)
  format: "Online",                     // or "In person"
  location: "Google Meet",              // venue name for in-person events
  summary: "One or two sentences on what attendees get.",
  registerUrl: "https://...",           // real sign-up link from the owner
}
```

## Rules
- Only real events with a date and a sign-up link from the owner. Never invent events.
- Remove past events (or move them to a "Past" list if the owner wants a record).
- The three "formats" cards on the page are planned formats; confirm with the owner before changing them.
- Zero em dashes. Then `npm run build` and `ship-and-verify`.
