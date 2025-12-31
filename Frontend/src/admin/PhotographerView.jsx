import { motion } from "framer-motion";
import {
  ArrowLeft,
  Briefcase,
  Camera,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API_BASE_URL from "../config/api";

export default function PhotographerView() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOne = async () => {
      try {
        const token = localStorage.getItem("adminToken");

        const res = await fetch(
          `${API_BASE_URL}/api/photographers/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const result = await res.json();
        setData(result);
      } catch (err) {
        console.error("Failed to fetch photographer", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOne();
  }, [id]);

  /* ================= LOADING STATE ================= */
  if (loading) {
    return (
      <div className="p-10 max-w-xl mx-auto">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-2/3" />
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-5/6" />
          <div className="h-4 bg-gray-200 rounded w-4/6" />
          <div className="h-4 bg-gray-200 rounded w-3/6" />
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <p className="p-10 text-center text-red-500">
        Photographer not found
      </p>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-8 max-w-xl mx-auto
      bg-white dark:bg-gray-800
      rounded-3xl shadow-2xl"
    >
      {/* ================= BACK BUTTON ================= */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center gap-2
        text-gray-600 dark:text-gray-300
        hover:text-cyan-500 transition"
      >
        <ArrowLeft size={20} />
        <span className="text-sm font-medium">Back</span>
      </button>

      {/* ================= HEADER ================= */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500
          flex items-center justify-center text-black">
          <Camera size={28} />
        </div>

        <div>
          <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white">
            {data.name}
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
            {data.studio}
          </p>
        </div>
      </div>

      {/* ================= DETAILS ================= */}
      <div className="space-y-4 text-gray-700 dark:text-gray-300">
        <InfoRow icon={<Mail />} label="Email" value={data.email} />
        <InfoRow icon={<Phone />} label="Phone" value={data.phone} />
        <InfoRow
          icon={<Briefcase />}
          label="Experience"
          value={`${data.experience} years`}
        />
        <InfoRow icon={<MapPin />} label="Address" value={data.address} />
      </div>
    </motion.div>
  );
}

/* ================= INFO ROW ================= */
function InfoRow({ icon, label, value }) {
  return (
    <div className="flex items-start gap-3">
      <div className="text-cyan-500 mt-1">{icon}</div>
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="font-medium">{value || "—"}</p>
      </div>
    </div>
  );
}
