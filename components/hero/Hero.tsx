import { BookCallButton, Container, WhatsAppButton } from "../ui";
import { HeroCanvas } from "./HeroCanvas";
import { HeroFallback } from "./HeroFallback";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden" aria-labelledby="hero-title">
      {/* Background: soft cyan glow over a faint hexagon field. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-hex opacity-60 mask-radial" />
        <div className="absolute -right-[10%] top-[8%] h-[70vmin] w-[70vmin] rounded-full bg-cyan/10 blur-[120px]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-navy-900" />
      </div>

      <Container className="grid min-h-[100dvh] items-center gap-6 pb-10 pt-28 lg:grid-cols-[1.2fr_1fr] lg:gap-4 lg:pb-16 lg:pt-24">
        <div className="relative z-10 max-w-[40rem]">
          <p className="eyebrow anim-rise">Tech and AI consultancy, Lagos</p>
          <h1
            id="hero-title"
            className="mt-5 text-[clamp(2.45rem,1.35rem+3.2vw,4rem)] leading-[1.05] anim-lift"
            style={{ ["--d" as string]: "80ms" }}
          >
            Websites that get found.{" "}
            <span className="text-cyan">Systems that do the work.</span>
          </h1>
          <p
            className="mt-6 max-w-[34rem] text-lg leading-relaxed text-ink-2 anim-lift"
            style={{ ["--d" as string]: "160ms" }}
          >
            Websites and SEO, operations tools, and AI automation for businesses that want more customers and less
            manual work.
          </p>
          <div className="mt-9 flex flex-wrap gap-3 anim-rise" style={{ ["--d" as string]: "240ms" }}>
            <BookCallButton />
            <WhatsAppButton />
          </div>
        </div>

        <div className="relative h-[min(420px,52vh)] w-full anim-fade sm:h-[460px] lg:h-[min(640px,74dvh)]" style={{ ["--d" as string]: "200ms" }}>
          <HeroCanvas fallback={<HeroFallback />} />
        </div>
      </Container>
    </section>
  );
}
