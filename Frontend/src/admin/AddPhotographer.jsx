import { motion } from "framer-motion";
import { Camera, Save, User } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../config/api";

/* ================= ANIMATION VARIANTS ================= */
const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0 },
};

export default function AddPhotographer() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    studio: "",
    phone: "",
    email: "",
    experience: "",
    address: "",
  });

  /* ================= HANDLE CHANGE ================= */
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /* ================= SUBMIT (REAL API) ================= */
  const handleSubmit = async () => {
    if (!form.name || !form.phone) {
      alert("Name and phone number are required");
      return;
    }

    try {
      const token = localStorage.getItem("adminToken");

      const res = await fetch(`${API_BASE_URL}/api/photographers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed");

      alert("Photographer added successfully!");
      navigate("/admin/photographers");
    } catch (error) {
      alert("Failed to add photographer");
    }
  };

  return (
    <section className="relative p-4 sm:p-6 md:p-10 max-w-5xl mx-auto">

      {/* ================= HERO HEADER ================= */}
      <motion.div
        initial={{ opacity: 0, y: -25 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10"
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-emerald-400 to-cyan-400 flex items-center justify-center shadow-lg">
            <Camera className="text-black" />
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white">
            Add Photographer
          </h1>
        </div>

        <p className="text-gray-600 dark:text-gray-400 max-w-xl">
          Admin-only section to register photographer & studio details.
          These details appear on albums and QR scan pages.
        </p>
      </motion.div>

      {/* ================= FORM CARD ================= */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="
          relative
          bg-white/90 dark:bg-gray-800/85
          backdrop-blur-xl
          rounded-3xl
          p-6 sm:p-8
          shadow-2xl
          border border-gray-200/50 dark:border-gray-700/50
        "
      >
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-400/10 to-emerald-400/10 pointer-events-none" />

        <motion.div
          variants={container}
          className="relative grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <motion.div variants={item}>
            <Input label="Photographer Name" name="name" onChange={handleChange} />
          </motion.div>

          <motion.div variants={item}>
            <Input label="Studio Name" name="studio" onChange={handleChange} />
          </motion.div>

          <motion.div variants={item}>
            <Input label="Phone Number" name="phone" onChange={handleChange} />
          </motion.div>

          <motion.div variants={item}>
            <Input label="Email Address" name="email" onChange={handleChange} />
          </motion.div>

          <motion.div variants={item}>
            <Input label="Years of Experience" name="experience" onChange={handleChange} />
          </motion.div>

          <motion.div variants={item}>
            <Input label="Studio Address" name="address" onChange={handleChange} />
          </motion.div>
        </motion.div>

        {/* ================= ACTION BUTTONS ================= */}
        <motion.div variants={item} className="flex flex-col sm:flex-row gap-4 mt-10">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            onClick={handleSubmit}
            className="flex-1 py-4 rounded-xl bg-gradient-to-r from-emerald-400 to-cyan-400 text-black font-bold shadow-xl flex items-center justify-center gap-2"
          >
            <Save size={18} /> Save Photographer
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => navigate("/admin/photographers")}
            className="flex-1 py-4 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white font-semibold shadow"
          >
            Cancel
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
}

function Input({ label, ...props }) {
  return (
    <div>
      <label className="font-semibold block mb-1 text-sm text-gray-700 dark:text-gray-300">
        {label}
      </label>
      <div className="relative">
        <input
          {...props}
          className="w-full p-3 pl-4 pr-10 rounded-xl border bg-white dark:bg-gray-700"
        />
        <User size={16} className="absolute right-4 top-3.5 text-gray-400" />
      </div>
    </div>
  );
}








