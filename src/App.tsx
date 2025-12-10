import { useState, useEffect } from 'react';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Contact from './components/Contact';
import MusicPlayer from './components/MusicPlayer';
import VinylBackground from './components/VinylBackground';

function App() {
    const [currentSection, setCurrentSection] = useState(0);
    const sections = ['hero', 'projects', 'skills', 'experience', 'contact'];

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            const windowHeight = window.innerHeight;
            const newSection = Math.floor(scrollPosition / windowHeight);
            setCurrentSection(Math.min(newSection, sections.length - 1));
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (index: number) => {
        window.scrollTo({
            top: index * window.innerHeight,
            behavior: 'smooth'
        });
    };

    return (
        <div className="relative min-h-screen">
            <VinylBackground />

            <div className="relative z-10">
                <Hero />
                <Projects />
                <Skills />
                <Experience />
                <Contact />
            </div>

            <MusicPlayer
                currentSection={currentSection}
                totalSections={sections.length}
                onNavigate={scrollToSection}
            />
        </div>
    );
}

export default App;
