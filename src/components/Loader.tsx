import { motion } from "framer-motion";

const Loader = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[100] bg-gradient-to-br from-vinyl-darker via-vinyl-dark to-vinyl-darker flex items-center justify-center overflow-hidden"
    >
      {/* Animated Background Particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-neon-orange/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0.2, 0.5, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10">
        {/* Rotating Vinyl Record */}
        <motion.div
          className="relative w-64 h-64"
          animate={{ rotate: 360 }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {/* Outer Ring with Glow */}
          <motion.div
            className="absolute inset-0 rounded-full border-8 border-neon-orange/30"
            animate={{
              boxShadow: [
                "0 0 20px rgba(255, 107, 53, 0.3)",
                "0 0 40px rgba(255, 107, 53, 0.5)",
                "0 0 20px rgba(255, 107, 53, 0.3)",
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          />

          {/* Grooves with varying opacity */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute inset-0 rounded-full border border-album-beige/20"
              style={{
                margin: `${i * 12}px`,
              }}
              animate={{
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.1,
              }}
            />
          ))}

          {/* Center Label with Enhanced Glow */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="w-20 h-20 rounded-full bg-vinyl-dark border-4 border-neon-orange flex items-center justify-center"
              animate={{
                boxShadow: [
                  "0 0 20px rgba(255, 107, 53, 0.5)",
                  "0 0 40px rgba(255, 107, 53, 0.8)",
                  "0 0 20px rgba(255, 107, 53, 0.5)",
                ],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
              }}
            >
              <motion.div
                className="w-3 h-3 rounded-full bg-neon-orange"
                animate={{
                  scale: [1, 1.5, 1],
                  boxShadow: [
                    "0 0 10px rgba(255, 107, 53, 0.8)",
                    "0 0 20px rgba(255, 107, 53, 1)",
                    "0 0 10px rgba(255, 107, 53, 0.8)",
                  ],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                }}
              />
            </motion.div>
          </div>

          {/* Spinning Tonearm */}
          <motion.div
            className="absolute top-1/4 right-0 w-24 h-1 bg-gradient-to-r from-neon-orange to-transparent origin-left"
            style={{ transformOrigin: "0% 50%" }}
            animate={{
              rotate: [0, 5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          />
        </motion.div>

        {/* Enhanced Loading Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="absolute top-full mt-8 left-1/2 -translate-x-1/2 text-center whitespace-nowrap"
        >
          <motion.div
            className="font-display text-3xl text-neon-orange mb-2"
            animate={{
              textShadow: [
                "0 0 10px rgba(255, 107, 53, 0.5)",
                "0 0 20px rgba(255, 107, 53, 0.8)",
                "0 0 10px rgba(255, 107, 53, 0.5)",
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          >
            AYUSH
          </motion.div>
          <div className="font-mono text-sm text-album-beige/70 tracking-wider flex items-center gap-2 justify-center">
            <motion.div
              className="w-2 h-2 bg-neon-orange rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
              }}
            />
            LOADING PORTFOLIO
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              ...
            </motion.span>
          </div>
        </motion.div>

        {/* Enhanced Progress Bar */}
        <div className="absolute top-full mt-24 left-0 right-0 h-2 bg-vinyl-dark rounded-full overflow-hidden border border-vinyl-accent/30">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="h-full bg-gradient-to-r from-neon-orange via-neon-pink to-neon-cyan rounded-full origin-left relative"
          >
            {/* Shine effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              animate={{
                x: ["-100%", "200%"],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </motion.div>
        </div>

        {/* Floating Music Notes */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-neon-cyan text-2xl"
            style={{
              left: `${-100 + i * 50}px`,
              top: `${-50 + Math.random() * 100}px`,
            }}
            animate={{
              y: [-20, -60, -20],
              opacity: [0, 0.6, 0],
              rotate: [0, 10, 0],
            }}
            transition={{
              duration: 2 + Math.random(),
              repeat: Infinity,
              delay: i * 0.4,
            }}
          >
            ♪
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Loader;
