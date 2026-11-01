"use client";

import { useState } from "react";
import { CalendarCheck } from "@phosphor-icons/react";
import { site } from "@/lib/site";

/**
 * Click-to-load booking calendar. Calendly is a third party that may set cookies,
 * so nothing loads from it until the visitor asks for the calendar.
 */
export function CalendlyEmbed() {
  const [loaded, setLoaded] = useState(false);
  const src = `${site.booking.url}?hide_gdpr_banner=1&background_color=0a2236&text_color=f4f9fc&primary_color=03d4ee`;

  if (loaded) {
    return (
      <div className="card overflow-hidden p-0">
        <iframe
          src={src}
          title="Book a free call with Sastech Consults"
          className="h-[700px] w-full border-0"
          loading="lazy"
        />
      </div>
    );
  }

  return (
    <div className="card relative isolate flex min-h-[420px] flex-col items-start justify-end overflow-hidden p-8 sm:p-10">
      <div aria-hidden className="absolute inset-0 -z-10 bg-hex opacity-50 mask-fade-b" />
      <div aria-hidden className="absolute -right-16 -top-16 -z-10 size-72 rounded-full bg-cyan/15 blur-[80px]" />
      <CalendarCheck size={44} weight="duotone" className="text-cyan" aria-hidden />
      <h2 className="mt-6 text-[clamp(1.6rem,1.2rem+1.2vw,2.2rem)] leading-tight">Pick a time that suits you</h2>
      <p className="mt-3 max-w-md text-ink-2">
        A free call to understand your business and tell you honestly whether we can help. Times show in your local
        time zone.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <button type="button" onClick={() => setLoaded(true)} className="btn btn-primary">
          Show available times
        </button>
        <a href={site.booking.url} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
          Open in Calendly
        </a>
      </div>
      <p className="mt-5 text-xs text-muted">Loads Calendly, which may set its own cookies.</p>
    </div>
  );
}
