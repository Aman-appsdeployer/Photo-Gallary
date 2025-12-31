import { motion } from "framer-motion";
import { ArrowLeft, Edit, Phone, Plus, User } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../config/api";

export default function Photographers() {
  const navigate = useNavigate();

  /* ================= STATE ================= */
  const [photographers, setPhotographers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* ================= FETCH PHOTOGRAPHERS ================= */
  useEffect(() => {
    const fetchPhotographers = async () => {
      try {
        const token = localStorage.getItem("adminToken");

        const res = await fetch(`${API_BASE_URL}/api/photographers`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch photographers");
        }

        const data = await res.json();
        setPhotographers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPhotographers();
  }, []);

  /* ================= UI ================= */
  return (
    <section className="p-6 md:p-10">
      {/* ================= HEADER ================= */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10"
      >
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white">
            Photographers
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage photographer & studio details
          </p>
        </div>

        <div className="flex gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => navigate("/admin/dashboard")}
            className="px-4 py-3 rounded-xl bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white flex items-center gap-2"
          >
            <ArrowLeft size={18} /> Back
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/admin/add-photographer")}
            className="px-5 py-3 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-xl font-semibold text-black shadow-lg"
          >
            <Plus className="inline mr-2" /> Add Photographer
          </motion.button>
        </div>
      </motion.div>

      {/* ================= LOADING ================= */}
      {loading && (
        <div className="text-center py-20 text-gray-500">
          Loading photographers...
        </div>
      )}

      {/* ================= ERROR ================= */}
      {error && (
        <div className="text-center py-20 text-red-500">
          {error}
        </div>
      )}

      {/* ================= PHOTOGRAPHERS GRID ================= */}
      {!loading && !error && photographers.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {photographers.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.05, y: -6 }}
              className="relative overflow-hidden bg-white/90 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-6 shadow-2xl"
            >
              {/* Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 to-emerald-400/20" />

              {/* Content */}
              <div className="relative flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-cyan-400 to-emerald-400 flex items-center justify-center shadow-lg">
                  <User className="text-black" />
                </div>

                <div>
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                    {p.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1">
                    <Phone size={14} /> {p.phone}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="relative mt-5 flex gap-3">
                {/* VIEW */}
                <button
                  onClick={() =>
                    navigate(`/admin/photographers/view/${p.id}`)
                  }
                  className="px-4 py-2 text-sm rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-cyan-400 hover:text-black transition"
                >
                  View
                </button>

                {/* UPDATE */}
                <button
                  onClick={() =>
                    navigate(`/admin/photographers/edit/${p.id}`)
                  }
                  className="px-4 py-2 text-sm rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-amber-400 hover:text-black transition flex items-center gap-1"
                >
                  <Edit size={14} /> Update
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* ================= EMPTY STATE ================= */}
      {!loading && !error && photographers.length === 0 && (
        <div className="text-center py-20 text-gray-500 dark:text-gray-400">
          No photographers added yet.
        </div>
      )}
    </section>
  );
}








// import { motion } from "framer-motion";
// import { ArrowLeft, Phone, Plus, User } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// export default function Photographers() {
//   const navigate = useNavigate();

//   /* ================= DUMMY DATA ================= */
//   const photographers = [
//     { id: 1, name: "Ansh Studio", phone: "9876543210" },
//     { id: 2, name: "Royal Weddings", phone: "9123456789" },
//     { id: 3, name: "Dream Moments", phone: "9988776655" },
//     { id: 4, name: "Family Clicks", phone: "8877665544" },
//     { id: 5, name: "Nature Lens", phone: "7766554433" },
//     { id: 6, name: "Urban Snaps", phone: "6655443322" },
//   ];  

//   return (
//     <section className="p-6 md:p-10">

//       {/* ================= HEADER ================= */}
//       <motion.div
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10"
//       >
//         <div>
//           <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white">
//             Photographers
//           </h1>
//           <p className="text-gray-600 dark:text-gray-400 ">
//             Manage photographer & studio details
//           </p>
//         </div>

//         <div className="flex gap-3">
//           {/* Back Button */}
//           <motion.button
//             whileHover={{ scale: 1.05 }}
//             onClick={() => navigate("/admin/dashboard")}
//             className="px-4 py-3 rounded-xl bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white flex items-center gap-2"
//           >
//             <ArrowLeft size={18} /> Back
//           </motion.button>

//           {/* Add Photographer */}
//           <motion.button
//             whileHover={{ scale: 1.07 }}
//             whileTap={{ scale: 0.95 }}
//             onClick={() => navigate("/admin/add-photographer")}
//             className="px-5 py-3 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-xl font-semibold text-black shadow-lg"
//           >
//             <Plus className="inline mr-2" /> Add Photographer
//           </motion.button>
//         </div>
//       </motion.div>

//       {/* ================= PHOTOGRAPHERS GRID ================= */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
//         {photographers.map((p, i) => (
//           <motion.div
//             key={p.id}
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: i * 0.12 }}
//             whileHover={{ scale: 1.05, y: -6 }}
//             className="
//               relative overflow-hidden
//               bg-white/90 dark:bg-gray-800/80
//               backdrop-blur-xl
//               rounded-3xl p-6 shadow-2xl
//             "
//           >
//             {/* Glow */}
//             <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 to-emerald-400/20" />

//             {/* Content */}
//             <div className="relative flex items-center gap-4">
//               <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-cyan-400 to-emerald-400 flex items-center justify-center shadow-lg">
//                 <User className="text-black" />
//               </div>

//               <div>
//                 <h3 className="font-bold text-lg text-gray-900 dark:text-white">
//                   {p.name}
//                 </h3>
//                 <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1">
//                   <Phone size={14} /> {p.phone}
//                 </p>
//               </div>
//             </div>

//             {/* Actions */}
//             <div className="relative mt-5 flex gap-3">
//               <button
//                 onClick={() => navigate(`/admin/photographers/${p.id}`)}
//                 className="px-4 py-2 text-sm rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-cyan-400 hover:text-black transition"
//               >
//                 View
//               </button>

//               <button
//                 className="px-4 py-2 text-sm rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-red-400 hover:text-black transition"
//               >
//                 Delete
//               </button>
//             </div>
//           </motion.div>
//         ))}
//       </div>

//       {/* ================= EMPTY STATE (future ready) ================= */}
//       {photographers.length === 0 && (
//         <div className="text-center py-20 text-gray-500 dark:text-gray-400">
//           No photographers added yet.
//         </div>
//       )}
//     </section>
//   );
// }
