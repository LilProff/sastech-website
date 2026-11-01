import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageIntro } from "@/components/PageIntro";
import { CtaBand } from "@/components/CtaBand";
import { Container, HexMark, JsonLd } from "@/components/ui";
import { values } from "@/lib/content";
import { site } from "@/lib/site";
import { breadcrumbs, pageMetadata, personSchema } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "About Sastech Consults and Founder Samuel Sholarin",
  description:
    "Sastech Consults is a Lagos tech and AI consultancy founded by Samuel Sholarin, an AI systems architect with a First Class degree in Computer Science.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <JsonLd data={[breadcrumbs([{ name: "About", path: "/about" }]), personSchema()]} />
      <PageIntro
        crumbs={[{ name: "About", path: "/about" }]}
        title={
          <>
            Built by an engineer who <span className="text-cyan">ships systems.</span>
          </>
        }
        intro="Sastech Consults is a Lagos-based tech and AI consultancy. We build the website, the tools and the automation, and we stay to make them work."
      />

      <section aria-labelledby="founder-title" className="py-16 sm:py-24">
        <Container className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <figure className="relative mx-auto w-full max-w-[420px]" data-reveal>
            <div aria-hidden className="absolute -inset-6 -z-10 rounded-[32px] bg-cyan/10 blur-3xl" />
            <div className="overflow-hidden rounded-[28px] border border-line-strong">
              <Image
                src={site.founder.image}
                alt="Samuel Sholarin, founder of Sastech Consults"
                width={608}
                height={808}
                sizes="(min-width: 1024px) 420px, 90vw"
                className="h-auto w-full"
                priority
              />
            </div>
            <figcaption className="mt-4 text-sm text-muted">
              {site.founder.name}, {site.founder.role}
            </figcaption>
          </figure>

          <div data-reveal style={{ ["--d" as string]: "80ms" }}>
            <h2 id="founder-title" className="text-[length:var(--text-title)] leading-[1.1]">
              Hi, I&apos;m Samuel.
            </h2>
            <div className="mt-6 grid gap-4 text-lg text-ink-2">
              <p>
                I&apos;m an AI systems architect and full-stack developer in Lagos, with a First Class BSc in Computer
                Science from Dominion University.
              </p>
              <p>
                I build AI operations software for a living, including AgentDesk, an AI operations platform. I kept
                seeing the same thing in Nigerian businesses: good products and hard-working teams, held back by missed
                messages, notebook orders and websites nobody can find.
              </p>
              <p>
                Sastech exists to fix that with the same tools I use every day, sized for a growing business. We audit
                first, build in phases, and only claim results we can show.
              </p>
              <p>
                So far that includes retail and logistics systems, client websites, and our own AI products such as
                GoalFlow and Sabi Biz.{" "}
                <Link href="/portfolio" className="text-cyan link-underline">
                  See the work
                </Link>
                .
              </p>
            </div>
            <ul className="mt-8 flex flex-wrap gap-3">
              {site.founder.sameAs.map((href) => (
                <li key={href}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer me"
                    className="btn btn-ghost !px-4 !py-2.5 text-sm"
                  >
                    {href.includes("linkedin") ? "LinkedIn" : "GitHub"}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <section aria-labelledby="values-title" className="py-16 sm:py-24">
        <Container>
          <h2 id="values-title" className="max-w-2xl text-[length:var(--text-title)] leading-[1.1]" data-reveal>
            What you can expect from us
          </h2>
          <ol className="mt-12 grid gap-px overflow-hidden rounded-[var(--radius-card)] border border-line bg-line sm:grid-cols-2">
            {values.map((v, i) => (
              <li key={v.title} className="bg-navy-900 p-7 sm:p-9" data-reveal style={{ ["--d" as string]: `${(i % 2) * 80}ms` }}>
                <div className="flex items-center gap-3">
                  <HexMark className="text-cyan" filled={i === 0} />
                  <h3 className="text-xl">{v.title}</h3>
                </div>
                <p className="mt-3 text-ink-2">{v.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section aria-labelledby="company-title" className="py-16 sm:py-24">
        <Container>
          <div className="card grid gap-6 p-7 sm:grid-cols-2 sm:p-9 lg:grid-cols-4" data-reveal>
            <h2 id="company-title" className="text-xl sm:col-span-2 lg:col-span-4">
              Company details
            </h2>
            <Detail label="Business name" value={site.legal.name} />
            <Detail label="Based in" value={site.legal.address} />
            <Detail label="Email" value={site.email} />
            <Detail label="Data requests" value={site.privacyEmail} />
          </div>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-sm text-muted">{label}</p>
      <p className="mt-1 font-medium text-ink">
        {value}
      </p>
    </div>
  );
}
