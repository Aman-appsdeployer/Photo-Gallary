import { useEffect, useMemo, useRef, useState } from "react";

const IMAGES_PER_PAGE = 8;

const imagesData = [
  { src: "/images/img1.jpg", title: "Golden Hour Bride", category: "Wedding" },
  { src: "/images/img2.jpg", title: "Urban Portrait", category: "Portrait" },
  { src: "/images/kk.jpg", title: "Mountain Sunrise", category: "Travel" },
  { src: "/images/img13.jpg", title: "Corporate Event", category: "Events" },
  { src: "/images/img12.jpg", title: "Candid Moment", category: "Wedding" },
  { src: "/images/img21.jpg", title: "Studio Headshot", category: "Portrait" },
  { src: "/images/img133.jpg", title: "Coastal Roadtrip", category: "Travel" },
  { src: "/images/img144.jpg", title: "Birthday Party Fun", category: "Events" },
  { src: "/images/images.jpg", title: "Bridal Portrait", category: "Wedding" },
  { src: "/images/wed.jpg", title: "Soft Light Portrait", category: "Portrait" },
  { src: "/images/img11.jpg", title: "Desert Dunes", category: "Travel" },
  { src: "/images/img12.jpg", title: "Festival Coverage", category: "Events" },
  { src: "/images/img133.jpg", title: "Riverside Couple", category: "Wedding" },
];

const CATEGORIES = ["All", "Wedding", "Portrait", "Travel", "Events"];

