import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Info } from "@phosphor-icons/react/dist/ssr";
import { CtaBand } from "@/components/CtaBand";
import { Breadcrumbs, Container, HexMark, JsonLd, TextLink } from "@/components/ui";
import { pillars } from "@/lib/content";
import { articles, formatDate, getArticle } from "@/lib/insights";
import { breadcrumbs, pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps<"/insights/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) return {};
  const meta = pageMetadata({ title: a.title, description: a.description, path: `/insights/${a.slug}` });
  return {
    ...meta,
    openGraph: { ...meta.openGraph, type: "article", publishedTime: a.published, modifiedTime: a.updated, authors: [site.founder.name] },
  };
}

export default async function ArticlePage({ params }: PageProps<"/insights/[slug]">) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const path = `/insights/${article.slug}`;
  const crumbs = [
    { name: "Insights", path: "/insights" },
    { name: article.title, path },
  ];
  const pillar = pillars.find((p) => p.slug === article.pillar)!;
  const more = articles.filter((a) => a.slug !== article.slug).slice(0, 2);

  return (
    <>
      <JsonLd
        data={[
          breadcrumbs(crumbs),
          {
            "@context": "https://schema.org",
            "@type": "Article",
            headline: article.title,
            description: article.description,
            datePublished: article.published,
            dateModified: article.updated,
            mainEntityOfPage: new URL(path, site.url).toString(),
            author: { "@type": "Person", name: site.founder.fullName, url: `${site.url}/about` },
            publisher: { "@id": `${site.url}/#organization` },
            inLanguage: "en-NG",
          },
        ]}
      />

      <article className="relative isolate pt-32 sm:pt-36">
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[460px] bg-hex opacity-40 mask-fade-b" />
        <Container className="!max-w-[46rem]">
          <div className="anim-rise">
            <Breadcrumbs items={crumbs} />
          </div>
          <p className="mt-8 text-sm text-cyan">{article.topic}</p>
          <h1 className="mt-3 text-[clamp(2rem,1.4rem+2.4vw,3.2rem)] leading-[1.1] anim-lift">{article.title}</h1>
          <div className="mt-6 flex items-center gap-3 border-b border-line pb-8 text-sm text-muted">
            <Image src={site.founder.image} alt="" width={40} height={40} className="size-10 rounded-full object-cover object-top" />
            <span>
              <Link href="/about" className="font-medium text-ink hover:text-cyan">
                {site.founder.name}
              </Link>
              <span className="block">
                <time dateTime={article.published}>{formatDate(article.published)}</time>
                {article.updated !== article.published && (
                  <>
                    {" "}
                    (updated <time dateTime={article.updated}>{formatDate(article.updated)}</time>)
                  </>
                )}
                <span className="mx-2 text-faint">/</span>
                {article.readMinutes} min read
              </span>
            </span>
          </div>

          <div className="py-10 text-[1.075rem] leading-[1.8]">
            {article.body.map((block, i) => {
              switch (block.type) {
                case "h2":
                  return (
                    <h2 key={i} className="mb-4 mt-12 text-[1.6rem] leading-tight first:mt-0">
                      {block.text}
                    </h2>
                  );
                case "p":
                  return (
                    <p key={i} className="mt-5 text-ink-2 first:mt-0">
                      {block.text}
                    </p>
                  );
                case "ul":
                  return (
                    <ul key={i} className="mt-5 grid gap-3">
                      {block.items.map((item) => (
                        <li key={item} className="flex gap-3 text-ink-2">
                          <HexMark className="mt-[0.45em] text-cyan" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  );
                case "callout":
                  return (
                    <aside key={i} className="my-8 flex gap-3 rounded-[var(--radius-card)] border border-cyan/30 bg-cyan/[0.07] p-5 first:mt-0">
                      <Info size={22} className="mt-0.5 shrink-0 text-cyan" aria-hidden />
                      <p className="text-ink">{block.text}</p>
                    </aside>
                  );
              }
            })}
          </div>

          <div className="card flex flex-col gap-3 p-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-ink-2">
              Related service: <span className="font-semibold text-ink">{pillar.name}</span>
            </p>
            <TextLink href={`/services/${pillar.slug}`}>See how we help</TextLink>
          </div>
        </Container>
      </article>

      <section aria-labelledby="more-title" className="py-16 sm:py-20">
        <Container className="!max-w-[46rem]">
          <h2 id="more-title" className="text-xl">
            Keep reading
          </h2>
          <ul className="mt-6 grid gap-3">
            {more.map((a) => (
              <li key={a.slug}>
                <Link href={`/insights/${a.slug}`} className="card block p-5 transition-colors hover:border-line-strong">
                  <span className="text-sm text-cyan">{a.topic}</span>
                  <span className="mt-1 block font-display text-lg font-semibold">{a.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
