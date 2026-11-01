// Insights (blog). Rules from the knowledge base (section 12.6): original, practical,
// no invented statistics, hedge anything that changes (prices, platform rules, law),
// internal links, author and dates on every post.

import type { PillarSlug } from "./content";

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "callout"; text: string };

export type Article = {
  slug: string;
  title: string;
  description: string; // <= 155 chars
  published: string; // ISO date
  updated: string; // ISO date
  readMinutes: number;
  pillar: PillarSlug;
  topic: string;
  body: Block[];
};

export const articles: Article[] = [
  {
    slug: "whatsapp-automation-nigeria-guide",
    title: "WhatsApp automation for Nigerian businesses: a plain-English guide",
    description:
      "What WhatsApp automation can do for a Nigerian business, the options, what it costs to run, and what to automate first. A practical guide.",
    published: "2026-11-01",
    updated: "2026-11-01",
    readMinutes: 6,
    pillar: "ai-automation",
    topic: "AI and automation",
    body: [
      {
        type: "p",
        text: "If your customers reach you on WhatsApp, you already know the pattern. The same questions arrive all day: how much is this, is it available, where are you, do you deliver. Each one takes a minute to answer, and the ones you miss at night are often sales you lose. Automation does not replace you on WhatsApp. It handles the repetitive part so you can focus on the conversations that need a person.",
      },
      { type: "h2", text: "The two ways to run WhatsApp for business" },
      {
        type: "p",
        text: "The free WhatsApp Business app gives you quick replies, greeting and away messages, labels and a simple catalogue. It is a good start for a single phone and a small team, but it cannot run real automation or connect to your other systems.",
      },
      {
        type: "p",
        text: "The WhatsApp Business Platform (often called the API) is what businesses use for proper automation. It lets several staff work from one number, connects WhatsApp to your CRM or order system, and lets an automated assistant reply, take details and hand over to a person. You use it through a provider or directly through Meta, and it needs a verified business setup.",
      },
      { type: "h2", text: "What it costs to run" },
      {
        type: "p",
        text: "There are usually three costs. The build, which is a one-time cost for setting up the flows and connecting your tools. A provider or hosting fee, if you use one. And Meta's own charges for certain messages, such as template messages that you send to start a conversation. Meta's pricing depends on the type of message and the country, and it has changed more than once, so always check the current rate card before you plan a broadcast. We bill these platform costs at cost and list them separately, so you can see exactly what you pay Meta.",
      },
      { type: "h2", text: "What to automate first" },
      {
        type: "ul",
        items: [
          "Common questions: prices, availability, opening hours, location and delivery areas.",
          "Catalogue and price list requests, sent instantly with images.",
          "Order and booking capture: name, item, address, preferred time, logged straight into your system.",
          "Reminders for appointments, payments and deliveries.",
          "Follow-ups for enquiries that went quiet, sent on a schedule instead of from memory.",
        ],
      },
      { type: "h2", text: "What to keep human" },
      {
        type: "p",
        text: "Complaints, negotiations, refunds and anything sensitive should go to a person, quickly. Good automation recognises these and hands over with the full conversation attached, so the customer never has to repeat themselves. Be open that customers are talking to an assistant at first. People mind slow answers far more than they mind automation.",
      },
      { type: "h2", text: "Stay on the right side of the rules" },
      {
        type: "ul",
        items: [
          "Only send marketing messages to people who opted in, and honour opt-outs immediately.",
          "Follow WhatsApp's business and commerce policies, or your number can be restricted.",
          "Treat chat data as personal data under the Nigeria Data Protection Act 2023: collect only what you need and keep it secure.",
        ],
      },
      { type: "h2", text: "A simple way to start this week" },
      {
        type: "p",
        text: "Write down the ten questions you answer most often, and the answers you give. Mark which ones always need a person. That list is the first version of your automation, and it is also the brief we would ask you for on a first call.",
      },
      {
        type: "callout",
        text: "Want a second pair of eyes on your list? Book a free 15-minute call and we'll tell you what is worth automating first.",
      },
    ],
  },
  {
    slug: "website-or-instagram-small-business-nigeria",
    title: "Do you need a website if you already sell on Instagram?",
    description:
      "Instagram brings attention, but Google is where buyers search. Why a Nigerian small business still needs a fast website, and what it should include.",
    published: "2026-11-01",
    updated: "2026-11-01",
    readMinutes: 5,
    pillar: "websites-seo",
    topic: "Websites and SEO",
    body: [
      {
        type: "p",
        text: "Many Nigerian businesses grew on Instagram, and it works. So the question is fair: if customers already find you there, why pay for a website? The short answer is that Instagram and a website do different jobs. Instagram is where people discover you. A website is where people who are ready to buy go to check you out.",
      },
      { type: "h2", text: "What a website does that Instagram can't" },
      {
        type: "ul",
        items: [
          "It shows up on Google when someone searches for what you sell in your area.",
          "It answers questions before people message you: prices, hours, delivery areas, how to order.",
          "It is yours. An algorithm change or a locked account cannot take it away.",
          "It looks credible to bigger clients, banks and partners who check you out before they call.",
          "It can take enquiries, bookings and orders at any hour, straight into your system.",
        ],
      },
      { type: "h2", text: "When you can wait" },
      {
        type: "p",
        text: "If you are testing a product idea, have very few repeat customers, or sell only to people who already know you, a well-organised Instagram profile and WhatsApp may be enough for now. A website earns its keep when people search for your kind of business, or when the same questions are eating your day.",
      },
      { type: "h2", text: "What a good small business website includes" },
      {
        type: "ul",
        items: [
          "A clear home page that says what you do, for whom, and where.",
          "One page per main service or product line, written the way customers search.",
          "Prices or price ranges where you can share them, and clear next steps where you can't.",
          "A fast, mobile-first build. Most of your visitors are on phones and mobile data.",
          "WhatsApp and enquiry buttons that are easy to tap.",
          "A Google Business Profile linked to the site, so you show on Maps.",
        ],
      },
      { type: "h2", text: "Make Instagram and the website work together" },
      {
        type: "p",
        text: "Put your website link in your bio and highlights. Link from posts to the matching service page. Embed your best posts on the site for social proof that is real. The goal is simple: Instagram gets attention, the website turns that attention into enquiries you can track.",
      },
      {
        type: "callout",
        text: "Not sure whether a website is worth it yet? Book a free call and we'll give you an honest answer for your business.",
      },
    ],
  },
  {
    slug: "ndpa-2023-ai-automation-nigerian-businesses",
    title: "NDPA 2023: what Nigerian businesses using AI and automation should know",
    description:
      "A plain-English overview of the Nigeria Data Protection Act 2023 for businesses using AI, WhatsApp automation and CRMs, with a practical checklist.",
    published: "2026-11-01",
    updated: "2026-11-01",
    readMinutes: 7,
    pillar: "ai-automation",
    topic: "Data privacy",
    body: [
      {
        type: "callout",
        text: "This is a general overview, not legal advice. For your own situation, speak to a qualified Nigerian data protection lawyer.",
      },
      {
        type: "p",
        text: "When you automate customer conversations, store leads in a CRM or pass messages through an AI model, you are processing personal data. In Nigeria that brings you under the Nigeria Data Protection Act 2023 (NDPA), which is enforced by the Nigeria Data Protection Commission (NDPC). The NDPC has also issued detailed guidance on how to apply the Act, so check the latest version when you set up a new system.",
      },
      { type: "h2", text: "The core ideas in the Act" },
      {
        type: "ul",
        items: [
          "Have a lawful basis for each use of personal data, such as consent, a contract, a legal obligation or a legitimate interest.",
          "Use data only for the purpose you collected it for, and collect no more than you need.",
          "Keep data accurate, keep it only as long as necessary, and keep it secure.",
          "Be able to show how you comply. Accountability is part of the law, not an extra.",
        ],
      },
      { type: "h2", text: "Your customers' rights" },
      {
        type: "p",
        text: "People can ask what data you hold about them, ask you to correct or delete it, object to some uses, withdraw consent and, in some cases, ask for their data in a portable format. You need a simple way to receive and answer these requests, such as a dedicated email address.",
      },
      { type: "h2", text: "Controllers, processors and your suppliers" },
      {
        type: "p",
        text: "If you decide why and how customer data is used, you are the data controller. Suppliers who handle data for you, such as a CRM, a WhatsApp provider or a developer running your automations, are processors. You should have a written agreement with each processor that covers security, confidentiality and what happens to the data when the work ends.",
      },
      { type: "h2", text: "Breaches and transfers abroad" },
      {
        type: "p",
        text: "If a personal data breach is likely to put people at risk, the Act expects you to notify the NDPC promptly, within 72 hours of becoming aware of it, and in serious cases to tell the people affected. Many AI and cloud tools store data outside Nigeria. Transfers abroad are allowed, but only with the safeguards the Act requires, so know where each tool keeps your data.",
      },
      { type: "h2", text: "A practical checklist for AI and automation" },
      {
        type: "ul",
        items: [
          "List every tool that touches customer data, what data it holds and where it is stored.",
          "Send AI models only the data a task needs. Strip names and numbers where you can.",
          "Get clear opt-in before marketing broadcasts, and make opting out easy.",
          "Keep a human in the loop for decisions that significantly affect people.",
          "Set retention periods and actually delete old data.",
          "Use two-factor authentication and limit who can export data.",
          "Publish a privacy policy that matches what you really do.",
        ],
      },
      {
        type: "p",
        text: "Some larger organisations have extra duties, such as registering with the NDPC or appointing a data protection officer. Check whether your organisation is in scope as it grows.",
      },
      {
        type: "callout",
        text: "We build every system with these rules in mind: only the data you need, accounts you own, and access limited to the people who need it.",
      },
    ],
  },
  {
    slug: "signs-business-outgrown-notebook",
    title: "Five signs your business has outgrown the notebook",
    description:
      "Orders in a notebook and stock in someone's head work until they don't. Five signs it's time for a simple operations tool, and what to build first.",
    published: "2026-11-01",
    updated: "2026-11-01",
    readMinutes: 5,
    pillar: "operations-tools",
    topic: "Operations tools",
    body: [
      {
        type: "p",
        text: "Almost every business starts with a notebook, a WhatsApp group and a good memory. That is not a mistake. It is cheap, fast and everyone understands it. The problem comes later, when the business grows and the notebook quietly starts costing you money.",
      },
      { type: "h2", text: "1. Orders slip through the cracks" },
      {
        type: "p",
        text: "A customer pays, and nobody remembers who was meant to pack it. An order sits in a chat that scrolled away. If you have ever apologised for a forgotten order, you need a single list where every order has a status.",
      },
      { type: "h2", text: "2. You find out you're out of stock when a customer asks" },
      {
        type: "p",
        text: "If stock lives in someone's head, you will promise items you don't have and miss reorders. This gets worse with a second branch. Simple stock tracking, updated when you sell, fixes it.",
      },
      { type: "h2", text: "3. You can't answer “how did we do today?” without calling around" },
      {
        type: "p",
        text: "When the numbers live in different notebooks and phones, the owner spends evenings adding them up, or simply doesn't know. A dashboard that updates itself gives you the answer in seconds.",
      },
      { type: "h2", text: "4. One person is the system" },
      {
        type: "p",
        text: "If the business struggles when one staff member is off sick, that person has become your system. Writing the process into a tool protects the business and takes pressure off them.",
      },
      { type: "h2", text: "5. Customers chase you for updates" },
      {
        type: "p",
        text: "“Where is my order?” is a sign that information isn't flowing. Order and delivery tracking, with automatic updates, turns those calls into a message that sends itself.",
      },
      { type: "h2", text: "What to build first" },
      {
        type: "ul",
        items: [
          "Start with the one list that hurts most, usually orders or bookings.",
          "Design it for phones and for the least technical person on the team.",
          "Connect what you already use, like Google Sheets or WhatsApp, before replacing anything.",
          "Add stock, delivery tracking and a dashboard once the first list is used every day.",
        ],
      },
      {
        type: "p",
        text: "You don't need an expensive enterprise system. You need a simple tool shaped around how your team already works, built in phases so it is useful from the first week.",
      },
      {
        type: "callout",
        text: "Recognise two or more of these signs? Book a free 15-minute call and we'll help you decide what to fix first.",
      },
    ],
  },
];

export function getArticle(slug: string) {
  return articles.find((a) => a.slug === slug);
}

export function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
