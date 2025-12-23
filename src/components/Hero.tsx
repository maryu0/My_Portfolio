import { motion } from "framer-motion";
import { ChevronRight, Github, Linkedin, Download } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Large Name Display */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center justify-center space-y-8">
          {/* Main Name - Large Bold Typography */}
          <div className="text-center relative">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              {/* Rotating Vinyl Behind Name */}
              <motion.div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px] lg:w-[600px] lg:h-[600px] -z-10"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <div className="w-full h-full rounded-full border-4 sm:border-6 md:border-8 border-neon-orange/20 relative">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-neon-orange/10 via-transparent to-neon-pink/10" />
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full bg-vinyl-dark border-2 sm:border-3 md:border-4 border-album-beige" />
                </div>
              </motion.div>
              <h1 className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[12rem] leading-none tracking-tighter text-album-paper relative">
                AYUSH
              </h1>
              <motion.p
                className="font-mono text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-neon-orange tracking-wider mt-2 sm:mt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                @maryu0
              </motion.p>{" "}
              {/* Image Overlay on Letters - Similar to "UZARD" design */}
              <motion.div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[150px] h-[100px] sm:w-[250px] sm:h-[200px] md:w-[350px] md:h-[250px] lg:w-[400px] lg:h-[300px] overflow-hidden pointer-events-none"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                <div className="w-full h-full bg-gradient-to-br from-neon-orange via-neon-pink to-neon-blue opacity-20 mix-blend-overlay" />
              </motion.div>
            </motion.div>

            {/* Subtitle */}
            <motion.p
              className="font-mono text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-neon-cyan tracking-widest mt-4 sm:mt-6 lg:mt-8 px-4 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              FULL STACK DEVELOPER • AI/ML ENGINEER • DEVOPS
            </motion.p>
          </div>

          {/* Social Links - Circular Buttons */}
          <motion.div
            className="flex gap-3 sm:gap-4 md:gap-6 mt-6 sm:mt-8 lg:mt-12 z-50 relative"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <motion.a
              href="https://github.com/maryu0"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-neon-orange flex items-center justify-center text-neon-orange hover:bg-neon-orange hover:text-vinyl-dark transition-all"
              whileHover={{ scale: 1.1, rotate: 15 }}
              whileTap={{ scale: 0.95 }}
              aria-label="GitHub"
            >
              <Github className="w-5 h-5 sm:w-6 sm:h-6" />
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/ayush-kumar-ab8a3a2ab/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-neon-orange flex items-center justify-center text-neon-orange hover:bg-neon-orange hover:text-vinyl-dark transition-all"
              whileHover={{ scale: 1.1, rotate: 15 }}
              whileTap={{ scale: 0.95 }}
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5 sm:w-6 sm:h-6" />
            </motion.a>
            <motion.a
              href="/Ayush_Resume.pdf"
              download="Ayush_Kumar_Resume.pdf"
              onClick={(e) => {
                e.preventDefault();
                const link = document.createElement("a");
                link.href = "/Ayush_Resume.pdf";
                link.download = "Ayush_Kumar_Resume.pdf";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-neon-orange flex items-center justify-center text-neon-orange hover:bg-neon-orange hover:text-vinyl-dark transition-all cursor-pointer"
              whileHover={{ scale: 1.1, rotate: 15 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Download Resume"
            >
              <Download className="w-5 h-5 sm:w-6 sm:h-6" />
            </motion.a>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 sm:mt-8 lg:mt-12 z-50 relative w-full max-w-md sm:max-w-none px-4 sm:px-0"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            <motion.button
              onClick={() => {
                const projectsSection = document.getElementById("projects");
                projectsSection?.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-6 sm:px-8 py-3 sm:py-4 bg-neon-orange hover:bg-neon-pink text-vinyl-dark font-mono tracking-wider rounded-lg transition-colors flex items-center justify-center gap-2 text-sm sm:text-base lg:text-lg font-bold"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              VIEW MY WORK
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </motion.button>
            <motion.button
              onClick={() => {
                const contactSection = document.getElementById("contact");
                contactSection?.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-6 sm:px-8 py-3 sm:py-4 border-2 border-neon-orange text-neon-orange hover:bg-neon-orange hover:text-vinyl-dark font-mono tracking-wider rounded-lg transition-colors flex items-center justify-center gap-2 text-sm sm:text-base lg:text-lg"
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
