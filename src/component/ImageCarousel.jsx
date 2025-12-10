// ImageCarousel.jsx
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";



export default function ImageCarousel({
  images = ["/images/img1.jpg", "/images/img2.jpg", "/images/img4.jpg", "/images/img6.jpg"],
  interval = 4500,
}) {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);
  const progressRef = useRef(null);

  // Auto-play timer
  useEffect(() => {
    if (isPaused || images.length <= 1) return;
    const id = setInterval(() => {
      setCurrent((p) => (p + 1) % images.length);
    }, interval);
    return () => clearInterval(id);
  }, [interval, images.length, isPaused]);

  // Reset progress bar animation whenever slide changes
  useEffect(() => {
    if (!progressRef.current) return;
    // restart CSS animation by toggling a class trick
    progressRef.current.style.transition = "none";
    progressRef.current.style.width = "0%";
    // force reflow then animate
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    progressRef.current.offsetWidth;
    progressRef.current.style.transition = `width ${interval}ms linear`;
    progressRef.current.style.width = "100%";
  }, [current, interval]);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowLeft") setCurrent((p) => (p - 1 + images.length) % images.length);
      if (e.key === "ArrowRight") setCurrent((p) => (p + 1) % images.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [images.length]);

  // Controls
  const nextSlide = () => setCurrent((p) => (p + 1) % images.length);
  const prevSlide = () => setCurrent((p) => (p - 1 + images.length) % images.length);
  const goTo = (i) => setCurrent(i);

  // Framer-motion variants for slide transitions
  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 1.02,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction) => ({
      x: direction > 0 ? "-40%" : "40%",
      opacity: 0,
      scale: 0.98,
    }),
  };

  // direction helps determine animation when dragging arrows or keys
  const directionRef = useRef(1);
  const changeSlide = (to) => {
    directionRef.current = to > current ? 1 : -1;
    setCurrent((to + images.length) % images.length);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-64  sm:h-80 md:h-[450px] lg:h-[580px] overflow-hidden rounded-2xl shadow-2xl mt-14 bg-gray-900/5"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      {/* Slides area */}
      <div className="absolute inset-0">
        <AnimatePresence initial={false} custom={directionRef.current}>
          <motion.div
            key={current}
            custom={directionRef.current}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.9, ease: [0.2, 0.9, 0.25, 1] }}
            className="absolute inset-0"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragStart={() => {
              setIsDragging(true);
              setIsPaused(true);
            }}
            onDragEnd={(e, info) => {
              setIsDragging(false);
              setIsPaused(false);
              if (info.offset.x < -80) {
                directionRef.current = 1;
                nextSlide();
              } else if (info.offset.x > 80) {
                directionRef.current = -1;
                prevSlide();
              }
            }}
          >
            {/* Image with ken-burns effect */}
            <motion.img
              src={images[current]}
              alt={`slide-${current}`}
              loading="lazy"
              className="w-full h-full object-cover block"
              initial={{ scale: 1.06 }}
              animate={{ scale: 1 }}
              transition={{ duration: 8, ease: "linear" }} // subtle long ken-burns
              onError={(e) => (e.currentTarget.style.display = "none")}
              style={{ height: "100%", width: "100%" }}
            />

            {/* overlays: vignette + gradient */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent mix-blend-multiply" />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.25),transparent_40%)]" />
            </div>

            {/* caption area (customizable) */}
            <div className="absolute left-6 bottom-6 z-20 text-white max-w-[60%]">
              <div className="backdrop-blur-sm bg-black/30 rounded-md px-4 py-2 inline-flex items-center gap-3">
                <span className="text-xs uppercase tracking-wider text-gray-200">Cinematic</span>
                <h3 className="text-sm sm:text-lg font-semibold">A captured moment</h3>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Left arrow */}
      <button
        aria-label="Previous slide"
        onClick={() => {
          directionRef.current = -1;
          prevSlide();
        }}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-black/40 text-white hover:bg-black/60 backdrop-blur-sm shadow"
      >
        ❮
      </button>

      {/* Right arrow */}
      <button
        aria-label="Next slide"
        onClick={() => {
          directionRef.current = 1;
          nextSlide();
        }}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-black/40 text-white hover:bg-black/60 backdrop-blur-sm shadow"
      >
        ❯
      </button>

      {/* Dots + thumbnails */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3">
        {images.map((src, idx) => (
          <button
            key={idx}
            onClick={() => changeSlide(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`relative rounded-full overflow-hidden w-10 h-6 transition-all transform ${current === idx ? "scale-110" : "opacity-60 hover:opacity-100"}`}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* tiny thumbnail */}
            <img src={src} alt={`thumb-${idx}`} className="w-full h-full object-cover block" onError={(e) => (e.currentTarget.style.display = "none")} />
            <span className={`absolute inset-0 ring-2 ring-white/40 rounded-full ${current === idx ? "ring-cyan-400/90" : ""}`} />
          </button>
        ))}
      </div>

      {/* Progress bar */}
      <div className="absolute left-0 right-0 bottom-0 h-1 z-40 bg-white/10">
        <div
          ref={progressRef}
          className="h-full bg-cyan-400/80"
          style={{
            width: isPaused || images.length <= 1 ? "0%" : "100%",
            transition: isPaused ? "none" : `width ${interval}ms linear`,
          }}
        />
      </div>

      {/* subtle focus ring for keyboard users */}
      <span className="sr-only" aria-live="polite">
        Slide {current + 1} of {images.length}
      </span>
    </div>
  );
}











