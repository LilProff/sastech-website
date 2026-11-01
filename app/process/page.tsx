import type { Metadata } from "next";
import { PageIntro } from "@/components/PageIntro";
import { CtaBand } from "@/components/CtaBand";
import { ProcessTimeline } from "@/components/home/Sections";
import { BookCallButton, Container, HexMark, JsonLd } from "@/components/ui";
import { commercialModels } from "@/lib/content";
import { breadcrumbs, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "How We Work: Free Call, Audit, Phased Build",
  description:
    "How Sastech works: a free 15-minute call, a paid audit with a written roadmap, a phased build and ongoing support. Clear pricing options, no surprises.",
  path: "/process",
});

const promises = [
  "A written plan before any build starts.",
  "Every payment tied to something delivered.",
  "You own your accounts, data and domain where possible.",
  "Plain-English updates, not jargon.",
  "Platform costs billed at cost and listed separately.",
  "Your business is never named in our marketing without written permission.",
];

export default function ProcessPage() {
  return (
    <>
      <JsonLd data={breadcrumbs([{ name: "How we work", path: "/process" }])} />
      <PageIntro
        crumbs={[{ name: "How we work", path: "/process" }]}
        title={
          <>
            Audit first. <span className="text-cyan">Then build in phases.</span>
          </>
        }
        intro="We don't sell you a system before we understand your business. A short free call, a proper audit, then a build you can see working early."
      >
        <BookCallButton />
      </PageIntro>

      <ProcessTimeline withHeading={false} />

      <section aria-labelledby="audit-title" className="py-16 sm:py-24">
        <Container className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div data-reveal>
            <h2 id="audit-title" className="text-[length:var(--text-title)] leading-[1.1]">
              Why the audit comes first
            </h2>
            <p className="mt-5 text-lg text-ink-2">
              The audit (S1) is a paid piece of work. We interview you, look at how orders, messages and leads actually
              move today, and write down where money and time are leaking.
            </p>
            <p className="mt-4 text-ink-2">
              You get a written audit and a prioritised roadmap built around three questions: will this earn more, save
              time, or cut cost? The roadmap ends with a build quote. It is yours to keep, whether or not we do the
              build.
            </p>
          </div>
          <ul className="grid gap-3 self-start sm:grid-cols-2" data-reveal style={{ ["--d" as string]: "80ms" }}>
            {promises.map((p) => (
              <li key={p} className="flex gap-3 rounded-[var(--radius-card)] border border-line bg-navy-850/60 p-5">
                <HexMark className="mt-1 text-cyan" />
                <span className="text-ink-2">{p}</span>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section id="pricing" aria-labelledby="pricing-title" className="scroll-mt-28 py-16 sm:py-24">
        <Container>
          <div className="max-w-2xl" data-reveal>
            <h2 id="pricing-title" className="text-[length:var(--text-title)] leading-[1.1]">
              How we price
            </h2>
            <p className="mt-5 text-lg text-ink-2">
              We don&apos;t publish one price for everyone, because a two-branch gadget store and a logistics company need
              different things. Your quote shows each option side by side, so you can choose.
            </p>
          </div>
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {commercialModels.map((m, i) => (
              <div key={m.name} className="card flex flex-col p-7" data-reveal style={{ ["--d" as string]: `${i * 80}ms` }}>
                <span className="font-display text-sm font-semibold text-cyan">Option {String.fromCharCode(65 + i)}</span>
                <h3 className="mt-3 text-2xl">{m.name}</h3>
                <p className="mt-3 text-ink-2">{m.body}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 max-w-3xl text-ink-2" data-reveal>
            On retainers, you can choose an optional performance share: a percentage of measured gains in revenue, cost
            saved or time saved, against a baseline we agree in writing before work starts.
          </p>
        </Container>
      </section>

      <CtaBand title="Start with a free 15-minute call." />
    </>
  );
}
