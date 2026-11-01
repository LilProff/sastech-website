// Site copy, written from docs/Sastech_Claude_Knowledge_Base.md (v2).
// Rules: no invented clients, numbers or testimonials. No digital-marketing services.
// Proof is the anonymised logistics pilot only.

export type Faq = { q: string; a: string };

export type PillarSlug = "websites-seo" | "operations-tools" | "ai-automation";

export type Pillar = {
  slug: PillarSlug;
  number: string;
  name: string;
  short: string;
  summary: string;
  mockup: "search" | "orders" | "chat";
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;
  problems: string[];
  builds: { title: string; body: string }[];
  codes: string[];
  faq: Faq[];
};

export const pillars: Pillar[] = [
  {
    slug: "websites-seo",
    number: "01",
    name: "Web presence and SEO",
    short: "Websites and SEO",
    summary:
      "Fast, mobile-first websites built to be found on Google, with clear service pages and forms that turn visits into enquiries.",
    mockup: "search",
    metaTitle: "Website Design in Lagos | Business Websites Nigeria",
    metaDescription:
      "Fast, mobile-friendly business websites for Nigerian companies, built to rank on Google. Technical SEO, Google Business Profile and enquiry forms included.",
    h1: "Business websites in Lagos that get found on Google",
    intro:
      "Most customers search before they buy. We build fast websites that show up for the searches that matter, explain what you sell in plain words, and make it easy to enquire or order.",
    problems: [
      "Customers find your competitors on Google, not you.",
      "Your Instagram is busy, but people can't check prices, hours or services without messaging you.",
      "You have a website, but it is slow on phones and nobody enquires through it.",
    ],
    builds: [
      {
        title: "Website design and build",
        body: "A fast, mobile-first site with clear service and product pages, built on modern hosting you own.",
      },
      {
        title: "Technical SEO",
        body: "Clean structure, page titles, structured data, sitemaps and speed work so Google can read and rank you.",
      },
      {
        title: "Google Business Profile",
        body: "Set up or cleaned up, linked to your site, so you show on Maps and local searches.",
      },
      {
        title: "Enquiry and order forms",
        body: "Forms and WhatsApp links that send leads straight to you, with nothing lost in DMs.",
      },
      {
        title: "Search Console and analytics",
        body: "Privacy-friendly tracking so you can see who finds you and which pages bring enquiries.",
      },
    ],
    codes: ["S2"],
    faq: [
      {
        q: "Do I need a website if I already sell on Instagram?",
        a: "Instagram is good for attention, but Google is where people look when they are ready to buy. A website gives you a place you own, shows up in search, and answers common questions before customers message you.",
      },
      {
        q: "Will my website show up on Google?",
        a: "We build every site to Google's technical standards and set up Search Console and your Business Profile. Nobody can honestly promise a position, but we remove the reasons you are not showing up and give you a plan to improve.",
      },
      {
        q: "Who owns the website?",
        a: "You do. Where possible the domain, hosting and accounts are in your name, and we hand over access when the project is done.",
      },
      {
        q: "Can you redesign my existing website?",
        a: "Yes. We audit what you have first, keep what works, and make sure old links redirect so you do not lose any search traffic you already have.",
      },
    ],
  },
  {
    slug: "operations-tools",
    number: "02",
    name: "Operations tools",
    short: "Operations tools",
    summary:
      "Digital tools that replace notebooks and spreadsheets: CRMs, booking and order systems, stock, delivery tracking and dashboards.",
    mockup: "orders",
    metaTitle: "Business Operations Tools Nigeria | CRM, Orders, Stock",
    metaDescription:
      "Custom CRMs, booking and order systems, stock tracking, delivery tracking and dashboards for Nigerian businesses. Replace notebooks and spreadsheets.",
    h1: "Operations tools that replace the notebook",
    intro:
      "When orders live in a notebook and stock lives in someone's head, things get lost. We build simple tools your team will actually use, so every order, booking and delivery is tracked in one place.",
    problems: [
      "Orders are written in a notebook or scattered across WhatsApp chats.",
      "You only find out an item is out of stock when a customer asks for it.",
      "You can't see today's sales, deliveries or bookings without calling around.",
    ],
    builds: [
      {
        title: "CRM and lead tracking",
        body: "Every lead and customer in one place, with stages, notes and reminders so nobody slips through.",
      },
      {
        title: "Booking and order systems",
        body: "Booking calendars, order flows, payment links and automatic confirmations.",
      },
      {
        title: "Stock and catalogue",
        body: "Live stock levels, including across branches, so you know what you can sell before you promise it.",
      },
      {
        title: "Order and delivery tracking",
        body: "Clear status for every order from paid to delivered, for your team and your customers.",
      },
      {
        title: "Dashboards and admin tools",
        body: "The numbers you care about on one screen, and internal tools shaped around how your team works.",
      },
    ],
    codes: ["S4", "S5", "S6"],
    faq: [
      {
        q: "Do I have to change how my team works?",
        a: "As little as possible. We study how work actually happens during the audit, then build around it. The aim is fewer steps, not a new process to learn.",
      },
      {
        q: "Can it work with the tools we already use?",
        a: "Usually, yes. We connect to what you already have, such as Google Sheets, WhatsApp, payment providers or accounting tools, before suggesting anything new.",
      },
      {
        q: "Will it work for more than one branch?",
        a: "Yes. Stock, orders and reporting can be split by branch and rolled up into one view for the owner.",
      },
      {
        q: "What if my staff are not very technical?",
        a: "We design for phones first, keep screens simple, and train your team at handover.",
      },
    ],
  },
  {
    slug: "ai-automation",
    number: "03",
    name: "AI and automation",
    short: "AI and automation",
    summary:
      "WhatsApp and Instagram auto-replies, AI agents, lead capture and follow-up, reminders and broadcasts that handle the repetitive work.",
    mockup: "chat",
    metaTitle: "WhatsApp Automation Nigeria | AI Agents for Business",
    metaDescription:
      "WhatsApp and Instagram auto-replies, AI agents, lead follow-up, reminders and broadcasts for Nigerian businesses. Answer customers faster, with less manual work.",
    h1: "WhatsApp automation and AI agents for Nigerian businesses",
    intro:
      "If you answer the same questions all day, follow up leads by memory, or send reminders one by one, that work can run on its own. We build automations and AI agents that reply, follow up and remind, with a human always in control.",
    problems: [
      "You answer the same price and availability questions dozens of times a day.",
      "Leads go cold because nobody followed up in time.",
      "Reminders, updates and broadcasts are sent one chat at a time.",
    ],
    builds: [
      {
        title: "WhatsApp and Instagram auto-replies",
        body: "Instant answers to common questions, catalogues and price lists, handing over to a person when needed.",
      },
      {
        title: "Lead capture and follow-up",
        body: "New enquiries logged automatically and followed up on a schedule, so warm leads stay warm.",
      },
      {
        title: "AI agents",
        body: "Assistants that read, sort and draft replies, qualify leads or prepare reports, trained on your own information.",
      },
      {
        title: "Reminders and broadcasts",
        body: "Appointment reminders, order updates and opt-in broadcasts sent at the right time without manual work.",
      },
      {
        title: "Workflow automation",
        body: "Connect your tools so data moves on its own: forms to CRM, payments to orders, orders to delivery.",
      },
    ],
    codes: ["S3", "S4"],
    faq: [
      {
        q: "Will customers know they are talking to a bot?",
        a: "We recommend being open about it. Good automation answers simple questions instantly and passes anything complex to a person, so customers get faster help, not a wall.",
      },
      {
        q: "Do I need the official WhatsApp Business Platform?",
        a: "For automation at scale, usually yes. We explain the options during the audit, including setup steps, verification and message costs, which are billed at cost.",
      },
      {
        q: "What happens to my customers' data?",
        a: "We build with the Nigeria Data Protection Act 2023 in mind: only the data you need, stored in accounts you own where possible, with access limited to the people who need it.",
      },
      {
        q: "Can AI make mistakes?",
        a: "Yes, so we design for it. Agents work within clear limits, important actions need human approval, and we monitor and tune them after launch.",
      },
    ],
  },
];

