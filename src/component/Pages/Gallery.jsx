// src/component/Pages/Gallery.jsx
import { useEffect, useMemo, useState } from "react";

const IMAGES_PER_PAGE = 8;

const imagesData = [
  /* Replace these with your real image paths in /public/gallery or /images */
  { src: "/images/img1.jpg", title: "Golden Hour Bride", category: "Wedding" },
  { src: "/images/img2.jpg", title: "Urban Portrait", category: "Portrait" },
  { src: "/images/kk.jpg", title: "Mountain Sunrise", category: "Travel" },
  { src: "/gallery/g4.jpg", title: "Corporate Event", category: "Events" },
  { src: "/gallery/g5.jpg", title: "Candid Moment", category: "Wedding" },
  { src: "/gallery/g6.jpg", title: "Studio Headshot", category: "Portrait" },
  { src: "/gallery/g7.jpg", title: "Coastal Roadtrip", category: "Travel" },
  { src: "/gallery/g8.jpg", title: "Birthday Party Fun", category: "Events" },
  { src: "/gallery/g9.jpg", title: "Bridal Portrait", category: "Wedding" },
  { src: "/gallery/g10.jpg", title: "Soft Light Portrait", category: "Portrait" },
  { src: "/gallery/g11.jpg", title: "Desert Dunes", category: "Travel" },
  { src: "/gallery/g12.jpg", title: "Festival Coverage", category: "Events" },
  { src: "/gallery/g13.jpg", title: "Riverside Couple", category: "Wedding" },
  { src: "/gallery/g14.jpg", title: "Environmental Portrait", category: "Portrait" },
  { src: "/gallery/g15.jpg", title: "Tropical Escape", category: "Travel" },
  { src: "/gallery/g16.jpg", title: "Conference Highlights", category: "Events" },
];

const CATEGORIES = ["All", "Wedding", "Portrait", "Travel", "Events"];

export default function Gallery() {
  const [category, setCategory] = useState("All");
  const [page, setPage] = useState(1);
  const [lightboxIndex, setLightboxIndex] = useState(null); // null = closed
  const filtered = useMemo(() => {
    return imagesData.filter((img) => (category === "All" ? true : img.category === category));
  }, [category]);

  const visibleImages = useMemo(() => {
    return filtered.slice(0, page * IMAGES_PER_PAGE);
  }, [filtered, page]);

  useEffect(() => {
    // reset pagination when category changes
    setPage(1);
  }, [category]);

  // keyboard navigation for lightbox
  useEffect(() => {
    const onKey = (e) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowRight") setLightboxIndex((i) => (i + 1) % visibleImages.length);
      if (e.key === "ArrowLeft") setLightboxIndex((i) => (i - 1 + visibleImages.length) % visibleImages.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxIndex, visibleImages.length]);

  const openLightbox = (globalIndex) => {
    // find index within visibleImages
    const idx = visibleImages.findIndex((img) => img.src === globalIndex.src && img.title === globalIndex.title);
    if (idx >= 0) setLightboxIndex(idx);
  };

  const closeLightbox = () => setLightboxIndex(null);

  const showMore = () => setPage((p) => p + 1);

  return (
    <main className="pt-28 pb-20 bg-white dark:bg-gray-900 min-h-screen text-gray-900 dark:text-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <header className="mb-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold">Featured Gallery</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            A curated selection of wedding, portrait, travel and event photography.
          </p>
        </header>

        {/* Filters */}
        <nav aria-label="Gallery categories" className="mb-6 flex flex-wrap gap-3 justify-center">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
                category === cat
                  ? "bg-cyan-600 text-white shadow-lg"
                  : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-700 hover:scale-105"
              }`}
              aria-pressed={category === cat}
            >
              {cat}
            </button>
          ))}
        </nav>

        {/* Grid */}
        <section>
          <div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
            aria-live="polite"
          >
            {visibleImages.map((img, i) => (
              <figure
                key={img.src + i}
                className="group relative rounded-xl overflow-hidden cursor-pointer bg-gray-100 dark:bg-gray-800"
                onClick={() => openLightbox(img)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter") openLightbox(img);
                }}
              >
                <img
                  src={img.src}
                  alt={img.title}
                  loading="lazy"
                  className="w-full h-56 object-cover transform group-hover:scale-105 transition duration-500"
                />
                <figcaption className="absolute left-0 right-0 bottom-0 p-3 bg-gradient-to-t from-black/70 to-transparent text-white">
                  <div className="text-sm font-semibold">{img.title}</div>
                  <div className="text-xs opacity-90">{img.category}</div>
                </figcaption>
              </figure>
            ))}
          </div>

          {/* No results */}
          {visibleImages.length === 0 && (
            <div className="py-12 text-center text-gray-500">No images found for "{category}".</div>
          )}

          {/* Load more */}
          {visibleImages.length < filtered.length && (
            <div className="mt-8 text-center">
              <button
                onClick={showMore}
                className="px-6 py-3 rounded-full bg-cyan-600 text-white font-semibold hover:bg-cyan-700 transition-shadow shadow"
              >
                Load more
              </button>
            </div>
          )}
        </section>

        {/* Lightbox */}
        {lightboxIndex !== null && visibleImages[lightboxIndex] && (
          <div
            role="dialog"
            aria-modal="true"
            aria-label={visibleImages[lightboxIndex].title}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
            onClick={closeLightbox}
          >
            <div
              className="relative max-w-4xl w-full rounded-md bg-transparent"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                aria-label="Close"
                onClick={closeLightbox}
                className="absolute top-3 right-3 text-white bg-black/40 rounded-full p-2 hover:bg-black/60"
              >
                ✕
              </button>

              <button
                aria-label="Previous"
                onClick={() => setLightboxIndex((i) => (i - 1 + visibleImages.length) % visibleImages.length)}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-white bg-black/40 rounded-full p-2 hover:bg-black/60"
              >
                ‹
              </button>

              <button
                aria-label="Next"
                onClick={() => setLightboxIndex((i) => (i + 1) % visibleImages.length)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white bg-black/40 rounded-full p-2 hover:bg-black/60"
              >
                ›
              </button>

              <div className="rounded-md overflow-hidden">
                <img
                  src={visibleImages[lightboxIndex].src}
                  alt={visibleImages[lightboxIndex].title}
                  className="w-full max-h-[80vh] object-contain bg-black"
                />
                <div className="p-4 bg-white dark:bg-gray-900">
                  <h2 className="text-lg font-semibold">{visibleImages[lightboxIndex].title}</h2>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{visibleImages[lightboxIndex].category}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
