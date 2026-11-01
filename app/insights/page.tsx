import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { PageIntro } from "@/components/PageIntro";
import { CtaBand } from "@/components/CtaBand";
import { Container, JsonLd, cn } from "@/components/ui";
import { articles, formatDate } from "@/lib/insights";
import { breadcrumbs, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Insights: AI, Automation and Websites for Nigerian Businesses",
  description:
    "Practical guides on WhatsApp automation, websites and SEO, operations tools and data privacy for Nigerian businesses. Plain English, no hype.",
  path: "/insights",
});

export default function InsightsPage() {
  const [lead, ...rest] = [...articles].sort((a, b) => b.published.localeCompare(a.published));
  return (
    <>
      <JsonLd data={breadcrumbs([{ name: "Insights", path: "/insights" }])} />
      <PageIntro
        crumbs={[{ name: "Insights", path: "/insights" }]}
        title={
          <>
            Practical guides for <span className="text-cyan">growing businesses.</span>
          </>
        }
        intro="How AI, automation and a good website actually help a Nigerian business. Plain English, real examples, no hype."
      />

      <section aria-label="Articles" className="py-14 sm:py-20">
        <Container className="grid gap-5 lg:grid-cols-2">
          <ArticleCard article={lead} large />
          <div className="grid gap-5">
            {rest.map((a, i) => (
              <ArticleCard key={a.slug} article={a} delay={(i + 1) * 70} />
            ))}
          </div>
        </Container>
      </section>

      <CtaBand title="Have a question we haven't answered?" />
    </>
  );
}

function ArticleCard({ article, large, delay = 0 }: { article: (typeof articles)[number]; large?: boolean; delay?: number }) {
  return (
    <article
      data-reveal
      style={{ ["--d" as string]: `${delay}ms` }}
      className={cn(
        "card group relative isolate flex flex-col overflow-hidden p-6 transition-colors duration-500 hover:border-line-strong sm:p-8",
        large && "min-h-[420px] justify-end",
      )}
    >
      {large && (
        <div aria-hidden className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-hex opacity-70 mask-fade-b" />
          <div className="absolute -right-20 -top-20 size-80 rounded-full bg-cyan/15 blur-[90px]" />
        </div>
      )}
      <p className="text-sm text-muted">
        <span className="text-cyan">{article.topic}</span>
        <span className="mx-2 text-faint">/</span>
        {article.readMinutes} min read
      </p>
      <h2 className={cn("mt-3 leading-tight", large ? "text-[clamp(1.6rem,1.2rem+1.4vw,2.4rem)]" : "text-xl")}>
        <Link href={`/insights/${article.slug}`} className="after:absolute after:inset-0 after:content-['']">
          {article.title}
        </Link>
      </h2>
      <p className="mt-3 text-ink-2">{article.description}</p>
      <div className="mt-5 flex items-center justify-between text-sm text-muted">
        <time dateTime={article.published}>{formatDate(article.published)}</time>
        <ArrowUpRight size={20} aria-hidden className="text-faint transition-all duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-cyan" />
      </div>
    </article>
  );
}
