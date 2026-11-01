import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import {
  ArrowRight,
  FacebookLogo,
  InstagramLogo,
  LinkedinLogo,
  TiktokLogo,
  WhatsappLogo,
  XLogo,
  YoutubeLogo,
} from "@phosphor-icons/react/dist/ssr";
import { liveSocials, site, whatsappHref, isFill } from "@/lib/site";

export function cn(...parts: (string | false | null | undefined)[]) {
  return parts.filter(Boolean).join(" ");
}

export function Container({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("mx-auto w-full max-w-[1240px] px-4 sm:px-6 lg:px-8", className)} {...props} />;
}

export function BookCallButton({ className, label = site.booking.label }: { className?: string; label?: string }) {
  return (
    <a
      href={site.booking.url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn("btn btn-primary", className)}
      data-event="book_call"
    >
      {label}
      <ArrowRight aria-hidden className="btn-arrow" size={18} weight="bold" />
      <span className="sr-only">(opens in a new tab)</span>
    </a>
  );
}

export function WhatsAppButton({ className }: { className?: string }) {
  return (
    <a
      href={whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      className={cn("btn btn-ghost", className)}
      data-event="whatsapp"
    >
      <WhatsappLogo aria-hidden size={19} weight="regular" />
      {site.whatsapp.label}
      <span className="sr-only">(opens in a new tab)</span>
    </a>
  );
}

export function TextLink({ href, children, className }: { href: string; children: ReactNode; className?: string }) {
  return (
    <Link
      href={href}
      className={cn("group inline-flex items-center gap-1.5 font-display text-sm font-semibold text-cyan", className)}
    >
      <span className="link-underline">{children}</span>
      <ArrowRight aria-hidden size={15} weight="bold" className="transition-transform duration-300 group-hover:translate-x-0.5" />
    </Link>
  );
}

/** Renders a fact, or a highlighted [FILL] placeholder when the fact is not known yet. */
export function Fact({ value }: { value: string }) {
  return isFill(value) ? <span className="fill">{value}</span> : <>{value}</>;
}

/** Small hexagon used as the bullet / marker motif. */
export function HexMark({ className, filled }: { className?: string; filled?: boolean }) {
  return (
    <svg viewBox="0 0 24 28" aria-hidden className={cn("h-4 w-[14px] shrink-0", className)}>
      <path
        d="M12 1.5 22.5 7.5v13L12 26.5 1.5 20.5v-13z"
        fill={filled ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Thin divider with a hexagon at its centre. */
export function HexDivider({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("flex items-center gap-4 text-line-strong", className)}>
      <span className="h-px flex-1 bg-gradient-to-r from-transparent to-line-strong" />
      <HexMark className="text-cyan/70" />
      <span className="h-px flex-1 bg-gradient-to-l from-transparent to-line-strong" />
    </div>
  );
}

export function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      // JSON-LD is built from our own static content, not user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

export function Breadcrumbs({ items }: { items: { name: string; path: string }[] }) {
  const all = [{ name: "Home", path: "/" }, ...items];
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-muted">
      <ol className="flex flex-wrap items-center gap-2">
        {all.map((item, i) => (
          <li key={item.path} className="flex items-center gap-2">
            {i > 0 && <span aria-hidden className="text-faint">/</span>}
            {i === all.length - 1 ? (
              <span aria-current="page" className="text-ink-2">
                {item.name}
              </span>
            ) : (
              <Link href={item.path} className="hover:text-ink">
                {item.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

const SOCIAL_ICONS = {
  Instagram: InstagramLogo,
  LinkedIn: LinkedinLogo,
  X: XLogo,
  Facebook: FacebookLogo,
  YouTube: YoutubeLogo,
  TikTok: TiktokLogo,
} as const;

/** Row of brand icons linking to every live @sastechconsults profile. */
export function SocialLinks({ className }: { className?: string }) {
  return (
    <ul className={cn("flex flex-wrap gap-2", className)} aria-label={`Sastech on social media (${site.handle})`}>
      {liveSocials.map((s) => {
        const Icon = SOCIAL_ICONS[s.label];
        return (
          <li key={s.label}>
            <a
              href={s.href}
              target="_blank"
              rel="noopener noreferrer me"
              aria-label={`${s.label} (${site.handle})`}
              title={`${s.label}: ${site.handle}`}
              className="flex size-10 items-center justify-center rounded-full border border-line-strong text-ink-2 transition-colors hover:border-cyan hover:text-cyan"
            >
              <Icon size={19} weight="fill" aria-hidden />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
