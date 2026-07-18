"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger once at the module level
gsap.registerPlugin(ScrollTrigger);

export default function LenisProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    /* ── 1. Disable browser scroll-restoration so the page ALWAYS
            starts at position 0 on every load and refresh.
    ──────────────────────────────────────────────────────────── */
    if (typeof window !== "undefined" && "scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);

    /* ── 2. Instantiate Lenis ────────────────────────────────── */
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    lenisRef.current = lenis;

    // Programmatically jump Lenis to 0 so its internal state matches
    lenis.scrollTo(0, { immediate: true });

    // After one frame, refresh ScrollTrigger so it recalculates all
    // trigger positions based on scroll=0 (prevents mid-page flash)
    requestAnimationFrame(() => ScrollTrigger.refresh());

    // Sync Lenis scroll position into GSAP's ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    // Capture the RAF callback so we can remove it precisely later
    const rafCallback = (time: number) => {
      lenis.raf(time * 1000);
    };

    // Hook Lenis into GSAP's ticker — this IS the RAF loop
    gsap.ticker.add(rafCallback);

    // Disable GSAP's own lag smoothing since Lenis handles timing
    gsap.ticker.lagSmoothing(0);

    // Expose the lenis instance globally for use in child components
    (window as typeof window & { lenis: Lenis }).lenis = lenis;

    return () => {
      gsap.ticker.remove(rafCallback);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <>{children}</>;
}
