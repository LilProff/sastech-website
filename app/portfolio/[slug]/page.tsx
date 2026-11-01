import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, EyeSlash } from "@phosphor-icons/react/dist/ssr";
import { PageIntro } from "@/components/PageIntro";
import { CtaBand } from "@/components/CtaBand";
import { ProjectCard, ProjectVisual } from "@/components/ProjectCard";
import { Container, HexMark, JsonLd, TextLink } from "@/components/ui";
import { pillars } from "@/lib/content";
import { projects } from "@/lib/projects";
import { breadcrumbs, pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

const getProject = (slug: string) => projects.find((p) => p.slug === slug);

export async function generateMetadata({ params }: PageProps<"/portfolio/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  return pageMetadata({
    title: `${p.name}: ${p.kind}`,
    description: p.summary.length > 155 ? `${p.summary.slice(0, 152).trimEnd()}...` : p.summary,
    path: `/portfolio/${p.slug}`,
  });
}

export default async function ProjectPage({ params }: PageProps<"/portfolio/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const path = `/portfolio/${project.slug}`;
  const crumbs = [
    { name: "Portfolio", path: "/portfolio" },
    { name: project.name, path },
  ];
  const pillar = pillars.find((p) => p.slug === project.pillar)!;
  const related = projects.filter((p) => p.slug !== project.slug && p.pillar === project.pillar).slice(0, 2);

  return (
    <>
      <JsonLd
        data={[
          breadcrumbs(crumbs),
          {
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            name: project.name,
            description: project.summary,
            url: new URL(path, site.url).toString(),
            creator: { "@id": `${site.url}/#organization` },
            ...(project.image ? { image: new URL(project.image, site.url).toString() } : {}),
          },
        ]}
      />
      <PageIntro
        crumbs={crumbs}
        title={project.name}
        intro={
          <>
            <p>{project.summary}</p>
            <p className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-base">
              <span>
                <span className="text-muted">Client:</span> {project.client}
              </span>
              <span>
                <span className="text-muted">Type:</span> {project.kind}
              </span>
              <span>
                <span className="text-muted">Service:</span>{" "}
                <Link href={`/services/${pillar.slug}`} className="text-cyan link-underline">
                  {pillar.name}
                </Link>
              </span>
            </p>
          </>
        }
      >
        {project.url && (
          <a href={project.url} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
            Visit the live site <ArrowUpRight size={16} weight="bold" aria-hidden />
          </a>
        )}
      </PageIntro>

      <section aria-label="Project visual" className="pt-14">
        <Container>
          <div className="mx-auto max-w-5xl" data-reveal>
            <ProjectVisual project={project} priority sizes="(min-width: 1024px) 1024px, 92vw" />
            {!project.image && project.preview && (
              <p className="mt-4 flex items-center gap-2 text-sm text-muted">
                <EyeSlash size={16} aria-hidden /> This system holds client data, so the preview shows its layout with every
                name and figure hidden.
              </p>
            )}
          </div>
        </Container>
      </section>

      <section aria-labelledby="challenge-title" className="py-16 sm:py-24">
        <Container className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div data-reveal>
            <h2 id="challenge-title" className="text-[length:var(--text-title)] leading-[1.1]">
              The challenge
            </h2>
            <p className="mt-5 text-lg text-ink-2">{project.challenge}</p>
            <h3 className="mt-10 text-xl">Where it stands</h3>
            <p className="mt-3 text-ink-2">{project.outcome}</p>
            {project.note && (
              <p className="mt-4">
                <span className="fill">{project.note}</span>
              </p>
            )}
          </div>
          <div data-reveal style={{ ["--d" as string]: "80ms" }}>
            <h2 className="font-display text-xl font-semibold">What we built</h2>
            <ul className="mt-6 grid gap-3">
              {project.built.map((b, i) => (
                <li key={b} className="flex gap-3 rounded-[var(--radius-card)] border border-line bg-navy-850/60 p-4">
                  <HexMark className="mt-1 text-cyan" filled={i === 0} />
                  <span className="text-ink-2">{b}</span>
                </li>
              ))}
            </ul>
            {project.stack && (
              <ul className="mt-6 flex flex-wrap gap-2" aria-label="Tools used">
                {project.stack.map((s) => (
                  <li key={s} className="rounded-full border border-line-strong px-3 py-1 text-sm text-ink-2">
                    {s}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </Container>
      </section>

      {related.length > 0 && (
        <section aria-labelledby="related-title" className="pb-16">
          <Container>
            <div className="flex items-end justify-between gap-6">
              <h2 id="related-title" className="text-2xl">
                More {pillar.short} work
              </h2>
              <TextLink href="/portfolio">All work</TextLink>
            </div>
            <div className="mt-10 grid gap-x-8 gap-y-14 md:grid-cols-2">
              {related.map((p, i) => (
                <ProjectCard key={p.slug} project={p} delay={i * 80} />
              ))}
            </div>
          </Container>
        </section>
      )}

      <CtaBand title="Want a system like this for your business?" />
    </>
  );
}
