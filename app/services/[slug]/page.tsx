import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageIntro } from "@/components/PageIntro";
import { Faq } from "@/components/Faq";
import { CtaBand } from "@/components/CtaBand";
import { PillarMockup } from "@/components/mockups/Mockups";
import { BookCallButton, Container, HexMark, JsonLd, TextLink, WhatsAppButton } from "@/components/ui";
import { PillarWork, ProcessTimeline } from "@/components/home/Sections";
import { pillars, serviceCatalogue } from "@/lib/content";
import { breadcrumbs, faqSchema, pageMetadata, serviceSchema } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return pillars.map((p) => ({ slug: p.slug }));
}

function getPillar(slug: string) {
  return pillars.find((p) => p.slug === slug);
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const pillar = getPillar(slug);
  if (!pillar) return {};
  return pageMetadata({
    title: pillar.metaTitle,
    description: pillar.metaDescription,
    path: `/services/${pillar.slug}`,
  });
}

export default async function PillarPage({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const pillar = getPillar(slug);
  if (!pillar) notFound();

  const path = `/services/${pillar.slug}`;
  const crumbs = [
    { name: "Services", path: "/services" },
    { name: pillar.name, path },
  ];
  const codes = serviceCatalogue.filter((s) => pillar.codes.includes(s.code));
  const others = pillars.filter((p) => p.slug !== pillar.slug);

  return (
    <>
      <JsonLd
        data={[
          breadcrumbs(crumbs),
          serviceSchema({ name: pillar.name, serviceType: pillar.short, description: pillar.metaDescription, path }),
          faqSchema(pillar.faq),
        ]}
      />
      <PageIntro
        crumbs={crumbs}
        title={pillar.h1}
        intro={pillar.intro}
        aside={
          <div className="relative lg:pl-4">
            <div aria-hidden className="absolute -inset-10 -z-10 rounded-full bg-cyan/[0.08] blur-[80px]" />
            <PillarMockup kind={pillar.mockup} />
          </div>
        }
      >
        <div className="flex flex-wrap gap-3">
          <BookCallButton />
          <WhatsAppButton />
        </div>
      </PageIntro>

      {/* Problems */}
      <section aria-labelledby="problems-title" className="py-20 sm:py-28">
        <Container>
          <h2 id="problems-title" className="max-w-xl text-[length:var(--text-title)] leading-[1.1]" data-reveal>
            If this sounds like your business
          </h2>
          <ul className="mt-10 grid gap-4 md:grid-cols-3">
            {pillar.problems.map((p, i) => (
              <li
                key={p}
                data-reveal
                style={{ ["--d" as string]: `${i * 80}ms` }}
                className="rounded-[var(--radius-card)] border-l-2 border-cyan/60 bg-navy-850/70 px-6 py-6 font-display text-lg font-semibold leading-snug"
              >
                {p}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* What we build */}
      <section aria-labelledby="builds-title" className="py-20 sm:py-28">
        <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="lg:sticky lg:top-32 lg:self-start" data-reveal>
            <h2 id="builds-title" className="text-[length:var(--text-title)] leading-[1.1]">
              What we build
            </h2>
            <ul className="mt-6 grid gap-2">
              {codes.map((c) => (
                <li key={c.code} className="flex items-center gap-2 text-ink-2">
                  <span className="rounded-md border border-line-strong px-1.5 py-0.5 font-display text-xs font-semibold text-cyan">
                    {c.code}
                  </span>
                  {c.name}
                </li>
              ))}
            </ul>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {pillar.builds.map((b, i) => (
              <div
                key={b.title}
                data-reveal
                style={{ ["--d" as string]: `${(i % 2) * 80}ms` }}
                className={`card p-6 ${i === 0 ? "sm:col-span-2" : ""}`}
              >
                <HexMark className="text-cyan" filled={i === 0} />
                <h3 className="mt-4 text-lg">{b.title}</h3>
                <p className="mt-2 text-ink-2">{b.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <PillarWork slug={pillar.slug} />

      <ProcessTimeline />

      <Faq items={pillar.faq} title={`${pillar.short}: common questions`} />

      {/* Cross-links between pillars */}
      <section aria-labelledby="related-title" className="pb-12">
        <Container>
          <h2 id="related-title" className="font-display text-lg font-semibold text-ink-2">
            Works well with
          </h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {others.map((o) => (
              <div key={o.slug} className="card flex flex-col gap-3 p-6">
                <p className="font-display text-xl font-semibold">{o.name}</p>
                <p className="text-ink-2">{o.summary}</p>
                <TextLink href={`/services/${o.slug}`} className="mt-1">
                  Explore {o.short}
                </TextLink>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
