import { motion } from "framer-motion";
import {
  QrCode,
  Image,
  ShieldCheck,
  UploadCloud,
  Users,
  Sparkles,
} from "lucide-react";

export default function OurProduct() {
  const features = [
    {
      icon: <Users size={28} />,
      title: "Admin-Driven Management",
      desc: "Only authorized admins can manage photographers, albums, and client data with complete control.",
      color: "from-emerald-400 to-cyan-400",
    },
    {
      icon: <UploadCloud size={28} />,
      title: "Bulk Photo Uploads",
      desc: "Upload hundreds of high-resolution wedding photos with previews and smooth performance.",
      color: "from-purple-400 to-pink-400",
    },
    {
      icon: <QrCode size={28} />,
      title: "QR Code Album Access",
      desc: "Each album gets a unique QR code printed on physical albums for instant digital access.",
      color: "from-yellow-400 to-orange-400",
    },
    {
      icon: <Image size={28} />,
      title: "Responsive Photo Gallery",
      desc: "Clients, relatives, and friends can view albums on any device without login.",
      color: "from-blue-400 to-indigo-400",
    },
    {
      icon: <ShieldCheck size={28} />,
      title: "Secure & Private",
      desc: "Albums are private, protected, and accessible only via unique QR or shared links.",
      color: "from-cyan-400 to-teal-400",
    },
  ];

  return (
    <main className="min-h-screen bg-gray-100 dark:bg-gray-900 mt-16">

      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 via-purple-400/10 to-emerald-400/10" />

        <div className="relative max-w-7xl mx-auto px-6 py-20 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="
              text-4xl sm:text-5xl md:text-6xl
              font-extrabold
              bg-gradient-to-r from-cyan-400 via-purple-400 to-emerald-400
              bg-clip-text text-transparent
            "
          >
            Our Product
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
          >
            A smart digital album & QR-based gallery platform designed for
            wedding and event photography businesses.
          </motion.p>
        </div>
      </section>

      {/* ================= PRODUCT OVERVIEW ================= */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* LEFT CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white">
              Digital Albums powered by QR Technology
            </h2>

            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Our platform bridges the gap between physical photo albums and
              digital galleries. Admins can create albums, upload photos, and
              generate QR codes that are printed on hard-copy albums.
            </p>

            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              When scanned, clients and guests instantly access the complete
              digital gallery — anytime, anywhere, on any device.
            </p>
          </motion.div>

          {/* RIGHT CARD */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="
              bg-white/90 dark:bg-gray-800/80
              backdrop-blur-xl
              rounded-3xl p-8 shadow-2xl
            "
          >
            <div className="flex items-center gap-3 mb-4">
              <Sparkles className="text-cyan-400" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                Why Our Product?
              </h3>
            </div>

            <ul className="space-y-4 text-gray-600 dark:text-gray-300">
              <li>✔ No login required for clients</li>
              <li>✔ Perfect for weddings & events</li>
              <li>✔ Reduces photo sharing effort</li>
              <li>✔ Enhances premium album experience</li>
              <li>✔ Scalable & secure backend</li>
            </ul>
          </motion.div>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-extrabold text-center mb-14 text-gray-900 dark:text-white"
        >
          Key Features
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.05, y: -6 }}
              className="
                relative overflow-hidden
                bg-white/90 dark:bg-gray-800/80
                backdrop-blur-xl
                rounded-3xl p-6 shadow-2xl
              "
            >
              <div
                className={`absolute inset-0 opacity-20 bg-gradient-to-br ${f.color}`}
              />

              <div
                className={`relative w-12 h-12 rounded-xl bg-gradient-to-r ${f.color}
                flex items-center justify-center text-black shadow-lg mb-4`}
              >
                {f.icon}
              </div>

              <h3 className="relative text-lg font-bold text-gray-900 dark:text-white">
                {f.title}
              </h3>

              <p className="relative text-sm text-gray-600 dark:text-gray-300 mt-2">
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
