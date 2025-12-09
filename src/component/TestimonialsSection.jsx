import { Camera, ChevronLeft, ChevronRight, Heart, Star } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { FaRing } from "react-icons/fa";
import { GiFlowerPot, GiFlowers, GiRose } from "react-icons/gi";
import { LuSparkles } from "react-icons/lu";




export default function TestimonialsSection() {
    const reviews = [
        {
            name: " Priya",
            text: "Anjali captured our wedding with so much love. The photos feel magical — every frame brings tears of joy!",
            img: "/images/img21.jpg",
            city: "Jaipur",
        },
        {
            name: " Meera",
            text: "The candid shots were unbelievable. Every moment feels alive and so natural. Highly recommend!",
            img: "/images/img144.jpg",
            city: "Mumbai",
        },
        {
            name: " Anjali",
            text: "Our pre-wedding shoot looked like a movie! The colours, the mood, the framing — perfect memories.",
            img: "/images/img3.jpg",
            city: "Bengaluru",
        },
    ];

    const [active, setActive] = useState(0);
    const [paused, setPaused] = useState(false);
    const timeoutRef = useRef(null);
    const containerRef = useRef(null);

    // autoplay
    useEffect(() => {
        if (paused) return;
        timeoutRef.current = setTimeout(() => {
            setActive((p) => (p + 1) % reviews.length);
        }, 5500);
        return () => clearTimeout(timeoutRef.current);
    }, [active, paused, reviews.length]);

    // keyboard nav
    useEffect(() => {
        const onKey = (e) => {
            if (e.key === "ArrowLeft") setActive((p) => (p - 1 + reviews.length) % reviews.length);
            if (e.key === "ArrowRight") setActive((p) => (p + 1) % reviews.length);
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [reviews.length]);

    // swipe support
    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;
        let startX = 0;
        const down = (e) => (startX = e.touches ? e.touches[0].clientX : e.clientX);
        const up = (e) => {
            const endX = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
            const diff = startX - endX;
            if (diff > 40) setActive((p) => (p + 1) % reviews.length);
            if (diff < -40) setActive((p) => (p - 1 + reviews.length) % reviews.length);
        };
        el.addEventListener("touchstart", down, { passive: true });
        el.addEventListener("mousedown", down);
        el.addEventListener("touchend", up, { passive: true });
        el.addEventListener("mouseup", up);
        return () => {
            el.removeEventListener("touchstart", down);
            el.removeEventListener("mousedown", down);
            el.removeEventListener("touchend", up);
            el.removeEventListener("mouseup", up);
        };
    }, [reviews.length]);

    return (
        <section
            ref={containerRef}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            aria-label="Client testimonials"
            className="py-16 bg-gradient-to-b from-rose-50 to-white dark:from-gray-900 dark:to-gray-800 -mt-20"
        >
            {/* Decorative garland / header */}
            <div className="max-w-4xl mx-auto text-center px-6">
                <div className="mx-auto mb-6 w-full flex justify-center items-center gap-4">
                    {/* Wedding Garland Made Using React Icons */}
                    <div className="flex items-center gap-3 text-rose-400 text-3xl select-none">

                        <GiRose className="animate-slow-sway" />
                        <GiFlowers className="animate-slow-sway" />
                        <FaRing className="animate-slow-sway text-yellow-500" />
                        <LuSparkles className="animate-slow-sway text-pink-400" />
                        <GiFlowerPot className="animate-slow-sway" />

                    </div>
                </div>
               

                <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 dark:text-gray-200">
                    What Our Couples Say
                </h2>
                <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                    Heartfelt words from real couples — moments we had the honour to capture.
                </p>
            </div>

            {/* Cards container */}
            <div className="max-w-4xl mx-auto px-6 mt-10 relative">
                {/* Navigation arrows */}
                <button
                    aria-label="Previous testimonial"
                    onClick={() => setActive((p) => (p - 1 + reviews.length) % reviews.length)}
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white/90 dark:bg-gray-800 p-2 rounded-full shadow hover:scale-105 transition-transform"
                >
                    <ChevronLeft className="w-6 h-6 text-rose-500" />
                </button>

                <button
                    aria-label="Next testimonial"
                    onClick={() => setActive((p) => (p + 1) % reviews.length)}
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white/90 dark:bg-gray-800 p-2 rounded-full shadow hover:scale-105 transition-transform"
                >
                    <ChevronRight className="w-6 h-6 text-rose-500" />
                </button>

                {/* Sliding cards */}
                <div className="relative h-40 sm:h-48">
                    {reviews.map((r, i) => {
                        const offset = (i - active + reviews.length) % reviews.length;
                        // offset === 0 visible, 1 next, else hidden behind
                        const isActive = offset === 0;
                        const isPrev = offset === reviews.length - 1;
                        return (
                            <article
                                key={r.name}
                                className={`absolute inset-0 mx-auto w-full max-w-3xl transition-all duration-700 ease-[cubic-bezier(.2,.9,.3,1)]
                  ${isActive ? "opacity-100 translate-y-0 scale-100 z-10" : "opacity-0 pointer-events-none scale-95"}
                  ${isPrev ? "opacity-0 translate-y-4" : ""}`}
                                style={{ left: 0 }}
                                aria-hidden={!isActive}
                                tabIndex={isActive ? 0 : -1}
                            >
                                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 flex flex-col md:flex-row gap-6 items-center transform transition-transform duration-500">
                                    <div className="relative w-28 h-28 flex-shrink-0">
                                        <img src={r.img} alt={r.name} className="w-28 h-28 object-cover rounded-full shadow-lg" />
                                        <div className="absolute -bottom-1 -right-1 bg-rose-50 dark:bg-gray-700 rounded-full p-1 border border-white/60">
                                            <Camera className="w-4 h-4 text-rose-500" />
                                        </div>
                                    </div>

                                    <div className="flex-1">
                                        <p className="text-gray-700 dark:text-gray-300 text-lg italic leading-relaxed mb-3">“{r.text}”</p>

                                        <div className="flex items-center justify-between gap-4">
                                            <div>
                                                <h4 className="text-cyan-600 font-bold">{r.name}</h4>
                                                <div className="text-xs text-gray-500">{r.city}</div>
                                            </div>

                                            <div className="flex items-center gap-2">
                                                {/* rating sparkles */}
                                                <div className="flex items-center gap-1 bg-rose-50 dark:bg-gray-700 px-2 py-1 rounded-full">
                                                    <Star className="w-4 h-4 text-amber-400" />
                                                    <span className="text-sm font-semibold text-amber-600">5.0</span>
                                                </div>

                                                {/* heart CTA */}
                                                <button
                                                    onClick={() => {
                                                        // small local heart animation (no persistence)
                                                        const el = document.getElementById(`heart-${i}`);
                                                        if (!el) return;
                                                        el.classList.add("animate-heart-burst");
                                                        setTimeout(() => el.classList.remove("animate-heart-burst"), 700);
                                                    }}
                                                    aria-label={`Love ${r.name}'s testimonial`}
                                                    className="p-2 rounded-full bg-white/90 dark:bg-gray-700 shadow hover:scale-105 transition-transform"
                                                >
                                                    <Heart id={`heart-${i}`} className="w-5 h-5 text-rose-500" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </article>
                        );
                    })}
                </div>

                {/* Dots */}
                <div className="mt-6 flex justify-center gap-3">
                    {reviews.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setActive(i)}
                            aria-label={`Go to testimonial ${i + 1}`}
                            className={`w-3 h-3 rounded-full transition-all ${i === active ? "bg-rose-500 scale-110" : "bg-white/60 hover:bg-white"}`}
                        />
                    ))}
                </div>
            </div>

            {/* small inline styles for animations */}
            <style>{`
        /* slow swaying garland icons */
        @keyframes slowSway {
          0% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-6px) rotate(6deg); }
          100% { transform: translateY(0) rotate(0deg); }
        }
        .animate-slow-sway { animation: slowSway 4200ms ease-in-out infinite; }

        /* heart burst */
        @keyframes heartBurst {
          0% { transform: scale(1); opacity: 1; filter: drop-shadow(0 0 0 rgba(255,0,0,0.0)); }
          40% { transform: scale(1.35); opacity: 1; filter: drop-shadow(0 6px 12px rgba(255,0,100,0.12)); }
          100% { transform: scale(1); opacity: 1; filter: drop-shadow(0 0 0 rgba(255,0,0,0.0)); }
        }
        .animate-heart-burst { animation: heartBurst 700ms cubic-bezier(.2,.9,.3,1); }

        /* small responsive tweak */
        @media (min-width: 768px) {
          .max-w-4xl { max-width: 56rem; }
        }

        @keyframes slowSway {
  0% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-6px) rotate(3deg); }
  100% { transform: translateY(0) rotate(0deg); }
}

.animate-slow-sway {
  animation: slowSway 4s ease-in-out infinite;
}

      `}</style>
        </section>
    );
}
