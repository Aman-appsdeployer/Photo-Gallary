import { useEffect, useRef, useState } from "react";

export default function GallerySection() {
  const images = [
    { src: "/images/img12.jpg", size: "large" },
    { src: "/images/img21.jpg", size: "tall" },
    { src: "/images/img133.jpg", size: "wide" },
    { src: "/images/img144.jpg", size: "small" },
    { src: "/images/images.jpg", size: "tall" },
    { src: "/images/wed.jpg", size: "large" },
    { src: "/images/kk.jpg", size: "large" },
  ];

  const containerRef = useRef(null);
  const [visible, setVisible] = useState(false);

  // Fade-in trigger
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  const sizeClasses = {
    large: "h-[360px]",
    small: "h-[220px]",
    tall: "h-[460px]",
    wide: "h-[260px]",
  };

  return (
    <section className="py-24 relative overflow-hidden -mt-40" ref={containerRef}>

      {/* Soft Pink Glow Background */}
      <div className="absolute -top-24 left-10 w-[420px] h-[420px] bg-rose-200/30 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-[380px] h-[380px] bg-pink-300/30 blur-[120px] rounded-full"></div>

      {/* Floating Gold Dust Particles */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {Array.from({ length: 25 }).map((_, i) => (
          <span
            key={i}
            className="absolute bg-yellow-300/30 rounded-full blur-sm"
            style={{
              width: Math.random() * 6 + 3 + "px",
              height: Math.random() * 6 + 3 + "px",
              top: Math.random() * 100 + "%",
              left: Math.random() * 100 + "%",
              animation: `floatUp 6s ease-in-out ${i * 0.5}s infinite`,
            }}
          ></span>
        ))}
      </div>

      {/* Heading */}
      <h2
        className={`text-4xl font-bold text-center mb-16 text-gray-900 dark:text-gray-200 transition-all duration-[900ms] 
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      >
        Our Cinematic Wedding Gallery
      </h2>

      {/* Masonry Grid */}
      <div className="max-w-6xl mx-auto px-4 columns-1 sm:columns-2 md:columns-3 gap-6 relative z-10">
        {images.map((item, idx) => (
          <div
            key={idx}
            className={`relative mb-6 rounded-3xl overflow-hidden shadow-xl shadow-rose-300/30 group break-inside-avoid cursor-pointer border border-white/30 backdrop-blur-sm
              ${sizeClasses[item.size]}`}
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0px)" : "translateY(40px)",
              transition: `all 900ms cubic-bezier(.19,1,.22,1) ${idx * 130}ms`,
            }}
          >
            {/* Image */}
            <img
              src={item.src}
              alt="wedding gallery item"
              className="w-full h-full object-cover transition-all duration-[1500ms] group-hover:scale-110"
            />

            {/* Elegant Rose Tint Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-rose-600/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-700"></div>

            {/* Gold Shine Swipe */}
            <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.5)_50%,rgba(255,255,255,0)_100%)]
            w-full h-full translate-x-[-120%] group-hover:translate-x-[120%] transition-all duration-[1200ms] opacity-30"></div>

            {/* Romantic Heart */}
            <span className="absolute right-4 bottom-4 text-rose-100 text-3xl opacity-0 group-hover:opacity-100 transition duration-700">
              ❤️
            </span>
          </div>
        ))}
      </div>

      {/* floatUp animation */}
      <style>
        {`
          @keyframes floatUp {
            0% { transform: translateY(0) scale(1); }
            50% { transform: translateY(-40px) scale(1.3); opacity: 1; }
            100% { transform: translateY(0) scale(1); opacity: 0.4; }
          }
        `}
      </style>
    </section>
  );
}