// import { useEffect, useRef, useState } from "react";


// export default function ImageCarousel({
//   images = [
//     "/images/img5.jpg",
//     "/images/img6.jpg",
//     "/images/img3.jpg",
//     "/images/img4.jpg",
//     ,
//   ],
//   interval = 3000,
// }) {
//   const [current, setCurrent] = useState(0);
//   const [isPaused, setIsPaused] = useState(false);
//   const touchStartX = useRef(0);
//   const slideRef = useRef(null);

//   const nextSlide = () => {
//     setCurrent((prev) => (prev + 1) % images.length);
//   };

//   const prevSlide = () => {
//     setCurrent((prev) => (prev - 1 + images.length) % images.length);
//   };

//   // Auto slide: note we do NOT include `current` in dependencies.
//   useEffect(() => {
//     if (isPaused) return undefined;
//     const id = setInterval(() => {
//       setCurrent((prev) => (prev + 1) % images.length);
//     }, interval);

//     return () => clearInterval(id);
//   }, [interval, images.length, isPaused]);

//   // Touch handlers for swipe
//   const handleTouchStart = (e) => {
//     touchStartX.current = e.touches[0].clientX;
//   };

//   const handleTouchEnd = (e) => {
//     const touchEndX = e.changedTouches[0].clientX;
//     const diff = touchStartX.current - touchEndX;
//     if (diff > 50) nextSlide();
//     else if (diff < -50) prevSlide();
//   };

//   // keyboard navigation (left / right)
//   useEffect(() => {
//     const onKey = (e) => {
//       if (e.key === "ArrowLeft") prevSlide();
//       if (e.key === "ArrowRight") nextSlide();
//     };
//     window.addEventListener("keydown", onKey);
//     return () => window.removeEventListener("keydown", onKey);
//   }, [images.length]);

//   return (
//     <div
//       ref={slideRef}
//       className="relative w-full h-64 sm:h-80 md:h-[450px] lg:h-[520px] overflow-hidden rounded-lg shadow-xl mt-16"
//       onMouseEnter={() => setIsPaused(true)}
//       onMouseLeave={() => setIsPaused(false)}
//       onTouchStart={handleTouchStart}
//       onTouchEnd={handleTouchEnd}
//     >
//       {/* Slides wrapper */}
//       <div
//         className="flex h-full transition-transform duration-700 ease-in-out"
//         style={{ transform: `translateX(-${current * 100}%)` }}
//       >
//         {images.map((src, index) => (
//           // Each slide must take full width
//           <div key={index} className="min-w-full h-full flex-shrink-0">
//             <img
//               src={src}
//               alt={`slide-${index}`}
//               loading="lazy"
//               className="w-full h-full object-cover block"
//               onError={(e) => {
//                 // graceful fallback: hide broken image
//                 e.currentTarget.style.display = "none";
//               }}
//             />
//           </div>
//         ))}
//       </div>

//       {/* Left Arrow */}
//       <button
//         aria-label="Previous slide"
//         onClick={prevSlide}
//         className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full z-20"
//       >
//         ❮
//       </button>

//       {/* Right Arrow */}
//       <button
//         aria-label="Next slide"
//         onClick={nextSlide}
//         className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full z-20"
//       >
//         ❯
//       </button>

//       {/* Dots */}
//       <div className="absolute bottom-4 w-full flex justify-center gap-2 z-20">
//         {images.map((_, idx) => (
//           <button
//             key={idx}
//             onClick={() => setCurrent(idx)}
//             aria-label={`Go to slide ${idx + 1}`}
//             className={`h-3 w-3 rounded-full transition-transform transform ${current === idx ? "scale-125 bg-cyan-400" : "bg-white/50 hover:bg-white"
//               }`}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }
