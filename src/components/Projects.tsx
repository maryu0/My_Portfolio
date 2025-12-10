import { motion } from 'framer-motion';
import { Play, Github, ExternalLink, Clock } from 'lucide-react';
import { useState } from 'react';

interface Project {
    id: number;
    title: string;
    artist: string; // Your role
    album: string; // Project type
    duration: string; // Timeline
    cover: string; // Color gradient
    tech: string[];
    description: string;
    github?: string;
    live?: string;
    featured?: boolean;
}

const projects: Project[] = [
    {
        id: 1,
        title: "Vriddhi",
        artist: "Full Stack Developer",
        album: "AgriTech Platform",
        duration: "4:20",
        cover: "from-neon-orange to-neon-pink",
        tech: ["React", "Node.js", "MongoDB", "TensorFlow", "CNN"],
        description: "AI-powered agricultural platform with CNN-based crop disease detection and real-time market insights",
        github: "https://github.com/maryu0/Vriddhi",
        live: "#",
        featured: true,
    },
    {
        id: 2,
        title: "Natours",
        artist: "Frontend Developer",
        album: "Landing Page",
        duration: "2:30",
        cover: "from-neon-blue to-neon-cyan",
        tech: ["HTML5", "SCSS", "CSS Animations"],
        description: "Modern responsive landing page for a tour booking website with advanced CSS animations and effects",
        github: "https://github.com/maryu0/Natours",
        live: "#",
        featured: true,
    },
    {
        id: 3,
        title: "Forkify",
        artist: "Frontend Developer",
        album: "Recipe App",
        duration: "3:15",
        cover: "from-neon-pink to-neon-blue",
        tech: ["JavaScript", "Webpack", "API Integration"],
        description: "Recipe search application with bookmarking and custom recipe creation features using Forkify API",
        github: "#",
        live: "https://forkify-maryu.netlify.app/",
    },
    {
        id: 4,
        title: "Portfolio Website",
        artist: "Creative Developer",
        album: "Personal Site",
        duration: "2:45",
        cover: "from-neon-cyan to-neon-yellow",
        tech: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
        description: "Minimalist portfolio showcasing projects and skills with smooth animations",
        github: "#",
        live: "https://maryu0.github.io/Portfolio/",
    },
];

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
    const [isPlaying, setIsPlaying] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className={`group relative ${project.featured ? 'col-span-2' : 'col-span-1'}`}
        >
            <div className="relative bg-vinyl-light border border-vinyl-accent hover:border-neon-orange transition-all duration-300 rounded-lg overflow-hidden">
                {/* Album Art */}
                <div className={`relative ${project.featured ? 'h-80' : 'h-64'} bg-gradient-to-br ${project.cover} opacity-20 group-hover:opacity-30 transition-opacity`}>
                    <div className="absolute inset-0 noise-texture" />

                    {/* Play Button Overlay */}
                    <motion.button
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-neon-orange/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsPlaying(!isPlaying)}
                    >
                        <Play className="text-vinyl-dark ml-1" size={32} fill="currentColor" />
                    </motion.button>

                    {/* Track Number */}
                    <div className="absolute top-4 left-4 font-display text-6xl text-album-beige/30">
                        {String(project.id).padStart(2, '0')}
                    </div>

                    {/* Featured Badge */}
                    {project.featured && (
                        <div className="absolute top-4 right-4 px-3 py-1 bg-neon-orange text-vinyl-dark font-mono text-xs tracking-wider rounded-full">
                            FEATURED
                        </div>
                    )}
                </div>

                {/* Track Info */}
                <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                            <h3 className="text-2xl font-bold text-album-paper group-hover:text-neon-orange transition-colors">
                                {project.title}
                            </h3>
                            <p className="text-sm text-album-beige/70 font-mono mt-1">
                                {project.artist} • {project.album}
                            </p>
                        </div>
                        <div className="flex items-center gap-2 text-neon-cyan font-mono text-sm">
                            <Clock size={14} />
                            {project.duration}
                        </div>
                    </div>

                    <p className="text-album-beige/80 text-sm mb-4 line-clamp-2">
                        {project.description}
                    </p>

                    {/* Tech Stack Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                        {project.tech.map((tech, i) => (
                            <motion.span
                                key={tech}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 + i * 0.05 }}
                                className="px-3 py-1 bg-vinyl-accent text-neon-cyan font-mono text-xs rounded-full border border-neon-cyan/30"
                            >
                                {tech}
                            </motion.span>
                        ))}
                    </div>

                    {/* Links */}
                    <div className="flex gap-3">
                        {project.github && (
                            <motion.a
                                href={project.github}
                                className="flex items-center gap-2 px-4 py-2 border border-album-beige/30 text-album-beige hover:border-neon-orange hover:text-neon-orange transition-colors rounded font-mono text-sm"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Github size={16} />
                                Code
                            </motion.a>
                        )}
                        {project.live && (
                            <motion.a
                                href={project.live}
                                className="flex items-center gap-2 px-4 py-2 bg-neon-orange text-vinyl-dark hover:bg-neon-pink transition-colors rounded font-mono text-sm"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <ExternalLink size={16} />
                                Live
                            </motion.a>
                        )}
                    </div>
                </div>

                {/* Vinyl Grooves Decoration */}
                <div className="absolute top-0 right-0 w-32 h-32 opacity-5 pointer-events-none">
                    {[...Array(8)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-neon-orange"
                            style={{
                                width: `${(i + 1) * 12}px`,
                                height: `${(i + 1) * 12}px`,
                            }}
                        />
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

const Projects = () => {
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
                            DISCOGRAPHY
                        </div>
                        <div className="flex-1 h-[2px] bg-gradient-to-r from-neon-orange to-transparent" />
                    </div>
                    <h2 className="font-display text-7xl text-album-paper">
                        PROJECTS
                    </h2>
                    <p className="text-album-beige/70 font-mono mt-4 max-w-2xl">
                        A collection of my favorite tracks. Each project tells a unique story,
                        built with passion and precision.
                    </p>
                </motion.div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {projects.map((project, index) => (
                        <ProjectCard key={project.id} project={project} index={index} />
                    ))}
                </div>

                {/* View All Projects Button */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="flex justify-center mt-12"
                >
                    <motion.button
                        className="px-8 py-4 border-2 border-neon-orange text-neon-orange hover:bg-neon-orange hover:text-vinyl-dark transition-colors font-mono tracking-wider rounded-lg"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        VIEW FULL ALBUM
                    </motion.button>
                </motion.div>
            </div>
        </section>
    );
};

export default Projects;
