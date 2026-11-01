import Link from "next/link";
import { cn } from "./ui";
import { MARK_OUTER, MARK_S_BOTTOM, MARK_S_TOP } from "@/lib/mark";

/** The hexagon S mark, inlined so it costs no request. Paths from docs/brand/sastech-mark.svg. */
export function Mark({ className, title }: { className?: string; title?: string }) {
  return (
    <svg
      viewBox="792 621 414 492"
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      <defs>
        <linearGradient id="sastech-mark-g" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#03D4EE" />
          <stop offset="1" stopColor="#01B7CC" />
        </linearGradient>
      </defs>
      <g transform="translate(0,2000) scale(0.1,-0.1)" fill="url(#sastech-mark-g)">
        <path d={MARK_OUTER} />
        <path d={MARK_S_TOP} />
        <path d={MARK_S_BOTTOM} />
      </g>
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("group inline-flex items-center gap-2.5", className)}>
      <Mark className="h-9 w-auto transition-transform duration-500 group-hover:rotate-[60deg]" />
      <span className="flex flex-col leading-none">
        <span className="font-display text-[1.15rem] font-bold tracking-tight text-ink">Sastech</span>
        <span className="mt-1 font-display text-[0.6rem] font-semibold tracking-[0.32em] text-cyan">CONSULTS</span>
        <span className="sr-only">, home</span>
      </span>
    </Link>
  );
}

