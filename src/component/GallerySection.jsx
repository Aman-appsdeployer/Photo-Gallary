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
      { threshold: 0.1 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  const sizeClasses = {
    large: "h-[360px]",
    small: "h-[200px]",
    tall: "h-[420px]",
    wide: "h-[260px]",
  };

  return (
    <section className="py-16" ref={containerRef}>
      {/* Heading */}
      <h2
        className={`text-3xl font-bold text-center mb-12 dark:text-gray-300 transition-all duration-700 -mt-36
          ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
      >
        Featured Wedding Gallery
      </h2>

      {/* Masonry Grid */}
      <div className="max-w-6xl mx-auto px-4 columns-1 sm:columns-2 md:columns-3 gap-4">
        {images.map((item, idx) => (
          <div
            key={idx}
            className={`relative mb-4 overflow-hidden rounded-xl shadow-md break-inside-avoid group 
              ${sizeClasses[item.size]}`}
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0px)" : "translateY(28px)",
              transition: `all 700ms cubic-bezier(.19,1,.22,1) ${idx * 120}ms`,
            }}
          >
            {/* Image */}
            <img
              src={item.src}
              alt="wedding gallery image"
              loading="lazy"
              className="w-full h-full object-cover rounded-xl transition-transform duration-[1200ms] group-hover:scale-110"
            />

            {/* Soft Glow Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition duration-700"></div>

            {/* Romantic floating heart / sparkle */}
            <div className="absolute bottom-3 right-3 text-rose-200 text-xl opacity-0 group-hover:opacity-100 transition duration-700">
              ✨
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}






