"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { personal } from "@/data/resume";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const sectionRef       = useRef<HTMLElement>(null);
  const glowRef          = useRef<HTMLDivElement>(null);
  const contentRef       = useRef<HTMLDivElement>(null);
  const badgeRef         = useRef<HTMLDivElement>(null);
  const line1Ref         = useRef<HTMLSpanElement>(null);
  const line2Ref         = useRef<HTMLSpanElement>(null);
  const institutionRef   = useRef<HTMLDivElement>(null);
  const subtitleRef      = useRef<HTMLParagraphElement>(null);
  const metaRef          = useRef<HTMLDivElement>(null);
  const scrollHintRef    = useRef<HTMLDivElement>(null);
  const cursorGlowRef    = useRef<HTMLDivElement>(null);

  /* ── Cursor glow ─────────────────────────────────────────── */
  useEffect(() => {
    const el = cursorGlowRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      gsap.to(el, {
        x: e.clientX - el.offsetWidth / 2,
        y: e.clientY - el.offsetHeight / 2,
        duration: 1.2,
        ease: "power3.out",
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  /* ── GSAP entry + scroll animations ─────────────────────── */
  useEffect(() => {
    const ctx = gsap.context(() => {

      /* 1 — Entry animation */
      const tl = gsap.timeline({ delay: 0.15 });

      tl.fromTo(badgeRef.current,
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
      )
      .fromTo(
        line1Ref.current?.querySelectorAll(".wi") ?? [],
        { y: "115%", rotate: 4 },
        { y: "0%", rotate: 0, duration: 1.1, stagger: 0.07, ease: "power4.out" },
        "-=0.4"
      )
      .fromTo(
        line2Ref.current?.querySelectorAll(".wi") ?? [],
        { y: "115%", rotate: -3 },
        { y: "0%", rotate: 0, duration: 1.1, stagger: 0.07, ease: "power4.out" },
        "-=0.85"
      )
      .fromTo(
        institutionRef.current?.querySelectorAll(".inst-wi") ?? [],
        { y: "100%", opacity: 0 },
        { y: "0%", opacity: 1, duration: 0.9, stagger: 0.025, ease: "power3.out" },
        "-=0.5"
      )
      .fromTo(
        subtitleRef.current?.querySelectorAll(".wi") ?? [],
        { y: "100%" },
        { y: "0%", duration: 0.9, stagger: 0.04, ease: "power3.out" },
        "-=0.65"
      )
      .fromTo(metaRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        "-=0.5"
      )
      .fromTo(scrollHintRef.current,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" },
        "-=0.4"
      );

      /* Scroll-line pulse loop */
      gsap.to(".scroll-line", {
        scaleY: 0,
        transformOrigin: "top center",
        repeat: -1,
        duration: 1.1,
        ease: "power2.in",
        delay: 1.8,
      });

      /* 2 — Scroll-driven: pin + clip-path glow reveal */
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=220%",
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      scrollTl
        .fromTo(glowRef.current,
          { clipPath: "circle(0% at 50% 45%)" },
          { clipPath: "circle(150% at 50% 45%)", ease: "none", duration: 3 },
          0
        )
        .to(scrollHintRef.current,
          { opacity: 0, y: -20, ease: "none", duration: 0.6 },
          0
        )
        .to(contentRef.current,
          { y: -100, ease: "none", duration: 1.5 },
          0.8
        )
        .to([badgeRef.current, metaRef.current, institutionRef.current],
          { opacity: 0, ease: "none", duration: 1 },
          0.6
        )
        .to(".hero-heading",
          { scale: 1.06, ease: "none", duration: 1.2 },
          1.5
        );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  /* College name split into word spans */
  const collegeWords = "National Institute of Technology, Jalandhar".split(" ");

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative w-full h-screen flex items-center justify-center"
      style={{ background: "var(--bg-base)" }}
      aria-label="Hero section"
    >
      {/* Cursor glow */}
      <div
        ref={cursorGlowRef}
        className="pointer-events-none fixed z-[1] rounded-full"
        style={{
          width: 600, height: 600,
          background: "radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 70%)",
          top: 0, left: 0, willChange: "transform",
        }}
        aria-hidden="true"
      />

      {/* Glow layer (clip-path masked) */}
      <div
        ref={glowRef}
        className="absolute inset-0 z-0"
        style={{ clipPath: "circle(0% at 50% 45%)", willChange: "clip-path" }}
        aria-hidden="true"
      >
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 90% 70% at 50% 35%, rgba(124,58,237,0.55) 0%, transparent 65%)" }} />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 65% 55% at 20% 75%, rgba(6,182,212,0.35) 0%, transparent 60%)" }} />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 55% 45% at 80% 25%, rgba(244,114,182,0.2) 0%, transparent 55%)" }} />
        <div className="absolute inset-0" style={{ background: "radial-gradient(circle 300px at 50% 45%, rgba(167,139,250,0.25) 0%, transparent 70%)" }} />
        <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(rgba(124,58,237,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.18) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
        <div className="absolute left-0 right-0" style={{ top: "45%", height: "1px", background: "linear-gradient(90deg, transparent 0%, rgba(124,58,237,0.6) 30%, rgba(6,182,212,0.6) 70%, transparent 100%)" }} />
      </div>

      {/* Noise grain */}
      <div className="absolute inset-0 z-[2] pointer-events-none" style={{ opacity: 0.025, backgroundImage: "url('/noise.svg')", backgroundSize: "200px" }} aria-hidden="true" />

      {/* Subtle supporting layout elements (to rebalance empty areas) */}
      <div className="absolute left-10 md:left-24 top-1/3 z-[3] pointer-events-none hidden md:flex flex-col gap-6 opacity-30">
        <div className="w-16 h-px bg-white/20" />
        <div className="text-[10px] tracking-widest uppercase font-mono text-white/40">DS / ML</div>
        <div className="w-px h-16 bg-white/20" />
      </div>

      <div className="absolute right-10 md:right-24 bottom-1/3 z-[3] pointer-events-none hidden md:flex flex-col items-end gap-6 opacity-30">
        <div className="w-px h-16 bg-white/20" />
        <div className="text-[10px] tracking-widest uppercase font-mono text-white/40 text-right">Sys-Arch</div>
        <div className="w-16 h-px bg-white/20" />
      </div>

      {/* Main content */}
      <div
        ref={contentRef}
        className="relative z-10 flex flex-col items-center text-center w-full max-w-[1200px] mx-auto px-4 md:px-8 gap-4 md:gap-5"
        style={{ willChange: "transform" }}
      >
        {/* CGPA badge */}
        <div ref={badgeRef} style={{ opacity: 0 }}>
          <div
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs tracking-[0.22em] uppercase font-semibold"
            style={{
              background: "rgba(124,58,237,0.12)",
              border: "1px solid rgba(124,58,237,0.4)",
              color: "var(--accent-secondary)",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#22c55e" }} />
            CGPA 9.13 &nbsp;·&nbsp; B.Tech Data Science &nbsp;·&nbsp; 2024–2028
          </div>
        </div>

        {/* Name heading */}
        <h1
          className="hero-heading font-display font-black leading-[0.88] tracking-tight select-none text-[clamp(2.2rem,11vw,4.5rem)] md:text-[clamp(4.5rem,13.5vw,14rem)]"
          style={{
            fontFamily: "var(--font-display)",
            willChange: "transform",
          }}
          aria-label="Karanpreet Singh"
        >
          <span ref={line1Ref} className="block whitespace-nowrap" style={{ overflow: "hidden" }}>
            {"KARANPREET".split("").map((char, i) => (
              <span key={i} className="wi" style={{ display: "inline-block", color: "var(--text-primary)", transform: "translateY(115%)", letterSpacing: "-0.02em" }}>
                {char}
              </span>
            ))}
          </span>
          <span ref={line2Ref} className="block whitespace-nowrap" style={{ overflow: "hidden" }}>
            {"SINGH".split("").map((char, i) => (
              <span key={i} className="wi text-gradient" style={{ display: "inline-block", transform: "translateY(115%)", letterSpacing: "-0.02em" }}>
                {char}
              </span>
            ))}
          </span>
        </h1>

        {/* ── NIT Jalandhar — displayed with name ─────────────── */}
        <div
          ref={institutionRef}
          className="flex items-center gap-4"
          style={{ overflow: "hidden" }}
          aria-label="National Institute of Technology, Jalandhar"
        >
          <div className="h-px w-8 flex-shrink-0" style={{ background: "linear-gradient(90deg, transparent, var(--accent-primary))" }} aria-hidden="true" />
          <div style={{ overflow: "hidden", display: "flex", gap: "0.35em", flexWrap: "wrap", justifyContent: "center" }}>
            {collegeWords.map((word, i) => (
              <span
                key={i}
                className="inst-wi text-sm md:text-base font-semibold tracking-[0.15em] uppercase"
                style={{
                  display: "inline-block",
                  transform: "translateY(100%)",
                  color: "var(--accent-secondary)",
                }}
              >
                {word}
              </span>
            ))}
          </div>
          <div className="h-px w-8 flex-shrink-0" style={{ background: "linear-gradient(90deg, var(--accent-primary), transparent)" }} aria-hidden="true" />
        </div>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="font-display text-lg md:text-2xl lg:text-3xl font-medium tracking-wide"
          style={{ fontFamily: "var(--font-display)", color: "var(--text-secondary)", overflow: "hidden" }}
          aria-label="Data Scientist · ML Engineer · Builder"
        >
          {[
            { text: "Data",      color: undefined },
            { text: "Scientist", color: undefined },
            { text: "·",         color: "var(--accent-primary)" },
            { text: "ML",        color: undefined },
            { text: "Engineer",  color: undefined },
            { text: "·",         color: "var(--accent-secondary)" },
            { text: "Builder",   color: undefined },
          ].map(({ text, color }, i) => (
            <span
              key={i}
              className="wi"
              style={{
                display: "inline-block",
                transform: "translateY(100%)",
                color: color ?? "inherit",
                marginRight: text === "·" ? "0.6rem" : "0.35rem",
                marginLeft:  text === "·" ? "0.25rem" : 0,
              }}
            >
              {text}
            </span>
          ))}
        </p>

        {/* Meta info */}
        <div ref={metaRef} className="flex flex-wrap justify-center gap-x-10 gap-y-4 pt-2" style={{ opacity: 0 }}>
          {[
            { label: "Location",  value: "Punjab, India"            },
            { label: "Available", value: "Internships & Projects"   },
            { label: "Focus",     value: "AI / ML / Systems"        },
            { label: "Batch",     value: "2024 – 2028"              },
          ].map(({ label, value }) => (
            <div key={label} className="flex flex-col items-center gap-1">
              <span className="text-[10px] tracking-[0.25em] uppercase" style={{ color: "var(--text-muted)" }}>{label}</span>
              <span className="text-sm font-medium" style={{ color: "var(--text-secondary)" }}>{value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div ref={scrollHintRef} className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2" style={{ opacity: 0 }} aria-hidden="true">
        <span className="text-[10px] tracking-[0.35em] uppercase" style={{ color: "var(--text-muted)" }}>Scroll</span>
        <div className="scroll-line w-px h-14" style={{ background: "linear-gradient(to bottom, var(--accent-primary), rgba(124,58,237,0))", transformOrigin: "top center" }} />
      </div>

      {/* Corner labels */}
      <div className="absolute top-8 left-8 z-10 text-[11px] tracking-[0.25em] uppercase" style={{ color: "var(--text-muted)" }} aria-hidden="true">
        Portfolio &nbsp;/&nbsp; 2025
      </div>
      <div className="absolute top-8 right-8 z-10 flex items-center gap-2" style={{ color: "var(--text-muted)" }} aria-hidden="true">
        <span className="text-[11px] tracking-[0.25em] uppercase">Open to work</span>
        <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#22c55e" }} />
      </div>

      {/* Social links — bottom left */}
      <div className="absolute bottom-9 left-8 z-10 flex flex-col gap-3" aria-label="Social links">
        {[
          { label: "GitHub",   href: personal.github   },
          { label: "LinkedIn", href: personal.linkedin  },
        ].map(({ label, href }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] tracking-[0.2em] uppercase transition-colors duration-300"
            style={{ color: "var(--text-muted)" }}
            onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "var(--accent-secondary)")}
            onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "var(--text-muted)")}
          >
            {label}
          </a>
        ))}
      </div>

      {/* Email — bottom right */}
      <div className="absolute bottom-9 right-8 z-10">
        <a
          href={`mailto:${personal.email}`}
          className="text-[11px] tracking-[0.2em] uppercase transition-colors duration-300"
          style={{ color: "var(--text-muted)" }}
          onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "var(--accent-secondary)")}
          onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "var(--text-muted)")}
        >
          {personal.email}
        </a>
      </div>
    </section>
  );
}
