import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { PageIntro } from "@/components/PageIntro";
import { CtaBand } from "@/components/CtaBand";
import { BookCallButton, Container, HexMark, JsonLd, TextLink } from "@/components/ui";
import { PillarMockup } from "@/components/mockups/Mockups";
import { commercialModels, pillars, serviceCatalogue } from "@/lib/content";
import { breadcrumbs, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Services: Websites, Operations Tools and AI",
  description:
    "Websites and SEO, CRMs, booking and order systems, dashboards, WhatsApp automation and AI agents for Nigerian businesses. Start with a free 15-minute call.",
  path: "/services",
});

const audit = serviceCatalogue.find((s) => s.code === "S1")!;
const support = serviceCatalogue.find((s) => s.code === "S7")!;

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={breadcrumbs([{ name: "Services", path: "/services" }])} />
      <PageIntro
        crumbs={[{ name: "Services", path: "/services" }]}
        title={
          <>
            Three ways we help a business <span className="text-cyan">grow and run lighter.</span>
          </>
        }
        intro="Every service maps to one of three pillars. Most clients start with a free call and a paid audit, then build in phases."
      >
        <BookCallButton />
      </PageIntro>

      {/* Pillar anchors */}
      <section aria-label="Service pillars" className="py-16 sm:py-24">
        <Container className="grid gap-6">
          {pillars.map((p, i) => {
            const codes = serviceCatalogue.filter((s) => s.pillar === p.slug);
            return (
              <article
                key={p.slug}
                id={p.slug}
                data-reveal
                className="card grid scroll-mt-28 gap-8 overflow-hidden p-6 sm:p-10 lg:grid-cols-[1.1fr_1fr] lg:items-center"
              >
                <div className={i % 2 === 1 ? "lg:order-2" : undefined}>
                  <p className="font-display text-sm font-semibold text-cyan">{p.number}</p>
                  <h2 className="mt-3 text-[clamp(1.6rem,1.2rem+1.2vw,2.25rem)] leading-tight">{p.name}</h2>
                  <p className="mt-4 text-ink-2">{p.summary}</p>
                  <ul className="mt-7 grid gap-4">
                    {codes.map((s) => (
                      <li key={s.code} className="flex gap-3">
                        <span className="mt-0.5 shrink-0 rounded-md border border-line-strong px-1.5 py-0.5 font-display text-xs font-semibold text-cyan">
                          {s.code}
                        </span>
                        <span>
                          <span className="font-display font-semibold text-ink">{s.name}</span>
                          <span className="mt-0.5 block text-[0.95rem] text-ink-2">{s.body}</span>
                        </span>
                      </li>
                    ))}
                  </ul>
                  <TextLink href={`/services/${p.slug}`} className="mt-8">
                    More on {p.short}
                  </TextLink>
                </div>
                <div className={i % 2 === 1 ? "lg:order-1" : undefined}>
                  <PillarMockup kind={p.mockup} />
                </div>
              </article>
            );
          })}
        </Container>
      </section>

      {/* Audit and support wrap all three pillars */}
      <section aria-labelledby="wrap-title" className="py-16 sm:py-24">
        <Container>
          <h2 id="wrap-title" className="max-w-2xl text-[length:var(--text-title)] leading-[1.1]" data-reveal>
            Before and after every build.
          </h2>
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {[audit, support].map((s, i) => (
              <div key={s.code} className="card p-7 sm:p-9" data-reveal style={{ ["--d" as string]: `${i * 90}ms` }}>
                <span className="rounded-md border border-line-strong px-1.5 py-0.5 font-display text-xs font-semibold text-cyan">
                  {s.code}
                </span>
                <h3 className="mt-5 text-2xl">{s.name}</h3>
                <p className="mt-3 text-ink-2">{s.body}</p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {s.deliverables.map((d) => (
                    <li key={d} className="flex items-center gap-2 rounded-full bg-navy-800 px-3 py-1.5 text-sm text-ink-2">
                      <HexMark className="h-3 w-[10px] text-cyan" />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* How we price */}
      <section aria-labelledby="pricing-title" className="py-16 sm:py-24">
        <Container className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div data-reveal>
            <h2 id="pricing-title" className="text-[length:var(--text-title)] leading-[1.1]">
              Pay for a project, a retainer, or both.
            </h2>
            <p className="mt-5 max-w-md text-lg text-ink-2">
              Every quote shows the options side by side, so you choose what suits your cash flow. Platform costs like
              hosting or WhatsApp message fees are billed at cost and listed separately.
            </p>
            <Link href="/process#pricing" className="mt-6 inline-flex items-center gap-1.5 font-display text-sm font-semibold text-cyan">
              How pricing works <ArrowUpRight size={15} weight="bold" aria-hidden />
            </Link>
          </div>
          <ol className="grid gap-4" data-reveal style={{ ["--d" as string]: "80ms" }}>
            {commercialModels.map((m, i) => (
              <li key={m.name} className="flex gap-5 rounded-[var(--radius-card)] border border-line p-6">
                <span className="font-display text-2xl font-bold text-faint">{String.fromCharCode(65 + i)}</span>
                <span>
                  <span className="font-display text-lg font-semibold">{m.name}</span>
                  <span className="mt-1 block text-ink-2">{m.body}</span>
                </span>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
