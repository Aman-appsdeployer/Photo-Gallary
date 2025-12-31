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
        relative w-full overflow-hidden rounded-2xl mt-14 shadow-2xl
        h-[500px]
        sm:h-[600px]
        md:h-[700px]
        lg:h-[650px]
        xl:h-[620px]
      "
    >
      {/* BACKGROUND IMAGE */}
      <motion.img
        src={image}
        alt="Hero Background"
        className="absolute inset-0 w-full h-full object-cover"
        initial={{ scale: 1.15, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2.2, ease: "easeOut" }}
      />

      {/* DARK CINEMATIC GRADIENT */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent" />

      {/* LIGHT LEAK GLOWS */}
      <motion.div
        className="absolute top-0 left-0 w-72 h-72 bg-pink-400/20 blur-3xl"
        animate={{ opacity: [0.3, 0.6, 0.3], x: [0, 40, 0], y: [0, -30, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <motion.div
        className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-400/20 blur-[120px]"
        animate={{ opacity: [0.2, 0.5, 0.2], x: [0, -50, 0], y: [0, 40, 0] }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      {/* FLOATING PARTICLES (RESPONSIVE & SAFE) */}
      <div className="absolute inset-0 pointer-events-none hidden sm:block">
        {[...Array(20)].map((_, i) => (
          <motion.span
            key={i}
            className="absolute w-1 h-1 bg-white/70 rounded-full"
            initial={{
              x: `${Math.random() * 100}%`,
              y: `${Math.random() * 100}%`,
              opacity: 0,
            }}
            animate={{
              y: ["110%", "-20%"],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 6 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* TEXT CONTENT */}
      <div
        className="
          absolute inset-0 z-30 flex flex-col justify-end
          px-6 sm:px-10 md:px-16 lg:px-24
          pb-14 sm:pb-20 md:pb-24
          text-center sm:text-left
        "
      >
        {/* TITLE */}
        <motion.h1
          className="
    text-3xl sm:text-4xl md:text-5xl lg:text-6xl
    font-extrabold leading-tight drop-shadow-2xl
    flex flex-wrap
  "
        >
          {title.split("").map((letter, index) => {
            // SPACE HANDLING
            if (letter === " ") {
              return <span key={index}>&nbsp;</span>;
            }

            // FIRST LETTER (Luxury Gold)
            if (index === 0) {
              return (
                <motion.span
                  key={index}
                  variants={letterVariant}
                  initial="hidden"
                  animate="visible"
                  custom={index}
                  className="
            bg-gradient-to-r from-amber-300 via-yellow-400 to-orange-300
            bg-clip-text text-transparent
            drop-shadow-[0_0_18px_rgba(255,200,80,0.6)]
          "
                 
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  {letter}
                </motion.span>
              );
            }

            // SECOND LETTER (Cyan Glow)
            if (index === 1) {
              return (
                <motion.span
                  key={index}
                  variants={letterVariant}
                  initial="hidden"
                  animate="visible"
                  custom={index}
                  className="
            bg-gradient-to-r from-cyan-300 via-sky-400 to-blue-300
            bg-clip-text text-transparent
            drop-shadow-[0_0_18px_rgba(100,220,255,0.6)]
          "
                  
                  transition={{ duration: 3.5, repeat: Infinity }}
                >
                  {letter}
                </motion.span>
              );
            }

            // REMAINING LETTERS (Soft Cinematic Gradient)
            return (
              <motion.span
                key={index}
                variants={letterVariant}
                initial="hidden"
                animate="visible"
                custom={index}
                className="
          bg-gradient-to-r from-rose-300 via-pink-400 to-cyan-300
          bg-clip-text text-transparent
        "
              >
                {letter}
              </motion.span>
            );
          })}
        </motion.h1>


        {/* SUBTITLE */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.7 }}
          className="
            mt-4 text-base sm:text-lg md:text-xl
            text-gray-200 max-w-2xl mx-auto sm:mx-0
          "
        >
          {subtitle}
        </motion.p>

        {/* CTA BUTTON */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 1 }}
          className="mt-6 flex justify-center sm:justify-start"
        >
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="
              px-7 py-3
              bg-white/90 text-gray-900
              font-semibold rounded-lg shadow-lg
              hover:bg-white transition
            "
          >
            View Wedding Gallery →
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
