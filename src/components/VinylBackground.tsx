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

    // Audio visualizer bars data
    const numBars = 64;
    const barHeights: number[] = Array(numBars).fill(0);
    const targetHeights: number[] = Array(numBars).fill(0);

    // Sound wave points
    const wavePoints = 100;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const time = Date.now() * 0.001;

      // Update equalizer bar heights with smooth animation
      for (let i = 0; i < numBars; i++) {
        // Create rhythmic pattern
        const frequency = 0.5 + (i / numBars) * 2;
        const phase = i * 0.3;
        targetHeights[i] =
          30 +
          Math.sin(time * frequency + phase) * 40 +
          Math.sin(time * 1.5 + phase * 0.5) * 30 +
          Math.cos(time * 0.8 + i * 0.2) * 20;

        // Smooth interpolation
        barHeights[i] += (targetHeights[i] - barHeights[i]) * 0.1;
      }

      // Draw circular equalizer around center
      const eqRadius = 200;
      for (let i = 0; i < numBars; i++) {
        const angle = (i / numBars) * Math.PI * 2 - Math.PI / 2;
        const barHeight = barHeights[i];

        const x1 = centerX + Math.cos(angle) * eqRadius;
        const y1 = centerY + Math.sin(angle) * eqRadius;
        const x2 = centerX + Math.cos(angle) * (eqRadius + barHeight);
        const y2 = centerY + Math.sin(angle) * (eqRadius + barHeight);

        const gradient = ctx.createLinearGradient(x1, y1, x2, y2);
        gradient.addColorStop(0, "rgba(255, 107, 53, 0.3)");
        gradient.addColorStop(0.5, "rgba(255, 64, 129, 0.4)");
        gradient.addColorStop(1, "rgba(0, 229, 255, 0.3)");

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 3;
        ctx.lineCap = "round";
        ctx.stroke();
      }

      // Draw inner vinyl record
      ctx.beginPath();
      ctx.arc(centerX, centerY, eqRadius - 10, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(255, 107, 53, 0.1)";
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw vinyl grooves
      for (let i = 1; i <= 8; i++) {
        ctx.beginPath();
        ctx.arc(centerX, centerY, eqRadius - 20 - i * 15, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255, 107, 53, ${
          0.05 + Math.sin(time + i) * 0.02
        })`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Center vinyl label
      ctx.beginPath();
      ctx.arc(centerX, centerY, 40, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255, 107, 53, 0.15)";
      ctx.fill();
      ctx.strokeStyle = "rgba(255, 107, 53, 0.3)";
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw sound waves on left side
      ctx.beginPath();
      ctx.moveTo(0, centerY);
      for (let i = 0; i <= wavePoints; i++) {
        const x = (i / wavePoints) * (canvas.width * 0.3);
        const amplitude = 30 + Math.sin(time * 2 + i * 0.1) * 20;
        const y = centerY + Math.sin(time * 3 + i * 0.15) * amplitude;
        ctx.lineTo(x, y);
      }
      ctx.strokeStyle = "rgba(0, 229, 255, 0.15)";
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw sound waves on right side
      ctx.beginPath();
      ctx.moveTo(canvas.width, centerY);
      for (let i = 0; i <= wavePoints; i++) {
        const x = canvas.width - (i / wavePoints) * (canvas.width * 0.3);
        const amplitude = 30 + Math.cos(time * 2 + i * 0.1) * 20;
        const y = centerY + Math.sin(time * 3 + i * 0.15 + 1) * amplitude;
        ctx.lineTo(x, y);
      }
      ctx.strokeStyle = "rgba(255, 64, 129, 0.15)";
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw beat pulse rings
      for (let p = 0; p < 4; p++) {
        const beatTime = (time * 2 + p * 0.5) % 2;
        const pulseRadius = beatTime * 150 + eqRadius + 50;
        const pulseOpacity = Math.max(0, 0.2 - beatTime * 0.1);

        ctx.beginPath();
        ctx.arc(centerX, centerY, pulseRadius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255, 107, 53, ${pulseOpacity})`;
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      // Draw frequency spectrum at bottom
      const spectrumWidth = canvas.width * 0.6;
      const spectrumX = (canvas.width - spectrumWidth) / 2;
      const spectrumY = canvas.height - 80;
      const barWidth = spectrumWidth / 32;

      for (let i = 0; i < 32; i++) {
        const height = barHeights[i * 2] * 0.5;
        const x = spectrumX + i * barWidth;

        const gradient = ctx.createLinearGradient(
          x,
          spectrumY,
          x,
          spectrumY - height
        );
        gradient.addColorStop(0, "rgba(255, 107, 53, 0.4)");
        gradient.addColorStop(1, "rgba(0, 229, 255, 0.2)");

        ctx.fillStyle = gradient;
        ctx.fillRect(x + 2, spectrumY - height, barWidth - 4, height);
      }

      // Mirror spectrum at top
      for (let i = 0; i < 32; i++) {
        const height = barHeights[i * 2] * 0.3;
        const x = spectrumX + i * barWidth;

        const gradient = ctx.createLinearGradient(x, 80, x, 80 + height);
        gradient.addColorStop(0, "rgba(255, 64, 129, 0.3)");
        gradient.addColorStop(1, "rgba(255, 107, 53, 0.1)");

        ctx.fillStyle = gradient;
        ctx.fillRect(x + 2, 80, barWidth - 4, height);
      }

      // Draw gradient orb following mouse
      const orbX = centerX + (mousePosition.x - centerX) * 0.05;
      const orbY = centerY + (mousePosition.y - centerY) * 0.05;

      const gradient = ctx.createRadialGradient(orbX, orbY, 0, orbX, orbY, 300);
      gradient.addColorStop(0, "rgba(255, 107, 53, 0.08)");
      gradient.addColorStop(0.5, "rgba(255, 64, 129, 0.04)");
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

      {/* Left Side - Equalizer Bars */}
      <div className="fixed left-4 top-1/2 -translate-y-1/2 flex items-end gap-1 pointer-events-none hidden lg:flex h-40">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`left-eq-${i}`}
            className="w-1 bg-gradient-to-t from-neon-orange to-neon-pink rounded-full"
            animate={{
              height: [20, 40 + Math.random() * 60, 30, 80, 20],
            }}
            transition={{
              duration: 1 + i * 0.1,
              delay: i * 0.1,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{ opacity: 0.4 }}
          />
        ))}
      </div>

      {/* Right Side - Equalizer Bars */}
      <div className="fixed right-4 top-1/2 -translate-y-1/2 flex items-end gap-1 pointer-events-none hidden lg:flex h-40">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`right-eq-${i}`}
            className="w-1 bg-gradient-to-t from-neon-cyan to-neon-blue rounded-full"
            animate={{
              height: [30, 60 + Math.random() * 40, 20, 70, 30],
            }}
            transition={{
              duration: 1.2 + i * 0.1,
              delay: i * 0.15,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{ opacity: 0.4 }}
          />
        ))}
      </div>

      {/* Left Side - Sound Wave Lines */}
      <div className="fixed left-8 top-1/4 pointer-events-none hidden lg:block">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`wave-left-${i}`}
            className="absolute w-16 h-[2px] rounded-full"
            style={{
              top: i * 20,
              background: `linear-gradient(90deg, transparent, rgba(255,107,53,${
                0.3 - i * 0.05
              }), transparent)`,
            }}
            animate={{
              scaleX: [0.5, 1, 0.5],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 1.5,
              delay: i * 0.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Right Side - Sound Wave Lines */}
      <div className="fixed right-8 bottom-1/4 pointer-events-none hidden lg:block">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`wave-right-${i}`}
            className="absolute w-16 h-[2px] rounded-full"
            style={{
              top: i * 20,
              background: `linear-gradient(90deg, transparent, rgba(0,229,255,${
                0.3 - i * 0.05
              }), transparent)`,
            }}
            animate={{
              scaleX: [0.5, 1, 0.5],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 1.5,
              delay: i * 0.2 + 0.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
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

      {/* Floating Music Notes - Multiple Types */}
      {["♪", "♫", "♩", "♬", "🎵", "♪", "♫", "♩"].map((note, i) => (
        <motion.div
          key={`note-${i}`}
          className="fixed text-2xl pointer-events-none hidden lg:block"
          style={{
            left: `${8 + i * 12}%`,
            top: `${15 + (i % 4) * 20}%`,
            color:
              i % 2 === 0
                ? "rgba(255, 107, 53, 0.25)"
                : "rgba(0, 229, 255, 0.25)",
          }}
          animate={{
            y: [0, -40, 0],
            x: [0, i % 2 === 0 ? 20 : -20, 0],
            opacity: [0.15, 0.35, 0.15],
            rotate: [0, i % 2 === 0 ? 15 : -15, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 4 + i * 0.5,
            delay: i * 0.4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {note}
        </motion.div>
      ))}

      {/* Floating Headphones Icon */}
      <motion.div
        className="fixed top-20 right-20 text-4xl pointer-events-none hidden lg:block opacity-20"
        animate={{
          y: [0, -15, 0],
          rotate: [-5, 5, -5],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        🎧
      </motion.div>

      {/* Floating Microphone Icon */}
      <motion.div
        className="fixed bottom-32 left-20 text-3xl pointer-events-none hidden lg:block opacity-20"
        animate={{
          y: [0, -10, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 3,
          delay: 1,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        🎤
      </motion.div>

      {/* Waveform Lines - Top */}
      <div className="fixed top-16 left-1/2 -translate-x-1/2 flex items-center gap-[2px] pointer-events-none hidden lg:flex">
        {[...Array(40)].map((_, i) => (
          <motion.div
            key={`wave-top-${i}`}
            className="w-[3px] bg-gradient-to-b from-neon-orange/30 to-transparent rounded-full"
            animate={{
              height: [5, 15 + Math.sin(i * 0.5) * 20, 5],
            }}
            transition={{
              duration: 0.8,
              delay: i * 0.03,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Volume Bars - Bottom Left Corner */}
      <div className="fixed bottom-8 left-8 flex items-end gap-1 pointer-events-none hidden lg:flex">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`vol-${i}`}
            className="w-2 bg-neon-cyan/40 rounded-sm"
            animate={{
              height: [8, 8 + i * 6, 8],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 1.5,
              delay: i * 0.1,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Audio Spectrum - Bottom Right Corner */}
      <div className="fixed bottom-8 right-8 flex items-end gap-1 pointer-events-none hidden lg:flex">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`spectrum-${i}`}
            className="w-2 bg-neon-pink/40 rounded-sm"
            animate={{
              height: [30 - i * 4, 10 + i * 4, 30 - i * 4],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 1.2,
              delay: i * 0.15,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Pulsing Beat Circles */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`beat-${i}`}
          className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border pointer-events-none"
          style={{
            borderColor:
              i === 0
                ? "rgba(255,107,53,0.2)"
                : i === 1
                ? "rgba(255,64,129,0.15)"
                : "rgba(0,229,255,0.1)",
          }}
          animate={{
            width: [100 + i * 50, 300 + i * 100, 100 + i * 50],
            height: [100 + i * 50, 300 + i * 100, 100 + i * 50],
            opacity: [0.3, 0.1, 0.3],
          }}
          transition={{
            duration: 2 + i * 0.5,
            delay: i * 0.3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

export default VinylBackground;
