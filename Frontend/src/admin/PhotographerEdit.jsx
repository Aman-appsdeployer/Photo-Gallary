import { motion } from "framer-motion";
import { ArrowLeft, Save } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API_BASE_URL from "../config/api";



export default function PhotographerEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    studio: "",
    phone: "",
    email: "",
    experience: "",
    address: "",
  });

  const [loading, setLoading] = useState(true);

  /* ================= FETCH PHOTOGRAPHER ================= */
  useEffect(() => {
    const fetchPhotographer = async () => {
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

        if (!res.ok) {
          throw new Error("Failed to fetch photographer");
        }

        const data = await res.json();
        setForm(data);
      } catch (error) {
        console.error(error);
        alert("Unable to load photographer details");
      } finally {
        setLoading(false);
      }
    };

    fetchPhotographer();
  }, [id]);

  /* ================= HANDLE INPUT ================= */
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /* ================= UPDATE ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("adminToken");

      const res = await fetch(
        `${API_BASE_URL}/api/photographers/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(form),
        }
      );

      if (!res.ok) {
        throw new Error("Update failed");
      }

      navigate("/admin/photographers");
    } catch (error) {
      console.error(error);
      alert("Failed to update photographer");
    }
  };

  if (loading) {
    return <div className="p-10 text-center">Loading...</div>;
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 md:p-10 max-w-2xl mx-auto"
    >
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700"
        >
          <ArrowLeft />
        </button>
        <h1 className="text-2xl font-bold">Update Photographer</h1>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-xl space-y-4"
      >
        {[
          { label: "Name", name: "name" },
          { label: "Studio", name: "studio" },
          { label: "Phone", name: "phone" },
          { label: "Email", name: "email" },
          { label: "Experience (years)", name: "experience" },
          { label: "Address", name: "address" },
        ].map((field) => (
          <div key={field.name}>
            <label className="block text-sm font-medium mb-1">
              {field.label}
            </label>
            <input
              type="text"
              name={field.name}
              value={form[field.name]}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-lg border dark:bg-gray-900"
            />
          </div>
        ))}

        <button
          type="submit"
          className="w-full mt-4 py-3 rounded-xl bg-gradient-to-r from-emerald-400 to-cyan-400 font-semibold flex items-center justify-center gap-2"
        >
          <Save size={18} /> Update Photographer
        </button>
      </form>
    </motion.section>
  );
}
