import { motion } from 'framer-motion';
import { Code, Database, Palette, Zap, Cpu, Globe } from 'lucide-react';

interface Skill {
    name: string;
    level: number; // 0-100
    category: string;
    icon: typeof Code;
    color: string;
}

const skills: Skill[] = [
    { name: "React.js", level: 90, category: "Frontend", icon: Code, color: "neon-cyan" },
    { name: "Node.js/Express", level: 88, category: "Backend", icon: Cpu, color: "neon-orange" },
    { name: "JavaScript/TypeScript", level: 92, category: "Languages", icon: Zap, color: "neon-blue" },
    { name: "MongoDB", level: 85, category: "Database", icon: Database, color: "neon-pink" },
    { name: "Python/TensorFlow", level: 82, category: "AI/ML", icon: Cpu, color: "neon-yellow" },
    { name: "Git/GitHub", level: 88, category: "Tools", icon: Globe, color: "neon-cyan" },
    { name: "Tailwind CSS", level: 90, category: "Styling", icon: Palette, color: "neon-pink" },
    { name: "Oracle Cloud", level: 75, category: "Cloud", icon: Globe, color: "neon-orange" },
]; const Skills = () => {
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

                {/* Skills Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {skills.map((skill, index) => {
                        const Icon = skill.icon;
                        return (
                            <motion.div
                                key={skill.name}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="relative group"
                            >
                                <div className="bg-vinyl-light border border-vinyl-accent hover:border-neon-orange transition-all duration-300 rounded-lg p-6 h-full">
                                    {/* Icon */}
                                    <div className={`w-14 h-14 rounded-full bg-${skill.color}/20 border-2 border-${skill.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                                        <Icon className={`text-${skill.color}`} size={24} />
                                    </div>

                                    {/* Skill Info */}
                                    <div className="mb-4">
                                        <h3 className="text-xl font-bold text-album-paper mb-1">
                                            {skill.name}
                                        </h3>
                                        <p className="text-sm text-album-beige/60 font-mono">
                                            {skill.category}
                                        </p>
                                    </div>

                                    {/* Level Meter - Like Audio VU Meter */}
                                    <div className="relative">
                                        <div className="flex justify-between text-xs font-mono text-album-beige/50 mb-2">
                                            <span>PROFICIENCY</span>
                                            <span>{skill.level}%</span>
                                        </div>

                                        {/* Background bars */}
                                        <div className="flex gap-1 h-2 mb-2">
                                            {[...Array(20)].map((_, i) => (
                                                <motion.div
                                                    key={i}
                                                    initial={{ scaleY: 0 }}
                                                    whileInView={{ scaleY: 1 }}
                                                    viewport={{ once: true }}
                                                    transition={{ delay: index * 0.1 + i * 0.02 }}
                                                    className={`flex-1 rounded-sm ${i < (skill.level / 5)
                                                        ? i < 14
                                                            ? 'bg-neon-cyan'
                                                            : i < 18
                                                                ? 'bg-neon-yellow'
                                                                : 'bg-neon-orange'
                                                        : 'bg-vinyl-accent'
                                                        }`}
                                                    style={{ originY: 1 }}
                                                />
                                            ))}
                                        </div>

                                        {/* Animated glow effect */}
                                        <motion.div
                                            className={`absolute top-0 left-0 h-2 bg-${skill.color} opacity-50 blur-sm rounded`}
                                            initial={{ width: '0%' }}
                                            whileInView={{ width: `${skill.level}%` }}
                                            viewport={{ once: true }}
                                            transition={{ delay: index * 0.1, duration: 1 }}
                                        />
                                    </div>

                                    {/* Decorative elements */}
                                    <div className="absolute top-4 right-4 text-6xl font-display text-album-beige/5">
                                        {String(index + 1).padStart(2, '0')}
                                    </div>
                                </div>
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
                                ease: 'easeInOut',
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
