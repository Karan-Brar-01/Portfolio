import HeroSection     from "@/components/HeroSection";
import ProjectsSection from "@/components/ProjectsSection";
import SkillsSection   from "@/components/SkillsSection";
import AboutSection    from "@/components/AboutSection";
import ContactSection  from "@/components/ContactSection";

export default function Home() {
  return (
    <main className="w-full relative">
      {/* Phase 2 — Hero: pinned, clip-path glow reveal */}
      <HeroSection />

      {/* Phase 3 — Projects: pinned, horizontal card scroll */}
      <ProjectsSection />

      {/* Phase 4 — Skills: animated language cards, DSA Grade-S feature */}
      <SkillsSection />

      {/* Phase 4 — About: stat counters, education timeline, experience */}
      <AboutSection />

      {/* Phase 4 — Contact: heading reveal, email CTA, footer */}
      <ContactSection />
    </main>
  );
}
