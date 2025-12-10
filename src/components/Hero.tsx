import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Github, Linkedin, Mail } from 'lucide-react';

const Hero = () => {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Large Name Display */}
            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col items-center justify-center space-y-8">

                    {/* Navigation Arrows */}
                    <motion.button
                        className="absolute left-8 top-1/2 -translate-y-1/2 text-neon-orange hover:text-neon-pink transition-colors"
                        whileHover={{ scale: 1.1, x: -5 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <ChevronLeft size={48} strokeWidth={3} />
                    </motion.button>

                    {/* Year Badge */}
                    <motion.div
                        className="absolute top-12 right-12 text-right"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 }}
                    >
                        <div className="font-mono text-sm text-neon-orange tracking-widest">
                            SOFTWARE DEVELOPER
                        </div>
                        <div className="font-display text-6xl text-album-beige mt-2">
                            2019
                        </div>
                    </motion.div>

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
                                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] -z-10"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                            >
                                <div className="w-full h-full rounded-full border-8 border-neon-orange/20 relative">
                                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-neon-orange/10 via-transparent to-neon-pink/10" />
                                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-vinyl-dark border-4 border-album-beige" />
                                </div>
                            </motion.div>

                            <h1 className="font-display text-[12rem] leading-none tracking-tighter text-album-paper relative">
                                AYUSH
                            </h1>
                            <motion.p
                                className="font-mono text-5xl text-neon-orange tracking-wider mt-4"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.4 }}
                            >
                                @maryu0
                            </motion.p>                            {/* Image Overlay on Letters - Similar to "UZARD" design */}
                            <motion.div
                                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[300px] overflow-hidden"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.3, duration: 0.8 }}
                            >
                                <div className="w-full h-full bg-gradient-to-br from-neon-orange via-neon-pink to-neon-blue opacity-20 mix-blend-overlay" />
                            </motion.div>
                        </motion.div>

                        {/* Subtitle */}
                        <motion.p
                            className="font-mono text-xl text-neon-cyan tracking-widest mt-8"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                        >
                            FULL STACK ENGINEER • CREATIVE DEVELOPER
                        </motion.p>
                    </div>

                    {/* Social Links - Circular Buttons */}
                    <motion.div
                        className="flex gap-6 mt-12"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                    >
                        {[
                            { icon: Github, label: 'GitHub' },
                            { icon: Linkedin, label: 'LinkedIn' },
                            { icon: Mail, label: 'Email' },
                        ].map(({ icon: Icon, label }) => (
                            <motion.a
                                key={label}
                                href="#"
                                className="w-14 h-14 rounded-full border-2 border-neon-orange flex items-center justify-center text-neon-orange hover:bg-neon-orange hover:text-vinyl-dark transition-all"
                                whileHover={{ scale: 1.1, rotate: 15 }}
                                whileTap={{ scale: 0.95 }}
                                aria-label={label}
                            >
                                <Icon size={24} />
                            </motion.a>
                        ))}
                    </motion.div>

                    {/* Scroll Indicator */}
                    <motion.div
                        className="absolute bottom-12 left-1/2 -translate-x-1/2 text-center"
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        <div className="font-mono text-xs text-album-beige/60 tracking-widest">
                            SCROLL TO EXPLORE
                        </div>
                        <div className="w-[2px] h-16 bg-gradient-to-b from-neon-orange to-transparent mx-auto mt-4" />
                    </motion.div>

                    {/* Next Arrow */}
                    <motion.button
                        className="absolute right-8 top-1/2 -translate-y-1/2 text-neon-orange hover:text-neon-pink transition-colors"
                        whileHover={{ scale: 1.1, x: 5 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <ChevronRight size={48} strokeWidth={3} />
                    </motion.button>

                    {/* Corner Decorations - Menu Indicator */}
                    <div className="absolute top-12 left-12">
                        <div className="font-mono text-xs text-album-beige/60 tracking-widest">
                            01 / 05
                        </div>
                        <div className="w-12 h-[2px] bg-neon-orange mt-2" />
                    </div>

                    {/* Circular Navigation Indicator - Top Right */}
                    <motion.div
                        className="absolute top-12 right-12 text-neon-orange"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                    >
                        <svg width="120" height="120" viewBox="0 0 120 120">
                            <circle
                                cx="60"
                                cy="60"
                                r="50"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1"
                                strokeDasharray="4 4"
                                opacity="0.3"
                            />
                            <text
                                x="60"
                                y="65"
                                textAnchor="middle"
                                className="font-mono text-xs fill-current"
                                style={{ letterSpacing: '0.2em' }}
                            >
                                NEXT
                            </text>
                        </svg>
                    </motion.div>
                </div>
            </div>

            {/* Listen to the Next Project Text (Rotating) */}
            <div className="absolute bottom-24 right-24">
                <motion.div
                    className="relative w-32 h-32"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                >
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                        <defs>
                            <path
                                id="circle"
                                d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                            />
                        </defs>
                        <text className="text-[8px] fill-neon-orange font-mono tracking-wider">
                            <textPath xlinkHref="#circle">
                                LISTEN TO THE NEXT PROJECT •
                            </textPath>
                        </text>
                    </svg>
                    <motion.div
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8"
                        whileHover={{ scale: 1.2 }}
                    >
                        <ChevronRight className="text-neon-orange" size={32} />
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
