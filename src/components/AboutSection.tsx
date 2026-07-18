"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { personal, education, experience } from "@/data/resume";

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    /* All DOM-scoped scroll animations inside context */
    const ctx = gsap.context(() => {
      const st = (trigger: string, start = "top 78%") => ({
        trigger,
        start,
        toggleActions: "play none none reverse",
      });

      gsap.fromTo(".ab-header > *",
        { y: 55, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 1, ease: "power3.out", scrollTrigger: st(".ab-header") }
      );
      gsap.fromTo(".ab-bio",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: "power3.out", scrollTrigger: st(".ab-bio", "top 82%") }
      );
      gsap.fromTo(".timeline-item",
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, stagger: 0.18, duration: 0.85, ease: "power3.out", scrollTrigger: st(".edu-timeline", "top 82%") }
      );
      gsap.fromTo(".exp-card",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: "power3.out", scrollTrigger: st(".exp-card", "top 85%") }
      );
    }, sectionRef);

    /* ── Stat counters via IntersectionObserver ──────────────────
       IntersectionObserver is more reliable here than GSAP
       ScrollTrigger because ScrollTrigger's position calculations
       can be offset by pinned sections above. The observer fires
       exactly once (once:true pattern) with a smooth GSAP count-up.
    ─────────────────────────────────────────────────────────── */
    const statEls = sectionRef.current?.querySelectorAll<HTMLElement>(".stat-value");
    const observers: IntersectionObserver[] = [];

    statEls?.forEach((el) => {
      const target   = parseFloat(el.dataset.target ?? "0");
      const decimals = (el.dataset.target ?? "0").split(".")[1]?.length ?? 0;
      let   fired    = false;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !fired) {
            fired = true;
            observer.disconnect();

            // Count-up tween on a plain proxy object
            const proxy = { val: 0 };
            gsap.to(proxy, {
              val: target,
              duration: 2.2,
              ease: "power3.out",
              onUpdate() {
                el.textContent = proxy.val.toFixed(decimals);
              },
              onComplete() {
                // Ensure exact final value with no floating-point drift
                el.textContent = target.toFixed(decimals);
              },
            });
          }
        },
        { threshold: 0.5 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      ctx.revert();
      observers.forEach((o) => o.disconnect());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative z-10 w-full"
      style={{ background: "var(--bg-base)" }}
      aria-labelledby="about-heading"
    >
      {/* Top gradient border */}
      <div
        className="h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(6,182,212,0.4) 30%, rgba(124,58,237,0.4) 70%, transparent)" }}
        aria-hidden="true"
      />

      <div className="py-32 w-full max-w-[1200px] mx-auto px-8 relative">

        {/* ── Header ────────────────────────────────────── */}
        <div className="ab-header flex items-end justify-between mb-20">
          <div className="space-y-3">
            <p className="text-[10px] tracking-[0.4em] uppercase" style={{ color: "var(--accent-secondary)" }}>
              Background
            </p>
            <h2
              id="about-heading"
              className="font-display font-black leading-none"
              style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.5rem, 6vw, 5rem)", color: "var(--text-primary)" }}
            >
              About
            </h2>
          </div>
          <span
            className="font-display font-black pb-1 select-none"
            style={{ fontFamily: "var(--font-display)", fontSize: "clamp(3rem, 8vw, 7rem)", color: "rgba(6,182,212,0.1)", lineHeight: 1 }}
            aria-hidden="true"
          >
            05
          </span>
        </div>

        {/* ── Bio ───────────────────────────────────────── */}
        <p
          className="ab-bio text-xl leading-[1.9] max-w-3xl mb-24"
          style={{ color: "var(--text-secondary)" }}
        >
          {personal.bio}
        </p>



        {/* ── Two columns: Education + Experience ───────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* Education timeline */}
          <div>
            <p className="text-[11px] tracking-[0.35em] uppercase mb-10" style={{ color: "var(--text-muted)" }}>
              Education
            </p>

            <div className="edu-timeline relative">
              {/* Vertical rail */}
              <div
                className="absolute top-3 bottom-3 w-px"
                style={{ left: "7px", background: "rgba(124,58,237,0.2)" }}
                aria-hidden="true"
              />

              <div className="space-y-0">
                {education.map((edu) => (
                  <div key={edu.id} className="timeline-item relative pb-10 last:pb-0" style={{ paddingLeft: "3rem" }}>
                    {/* Dot */}
                    <div
                      className="absolute top-2 w-3.5 h-3.5 rounded-full border-2"
                      style={{
                        left: 0,
                        background: edu.current ? "var(--accent-primary)" : "var(--bg-base)",
                        borderColor: edu.current ? "var(--accent-primary)" : "rgba(124,58,237,0.4)",
                        boxShadow: edu.current ? "0 0 12px rgba(124,58,237,0.5)" : "none",
                      }}
                      aria-hidden="true"
                    />

                    <div
                      className="glass rounded-2xl relative z-10"
                      style={{ border: "1px solid rgba(124,58,237,0.12)", padding: "1.5rem 1.75rem" }}
                    >
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div className="space-y-1">
                          <p className="text-base font-semibold" style={{ color: "var(--text-primary)" }}>
                            {edu.institution}
                          </p>
                          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                            {edu.degree}
                          </p>
                        </div>
                        {edu.current && (
                          <span
                            className="flex-shrink-0 text-[9px] tracking-widest uppercase px-2.5 py-1 rounded-full"
                            style={{ background: "rgba(34,197,94,0.12)", border: "1px solid rgba(34,197,94,0.3)", color: "#22c55e" }}
                          >
                            Current
                          </span>
                        )}
                      </div>
                      <div className="flex items-center justify-between pt-6 mt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                        <span className="text-sm font-medium" style={{ color: "var(--text-muted)" }}>{edu.period}</span>
                        <div className="flex items-baseline gap-2" aria-label={`${edu.scoreLabel}: ${edu.score}${edu.scoreUnit}`}>
                          <span className="text-xs tracking-[0.2em] uppercase mr-3 font-semibold" style={{ color: "var(--text-muted)" }}>
                            {edu.scoreLabel}
                          </span>
                          <span
                            className="stat-value font-display font-black text-gradient"
                            style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)", lineHeight: 1 }}
                            data-target={edu.score}
                          >
                            0
                          </span>
                          <span className="text-base font-medium" style={{ color: "var(--text-muted)" }}>{edu.scoreUnit}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Experience */}
          <div>
            <p className="text-[11px] tracking-[0.35em] uppercase mb-10" style={{ color: "var(--text-muted)" }}>
              Experience
            </p>

            {experience.map((exp) => (
              <div
                key={exp.id}
                className="exp-card glass rounded-2xl relative overflow-hidden"
                style={{ border: `1px solid ${exp.accent}22`, padding: "2rem 2.25rem" }}
              >
                {/* Glow */}
                <div
                  className="absolute top-0 right-0 w-56 h-56 pointer-events-none"
                  style={{ background: `radial-gradient(circle, ${exp.accent}10 0%, transparent 70%)` }}
                  aria-hidden="true"
                />

                {/* Header */}
                <div className="relative z-10 flex items-start justify-between gap-4 mb-4">
                  <div>
                    <p className="font-display font-bold text-xl mb-1" style={{ fontFamily: "var(--font-display)", color: "var(--text-primary)" }}>
                      {exp.role}
                    </p>
                    <p className="text-base font-medium" style={{ color: exp.accent }}>
                      {exp.company}
                    </p>
                  </div>
                  {exp.current && (
                    <span
                      className="flex items-center gap-1.5 text-[9px] tracking-widest uppercase px-2.5 py-1.5 rounded-full flex-shrink-0"
                      style={{ background: "rgba(34,197,94,0.12)", border: "1px solid rgba(34,197,94,0.3)", color: "#22c55e" }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" aria-hidden="true" />
                      Active
                    </span>
                  )}
                </div>

                {/* Meta */}
                <div
                  className="relative z-10 text-xs tracking-wider flex items-center gap-4 mb-6"
                  style={{ color: "var(--text-muted)", paddingBottom: "1.25rem", borderBottom: `1px solid ${exp.accent}12` }}
                >
                  <span>{exp.period}</span>
                  <span aria-hidden="true">·</span>
                  <span>{exp.location}</span>
                </div>

                {/* Bullets */}
                <ul className="relative z-10 space-y-4">
                  {exp.bullets.map((bullet, i) => (
                    <li key={i} className="flex gap-3.5 text-sm leading-[1.75]" style={{ color: "var(--text-secondary)" }}>
                      <span className="flex-shrink-0 mt-1 text-xs" style={{ color: exp.accent }} aria-hidden="true">▸</span>
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
