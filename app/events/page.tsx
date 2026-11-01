import type { Metadata } from "next";
import { CalendarBlank, ChalkboardTeacher, Lightning, VideoCamera } from "@phosphor-icons/react/dist/ssr";
import { PageIntro } from "@/components/PageIntro";
import { CtaBand } from "@/components/CtaBand";
import { Container, JsonLd, WhatsAppButton } from "@/components/ui";
import { breadcrumbs, pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Events: Workshops and Live Sessions",
  description:
    "Free workshops and live sessions from Sastech Consults on WhatsApp automation, websites and AI for Nigerian businesses. See what's coming up.",
  path: "/events",
});

type SastechEvent = {
  title: string;
  date: string; // ISO, e.g. 2026-12-05T15:00:00+01:00
  format: "Online" | "In person";
  location: string;
  summary: string;
  registerUrl: string;
};

// [FILL: add real events here. The page shows an empty state until then.]
const events: SastechEvent[] = [];

// [FILL: confirm these planned formats before launch]
const formats = [
  {
    icon: Lightning,
    title: "Automation clinics",
    body: "Bring your top customer questions. We map which ones to automate and how, live.",
  },
  {
    icon: VideoCamera,
    title: "Build in public",
    body: "Watch a real system get built step by step, from the first idea to a working tool.",
  },
  {
    icon: ChalkboardTeacher,
    title: "Website teardowns",
    body: "Volunteer businesses get honest, practical feedback on their website and Google presence.",
  },
];

export default function EventsPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbs([{ name: "Events", path: "/events" }]),
          ...events.map((e) => ({
            "@context": "https://schema.org",
            "@type": "Event",
            name: e.title,
            startDate: e.date,
            description: e.summary,
            eventAttendanceMode:
              e.format === "Online"
                ? "https://schema.org/OnlineEventAttendanceMode"
                : "https://schema.org/OfflineEventAttendanceMode",
            location: e.format === "Online" ? { "@type": "VirtualLocation", url: e.registerUrl } : { "@type": "Place", name: e.location },
            organizer: { "@id": `${site.url}/#organization` },
          })),
        ]}
      />
      <PageIntro
        crumbs={[{ name: "Events", path: "/events" }]}
        title={
          <>
            Learn it live, <span className="text-cyan">for free.</span>
          </>
        }
        intro="Short, practical sessions on automation, websites and AI for business owners and teams. No jargon and no sales pitch."
      />

      <section aria-labelledby="upcoming-title" className="py-14 sm:py-20">
        <Container>
          <h2 id="upcoming-title" className="text-[length:var(--text-title)] leading-[1.1]" data-reveal>
            Upcoming
          </h2>
          {events.length ? (
            <ul className="mt-10 grid gap-4">
              {events.map((e) => (
                <li key={e.title} className="card flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between" data-reveal>
                  <div>
                    <p className="text-sm text-cyan">
                      {new Date(e.date).toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" })},{" "}
                      {e.format}
                    </p>
                    <h3 className="mt-1 text-xl">{e.title}</h3>
                    <p className="mt-1 text-ink-2">{e.summary}</p>
                  </div>
                  <a href={e.registerUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                    Save a seat
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <div className="card relative isolate mt-10 overflow-hidden p-8 sm:p-12" data-reveal>
              <div aria-hidden className="absolute inset-0 -z-10 bg-hex opacity-50 mask-fade-b" />
              <CalendarBlank size={40} weight="duotone" className="text-cyan" aria-hidden />
              <h3 className="mt-5 text-2xl">The first sessions are being scheduled.</h3>
              <p className="mt-3 max-w-xl text-ink-2">
                Message us on WhatsApp and we&apos;ll tell you when the next one is open. One message per event, nothing
                else.
              </p>
              <div className="mt-7">
                <WhatsAppButton />
              </div>
            </div>
          )}
        </Container>
      </section>

      <section aria-labelledby="formats-title" className="py-14 sm:py-20">
        <Container>
          <h2 id="formats-title" className="max-w-2xl text-[length:var(--text-title)] leading-[1.1]" data-reveal>
            What the sessions look like
          </h2>
          <div className="mt-10 grid gap-5 md:grid-cols-[1.2fr_1fr_1fr]">
            {formats.map((f, i) => (
              <div key={f.title} className="card p-7" data-reveal style={{ ["--d" as string]: `${i * 80}ms` }}>
                <f.icon size={30} weight="duotone" className="text-cyan" aria-hidden />
                <h3 className="mt-5 text-xl">{f.title}</h3>
                <p className="mt-2 text-ink-2">{f.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <CtaBand title="Can't wait for an event?" body="Book a free 15-minute call and get answers about your business today." />
    </>
  );
}
