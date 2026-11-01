"use client";

// Live UI mockups for the three pillars. They are small working components (not
// screenshots) that animate only while on screen. Under reduced motion they render
// their final state. All names and items are sample data, labelled as such.

import { useEffect, useRef, useState } from "react";
import { CheckCircle, MagnifyingGlass, Robot, Checks } from "@phosphor-icons/react";
import { cn } from "../ui";

function useLoop(steps: number, interval: number) {
  const ref = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setReduced(true);
      setStep(steps - 1);
      return;
    }
    let timer: ReturnType<typeof setInterval> | undefined;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !timer) {
        timer = setInterval(() => setStep((s) => (s + 1) % steps), interval);
      } else if (!entry.isIntersecting && timer) {
        clearInterval(timer);
        timer = undefined;
      }
    });
    if (ref.current) io.observe(ref.current);
    return () => {
      io.disconnect();
      if (timer) clearInterval(timer);
    };
  }, [steps, interval]);

  return { ref, step, reduced };
}

function Frame({ title, icon, children, className }: { title: string; icon: React.ReactNode; children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-line-strong/70 bg-navy-950/80 shadow-[0_30px_60px_-30px_rgb(0_0_0/0.9)]",
        className,
      )}
    >
      <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
        <div className="flex items-center gap-2 text-[0.8rem] font-medium text-ink-2">
          {icon}
          {title}
        </div>
        <span className="text-[0.68rem] uppercase tracking-wider text-muted">Sample</span>
      </div>
      {children}
    </div>
  );
}

/* ---------------- Search result climbing to the top ---------------- */

const QUERY = "website design lagos";
const OTHERS = [
  { site: "directory-listing.ng", title: "Web designers near Lekki and Ikeja" },
  { site: "another-agency.com", title: "Website packages for small business" },
];

