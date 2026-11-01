import type { Metadata } from "next";
import Link from "next/link";
import { Mark } from "@/components/Logo";
import { BookCallButton, Container } from "@/components/ui";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section className="relative isolate overflow-hidden">
      <div aria-hidden className="absolute inset-0 -z-10 bg-hex opacity-50 mask-radial" />
      <Container className="flex min-h-[80dvh] flex-col items-center justify-center pt-28 text-center">
        <Mark className="h-24 w-auto anim-float" />
        <p className="mt-8 font-display text-sm font-semibold text-cyan">404</p>
        <h1 className="mt-3 text-[length:var(--text-title)] leading-tight">This page took a wrong turn.</h1>
        <p className="mt-4 max-w-md text-lg text-ink-2">
          The link may be old, or the page may have moved. Let&apos;s get you back on track.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn btn-ghost">
            Back to home
          </Link>
          <BookCallButton />
        </div>
      </Container>
    </section>
  );
}
