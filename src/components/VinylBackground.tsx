import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

const VinylBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
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

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="fixed inset-0 z-0">
      <canvas ref={canvasRef} className="absolute inset-0 opacity-30" />
      <div className="absolute inset-0 vinyl-gradient noise-texture" />

      {/* Left Side Decorations */}
      <div className="fixed left-0 top-0 bottom-0 w-20 pointer-events-none hidden lg:flex flex-col justify-center items-center gap-8">
        {/* Vertical Line */}
        <div className="absolute left-8 top-1/4 bottom-1/4 w-[1px] bg-gradient-to-b from-transparent via-neon-orange/30 to-transparent" />

        {/* Decorative Dots */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`left-dot-${i}`}
            className="w-2 h-2 rounded-full bg-neon-orange/40"
            animate={{
              opacity: [0.2, 0.6, 0.2],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2,
              delay: i * 0.3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Rotating Element */}
        <motion.div
          className="absolute left-4 top-1/3 w-8 h-8 border border-neon-cyan/20 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        >
          <div className="absolute top-0 left-1/2 w-1 h-1 bg-neon-cyan/50 rounded-full -translate-x-1/2" />
        </motion.div>
      </div>

      {/* Right Side Decorations */}
      <div className="fixed right-0 top-0 bottom-0 w-20 pointer-events-none hidden lg:flex flex-col justify-center items-center gap-8">
        {/* Vertical Line */}
        <div className="absolute right-8 top-1/4 bottom-1/4 w-[1px] bg-gradient-to-b from-transparent via-neon-pink/30 to-transparent" />

        {/* Decorative Dots */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`right-dot-${i}`}
            className="w-2 h-2 rounded-full bg-neon-pink/40"
            animate={{
              opacity: [0.2, 0.6, 0.2],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2,
              delay: i * 0.3 + 0.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Rotating Element */}
        <motion.div
          className="absolute right-4 top-2/3 w-8 h-8 border border-neon-orange/20 rounded-full"
          animate={{ rotate: -360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        >
          <div className="absolute top-0 left-1/2 w-1 h-1 bg-neon-orange/50 rounded-full -translate-x-1/2" />
        </motion.div>
      </div>

      {/* Top Corner Decorations */}
      <div className="fixed top-8 left-8 w-24 h-24 pointer-events-none hidden lg:block">
        <motion.div
          className="w-full h-full border-l-2 border-t-2 border-neon-orange/20 rounded-tl-3xl"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
      <div className="fixed top-8 right-8 w-24 h-24 pointer-events-none hidden lg:block">
        <motion.div
          className="w-full h-full border-r-2 border-t-2 border-neon-cyan/20 rounded-tr-3xl"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{
            duration: 3,
            delay: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Bottom Corner Decorations */}
      <div className="fixed bottom-24 left-8 w-24 h-24 pointer-events-none hidden lg:block">
        <motion.div
          className="w-full h-full border-l-2 border-b-2 border-neon-pink/20 rounded-bl-3xl"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{
            duration: 3,
            delay: 0.75,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>
      <div className="fixed bottom-24 right-8 w-24 h-24 pointer-events-none hidden lg:block">
        <motion.div
          className="w-full h-full border-r-2 border-b-2 border-neon-orange/20 rounded-br-3xl"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{
            duration: 3,
            delay: 2.25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Side Vinyl Records - Left */}
      <motion.div
        className="fixed -left-16 top-1/4 w-32 h-32 rounded-full border-4 border-neon-orange/10 pointer-events-none hidden lg:block"
        animate={{ rotate: 360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute inset-4 rounded-full border-2 border-neon-orange/10" />
        <div className="absolute inset-8 rounded-full border border-neon-orange/10" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-neon-orange/20" />
      </motion.div>

      {/* Side Vinyl Records - Right */}
      <motion.div
        className="fixed -right-16 bottom-1/3 w-40 h-40 rounded-full border-4 border-neon-cyan/10 pointer-events-none hidden lg:block"
        animate={{ rotate: -360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute inset-4 rounded-full border-2 border-neon-cyan/10" />
        <div className="absolute inset-8 rounded-full border border-neon-cyan/10" />
        <div className="absolute inset-12 rounded-full border border-neon-cyan/5" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-neon-cyan/20" />
      </motion.div>

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
              ease: "linear",
            },
            y: {
              duration: 3 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
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