export const serviceCatalogue = [
  {
    code: "S1",
    name: "AI Business Audit",
    body: "We interview you, review how work flows today, and give you a written audit and roadmap built around more revenue, less time and lower cost. You get a build quote at the end.",
    deliverables: ["Owner interview", "Process review", "Written audit and roadmap", "Build quote"],
    pillar: null,
  },
  {
    code: "S2",
    name: "Website, SEO and Google Visibility",
    body: "Design, build, hosting setup, technical SEO, analytics, Google Business Profile and Search Console.",
    deliverables: ["Design and build", "Technical SEO", "Google Business Profile", "Analytics and Search Console"],
    pillar: "websites-seo",
  },
  {
    code: "S3",
    name: "WhatsApp and Instagram Automation",
    body: "Auto-replies, catalogues, broadcasts and lead capture on the channels your customers already use.",
    deliverables: ["Auto-replies", "Catalogue", "Broadcasts", "Lead capture"],
    pillar: "ai-automation",
  },
  {
    code: "S4",
    name: "CRM and Lead Follow-up",
    body: "A lead database with pipelines, reminders and reporting so every enquiry gets an answer.",
    deliverables: ["Lead database", "Pipelines", "Reminders", "Reporting"],
    pillar: "ai-automation",
  },
  {
    code: "S5",
    name: "Booking, Order and Payment Systems",
    body: "Booking calendars, order flows, payment links and confirmations that run without back-and-forth.",
    deliverables: ["Booking calendar", "Order flow", "Payment links", "Confirmations"],
    pillar: "operations-tools",
  },
  {
    code: "S6",
    name: "Operations Tools and Dashboards",
    body: "Stock tracking (including multi-branch), order and delivery tracking, internal admin tools and reporting dashboards.",
    deliverables: ["Stock tracking", "Delivery tracking", "Admin tools", "Dashboards"],
    pillar: "operations-tools",
  },
  {
    code: "S7",
    name: "Managed Support and Optimisation",
    body: "Monitoring, fixes, tuning and new automations after launch, so your systems keep improving.",
    deliverables: ["Monitoring", "Fixes", "Tuning", "New automations"],
    pillar: null,
  },
] as const;

