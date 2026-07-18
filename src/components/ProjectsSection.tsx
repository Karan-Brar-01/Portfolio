"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects as PROJECTS } from "@/data/resume";

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────────────────────────────────────────
   PROJECTS SECTION
───────────────────────────────────────────────────────────── */
export default function ProjectsSection() {
  const sectionRef    = useRef<HTMLElement>(null);
  const trackRef      = useRef<HTMLDivElement>(null);
  const progressRef   = useRef<HTMLDivElement>(null);
  const counterRef    = useRef<HTMLSpanElement>(null);
  const headerRef     = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const track   = trackRef.current!;
      const section = sectionRef.current!;

      /* ── Section header entrance ────────────────────────── */
      gsap.fromTo(
        Array.from(headerRef.current?.children ?? []),
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );

      /* ── Horizontal scroll (pin + scrub) ────────────────── */
      const getScrollAmount = () =>
        -(track.scrollWidth - window.innerWidth);

      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${Math.abs(getScrollAmount()) + 100}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate(self) {
            /* progress bar */
            if (progressRef.current) {
              progressRef.current.style.transform = `scaleX(${self.progress})`;
            }
            /* card counter */
            const idx = Math.min(
              Math.floor(self.progress * PROJECTS.length),
              PROJECTS.length - 1
            );
            if (counterRef.current) {
              counterRef.current.textContent = `0${idx + 1}`;
            }
          },
        },
      });

      scrollTl.to(track, {
        x: getScrollAmount,
        ease: "none",
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative w-full h-screen"
      style={{ background: "var(--bg-base)", overflow: "hidden" }}
      aria-labelledby="projects-heading"
    >
      {/* ── Section header ────────────────────────────────── */}
      <div
        ref={headerRef}
        className="absolute top-0 left-0 right-0 z-20 w-full"
        style={{ borderBottom: "1px solid rgba(124,58,237,0.1)" }}
      >
        <div className="flex items-end justify-between pt-10 pb-6 w-full max-w-[1200px] mx-auto px-4 md:px-8">
        {/* Left: label + title */}
        <div className="space-y-1">
          <p
            className="text-[10px] tracking-[0.35em] uppercase"
            style={{ color: "var(--accent-secondary)" }}
          >
            Selected Work
          </p>
          <h2
            id="projects-heading"
            className="font-display font-black leading-none"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.5rem, 6vw, 5rem)",
              color: "var(--text-primary)",
            }}
          >
            Projects
          </h2>
        </div>

        {/* Right: counter */}
        <div
          className="flex items-baseline gap-1.5 pb-1"
          aria-live="polite"
          aria-label="Current project number"
        >
          <span
            ref={counterRef}
            className="font-display font-black tabular-nums"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2rem, 5vw, 4rem)",
              color: "var(--text-primary)",
              lineHeight: 1,
            }}
          >
            01
          </span>
          <span
            style={{
              fontSize: "clamp(0.9rem, 2vw, 1.25rem)",
              color: "var(--text-muted)",
            }}
          >
            / 0{PROJECTS.length}
          </span>
        </div>
        </div>
      </div>

      {/* ── Horizontal card track ─────────────────────────── */}
      <div
        className="absolute inset-0 flex items-center"
        style={{ paddingTop: "9rem" }}
      >
        <div
          ref={trackRef}
          className="flex items-stretch gap-5"
          style={{ willChange: "transform", paddingLeft: "max(var(--container-px), calc((100vw - 1200px) / 2 + var(--container-px)))" }}
        >
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}

          {/* End spacer */}
          <div className="flex-none" style={{ width: "max(var(--container-px), calc((100vw - 1200px) / 2 + var(--container-px)))" }} aria-hidden="true" />
        </div>
      </div>

      {/* ── Progress bar ──────────────────────────────────── */}
      <div
        className="absolute bottom-0 left-0 right-0 z-20"
        style={{ height: "2px", background: "rgba(255,255,255,0.04)" }}
        aria-hidden="true"
      >
        <div
          ref={progressRef}
          className="h-full origin-left"
          style={{
            background:
              "linear-gradient(90deg, var(--accent-primary), var(--accent-secondary))",
            transform: "scaleX(0)",
            willChange: "transform",
          }}
        />
      </div>

      {/* ── Bottom hint ───────────────────────────────────── */}
      <div
        className="absolute bottom-5 right-10 md:right-16 z-20 flex items-center gap-3"
        aria-hidden="true"
      >
        <span
          className="text-[10px] tracking-[0.3em] uppercase"
          style={{ color: "var(--text-muted)" }}
        >
          Scroll to explore
        </span>
        <svg width="28" height="10" viewBox="0 0 28 10" fill="none" aria-hidden="true">
          <path
            d="M0 5H26M21 1L26 5L21 9"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ color: "var(--text-muted)" }}
          />
        </svg>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   INDIVIDUAL CARD
