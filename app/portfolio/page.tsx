import type { Metadata } from "next";
import { PageIntro } from "@/components/PageIntro";
import { CtaBand } from "@/components/CtaBand";
import { ProjectCard } from "@/components/ProjectCard";
import { BookCallButton, Container, JsonLd } from "@/components/ui";
import { pillars } from "@/lib/content";
import { otherWebsites, projects } from "@/lib/projects";
import { breadcrumbs, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Portfolio: Websites, Operations Tools and AI Systems",
  description:
    "Websites, retail and logistics systems, AI CRMs and our own AI products, built by Sastech Consults in Lagos. Client data is always kept private.",
  path: "/portfolio",
});

export default function PortfolioPage() {
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <>
      <JsonLd data={breadcrumbs([{ name: "Portfolio", path: "/portfolio" }])} />
      <PageIntro
        crumbs={[{ name: "Portfolio", path: "/portfolio" }]}
        title={
          <>
            Systems we&apos;ve built, <span className="text-cyan">running in real businesses.</span>
          </>
        }
        intro="Websites, retail and logistics systems, AI layers and our own products. Where a system holds client data, we show its shape and keep every name and figure private."
      >
        <BookCallButton />
      </PageIntro>

      <section aria-labelledby="featured-title" className="py-16 sm:py-24">
        <Container>
          <h2 id="featured-title" className="sr-only">
            Featured work
          </h2>
          <div className="grid gap-x-8 gap-y-16 md:grid-cols-2">
            {featured.map((p, i) => (
              <ProjectCard key={p.slug} project={p} delay={(i % 2) * 90} className={i % 2 === 1 ? "md:mt-20" : undefined} />
            ))}
          </div>
        </Container>
      </section>

      {pillars.map((pillar) => {
        const items = rest.filter((p) => p.pillar === pillar.slug);
        if (!items.length) return null;
        return (
          <section key={pillar.slug} aria-labelledby={`pf-${pillar.slug}`} className="py-14 sm:py-20">
            <Container>
              <h2 id={`pf-${pillar.slug}`} className="text-[length:var(--text-title)] leading-[1.1]" data-reveal>
                {pillar.name}
              </h2>
              <div className="mt-10 grid gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
                {items.map((p, i) => (
                  <ProjectCard key={p.slug} project={p} delay={(i % 3) * 80} />
                ))}
              </div>
              {pillar.slug === "websites-seo" && otherWebsites.length > 0 && (
                <p className="mt-10 text-ink-2" data-reveal>
                  Also built:{" "}
                  {otherWebsites.map((w) => (
                    <span key={w.name}>
                      {w.name} <span className="text-muted">({w.status})</span>
                    </span>
                  ))}
                </p>
              )}
            </Container>
          </section>
        );
      })}

      <CtaBand title="Want something like this for your business?" />
    </>
  );
}
