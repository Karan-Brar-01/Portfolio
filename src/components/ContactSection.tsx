"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { personal } from "@/data/resume";

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Heading reveal */
      gsap.fromTo(
        ".ct-line",
        { y: "110%", rotate: 2 },
        {
          y: "0%",
          rotate: 0,
          stagger: 0.12,
          duration: 1.1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: ".ct-heading",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      /* CTA + links */
      gsap.fromTo(
        ".ct-cta, .ct-link",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".ct-actions",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      /* Footer items */
      gsap.fromTo(
        ".ct-footer > *",
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.08,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".ct-footer",
            start: "top 92%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const emailHref = `mailto:${personal.email}`;

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative z-10 w-full"
      style={{ background: "var(--bg-surface)", minHeight: "100vh" }}
      aria-labelledby="contact-heading"
    >
      <div className="flex flex-col justify-between pt-28 w-full max-w-[1200px] mx-auto px-4 md:px-8" style={{ minHeight: "100vh" }}>
      {/* ── Top border ────────────────────────────────── */}
      <div
        className="absolute top-0 left-10 md:left-16 right-10 md:right-16 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(124,58,237,0.4) 50%, transparent)",
        }}
        aria-hidden="true"
      />

      {/* ── Section label ─────────────────────────────── */}
      <p
        className="text-[10px] tracking-[0.35em] uppercase mb-12"
        style={{ color: "var(--accent-secondary)" }}
      >
        Get In Touch — Section 06
      </p>

      {/* ── Main content ──────────────────────────────── */}
      <div className="flex-1 flex flex-col justify-center py-12">

        {/* Heading */}
        <div
          className="ct-heading mb-14 overflow-hidden"
          aria-label="Let's Build Something Great"
        >
          {["LET'S BUILD", "SOMETHING", "GREAT"].map((line, i) => (
            <div key={i} style={{ overflow: "hidden" }}>
              <span
                className="ct-line block font-display font-black leading-[0.9]"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(3rem, 11vw, 12rem)",
                  color: i === 2 ? "transparent" : "var(--text-primary)",
                  WebkitTextStroke: i === 2 ? "1px rgba(124,58,237,0.5)" : "none",
                  transform: "translateY(110%)",
                  letterSpacing: "-0.02em",
                }}
              >
                {line}
              </span>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div
          className="ct-actions flex flex-col sm:flex-row items-start sm:items-center gap-5"
        >
          {/* Email CTA */}
          <a
            href={emailHref}
            id="contact-email-button"
            className="ct-cta group relative overflow-hidden rounded-full px-8 py-4 text-sm font-semibold tracking-wider uppercase transition-all duration-300"
            style={{
              background: "linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))",
              color: "#fff",
              boxShadow: "0 0 40px rgba(124,58,237,0.3)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow =
                "0 0 60px rgba(124,58,237,0.5)";
              (e.currentTarget as HTMLElement).style.transform = "scale(1.03)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow =
                "0 0 40px rgba(124,58,237,0.3)";
              (e.currentTarget as HTMLElement).style.transform = "scale(1)";
            }}
            aria-label={`Send email to ${personal.email}`}
          >
            {personal.email}
          </a>

          {/* Social links */}
          <div className="flex items-center gap-4">
            {[
              { label: "GitHub",   href: personal.github,   id: "contact-github-link" },
              { label: "LinkedIn", href: personal.linkedin,  id: "contact-linkedin-link" },
            ].map(({ label, href, id }) => (
              <a
                key={label}
                id={id}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="ct-link group flex items-center gap-2 px-5 py-3 rounded-full text-sm font-medium tracking-wider uppercase transition-all duration-300"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "var(--text-secondary)",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = "rgba(124,58,237,0.12)";
                  el.style.borderColor = "rgba(124,58,237,0.4)";
                  el.style.color = "var(--accent-secondary)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = "rgba(255,255,255,0.04)";
                  el.style.borderColor = "rgba(255,255,255,0.1)";
                  el.style.color = "var(--text-secondary)";
                }}
                aria-label={`Visit ${label} profile`}
              >
                {label}
                <span className="text-xs opacity-40 group-hover:opacity-100 transition-opacity" aria-hidden="true">↗</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ── Footer bar ────────────────────────────────── */}
      <div
        className="ct-footer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-8 mt-8"
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
      >
        <p
          className="text-xs tracking-widest uppercase"
          style={{ color: "var(--text-muted)" }}
        >
          {personal.name} · {personal.location}
        </p>
        <p
          className="text-xs tracking-widest uppercase"
          style={{ color: "var(--text-muted)" }}
        >
          Built with Next.js · GSAP · Lenis · Tailwind · 2025
        </p>
        <a
          href={`tel:${personal.phone}`}
          className="text-xs tracking-widest uppercase transition-colors duration-200"
          style={{ color: "var(--text-muted)" }}
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLElement).style.color =
              "var(--accent-secondary)")
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLElement).style.color =
              "var(--text-muted)")
          }
          aria-label={`Call ${personal.phone}`}
        >
          {personal.phone}
        </a>
      </div>
      </div>
    </section>
  );
}
