"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { langCards, skillGroups, dsaHighlight, interests } from "@/data/resume";

gsap.registerPlugin(ScrollTrigger);

export default function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const st = (trigger: string | Element | null, start = "top 78%") => ({
        trigger,
        start,
        toggleActions: "play none none reverse",
      });

      /* Header */
      gsap.fromTo(".sk-header > *",
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 1, ease: "power3.out", scrollTrigger: st(".sk-header") }
      );

      /* Language cards */
      gsap.fromTo(".lang-card",
        { y: 50, opacity: 0, scale: 0.93 },
        { y: 0, opacity: 1, scale: 1, stagger: 0.09, duration: 0.8, ease: "power3.out", scrollTrigger: st(".lang-grid", "top 82%") }
      );

      /* Skill chips — DS&ML */
      gsap.fromTo(".ds-chip",
        { x: -18, opacity: 0 },
        { x: 0, opacity: 1, stagger: 0.045, duration: 0.6, ease: "power2.out", scrollTrigger: st(".ds-chips-row", "top 82%") }
      );

      /* Skill chips — Backend */
      gsap.fromTo(".be-chip",
        { x: -18, opacity: 0 },
        { x: 0, opacity: 1, stagger: 0.045, duration: 0.6, ease: "power2.out", scrollTrigger: st(".be-chips-row", "top 82%") }
      );

      /* DSA banner */
      gsap.fromTo(".dsa-banner",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out", scrollTrigger: st(".dsa-banner", "top 88%") }
      );
      gsap.fromTo(".dsa-grade-box",
        { scale: 0, rotate: -10, opacity: 0 },
        { scale: 1, rotate: 0, opacity: 1, duration: 0.75, ease: "back.out(1.7)", scrollTrigger: st(".dsa-banner", "top 88%"), delay: 0.35 }
      );

      /* DSA topics */
      gsap.fromTo(".dsa-topic",
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.06, duration: 0.55, ease: "power2.out", scrollTrigger: st(".dsa-topics-row", "top 90%") }
      );

      /* Coursework list items */
      gsap.fromTo(".cw-item",
        { x: -24, opacity: 0 },
        { x: 0, opacity: 1, stagger: 0.08, duration: 0.6, ease: "power2.out", scrollTrigger: st(".coursework-list", "top 88%") }
      );

      /* Interests */
      gsap.fromTo(".interest-pill",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.09, duration: 0.6, ease: "power2.out", scrollTrigger: st(".interests-row", "top 92%") }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const ds  = skillGroups.find((g) => g.id === "datascience")!;
  const be  = skillGroups.find((g) => g.id === "backend")!;
  const cw  = skillGroups.find((g) => g.id === "coursework")!;

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative z-10 w-full"
      style={{ background: "var(--bg-base)" }}
      aria-labelledby="skills-heading"
    >
      {/* Top gradient border */}
      <div
        className="h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(124,58,237,0.4) 30%, rgba(6,182,212,0.4) 70%, transparent)" }}
        aria-hidden="true"
      />

      <div className="py-32 w-full max-w-[1200px] mx-auto px-8 relative">

        {/* ── Section header ──────────────────────────────── */}
        <div className="sk-header flex items-end justify-between mb-20">
          <div className="space-y-3">
            <p className="text-[10px] tracking-[0.4em] uppercase" style={{ color: "var(--accent-secondary)" }}>
              Technical Arsenal
            </p>
            <h2
              id="skills-heading"
              className="font-display font-black leading-none"
              style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.5rem, 6vw, 5rem)", color: "var(--text-primary)" }}
            >
              Skills
            </h2>
          </div>
          <span
            className="font-display font-black pb-1 select-none"
            style={{ fontFamily: "var(--font-display)", fontSize: "clamp(3rem, 8vw, 7rem)", color: "rgba(124,58,237,0.1)", lineHeight: 1 }}
            aria-hidden="true"
          >
            04
          </span>
        </div>

        {/* ── Languages ───────────────────────────────────── */}
        <div className="mb-48">
          <p className="text-[11px] tracking-[0.35em] uppercase mb-16" style={{ color: "var(--text-muted)" }}>
            Languages
          </p>
          <div className="lang-grid grid grid-cols-2 md:grid-cols-4 gap-10">
            {langCards.map(({ name, initial, accent }) => (
              <div
                key={name}
                className="lang-card glass rounded-[2rem] flex flex-col gap-10 cursor-default"
                style={{
                  padding: "4rem 3.5rem",
                  border: `1px solid ${accent}22`,
                  transition: "border-color 0.3s ease, transform 0.35s ease, box-shadow 0.35s ease",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget;
                  el.style.borderColor = `${accent}55`;
                  el.style.transform = "translateY(-6px)";
                  el.style.boxShadow = `0 20px 48px ${accent}18`;
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget;
                  el.style.borderColor = `${accent}22`;
                  el.style.transform = "translateY(0)";
                  el.style.boxShadow = "none";
                }}
                aria-label={name}
              >
                <span
                  className="font-display font-black"
                  style={{ fontFamily: "var(--font-display)", fontSize: "clamp(3.5rem, 6vw, 4.5rem)", lineHeight: 1, color: accent }}
                  aria-hidden="true"
                >
                  {initial}
                </span>
                <span className="text-2xl font-bold tracking-wide" style={{ color: "var(--text-secondary)" }}>
                  {name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Data Science & ML ───────────────────────────── */}
        <div className="mb-48 ds-chips-row">
          <p className="text-[11px] tracking-[0.35em] uppercase mb-16" style={{ color: "var(--text-muted)" }}>
            Data Science &amp; Machine Learning
          </p>
          <div className="flex flex-wrap gap-10">
            {ds.items.map((item) => (
              <span
                key={item}
                className="ds-chip text-2xl font-semibold tracking-wide px-14 py-7 rounded-[2rem] cursor-default"
                style={{
                  background: `${ds.accent}12`,
                  border: `1px solid ${ds.accent}30`,
                  color: "var(--text-secondary)",
                  transition: "background 0.2s ease, color 0.2s ease, border-color 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = `${ds.accent}22`;
                  el.style.color = ds.accent;
                  el.style.borderColor = `${ds.accent}55`;
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = `${ds.accent}12`;
                  el.style.color = "var(--text-secondary)";
                  el.style.borderColor = `${ds.accent}30`;
                }}
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* ── Backend & Tools ─────────────────────────────── */}
        <div className="mb-48 be-chips-row">
          <p className="text-[11px] tracking-[0.35em] uppercase mb-16" style={{ color: "var(--text-muted)" }}>
            Backend &amp; Tools
          </p>
          <div className="flex flex-wrap gap-10">
            {be.items.map((item) => (
              <span
                key={item}
                className="be-chip text-2xl font-semibold tracking-wide px-14 py-7 rounded-[2rem] cursor-default"
                style={{
                  background: `${be.accent}12`,
                  border: `1px solid ${be.accent}30`,
                  color: "var(--text-secondary)",
                  transition: "background 0.2s ease, color 0.2s ease, border-color 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = `${be.accent}22`;
                  el.style.color = be.accent;
                  el.style.borderColor = `${be.accent}55`;
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = `${be.accent}12`;
                  el.style.color = "var(--text-secondary)";
                  el.style.borderColor = `${be.accent}30`;
                }}
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* ── DSA Card — compact, balanced ────────────────── */}
        <div
          className="dsa-banner glass rounded-2xl relative overflow-hidden mb-32 max-w-4xl"
          style={{ border: "1px solid rgba(124,58,237,0.35)", padding: "1.5rem 2rem" }}
          aria-label="Data Structures and Algorithms — Grade S"
        >
          <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 65% 120% at 15% 50%, rgba(124,58,237,0.18) 0%, transparent 65%)" }} aria-hidden="true" />

          <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            {/* Left: text */}
            <div className="flex-1 space-y-3">
              <span
                className="inline-block text-[10px] tracking-[0.25em] uppercase px-3 py-1 rounded-full font-semibold"
                style={{ background: "rgba(124,58,237,0.15)", border: "1px solid rgba(124,58,237,0.4)", color: "var(--accent-secondary)" }}
              >
                Featured Expertise
              </span>

              <h3
                className="font-display font-bold leading-tight"
                style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.1rem, 2vw, 1.5rem)", color: "var(--text-primary)" }}
              >
                {dsaHighlight.title}
              </h3>

              <p className="text-xs leading-[1.6] max-w-lg" style={{ color: "var(--text-secondary)" }}>
                {dsaHighlight.description}
              </p>

              <div className="dsa-topics-row flex flex-wrap gap-2 pt-1">
                {dsaHighlight.topics.map((topic) => (
                  <span
                    key={topic}
                    className="dsa-topic text-[10px] px-2.5 py-1 rounded-md"
                    style={{ background: "rgba(124,58,237,0.1)", border: "1px solid rgba(124,58,237,0.22)", color: "var(--accent-secondary)" }}
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>

            {/* Right: Grade S — compact box */}
            <div className="dsa-grade-box flex-shrink-0 flex flex-col items-center gap-1.5">
              <div
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl flex items-center justify-center"
                style={{
                  background: "rgba(124,58,237,0.15)",
                  border: "1px solid rgba(124,58,237,0.45)",
                  boxShadow: "0 0 20px rgba(124,58,237,0.15), inset 0 0 10px rgba(124,58,237,0.05)",
                }}
              >
                <span
                  className="font-display font-black text-gradient"
                  style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.2rem, 4vw, 3rem)", lineHeight: 1 }}
                  aria-label="Grade S"
                >
                  {dsaHighlight.grade}
                </span>
              </div>
              <span className="text-[10px] tracking-[0.2em] uppercase text-center" style={{ color: "var(--text-muted)" }}>
                {dsaHighlight.gradeDescription}
              </span>
            </div>
          </div>
        </div>

        {/* ── Coursework + Interests ──────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">

          {/* Coursework — clean list format */}
          <div className="coursework-list">
            <p className="text-[11px] tracking-[0.35em] uppercase mb-16" style={{ color: "var(--text-muted)" }}>
              Coursework
            </p>
            <ul className="space-y-10">
              {cw.items.map((item, i) => (
                <li
                  key={item}
                  className="cw-item flex items-center gap-8"
                  style={{ color: "var(--text-secondary)" }}
                >
                  <span
                    className="flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center text-lg font-bold"
                    style={{ background: `${cw.accent}15`, border: `1px solid ${cw.accent}30`, color: cw.accent }}
                    aria-hidden="true"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-2xl font-semibold tracking-wide">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Interests */}
          <div className="interests-row">
            <p className="text-[11px] tracking-[0.35em] uppercase mb-16" style={{ color: "var(--text-muted)" }}>
              Interests
            </p>
            <div className="flex flex-wrap gap-6">
              {interests.map((interest) => (
                <span
                  key={interest}
                  className="interest-pill text-xl font-medium px-10 py-5 rounded-full"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "var(--text-secondary)",
                  }}
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
