# Sastech Consults website

Source for **https://www.sastech.com.ng**, the website of Sastech Consults, a tech and AI consultancy in
Lagos: websites and SEO, operations tools, and AI automation for Nigerian businesses.

Built with Next.js 16 (App Router, static pages), React 19, TypeScript and Tailwind CSS v4. Deployed on Vercel
from `main`.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build (run before every push)
```

## For AI coding agents and developers

Start with **[AGENTS.md](AGENTS.md)**: goal, rules, codebase layers, design system, SEO and deploy workflow.
Task playbooks are in [`.agents/skills/`](.agents/skills):

- `update-business-facts`: phone, email, socials, booking link, legal details, navigation
- `add-portfolio-project`: projects, screenshots, confidential client systems
- `add-insight-article`: blog articles
- `add-event`: events page
- `edit-services-content`: services, FAQs, process, pricing
- `design-and-pages`: new pages and sections, theme, motion, 3D hero
- `ship-and-verify`: build, safety scan, push, Vercel, live checks

Most content changes are edits to typed data in `lib/` (`site.ts`, `content.ts`, `projects.ts`,
`insights.ts`), not to page components.
