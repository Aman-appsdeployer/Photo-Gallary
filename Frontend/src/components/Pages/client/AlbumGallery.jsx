import API_BASE_URL from "@/config/api";
import { motion } from "framer-motion";
import { Grid, Image } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


export default function AlbumGallery() {
  const { id } = useParams();

  const [album, setAlbum] = useState(null);
  const [activeTab, setActiveTab] = useState("all");
  const [loading, setLoading] = useState(true);

  /* ================= FETCH PUBLIC ALBUM ================= */
  useEffect(() => {
    const fetchAlbum = async () => {
      try {
        const res = await fetch(
          `${API_BASE_URL}/api/albums/public/${id}`
        );

        if (!res.ok) throw new Error("Album not found");

        const data = await res.json();
        setAlbum(data);
      } catch (error) {
        console.error("Failed to load album", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAlbum();
  }, [id]);

  if (loading) {
    return (
      <div className="text-center py-20 text-gray-500">
        Loading album photos...
      </div>
    );
  }

  if (!album) {
    return (
      <div className="text-center py-20 text-red-500">
        Album not available
      </div>
    );
  }

  return (
    <section className="p-6 md:p-10 max-w-7xl mx-auto">

      {/* ================= HEADER ================= */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10"
      >
        <h1 className="text-3xl md:text-4xl font-extrabold">
          {album.album_name}
        </h1>
        <p className="text-gray-500 mt-1">
          {album.client_name} •{" "}
          {album.event_date
            ? new Date(album.event_date).toLocaleDateString()
            : ""}
        </p>
      </motion.div>

      {/* ================= TABS ================= */}
      <div className="flex gap-4 mb-8">
        <button
          onClick={() => setActiveTab("all")}
          className={`px-5 py-2 rounded-xl font-semibold flex items-center gap-2
            ${
              activeTab === "all"
                ? "bg-black text-white"
                : "bg-gray-200 text-gray-700"
            }`}
        >
          <Grid size={18} /> All Photos
        </button>

        <button
          onClick={() => setActiveTab("featured")}
          className={`px-5 py-2 rounded-xl font-semibold flex items-center gap-2
            ${
              activeTab === "featured"
                ? "bg-black text-white"
                : "bg-gray-200 text-gray-700"
            }`}
        >
          <Image size={18} /> Featured
        </button>
      </div>

      {/* ================= PHOTOS GRID ================= */}
      {album.images && album.images.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {album.images.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.03 }}
              className="relative group overflow-hidden rounded-2xl shadow-lg"
            >
              <img
                src={img}
                alt="Album"
                className="w-full h-full object-cover aspect-square
                           group-hover:scale-110 transition duration-500"
              />
              <div className="absolute inset-0 bg-black/30 opacity-0
                              group-hover:opacity-100 transition" />
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-gray-500">
          No photos uploaded yet.
        </div>
      )}
    </section>
  );
}
