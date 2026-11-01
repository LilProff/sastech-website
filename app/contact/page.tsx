import type { Metadata } from "next";
import { EnvelopeSimple, WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import { PageIntro } from "@/components/PageIntro";
import { ContactForm } from "@/components/ContactForm";
import { CalendlyEmbed } from "@/components/CalendlyEmbed";
import { Container, JsonLd, SocialLinks } from "@/components/ui";
import { site, whatsappHref } from "@/lib/site";
import { breadcrumbs, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Contact Sastech: Book a Free 15-Minute Call",
  description:
    "Book a free 15-minute call with Sastech Consults, send a message or chat on WhatsApp. Websites, operations tools and AI automation for Nigerian businesses.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <JsonLd data={breadcrumbs([{ name: "Contact", path: "/contact" }])} />
      <PageIntro
        crumbs={[{ name: "Contact", path: "/contact" }]}
        title={
          <>
            Let&apos;s talk about <span className="text-cyan">your business.</span>
          </>
        }
        intro="Book a free 15-minute call, send a message, or chat on WhatsApp. Whichever you choose, a real person replies."
      />

      <section aria-label="Ways to reach us" className="py-14 sm:py-20">
        <Container className="grid gap-6 lg:grid-cols-[1.05fr_1fr]">
          <div data-reveal>
            <CalendlyEmbed />
          </div>
          <div className="grid gap-4 self-start" data-reveal style={{ ["--d" as string]: "80ms" }}>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="card group flex items-center gap-5 p-6 transition-colors hover:border-cyan/50"
            >
              <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-cyan/10 text-cyan">
                <WhatsappLogo size={24} aria-hidden />
              </span>
              <span>
                <span className="block font-display text-lg font-semibold">Chat on WhatsApp</span>
                <span className="text-ink-2">Fastest for quick questions.</span>
              </span>
            </a>
            <a
              href={`mailto:${site.email}`}
              className="card group flex items-center gap-5 p-6 transition-colors hover:border-cyan/50"
            >
              <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-cyan/10 text-cyan">
                <EnvelopeSimple size={24} aria-hidden />
              </span>
              <span>
                <span className="block font-display text-lg font-semibold">{site.email}</span>
                <span className="text-ink-2">For detailed briefs and documents.</span>
              </span>
            </a>
            <div className="card p-6">
              <p className="font-display text-lg font-semibold">Follow {site.handle}</p>
              <p className="text-ink-2">Build-in-public updates, tips and new work.</p>
              <SocialLinks className="mt-4" />
            </div>
          </div>
        </Container>
      </section>

      <section aria-labelledby="form-title" className="pb-10">
        <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div data-reveal>
            <h2 id="form-title" className="text-[length:var(--text-title)] leading-[1.1]">
              Or send a message
            </h2>
            <p className="mt-4 max-w-sm text-lg text-ink-2">
              Tell us what&apos;s slowing the business down. We&apos;ll reply with next steps, usually within one working
              day.
            </p>
          </div>
          <div data-reveal style={{ ["--d" as string]: "80ms" }}>
            <ContactForm />
          </div>
        </Container>
      </section>
    </>
  );
}
