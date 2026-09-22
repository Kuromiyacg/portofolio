import IntroOverlay from "@/components/intro/IntroOverlay";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectSection from "@/components/ProjectSection";
import UpcomingProjectsSection from "@/components/UpcomingProjectsSection";
import TimelineSection from "@/components/TimelineSection";
import ExperienceSection from "@/components/ExperienceSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";

export default function Home() {
  return (
    <>
      <IntroOverlay />
      <CustomCursor />
      <Navbar />

      <main>
        <Hero />
        <AboutSection />
        <SkillsSection />
        <ProjectSection />
        <UpcomingProjectsSection />
        <TimelineSection />
        <ExperienceSection />

        <ContactSection />
      </main>

      <Footer />
    </>
  );
}
