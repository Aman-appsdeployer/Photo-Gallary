// AboutSection.jsx
import { useEffect, useRef, useState } from "react";

export default function AboutSection() {
  const stats = [
    { id: "years", label: "Years Experience", value: 6 },
    { id: "events", label: "Events Covered", value: 150 },
    { id: "clients", label: "Happy Clients", value: 120 },
    { id: "awards", label: "Awards", value: 8 },
  ];

  const containerRef = useRef(null);
  const imgRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [counts, setCounts] = useState(
    stats.reduce((a, s) => ({ ...a, [s.id]: 0 }), {})
  );
  const [finished, setFinished] = useState(false);

  /* IntersectionObserver to trigger animations */
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.18 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  /* Count-up animation with completion flag */
  useEffect(() => {
    if (!visible) return;
    const rafs = {};
    let completed = 0;
    stats.forEach((s) => {
      const duration = 900 + Math.random() * 600;
      const start = performance.now();
      const tick = () => {
        const now = performance.now();
        const t = Math.min(1, (now - start) / duration);
        const ease = 1 - Math.pow(1 - t, 3); // easeOutCubic
        const current = Math.floor(ease * s.value);
        setCounts((p) => ({ ...p, [s.id]: current }));
        if (t < 1) {
          rafs[s.id] = requestAnimationFrame(tick);
        } else {
          completed += 1;
          if (completed === stats.length) {
            setFinished(true);
          }
        }
      };
      rafs[s.id] = requestAnimationFrame(tick);
    });
    return () => Object.values(rafs).forEach((id) => cancelAnimationFrame(id));
  }, [visible]);

  /* Parallax tilt for portrait image */
  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;
    const handleMove = (e) => {
      const r = img.getBoundingClientRect();
      const clientX = e.clientX ?? (e.touches && e.touches[0].clientX);
      const clientY = e.clientY ?? (e.touches && e.touches[0].clientY);
      if (clientX == null || clientY == null) return;
      const px = (clientX - r.left) / r.width - 0.5;
      const py = (clientY - r.top) / r.height - 0.5;
      img.style.transform = `perspective(900px) rotateY(${px * 6}deg) rotateX(${
        -py * 6
      }deg) translateZ(6px) scale(1.016)`;
    };
    const reset = () =>
      (img.style.transform = "perspective(900px) rotateY(0deg) rotateX(0deg) scale(1)");
    img.addEventListener("mousemove", handleMove);
    img.addEventListener("mouseleave", reset);
    img.addEventListener("touchstart", reset, { passive: true });
    return () => {
      img.removeEventListener("mousemove", handleMove);
      img.removeEventListener("mouseleave", reset);
      img.removeEventListener("touchstart", reset);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="py-16 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 -mt-32"
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* LEFT: portrait with floating petals */}
          <div
            className={`relative rounded-2xl shadow-2xl transform transition-all duration-800 will-change-transform ${
              visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            }`}
          >
            <div
              ref={imgRef}
              className="w-full h-96 bg-gray-200 rounded-2xl overflow-hidden relative"
              aria-hidden
            >
              <img
                src="/images/img1.jpg"
                alt="Photographer portrait"
                className="w-full h-full object-cover"
              />

              <div className="absolute left-4 top-4 bg-white/90 dark:bg-black/70 text-gray-800 dark:text-white px-3 py-1 rounded-full text-sm shadow backdrop-blur-sm transform transition-transform duration-700">
                Professional • Cinematic
              </div>

              {/* decorative floating petals (pure CSS animation) */}
              <div aria-hidden className="pointer-events-none">
                <svg className="absolute -left-6 -top-6 w-24 h-24 opacity-80 animate-petal-slow" viewBox="0 0 24 24">
                  <path d="M12 2c2 2.6 6.5 6.2 6 10-0.5 3.8-4.5 6-6 8-1.5-2-5.5-4.2-6-8C5.5 8.2 10 4.6 12 2z" fill="#ffd1d8" />
                </svg>
                <svg className="absolute -right-6 top-6 w-16 h-16 opacity-70 animate-petal" viewBox="0 0 24 24">
                  <path d="M12 2c2 2.6 6.5 6.2 6 10-0.5 3.8-4.5 6-6 8-1.5-2-5.5-4.2-6-8C5.5 8.2 10 4.6 12 2z" fill="#fff1c9" />
                </svg>
                <svg className="absolute left-8 bottom-6 w-20 h-20 opacity-75 animate-petal-delay" viewBox="0 0 24 24">
                  <path d="M12 2c2 2.6 6.5 6.2 6 10-0.5 3.8-4.5 6-6 8-1.5-2-5.5-4.2-6-8C5.5 8.2 10 4.6 12 2z" fill="#ffd7a8" />
                </svg>
              </div>
            </div>
          </div>

          {/* RIGHT: text, heading + stats + CTAs */}
          <div
            className={`space-y-6 transition-all duration-700 ${
              visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
          >
            {/* Heading with animated shimmer underline */}
            <div>
              <h2 className="text-3xl sm:text-4xl font-extrabold dark:text-gray-300 leading-tight">
                Hi, I'm Aman — I tell stories with light
              </h2>

              <div
                className={`h-1 mt-3 w-24 bg-gradient-to-r from-rose-400 via-rose-300 to-amber-300 rounded-full transform origin-left transition-all duration-900 ${
                  visible ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"
                }`}
                style={{ transformOrigin: "left" }}
              />
            </div>

            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              I’m a professional photographer who loves capturing honest emotions and cinematic moments.
              I specialise in weddings, portraits and editorial work — blending natural light and creative editing
              to craft images that stand the test of time.
            </p>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((s, i) => (
                <div
                  key={s.id}
                  className={`p-4 rounded-lg shadow flex flex-col bg-white dark:bg-gray-700 transform transition-all duration-700 ${
                    visible ? `opacity-100 translate-y-0 delay-${i}` : "opacity-0 translate-y-4"
                  }`}
                  style={{
                    transitionDelay: `${i * 120}ms`,
                  }}
                >
                  <div
                    className={`text-2xl sm:text-3xl font-bold text-cyan-600 flex items-baseline gap-2 transform transition-transform duration-600 ${
                      finished ? "scale-105" : "scale-100"
                    }`}
                  >
                    {counts[s.id]}
                    <span className="text-base text-gray-500 font-medium ml-1">+</span>
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300 mt-1">{s.label}</div>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex items-center gap-4">
              <a
                href="/contact"
                className={`inline-block px-6 py-3 bg-rose-500 text-white rounded-lg shadow-lg transform transition-all duration-300 ${
                  visible ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
                } hover:-translate-y-1 hover:shadow-2xl focus:outline-none`}
              >
                Book a Session
              </a>

              <a
                href="/galleries"
                className="inline-flex items-center gap-2 px-4 py-2 border rounded-lg text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
              >
                View Portfolio
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Inline CSS for animations (drop-in) */}
        <style>{`
          /* Petal animations */
          @keyframes petalFloat {
            0% { transform: translateY(0) rotate(0deg) translateX(0); opacity: 0.9 }
            30% { opacity: 1 }
            100% { transform: translateY(-10px) rotate(20deg) translateX(8px); opacity: 0.6 }
          }
          @keyframes petalFloatDelay {
            0% { transform: translateY(0) rotate(0deg) translateX(0); opacity: 0.95 }
            30% { opacity: 1 }
            100% { transform: translateY(18px) rotate(-20deg) translateX(-12px); opacity: 0.2 }
          }
          @keyframes petalFloatSlow {
            0% { transform: translateY(0) rotate(0deg); opacity: 1 }
            40% { transform: translateY(-6px) rotate(8deg); opacity: 1 }
            100% { transform: translateY(0) rotate(0deg); opacity: 0.85 }
          }

          .animate-petal { animation: petalFloat 5200ms ease-in-out infinite; }
          .animate-petal-delay { animation: petalFloatDelay 7200ms ease-in-out infinite; }
          .animate-petal-slow { animation: petalFloatSlow 8500ms ease-in-out infinite; }

          /* small reveal helpers - used by inline classes above */
          .delay-0 { transition-delay: 0ms; }
          .delay-1 { transition-delay: 80ms; }
          .delay-2 { transition-delay: 160ms; }
          .delay-3 { transition-delay: 240ms; }

          /* accessible focus states for CTAs */
          a:focus { outline: 3px solid rgba(14,165,164,0.14); outline-offset: 3px; border-radius: 8px; }

          /* Heading underline draw (handled by scale) */
          /* stat pop is handled by transform: scale on finished state */
        `}</style>
      </div>
    </section>
  );
}





// import { useEffect, useRef, useState } from "react";

// export default function AboutSection() {
//   const stats = [
//     { id: "years", label: "Years Experience", value: 6 },
//     { id: "events", label: "Events Covered", value: 150 },
//     { id: "clients", label: "Happy Clients", value: 120 },
//     { id: "awards", label: "Awards", value: 8 },
//   ];

//   const containerRef = useRef(null);
//   const imgRef = useRef(null);
//   const [visible, setVisible] = useState(false);
//   const [counts, setCounts] = useState(stats.reduce((a, s) => ({ ...a, [s.id]: 0 }), {}));

//   useEffect(() => {
//     const el = containerRef.current;
//     if (!el) return;
//     const io = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             setVisible(true);
//             io.disconnect();
//           }
//         });
//       },
//       { threshold: 0.18 }
//     );
//     io.observe(el);
//     return () => io.disconnect();
//   }, []);

//   useEffect(() => {
//     if (!visible) return;
//     const rafs = {};
//     stats.forEach((s) => {
//       const duration = 1000 + Math.random() * 500;
//       const start = performance.now();
//       const tick = () => {
//         const now = performance.now();
//         const t = Math.min(1, (now - start) / duration);
//         const ease = 1 - Math.pow(1 - t, 3);
//         const current = Math.floor(ease * s.value);
//         setCounts((p) => ({ ...p, [s.id]: current }));
//         if (t < 1) rafs[s.id] = requestAnimationFrame(tick);
//       };
//       rafs[s.id] = requestAnimationFrame(tick);
//     });
//     return () => Object.values(rafs).forEach((id) => cancelAnimationFrame(id));
//   }, [visible]);

//   // subtle parallax for image area
//   useEffect(() => {
//     const img = imgRef.current;
//     if (!img) return;
//     const handleMove = (e) => {
//       const r = img.getBoundingClientRect();
//       const px = (e.clientX - r.left) / r.width - 0.5;
//       const py = (e.clientY - r.top) / r.height - 0.5;
//       img.style.transform = `perspective(900px) rotateY(${px * 6}deg) rotateX(${-py * 6}deg) scale(1.02)`;
//     };
//     const reset = () => (img.style.transform = "perspective(900px) rotateY(0deg) rotateX(0deg) scale(1)");
//     img.addEventListener("mousemove", handleMove);
//     img.addEventListener("mouseleave", reset);
//     return () => {
//       img.removeEventListener("mousemove", handleMove);
//       img.removeEventListener("mouseleave", reset);
//     };
//   }, []);

//   return (
//     <section ref={containerRef} className="py-16 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 -mt-32">
//       <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
//         {/* Image */}
//         <div className={`relative overflow-hidden rounded-2xl shadow-2xl transform transition-all duration-700 ${visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}>
//           <div ref={imgRef} className="w-full h-96 bg-gray-200 rounded-2xl overflow-hidden transition-transform duration-500 will-change-transform">
//             <img src="/images/img1.jpg" alt="Photographer portrait" className="w-full h-full object-cover" />
//             <div className="absolute left-4 top-4 bg-white/90 dark:bg-black/70 text-gray-800 dark:text-white px-3 py-1 rounded-full text-sm shadow backdrop-blur-sm">
//               Professional • Cinematic
//             </div>
//           </div>
//         </div>

//         {/* Text */}
//         <div className={`space-y-6 transition-all duration-700 ${visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}>
//           <h2 className="text-3xl sm:text-4xl font-extrabold dark:text-gray-300">Hi, I'm Aman — I tell stories with light</h2>
//           <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
//             I’m a professional photographer who loves capturing honest emotions and cinematic moments.
//             I specialise in weddings, portraits and editorial work — blending natural light and creative editing
//             to craft images that stand the test of time.
//           </p>

//           <div className="grid grid-cols-2 gap-4">
//             {stats.map((s) => (
//               <div key={s.id} className="p-4 bg-white dark:bg-gray-700 rounded-lg shadow flex flex-col">
//                 <div className="text-2xl sm:text-3xl font-bold text-cyan-600">
//                   {counts[s.id]}
//                   <span className="text-base text-gray-500 font-medium ml-1">+</span>
//                 </div>
//                 <div className="text-sm text-gray-600 dark:text-gray-300 mt-1">{s.label}</div>
//               </div>
//             ))}
//           </div>

//           <div className="flex items-center gap-4">
//             <a href="/contact" className={`inline-block px-6 py-3 bg-cyan-600 text-white rounded-lg shadow-lg transform transition-all ${visible ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"} hover:-translate-y-1 hover:shadow-2xl`}>
//               Book a Session
//             </a>

//             <a href="/galleries" className="inline-flex items-center gap-2 px-4 py-2 border rounded-lg text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition">
//               View Portfolio
//               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
//               </svg>
//             </a>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
