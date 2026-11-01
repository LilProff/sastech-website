// Redacted interface previews for client systems that sit behind a login.
// They mirror each product's real layout and module names, but every figure, person,
// truck and route is replaced by a blurred block. Labelled as redacted, so nobody
// mistakes them for a live screenshot. Swap for approved, blurred screenshots later.

import { EyeSlash } from "@phosphor-icons/react/dist/ssr";
import type { PreviewKind } from "@/lib/projects";
import { cn } from "./ui";

const LABELS: Record<PreviewKind, string> = {
  crm: "AI customer CRM",
  erp: "Operations ERP",
  driver: "Driver app",
  maintenance: "Axletiq maintenance",
  payments: "PayFlow payments",
  projects: "ProjectHub",
  portal: "Staff portal",
};

/** A blurred block standing in for a hidden value. */
function X({ w = "3ch", className }: { w?: string; className?: string }) {
  return <span className={cn("inline-block h-[0.75em] rounded-sm bg-current opacity-25 blur-[1.5px]", className)} style={{ width: w }} />;
}

function Tile({ label, accent }: { label: string; accent?: boolean }) {
  return (
    <div className={cn("rounded-lg border border-line p-2.5", accent ? "bg-navy-950 text-ink" : "bg-navy-850")}>
      <p className="truncate text-[0.58rem] font-semibold uppercase tracking-wide text-muted">{label}</p>
      <p className="mt-1.5 font-display text-base font-bold text-ink">
        <X w="2.4ch" />
      </p>
    </div>
  );
}

function Sidebar({ title, items, active = 0 }: { title: string; items: string[]; active?: number }) {
  return (
    <div className="hidden w-[26%] shrink-0 flex-col gap-1 border-r border-line bg-navy-950 p-3 sm:flex">
      <p className="mb-2 truncate font-display text-[0.72rem] font-bold text-ink">{title}</p>
      {items.map((it, i) => (
        <p
          key={it}
          className={cn(
            "truncate rounded-md px-2 py-1 text-[0.62rem]",
            i === active ? "bg-cyan/15 font-semibold text-ink" : "text-ink-2",
          )}
        >
          {it}
        </p>
      ))}
    </div>
  );
}

function Pill({ children, tone = "cyan" }: { children: React.ReactNode; tone?: "cyan" | "success" | "warn" | "muted" }) {
  const tones = {
    cyan: "border-cyan/40 bg-cyan/10 text-cyan",
    success: "border-success/40 bg-success/10 text-success",
    warn: "border-amber-500/40 bg-amber-500/10 text-amber-600 dark:text-amber-400",
    muted: "border-line-strong text-ink-2",
  };
  return <span className={cn("shrink-0 rounded-full border px-2 py-0.5 text-[0.55rem] font-semibold", tones[tone])}>{children}</span>;
}