───────────────────────────────────────────────────────────── */
type Project = (typeof PROJECTS)[number];

function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  return (
    <article
      className="project-card flex-none flex flex-col justify-between rounded-2xl relative overflow-hidden"
      style={{
        width: "clamp(320px, 36vw, 520px)",
        height: "calc(100vh - 14rem)",
        padding: "2rem 2.25rem",
        background: "rgba(13,13,20,0.7)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: `1px solid ${project.accentAlpha}0.18)`,
        transition: "border-color 0.3s ease, transform 0.4s ease",
      }}
      aria-label={project.title.replace("\n", " ")}
      onMouseEnter={(e) => {
        const el = e.currentTarget;
        el.style.borderColor = `${project.accentAlpha}0.45)`;
        el.style.transform = "translateY(-6px)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget;
        el.style.borderColor = `${project.accentAlpha}0.18)`;
        el.style.transform = "translateY(0)";
      }}
    >
      {/* Background glow blob */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "-40%",
          right: "-30%",
          width: "70%",
          height: "70%",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${project.accentAlpha}0.12) 0%, transparent 70%)`,
          filter: "blur(40px)",
        }}
        aria-hidden="true"
      />

      {/* ── Top: number + category badge ─────────────────── */}
      <div className="flex items-start justify-between relative z-10">
        <span
          className="font-display font-black select-none"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(3.5rem, 8vw, 6.5rem)",
            lineHeight: 1,
            color: `${project.accentAlpha}0.15)`,
            letterSpacing: "-0.04em",
          }}
          aria-hidden="true"
        >
          {project.id}
        </span>
        <span
          className="text-[10px] tracking-[0.2em] uppercase font-semibold px-3 py-1.5 rounded-full mt-2 flex-shrink-0"
          style={{
            background: `${project.accentAlpha}0.1)`,
            border: `1px solid ${project.accentAlpha}0.3)`,
            color: project.accent,
          }}
        >
          {project.category}
        </span>
      </div>

      {/* ── Middle: title + bullets ───────────────────────── */}
      <div className="flex flex-col gap-5 flex-1 justify-center py-3 relative z-10">
        <h3
          className="font-display font-bold leading-[1.1]"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.35rem, 2.4vw, 1.9rem)",
            color: "var(--text-primary)",
            whiteSpace: "pre-line",
          }}
        >
          {project.title}
        </h3>

        {/* Accent divider */}
        <div
          className="w-10 h-px rounded-full"
          style={{
            background: `linear-gradient(90deg, ${project.accent}, transparent)`,
          }}
          aria-hidden="true"
        />

        <ul className="space-y-3">
          {project.description.map((point, i) => (
            <li
              key={i}
              className="flex gap-3 text-sm leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
            >
              <span
                className="flex-shrink-0 mt-1 text-xs"
                style={{ color: project.accent }}
                aria-hidden="true"
              >
                ▸
              </span>
              {point}
            </li>
          ))}
        </ul>
      </div>

      {/* ── Bottom: tech tags + CTA ───────────────────────── */}
      <div
        className="flex flex-col gap-4 pt-4 relative z-10"
        style={{ borderTop: `1px solid ${project.accentAlpha}0.12)` }}
      >
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-[11px] tracking-wide px-2.5 py-1 rounded-md"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.07)",
                color: "var(--text-muted)",
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <span
            className="text-[10px] tracking-[0.25em] uppercase"
            style={{ color: "var(--text-muted)" }}
          >
            {`Project ${project.id} / 0${PROJECTS.length}`}
          </span>
          <button
            className="group flex items-center gap-2 text-sm font-semibold"
            style={{ color: project.accent }}
            aria-label={`View ${project.title.replace("\n", " ")} project details`}
          >
            View Project
            <span
              className="inline-block transition-transform duration-250"
              style={{ transition: "transform 0.25s ease" }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.transform =
                  "translateX(4px)")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.transform =
                  "translateX(0)")
              }
              aria-hidden="true"
            >
              →
            </span>
          </button>
        </div>
      </div>
    </article>
  );
}
