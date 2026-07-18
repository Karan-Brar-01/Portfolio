"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

const NAV_ITEMS = [
  { id: "hero",     label: "Home"     },
  { id: "projects", label: "Projects" },
  { id: "skills",   label: "Skills"   },
  { id: "about",    label: "About"    },
  { id: "contact",  label: "Contact"  },
] as const;

type SectionId = (typeof NAV_ITEMS)[number]["id"];

/* ─────────────────────────────────────────────────────────────
   FLOATING NAVBAR
   — hidden until user scrolls 80px past the top
   — active section tracked via IntersectionObserver
   — click → Lenis scrollTo for buttery-smooth anchor jump
───────────────────────────────────────────────────────────── */
export default function Navbar() {
  const navRef                          = useRef<HTMLElement>(null);
  const [active, setActive]             = useState<SectionId>("hero");
  const [hovered, setHovered]           = useState<SectionId | null>(null);

  /* ── Show / hide on scroll ───────────────────────────────── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(navRef.current, { y: -90, opacity: 0 });

      ScrollTrigger.create({
        start: "80px top",
        onEnter: () =>
          gsap.to(navRef.current, {
            y: 0,
            opacity: 1,
            duration: 0.55,
            ease: "power3.out",
          }),
        onLeaveBack: () =>
          gsap.to(navRef.current, {
            y: -90,
            opacity: 0,
            duration: 0.4,
            ease: "power3.in",
          }),
      });
    });

    return () => ctx.revert();
  }, []);

  /* ── Active section detection via IntersectionObserver ───── */
  useEffect(() => {
    const observers = NAV_ITEMS.map(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return null;

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        // Consider a section "active" when it occupies the middle 40% of the viewport
        { threshold: 0, rootMargin: "-30% 0px -60% 0px" }
      );
      obs.observe(el);
      return obs;
    });

    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  /* ── Smooth scroll on click ──────────────────────────────── */
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;

    const lenis = (window as typeof window & { lenis?: Lenis }).lenis;
    if (lenis) {
      lenis.scrollTo(el, {
        offset: 0,
        duration: 1.6,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    } else {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      ref={navRef}
      id="main-nav"
      className="fixed top-5 left-0 right-0 flex justify-center z-50 pointer-events-none"
      aria-label="Main navigation"
    >
      <div
        className="pointer-events-auto flex items-center gap-0.5 px-2 py-1.5 rounded-full"
        style={{
          background: "rgba(10, 10, 16, 0.88)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border: "1px solid rgba(124,58,237,0.22)",
          boxShadow:
            "0 8px 32px rgba(0,0,0,0.45), 0 0 0 1px rgba(124,58,237,0.07), inset 0 1px 0 rgba(255,255,255,0.04)",
        }}
        role="menubar"
      >
        {/* ── Logo mark ───────────────────────────────────── */}
        <button
          id="nav-logo"
          onClick={() => scrollTo("hero")}
          className="px-3.5 py-1.5 rounded-full text-sm font-black tracking-widest transition-colors duration-200"
          style={{
            fontFamily: "var(--font-display)",
            color: "var(--text-primary)",
          }}
          aria-label="Scroll to top"
          role="menuitem"
        >
          KS
        </button>

        {/* ── Divider ─────────────────────────────────────── */}
        <div
          className="w-px h-4 mx-1 flex-shrink-0"
          style={{ background: "rgba(255,255,255,0.07)" }}
          aria-hidden="true"
        />

        {/* ── Nav links ───────────────────────────────────── */}
        {NAV_ITEMS.map(({ id, label }) => {
          const isActive  = active === id;
          const isHovered = hovered === id;

          return (
            <button
              key={id}
              id={`nav-${id}`}
              onClick={() => scrollTo(id)}
              onMouseEnter={() => setHovered(id)}
              onMouseLeave={() => setHovered(null)}
              className="relative px-3.5 py-1.5 rounded-full text-[11px] tracking-[0.15em] uppercase transition-all duration-200"
              style={{
                color: isActive
                  ? "var(--text-primary)"
                  : isHovered
                  ? "var(--text-secondary)"
                  : "var(--text-muted)",
                background: isActive
                  ? "rgba(124,58,237,0.18)"
                  : isHovered
                  ? "rgba(255,255,255,0.04)"
                  : "transparent",
                fontWeight: isActive ? 600 : 400,
              }}
              role="menuitem"
              aria-current={isActive ? "page" : undefined}
            >
              {label}
              {/* Active indicator dot */}
              {isActive && (
                <span
                  className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                  style={{ background: "var(--accent-secondary)" }}
                  aria-hidden="true"
                />
              )}
            </button>
          );
        })}

        {/* ── Divider ─────────────────────────────────────── */}
        <div
          className="w-px h-4 mx-1 flex-shrink-0"
          style={{ background: "rgba(255,255,255,0.07)" }}
          aria-hidden="true"
        />

        {/* ── Hire Me CTA ─────────────────────────────────── */}
        <a
          href="mailto:karanpreets.ds.24@nitj.ac.in"
          id="nav-hire-cta"
          className="px-4 py-1.5 rounded-full text-[11px] tracking-[0.15em] uppercase font-semibold transition-all duration-200"
          style={{
            background:
              "linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))",
            color: "#fff",
            boxShadow: "0 0 16px rgba(124,58,237,0.25)",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.boxShadow =
              "0 0 28px rgba(124,58,237,0.5)";
            (e.currentTarget as HTMLElement).style.transform = "scale(1.04)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.boxShadow =
              "0 0 16px rgba(124,58,237,0.25)";
            (e.currentTarget as HTMLElement).style.transform = "scale(1)";
          }}
          role="menuitem"
          aria-label="Send a hire request email"
        >
          Hire Me
        </a>
      </div>
    </nav>
  );
}
