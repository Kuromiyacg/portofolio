import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProjectSection from "@/components/ProjectSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />

      <main id="main-content">
        <Hero />
        <ProjectSection />
        <AboutSection />
        <SkillsSection />
        <ContactSection />
      </main>

      <Footer />
    </>
  );
}
