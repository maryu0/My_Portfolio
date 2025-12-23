import { motion } from "framer-motion";

const Loader = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[100] bg-vinyl-darker flex items-center justify-center"
    >
      <div className="relative">
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
          {/* Outer Ring */}
          <div className="absolute inset-0 rounded-full border-8 border-neon-orange/30" />

          {/* Grooves */}
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute inset-0 rounded-full border border-album-beige/20"
              style={{
                margin: `${i * 12}px`,
              }}
            />
          ))}

          {/* Center Label */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-vinyl-dark border-4 border-neon-orange flex items-center justify-center">
              <motion.div
                className="w-3 h-3 rounded-full bg-neon-orange"
                animate={{
                  scale: [1, 1.5, 1],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                }}
              />
            </div>
          </div>
        </motion.div>

        {/* Loading Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="absolute -bottom-16 left-1/2 -translate-x-1/2 text-center whitespace-nowrap"
        >
          <div className="font-display text-2xl text-neon-orange mb-2">
            AYUSH
          </div>
          <div className="font-mono text-sm text-album-beige/60 tracking-wider">
            LOADING PORTFOLIO
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              ...
            </motion.span>
          </div>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
          className="absolute -bottom-8 left-0 right-0 h-1 bg-neon-orange rounded-full origin-left"
        />
      </div>
    </motion.div>
  );
};

export default Loader;
