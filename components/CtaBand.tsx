import { Mark } from "./Logo";
import { BookCallButton, Container, WhatsAppButton } from "./ui";

export function CtaBand({
  title = "Tell us what's slowing the business down.",
  body = "Fifteen minutes, no cost, no pressure. You'll leave knowing what to fix first, even if you don't work with us.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section aria-labelledby="cta-title" className="pt-8">
      <Container>
        <div
          className="relative isolate overflow-hidden rounded-[28px] border border-line-strong/70 bg-gradient-to-br from-navy-800 via-navy-850 to-navy-950 px-6 py-16 sm:px-12 sm:py-20 lg:px-16"
          data-reveal
        >
          <div aria-hidden className="absolute inset-0 -z-10 bg-hex opacity-50 mask-fade-b" />
          <div aria-hidden className="absolute -right-24 -top-24 -z-10 size-[420px] rounded-full bg-cyan/15 blur-[100px]" />
          <Mark className="pointer-events-none absolute -bottom-16 -right-10 -z-10 h-[340px] w-auto opacity-[0.07] sm:right-10" />
          <div className="max-w-2xl">
            <h2 id="cta-title" className="text-[length:var(--text-title)] leading-[1.1]">
              {title}
            </h2>
            <p className="mt-5 max-w-xl text-lg text-ink-2">{body}</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <BookCallButton />
              <WhatsAppButton />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
