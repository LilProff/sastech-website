import Link from "next/link";
import { ArrowUpRight, ChatsCircle, MagnifyingGlass, NotePencil } from "@phosphor-icons/react/dist/ssr";
import { pillars, pilot, processSteps, sectors } from "@/lib/content";
import { PillarMockup } from "../mockups/Mockups";
import { ProjectCard } from "../ProjectCard";
import { projects } from "@/lib/projects";
import { Container, HexMark, TextLink, cn } from "../ui";

/* ---------------- Problem strip ---------------- */

const PROBLEMS = [
  {
    icon: ChatsCircle,
    q: "Answering the same “how much?” 50 times a day?",
    a: "An auto-reply can answer it in seconds, day or night.",
    href: "/services/ai-automation",
  },
  {
    icon: NotePencil,
    q: "Orders still living in a notebook?",
    a: "One simple system for every order, booking and delivery.",
    href: "/services/operations-tools",
  },
  {
    icon: MagnifyingGlass,
    q: "Invisible on Google?",
    a: "A fast website built to show up when customers search.",
    href: "/services/websites-seo",
  },
];

export function Problems() {
  return (
    <section aria-labelledby="problems-title" className="py-20 sm:py-28">
      <Container>
        <h2 id="problems-title" className="max-w-xl text-[length:var(--text-title)] leading-[1.1]" data-reveal>
          Sound familiar?
        </h2>
        <ul className="mt-12 grid gap-4">
          {PROBLEMS.map((p, i) => (
            <li key={p.q} data-reveal style={{ ["--d" as string]: `${i * 90}ms` }} className={cn(i === 1 && "lg:pl-[8%]", i === 2 && "lg:pl-[16%]")}>
              <Link
                href={p.href}
                className="group flex flex-col gap-5 rounded-[var(--radius-card)] border border-transparent p-4 transition-colors duration-500 hover:border-line hover:bg-navy-850/60 sm:flex-row sm:items-center sm:gap-8 sm:p-6"
              >
                <span className="relative flex size-16 shrink-0 items-center justify-center text-cyan">
                  <span className="hex-clip absolute inset-0 bg-cyan/10 transition-colors duration-500 group-hover:bg-cyan/20" />
                  <p.icon size={28} weight="duotone" aria-hidden className="relative anim-float" style={{ animationDelay: `${i * 600}ms` }} />
                </span>
                <span className="flex-1">
                  <span className="block font-display text-[clamp(1.35rem,1rem+1.5vw,2.1rem)] font-semibold leading-tight tracking-tight text-ink">
                    {p.q}
                  </span>
                  <span className="mt-1.5 block text-ink-2">{p.a}</span>
                </span>
                <ArrowUpRight
                  size={26}
                  aria-hidden
                  className="hidden shrink-0 text-faint transition-all duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-cyan sm:block"
                />
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

/* ---------------- Three pillars (bento) ---------------- */

export function Pillars() {
  const [web, ops, ai] = pillars;
  return (
    <section aria-labelledby="pillars-title" className="py-20 sm:py-28">
      <Container>
        <div className="max-w-2xl" data-reveal>
          <h2 id="pillars-title" className="text-[length:var(--text-title)] leading-[1.1]">
            One partner for the website, the tools and the automation.
          </h2>
          <p className="mt-5 text-lg text-ink-2">
            Pick one, or let them work together. Every build starts with what earns more, saves time or cuts cost.
          </p>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-12 lg:grid-rows-2">
          <PillarCard pillar={web} className="lg:col-span-6 lg:row-span-2" variant="hex" large />
          <PillarCard pillar={ops} className="lg:col-span-6" variant="gradient" delay={90} />
          <PillarCard pillar={ai} className="lg:col-span-6" variant="glow" delay={180} />
        </div>
      </Container>
    </section>
  );
}

function PillarCard({
  pillar,
  className,
  variant,
  large,
  delay = 0,
}: {
  pillar: (typeof pillars)[number];
  className?: string;
  variant: "hex" | "gradient" | "glow";
  large?: boolean;
  delay?: number;
}) {
  return (
    <article
      data-reveal
      style={{ ["--d" as string]: `${delay}ms` }}
      className={cn(
        "card group relative isolate flex flex-col overflow-hidden p-6 transition-colors duration-500 hover:border-line-strong sm:p-8",
        large ? "justify-between gap-8" : "gap-6 xl:grid xl:grid-cols-[1fr_1.15fr] xl:items-center",
        className,
      )}
    >
      <div aria-hidden className="absolute inset-0 -z-10">
        {variant === "hex" && <div className="absolute inset-0 bg-hex opacity-70 mask-fade-b" />}
        {variant === "gradient" && (
          <div className="absolute inset-0 bg-gradient-to-br from-cyan/[0.08] via-transparent to-transparent" />
        )}
        {variant === "glow" && <div className="absolute -bottom-24 -right-16 size-72 rounded-full bg-cyan/[0.12] blur-[80px]" />}
      </div>

      <div>
        <p className="font-display text-sm font-semibold text-cyan">{pillar.number}</p>
        <h3 className={cn("mt-3 leading-tight", large ? "text-[clamp(1.6rem,1.2rem+1.2vw,2.2rem)]" : "text-[1.4rem]")}>
          <Link href={`/services/${pillar.slug}`} className="after:absolute after:inset-0 after:content-['']">
            {pillar.name}
          </Link>
        </h3>
        <p className={cn("mt-3 text-ink-2", large ? "max-w-md" : "text-[0.95rem]")}>{pillar.summary}</p>
        <span className="mt-5 inline-flex items-center gap-1.5 font-display text-sm font-semibold text-cyan">
          Explore {pillar.short}
          <ArrowUpRight size={15} weight="bold" aria-hidden className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </span>
      </div>

      <div className={cn("relative", large && "lg:px-4")}>
        <PillarMockup kind={pillar.mockup} />
      </div>
    </article>
  );
}

/* ---------------- Proof: the logistics pilot ---------------- */

export function SystemDiagram({ className }: { className?: string }) {
  const outer = pilot.built.filter((b) => b.name !== "AI CRM");
  // Positions around a hexagon, in % of the square.
  const pos = [
    { x: 50, y: 6 },
    { x: 92, y: 30 },
    { x: 92, y: 72 },
    { x: 50, y: 95 },
    { x: 8, y: 72 },
  ];
  return (
    <div className={className}>
      {/* Diagram for sm and up */}
      <div className="relative mx-auto hidden aspect-square w-full max-w-[520px] sm:block" data-reveal>
        <svg viewBox="0 0 100 100" className="absolute inset-0 size-full text-cyan" aria-hidden>
          <path
            d="M50 14 83 33v38L50 90 17 71V33z"
            fill="none"
            stroke="currentColor" className="text-line"
            strokeWidth="0.4"
          />
          {pos.map((p, i) => (
            <line
              key={i}
              x1="50"
              y1="51"
              x2={p.x}
              y2={p.y}
              stroke="currentColor"
              strokeOpacity="0.5"
              strokeWidth="0.35"
              pathLength={1}
              className="draw-line"
              style={{ ["--len" as string]: 1, ["--d" as string]: `${200 + i * 120}ms` }}
            />
          ))}
        </svg>
        <div className="absolute left-1/2 top-[51%] flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
          <span className="ping relative flex size-28 items-center justify-center rounded-full"><span className="absolute inset-0 hex-clip bg-gradient-to-b from-brand to-brand-deep" />
            <span className="relative text-center font-display text-sm font-bold leading-tight text-on-brand">
              AI
              <br />
              CRM
            </span>
          </span>
        </div>
        {outer.map((b, i) => (
          <div
            key={b.name}
            className="absolute w-[34%] -translate-x-1/2 -translate-y-1/2 rounded-xl border border-line-strong bg-navy-900/90 px-3 py-2.5 text-center backdrop-blur"
            style={{ left: `${pos[i].x}%`, top: `${pos[i].y}%` }}
          >
            <p className="font-display text-[0.82rem] font-semibold leading-tight text-ink">{b.name}</p>
          </div>
        ))}
      </div>

      {/* Mobile list */}
      <ul className="grid grid-cols-2 gap-2.5 sm:hidden">
        {pilot.built.map((b) => (
          <li key={b.name} className="flex items-center gap-2 rounded-xl border border-line-strong bg-navy-850 px-3 py-3">
            <HexMark className="text-cyan" filled={b.name === "AI CRM"} />
            <span className="font-display text-[0.85rem] font-semibold leading-tight">{b.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Proof() {
  return (
    <section aria-labelledby="proof-title" className="relative py-20 sm:py-28">
      <div aria-hidden className="absolute inset-x-0 top-0 -z-10 h-full bg-gradient-to-b from-navy-950/0 via-navy-950/70 to-navy-950/0" />
      <Container className="grid items-center gap-14 lg:grid-cols-[1fr_1.05fr]">
        <div data-reveal>
          <p className="eyebrow">Case study</p>
          <h2 id="proof-title" className="mt-4 text-[length:var(--text-title)] leading-[1.1]">
            {pilot.title}
          </h2>
          <p className="mt-5 text-lg text-ink-2">{pilot.problem}</p>
          <p className="mt-4 text-ink-2">
            We built one connected system: an AI CRM, WhatsApp broadcasts, automated lead sourcing and enrichment, an
            operations database and an AI layer across all of it.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-5">
            <span className="inline-flex items-center gap-2 rounded-full border border-success/40 bg-success/10 px-3.5 py-1.5 text-sm font-semibold text-success">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-success/70 motion-reduce:hidden" />
                <span className="relative inline-flex size-2 rounded-full bg-success" />
              </span>
              {pilot.status}
            </span>
            <TextLink href="/portfolio/logistics-ai-crm">Read the case study</TextLink>
          </div>
        </div>
        <SystemDiagram />
      </Container>
    </section>
  );
}

/* ---------------- Process timeline ---------------- */

export function ProcessTimeline({ withHeading = true }: { withHeading?: boolean }) {
  return (
    <section aria-labelledby={withHeading ? "process-title" : undefined} className="py-20 sm:py-28">
      <Container>
        {withHeading && (
          <div className="max-w-2xl" data-reveal>
            <h2 id="process-title" className="text-[length:var(--text-title)] leading-[1.1]">
              From first call to a system that runs itself.
            </h2>
            <p className="mt-5 text-lg text-ink-2">Four steps. You always know what is next and what it costs.</p>
          </div>
        )}

        <ol className="relative mt-14 grid gap-10 lg:grid-cols-4 lg:gap-6" data-reveal>
          {/* Connecting line: horizontal on desktop, vertical on mobile. */}
          <svg aria-hidden className="absolute left-[7px] top-2 h-[calc(100%-1rem)] w-px text-cyan lg:hidden" preserveAspectRatio="none" viewBox="0 0 1 100">
            <line x1="0.5" y1="0" x2="0.5" y2="100" stroke="currentColor" strokeOpacity="0.45" pathLength={1} className="draw-line" style={{ ["--len" as string]: 1 }} />
          </svg>
          <svg aria-hidden className="absolute left-0 top-[7px] hidden h-px w-full text-cyan lg:block" preserveAspectRatio="none" viewBox="0 0 100 1">
            <line x1="0" y1="0.5" x2="100" y2="0.5" stroke="currentColor" strokeOpacity="0.45" pathLength={1} className="draw-line" style={{ ["--len" as string]: 1 }} />
          </svg>

          {processSteps.map((s, i) => (
            <li key={s.title} className="relative pl-10 lg:pl-0 lg:pt-12">
              <span className="absolute left-0 top-0 flex size-[15px] items-center justify-center lg:top-0">
                <HexMark className="h-[17px] w-[15px] bg-navy-900 text-cyan" filled={i === 0} />
              </span>
              <p className="text-sm font-medium text-cyan">{s.duration}</p>
              <h3 className="mt-2 text-xl">{s.title}</h3>
              <p className="mt-2 text-ink-2">{s.body}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

/* ---------------- Who it's for ---------------- */

export function Sectors() {
  return (
    <section aria-labelledby="sectors-title" className="py-20 sm:py-28">
      <Container className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div data-reveal>
          <h2 id="sectors-title" className="text-[length:var(--text-title)] leading-[1.1]">
            Built for Nigerian businesses that sell, book and deliver.
          </h2>
          <p className="mt-5 max-w-md text-lg text-ink-2">
            If customers message you, book you or wait for a delivery, we can take work off your plate.
          </p>
        </div>
        <ul className="flex flex-wrap gap-2.5" data-reveal style={{ ["--d" as string]: "80ms" }}>
          {sectors.map((s, i) => (
            <li
              key={s}
              className={cn(
                "rounded-full border px-4 py-2.5 font-display text-[0.92rem] font-semibold transition-colors duration-300",
                i % 5 === 0
                  ? "border-cyan/40 bg-cyan/10 text-ink hover:bg-cyan/20"
                  : "border-line-strong bg-navy-850 text-ink-2 hover:border-cyan/50 hover:text-ink",
              )}
            >
              {s}
            </li>
          ))}
          <li className="rounded-full border border-dashed border-line-strong px-4 py-2.5 font-display text-[0.92rem] font-semibold text-muted">
            and more
          </li>
        </ul>
      </Container>
    </section>
  );
}

/* ---------------- Selected work ---------------- */

export function SelectedWork() {
  const featured = projects.filter((p) => p.featured).slice(0, 4);
  const spans = ["lg:col-span-7", "lg:col-span-5 lg:mt-24", "lg:col-span-5", "lg:col-span-7 lg:-mt-24"];
  return (
    <section aria-labelledby="work-title" className="py-20 sm:py-28">
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between" data-reveal>
          <div className="max-w-2xl">
            <h2 id="work-title" className="text-[length:var(--text-title)] leading-[1.1]">
              Work that runs real businesses.
            </h2>
            <p className="mt-5 text-lg text-ink-2">
              Retail and logistics systems, websites, AI layers and our own products. Client data always stays private.
            </p>
          </div>
          <TextLink href="/portfolio" className="shrink-0">
            See all work
          </TextLink>
        </div>
        <div className="mt-14 grid gap-x-8 gap-y-14 lg:grid-cols-12">
          {featured.map((p, i) => (
            <ProjectCard key={p.slug} project={p} className={spans[i]} delay={(i % 2) * 90} />
          ))}
        </div>
      </Container>
    </section>
  );
}

/** Related portfolio items for a service pillar page. */
export function PillarWork({ slug }: { slug: (typeof pillars)[number]["slug"] }) {
  const items = projects.filter((p) => p.pillar === slug).slice(0, 3);
  if (!items.length) return null;
  return (
    <section aria-labelledby="pillar-work-title" className="py-20 sm:py-28">
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between" data-reveal>
          <h2 id="pillar-work-title" className="text-[length:var(--text-title)] leading-[1.1]">
            Recent work
          </h2>
          <TextLink href="/portfolio" className="shrink-0">
            See all work
          </TextLink>
        </div>
        <div className="mt-12 grid gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
          {items.map((p, i) => (
            <ProjectCard key={p.slug} project={p} delay={(i % 3) * 80} />
          ))}
        </div>
      </Container>
    </section>
  );
}
