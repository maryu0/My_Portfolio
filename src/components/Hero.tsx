import { motion } from "framer-motion";
import { ChevronRight, Github, Linkedin, Download } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4">
      {/* Large Name Display */}
      <div className="container mx-auto px-2 sm:px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center justify-center space-y-6 sm:space-y-8">
          {/* Main Name - Large Bold Typography */}
          <div className="text-center relative w-full">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              {/* Rotating Vinyl Behind Name */}
              <motion.div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[180px] h-[180px] xs:w-[220px] xs:h-[220px] sm:w-[350px] sm:h-[350px] md:w-[500px] md:h-[500px] lg:w-[600px] lg:h-[600px] -z-10"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <div className="w-full h-full rounded-full border-2 sm:border-4 md:border-6 lg:border-8 border-neon-orange/20 relative">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-neon-orange/10 via-transparent to-neon-pink/10" />
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-full bg-vinyl-dark border-2 sm:border-3 md:border-4 border-album-beige" />
                </div>
              </motion.div>
              <h1 className="font-display text-[3.5rem] xs:text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] leading-none tracking-tighter text-album-paper relative px-2">
                AYUSH
              </h1>
              <motion.p
                className="font-mono text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl text-neon-orange tracking-wider mt-2 sm:mt-3 md:mt-4 px-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                @maryu0
              </motion.p>{" "}
              {/* Image Overlay on Letters - Similar to "UZARD" design */}
              <motion.div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[120px] h-[80px] xs:w-[180px] xs:h-[120px] sm:w-[250px] sm:h-[200px] md:w-[350px] md:h-[250px] lg:w-[400px] lg:h-[300px] overflow-hidden pointer-events-none"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                <div className="w-full h-full bg-gradient-to-br from-neon-orange via-neon-pink to-neon-blue opacity-20 mix-blend-overlay" />
              </motion.div>
            </motion.div>

            {/* Subtitle */}
            <motion.p
              className="font-mono text-[0.65rem] xs:text-xs sm:text-sm md:text-base lg:text-lg text-neon-cyan tracking-widest mt-3 sm:mt-4 md:mt-6 lg:mt-8 px-4 text-center max-w-4xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              FULL STACK DEVELOPER • AI/ML ENGINEER • DEVOPS
            </motion.p>
          </div>

          {/* Social Links - Circular Buttons */}
          <motion.div
            className="flex gap-3 sm:gap-4 md:gap-6 mt-4 sm:mt-6 md:mt-8 lg:mt-12 z-50 relative"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <motion.a
              href="https://github.com/maryu0"
              target="_blank"
              rel="noopener noreferrer"
              className="w-11 h-11 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full border-2 border-neon-orange flex items-center justify-center text-neon-orange hover:bg-neon-orange hover:text-vinyl-dark transition-all touch-manipulation"
              whileHover={{ scale: 1.1, rotate: 15 }}
              whileTap={{ scale: 0.95 }}
              aria-label="GitHub"
            >
              <Github className="w-5 h-5 sm:w-5 sm:h-5 md:w-6 md:h-6" />
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/ayush-kumar-ab8a3a2ab/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-11 h-11 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full border-2 border-neon-orange flex items-center justify-center text-neon-orange hover:bg-neon-orange hover:text-vinyl-dark transition-all touch-manipulation"
              whileHover={{ scale: 1.1, rotate: 15 }}
              whileTap={{ scale: 0.95 }}
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5 sm:w-5 sm:h-5 md:w-6 md:h-6" />
            </motion.a>
            <motion.a
              href="/Ayush_resume.pdf"
              download="Ayush_Kumar_Resume.pdf"
              onClick={(e) => {
                e.preventDefault();
                const link = document.createElement("a");
                link.href = "/Ayush_resume.pdf";
                link.download = "Ayush_Kumar_Resume.pdf";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
              className="w-11 h-11 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full border-2 border-neon-orange flex items-center justify-center text-neon-orange hover:bg-neon-orange hover:text-vinyl-dark transition-all cursor-pointer touch-manipulation"
              whileHover={{ scale: 1.1, rotate: 15 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Download Resume"
            >
              <Download className="w-5 h-5 sm:w-5 sm:h-5 md:w-6 md:h-6" />
            </motion.a>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-4 sm:mt-6 md:mt-8 lg:mt-12 z-50 relative w-full max-w-xs sm:max-w-md md:max-w-none px-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            <motion.button
              onClick={() => {
                const projectsSection = document.getElementById("projects");
                projectsSection?.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 bg-neon-orange hover:bg-neon-pink text-vinyl-dark font-mono tracking-wider rounded-lg transition-colors flex items-center justify-center gap-2 text-xs sm:text-sm md:text-base lg:text-lg font-bold touch-manipulation"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              VIEW MY WORK
              <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" />
            </motion.button>
            <motion.button
              onClick={() => {
                const contactSection = document.getElementById("contact");
                contactSection?.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 border-2 border-neon-orange text-neon-orange hover:bg-neon-orange hover:text-vinyl-dark font-mono tracking-wider rounded-lg transition-colors flex items-center justify-center gap-2 text-xs sm:text-sm md:text-base lg:text-lg touch-manipulation"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              LET'S CONNECT
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
