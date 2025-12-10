import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function About() {
  // stats for counters
  const stats = [
    { id: "years", label: "Years Experience", value: 6 },
    { id: "events", label: "Weddings Covered", value: 350 },
    { id: "clients", label: "Happy Couples", value: 280 },
    { id: "awards", label: "Awards", value: 12 },
  ];

  const testimonials = [
    {
      quote:
        "Aman captured our wedding more beautifully than we imagined. Every frame tells the story of the day.",
      name: "Priya & Rohit",
      role: "Wedding Clients",
      avatar: "/images/img3.jpg",
    },
    {
      quote: "The portrait session felt so natural — the photos are my favourite keepsake.",
      name: "Sanjay Kapoor",
      role: "Actor",
      avatar: "/images/img1.jpg",
    },
    {
      quote:
        "Fast turnaround, professional and creative — they understood our brand and delivered magic.",
      name: "Neha Singh",
      role: "Brand Manager",
      avatar: "/images/img5.jpg",
    },
  ];

  const team = [
    { name: "Aman Gupta", title: "Lead Photographer", img: "/images/img1.jpg" },
    { name: "Anjali Sharma", title: "Assistant Photographer", img: "/images/img2.jpg" },
    { name: "Arjun Patel", title: "Photo Editor", img: "/images/img3.jpg" },
  ];

  // gallery (mosaic)
  const gallery = [
    "/images/img12.jpg",
    "/images/images.jpg",
    "/images/img133.jpg",
    "/images/img3.jpg",
    "/images/img6.jpg",
    "/images/img7.jpg",
    "/images/img8.jpg",
    "/images/img9.jpg",
 
    
  ];

  // reveal + counters
  const containerRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [counts, setCounts] = useState(
    stats.reduce((acc, s) => ({ ...acc, [s.id]: 0 }), {})
  );

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
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    const rafs = {};
    stats.forEach((s, i) => {
      const duration = 1000 + i * 220;
      const start = performance.now();
      const tick = () => {
        const now = performance.now();
        const t = Math.min(1, (now - start) / duration);
        const ease = 1 - Math.pow(1 - t, 3);
        const current = Math.floor(ease * s.value);
        setCounts((p) => ({ ...p, [s.id]: current }));
        if (t < 1) rafs[s.id] = requestAnimationFrame(tick);
      };
      rafs[s.id] = requestAnimationFrame(tick);
    });
    return () => Object.values(rafs).forEach((id) => cancelAnimationFrame(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  // testimonial carousel
  const [tIdx, setTIdx] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTIdx((i) => (i + 1) % testimonials.length), 5200);
    return () => clearInterval(id);
  }, [testimonials.length]);

  // lightbox for gallery
  const [lightbox, setLightbox] = useState({ open: false, src: null, idx: 0 });
  function openLightbox(src, idx) {
    setLightbox({ open: true, src, idx });
  }
  function closeLightbox() {
    setLightbox({ open: false, src: null, idx: 0 });
  }
  function navLightbox(dir) {
    const next = (lightbox.idx + dir + gallery.length) % gallery.length;
    setLightbox({ open: true, src: gallery[next], idx: next });
  }

  // small helpers for animation
  const fadeUp = { hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } };

  return (
    <main
      ref={containerRef}
      className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 antialiased selection:bg-cyan-200 selection:text-cyan-900"
    >
      {/* HERO */}
      <header className="relative h-[68vh] md:h-[76vh] lg:h-[82vh] overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-black/30"
          initial={{ opacity: 0 }}
          animate={visible ? { opacity: 1 } : {}}
          transition={{ duration: 1.2 }}
        />

        {/* background mosaic with subtle parallax */}
        <div className="absolute inset-0 grid grid-cols-6 gap-0 transform scale-105 pointer-events-none">
          {[0, 1, 2, 3, 4, 5].map((c) => (
            <div key={c} className="overflow-hidden">
              <motion.img
                src={`/images/hero${(c % 3) + 1}.jpg`}
                alt={`hero-${c}`}
                className="w-full h-full object-cover brightness-90"
                initial={{ y: c % 2 === 0 ? -20 : 20, scale: 1.06 }}
                animate={visible ? { y: 0, scale: 1 } : {}}
                transition={{ duration: 1.6, delay: 0.12 + c * 0.06 }}
              />
            </div>
          ))}
        </div>

        <div className="absolute inset-0 flex items-center">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 26, scale: 0.98 }}
              animate={visible ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.9, delay: 0.16 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight text-white drop-shadow-2xl"
            >
              Cinematic <span className="text-emerald-300">Wedding</span> Photography
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={visible ? { opacity: 1 } : {}}
              transition={{ duration: 1.2, delay: 0.34 }}
              className="mt-4 text-base sm:text-lg text-white/90 max-w-3xl mx-auto"
            >
              We frame quiet moments and joyful chaos — editorial styling with emotional storytelling.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={visible ? { opacity: 1 } : {}}
              transition={{ duration: 1.2, delay: 0.56 }}
              className="mt-8 flex gap-4 items-center justify-center"
            >
              <a
                href="/contact"
                className="px-6 py-3 bg-gradient-to-r from-emerald-300 to-cyan-400 text-gray-900 rounded-full font-semibold shadow-2xl hover:scale-[1.02] transform transition-all"
              >
                Book a Session
              </a>
              <a
                href="/galleries"
                className="px-5 py-3 border border-white/30 rounded-full hover:bg-white/10 transition"
              >
                View Portfolio
              </a>
            </motion.div>
          </div>
        </div>

        {/* decorative ribbons */}
        <svg className="absolute left-8 top-12 opacity-30 w-28 h-28 mix-blend-screen" viewBox="0 0 120 120" fill="none">
          <path d="M10 60 Q60 0 110 60" stroke="white" strokeWidth="0.8" />
        </svg>
      </header>

      {/* MISSION */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={visible ? "show" : "hidden"}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <h2 className="text-3xl sm:text-4xl font-bold">We Tell Your Story — Thoughtfully</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              From intimate portraits to grand receptions, we capture emotion with a cinematic eye
              and craft a cohesive visual narrative you'll revisit for years.
            </p>

            <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <li className="flex items-start gap-3">
                <div className="flex-none bg-emerald-300 text-gray-900 rounded-full w-10 h-10 flex items-center justify-center">✓</div>
                <div>
                  <div className="font-semibold">Tailored Coverage</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">Shot lists, timeline planning & discrete direction.</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="flex-none bg-emerald-300 text-gray-900 rounded-full w-10 h-10 flex items-center justify-center">★</div>
                <div>
                  <div className="font-semibold">Editorial Aesthetic</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">Film-like grading and curated album design.</div>
                </div>
              </li>
            </ul>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={visible ? "show" : "hidden"}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="rounded-xl overflow-hidden shadow-2xl relative"
          >
            <img src="/images/img6.jpg" alt="Couple portrait" className="w-full h-80 object-cover" />
            <div className="absolute left-6 bottom-6 bg-white/90 dark:bg-black/70 px-3 py-1 rounded-full text-sm">Trusted • Awarded</div>
          </motion.div>
        </div>
      </section>

      {/* STATS with radial accents */}
      <section className="py-10 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center"
            initial={{ opacity: 0 }}
            animate={visible ? { opacity: 1 } : {}}
            transition={{ staggerChildren: 0.06 }}
          >
            {stats.map((s, i) => (
              <motion.div
                key={s.id}
                className="p-6 rounded-lg bg-white dark:bg-gray-800 shadow-lg relative overflow-hidden"
                initial={{ opacity: 0, y: 12 }}
                animate={visible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.06 }}
              >
                <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-emerald-100 opacity-40 blur-3xl pointer-events-none" />
                <div className="text-4xl font-extrabold text-emerald-400">{counts[s.id]}+</div>
                <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">{s.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Gallery mosaic */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-6">
          <h3 className="text-3xl font-bold text-center mb-8">Selected Moments</h3>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {gallery.map((src, i) => (
              <button
                key={src}
                onClick={() => openLightbox(src, i)}
                className="group overflow-hidden rounded-lg relative shadow-lg"
                aria-label={`Open photo ${i + 1}`}
              >
                <motion.img
                  src={src}
                  alt={`gallery-${i}`}
                  className="w-full h-48 md:h-60 object-cover transition-transform duration-500 group-hover:scale-105"
                  initial={{ opacity: 0, y: 8 }}
                  animate={visible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.08 * i }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-60 transition-opacity" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="py-12 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-6">
          <h3 className="text-3xl font-bold text-center mb-8">Meet the Team</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {team.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12, scale: 0.995 }}
                animate={visible ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ delay: i * 0.08 }}
                className="rounded-xl overflow-hidden shadow-xl bg-white dark:bg-gray-800 hover:-translate-y-2 transform transition"
              >
                <div className="h-56 overflow-hidden relative">
                  <img src={m.img} alt={m.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-30 transition-opacity" />
                </div>
                <div className="p-4">
                  <h4 className="font-semibold text-lg">{m.name}</h4>
                  <div className="text-sm text-gray-600 dark:text-gray-300">{m.title}</div>
                  <div className="mt-3 flex gap-3">
                    <a href="#" aria-label="instagram" className="text-sm hover:underline">Instagram</a>
                    <a href="#" aria-label="email" className="text-sm hover:underline">Email</a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h3 className="text-2xl font-bold mb-6">What Couples Say</h3>

          <div className="relative">
            <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg min-h-[160px] flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={tIdx}
                  initial={{ opacity: 0, y: 10, rotateX: 8 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  exit={{ opacity: 0, y: -8, rotateX: -6 }}
                  transition={{ duration: 0.45 }}
                >
                  <p className="text-gray-700 dark:text-gray-200 italic">“{testimonials[tIdx].quote}”</p>
                  <div className="mt-4 flex items-center gap-3 justify-center">
                    <img src={testimonials[tIdx].avatar} alt={testimonials[tIdx].name} className="w-12 h-12 rounded-full object-cover" />
                    <div className="text-left">
                      <div className="font-semibold">{testimonials[tIdx].name}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">{testimonials[tIdx].role}</div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex gap-2 justify-center mt-4">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setTIdx(i)}
                  className={`h-2 w-8 rounded-full ${i === tIdx ? "bg-emerald-400" : "bg-gray-300 dark:bg-gray-600"}`}
                  aria-label={`Show testimonial ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-emerald-400 to-cyan-400 text-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <motion.h3 initial={{ opacity: 0, y: 8 }} animate={visible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-3xl font-bold mb-4">Ready to tell your story?</motion.h3>
          <motion.p initial={{ opacity: 0 }} animate={visible ? { opacity: 1 } : {}} transition={{ duration: 0.8 }} className="mb-6 max-w-2xl mx-auto">Book a session or request a custom quote — we’d love to work with you.</motion.p>
          <motion.div initial={{ opacity: 0 }} animate={visible ? { opacity: 1 } : {}} transition={{ duration: 0.9 }} className="flex items-center justify-center gap-4">
            <a href="/contact" className="px-6 py-3 bg-white text-emerald-500 rounded-lg font-semibold shadow hover:scale-105 transform transition">Book a Session</a>
            <a href="/galleries" className="px-6 py-3 border border-white/30 rounded-lg hover:bg-white/10">View Portfolio</a>
          </motion.div>
        </div>
      </section>


      {/* Lightbox modal */}
      <AnimatePresence>
        {lightbox.open && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div className="relative max-w-4xl w-full mx-4" initial={{ y: 20 }} animate={{ y: 0 }} exit={{ y: 20 }} transition={{ duration: 0.2 }}>
              <img src={lightbox.src} alt="lightbox" className="w-full h-[60vh] object-cover rounded-lg shadow-2xl" />

              <button onClick={closeLightbox} className="absolute -top-3 -right-3 bg-white rounded-full p-2 shadow">✕</button>
              <button onClick={() => navLightbox(-1)} className="absolute left-2 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow">‹</button>
              <button onClick={() => navLightbox(1)} className="absolute right-2 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow">›</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