export const commercialModels = [
  {
    name: "One-time project",
    body: "A fixed price for an agreed scope, paid in milestones. Includes revision rounds and a bug-fix warranty on what we deliver.",
  },
  {
    name: "Monthly retainer",
    body: "A fixed monthly fee, paid in advance, for an agreed scope or capacity. Optional performance share on measured gains against a baseline we agree in writing.",
  },
  {
    name: "Hybrid",
    body: "A build fee to create the system, then a retainer for hosting, monitoring and improvements.",
  },
] as const;

export const processSteps = [
  {
    title: "Free call",
    duration: "15 minutes",
    body: "Tell us what is slowing the business down. We tell you honestly whether we can help.",
  },
  {
    title: "Audit and plan",
    duration: "Paid audit (S1)",
    body: "We review how work flows today and give you a written roadmap, prioritised by revenue, time and cost.",
  },
  {
    title: "Phased build",
    duration: "Milestones",
    body: "We build in phases, so you use working parts early and every payment matches something delivered.",
  },
  {
    title: "Support",
    duration: "Ongoing (S7)",
    body: "We monitor, fix and improve after launch, and add new automations as the business grows.",
  },
] as const;

export const sectors = [
  "Logistics",
  "Gadget stores",
  "Real estate",
  "Short-lets and apartments",
  "Fashion and retail",
  "Beauty",
  "Food",
  "Clinics",
  "Schools",
  "Event planners",
  "Car dealers",
  "Interior design and construction",
] as const;

export const pilot = {
  title: "AI CRM and automation for a Lagos logistics company",
  client: "A logistics company in Lagos",
  problem:
    "Leads, customer messages and follow-ups were handled by hand across phones and spreadsheets. Good leads went cold and the team spent hours on repetitive messages.",
  built: [
    { name: "AI CRM", body: "One place for leads and customers, with stages and follow-up." },
    { name: "WhatsApp broadcasts", body: "Opt-in broadcasts with a Telegram admin panel to control them." },
    { name: "Lead sourcing", body: "Automated lead discovery from public business listings." },
    { name: "Lead enrichment", body: "Contact details and company data added to each lead." },
    { name: "Operations database", body: "A shared operational database the team already knew how to use." },
    { name: "AI layer", body: "Language models that sort, draft and summarise across the system." },
  ],
  stack: ["n8n", "WhatsApp", "Telegram", "Apify", "Apollo", "Google Sheets", "OpenRouter", "Claude"],
  model: "Audit, phased build, monthly retainer, with a performance bonus tied to revenue gained, cost saved and time saved.",
  status: "Live and in daily use",
  // [FILL: one real, checkable result] Leave unset until the client confirms a number in writing.
  result: null as string | null,
};

export const homeFaq: Faq[] = [
  {
    q: "How much does it cost?",
    a: "It depends on what you need, so we do not guess. After a free call, the paid audit gives you a clear written quote. You can choose a one-time project, a monthly retainer, or a mix of both.",
  },
  {
    q: "How long does a project take?",
    a: "The audit ends with a dated plan. We build in phases, so you start using working parts early instead of waiting for one big launch.",
  },
  {
    q: "Do I need a website if I already have Instagram?",
    a: "Instagram brings attention, but Google is where people look when they are ready to buy. A website shows up in search, answers questions before customers message you, and is a place you own.",
  },
  {
    q: "Do you work outside Lagos?",
    a: "Yes. We are based in Lagos and work with businesses across Nigeria. Calls, audits and handovers can all happen online.",
  },
  {
    q: "What happens to my data?",
    a: "We follow the Nigeria Data Protection Act 2023. We only use the data a system needs, keep it in accounts you own where possible, and never show your business or customers in our marketing without written permission.",
  },
];

export const values = [
  {
    title: "Outcomes",
    body: "Every project starts from one question: does this earn more, save time or cut cost? If it doesn't, we don't build it.",
  },
  {
    title: "Clarity",
    body: "Plain English, written plans and honest timelines. You always know what is being built and why.",
  },
  {
    title: "Proof",
    body: "We show real work and say what we can measure. We don't publish numbers we can't back up.",
  },
  {
    title: "Speed",
    body: "Phased builds, so useful parts go live early and you see progress every step of the way.",
  },
] as const;
