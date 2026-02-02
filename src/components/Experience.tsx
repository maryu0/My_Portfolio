import { motion } from "framer-motion";
import { Calendar, MapPin, Award } from "lucide-react";

interface Experience {
  id: number;
  company: string;
  role: string;
  location: string;
  date: string;
  description: string[];
  type: "work" | "education";
}

const experiences: Experience[] = [
  {
    id: 1,
    company: "Drone Development Project",
    role: "Team Lead",
    location: "Patna, India",
    date: "Sep 2020 – May 2021",
    description: [
      "Led a team of 4 to design and prototype a working drone using microcontrollers, motors, and sensors",
      "Achieved 95% functional accuracy through iterative testing and optimization",
      "Secured 1st place in science fair competition with 15+ participating teams",
      "Managed project timeline, delegated tasks, and coordinated team meetings",
    ],
    type: "work",
  },
  {
    id: 2,
    company: "Mumbai Hacks",
    role: "Hackathon Participant",
    location: "Mumbai, India",
    date: "2024",
    description: [
      "Selected in top 10% at one of India's largest Agentic AI Hackathons",
      "Developed AI-powered solution using cutting-edge ML technologies",
      "Collaborated with cross-functional teams under tight deadlines",
    ],
    type: "work",
  },
  {
    id: 3,
    company: "Oracle Cloud Infrastructure",
    role: "Certified Professional",
    location: "Online",
    date: "2024",
    description: [
      "Completed Oracle Cloud Infrastructure certification",
      "Gained expertise in cloud deployment and management",
      "Learned best practices for scalable cloud architectures",
    ],
    type: "work",
  },
];
const Experience = () => {
  return (
    <section className="min-h-screen py-24 px-6 relative">
      <div className="container mx-auto max-w-5xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="font-mono text-xs sm:text-sm text-neon-orange tracking-widest">
              TOUR HISTORY
            </div>
            <div className="flex-1 h-[2px] bg-gradient-to-r from-neon-orange to-transparent" />
          </div>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-album-paper">
            EXPERIENCE
          </h2>
          <p className="text-album-beige/70 font-mono mt-4 max-w-2xl text-sm sm:text-base">
            My journey through the tech world. Each stop has shaped who I am
            today.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-4 sm:left-8 top-0 bottom-0 w-[2px] bg-gradient-to-b from-neon-orange via-neon-pink to-neon-cyan" />

          {/* Experience Items */}
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative mb-12 pl-12 sm:pl-20"
            >
              {/* Timeline Dot */}
              <motion.div
                className="absolute left-[10px] sm:left-[26px] top-8 w-4 h-4 rounded-full bg-neon-orange border-4 border-vinyl-dark"
                whileInView={{ scale: [1, 1.3, 1] }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 + 0.3, duration: 0.5 }}
              />

              {/* Content Card */}
              <div className="bg-vinyl-light border border-vinyl-accent hover:border-neon-orange transition-all duration-300 rounded-lg p-4 sm:p-6">
                {/* Header */}
                <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-album-paper">
                      {exp.role}
                    </h3>
                    <p className="text-base sm:text-lg text-neon-cyan font-mono mt-1">
                      {exp.company}
                    </p>
                  </div>

                  {exp.type === "education" && (
                    <div className="px-3 py-1 bg-neon-blue/20 border border-neon-blue text-neon-blue font-mono text-xs rounded-full">
                      EDUCATION
                    </div>
                  )}
                </div>

                {/* Meta Info */}
                <div className="flex flex-wrap gap-3 sm:gap-4 text-xs sm:text-sm text-album-beige/70 font-mono mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar size={14} className="text-neon-orange" />
                    {exp.date}
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={14} className="text-neon-orange" />
                    {exp.location}
                  </div>
                </div>

                {/* Description */}
                <ul className="space-y-2">
                  {exp.description.map((item, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.2 + i * 0.1 }}
                      className="flex items-start gap-3 text-sm sm:text-base text-album-beige/80"
                    >
                      <span className="text-neon-orange mt-1">▸</span>
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>

                {/* Decorative Number */}
                <div className="absolute top-4 right-4 text-6xl font-display text-album-beige/5">
                  {String(exp.id).padStart(2, "0")}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Download Resume Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex justify-center mt-12"
        >
          <motion.a
            href="/Ayush_resume.pdf"
            download="Ayush_Kumar_Resume.pdf"
            className="px-8 py-4 bg-neon-orange text-vinyl-dark hover:bg-neon-pink transition-colors font-mono tracking-wider rounded-lg flex items-center gap-3 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Award size={20} />
            DOWNLOAD RESUME
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