function Body({ kind }: { kind: PreviewKind }) {
  switch (kind) {
    case "crm":
      return (
        <div className="flex h-full">
          <Sidebar title="Customers" items={["Dashboard", "Customers", "Segments", "Campaigns", "Automations", "Team"]} />
          <div className="flex-1 space-y-3 p-3">
            <div className="rounded-md border border-amber-500/30 bg-amber-500/10 px-2.5 py-1.5 text-[0.58rem] text-ink-2">
              Test mode. Campaigns run end to end without sending.
            </div>
            <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
              <Tile label="Customers" accent />
              <Tile label="Opted in" />
              <Tile label="New, 30 days" />
              <Tile label="Replies" />
            </div>
            <div className="rounded-lg border border-line bg-navy-850 p-3">
              <p className="text-[0.68rem] font-semibold text-ink">Customers by status</p>
              {[
                ["New enquiry", "88%"],
                ["Quoted", "4%"],
                ["Booked", "22%"],
                ["Repeat", "8%"],
                ["Dormant", "6%"],
              ].map(([l, w]) => (
                <div key={l} className="mt-2 flex items-center gap-2 text-[0.58rem] text-ink-2">
                  <span className="w-16 shrink-0 truncate">{l}</span>
                  <span className="h-1.5 flex-1 rounded-full bg-line">
                    <span className="block h-full rounded-full bg-cyan/70" style={{ width: w }} />
                  </span>
                </div>
              ))}
              <p className="mt-3 text-[0.58rem] text-ink-2">
                Dormant customers flagged. <span className="text-cyan underline">Send a win-back campaign</span>
              </p>
            </div>
          </div>
        </div>
      );
    case "erp":
      return (
        <div className="flex h-full">
          <Sidebar
            title="Operations ERP"
            items={["Dashboard", "Trip pipeline", "Fuel logs", "Geofence events", "Fleet", "Drivers", "Safety", "Tyres", "Maintenance", "Finance"]}
          />
          <div className="flex-1 space-y-3 p-3">
            <div className="rounded-lg bg-gradient-to-r from-cyan/25 to-cyan/5 p-3">
              <p className="text-[0.55rem] font-semibold text-cyan">Fleet operations overview</p>
              <p className="mt-1 font-display text-sm font-bold text-ink">Welcome back, operations team</p>
              <span className="mt-2 inline-flex rounded-full bg-navy-850 px-2 py-0.5 text-[0.55rem] text-ink-2">Ask AI</span>
            </div>
            <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
              {["Drivers", "Trucks", "Trips", "In progress", "Incidents", "Maintenance", "Tyres", "Inspections"].map((l) => (
                <Tile key={l} label={l} />
              ))}
            </div>
          </div>
        </div>
      );
    case "maintenance":
      return (
        <div className="flex h-full">
          <Sidebar title="Axletiq" items={["Home", "Monitor", "Cost dashboard", "Trucks", "Trailers", "Drivers", "Tyres", "Inspections", "Schedule"]} />
          <div className="flex-1 space-y-3 p-3">
            <div className="flex items-center justify-between rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2">
              <span className="text-[0.62rem] font-semibold text-red-600 dark:text-red-400">
                <X w="1.6ch" /> jobs need attention
              </span>
              <span className="text-[0.58rem] font-semibold text-red-600 dark:text-red-400">Board</span>
            </div>
            <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
              {["On the road", "In the shop", "In the bay", "Open jobs"].map((l) => (
                <Tile key={l} label={l} />
              ))}
            </div>
            {["Body part", "Brakes", "Tyre change"].map((job) => (
              <div key={job} className="flex items-center justify-between rounded-lg border border-line bg-navy-850 px-3 py-2">
                <span className="text-[0.62rem] text-ink">
                  <span className="font-mono text-muted">WO-</span>
                  <X w="3ch" /> <span className="ml-1 text-ink-2">{job}</span>
                </span>
                <Pill tone="warn">Open</Pill>
              </div>
            ))}
          </div>
        </div>
      );
    case "payments":
      return (
        <div className="space-y-3 p-4">
          <div className="flex flex-wrap items-center gap-1.5 text-[0.6rem]">
            {["Request", "Approve", "Pay", "Reconcile"].map((s, i) => (
              <span key={s} className="flex items-center gap-1.5">
                <span className={cn("rounded-full px-2.5 py-1 font-semibold", i < 3 ? "bg-cyan/15 text-cyan" : "bg-navy-800 text-ink-2")}>{s}</span>
                {i < 3 && <span className="text-faint">›</span>}
              </span>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-2">
            <Tile label="Pending" />
            <Tile label="Paid today" />
            <Tile label="Failed" />
          </div>
          {[
            ["Trip advance", "success", "Paid"],
            ["Fuel", "cyan", "Approved"],
            ["Tolls and levies", "muted", "Requested"],
            ["Workshop parts", "success", "Paid"],
          ].map(([l, tone, s]) => (
            <div key={l} className="flex items-center justify-between rounded-lg border border-line bg-navy-850 px-3 py-2">
              <span className="text-[0.62rem] text-ink">
                {l} <span className="ml-2 text-muted">₦</span>
                <X w="5ch" />
              </span>
              <Pill tone={tone as "success" | "cyan" | "muted"}>{s}</Pill>
            </div>
          ))}
        </div>
      );
    case "projects":
      return (
        <div className="flex h-full">
          <Sidebar title="ProjectHub" items={["Work", "Rhythm", "Grow", "Company", "Settings"]} />
          <div className="flex-1 space-y-3 p-3">
            <div className="flex gap-1">
              {["Overview", "To-do", "Blockers"].map((t, i) => (
                <span key={t} className={cn("rounded-md px-2 py-1 text-[0.58rem]", i === 0 ? "bg-cyan/15 font-semibold text-ink" : "text-ink-2")}>
                  {t}
                </span>
              ))}
            </div>
            <div className="grid grid-cols-4 gap-2">
              {["Projects", "Active", "Completed", "Progress"].map((l) => (
                <Tile key={l} label={l} />
              ))}
            </div>
            <div className="flex flex-wrap gap-1">
              {["All", "Fleet and trips", "ICT", "Finance", "Stores", "HR"].map((c, i) => (
                <span key={c} className={cn("rounded-md border px-1.5 py-0.5 text-[0.55rem]", i === 0 ? "border-cyan/50 text-ink" : "border-line text-ink-2")}>
                  {c}
                </span>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-2 lg:grid-cols-3">
              {[
                ["Recruitment", "success", "Completed"],
                ["Onboarding", "cyan", "In progress"],
                ["Device installation", "cyan", "In progress"],
              ].map(([t, tone, s], i) => (
                <div key={t} className={cn("rounded-lg border border-line bg-navy-850 p-2.5", i === 2 && "hidden lg:block")}>
                  <p className="truncate text-[0.62rem] font-semibold text-ink">{t}</p>
                  <div className="mt-1.5">
                    <Pill tone={tone as "success" | "cyan"}>{s}</Pill>
                  </div>
                  <span className="mt-2 block h-1 rounded-full bg-line" />
                  <p className="mt-2 text-[0.55rem] text-muted">
                    Owner <X w="6ch" />
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    case "portal":
      return (
        <div className="space-y-3 p-4">
          <p className="font-display text-sm font-bold text-ink">Operations staff view</p>
          <div className="rounded-full border border-line bg-navy-850 px-3 py-1.5 text-[0.58rem] text-muted">Search apps, like fuel, forms or tickets</div>
          <div className="grid grid-cols-2 gap-2 lg:grid-cols-3">
            {[
              ["Operations ERP", "Trips, fuel, drivers and trucks"],
              ["Driver app", "Trip steps, fuel and deliveries"],
              ["AxleTIQ", "Maintenance and work orders"],
              ["Forms", "Checklists, requests, reports"],
              ["ProjectHub", "Projects, tasks, stand-ups"],
              ["AgentDesk", "AI assistant for operations"],
            ].map(([n, d]) => (
              <div key={n} className="flex gap-2 rounded-lg border border-line bg-navy-850 p-2.5">
                <span className="hex-clip mt-0.5 size-5 shrink-0 bg-gradient-to-b from-brand to-brand-deep opacity-80" />
                <span className="min-w-0">
                  <span className="block truncate text-[0.62rem] font-semibold text-ink">{n}</span>
                  <span className="block truncate text-[0.55rem] text-muted">{d}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      );
    case "driver":
      return (
        <div className="flex h-full items-center justify-center bg-gradient-to-b from-cyan/[0.06] to-transparent p-4">
          <div className="w-[min(240px,70%)] rounded-[26px] border-4 border-line-strong bg-navy-950 p-3 shadow-2xl">
            <p className="text-[0.55rem] text-muted">Good afternoon</p>
            <p className="font-display text-[0.8rem] font-bold text-ink">
              <X w="9ch" />
            </p>
            <p className="mt-0.5 flex items-center gap-1 text-[0.5rem] text-success">
              <span className="size-1 rounded-full bg-success" /> Active driver
            </p>
            <div className="mt-2 grid grid-cols-3 gap-1.5">
              {["Trips", "Safety", "Rating"].map((l) => (
                <div key={l} className="rounded-md border border-line bg-navy-850 p-1.5">
                  <p className="font-display text-[0.7rem] font-bold text-ink">
                    <X w="1.6ch" />
                  </p>
                  <p className="text-[0.48rem] text-muted">{l}</p>
                </div>
              ))}
            </div>
            <div className="mt-2 rounded-lg border border-line bg-navy-850 p-2">
              <div className="flex items-center justify-between">
                <p className="text-[0.58rem] font-semibold text-ink">Active trip</p>
                <Pill>In progress</Pill>
              </div>
              <p className="mt-1.5 text-[0.48rem] uppercase tracking-wide text-muted">Truck</p>
              <p className="text-[0.62rem] text-ink">
                <X w="7ch" />
              </p>
              <p className="mt-1.5 text-[0.48rem] uppercase tracking-wide text-muted">Trip route</p>
              <p className="text-[0.62rem] text-ink">
                <X w="5ch" /> › <X w="6ch" />
              </p>
            </div>
            <div className="mt-2 rounded-lg bg-gradient-to-r from-brand to-brand-deep py-1.5 text-center text-[0.6rem] font-semibold text-on-brand">
              Continue trip
            </div>
            <div className="mt-2 flex justify-between border-t border-line px-1 pt-1.5 text-[0.48rem] text-muted">
              <span className="text-cyan">Home</span>
              <span>Trips</span>
              <span>History</span>
              <span>Profile</span>
            </div>
          </div>
        </div>
      );
  }
}

export function RedactedPreview({ kind, className }: { kind: PreviewKind; className?: string }) {
  return (
    <figure
      role="img"
      aria-label={`${LABELS[kind]} interface, with client data hidden`}
      className={cn(
        "overflow-hidden rounded-2xl border border-line-strong/70 bg-navy-900 shadow-[0_30px_60px_-30px_rgb(0_0_0/0.6)]",
        className,
      )}
    >
      <div className="flex items-center justify-between border-b border-line bg-navy-950 px-3 py-2" aria-hidden>
        <span className="flex gap-1.5">
          <span className="size-2 rounded-full bg-line-strong" />
          <span className="size-2 rounded-full bg-line-strong" />
          <span className="size-2 rounded-full bg-line-strong" />
        </span>
        <span className="flex items-center gap-1 text-[0.6rem] font-medium text-muted">
          <EyeSlash size={12} /> Client data hidden
        </span>
      </div>
      <div className="aspect-[16/10]" aria-hidden>
        <Body kind={kind} />
      </div>
    </figure>
  );
}
