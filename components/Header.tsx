"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { List, X } from "@phosphor-icons/react";
import { ThemeToggle } from "./ThemeToggle";
import { Logo } from "./Logo";
import { cn } from "./ui";
import { nav, site, whatsappHref } from "@/lib/site";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  // Close the menu whenever the route changes.
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    panelRef.current?.querySelector<HTMLElement>("a")?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="fixed inset-x-0 top-0 z-40 px-3 pt-3 sm:px-5 sm:pt-4">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-brand focus:px-4 focus:py-2 focus:text-on-brand"
      >
        Skip to content
      </a>
      <div className="mx-auto flex h-16 max-w-[1240px] items-center justify-between gap-4 rounded-full border border-line/80 bg-navy-900/70 py-2 pl-4 pr-2 shadow-[0_10px_40px_-20px_rgb(0_0_0/0.8)] backdrop-blur-xl sm:pl-5">
        <Logo />

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={cn(
                    "rounded-full px-4 py-2 text-[0.92rem] font-medium transition-colors",
                    isActive(item.href) ? "bg-navy-800 text-ink" : "text-ink-2 hover:text-ink",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a
            href={site.booking.url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary hidden !py-3 sm:inline-flex lg:hidden xl:inline-flex"
            data-event="book_call"
          >
            {site.booking.label}
          </a>
          <button
            type="button"
            className="inline-flex size-12 items-center justify-center rounded-full border border-line-strong text-ink lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={22} /> : <List size={22} />}
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        ref={panelRef}
        hidden={!open}
        className="mx-auto mt-2 max-w-[1240px] rounded-[var(--radius-card)] border border-line bg-navy-900/95 p-3 backdrop-blur-xl lg:hidden"
      >
        <nav aria-label="Mobile">
          <ul className="grid">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className="flex items-center justify-between rounded-2xl px-4 py-3.5 font-display text-lg font-semibold text-ink hover:bg-navy-800"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-3 grid gap-2 border-t border-line p-2 pt-4">
          <a href={site.booking.url} target="_blank" rel="noopener noreferrer" className="btn btn-primary w-full">
            {site.booking.label}
          </a>
          <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="btn btn-ghost w-full">
            {site.whatsapp.label}
          </a>
        </div>
      </div>
    </header>
  );
}