export default function Gallery() {
  const [category, setCategory] = useState("All");
  const [page, setPage] = useState(1);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [heroVisible, setHeroVisible] = useState(false);
  const [pageVisible, setPageVisible] = useState(false);
  const [loadedMap, setLoadedMap] = useState({});
  const revealObserverRef = useRef(null);

  /* fade hero & page */
  useEffect(() => {
    setTimeout(() => setHeroVisible(true), 150);
    setTimeout(() => setPageVisible(true), 450);
  }, []);

  /* filtering logic */
  const filtered = useMemo(() => {
    return imagesData.filter((img) =>
      category === "All" ? true : img.category === category
    );
  }, [category]);

  const visibleImages = useMemo(() => {
    return filtered.slice(0, page * IMAGES_PER_PAGE);
  }, [filtered, page]);

  useEffect(() => setPage(1), [category]);

  /* lightbox keyboard nav */
  useEffect(() => {
    const onKey = (e) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowRight")
        setLightboxIndex((i) => (i + 1) % visibleImages.length);
      if (e.key === "ArrowLeft")
        setLightboxIndex((i) => (i - 1 + visibleImages.length) % visibleImages.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxIndex, visibleImages.length]);

  /* reveal on scroll */
  useEffect(() => {
    const els = document.querySelectorAll(".reveal-item");

    revealObserverRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((ent) => {
          if (ent.isIntersecting) {
            ent.target.classList.add("show");
            revealObserverRef.current.unobserve(ent.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    els.forEach((el) => revealObserverRef.current.observe(el));

    return () => revealObserverRef.current?.disconnect();
  }, [visibleImages]);

  /* image loaded blur removal */
  const markLoaded = (k) => {
    setLoadedMap((m) => ({ ...m, [k]: true }));
  };

  /* scroll to gallery */
  const scrollToGallery = () => {
    window.scrollTo({
      top: window.innerHeight - 80,
      behavior: "smooth",
    });
  };

  return (
    <main className="relative bg-white dark:bg-gray-900 min-h-screen text-gray-900 dark:text-gray-100">

      {/* ------------------- HERO SECTION ------------------- */}
      <section className="relative h-[72vh] sm:h-[76vh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/wed.jpg"
            className={`w-full h-full object-cover transition-all duration-[7000ms] ${
              heroVisible ? "scale-100" : "scale-110"
            }`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
        </div>

        <div className="relative z-10 flex items-center justify-center h-full px-6">
          <div className="text-center max-w-3xl">
            <h1
              className={`text-4xl sm:text-6xl font-bold text-white drop-shadow-xl transition duration-700 ${
                heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
              }`}
            >
              Wedding Memories <span className="text-rose-200">Gallery</span>
            </h1>

            <p
              className={`mt-4 text-lg sm:text-xl text-white/90 transition duration-700 delay-150 ${
                heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
              }`}
            >
              A cinematic collection of love and emotions captured with elegance.
            </p>

            <button
              onClick={scrollToGallery}
              className={`mt-6 px-8 py-3 rounded-full bg-rose-500 text-white shadow-lg transition duration-700 ${
                heroVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"
              }`}
            >
              Explore Gallery ↓
            </button>
          </div>
        </div>
      </section>

      {/* ------------------- GALLERY SECTION ------------------- */}
      <section
        className={`relative pt-20 pb-24 px-4 max-w-7xl mx-auto transition-all duration-700 ${
          pageVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        {/* centered filters */}
        <div className="flex flex-col items-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-center">Featured Gallery</h2>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-300 text-center">
            Showing <b>{visibleImages.length}</b> of <b>{filtered.length}</b> photos
          </p>

          <div className="flex flex-wrap gap-3 justify-center mt-5">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  category === cat
                    ? "bg-rose-500 text-white shadow-md scale-105"
                    : "bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:scale-105"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 4-column modern grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {visibleImages.map((img, i) => {
            const key = `${img.src}-${i}`;
            const loaded = loadedMap[key];

            return (
              <div
                key={key}
                className="reveal-item opacity-0 translate-y-6 transition-all duration-700 cursor-pointer group"
                onClick={() => setLightboxIndex(i)}
              >
                <div className="relative overflow-hidden rounded-2xl shadow-lg transition transform group-hover:scale-[1.03] group-hover:shadow-2xl">

                  <img
                    src={img.src}
                    onLoad={() => markLoaded(key)}
                    className={`w-full h-[400px] object-cover rounded-2xl transition-all duration-700 ${
                      loaded ? "opacity-100 blur-0 scale-100"
                             : "opacity-80 blur-sm scale-105"
                    }`}
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-500"></div>

                  <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition duration-500">
                    <h3 className="text-white text-lg font-semibold drop-shadow">{img.title}</h3>
                    <p className="text-rose-200 text-xs">{img.category}</p>
                  </div>

                  <div className="absolute inset-0 rounded-2xl ring-0 group-hover:ring-2 group-hover:ring-rose-300/50 transition duration-500"></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* load more */}
        {visibleImages.length < filtered.length && (
          <div className="mt-10 text-center">
            <button
              onClick={() => setPage((p) => p + 1)}
              className="px-8 py-3 rounded-full bg-rose-500 text-white font-semibold shadow-lg hover:scale-105 transition"
            >
              Load More
            </button>
          </div>
        )}
      </section>

      {/* ------------------- LIGHTBOX ------------------- */}
      {lightboxIndex !== null && visibleImages[lightboxIndex] && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setLightboxIndex(null)}
        >
          <div className="relative max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            <button
              className="absolute top-4 right-4 bg-black/50 text-white rounded-full px-3 py-1"
              onClick={() => setLightboxIndex(null)}
            >
              ✕
            </button>

            <img
              src={visibleImages[lightboxIndex].src}
              className="w-full max-h-[80vh] object-contain rounded-xl animate-zoomIn"
            />

            <div className="mt-3 p-4 bg-white dark:bg-gray-900 rounded-xl">
              <h3 className="text-xl font-semibold">{visibleImages[lightboxIndex].title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">{visibleImages[lightboxIndex].category}</p>
            </div>
          </div>
        </div>
      )}

      {/* styles */}
      <style>{`
        .reveal-item.show {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
        @keyframes zoomIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-zoomIn {
          animation: zoomIn 0.4s ease-out;
        }
      `}</style>
    </main>
  );
}














// // src/component/Pages/Gallery.jsx
// import { useEffect, useMemo, useRef, useState } from "react";

// const IMAGES_PER_PAGE = 9;

// const imagesData = [
//   { src: "/images/img1.jpg", title: "Golden Hour Bride", category: "Wedding" },
//   { src: "/images/img2.jpg", title: "Urban Portrait", category: "Portrait" },
//   { src: "/images/kk.jpg", title: "Mountain Sunrise", category: "Travel" },
//   { src: "/images/img13.jpg", title: "Corporate Event", category: "Events" }, // fixed path
//   { src: "/images/img12.jpg", title: "Candid Moment", category: "Wedding" },
//   { src: "/images/img21.jpg", title: "Studio Headshot", category: "Portrait" },
//   { src: "/images/img133.jpg", title: "Coastal Roadtrip", category: "Travel" },
//   { src: "/images/img144.jpg", title: "Birthday Party Fun", category: "Events" },
//   { src: "/images/images.jpg", title: "Bridal Portrait", category: "Wedding" },
//   { src: "/images/wed.jpg", title: "Soft Light Portrait", category: "Portrait" },
//   { src: "/images/img11.jpg", title: "Desert Dunes", category: "Travel" },
//   { src: "/images/img12.jpg", title: "Festival Coverage", category: "Events" },
//   { src: "/images/img133.jpg", title: "Riverside Couple", category: "Wedding" },
// ];

// const CATEGORIES = ["All", "Wedding", "Portrait", "Travel", "Events"];

// export default function Gallery() {
//   const [category, setCategory] = useState("All");
//   const [page, setPage] = useState(1);
//   const [lightboxIndex, setLightboxIndex] = useState(null);
//   const [heroVisible, setHeroVisible] = useState(false);
//   const [pageVisible, setPageVisible] = useState(false);
//   const [loadedMap, setLoadedMap] = useState({}); // track loaded images by src+index
//   const revealObserverRef = useRef(null);
//   const filtersRef = useRef(null);

//   /* fade hero in then page */
//   useEffect(() => {
//     const t1 = setTimeout(() => setHeroVisible(true), 120);
//     const t2 = setTimeout(() => setPageVisible(true), 420);
//     return () => {
//       clearTimeout(t1);
//       clearTimeout(t2);
//     };
//   }, []);

//   /* Filtered list & visible images for pagination */
//   const filtered = useMemo(() => {
//     return imagesData.filter((img) => (category === "All" ? true : img.category === category));
//   }, [category]);

//   const visibleImages = useMemo(() => {
//     return filtered.slice(0, page * IMAGES_PER_PAGE);
//   }, [filtered, page]);

//   useEffect(() => setPage(1), [category]);

//   /* keyboard nav for lightbox */
//   useEffect(() => {
//     const onKey = (e) => {
//       if (lightboxIndex === null) return;
//       if (e.key === "Escape") setLightboxIndex(null);
//       if (e.key === "ArrowRight") setLightboxIndex((i) => (i + 1) % visibleImages.length);
//       if (e.key === "ArrowLeft") setLightboxIndex((i) => (i - 1 + visibleImages.length) % visibleImages.length);
//     };
//     window.addEventListener("keydown", onKey);
//     return () => window.removeEventListener("keydown", onKey);
//   }, [lightboxIndex, visibleImages.length]);

//   /* reveal on scroll (for gallery items) */
//   useEffect(() => {
//     const els = document.querySelectorAll(".reveal-item");
//     if (!els || els.length === 0) return;

//     revealObserverRef.current = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             entry.target.classList.add("show");
//             // optional: unobserve to avoid repeated triggers
//             revealObserverRef.current.unobserve(entry.target);
//           }
//         });
//       },
//       { threshold: 0.12 }
//     );

//     els.forEach((el) => revealObserverRef.current.observe(el));

//     return () => {
//       if (revealObserverRef.current) revealObserverRef.current.disconnect();
//     };
//   }, [visibleImages]);

//   /* helper: mark image loaded so we remove blur */
//   const markLoaded = (key) => {
//     setLoadedMap((m) => ({ ...m, [key]: true }));
//   };

//   /* UI helpers */
//   const openLightbox = (index) => setLightboxIndex(index);
//   const closeLightbox = () => setLightboxIndex(null);
//   const nextLightbox = (e) => {
//     e.stopPropagation();
//     setLightboxIndex((i) => (i + 1) % visibleImages.length);
//   };
//   const prevLightbox = (e) => {
//     e.stopPropagation();
//     setLightboxIndex((i) => (i - 1 + visibleImages.length) % visibleImages.length);
//   };

//   /* scroll to gallery (hero CTA) */
//   const scrollToGallery = () => {
//     // the gallery section starts after hero; scroll to top of gallery
//     const offset = window.innerHeight * 0.75;
//     window.scrollTo({ top: offset, behavior: "smooth" });
//   };

//   return (
//     <main className="relative bg-white dark:bg-gray-900 min-h-screen text-gray-900 dark:text-gray-100">
//       {/* ========== HERO ========== */}
//       <section
//         aria-label="Gallery hero"
//         className="relative h-[72vh] sm:h-[76vh] overflow-hidden"
//       >
//         {/* background image (subtle ken burns) */}
//         <div className="absolute inset-0">
//           <img
//             src="/images/wed.jpg"
//             alt="Wedding hero"
//             className={`w-full h-full object-cover transition-transform duration-[12000ms] ${
//               heroVisible ? "scale-100" : "scale-105"
//             }`}
//             loading="lazy"
//           />
//           <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/20 to-transparent" />
//         </div>

//         {/* limited floating petals + hearts (small number for perf) */}
//         {[...Array(9)].map((_, i) => (
//           <span
//             key={i}
//             aria-hidden
//             className="absolute pointer-events-none select-none text-white/80"
//             style={{
//               left: `${10 + Math.random() * 80}%`,
//               top: `${5 + Math.random() * 85}%`,
//               fontSize: `${12 + Math.random() * 24}px`,
//               animation: `petalFloat ${6 + Math.random() * 6}s linear infinite`,
//               animationDelay: `${Math.random() * 3}s`,
//             }}
//           >
//             {Math.random() > 0.7 ? "♥" : "❀"}
//           </span>
//         ))}

//         {/* hero content */}
//         <div className="relative z-10 flex h-full items-center justify-center px-6">
//           <div className="text-center max-w-3xl">
//             <h1
//               className={`text-4xl sm:text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg leading-tight transition-all duration-700 ${
//                 heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
//               }`}
//             >
//               Wedding Memories <span className="text-rose-200">Gallery</span>
//             </h1>

//             <p
//               className={`mt-4 text-lg sm:text-xl text-white/90 transition-all duration-700 delay-150 ${
//                 heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
//               }`}
//             >
//               A cinematic collection of love, candid moments and timeless portraits — curated with heart.
//             </p>

//             <div className="mt-6 flex items-center justify-center gap-4">
//               <button
//                 onClick={scrollToGallery}
//                 className={`px-6 py-3 rounded-full bg-rose-500 text-white font-semibold shadow-lg transform transition-all duration-500 ${
//                   heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6 scale-95"
//                 }`}
//               >
//                 Explore Gallery ↓
//               </button>

//               <a
//                 href="/contact"
//                 className={`px-4 py-2 rounded-full border border-white/30 text-white/90 hover:bg-white/10 transition ${
//                   heroVisible ? "opacity-100" : "opacity-0"
//                 }`}
//               >
//                 Book a Session
//               </a>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* ========== GALLERY CONTENT ========== */}
//       <section
//         aria-label="Gallery content"
//         className={`relative pt-16 pb-24 px-4 max-w-7xl mx-auto transition-all duration-700 ${
//           pageVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
//         }`}
//       >
//         {/* top info bar */}
//         <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 z-10 relative">
//           <div className="text-center md:text-left">
//             <h2 className="text-2xl md:text-3xl font-extrabold">Featured Gallery</h2>
//             <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
//               Showing <span className="font-semibold">{visibleImages.length}</span> of{" "}
//               <span className="font-semibold">{filtered.length}</span> photos
//             </p>
//           </div>

//           {/* filters */}
//           <div ref={filtersRef} className="flex flex-wrap gap-3 justify-center md:justify-end">
//             {CATEGORIES.map((cat) => (
//               <button
//                 key={cat}
//                 onClick={() => setCategory(cat)}
//                 className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
//                   category === cat
//                     ? "bg-rose-500 text-white shadow-md transform scale-105"
//                     : "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:scale-[1.03]"
//                 }`}
//                 aria-pressed={category === cat}
//               >
//                 {cat}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* masonry-like columns */}
//         <div className="relative z-10">
//           <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-5 space-y-5">
//             {visibleImages.map((img, i) => {
//               const key = `${img.src}-${i}`;
//               const loaded = !!loadedMap[key];
//               return (
//                 <figure
//                   key={key}
//                   className="reveal-item opacity-0 transform translate-y-6 transition-all duration-700 break-inside-avoid rounded-2xl overflow-hidden shadow-lg group cursor-pointer"
//                   onClick={() => openLightbox(i)}
//                 >
//                   {/* progressive blur -> sharp */}
//                   <img
//                     src={img.src}
//                     alt={img.title}
//                     loading="lazy"
//                     onLoad={() => markLoaded(key)}
//                     className={`w-full rounded-xl object-cover transition-all duration-700 ${
//                       loaded ? "opacity-100 blur-0 scale-100" : "opacity-80 blur-sm scale-102"
//                     }`}
//                     style={{ aspectRatio: "4/5", width: "100%", display: "block" }}
//                   />

//                   {/* hover overlay */}
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition duration-600" />

//                   {/* caption */}
//                   <figcaption className="absolute left-4 bottom-4 text-white opacity-0 group-hover:opacity-100 transition duration-600">
//                     <div className="font-semibold text-lg drop-shadow">{img.title}</div>
//                     <div className="text-xs opacity-90">{img.category}</div>
//                   </figcaption>
//                 </figure>
//               );
//             })}
//           </div>

//           {/* load more */}
//           {visibleImages.length < filtered.length && (
//             <div className="mt-10 text-center">
//               <button
//                 onClick={() => setPage((p) => p + 1)}
//                 className="inline-block px-8 py-3 rounded-full bg-rose-500 text-white font-semibold shadow-lg hover:scale-105 transition-transform"
//               >
//                 Load more
//               </button>
//             </div>
//           )}
//         </div>
//       </section>

//       {/* ========== LIGHTBOX ========== */}
//       {lightboxIndex !== null && visibleImages[lightboxIndex] && (
//         <div
//           role="dialog"
//           aria-modal="true"
//           className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
//           onClick={closeLightbox}
//         >
//           <div
//             className="relative w-full max-w-4xl rounded-xl"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <button
//               aria-label="Close"
//               onClick={closeLightbox}
//               className="absolute top-4 right-4 z-30 bg-black/50 text-white rounded-full p-2 hover:bg-black/70"
//             >
//               ✕
//             </button>

//             <button
//               aria-label="Previous"
//               onClick={prevLightbox}
//               className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-black/50 text-white rounded-full p-2 hover:bg-black/70"
//             >
//               ‹
//             </button>

//             <button
//               aria-label="Next"
//               onClick={nextLightbox}
//               className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-black/50 text-white rounded-full p-2 hover:bg-black/70"
//             >
//               ›
//             </button>

//             <div className="rounded-xl overflow-hidden bg-black">
//               <img
//                 src={visibleImages[lightboxIndex].src}
//                 alt={visibleImages[lightboxIndex].title}
//                 className="w-full max-h-[80vh] object-contain animate-zoomIn"
//               />
//             </div>

//             <div className="mt-4 p-4 bg-white dark:bg-gray-900 rounded-b-xl shadow-lg">
//               <h3 className="text-xl font-bold">{visibleImages[lightboxIndex].title}</h3>
//               <p className="text-sm text-gray-600 dark:text-gray-300">{visibleImages[lightboxIndex].category}</p>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* ===== Animations & small helpers ===== */}
//       <style>{`
//         @keyframes petalFloat {
//           0% { transform: translateY(0) rotate(0deg); opacity: 0.7; }
//           50% { opacity: 1; }
//           100% { transform: translateY(-70px) rotate(12deg); opacity: 0.6; }
//         }
//         @keyframes floatUp {
//           0% { transform: translateY(0); opacity: 0.5; }
//           50% { opacity: 1; }
//           100% { transform: translateY(-40px); opacity: 0.5; }
//         }
//         @keyframes zoomIn {
//           from { transform: scale(0.9); opacity: 0; }
//           to { transform: scale(1); opacity: 1; }
//         }
//         .animate-zoomIn { animation: zoomIn 300ms ease-out; }

//         /* reveal helper toggled by IntersectionObserver */
//         .reveal-item.show { opacity: 1 !important; transform: translateY(0) !important; }

//         /* smooth image shadow/glow on hover */
//         .reveal-item img { transition: box-shadow .45s ease, transform .7s cubic-bezier(.2,.9,.3,1); }
//         .reveal-item:hover img { box-shadow: 0 20px 50px rgba(0,0,0,0.35); transform: translateY(-6px) scale(1.02); }

//         /* small responsiveness for columns */
//         @media (max-width: 768px) {
//           .reveal-item img { aspect-ratio: 4/5; }
//         }
//       `}</style>
//     </main>
//   );
// }









// import { useEffect, useMemo, useState } from "react";

// const IMAGES_PER_PAGE = 9;

// const imagesData = [
//   { src: "/images/img1.jpg", title: "Golden Hour Bride", category: "Wedding" },
//   { src: "/images/img2.jpg", title: "Urban Portrait", category: "Portrait" },
//   { src: "/images/kk.jpg", title: "Mountain Sunrise", category: "Travel" },
//   { src: "/imgages/img13.jpg", title: "Corporate Event", category: "Events" },
//   { src: "/images/img12.jpg", title: "Candid Moment", category: "Wedding" },
//   { src: "/images/img21.jpg", title: "Studio Headshot", category: "Portrait" },
//   { src: "/images/img133.jpg", title: "Coastal Roadtrip", category: "Travel" },
//   { src: "/images/img144.jpg", title: "Birthday Party Fun", category: "Events" },
//   { src: "/images/images.jpg", title: "Bridal Portrait", category: "Wedding" },
//   { src: "/images/wed.jpg", title: "Soft Light Portrait", category: "Portrait" },
//   { src: "/images/img11.jpg", title: "Desert Dunes", category: "Travel" },
//   { src: "/images/img12.jpg", title: "Festival Coverage", category: "Events" },
//   { src: "/images/img133.jpg", title: "Riverside Couple", category: "Wedding" },
  
  
// ];

// const CATEGORIES = ["All", "Wedding", "Portrait", "Travel", "Events"];

// export default function Gallery() {
//   const [category, setCategory] = useState("All");
//   const [page, setPage] = useState(1);
//   const [lightboxIndex, setLightboxIndex] = useState(null);
//   const [visible, setVisible] = useState(false);

//   /* Page fade-in */
//   useEffect(() => {
//     setTimeout(() => setVisible(true), 150);
//   }, []);

//   /* Filter logic */
//   const filtered = useMemo(() => {
//     return imagesData.filter((img) =>
//       category === "All" ? true : img.category === category
//     );
//   }, [category]);

//   const visibleImages = useMemo(() => {
//     return filtered.slice(0, page * IMAGES_PER_PAGE);
//   }, [filtered, page]);

//   useEffect(() => setPage(1), [category]);

//   /* Lightbox keyboard navigation */
//   useEffect(() => {
//     const onKey = (e) => {
//       if (lightboxIndex === null) return;
//       if (e.key === "Escape") setLightboxIndex(null);
//       if (e.key === "ArrowRight")
//         setLightboxIndex((i) => (i + 1) % visibleImages.length);
//       if (e.key === "ArrowLeft")
//         setLightboxIndex((i) => (i - 1 + visibleImages.length) % visibleImages.length);
//     };
//     window.addEventListener("keydown", onKey);
//     return () => window.removeEventListener("keydown", onKey);
//   }, [lightboxIndex, visibleImages.length]);

//   return (
//     <main
//       className={`pt-28 pb-20 min-h-screen transition-all duration-700 ${
//         visible
//           ? "opacity-100 translate-y-0"
//           : "opacity-0 translate-y-6"
//       } bg-white dark:bg-gray-900`}
//     >
//       {/* BOKEH BACKGROUND */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         {[...Array(16)].map((_, i) => (
//           <span
//             key={i}
//             className="absolute bg-rose-300/30 blur-[50px] rounded-full"
//             style={{
//               width: `${60 + Math.random() * 80}px`,
//               height: `${60 + Math.random() * 80}px`,
//               left: `${Math.random() * 100}%`,
//               top: `${Math.random() * 100}%`,
//               animation: `floatUp ${6 + Math.random() * 6}s ease-in-out infinite`,
//             }}
//           />
//         ))}
//       </div>

//       <div className="max-w-7xl mx-auto relative px-4">
//         {/* Heading */}
//         <header className="mb-10 text-center relative z-10">
//           <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white">
//             Wedding Memories Gallery
//           </h1>
//           <p className="mt-3 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
//             A cinematic collection of love, emotions, portraits & magical moments.
//           </p>
//         </header>

//         {/* Filters */}
//         <nav className="mb-10 flex flex-wrap gap-4 justify-center relative z-10">
//           {CATEGORIES.map((cat) => (
//             <button
//               key={cat}
//               onClick={() => setCategory(cat)}
//               className={`px-5 py-2.5 rounded-full font-semibold text-sm transition-all 
//                 ${
//                   category === cat
//                     ? "bg-rose-500 text-white shadow-lg scale-105"
//                     : "bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
//                 }
//               `}
//             >
//               {cat}
//             </button>
//           ))}
//         </nav>

//         {/* Grid */}
//         <section className="relative z-10">
//           <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-5 space-y-5">
//             {visibleImages.map((img, i) => (
//               <figure
//                 key={img.src + i}
//                 className="relative overflow-hidden rounded-2xl shadow-lg break-inside-avoid group cursor-pointer"
//                 onClick={() => setLightboxIndex(i)}
//               >
//                 <img
//                   src={img.src}
//                   alt={img.title}
//                   loading="lazy"
//                   className="w-full rounded-xl transition-transform duration-[1200ms] group-hover:scale-110"
//                 />

//                 {/* Glass overlay */}
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition duration-700"></div>

//                 {/* Caption */}
//                 <figcaption className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition duration-700">
//                   <h3 className="font-bold text-lg drop-shadow">{img.title}</h3>
//                   <p className="text-sm opacity-80">{img.category}</p>
//                 </figcaption>
//               </figure>
//             ))}
//           </div>

//           {/* Load More */}
//           {visibleImages.length < filtered.length && (
//             <div className="mt-12 text-center">
//               <button
//                 onClick={() => setPage(page + 1)}
//                 className="px-8 py-3 bg-rose-500 text-white rounded-full font-semibold shadow-lg hover:scale-105 transition-all"
//               >
//                 Load More
//               </button>
//             </div>
//           )}
//         </section>

//         {/* Lightbox */}
//         {lightboxIndex !== null && (
//           <div
//             className="fixed inset-0 bg-black/80 backdrop-blur-xl z-50 flex items-center justify-center p-4 animate-fadeIn"
//             onClick={() => setLightboxIndex(null)}
//           >
//             <div
//               className="max-w-4xl w-full relative animate-zoomIn"
//               onClick={(e) => e.stopPropagation()}
//             >
//               {/* Close */}
//               <button
//                 className="absolute top-4 right-4 text-white text-2xl bg-black/40 rounded-full px-3 py-1"
//                 onClick={() => setLightboxIndex(null)}
//               >
//                 ✕
//               </button>

//               {/* Image */}
//               <img
//                 src={visibleImages[lightboxIndex].src}
//                 className="rounded-xl max-h-[80vh] w-full object-contain shadow-2xl"
//               />

//               {/* Details */}
//               <div className="p-5 bg-white dark:bg-gray-900 rounded-xl mt-3">
//                 <h2 className="font-bold text-xl">{visibleImages[lightboxIndex].title}</h2>
//                 <p className="text-gray-600 dark:text-gray-300">
//                   {visibleImages[lightboxIndex].category}
//                 </p>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* animations */}
//       <style>{`
//         @keyframes floatUp {
//           0% { transform: translateY(0px); opacity: 0.5; }
//           50% { opacity: 1; }
//           100% { transform: translateY(-50px); opacity: 0.5; }
//         }
//         @keyframes fadeIn {
//           from { opacity: 0; }
//           to { opacity: 1; }
//         }
//         @keyframes zoomIn {
//           from { transform: scale(0.7); opacity: 0; }
//           to { transform: scale(1); opacity: 1; }
//         }
//         .animate-fadeIn { animation: fadeIn 0.4s ease-out; }
//         .animate-zoomIn { animation: zoomIn 0.4s ease-out; }
//       `}</style>
//     </main>
//   );
// }