export function SearchMock() {
  // 0..19 typing, 20 results in, 22 your site rises to first.
  const total = QUERY.length + 10;
  const { ref, step } = useLoop(total, 140);
  const typed = QUERY.slice(0, Math.min(step, QUERY.length));
  const showResults = true;
  const risen = step >= QUERY.length + 2;

  const yours = { site: "yourbusiness.com.ng", title: "Your Business | Website design in Lagos", yours: true };
  const rows = risen ? [yours, ...OTHERS] : [...OTHERS, yours];

  return (
    <div ref={ref}>
      <Frame title="Search" icon={<MagnifyingGlass size={15} />}>
        <div className="p-4">
          <div className="flex items-center gap-2 rounded-full border border-line-strong bg-navy-800/70 px-4 py-2.5 text-sm">
            <MagnifyingGlass size={15} className="text-muted" aria-hidden />
            <span className="text-ink">{typed}</span>
            <span className="caret -ml-1 h-4 w-px bg-cyan" />
          </div>
          <ol className="relative mt-4 grid gap-2.5" aria-label="Sample search results">
            {rows.map((r, i) => (
              <li
                key={r.site}
                className={cn(
                  "rounded-xl border px-3.5 py-3 transition-all duration-700 ease-[var(--ease-out-expo)]",
                  showResults ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0",
                  "yours" in r
                    ? "border-cyan/50 bg-cyan/[0.07] shadow-[0_0_0_1px_rgb(3_212_238/0.15)]"
                    : "border-line bg-navy-850/60",
                )}
                style={{ transitionDelay: showResults ? `${i * 70}ms` : "0ms" }}
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="truncate text-xs text-muted">{r.site}</span>
                  {"yours" in r && (
                    <span className="shrink-0 rounded-full bg-cyan/15 px-2 py-0.5 text-[0.65rem] font-semibold text-cyan">
                      #{risen ? 1 : 3}
                    </span>
                  )}
                </div>
                <p className={cn("mt-1 truncate text-sm font-medium", "yours" in r ? "text-cyan" : "text-ink-2")}>
                  {r.title}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </Frame>
    </div>
  );
}

/* ---------------- Order board with live statuses ---------------- */

const STATUSES = ["New", "Packed", "Out for delivery", "Delivered"] as const;
const ORDERS = [
  { id: "1042", who: "Chidinma O.", item: "2 phone cases", area: "Lekki" },
  { id: "1043", who: "Tunde A.", item: "Laptop charger", area: "Yaba" },
  { id: "1044", who: "Aisha B.", item: "Smart watch", area: "Ikeja" },
  { id: "1045", who: "Emeka N.", item: "Earbuds", area: "Surulere" },
];

function statusClass(s: (typeof STATUSES)[number]) {
  switch (s) {
    case "New":
      return "border-cyan/60 text-cyan";
    case "Packed":
      return "border-line-strong text-ink-2";
    case "Out for delivery":
      return "border-cyan/40 bg-cyan/10 text-cyan";
    case "Delivered":
      return "border-success/40 bg-success/10 text-success";
  }
}

export function OrdersMock() {
  const { ref, step } = useLoop(12, 1100);
  // Each order advances at a staggered pace so the board feels alive.
  const statusOf = (i: number) => STATUSES[Math.max(0, Math.min(3, Math.floor((step + (3 - i) * 2) / 3) % 4))];
  const delivered = ORDERS.filter((_, i) => statusOf(i) === "Delivered").length;

  return (
    <div ref={ref}>
      <Frame title="Today's orders" icon={<Checks size={15} />}>
        <div className="grid grid-cols-3 gap-2 border-b border-line px-4 py-3 text-center">
          {[
            { k: "Orders", v: ORDERS.length },
            { k: "On the road", v: ORDERS.filter((_, i) => statusOf(i) === "Out for delivery").length },
            { k: "Delivered", v: delivered },
          ].map((s) => (
            <div key={s.k}>
              <p className="font-display text-lg font-semibold tabular-nums text-ink">{s.v}</p>
              <p className="text-[0.68rem] text-muted">{s.k}</p>
            </div>
          ))}
        </div>
        <ul className="divide-y divide-line/70" aria-label="Sample orders">
          {ORDERS.map((o, i) => {
            const s = statusOf(i);
            return (
              <li key={o.id} className="flex items-center justify-between gap-3 px-4 py-2.5">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-ink">
                    #{o.id} <span className="text-ink-2">{o.who}</span>
                  </p>
                  <p className="truncate text-xs text-muted">
                    {o.item}, {o.area}
                  </p>
                </div>
                <span
                  className={cn(
                    "inline-flex shrink-0 items-center gap-1 rounded-full border px-2.5 py-1 text-[0.7rem] font-semibold transition-colors duration-500",
                    statusClass(s),
                  )}
                >
                  {s === "Delivered" && <CheckCircle size={12} weight="fill" aria-hidden />}
                  {s}
                </span>
              </li>
            );
          })}
        </ul>
      </Frame>
    </div>
  );
}

/* ---------------- WhatsApp-style auto-reply ---------------- */

const CHAT = [
  { from: "them", text: "Good afternoon. How much is the iPhone 13, 128GB?" },
  { from: "bot", text: "Hi! It's in stock. I've sent today's price list. Delivery or pickup?" },
  { from: "them", text: "Delivery to Lekki please" },
  { from: "bot", text: "Done. Your order is logged and a sales rep will confirm shortly." },
] as const;

export function ChatMock() {
  // Steps: show msg0, typing, msg1, msg2, typing, msg3, hold, hold.
  const { ref, step, reduced } = useLoop(9, 1300);
  const visible = reduced ? 4 : [1, 1, 2, 3, 3, 4, 4, 4, 4][step];
  const typing = !reduced && (step === 1 || step === 4);

  return (
    <div ref={ref}>
      <Frame title="Auto-reply" icon={<Robot size={15} />}>
        <div className="flex min-h-[228px] flex-col justify-end gap-2 bg-[radial-gradient(circle_at_30%_0%,rgb(3_212_238/0.06),transparent_60%)] p-4" aria-live="off">
          {CHAT.slice(0, visible).map((m, i) => (
            <div
              key={i}
              className={cn(
                "max-w-[84%] rounded-2xl px-3.5 py-2 text-[0.82rem] leading-snug anim-rise",
                m.from === "them"
                  ? "self-start rounded-bl-md bg-navy-800 text-ink"
                  : "self-end rounded-br-md bg-cyan/15 text-ink ring-1 ring-cyan/25",
              )}
            >
              {m.text}
              {m.from === "bot" && (
                <span className="mt-1 flex items-center justify-end gap-1 text-[0.62rem] text-cyan/80">
                  Auto-reply <Checks size={11} aria-hidden />
                </span>
              )}
            </div>
          ))}
          {typing && (
            <div className="flex gap-1 self-end rounded-2xl rounded-br-md bg-cyan/10 px-3.5 py-3" aria-hidden>
              {[0, 1, 2].map((d) => (
                <span key={d} className="size-1.5 animate-bounce rounded-full bg-cyan" style={{ animationDelay: `${d * 120}ms` }} />
              ))}
            </div>
          )}
        </div>
      </Frame>
    </div>
  );
}

export function PillarMockup({ kind }: { kind: "search" | "orders" | "chat" }) {
  if (kind === "search") return <SearchMock />;
  if (kind === "orders") return <OrdersMock />;
  return <ChatMock />;
}
