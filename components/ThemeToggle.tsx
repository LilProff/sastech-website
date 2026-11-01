"use client";

import { Moon, Sun } from "@phosphor-icons/react";
import { cn } from "./ui";
import { THEME_COLORS } from "@/lib/theme";

export function ThemeToggle({ className }: { className?: string }) {
  function toggle() {
    const root = document.documentElement;
    const next = root.dataset.theme === "light" ? "dark" : "light";
    root.classList.add("theme-transition");
    root.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      // Private mode: the choice just won't persist.
    }
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", THEME_COLORS[next]);
    window.setTimeout(() => root.classList.remove("theme-transition"), 400);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Switch between light and dark theme"
      title="Switch theme"
      className={cn(
        "inline-flex size-12 shrink-0 items-center justify-center rounded-full border border-line-strong text-ink transition-colors hover:border-cyan hover:text-cyan",
        className,
      )}
    >
      <Sun size={20} aria-hidden className="theme-icon-sun" />
      <Moon size={20} aria-hidden className="theme-icon-moon" />
    </button>
  );
}
