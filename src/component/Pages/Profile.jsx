import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Profile() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        studio: "",
        bio: "",
        avatar: null,
    });

    const [fadeIn, setFadeIn] = useState(false);
    useEffect(() => setFadeIn(true), []);

    // Handle Input Change
    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData({ ...formData, [name]: files ? files[0] : value });
    };

    // Submit Form
    const handleSubmit = async () => {
        const form = new FormData();
        Object.entries(formData).forEach(([key, value]) => value && form.append(key, value));

        await fetch("http://localhost:8000/photographer/profile", {
            method: "POST",
            body: form,
        });

        alert("Profile Saved Successfully!");
    };

    return (
        <main className="min-h-screen bg-white dark:bg-gray-900 pt-20">

            {/* ⭐ HERO SECTION — Like About.jsx */}
            <header className="relative h-[60vh] md:h-[70vh] lg:h-[78vh] overflow-hidden">

                {/* Mosaic Background */}
                <div className="absolute inset-0 grid grid-cols-6 gap-0 transform scale-105 pointer-events-none">
                    {[1, 2, 3, 1, 2, 3].map((img, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: i % 2 === 0 ? -30 : 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1.2, delay: i * 0.07 }}
                        >
                            <img
                                src={`/images/img2.jpg`}
                                alt="mosaic"
                                className="w-full h-full object-cover brightness-90"
                            />
                        </motion.div>
                    ))}
                </div>

                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-black/50"></div>

                {/* Hero Text */}
                <div className="absolute inset-0 flex items-center justify-center text-center px-6">
                    <div>
                        <motion.h1
                            initial={{ opacity: 0, y: 25 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1 }}
                            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white drop-shadow-2xl"
                        >
                            Photographer <span className="text-emerald-300">Profile</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3, duration: 1 }}
                            className="mt-4 text-lg text-white/90 max-w-2xl mx-auto"
                        >
                            This information will appear inside the digital album scanned by your clients.
                        </motion.p>
                    </div>
                </div>
            </header>

            {/* ⭐ CONTENT SECTION */}
            <div className="max-w-6xl mx-auto px-6 py-14">

                {/* Two Column Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

                    {/* LEFT — PHOTO PANEL */}
                    <motion.div
                        initial={{ opacity: 0, x: -25 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="relative rounded-2xl overflow-hidden shadow-2xl"
                    >
                        <img
                            src="/images/img3.jpg"
                            alt="photographer panel"
                            className="w-full h-[550px] object-cover"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>

                        <div className="absolute bottom-8 left-8 text-white">
                            <h2 className="text-3xl font-bold drop-shadow-xl">
                                Build Your Professional Identity
                            </h2>
                            <p className="text-white/80 w-72 mt-2">
                                Clients will see this identity when they scan your QR album.
                            </p>
                        </div>
                    </motion.div>

                    {/* RIGHT — FORM PANEL */}
                    <motion.div
                        initial={{ opacity: 0, x: 25 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="bg-white dark:bg-gray-800 p-10 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700"
                    >
                        <h2 className="text-3xl font-bold mb-6 dark:text-white">
                            Enter Your Information
                        </h2>

                        {/* INPUT FIELDS */}
                        <div className="space-y-5">

                            {/* FULL NAME */}
                            <div className="input-group">
                                <input
                                    type="text"
                                    name="name"
                                    placeholder=" "
                                    onChange={handleChange}
                                    className="input-floating"
                                />
                                <label className="input-label-float">Full Name</label>
                            </div>

                            {/* EMAIL */}
                            <div className="input-group">
                                <input
                                    type="email"
                                    name="email"
                                    placeholder=" "
                                    onChange={handleChange}
                                    className="input-floating"
                                />
                                <label className="input-label-float">Email Address</label>
                            </div>

                            {/* PHONE */}
                            <div className="input-group">
                                <input
                                    type="text"
                                    name="phone"
                                    placeholder=" "
                                    onChange={handleChange}
                                    className="input-floating"
                                />
                                <label className="input-label-float">Phone Number</label>
                            </div>

                            {/* STUDIO NAME */}
                            <div className="input-group">
                                <input
                                    type="text"
                                    name="studio"
                                    placeholder=" "
                                    onChange={handleChange}
                                    className="input-floating"
                                />
                                <label className="input-label-float">Studio Name</label>
                            </div>

                            {/* BIO */}
                            <div className="input-group">
                                <textarea
                                    name="bio"
                                    rows="4"
                                    placeholder=" "
                                    onChange={handleChange}
                                    className="textarea-floating input-floating"
                                ></textarea>
                                <label className="input-label-float">About / Bio</label>
                            </div>

                            {/* PROFILE PHOTO */}
                            <div>
                                <label className="font-semibold dark:text-gray-200">Profile Photo</label>
                                <input
                                    type="file"
                                    name="avatar"
                                    accept="image/*"
                                    onChange={handleChange}
                                    className="w-full p-3 rounded-xl bg-gray-50 dark:bg-gray-700 dark:text-white border border-gray-300 dark:border-gray-600 shadow-sm"
                                />
                            </div>

                        </div>

                        {/* Save Button */}
                        <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleSubmit}
                            className="w-full mt-8 bg-gradient-to-r from-emerald-300 to-cyan-400 hover:opacity-95 text-gray-900 font-semibold p-4 rounded-xl text-lg shadow-xl"
                        >
                            Save Profile
                        </motion.button>

                        {/* Quote */}
                        <p className="mt-6 text-center italic text-gray-600 dark:text-gray-300">
                            “Photography is a love affair with life.”
                        </p>
                    </motion.div>
                </div>
            </div>
        </main>
    );
}
