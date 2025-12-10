import { motion } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward, Volume2, Menu } from 'lucide-react';
import { useState } from 'react';

interface MusicPlayerProps {
    currentSection: number;
    totalSections: number;
    onNavigate: (section: number) => void;
}

const sectionNames = ['HOME', 'PROJECTS', 'SKILLS', 'EXPERIENCE', 'CONTACT'];

const MusicPlayer = ({ currentSection, totalSections, onNavigate }: MusicPlayerProps) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const progress = ((currentSection + 1) / totalSections) * 100;

    const handlePrevious = () => {
        if (currentSection > 0) {
            onNavigate(currentSection - 1);
        }
    };

    const handleNext = () => {
        if (currentSection < totalSections - 1) {
            onNavigate(currentSection + 1);
        }
    };

    return (
        <>
            {/* Music Player Bar */}
            <motion.div
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                className="fixed bottom-0 left-0 right-0 z-50 bg-vinyl-dark/95 backdrop-blur-lg border-t border-vinyl-accent"
            >
                {/* Progress Bar */}
                <div className="relative h-1 bg-vinyl-accent">
                    <motion.div
                        className="absolute left-0 top-0 h-full bg-gradient-to-r from-neon-orange via-neon-pink to-neon-cyan"
                        style={{ width: `${progress}%` }}
                        transition={{ duration: 0.3 }}
                    />

                    {/* Draggable Progress Indicator */}
                    <motion.div
                        className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-album-paper shadow-lg shadow-neon-orange/50"
                        style={{ left: `${progress}%` }}
                        whileHover={{ scale: 1.5 }}
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={0}
                    />
                </div>

                <div className="container mx-auto px-6 py-4">
                    <div className="flex items-center justify-between gap-6">
                        {/* Current Track Info */}
                        <div className="flex-1 min-w-0">
                            <motion.h3
                                key={currentSection}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="text-album-paper font-bold truncate"
                            >
                                {sectionNames[currentSection]}
                            </motion.h3>
                            <p className="text-album-beige/60 text-sm font-mono">
                                Section {currentSection + 1} of {totalSections}
                            </p>
                        </div>

                        {/* Playback Controls */}
                        <div className="flex items-center gap-2">
                            <motion.button
                                onClick={handlePrevious}
                                disabled={currentSection === 0}
                                className="w-10 h-10 flex items-center justify-center text-album-paper hover:text-neon-orange transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                aria-label="Previous section"
                            >
                                <SkipBack size={20} />
                            </motion.button>

                            <motion.button
                                onClick={() => setIsPlaying(!isPlaying)}
                                className="w-12 h-12 rounded-full bg-neon-orange hover:bg-neon-pink text-vinyl-dark flex items-center justify-center transition-colors"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                aria-label={isPlaying ? 'Pause' : 'Play'}
                            >
                                {isPlaying ? (
                                    <Pause size={20} fill="currentColor" />
                                ) : (
                                    <Play size={20} fill="currentColor" className="ml-1" />
                                )}
                            </motion.button>

                            <motion.button
                                onClick={handleNext}
                                disabled={currentSection === totalSections - 1}
                                className="w-10 h-10 flex items-center justify-center text-album-paper hover:text-neon-orange transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                aria-label="Next section"
                            >
                                <SkipForward size={20} />
                            </motion.button>
                        </div>

                        {/* Volume & Menu */}
                        <div className="flex items-center gap-4">
                            <motion.button
                                className="w-10 h-10 flex items-center justify-center text-album-paper hover:text-neon-cyan transition-colors"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                aria-label="Volume"
                            >
                                <Volume2 size={20} />
                            </motion.button>

                            <motion.button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="w-10 h-10 flex items-center justify-center text-album-paper hover:text-neon-orange transition-colors"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                aria-label="Menu"
                            >
                                <Menu size={20} />
                            </motion.button>
                        </div>
                    </div>

                    {/* Time Display */}
                    <div className="flex justify-between items-center mt-2 font-mono text-xs text-album-beige/50">
                        <span>{String(currentSection + 1).padStart(2, '0')}:00</span>
                        <span>{String(totalSections).padStart(2, '0')}:00</span>
                    </div>
                </div>
            </motion.div>

            {/* Navigation Menu Overlay */}
            {isMenuOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-40 bg-vinyl-darker/95 backdrop-blur-lg flex items-center justify-center"
                    onClick={() => setIsMenuOpen(false)}
                >
                    <div className="container mx-auto px-6">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="max-w-2xl mx-auto"
                        >
                            <h2 className="font-display text-6xl text-album-paper mb-12 text-center">
                                NAVIGATION
                            </h2>

                            <div className="space-y-4">
                                {sectionNames.map((name, index) => (
                                    <motion.button
                                        key={name}
                                        onClick={() => {
                                            onNavigate(index);
                                            setIsMenuOpen(false);
                                        }}
                                        className={`w-full text-left p-6 rounded-lg border-2 transition-all ${currentSection === index
                                                ? 'border-neon-orange bg-neon-orange/10 text-neon-orange'
                                                : 'border-vinyl-accent hover:border-album-beige text-album-paper'
                                            }`}
                                        initial={{ opacity: 0, x: -50 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        whileHover={{ scale: 1.02, x: 10 }}
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                <span className="font-display text-3xl">
                                                    {String(index + 1).padStart(2, '0')}
                                                </span>
                                                <span className="font-mono text-xl tracking-wider">
                                                    {name}
                                                </span>
                                            </div>
                                            {currentSection === index && (
                                                <motion.div
                                                    className="flex gap-1"
                                                    animate={{ opacity: [0.5, 1, 0.5] }}
                                                    transition={{ duration: 1.5, repeat: Infinity }}
                                                >
                                                    {[...Array(3)].map((_, i) => (
                                                        <div
                                                            key={i}
                                                            className="w-1 h-8 bg-neon-orange rounded-full"
                                                            style={{ height: `${(i + 1) * 10}px` }}
                                                        />
                                                    ))}
                                                </motion.div>
                                            )}
                                        </div>
                                    </motion.button>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </>
    );
};

export default MusicPlayer;
