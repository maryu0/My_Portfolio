import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const VinylBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Track mouse position for interactive effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Particle system
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      life: number;
      maxLife: number;
    }> = [];

    const colors = [
      "rgba(255, 107, 53, ", // neon-orange
      "rgba(255, 64, 129, ", // neon-pink
      "rgba(0, 229, 255, ", // neon-cyan
      "rgba(255, 215, 0, ", // neon-yellow
    ];

    // Create initial particles
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 3 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        life: Math.random() * 100,
        maxLife: 100 + Math.random() * 100,
      });
    }

    // Create vinyl grooves pattern with particles
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const time = Date.now() * 0.0001;

      // Draw expanding pulse rings
      for (let p = 0; p < 3; p++) {
        const pulseRadius = (time * 500 + p * 200) % 800;
        const pulseOpacity = Math.max(0, 0.15 - pulseRadius / 5000);
        ctx.beginPath();
        ctx.arc(centerX, centerY, pulseRadius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255, 107, 53, ${pulseOpacity})`;
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      // Draw vinyl grooves
      for (let i = 0; i < 50; i++) {
        const radius = 100 + i * 20;
        const opacity = 0.03 + Math.sin(time + i * 0.1) * 0.02;
        const wobble = Math.sin(time * 2 + i * 0.2) * 2;

        ctx.beginPath();
        ctx.arc(centerX + wobble, centerY + wobble, radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255, 107, 53, ${opacity})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Update and draw particles
      particles.forEach((particle, index) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.life += 1;

        // Reset particle if it goes off screen or dies
        if (
          particle.x < 0 ||
          particle.x > canvas.width ||
          particle.y < 0 ||
          particle.y > canvas.height ||
          particle.life > particle.maxLife
        ) {
          particles[index] = {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            size: Math.random() * 3 + 1,
            color: colors[Math.floor(Math.random() * colors.length)],
            life: 0,
            maxLife: 100 + Math.random() * 100,
          };
        }

        const lifeRatio = 1 - particle.life / particle.maxLife;
        const opacity = lifeRatio * 0.6;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color + opacity + ")";
        ctx.fill();

        // Draw connecting lines between nearby particles
        particles.forEach((other, otherIndex) => {
          if (index !== otherIndex) {
            const dx = particle.x - other.x;
            const dy = particle.y - other.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 150) {
              ctx.beginPath();
              ctx.moveTo(particle.x, particle.y);
              ctx.lineTo(other.x, other.y);
              ctx.strokeStyle = `rgba(255, 107, 53, ${
                0.05 * (1 - distance / 150)
              })`;
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          }
        });
      });

      // Draw gradient orbs that follow mouse slightly
      const orbX = centerX + (mousePosition.x - centerX) * 0.05;
      const orbY = centerY + (mousePosition.y - centerY) * 0.05;

      const gradient = ctx.createRadialGradient(orbX, orbY, 0, orbX, orbY, 300);
      gradient.addColorStop(0, "rgba(255, 107, 53, 0.1)");
      gradient.addColorStop(0.5, "rgba(255, 64, 129, 0.05)");
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [mousePosition.x, mousePosition.y]);

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

      {/* Floating Gradient Orbs */}
      <motion.div
        className="fixed top-1/4 left-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(255,107,53,0.15) 0%, rgba(255,107,53,0) 70%)",
          filter: "blur(40px)",
        }}
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="fixed bottom-1/4 right-1/4 w-80 h-80 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(0,229,255,0.12) 0%, rgba(0,229,255,0) 70%)",
          filter: "blur(40px)",
        }}
        animate={{
          x: [0, -80, 0],
          y: [0, 60, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="fixed top-1/2 right-1/3 w-64 h-64 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(255,64,129,0.1) 0%, rgba(255,64,129,0) 70%)",
          filter: "blur(30px)",
        }}
        animate={{
          x: [0, 50, -30, 0],
          y: [0, -80, 40, 0],
          scale: [1, 0.8, 1.1, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Floating Music Notes */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`note-${i}`}
          className="fixed text-neon-orange/20 text-2xl pointer-events-none hidden lg:block"
          style={{
            left: `${10 + i * 12}%`,
            top: `${20 + (i % 3) * 25}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, i % 2 === 0 ? 15 : -15, 0],
            opacity: [0.1, 0.3, 0.1],
            rotate: [0, i % 2 === 0 ? 10 : -10, 0],
          }}
          transition={{
            duration: 4 + i * 0.5,
            delay: i * 0.3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          ♪
        </motion.div>
      ))}

      {/* Horizontal Scan Lines */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-[0.02]">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={`scanline-${i}`}
            className="absolute w-full h-[1px] bg-white"
            style={{ top: `${i * 2}%` }}
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              delay: i * 0.05,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Glowing Stars */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={`star-${i}`}
          className="fixed w-1 h-1 bg-white rounded-full pointer-events-none"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            boxShadow: "0 0 6px 2px rgba(255,255,255,0.3)",
          }}
          animate={{
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            delay: Math.random() * 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

export default VinylBackground;
