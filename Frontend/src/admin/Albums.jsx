import { motion } from "framer-motion";
import { Eye, Image, Pencil, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../config/api";

export default function Albums() {
  const navigate = useNavigate();

  /* ================= STATE ================= */
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* ================= FETCH ALBUMS ================= */
  useEffect(() => {
    let isMounted = true;

    const fetchAlbums = async () => {
      try {
        const token = localStorage.getItem("adminToken");

        if (!token) {
          navigate("/admin/login");
          return;
        }

        const res = await fetch(`${API_BASE_URL}/api/albums`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.status === 401) {
          localStorage.removeItem("adminToken");
          navigate("/admin/login");
          return;
        }

        if (!res.ok) {
          throw new Error("Failed to fetch albums");
        }

        const data = await res.json();
        if (isMounted) setAlbums(data);
      } catch (err) {
        if (isMounted) setError(err.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchAlbums();

    return () => {
      isMounted = false;
    };
  }, [navigate]);

  return (
    <section className="p-6 md:p-10">
      {/* ================= HEADER ================= */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-extrabold">Albums</h1>

        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={() => navigate("/admin/upload-album")}
          className="px-5 py-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-xl font-semibold"
        >
          <Plus className="inline mr-2" /> Create Album + QR
        </motion.button>
      </div>

      {/* ================= LOADING ================= */}
      {loading && (
        <div className="text-center py-20 text-gray-500">
          Loading albums...
        </div>
      )}

      {/* ================= ERROR ================= */}
      {!loading && error && (
        <div className="text-center py-20 text-red-500 font-medium">
          {error}
        </div>
      )}

      {/* ================= ALBUM GRID ================= */}
      {!loading && !error && albums.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {albums.map((a, i) => (
            <motion.div
              key={a.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ scale: 1.04, y: -5 }}
              className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-xl"
            >
              {/* ALBUM INFO */}
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-purple-400 rounded-xl flex items-center justify-center">
                  <Image />
                </div>

                <div className="flex-1">
                  <h3 className="font-bold text-lg">
                    {a.album_name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {a.photographer_name}
                  </p>
                </div>

                {/* STATUS */}
                {a.status && (
                  <span
                    className={`px-3 py-1 text-xs rounded-full font-semibold
                    ${
                      a.status === "Active"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {a.status}
                  </span>
                )}
              </div>

              {/* ACTION BUTTONS */}
              <div className="flex gap-3">
                <button
                  onClick={() => navigate(`/admin/albums/view/${a.id}`)}
                  className="flex-1 flex items-center justify-center gap-2
                  px-4 py-2 rounded-xl bg-cyan-400 text-black
                  hover:bg-cyan-500 transition font-semibold"
                >
                  <Eye size={18} /> View
                </button>

                <button
                  onClick={() => navigate(`/admin/albums/edit/${a.id}`)}
                  className="flex-1 flex items-center justify-center gap-2
                  px-4 py-2 rounded-xl bg-yellow-400 text-black
                  hover:bg-yellow-500 transition font-semibold"
                >
                  <Pencil size={18} /> Update
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* ================= EMPTY ================= */}
      {!loading && !error && albums.length === 0 && (
        <div className="text-center py-20 text-gray-500">
          No albums created yet.
        </div>
      )}
    </section>
  );
}







// import { motion } from "framer-motion";
// import { Image, Plus } from "lucide-react";
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// export default function Albums() {
//   const navigate = useNavigate();

//   /* ================= STATE ================= */
//   const [albums, setAlbums] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   /* ================= FETCH ALBUMS ================= */
//   useEffect(() => {
//     const fetchAlbums = async () => {
//       try {
//         const token = localStorage.getItem("adminToken");

//         const res = await fetch("http://localhost:5000/api/albums", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         if (!res.ok) {
//           throw new Error("Failed to fetch albums");
//         }

//         const data = await res.json();
//         setAlbums(data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAlbums();
//   }, []);

//   return (
//     <section className="p-6 md:p-10">
//       {/* ================= HEADER ================= */}
//       <div className="flex justify-between items-center mb-8">
//         <h1 className="text-3xl font-extrabold">Albums</h1>

//         <motion.button
//           whileHover={{ scale: 1.05 }}
//           onClick={() => navigate("/admin/upload-album")}
//           className="px-5 py-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-xl font-semibold"
//         >
//           <Plus className="inline mr-2" /> Create Album + QR
//         </motion.button>
//       </div>

//       {/* ================= LOADING ================= */}
//       {loading && (
//         <div className="text-center py-20 text-gray-500">
//           Loading albums...
//         </div>
//       )}

//       {/* ================= ERROR ================= */}
//       {error && (
//         <div className="text-center py-20 text-red-500">
//           {error}
//         </div>
//       )}

//       {/* ================= ALBUM GRID ================= */}
//       {!loading && !error && albums.length > 0 && (
//         <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
//           {albums.map((a, i) => (
//             <motion.div
//               key={a.id}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: i * 0.1 }}
//               whileHover={{ scale: 1.04, y: -5 }}
//               className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-xl cursor-pointer"
//               onClick={() => navigate(`/admin/albums/${a.id}`)}
//             >
//               <div className="flex items-center gap-4">
//                 <div className="w-12 h-12 bg-purple-400 rounded-xl flex items-center justify-center">
//                   <Image />
//                 </div>
//                 <div>
//                   <h3 className="font-bold text-lg">{a.album_name}</h3>
//                   <p className="text-sm text-gray-500">
//                     {a.photographer_name}
//                   </p>
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       )}

//       {/* ================= EMPTY ================= */}
//       {!loading && !error && albums.length === 0 && (
//         <div className="text-center py-20 text-gray-500">
//           No albums created yet.
//         </div>
//       )}
//     </section>
//   );
// }
