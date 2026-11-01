// Single source of business facts for the website.
// Rule (docs/Sastech_Claude_Knowledge_Base.md): never invent facts. Anything unknown
// stays as a visible "[FILL: ...]" string until Samuel supplies it.

export const site = {
  name: "Sastech Consults",
  shortName: "Sastech",
  url: "https://www.sastech.com.ng",
  tagline: "Websites that get found. Systems that do the work.",
  description:
    "We help businesses earn more, save time and cut cost with AI systems and a web presence that works.",
  locale: "en_NG",
  email: "hello@sastech.com.ng",
  privacyEmail: "privacy@sastech.com.ng",
  booking: {
    url: "https://calendly.com/ayomidesholarin13/30min",
    label: "Book a free 15-min call",
  },
  whatsapp: {
    // [FILL: confirm business WhatsApp number] The old site used this number publicly.
    number: "2348022324523",
    message: "Hi Sastech, I'd like to talk about my business.",
    label: "Chat on WhatsApp",
  },
  legal: {
    name: "Sastech Consults",
    registration: "",
    address: "Lagos, Nigeria",
  },
  areaServed: ["Lagos", "Nigeria"],
  founder: {
    name: "Samuel Sholarin",
    fullName: "Samuel Ayomide Sholarin",
    role: "Founder, AI Systems Architect",
    image: "/samuel-sholarin.jpg",
    sameAs: ["https://linkedin.com/in/samuel-sholarin", "https://github.com/Lilproff"],
  },
  // One handle everywhere: @sastechconsults (decided 31 Oct 2026).
  socials: [
    { label: "Instagram", href: "https://www.instagram.com/sastechconsults", live: true },
    { label: "LinkedIn", href: "https://www.linkedin.com/company/sastechconsults", live: true },
    { label: "X", href: "https://x.com/sastechconsults", live: true },
    { label: "Facebook", href: "https://www.facebook.com/sastechconsults", live: true },
    { label: "YouTube", href: "https://www.youtube.com/@sastechconsults", live: true },
    { label: "TikTok", href: "https://www.tiktok.com/@sastechconsults", live: true },
  ],
  handle: "@sastechconsults",
} as const;

export const liveSocials = site.socials.filter((s) => s.live);

export const whatsappHref = `https://wa.me/${site.whatsapp.number}?text=${encodeURIComponent(
  site.whatsapp.message,
)}`;

export const nav = [
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "How we work", href: "/process" },
  { label: "Insights", href: "/insights" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export const footerExtra = [{ label: "Events", href: "/events" }] as const;

export function isFill(value: string) {
  return value.startsWith("[FILL");
}
