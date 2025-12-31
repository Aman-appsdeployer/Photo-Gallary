import { useEffect, useRef, useState } from "react";
import { FaRing } from "react-icons/fa";
import { GiHeartKey, GiRose, GiSparkles } from "react-icons/gi";

export default function LoveStoryTimeline() {
  const timeline = [
    {
      title: "When Our Eyes First Met",
      text: "A simple moment that changed everything — two hearts paused, and the universe whispered a new beginning.",
      img: "/images/img12.jpg",
    },
    {
      title: "A Journey of Togetherness",
      text: "From long conversations to endless smiles, our bond grew stronger with every passing day.",
      img: "/images/img21.jpg",
    },
    {
      title: "The Magical Proposal",
      text: "A heartfelt promise under the sky… sealed with love, laughter, and a lifetime commitment.",
      img: "/images/img144.jpg",
      icon: <FaRing className='text-yellow-500' />,
    },
    {
      title: "Forever Begins Here",
      text: "Surrounded by love, blessings and warm memories — we start the most beautiful chapter of our lives.",
      img: "/images/wed.jpg",
      icon: <GiHeartKey className='text-rose-500' />,
    },
  ];

  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  /* Reveal on scroll */
  useEffect(() => {
    const el = sectionRef.current;
    const io = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && (setVisible(true), io.disconnect()),
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className='relative py-24 overflow-hidden bg-gradient-to-b from-white via-rose-50/40 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 -mt-44'
    >
      {/* Floating petals */}
      {[...Array(18)].map((_, i) => (
        <span
          key={i}
          className='absolute text-rose-300/60 pointer-events-none select-none'
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            fontSize: `${14 + Math.random() * 20}px`,
            animation: `petalFloat ${6 + Math.random() * 6}s linear infinite`,
            animationDelay: `${Math.random() * 3}s`,
          }}
        >
          ❀
        </span>
      ))}

      {/* Header */}
      <div
        className={`text-center mb-16 transition-all duration-700 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        <div className='flex justify-center gap-3 text-rose-400 text-4xl mb-3'>
          <GiRose className='animate-sway' />
          <GiSparkles className='animate-sway' />
          <FaRing className='animate-sway text-yellow-500' />
        </div>

        <h2 className='text-3xl sm:text-4xl font-extrabold dark:text-gray-200'>
          Our Beautiful Love Story
        </h2>
        <p className='max-w-xl mx-auto text-gray-600 dark:text-gray-300 mt-3'>
          A journey written in smiles, moments, and magical memories.
        </p>
      </div>

      {/* Timeline */}
      <div className='max-w-5xl mx-auto relative space-y-24'>
        {timeline.map((item, i) => {
          const isEven = i % 2 === 0; // alternate layout

          return (
            <div
              key={i}
              className='flex flex-col md:flex-row items-center gap-12'
            >
              {/* IMAGE BLOCK */}
              <div
                className={`w-full md:w-1/2 ${
                  !isEven ? "md:order-2" : ""
                } transition-all duration-[900ms] ease-out
                  ${
                    visible
                      ? isEven
                        ? "opacity-100 translate-x-0 scale-100"
                        : "opacity-100 translate-x-0 scale-100"
                      : isEven
                      ? "opacity-0 -translate-x-10 scale-95"
                      : "opacity-0 translate-x-10 scale-95"
                  }
                `}
                style={{ transitionDelay: `${i * 200}ms` }}
              >
                <div className='rounded-2xl shadow-xl overflow-hidden group'>
                  <img
                    src={item.img}
                    alt={item.title}
                    className='w-full h-80 object-cover transition-transform duration-[1200ms] group-hover:scale-110'
                  />
                </div>
              </div>

              {/* TEXT BLOCK */}
              <div
                className={`w-full md:w-1/2 ${
                  !isEven ? "md:order-1" : ""
                } transition-all duration-[900ms] ease-out
                  ${
                    visible
                      ? isEven
                        ? "opacity-100 translate-x-0"
                        : "opacity-100 translate-x-0"
                      : isEven
                      ? "opacity-0 translate-x-10"
                      : "opacity-0 -translate-x-10"
                  }
                `}
                style={{ transitionDelay: `${i * 250}ms` }}
              >
                <div className='flex items-center gap-3 mb-3'>
                  <div className='p-3 bg-rose-100 dark:bg-gray-700 rounded-full shadow'>
                    {item.icon || <GiHeartKey className='text-rose-500 text-xl' />}
                  </div>
                  <h3 className='text-2xl font-bold text-rose-600 dark:text-rose-400'>
                    {item.title}
                  </h3>
                </div>

                <p className='text-gray-700 dark:text-gray-300 leading-relaxed text-lg'>
                  {item.text}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* animations */}
      <style>{`
        @keyframes petalFloat {
          0% { transform: translateY(0) rotate(0deg); opacity: 0.5; }
          50% { opacity: 1; }
          100% { transform: translateY(-80px) rotate(15deg); opacity: 0.5; }
        }
        @keyframes sway {
          0% { transform: rotate(0deg); }
          50% { transform: rotate(6deg); }
          100% { transform: rotate(0deg); }
        }
        .animate-sway {
          animation: sway 4s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
