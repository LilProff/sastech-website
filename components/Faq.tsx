import { Plus } from "@phosphor-icons/react/dist/ssr";
import type { Faq as FaqItem } from "@/lib/content";
import { Container } from "./ui";

/** FAQ with native <details>, so it works without JavaScript. Pair with faqSchema(). */
export function Faq({ items, title = "Questions, answered" }: { items: FaqItem[]; title?: string }) {
  return (
    <section aria-labelledby="faq-title" className="py-24 sm:py-32">
      <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div className="lg:sticky lg:top-32 lg:self-start" data-reveal>
          <h2 id="faq-title" className="text-[length:var(--text-title)] leading-[1.1]">
            {title}
          </h2>
          <p className="mt-4 max-w-sm text-ink-2">
            Something else on your mind? Ask on the free call. No pitch, just answers.
          </p>
        </div>
        <div className="grid gap-3" data-reveal style={{ ["--d" as string]: "80ms" }}>
          {items.map((item) => (
            <details key={item.q} className="group card px-5 open:border-line-strong sm:px-6">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 font-display text-[1.05rem] font-semibold text-ink [&::-webkit-details-marker]:hidden">
                {item.q}
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-line-strong text-cyan transition-transform duration-300 group-open:rotate-45">
                  <Plus size={16} weight="bold" aria-hidden />
                </span>
              </summary>
              <p className="max-w-[62ch] pb-6 text-ink-2">{item.a}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
