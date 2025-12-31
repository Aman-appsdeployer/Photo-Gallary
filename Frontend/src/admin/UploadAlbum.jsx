import { motion } from "framer-motion";
import { ImagePlus, Trash2, UploadCloud } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../config/api";

export default function UploadAlbum() {
  const navigate = useNavigate();

  const [album, setAlbum] = useState({
    albumName: "",
    photographerId: "",
    client: "",
    date: "",
  });

  const [photos, setPhotos] = useState([]);
  const [preview, setPreview] = useState([]);
  const [photographers, setPhotographers] = useState([]);

  /* ================= LOAD PHOTOGRAPHERS ================= */
  useEffect(() => {
    const load = async () => {
      const token = localStorage.getItem("adminToken");

      const res = await fetch(`${API_BASE_URL}/api/photographers`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      setPhotographers(data);
    };
    load();
  }, []);

  /* CLEANUP PREVIEW URLS */
  useEffect(() => {
    return () => {
      preview.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [preview]);

  const handleChange = (e) => {
    setAlbum({ ...album, [e.target.name]: e.target.value });
  };

  const handlePhotos = (e) => {
    const files = Array.from(e.target.files);
    setPhotos((p) => [...p, ...files]);
    setPreview((p) => [...p, ...files.map((f) => URL.createObjectURL(f))]);
  };

  const removePhoto = (i) => {
    setPhotos((p) => p.filter((_, idx) => idx !== i));
    setPreview((p) => p.filter((_, idx) => idx !== i));
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async () => {
    if (!album.albumName || !album.photographerId || photos.length === 0) {
      alert("Please fill album name, photographer and upload photos");
      return;
    }

    try {
      const token = localStorage.getItem("adminToken");
      const formData = new FormData();

      formData.append("albumName", album.albumName);
      formData.append("photographerId", album.photographerId);
      formData.append("client", album.client);
      formData.append("date", album.date);

      photos.forEach((p) => formData.append("photos", p));

      const res = await fetch(`${API_BASE_URL}/api/albums`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) throw new Error("Album creation failed");

      alert("Album created successfully! QR generated.");
      navigate(`/admin/albums/view/${data.albumId}`);
    } catch (err) {
      alert("Album creation failed");
    }
  };

  return (
    <section className="p-4 sm:p-6 md:p-10 max-w-7xl mx-auto">
      <motion.div initial={{ opacity: 0, y: -25 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-extrabold">
          Create Album & Upload Photos
        </h1>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* LEFT */}
        <motion.div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-2xl">
          <div className="space-y-5">
            <Input label="Album Name" name="albumName" onChange={handleChange} />

            <select
              name="photographerId"
              onChange={handleChange}
              className="w-full p-3 rounded-xl border bg-white dark:bg-gray-700"
            >
              <option value="">Select Photographer</option>
              {photographers.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>

            <Input label="Client Name" name="client" onChange={handleChange} />
            <Input label="Event Date" name="date" type="date" onChange={handleChange} />

            <motion.label className="flex flex-col items-center border-2 border-dashed rounded-2xl p-6 cursor-pointer">
              <UploadCloud size={36} />
              <input type="file" multiple accept="image/*" onChange={handlePhotos} className="hidden" />
            </motion.label>

            <motion.button
              onClick={handleSubmit}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-400 to-cyan-400 font-bold"
            >
              Create Album & Generate QR
            </motion.button>
          </div>
        </motion.div>

        {/* RIGHT */}
        <motion.div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-2xl">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <ImagePlus /> Photo Preview
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {preview.map((src, i) => (
              <div key={i} className="relative group">
                <img src={src} alt="" className="w-full h-32 object-cover rounded-xl" />
                <button
                  onClick={() => removePhoto(i)}
                  className="absolute top-2 right-2 bg-black/70 text-white p-1.5 rounded-full"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Input({ label, ...props }) {
  return (
    <div>
      <label className="font-semibold block mb-1 text-sm">{label}</label>
      <input {...props} className="w-full p-3 rounded-xl border bg-white dark:bg-gray-700" />
    </div>
  );
}





// import { motion } from "framer-motion";
// import { ImagePlus, Trash2, UploadCloud } from "lucide-react";
// import { useEffect, useState } from "react";

// export default function UploadAlbum() {
//   const [album, setAlbum] = useState({
//     albumName: "",
//     photographerId: "",
//     client: "",
//     date: "",
//   });

//   const [photos, setPhotos] = useState([]);
//   const [preview, setPreview] = useState([]);
//   const [photographers, setPhotographers] = useState([]);

//   /* ================= LOAD PHOTOGRAPHERS ================= */
//   useEffect(() => {
//     const load = async () => {
//       const token = localStorage.getItem("adminToken");
//       const res = await fetch("http://localhost:5000/api/photographers", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const data = await res.json();
//       setPhotographers(data);
//     };
//     load();
//   }, []);

//   const handleChange = (e) => {
//     setAlbum({ ...album, [e.target.name]: e.target.value });
//   };

//   const handlePhotos = (e) => {
//     const files = Array.from(e.target.files);
//     setPhotos((p) => [...p, ...files]);
//     setPreview((p) => [...p, ...files.map((f) => URL.createObjectURL(f))]);
//   };

//   const removePhoto = (i) => {
//     setPhotos((p) => p.filter((_, idx) => idx !== i));
//     setPreview((p) => p.filter((_, idx) => idx !== i));
//   };

//   /* ================= SUBMIT (REAL API) ================= */
//   const handleSubmit = async () => {
//     if (!album.albumName || photos.length === 0) {
//       alert("Please enter album details and upload photos");
//       return;
//     }

//     try {
//       const token = localStorage.getItem("adminToken");
//       const formData = new FormData();

//       formData.append("albumName", album.albumName);
//       formData.append("photographerId", album.photographerId);
//       formData.append("client", album.client);
//       formData.append("date", album.date);
//       photos.forEach((p) => formData.append("photos", p));

//       const res = await fetch("http://localhost:5000/api/albums", {
//         method: "POST",
//         headers: { Authorization: `Bearer ${token}` },
//         body: formData,
//       });

//       const data = await res.json();

//       alert("Album created successfully!\nQR Generated");
//       console.log("QR URL:", data.qrUrl);
//     } catch {
//       alert("Album creation failed");
//     }
//   };

//   return (
//     <section className="p-4 sm:p-6 md:p-10 max-w-7xl mx-auto">

//       <motion.div initial={{ opacity: 0, y: -25 }} animate={{ opacity: 1, y: 0 }} className="mb-8 sm:mb-12">
//         <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold">
//           Create Album & Upload Photos
//         </h1>
//       </motion.div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

//         {/* LEFT */}
//         <motion.div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-2xl">
//           <div className="space-y-5">
//             <Input label="Album Name" name="albumName" onChange={handleChange} />

//             <select
//               name="photographerId"
//               onChange={handleChange}
//               className="w-full p-3 rounded-xl border bg-white dark:bg-gray-700"
//             >
//               <option value="">Select Photographer</option>
//               {photographers.map((p) => (
//                 <option key={p.id} value={p.id}>
//                   {p.name}
//                 </option>
//               ))}
//             </select>

//             <Input label="Client Name" name="client" onChange={handleChange} />
//             <Input label="Event Date" name="date" type="date" onChange={handleChange} />

//             <motion.label className="flex flex-col items-center border-2 border-dashed rounded-2xl p-6 cursor-pointer">
//               <UploadCloud size={36} />
//               <input type="file" multiple accept="image/*" onChange={handlePhotos} className="hidden" />
//             </motion.label>

//             <motion.button onClick={handleSubmit} className="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-400 to-cyan-400 font-bold">
//               Create Album & Generate QR
//             </motion.button>
//           </div>
//         </motion.div>

//         {/* RIGHT */}
//         <motion.div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-2xl">
//           <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
//             <ImagePlus /> Photo Preview
//           </h3>

//           <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
//             {preview.map((src, i) => (
//               <div key={i} className="relative group">
//                 <img src={src} alt="" className="w-full h-32 object-cover rounded-xl" />
//                 <button onClick={() => removePhoto(i)} className="absolute top-2 right-2 bg-black/70 text-white p-1.5 rounded-full">
//                   <Trash2 size={14} />
//                 </button>
//               </div>
//             ))}
//           </div>
//         </motion.div>
//       </div>
//     </section>
//   );
// }

// function Input({ label, ...props }) {
//   return (
//     <div>
//       <label className="font-semibold block mb-1 text-sm">{label}</label>
//       <input {...props} className="w-full p-3 rounded-xl border bg-white dark:bg-gray-700" />
//     </div>
//   );
// }





// import { motion } from "framer-motion";
// import { ImagePlus, Trash2, UploadCloud } from "lucide-react";
// import { useState } from "react";

// export default function UploadAlbum() {
//   const [album, setAlbum] = useState({
//     albumName: "",
//     photographer: "",
//     client: "",
//     date: "",
//   });

//   const [photos, setPhotos] = useState([]);
//   const [preview, setPreview] = useState([]);

//   /* ================= HANDLE INPUT ================= */
//   const handleChange = (e) => {
//     setAlbum({ ...album, [e.target.name]: e.target.value });
//   };

//   /* ================= HANDLE IMAGE SELECT ================= */
//   const handlePhotos = (e) => {
//     const files = Array.from(e.target.files);

//     setPhotos((prev) => [...prev, ...files]);
//     setPreview((prev) => [
//       ...prev,
//       ...files.map((file) => URL.createObjectURL(file)),
//     ]);
//   };

//   /* ================= REMOVE IMAGE ================= */
//   const removePhoto = (index) => {
//     setPhotos((prev) => prev.filter((_, i) => i !== index));
//     setPreview((prev) => prev.filter((_, i) => i !== index));
//   };

//   /* ================= SUBMIT ================= */
//   const handleSubmit = () => {
//     if (!album.albumName || photos.length === 0) {
//       alert("Please enter album details and upload photos");
//       return;
//     }

//     const albumId = Date.now();
//     const albumUrl = `https://yourdomain.com/album/${albumId}`;

//     console.log({ album, photos, albumUrl });

//     alert(`Album Created!\n\nQR ready for print.`);
//   };

//   return (
//     <section className="p-4 sm:p-6 md:p-10 max-w-7xl mx-auto">

//       {/* ================= HEADER ================= */}
//       <motion.div
//         initial={{ opacity: 0, y: -25 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="mb-8 sm:mb-12"
//       >
//         <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white">
//           Create Album & Upload Photos
//         </h1>
//         <p className="text-gray-600 dark:text-gray-400 mt-1">
//           Admin only • Album will be accessed via QR code
//         </p>
//       </motion.div>

//       {/* ================= CONTENT ================= */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">

//         {/* ================= LEFT FORM ================= */}
//         <motion.div
//           initial={{ opacity: 0, x: -40 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.6 }}
//           className="bg-white dark:bg-gray-800 rounded-3xl p-6 sm:p-8 shadow-2xl"
//         >
//           <div className="space-y-5">
//             <Input label="Album Name" name="albumName" onChange={handleChange} />
//             <Input label="Photographer Name" name="photographer" onChange={handleChange} />
//             <Input label="Client Name" name="client" onChange={handleChange} />
//             <Input label="Event Date" name="date" type="date" onChange={handleChange} />

//             {/* Upload Box */}
//             <motion.label
//               whileHover={{ scale: 1.02 }}
//               className="
//                 flex flex-col items-center justify-center
//                 border-2 border-dashed rounded-2xl p-6
//                 cursor-pointer transition
//                 hover:border-cyan-400
//               "
//             >
//               <UploadCloud size={36} className="text-cyan-400" />
//               <span className="mt-2 text-sm text-gray-500 text-center">
//                 Click to upload photos <br className="sm:hidden" />
//                 (You can upload multiple times)
//               </span>
//               <input
//                 type="file"
//                 multiple
//                 accept="image/*"
//                 onChange={handlePhotos}
//                 className="hidden"
//               />
//             </motion.label>

//             {/* Desktop Button */}
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.96 }}
//               onClick={handleSubmit}
//               className="
//                 hidden sm:block
//                 w-full mt-6 py-4 rounded-xl
//                 bg-gradient-to-r from-emerald-400 to-cyan-400
//                 font-bold text-black shadow-xl
//               "
//             >
//               Create Album & Generate QR
//             </motion.button>
//           </div>
//         </motion.div>

//         {/* ================= RIGHT PREVIEW ================= */}
//         <motion.div
//           initial={{ opacity: 0, x: 40 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.6 }}
//           className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-2xl"
//         >
//           <h3 className="text-lg sm:text-xl font-bold mb-4 flex items-center gap-2">
//             <ImagePlus /> Photo Preview
//           </h3>

//           {preview.length === 0 ? (
//             <p className="text-gray-500">No photos selected</p>
//           ) : (
//             <>
//               <p className="text-sm text-gray-500 mb-4">
//                 Total Photos: {preview.length}
//               </p>

//               <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
//                 {preview.map((src, i) => (
//                   <motion.div
//                     key={i}
//                     whileHover={{ scale: 1.05 }}
//                     className="relative group"
//                   >
//                     <img
//                       src={src}
//                       alt="preview"
//                       className="w-full h-28 sm:h-32 object-cover rounded-xl shadow"
//                     />

//                     <button
//                       onClick={() => removePhoto(i)}
//                       className="
//                         absolute top-2 right-2
//                         bg-black/70 text-white p-1.5 rounded-full
//                         opacity-0 group-hover:opacity-100 transition
//                       "
//                     >
//                       <Trash2 size={14} />
//                     </button>
//                   </motion.div>
//                 ))}
//               </div>
//             </>
//           )}
//         </motion.div>
//       </div>

//       {/* ================= MOBILE STICKY CTA ================= */}
//       <div className="sm:hidden fixed bottom-0 left-0 w-full p-4 bg-white dark:bg-gray-900 border-t">
//         <motion.button
//           whileTap={{ scale: 0.96 }}
//           onClick={handleSubmit}
//           className="
//             w-full py-4 rounded-xl
//             bg-gradient-to-r from-emerald-400 to-cyan-400
//             font-bold text-black shadow-xl
//           "
//         >
//           Create Album & Generate QR
//         </motion.button>
//       </div>
//     </section>
//   );
// }

// /* ================= INPUT ================= */
// function Input({ label, ...props }) {
//   return (
//     <div>
//       <label className="font-semibold block mb-1 text-sm">
//         {label}
//       </label>
//       <input
//         {...props}
//         className="
//           w-full p-3 rounded-xl
//           border border-gray-300 dark:border-gray-600
//           bg-white dark:bg-gray-700
//           text-gray-900 dark:text-white
//           focus:ring-2 focus:ring-cyan-400 outline-none
//         "
//       />
//     </div>
//   );
// }
