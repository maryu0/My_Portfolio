import { motion } from "framer-motion";

interface Skill {
  name: string;
  icon: string;
  level: number;
  featured?: boolean;
  projects?: string[];
  description?: string;
}

interface SkillCategory {
  title: string;
  skills: Skill[];
  color: string;
}

const skillCategories: SkillCategory[] = [
  {
    title: "Languages",
    color: "neon-cyan",
    skills: [
      {
        name: "JavaScript",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
        level: 95,
        featured: true,
        projects: ["Cash Compass", "Forkify"],
        description: "Primary language for full-stack development",
      },
      {
        name: "TypeScript",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
        level: 90,
        featured: true,
        projects: ["Portfolio"],
        description: "Type-safe development for scalable apps",
      },
      {
        name: "Python",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
        level: 90,
        featured: true,
        projects: ["Vriddhi"],
        description: "AI/ML & backend development",
      },
      {
        name: "Java",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
        level: 80,
      },
      {
        name: "C++",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
        level: 85,
      },
      {
        name: "HTML5",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
        level: 95,
      },
      {
        name: "CSS3",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
        level: 90,
      },
    ],
  },
  {
    title: "Frontend",
    color: "neon-pink",
    skills: [
      {
        name: "React",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
        level: 95,
        featured: true,
        projects: ["Cash Compass", "Portfolio"],
        description: "Expert in modern React patterns & hooks",
      },
      {
        name: "Next.js",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
        level: 85,
        featured: true,
        description: "SSR & static site generation",
      },
      {
        name: "Tailwind CSS",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
        level: 90,
        featured: true,
        projects: ["Portfolio", "Cash Compass"],
      },
      {
        name: "Bootstrap",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg",
        level: 85,
      },
      {
        name: "Material UI",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/materialui/materialui-original.svg",
        level: 80,
      },
    ],
  },
  {
    title: "Backend & AI/ML",
    color: "neon-orange",
    skills: [
      {
        name: "Node.js",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
        level: 90,
        featured: true,
        projects: ["Cash Compass", "Vriddhi"],
        description: "Scalable server-side applications",
      },
      {
        name: "FastAPI",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg",
        level: 85,
        featured: true,
        projects: ["Vriddhi"],
        description: "High-performance Python APIs",
      },
      {
        name: "Express.js",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
        level: 90,
      },
      {
        name: "GraphQL",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg",
        level: 75,
      },
    ],
  },
  {
    title: "Database & Cloud",
    color: "neon-yellow",
    skills: [
      {
        name: "MongoDB",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
        level: 90,
        featured: true,
        projects: ["Cash Compass", "Vriddhi"],
        description: "NoSQL database design & optimization",
      },
      {
        name: "Docker",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
        level: 85,
        featured: true,
        description: "Containerization & deployment",
      },
      {
        name: "Git",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
        level: 95,
      },
      {
        name: "Kubernetes",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg",
        level: 75,
      },
    ],
  },
];

const getLevelText = (level: number): string => {
  if (level >= 90) return "Advanced";
  if (level >= 80) return "Proficient";
  return "Comfortable";
};

