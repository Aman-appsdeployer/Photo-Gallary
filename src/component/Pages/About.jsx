// src/pages/About.jsx
import { useEffect, useRef, useState } from "react";

export default function About() {
  // stats for counters
  const stats = [
    { id: "years", label: "Years Experience", value: 6 },
    { id: "events", label: "Events Covered", value: 150 },
    { id: "clients", label: "Happy Clients", value: 120 },
    { id: "awards", label: "Awards", value: 8 },
  ];

  // testimonials (simple)
  const testimonials = [
    {
      quote: "Aman captured our wedding more beautifully than we imagined. Every photo is a memory.",
      name: "Priya & Rohit",
      role: "Wedding Clients",
      avatar: "/images/img3.jpg",
    },
    {
      quote: "The portrait session felt natural — best images I've ever had!",
      name: "Sanjay Kapoor",
      role: "Actor",
      avatar: "/images/img1.jpg",
    },
    {
      quote: "Fast turnaround, professional and creative — highly recommend for brand shoots.",
      name: "Neha Singh",
      role: "Brand Manager",
      avatar: "/images/img5.jpg",
    },
  ];

  // team
  const team = [
    { name: "Aman Gupta", title: "Lead Photographer", img: "/images/img1.jpg" },
    { name: "Anjali", title: "Assistant Photographer", img: "/images/img2.jpg" },
    { name: "Arjun Patel", title: "Photo Editor", img: "/images/img3.jpg" },
  ];

  const containerRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [counts, setCounts] = useState(stats.reduce((a, s) => ({ ...a, [s.id]: 0 }), {}));

  // reveal on scroll for the page
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

  // counters
  useEffect(() => {
    if (!visible) return;
    const rafs = {};
    stats.forEach((s, idx) => {
      const duration = 900 + idx * 150;
      const start = performance.now();
      const tick = () => {
        const now = performance.now();
        const t = Math.min(1, (now - start) / duration);
        const ease = 1 - Math.pow(1 - t, 3);
        const current = Math.floor(ease * s.value);
        setCounts((prev) => ({ ...prev, [s.id]: current }));
        if (t < 1) rafs[s.id] = requestAnimationFrame(tick);
      };
      rafs[s.id] = requestAnimationFrame(tick);
    });
    return () => Object.values(rafs).forEach((id) => cancelAnimationFrame(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  // testimonials carousel state
  const [tIdx, setTIdx] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTIdx((i) => (i + 1) % testimonials.length), 4500);
    return () => clearInterval(id);
  }, [testimonials.length]);

  return (
    <main ref={containerRef} className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* HERO */}
      <header className="relative overflow-hidden">
        <div className="w-full h-[48vh] md:h-[56vh] lg:h-[64vh]">
          <img
            src="/images/img3.jpg"
            alt="Studio hero"
            className="w-full h-full object-cover brightness-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
        </div>

        <div className="absolute inset-0 flex items-center">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <h1
              className={`text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight text-white drop-shadow-lg transform transition-all duration-700 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              About Our Studio
            </h1>
            <p
              className={`mt-4 text-sm sm:text-lg text-white/90 max-w-3xl mx-auto ${
                visible ? "opacity-100" : "opacity-0"
              } transition-opacity duration-900`}
            >
              We craft timeless images with a cinematic touch — weddings, portraits and brand stories.
              Our approach mixes natural light, composition and quiet moments to create meaningful photographs.
            </p>
          </div>
        </div>
      </header>

      {/* MISSION / PHILOSOPHY */}
      <section className="py-14">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className={`space-y-4 ${visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-6"} transition-all duration-700`}>
            <h2 className="text-2xl sm:text-3xl font-bold">Our Mission</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              To document real moments with respect, creativity and care. We believe photographs
              should feel honest and cinematic — a combination of emotion, light and thoughtful editing.
            </p>

            <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <li className="flex items-start gap-3">
                <div className="flex-none bg-cyan-600 text-white rounded-full w-9 h-9 flex items-center justify-center">✓</div>
                <div>
                  <div className="font-semibold">Client-first approach</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">Personalized planning & communication.</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="flex-none bg-cyan-600 text-white rounded-full w-9 h-9 flex items-center justify-center">★</div>
                <div>
                  <div className="font-semibold">Cinematic style</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">Colour grading & storytelling edits.</div>
                </div>
              </li>
            </ul>
          </div>

          <div className={`relative rounded-xl overflow-hidden shadow-xl ${visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-6"} transition-all duration-700`}>
            <img src="/images/img3.jpg" alt="Mission" className="w-full h-72 sm:h-96 object-cover" />
            <div className="absolute left-4 bottom-4 bg-white/90 dark:bg-black/70 px-3 py-1 rounded-full text-sm">Trusted • Professional</div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-8 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            {stats.map((s) => (
              <div key={s.id} className={`p-6 rounded-lg bg-white dark:bg-gray-700 shadow ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"} transition-all duration-700`}>
                <div className="text-3xl sm:text-4xl font-extrabold text-cyan-600">{counts[s.id]}+</div>
                <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-6">
          <h3 className="text-2xl font-bold text-center mb-8">Meet the Team</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {team.map((m, i) => (
              <div key={i} className={`rounded-xl overflow-hidden shadow-lg bg-white dark:bg-gray-800 transform hover:-translate-y-2 transition-all ${visible ? "opacity-100" : "opacity-0"} duration-700`} style={{ transitionDelay: `${i * 80}ms` }}>
                <div className="h-56 overflow-hidden">
                  <img src={m.img} alt={m.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-4">
                  <h4 className="font-semibold">{m.name}</h4>
                  <div className="text-sm text-gray-600 dark:text-gray-300">{m.title}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TIMELINE / MILESTONES */}
      <section className="py-12 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h3 className="text-2xl font-bold mb-6">Milestones</h3>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-center gap-6">
            <div className="flex-1">
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg shadow">
                <div className="text-xl font-bold">2018</div>
                <div className="text-sm text-gray-600 dark:text-gray-300 mt-1">Studio founded</div>
              </div>
            </div>
            <div className="flex-1">
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg shadow">
                <div className="text-xl font-bold">2019</div>
                <div className="text-sm text-gray-600 dark:text-gray-300 mt-1">100th wedding covered</div>
              </div>
            </div>
            <div className="flex-1">
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg shadow">
                <div className="text-xl font-bold">2022</div>
                <div className="text-sm text-gray-600 dark:text-gray-300 mt-1">Expanded team & studio</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h3 className="text-2xl font-bold mb-6">What Clients Say</h3>

          <div className="relative">
            {/* Simple carousel */}
            <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
              <p className="text-gray-700 dark:text-gray-200 italic">“{testimonials[tIdx].quote}”</p>
              <div className="mt-4 flex items-center gap-3 justify-center">
                <img src={testimonials[tIdx].avatar} alt={testimonials[tIdx].name} className="w-12 h-12 rounded-full object-cover" />
                <div className="text-left">
                  <div className="font-semibold">{testimonials[tIdx].name}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">{testimonials[tIdx].role}</div>
                </div>
              </div>
            </div>

            {/* controls */}
            <div className="flex gap-2 justify-center mt-4">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setTIdx(i)}
                  className={`h-2 w-8 rounded-full ${i === tIdx ? "bg-cyan-600" : "bg-gray-300 dark:bg-gray-600"}`}
                  aria-label={`Show testimonial ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-cyan-600 to-emerald-500 text-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h3 className="text-3xl font-bold mb-4">Ready to tell your story?</h3>
          <p className="mb-6 max-w-2xl mx-auto">Book a session or request a custom quote — we’d love to work with you.</p>
          <div className="flex items-center justify-center gap-4">
            <a href="/contact" className="px-6 py-3 bg-white text-cyan-600 rounded-lg font-semibold shadow hover:opacity-95">Book a Session</a>
            <a href="/galleries" className="px-6 py-3 border border-white/30 rounded-lg hover:bg-white/10">View Portfolio</a>
          </div>
        </div>
      </section>

     
    </main>
  );
}
