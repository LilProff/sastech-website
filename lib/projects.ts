// Portfolio. Rules:
// - No confidential figures, staff names or client data. Internal systems use redacted
//   previews (components/RedactedPreview) until blurred screenshots are approved.
// - Clients of internal systems stay anonymous until they give written permission.
//   [FILL: written permission to name the logistics clients, or keep anonymous]
// - Public websites and our own products are shown as they appear live.

import type { PillarSlug } from "./content";

export type PreviewKind = "crm" | "erp" | "driver" | "maintenance" | "payments" | "projects" | "portal";

export type Project = {
  slug: string;
  name: string;
  client: string;
  kind: "Product" | "Client website" | "Client system" | "AI engineering";
  pillar: PillarSlug;
  tagline: string;
  summary: string;
  challenge: string;
  built: string[];
  outcome: string;
  stack?: string[];
  image?: string; // screenshot in /public/work
  preview?: PreviewKind; // redacted preview for internal apps
  url?: string;
  note?: string; // visible caveat, e.g. a [FILL]
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: "retailflow-os",
    name: "RetailFlow OS",
    client: "A gadget store",
    kind: "Client system",
    pillar: "operations-tools",
    tagline: "A complete retail operating system for a gadget store.",
    summary:
      "One workspace for sales, stock, customer messages, an AI shopping assistant and courier logistics, built for a gadget store that had outgrown notebooks and chats.",
    challenge:
      "Sales were recorded in different places, customers asked the same product questions all day, and deliveries were coordinated by phone. The owner had no single view of the business.",
    built: [
      "Sales ledger that records every transaction and syncs to Google Sheets",
      "AI shopping assistant that recommends products and answers customer questions",
      "Storefront and order flow connected to the ledger",
      "Courier and delivery tracking",
      "Competitor price tracking to keep prices sharp",
      "Owner dashboard with the day's sales and leads",
    ],
    outcome:
      "The whole store now runs from one system: sales are recorded as they happen, customers get answers faster, and the owner sees the business at a glance.",
    image: "/work/retailflow.webp",
    url: "https://retail-flow-os.vercel.app/",
    featured: true,
  },
  {
    slug: "logistics-ai-crm",
    name: "AI CRM and WhatsApp automation",
    client: "A logistics company in Lagos",
    kind: "Client system",
    pillar: "ai-automation",
    tagline: "An AI layer that helps a logistics team manage customers and grow.",
    summary:
      "A customer CRM with segments, WhatsApp campaigns, automations and an AI layer, so the team can follow up every enquiry and win back quiet customers.",
    challenge:
      "Leads, customer messages and follow-ups were handled by hand across phones and spreadsheets. Good leads went cold and repeat customers drifted away unnoticed.",
    built: [
      "Customer CRM with status stages from new enquiry to repeat and VIP",
      "Segments and WhatsApp campaigns, with marketing consent tracked per customer",
      "Automations, including win-back messages for dormant customers",
      "Automated lead sourcing and enrichment",
      "Telegram admin panel for broadcasts",
      "AI layer that sorts, drafts and summarises across the system",
    ],
    outcome:
      "Live and in daily use. It helps the team manage more customers and grow efficiently, and flags quiet customers before they are lost.",
    stack: ["n8n", "WhatsApp", "Telegram", "Apify", "Apollo", "Google Sheets", "OpenRouter", "Claude"],
    preview: "crm",
    featured: true,
  },
  {
    slug: "goalflow-ai",
    name: "GoalFlow AI",
    client: "Our product",
    kind: "Product",
    pillar: "ai-automation",
    tagline: "An AI execution system that turns goals into a planned day.",
    summary:
      "GoalFlow plans every hour of the day around four pillars (Build, Show, Earn, Systemize), adapts goal timelines, and uses an AI coach to keep people accountable.",
    challenge:
      "Planning apps make lists. They don't help people actually do the work, adjust when plans slip, or hold them to account day after day.",
    built: [
      "24-hour day planner with every block tracked",
      "Pillar-based goal planning with adaptive timelines",
      "Ryna, an AI coach for daily accountability",
      "One account across web, with iOS and Android apps in progress",
    ],
    outcome: "Live on the web and free during beta.",
    image: "/work/goalflow.webp",
    url: "https://goal-flow-livid.vercel.app/",
    featured: true,
  },
  {
    slug: "aa-and-co",
    name: "Animashaun Adetola & Co.",
    client: "Chartered Accountants, Ikeja",
    kind: "Client website",
    pillar: "websites-seo",
    tagline: "A credible, search-ready website for a chartered accounting firm.",
    summary:
      "A professional website for a Lagos firm of Chartered Accountants, with clear service and industry pages, insights, careers and a proposal request flow.",
    challenge:
      "Professional services are bought on trust. The firm needed a site that shows its credentials clearly and turns visits into proposal requests.",
    built: [
      "Service pages for audit, tax, forensic, advisory and CAC work",
      "Industry pages, insights, careers and gallery",
      "Proposal request flow and clear contact details",
      "Technical SEO for searches like chartered accountants in Lagos",
    ],
    outcome: "Live, with every service and the proposal request a click away.",
    image: "/work/aaandco.webp",
    url: "https://aaandcoprofessionals.com/",
    featured: true,
  },
  {
    slug: "sabi-biz",
    name: "Sabi Biz",
    client: "Our product",
    kind: "Product",
    pillar: "ai-automation",
    tagline: "Bookkeeping for small shops, done in a chat.",
    summary:
      "Shop owners send sales and expenses on Telegram the way they would say them, in Pidgin or English. Sabi Biz writes them into the books and reports profit whenever asked.",
    challenge:
      "Most small shops never keep books because forms and spreadsheets are a chore. They need something that fits how they already talk.",
    built: [
      "Telegram bot that understands Pidgin and English, including amounts like 250k",
      "Automatic sorting into sales and expenses",
      "Profit answers on request",
      "Web dashboard that mirrors every entry",
    ],
    outcome: "Live on Telegram, with WhatsApp support on the way.",
    image: "/work/sabibiz.webp",
    url: "https://sabi-biz-web-zg9v.onrender.com/",
  },
  {
    slug: "ndara-ai",
    name: "Ndara.ai",
    client: "Ndara.ai",
    kind: "AI engineering",
    pillar: "ai-automation",
    tagline: "AI engineering for a WhatsApp sales automation platform.",
    summary:
      "AI engineering work on Ndara.ai, a platform that automates customer conversations, catalogues, follow-ups and bookings on WhatsApp for African businesses.",
    challenge:
      "Customers buy on WhatsApp, but sales stall when nobody replies in time. The platform needs AI that answers accurately, sends the right products and follows up on its own.",
    built: [
      "AI conversation flows for support and sales",
      "Automatic product, price and availability replies",
      "Follow-up logic that recovers stalled sales",
    ],
    outcome: "Live platform serving businesses on WhatsApp.",
    image: "/work/ndara.webp",
    url: "https://ndara.ai",
  },
  {
    slug: "logistics-erp",
    name: "Logistics operations ERP",
    client: "A Lagos haulage company",
    kind: "Client system",
    pillar: "operations-tools",
    tagline: "One system for trips, fleet, drivers, safety and finance.",
    summary:
      "An operations ERP that runs a haulage fleet: trip pipeline, fuel logs, geofence events, documents, drivers, safety, tyres, maintenance, HR, finance and an AI assistant.",
    challenge:
      "Fleet operations were spread across spreadsheets, calls and paper. Managers could not see trips, trucks and incidents in one place.",
    built: [
      "Trip pipeline, fuel logs and geofence events",
      "Fleet, driver, safety and tyre records",
      "Department modules for maintenance, IT, HR and learning, and finance",
      "Date-filtered operations dashboard",
      "Built-in AI assistant for operations questions",
    ],
    outcome: "Managers get one place to see trips, fleet and incidents across departments.",
    preview: "erp",
    featured: true,
  },
  {
    slug: "axletiq",
    name: "Axletiq",
    client: "A Lagos haulage company",
    kind: "Client system",
    pillar: "operations-tools",
    tagline: "Maintenance management for a truck fleet.",
    summary:
      "A workshop system that tracks every maintenance job from request to repair, with a live board, fleet records and a cost view for leadership.",
    challenge:
      "Repairs were requested verbally and tracked on paper, so jobs stayed open too long and nobody knew what maintenance really cost.",
    built: [
      "Work order board with jobs that need attention flagged",
      "Trucks, trailers, drivers and tyre records",
      "Inspections and maintenance schedule",
      "Monitor and cost dashboard for leadership",
    ],
    outcome: "Every job is now visible, and stuck work is surfaced instead of forgotten.",
    preview: "maintenance",
  },
  {
    slug: "driver-app",
    name: "Driver app",
    client: "A Lagos haulage company",
    kind: "Client system",
    pillar: "operations-tools",
    tagline: "A mobile app drivers use on every trip.",
    summary:
      "Drivers see their active trip and route, check truck and tyre status, complete inspections and record each trip step from their phone.",
    challenge:
      "Trip updates came in by phone call, so the office was always a step behind what was happening on the road.",
    built: [
      "Active trip view with route and truck details",
      "Pre-trip inspections and truck status",
      "Trip steps, fuel, loading and delivery records",
      "Trip history and driver profile",
    ],
    outcome: "Trip information flows from the road to the office as it happens.",
    preview: "driver",
  },
  {
    slug: "payflow",
    name: "PayFlow",
    client: "A Lagos haulage company",
    kind: "Client system",
    pillar: "operations-tools",
    tagline: "Automated payments that keep logistics moving.",
    summary:
      "An automated payment gateway system for logistics operations, so payments are tracked from request to completion instead of chased by phone.",
    challenge:
      "Operational payments needed many manual steps and follow-ups, which slowed trips and made reconciliation hard.",
    built: [
      "Payment gateway integration",
      "Automated payment flows for operations",
      "Full payment records for reconciliation",
    ],
    outcome: "Payments run on a clear, automated flow with a record for every one.",
    preview: "payments",
  },
  {
    slug: "projecthub",
    name: "ProjectHub",
    client: "A Lagos haulage company",
    kind: "Client system",
    pillar: "operations-tools",
    tagline: "Project and task management across every department.",
    summary:
      "A full project and task management platform: projects by department, to-dos, blockers, progress tracking, team rhythm and growth tracking.",
    challenge:
      "Work across departments lived in chats and meetings, so blockers surfaced late and progress was hard to see.",
    built: [
      "Projects grouped by department, in card and table views",
      "To-do and blocker views for every team",
      "Progress tracking with next actions",
      "Rhythm for stand-ups and Grow for people development",
    ],
    outcome: "Leadership sees every project's status and blockers in one overview.",
    preview: "projects",
  },
  {
    slug: "staff-portal",
    name: "Staff portal and AgentDesk",
    client: "A Lagos haulage company",
    kind: "Client system",
    pillar: "ai-automation",
    tagline: "One front door for every internal app, with an AI assistant.",
    summary:
      "A single portal where staff open every internal app they need, plus AgentDesk, an AI assistant for operations questions and tasks.",
    challenge:
      "Staff had many tools and logins and kept asking where things were. Simple questions took someone else's time.",
    built: [
      "Role-based portal for operations, maintenance, forms, projects and support apps",
      "AgentDesk AI assistant for operations questions and tasks",
      "Support ticket flow for IT and telematics issues",
    ],
    outcome: "Staff find the right app in seconds and get answers without waiting on a colleague.",
    preview: "portal",
  },
  {
    slug: "crafex",
    name: "Craféx Creative",
    client: "Digital creative studio, Lagos",
    kind: "Client website",
    pillar: "websites-seo",
    tagline: "A bold, motion-led website for a creative studio.",
    summary:
      "A portfolio-led website for a Lagos creative studio, with strong typography, motion and clear paths to start a project.",
    challenge: "A creative studio is judged by its own website first. It had to feel crafted and load fast.",
    built: ["Motion-led home page", "Projects, about and contact pages", "Start-a-project enquiry flow"],
    outcome: "Live, and it gives the studio a home that matches the quality of its work.",
    image: "/work/crafex.webp",
    url: "https://crafex-website.vercel.app/",
  },
];

/** Client websites that are offline right now: listed, not linked. */
export const otherWebsites = [{ name: "Socca Professional Services", status: "Back online soon" }];

export function projectsForPillar(slug: PillarSlug) {
  return projects.filter((p) => p.pillar === slug);
}
