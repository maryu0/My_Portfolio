import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Contact from "./components/Contact";
import MusicPlayer from "./components/MusicPlayer";
import VinylBackground from "./components/VinylBackground";
import Navbar from "./components/Navbar";
import Loader from "./components/Loader";
function App() {
  const [currentSection, setCurrentSection] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const sections = ["hero", "projects", "skills", "experience", "contact"];

  // Loading effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500); // Show loader for 2.5 seconds

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      // Find which section we're currently viewing
      let current = 0;
      sections.forEach((sectionId, index) => {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          const elementTop = rect.top + window.scrollY;
          if (scrollPosition >= elementTop) {
            current = index;
          }
        }
      });

      setCurrentSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Call on mount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (index: number) => {
    const sectionId = sections[index];
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <>
      <AnimatePresence>{isLoading && <Loader />}</AnimatePresence>

      <div className="relative min-h-screen">
        <VinylBackground />
        <Navbar currentSection={currentSection} onNavigate={scrollToSection} />

        <div className="relative z-10">
          <div id="hero">
            <Hero />
          </div>
          <div id="projects">
            <Projects />
          </div>
          <div id="skills">
            <Skills />
          </div>
          <div id="experience">
            <Experience />
          </div>
          <div id="contact">
            <Contact />
          </div>
        </div>

        <MusicPlayer
          currentSection={currentSection}
          totalSections={sections.length}
          onNavigate={scrollToSection}
        />
      </div>
    </>
  );
}

export default App;
