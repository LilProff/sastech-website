"use client";

import { useEffect, useRef, useState } from "react";
import type { SceneHandle } from "./scene";

type NavigatorHints = Navigator & {
  deviceMemory?: number;
  connection?: { saveData?: boolean; effectiveType?: string };
};

/** Decide whether this device should get the WebGL hero at all. */
function canRun3D() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  // Phones and touch devices get the animated static hero: WebGL on a mid-range
  // Android costs too much battery and main-thread time for a decorative scene.
  if (!window.matchMedia("(min-width: 768px) and (pointer: fine)").matches) return false;
  const nav = navigator as NavigatorHints;
  if (nav.connection?.saveData) return false;
  if (nav.connection?.effectiveType && /(^|-)2g$/.test(nav.connection.effectiveType)) return false;
  if ((nav.hardwareConcurrency ?? 4) < 4) return false;
  if (nav.deviceMemory !== undefined && nav.deviceMemory < 4) return false;
  return true;
}

/**
 * Mounts the three.js scene after the page has loaded and gone idle.
 * Until then (and forever on low-power devices) the static SVG fallback shows.
 */
export function HeroCanvas({ fallback }: { fallback: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!canRun3D()) return;
    let handle: SceneHandle | undefined;
    let cancelled = false;
    let idleId: number | undefined;
    let timer: ReturnType<typeof setTimeout> | undefined;

    let slow = false;
    let themeObserver: MutationObserver | undefined;

    const start = () => {
      import("./scene")
        .then(({ createHeroScene }) => {
          if (cancelled || !ref.current) return;
          const container = ref.current;
          const mount = () => {
            handle = createHeroScene(container, {
              lite: window.matchMedia("(max-width: 1023px)").matches,
              light: document.documentElement.dataset.theme === "light",
              onSlow: () => {
                // Frames are too slow on this machine: go back to the static hero.
                slow = true;
                setReady(false);
                setTimeout(() => handle?.dispose(), 1400);
              },
            });
          };
          mount();
          requestAnimationFrame(() => setReady(true));
          // Rebuild with the right colours when the visitor switches theme.
          themeObserver = new MutationObserver(() => {
            if (slow || cancelled) return;
            handle?.dispose();
            mount();
          });
          themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
        })
        .catch(() => {
          // No WebGL or chunk failed: the static fallback stays.
        });
    };

    const schedule = () => {
      const ric = window.requestIdleCallback;
      if (ric) idleId = ric(start, { timeout: 1500 });
      else timer = setTimeout(start, 300);
    };

    // Load the scene on the visitor's first interaction, so page load stays fast.
    // Desktop visitors move the mouse almost immediately; the animated fallback covers the gap.
    const triggers = ["pointermove", "wheel", "keydown", "touchstart"] as const;
    const onFirstInteraction = () => {
      triggers.forEach((t) => window.removeEventListener(t, onFirstInteraction));
      if (document.readyState === "complete") schedule();
      else window.addEventListener("load", schedule, { once: true });
    };
    triggers.forEach((t) => window.addEventListener(t, onFirstInteraction, { once: true, passive: true }));

    return () => {
      cancelled = true;
      triggers.forEach((t) => window.removeEventListener(t, onFirstInteraction));
      window.removeEventListener("load", schedule);
      if (idleId !== undefined) window.cancelIdleCallback?.(idleId);
      if (timer) clearTimeout(timer);
      themeObserver?.disconnect();
      handle?.dispose();
    };
  }, []);

  return (
    <div data-ready={ready} className="group/hero absolute inset-0">
      <div className="absolute inset-0 transition-opacity duration-[1200ms] ease-out group-data-[ready=true]/hero:opacity-0">
        {fallback}
      </div>
      <div
        ref={ref}
        className="absolute inset-0 opacity-0 transition-opacity duration-[1400ms] ease-out group-data-[ready=true]/hero:opacity-100"
      />
    </div>
  );
}
