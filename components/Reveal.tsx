"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * One observer for the whole page. Any element with `data-reveal` that starts below
 * the fold is hidden, then eased in when it scrolls into view. Elements already on
 * screen are left alone, so nothing flashes and nothing is hidden without JS.
 */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const fold = window.innerHeight * 0.92;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          (entry.target as HTMLElement).dataset.reveal = "shown";
          io.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );
    for (const el of els) {
      if (el.dataset.reveal === "shown") continue;
      if (el.getBoundingClientRect().top < fold) {
        el.dataset.reveal = "shown";
        continue;
      }
      el.dataset.reveal = "pending";
      io.observe(el);
    }
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
