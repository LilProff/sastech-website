import type { ReactNode } from "react";
import { Breadcrumbs, Container } from "./ui";

/** Shared top section for inner pages: breadcrumbs, one H1, short intro. */
export function PageIntro({
  crumbs,
  title,
  intro,
  children,
  aside,
}: {
  crumbs: { name: string; path: string }[];
  title: ReactNode;
  intro: ReactNode;
  children?: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden pt-32 sm:pt-36">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-x-0 top-0 h-[520px] bg-hex opacity-40 mask-fade-b" />
        <div className="absolute -top-40 left-1/3 size-[520px] rounded-full bg-cyan/[0.07] blur-[120px]" />
      </div>
      <Container className={aside ? "grid items-end gap-10 lg:grid-cols-[1.3fr_1fr]" : undefined}>
        <div className="max-w-3xl">
          <div className="anim-rise">
            <Breadcrumbs items={crumbs} />
          </div>
          <h1
            className={aside ? "mt-6 text-[clamp(2.2rem,1.4rem+2.4vw,3.35rem)] leading-[1.08] anim-lift" : "mt-6 text-[length:var(--text-display)] leading-[1.05] anim-lift"}
            style={{ ["--d" as string]: "60ms" }}
          >
            {title}
          </h1>
          <div className="mt-6 max-w-2xl text-lg text-ink-2 anim-lift" style={{ ["--d" as string]: "120ms" }}>
            {intro}
          </div>
          {children && (
            <div className="mt-9 anim-rise" style={{ ["--d" as string]: "180ms" }}>
              {children}
            </div>
          )}
        </div>
        {aside && (
          <div className="anim-fade" style={{ ["--d" as string]: "200ms" }}>
            {aside}
          </div>
        )}
      </Container>
    </section>
  );
}
