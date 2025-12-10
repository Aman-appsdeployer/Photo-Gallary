import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "", website: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ loading: false, success: null, error: null });

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Please enter your name.";
    if (!form.email.trim()) e.email = "Please enter your email.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email address.";
    if (!form.message.trim() || form.message.trim().length < 10) e.message = "Message must be at least 10 characters.";
    if (form.website) e.website = "Spam detected.";
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
    setStatus({ loading: false, success: null, error: null });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: false, success: null, error: null });

    const eObj = validate();
    setErrors(eObj);
    if (Object.keys(eObj).length > 0) return;

    if (form.website) {
      setStatus({ loading: false, success: null, error: "Spam detected." });
      return;
    }

    setStatus({ loading: true, success: null, error: null });

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name, email: form.email, message: form.message }),
      });

      if (!res.ok) throw new Error("Server error");

      setStatus({ loading: false, success: "Message sent — thank you! We'll reply soon.", error: null });
      setForm({ name: "", email: "", message: "", website: "" });
    } catch (err) {
      setStatus({ loading: false, success: null, error: "Couldn't send via site — try emailing us directly." });
    }
  };

  const hero = "/images/img11.jpg";

  return (
    <main className="pt-20 min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 selection:bg-emerald-200 selection:text-emerald-900">

      {/* HERO SECTION */}
      <section className="relative h-64 md:h-72 lg:h-96 overflow-hidden">
        <motion.img
          src={hero}
          alt="Couple portrait hero"
          className="w-full h-full object-cover brightness-90"
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.6, ease: "easeOut" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white"
            >
              Let's Make Memories
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.12 }}
              className="mt-3 text-white/90 max-w-2xl mx-auto"
            >
              Planning a wedding, elopement or portraits? Tell us your vision — we’ll make it cinematic.
            </motion.p>
          </div>
        </div>
      </section>

      {/* TWO COLUMN LAYOUT */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* LEFT SIDE */}
          <motion.aside
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-1 bg-gray-100 dark:bg-gray-800 p-6 rounded-2xl shadow-lg"
          >
            <h2 className="text-2xl font-bold mb-4">Visit Our Studio</h2>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              We welcome consultations by appointment. Pop in for a chat — we'd love to meet you.
            </p>

            <div className="mt-6 space-y-4 text-gray-700 dark:text-gray-300">
              <div>
                <div className="font-semibold">📍 Address</div>
                <div className="text-sm">123 Photography Street, Creative City, India</div>
              </div>
              <div>
                <div className="font-semibold">📞 Phone</div>
                <div className="text-sm">+91 98765 43210</div>
              </div>
              <div>
                <div className="font-semibold">✉️ Email</div>
                <div className="text-sm">hello@amanstudio.com</div>
              </div>
            </div>
            <div className="mt-6">
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 px-4 py-2 bg-cyan-400 text-white rounded-lg font-semibold shadow hover:scale-[1.02] transition-transform"
              >
                Follow on Instagram
              </a>
            </div>
          </motion.aside>

          {/* RIGHT SIDE (FORM) */}
          <motion.div
            initial={{ opacity: 0, x: 12 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
              <h2 className="text-2xl font-bold mb-2">Send a Message</h2>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
                Tell us about your plan — date, venue, style. We'll reply with packages.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4" noValidate>

                {/* HONEYPOT FIELD */}
                <div style={{ position: "absolute", left: "-9999px" }} aria-hidden>
                  <label htmlFor="website">Website</label>
                  <input id="website" name="website" value={form.website} onChange={handleChange} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm mb-2">Your Name</label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      type="text"
                      placeholder="Enter your name"
                      className={`w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-700 border ${
                        errors.name ? "border-red-400" : "border-gray-300 dark:border-gray-600"
                      }`}
                    />
                    {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-sm mb-2">Email Address</label>
                    <input
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      type="email"
                      placeholder="Enter your email"
                      className={`w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-700 border ${
                        errors.email ? "border-red-400" : "border-gray-300 dark:border-gray-600"
                      }`}
                    />
                    {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm mb-2">Message</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows="5"
                    placeholder="Tell us more..."
                    className={`w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-700 border ${
                      errors.message ? "border-red-400" : "border-gray-300 dark:border-gray-600"
                    }`}
                  />
                  {errors.message && <p className="text-sm text-red-500">{errors.message}</p>}
                </div>

                <div className="flex items-center gap-4">
                  <button
                    type="submit"
                    className="px-6 py-3 bg-cyan-400 text-white rounded-lg font-semibold shadow hover:scale-[1.02] transition disabled:opacity-60"
                    disabled={status.loading}
                  >
                    {status.loading ? "Sending..." : "Send Message"}
                  </button>

                  <a href="mailto:hello@amanstudio.com" className="text-sm underline text-gray-600 dark:text-gray-300">
                    Or email us directly
                  </a>
                </div>

                <AnimatePresence>
                  {status.success && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-3 rounded-md bg-green-50 text-green-700">
                      {status.success}
                    </motion.div>
                  )}
                  {status.error && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-3 rounded-md bg-red-50 text-red-700">
                      {status.error}
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ⭐⭐ FULL-WIDTH MAP ROW — NEW ⭐⭐ */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16"
      >
        <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
          <div className="p-6 border-b border-gray-300 dark:border-gray-700">
            <h2 className="text-2xl font-bold">Find Us On the Map</h2>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Here’s our exact location — reach us easily.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
            className="w-full h-72 md:h-96"
          >
            <iframe
              title="Studio full map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.019403123456!2d77.5946!3d12.9716!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDU4JzQ2LjAiTiA3N8KwMzUnMjAuMCJF!5e0!3m2!1sen!2sin!4v0000000000000"
              className="w-full h-full border-0"
              loading="lazy"
            ></iframe>
          </motion.div>
        </div>
      </motion.section>

    </main>
  );
}
