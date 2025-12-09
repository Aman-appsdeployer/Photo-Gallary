// CardSection.jsx
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CardSection() {
  const navigate = useNavigate();
  const items = [
    {
      title: "Wedding Photography",
      desc: "Emotional, cinematic, and timeless wedding moments.",
      img: "/images/img1.jpg",
      wedding: true,
    },
    {
      title: "Portrait Photography",
      desc: "Studio & outdoor portraits with natural lighting.",
      img: "/images/img2.jpg",
    },
    {
      title: "Travel Photography",
      desc: "Stunning landscapes and cultural travel stories.",
      img: "/images/img3.jpg",
    },
    {
      title: "Events & Parties",
      desc: "Professional event coverage with candid shots.",
      img: "/images/img4.jpg",
    },
  ];

  const containerRef = useRef(null);

  /* -------------------- Entrance Animation (staircase) -------------------- */
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const cards = Array.from(el.querySelectorAll(".card-item"));

    // Set initial "staircase" positions: each card gets a slightly different x/y offset
    cards.forEach((c, i) => {
      const colOffset = (i % 4) * 12; // horizontal offset per column
      const rowOffset = Math.floor(i / 4) * 8; // vertical offset per row
      // push a bit more to the right for later cards to form stairs
      const translateX = colOffset + Math.floor(i / 2) * 4;
      const translateY = 28 + rowOffset;
      c.style.opacity = "0";
      c.style.transform = `translate(${translateX}px, ${translateY}px) scale(0.98)`;
      c.style.willChange = "transform, opacity";
    });

    const io = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // reveal with stagger that emphasizes staircase
            cards.forEach((c, i) => {
              c.style.transition = `transform 700ms cubic-bezier(.19,1,.22,1), opacity 700ms ease`;
              // stagger: larger delay for later cards so stairs animate left-to-right, top-to-bottom
              c.style.transitionDelay = `${i * 110}ms`;
              c.style.opacity = "1";
              c.style.transform = `translate(0px, 0px) scale(1)`;
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.12 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={containerRef} className="py-10">
      <div className="max-w-6xl mx-auto px-4 -mt-48">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-center mb-8 dark:text-gray-300">
          Our Best Photography Work
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {items.map((item, idx) => (
            <Card
              key={idx}
              item={item}
              index={idx}
              onNavigate={(category) =>
                navigate(`/gallery?category=${encodeURIComponent(category)}`)
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Card Component (tilt, like, wedding sparkle) ---------- */
function Card({ item, index = 0, onNavigate }) {
  const ref = useRef(null);
  const imgRef = useRef(null);
  const [loaded, setLoaded] = useState(false);

  /* ❤️ LIKE STATE (local only — persists only per session unless you add localStorage) */
  const [liked, setLiked] = useState(false);
  const toggleLike = () => setLiked((p) => !p);

  /* -------------------- Tilt / Parallax on hover -------------------- */
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleMove = (e) => {
      const rect = el.getBoundingClientRect();
      const clientX = e.clientX ?? (e.touches && e.touches[0].clientX);
      const clientY = e.clientY ?? (e.touches && e.touches[0].clientY);
      if (clientX == null || clientY == null) return;
      const px = (clientX - rect.left) / rect.width - 0.5; // -0.5 .. 0.5
      const py = (clientY - rect.top) / rect.height - 0.5;

      const rx = -py * 6;
      const ry = px * 8;

      el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.03)`;
      el.style.transition = "transform 120ms ease-out";

      if (imgRef.current) {
        imgRef.current.style.transform = `scale(1.08) translate(${px * -6}px, ${py * -6}px)`;
        imgRef.current.style.transition = "transform 380ms cubic-bezier(.2,.9,.3,1)";
      }
    };

    const handleLeave = () => {
      el.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)";
      imgRef.current && (imgRef.current.style.transform = "scale(1) translate(0,0)");
      el.style.transition = "transform 520ms cubic-bezier(.2,.9,.3,1)";
    };

    el.addEventListener("mousemove", handleMove);
    el.addEventListener("mouseleave", handleLeave);
    // safe touch fallback
    el.addEventListener("touchstart", handleLeave, { passive: true });

    return () => {
      el.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseleave", handleLeave);
      el.removeEventListener("touchstart", handleLeave);
    };
  }, []);

  /* --------------- Keyboard Navigation ---------------- */
  const onKeyCTA = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onNavigate(item.title);
    }
  };

  return (
    <article
      ref={ref}
      className={`card-item relative rounded-xl overflow-hidden shadow-lg transition-all duration-500 bg-white dark:bg-gray-800 ${
        item.wedding ? "ring-1 ring-rose-200/50 hover:ring-rose-300 hover:shadow-rose-200/50" : ""
      }`}
      tabIndex={0}
    >
      {/* ❤️ LIKE BUTTON */}
      <button
        onClick={toggleLike}
        aria-pressed={liked}
        aria-label={liked ? `Unlike ${item.title}` : `Like ${item.title}`}
        className={`absolute top-3 right-3 z-30 p-2 rounded-full backdrop-blur-md shadow transition-all duration-300 focus:outline-none ${
          liked ? "bg-red-500 text-white scale-110 shadow-red-300" : "bg-white/70 text-gray-700 hover:scale-105"
        }`}
      >
        <span className={`text-xl transition-transform ${liked ? "scale-125" : "scale-100"}`}>
          {liked ? "❤️" : "🤍"}
        </span>
      </button>

      {/* IMAGE AREA */}
      <div className="w-full aspect-[4/3] overflow-hidden relative">
        {/* Blur placeholder */}
        <img
          src={item.img}
          aria-hidden
          alt=""
          className={`absolute inset-0 w-full h-full object-cover transform scale-105 blur-md transition-opacity duration-700 ${
            loaded ? "opacity-0" : "opacity-100"
          }`}
          style={{ filter: "blur(14px)" }}
        />

        {/* Main image */}
        <img
          ref={imgRef}
          src={item.img}
          alt={item.title}
          loading="lazy"
          className={`w-full h-full object-cover transition-all duration-[900ms] ${
            item.wedding ? "hover:saturate-[1.06] hover:brightness-[1.03]" : ""
          }`}
          onLoad={() => setLoaded(true)}
        />

        {/* Wedding special shine + caption */}
        {item.wedding && (
          <>
            <div className="absolute inset-0 bg-gradient-to-t from-rose-600/14 via-transparent to-transparent mix-blend-screen pointer-events-none" />
            <div className="absolute left-3 top-3 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white px-3 py-1 rounded-full text-xs shadow-lg font-semibold">
              Wedding • Love Story
            </div>

            {/* subtle sparkle (animated) */}
            <div className="absolute right-6 bottom-6 text-rose-200 text-2xl drop-shadow animate-pulse">
              ♥
            </div>

            {/* cinematic caption */}
            <div className="absolute bottom-4 left-4 text-white text-sm font-medium drop-shadow bg-black/40 px-3 py-1 rounded-md">
              Captured Moments of Love
            </div>
          </>
        )}
      </div>

      {/* CONTENT */}
      <div className="p-4">
        <h3 className="text-lg sm:text-xl font-semibold">{item.title}</h3>
        <p className="text-gray-600 dark:text-gray-300 mt-2 text-sm">{item.desc}</p>

        <div className="mt-4">
          <button
            onClick={() => onNavigate(item.title)}
            onKeyDown={onKeyCTA}
            className="inline-block text-sm px-4 py-2 rounded-full bg-cyan-600 text-white hover:bg-cyan-700 shadow-sm"
          >
            View Gallery
          </button>
        </div>
      </div>
    </article>
  );
}









// import { useEffect, useRef, useState } from "react";
// import { useNavigate } from "react-router-dom";

// export default function CardSection() {
//   const navigate = useNavigate();
//   const items = [
//     {
//       title: "Wedding Photography",
//       desc: "Emotional, cinematic, and timeless wedding moments.",
//       img: "/images/img1.jpg",
//       wedding: true,
//     },
//     {
//       title: "Portrait Photography",
//       desc: "Studio & outdoor portraits with natural lighting.",
//       img: "/images/img2.jpg",
//     },
//     {
//       title: "Travel Photography",
//       desc: "Stunning landscapes and cultural travel stories.",
//       img: "/images/img3.jpg",
//     },
//     {
//       title: "Events & Parties",
//       desc: "Professional event coverage with candid shots.",
//       img: "/images/img4.jpg",
//     },
//   ];

//   const containerRef = useRef(null);

//   /* -------------------- Entrance Animation -------------------- */
//   useEffect(() => {
//     const el = containerRef.current;
//     if (!el) return;

//     const cards = Array.from(el.querySelectorAll(".card-item"));
//     cards.forEach((c) => {
//       c.style.opacity = "0";
//       c.style.transform = "translateY(18px)";
//     });

//     const io = new IntersectionObserver(
//       (entries, observer) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             cards.forEach((c, i) => {
//               c.style.transition =
//                 "opacity 640ms cubic-bezier(.2,.9,.3,1), transform 640ms cubic-bezier(.2,.9,.3,1)";
//               c.style.transitionDelay = `${i * 90}ms`;
//               c.style.opacity = "1";
//               c.style.transform = "translateY(0)";
//             });
//             observer.disconnect();
//           }
//         });
//       },
//       { threshold: 0.12 }
//     );

//     io.observe(el);
//     return () => io.disconnect();
//   }, []);

//   return (
//     <section ref={containerRef} className="py-10">
//       <div className="max-w-6xl mx-auto px-4 -mt-48">
//         <h2 className="text-3xl sm:text-4xl font-extrabold text-center mb-8 dark:text-gray-300">
//           Our Best Photography Work
//         </h2>

//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//           {items.map((item, idx) => (
//             <Card
//               key={idx}
//               item={item}
//               index={idx}
//               onNavigate={(category) =>
//                 navigate(`/gallery?category=${encodeURIComponent(category)}`)
//               }
//             />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

// /* ---------- Card Component ---------- */
// function Card({ item, index = 0, onNavigate }) {
//   const ref = useRef(null);
//   const imgRef = useRef(null);
//   const [loaded, setLoaded] = useState(false);

//   /* ❤️ LIKE STATE */
//   const [liked, setLiked] = useState(false);
//   const toggleLike = () => setLiked((prev) => !prev);

//   /* -------------------- Tilt Animation -------------------- */
//   useEffect(() => {
//     const el = ref.current;
//     if (!el) return;

//     const handleMove = (e) => {
//       const rect = el.getBoundingClientRect();
//       const px =
//         ((e.clientX ?? (e.touches?.[0]?.clientX)) - rect.left) / rect.width -
//         0.5;
//       const py =
//         ((e.clientY ?? (e.touches?.[0]?.clientY)) - rect.top) /
//           rect.height -
//         0.5;

//       const rx = -py * 6;
//       const ry = px * 8;

//       el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.03)`;

//       if (imgRef.current) {
//         imgRef.current.style.transform = `scale(1.1) translate(${px * -6}px, ${
//           py * -6
//         }px)`;
//       }
//     };

//     const handleLeave = () => {
//       el.style.transform =
//         "perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)";
//       imgRef.current.style.transform = "scale(1) translate(0,0)";
//     };

//     el.addEventListener("mousemove", handleMove);
//     el.addEventListener("mouseleave", handleLeave);

//     return () => {
//       el.removeEventListener("mousemove", handleMove);
//       el.removeEventListener("mouseleave", handleLeave);
//     };
//   }, []);

//   /* --------------- Keyboard Navigation ---------------- */
//   const onKeyCTA = (e) => {
//     if (e.key === "Enter" || e.key === " ") {
//       e.preventDefault();
//       onNavigate(item.title);
//     }
//   };

//   return (
//     <article
//       ref={ref}
//       className={`card-item relative rounded-xl overflow-hidden shadow-lg transition-all duration-500 bg-white dark:bg-gray-800 ${
//         item.wedding
//           ? "ring-1 ring-rose-200/50 hover:ring-rose-300 hover:shadow-rose-200/50"
//           : ""
//       }`}
//       tabIndex={0}
//     >
//       {/* ❤️ LIKE BUTTON */}
//       <button
//         onClick={toggleLike}
//         className={`
//           absolute top-3 right-3 z-30 p-2 rounded-full backdrop-blur-md shadow 
//           transition-all duration-300
//           ${
//             liked
//               ? "bg-red-500 text-white scale-110 shadow-red-300"
//               : "bg-white/70 text-gray-700 hover:scale-105"
//           }
//         `}
//         aria-label={liked ? "Unlike" : "Like"}
//       >
//         <span
//           className={`text-xl transition-transform ${
//             liked ? "scale-125" : "scale-100"
//           }`}
//         >
//           {liked ? "❤️" : "🤍"}
//         </span>
//       </button>

//       {/* -------------------- IMAGE AREA -------------------- */}
//       <div className="w-full aspect-[4/3] overflow-hidden relative">
//         {/* Placeholder */}
//         <img
//           src={item.img}
//           aria-hidden
//           alt=""
//           className={`absolute inset-0 w-full h-full object-cover transform scale-105 blur-md transition-opacity duration-700 ${
//             loaded ? "opacity-0" : "opacity-100"
//           }`}
//           style={{ filter: "blur(14px)" }}
//         />

//         {/* Main Image */}
//         <img
//           ref={imgRef}
//           src={item.img}
//           alt={item.title}
//           loading="lazy"
//           className={`w-full h-full object-cover transition-all duration-[900ms] ${
//             item.wedding ? "hover:saturate-[1.2] hover:brightness-[1.1]" : ""
//           }`}
//           onLoad={() => setLoaded(true)}
//         />

//         {/* Wedding Special Effects */}
//         {item.wedding && (
//           <>
//             <div className="absolute inset-0 bg-gradient-to-t from-rose-600/20 via-transparent to-transparent mix-blend-screen" />
//             <div className="absolute left-3 top-3 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white px-3 py-1 rounded-full text-xs shadow-lg font-semibold">
//               Wedding • Love Story
//             </div>

//             <div className="absolute right-6 bottom-6 text-rose-200 text-2xl animate-pulse drop-shadow">
//               ♥
//             </div>

//             <div className="absolute bottom-4 left-4 text-white text-sm font-medium drop-shadow bg-black/40 px-3 py-1 rounded-md">
//               Captured Moments of Love
//             </div>
//           </>
//         )}
//       </div>

//       {/* -------------------- CONTENT AREA -------------------- */}
//       <div className="p-4">
//         <h3 className="text-lg sm:text-xl font-semibold">{item.title}</h3>
//         <p className="text-gray-600 dark:text-gray-300 mt-2 text-sm">
//           {item.desc}
//         </p>

//         <div className="mt-4">
//           <button
//             onClick={() => onNavigate(item.title)}
//             onKeyDown={onKeyCTA}
//             className="inline-block text-sm px-4 py-2 rounded-full bg-cyan-600 text-white hover:bg-cyan-700 shadow-sm"
//           >
//             View Gallery
//           </button>
//         </div>
//       </div>
//     </article>
//   );
// }






