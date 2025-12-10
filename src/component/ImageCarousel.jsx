import { motion } from "framer-motion";

export default function CinematicHero({
  image = "/images/img2.jpg",
  title = "Cinematic Wedding Stories",
  subtitle = "Capturing Love, Emotions, and Timeless Moments",
}) {
  const letterVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.05, duration: 0.4 },
    }),
  };

  return (
    <section
      className="
        relative w-full 
        h-[500px]               /* mobile */
        sm:h-[600px]            /* small tablet */
        md:h-[700px]            /* tablet / small desktop */
        lg:h-[650px]            /* FIXED smaller height for large screens */
        xl:h-[620px]            /* FIXED for 4K screens */
        overflow-hidden rounded-2xl mt-14 shadow-2xl
      "
    >
      {/* Background Image */}
      <motion.img
        src={image}
        alt="Hero Background"
        className="absolute inset-0 w-full h-full object-cover"
        initial={{ scale: 1.15, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2.5, ease: 'easeOut' }}
      />

      {/* Cinematic Dark Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />

      {/* Light Leak Glows */}
      <motion.div
        className="absolute top-0 left-0 w-72 h-72 bg-pink-400/20 blur-3xl"
        animate={{ opacity: [0.3, 0.6, 0.3], x: [0, 40, 0], y: [0, -30, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <motion.div
        className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-400/20 blur-[100px]"
        animate={{ opacity: [0.2, 0.5, 0.2], x: [0, -50, 0], y: [0, 40, 0] }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(25)].map((_, i) => (
          <motion.span
            key={i}
            className="absolute w-1 h-1 bg-white/70 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: 0,
            }}
            animate={{
              y: [Math.random() * 300, Math.random() * -200],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Text Content */}
      <div className="absolute bottom-20 left-10 sm:left-16 md:left-24 z-30 max-w-xl">
        <motion.div
          animate={{ opacity: [1, 0.85, 1], y: [-3, 0, -3] }}
          transition={{ duration: 6, repeat: Infinity }}
        >
          <motion.h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white drop-shadow-xl leading-tight">
            {title.split("").map((letter, index) => (
              <motion.span
                key={index}
                variants={letterVariant}
                initial="hidden"
                animate="visible"
                custom={index}
              >
                {letter === " " ? "\u00A0" : letter}
              </motion.span>
            ))}
          </motion.h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.7 }}
          className="text-lg sm:text-xl text-gray-200 mt-4 drop-shadow"
        >
          {subtitle}
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 1 }}
          whileHover={{ scale: 1.1, boxShadow: "0 0 15px rgba(255,255,255,0.5)" }}
          whileTap={{ scale: 0.95 }}
          className="mt-6 px-7 py-3 bg-white/90 text-gray-900 font-semibold rounded-lg shadow-lg hover:bg-white"
        >
          View Wedding Gallery →
        </motion.button>
      </div>
    </section>
  );
}
