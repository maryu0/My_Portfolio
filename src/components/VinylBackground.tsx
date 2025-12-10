import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';

const VinylBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // Create vinyl grooves pattern
        const drawVinylGrooves = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;
            const time = Date.now() * 0.0001;

            for (let i = 0; i < 50; i++) {
                const radius = 100 + i * 20;
                const opacity = 0.03 + Math.sin(time + i * 0.1) * 0.02;

                ctx.beginPath();
                ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
                ctx.strokeStyle = `rgba(255, 107, 53, ${opacity})`;
                ctx.lineWidth = 1;
                ctx.stroke();
            }

            requestAnimationFrame(drawVinylGrooves);
        };

        drawVinylGrooves();

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="fixed inset-0 z-0">
            <canvas
                ref={canvasRef}
                className="absolute inset-0 opacity-30"
            />
            <div className="absolute inset-0 vinyl-gradient noise-texture" />

            {/* Floating vinyl records */}
            {[...Array(5)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-32 h-32 rounded-full border-4 border-vinyl-light opacity-5"
                    style={{
                        left: `${20 + i * 15}%`,
                        top: `${10 + i * 20}%`,
                    }}
                    animate={{
                        rotate: 360,
                        y: [0, -20, 0],
                    }}
                    transition={{
                        rotate: {
                            duration: 20 + i * 5,
                            repeat: Infinity,
                            ease: 'linear',
                        },
                        y: {
                            duration: 3 + i * 0.5,
                            repeat: Infinity,
                            ease: 'easeInOut',
                        },
                    }}
                >
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-neon-orange/10 to-transparent" />
                </motion.div>
            ))}
        </div>
    );
};

export default VinylBackground;