const Skills = () => {
  return (
    <section className="min-h-screen py-24 px-6 relative">
      <div className="container mx-auto max-w-7xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="font-mono text-sm text-neon-orange tracking-widest">
              STUDIO EQUIPMENT
            </div>
            <div className="flex-1 h-[2px] bg-gradient-to-r from-neon-orange to-transparent" />
          </div>
          <h2 className="font-display text-7xl text-album-paper">
            INSTRUMENTS
          </h2>
          <p className="text-album-beige/70 font-mono mt-4 max-w-2xl">
            The tools and technologies I use to craft digital experiences.
            Mastery through constant practice and iteration.
          </p>
        </motion.div>

        {/* Skills with Hierarchy & Storytelling */}
        <div className="space-y-20">
          {skillCategories.map((category, categoryIndex) => {
            const colorMap = {
              "neon-cyan": {
                text: "text-neon-cyan",
                bg: "bg-neon-cyan",
                border: "border-neon-cyan",
                from: "from-neon-cyan",
              },
              "neon-pink": {
                text: "text-neon-pink",
                bg: "bg-neon-pink",
                border: "border-neon-pink",
                from: "from-neon-pink",
              },
              "neon-orange": {
                text: "text-neon-orange",
                bg: "bg-neon-orange",
                border: "border-neon-orange",
                from: "from-neon-orange",
              },
              "neon-yellow": {
                text: "text-neon-yellow",
                bg: "bg-neon-yellow",
                border: "border-neon-yellow",
                from: "from-neon-yellow",
              },
            };
            const colors = colorMap[category.color as keyof typeof colorMap];
            const featuredSkills = category.skills.filter((s) => s.featured);
            const supportingSkills = category.skills.filter((s) => !s.featured);

            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: categoryIndex * 0.1 }}
              >
                {/* Category Header */}
                <div className="flex items-center gap-4 mb-10">
                  <h3
                    className={`text-2xl md:text-3xl font-bold ${colors.text} font-mono tracking-wider`}
                  >
                    {category.title}
                  </h3>
                  <div
                    className={`flex-1 h-[2px] bg-gradient-to-r ${colors.from} to-transparent`}
                  />
                </div>

                {/* Featured Skills - Large Cards with Details */}
                {featuredSkills.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {featuredSkills.map((skill, idx) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: categoryIndex * 0.1 + idx * 0.1 }}
                        whileHover={{ y: -5, scale: 1.02 }}
                        className="group relative"
                      >
                        <div className="relative bg-vinyl-light border border-vinyl-accent hover:border-neon-orange transition-all duration-300 rounded-xl p-6 overflow-hidden">
                          {/* Gradient Background */}
                          <div
                            className={`absolute inset-0 bg-gradient-to-br ${colors.from}/10 via-transparent to-transparent opacity-50`}
                          />

                          {/* Grid Pattern */}
                          <div
                            className="absolute inset-0 opacity-[0.02]"
                            style={{
                              backgroundImage:
                                "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
                              backgroundSize: "20px 20px",
                            }}
                          />

                          {/* Content */}
                          <div className="relative z-10">
                            {/* Icon & Title */}
                            <div className="flex items-start gap-4 mb-4">
                              <div
                                className={`w-16 h-16 rounded-xl ${colors.bg}/20 ${colors.border} border-2 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}
                              >
                                <img
                                  src={skill.icon}
                                  alt={skill.name}
                                  className="w-10 h-10 object-contain"
                                  style={{
                                    filter:
                                      skill.icon.includes("express") ||
                                      skill.icon.includes("nextjs")
                                        ? "invert(1) brightness(2)"
                                        : "none",
                                  }}
                                />
                              </div>
                              <div className="flex-1">
                                <h4 className="text-xl font-bold text-album-paper mb-1">
                                  {skill.name}
                                </h4>
                                {skill.description && (
                                  <p className="text-xs text-album-beige/60 font-mono">
                                    {skill.description}
                                  </p>
                                )}
                              </div>
                            </div>

                            {/* Proficiency Bar */}
                            <div className="mb-3">
                              <div className="flex justify-between items-center mb-2">
                                <span className="text-xs font-mono text-album-beige/50">
                                  PROFICIENCY
                                </span>
                                <span
                                  className={`text-sm font-bold ${colors.text} font-mono`}
                                >
                                  {getLevelText(skill.level)}
                                </span>
                              </div>
                              <div className="h-3 bg-vinyl-dark/60 rounded-full overflow-hidden border border-vinyl-accent/30 shadow-inner">
                                <motion.div
                                  className={`h-full ${colors.bg} rounded-full relative`}
                                  initial={{ width: 0 }}
                                  whileInView={{ width: `${skill.level}%` }}
                                  viewport={{ once: true }}
                                  transition={{
                                    duration: 1,
                                    delay: categoryIndex * 0.1 + idx * 0.1,
                                  }}
                                >
                                  {/* Shine effect for better visibility */}
                                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                                </motion.div>
                              </div>
                            </div>

                            {/* Projects Used In */}
                            {skill.projects && skill.projects.length > 0 && (
                              <div className="flex flex-wrap gap-2">
                                {skill.projects.map((project) => (
                                  <span
                                    key={project}
                                    className={`text-xs px-2 py-1 rounded ${colors.bg}/10 ${colors.text} border ${colors.border}/30 font-mono`}
                                  >
                                    {project}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>

                          {/* Decorative Corner */}
                          <div
                            className={`absolute top-0 right-0 w-20 h-20 ${colors.bg}/5 rounded-bl-full`}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}

                {/* Supporting Skills - Horizontal Chip Row */}
                {supportingSkills.length > 0 && (
                  <div className="mt-6">
                    <p className="text-sm text-album-beige/50 font-mono mb-4 uppercase tracking-wider">
                      Also Experienced With
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {supportingSkills.map((skill, idx) => (
                        <motion.div
                          key={skill.name}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{
                            delay: categoryIndex * 0.1 + idx * 0.05,
                          }}
                          whileHover={{ scale: 1.05, y: -2 }}
                          className="group"
                        >
                          <div
                            className={`flex items-center gap-2 px-4 py-2 rounded-full bg-vinyl-light border border-vinyl-accent hover:${colors.border} transition-all duration-300`}
                          >
                            <img
                              src={skill.icon}
                              alt={skill.name}
                              className="w-5 h-5 object-contain"
                              style={{
                                filter:
                                  skill.icon.includes("express") ||
                                  skill.icon.includes("nextjs") ||
                                  skill.icon.includes("django")
                                    ? "invert(1) brightness(2)"
                                    : "none",
                              }}
                            />
                            <span
                              className={`text-sm font-mono text-album-beige group-hover:${colors.text} transition-colors`}
                            >
                              {skill.name}
                            </span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Audio Visualizer Effect */}
        <motion.div
          className="mt-16 flex justify-center gap-2 h-32 items-end"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {[...Array(40)].map((_, i) => (
            <motion.div
              key={i}
              className="w-2 bg-gradient-to-t from-neon-orange via-neon-pink to-neon-cyan rounded-full"
              animate={{
                height: [
                  Math.random() * 60 + 20,
                  Math.random() * 100 + 30,
                  Math.random() * 60 + 20,
                ],
              }}
              transition={{
                duration: 1 + Math.random(),
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.05,
              }}
            />
          ))}
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="font-mono text-sm text-album-beige/60 tracking-wider">
            CONSTANTLY LEARNING • ALWAYS EVOLVING • PUSHING BOUNDARIES
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
