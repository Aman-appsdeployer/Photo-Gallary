import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "", website: "" }); // website = honeypot
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ loading: false, success: null, error: null });

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Please enter your name.";
    if (!form.email.trim()) e.email = "Please enter your email.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email address.";
    if (!form.message.trim() || form.message.trim().length < 10) e.message = "Message must be at least 10 characters.";
    // honeypot should be empty
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

    // If honeypot filled, block
    if (form.website) {
      setStatus({ loading: false, success: null, error: "Spam detected." });
      return;
    }

    setStatus({ loading: true, success: null, error: null });

    try {
      // Replace this URL with your real backend endpoint (e.g. Netlify Function, Vercel, SendGrid)
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name, email: form.email, message: form.message }),
      });

      if (!res.ok) {
        // if backend not configured, provide helpful fallback
        throw new Error("Server error");
      }

      setStatus({ loading: false, success: "Message sent — thank you! We'll reply soon.", error: null });
      setForm({ name: "", email: "", message: "", website: "" });
    } catch (err) {
      // fallback: open mail client with prefilled email
      const mailto = `mailto:support@photogallery.com?subject=${encodeURIComponent(
        "Website contact from " + form.name
      )}&body=${encodeURIComponent(form.message + "\n\n— " + form.name + " | " + form.email)}`;

      setStatus({
        loading: false,
        success: null,
        error:
          "Couldn't send via the site. You can try again later or send an email directly.",
      });

     
    }
  };

  return (
    <main className="pt-28 min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-center mb-4">Contact Us</h1>
        <p className="text-center text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-10">
          Have a question or want to book a session? Fill out the form below or reach out directly.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Left: Contact Info */}
          <div className="bg-gray-100 dark:bg-gray-800 p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>

            <div className="space-y-5 text-gray-700 dark:text-gray-300">
              <div>
                <p className="font-semibold text-lg">📍 Studio Address</p>
                <p className="text-sm mt-1">123 Photography Street, Creative City, India</p>
              </div>

              <div>
                <p className="font-semibold text-lg">📞 Phone</p>
                <p className="text-sm mt-1">+91 9876543210</p>
              </div>

              <div>
                <p className="font-semibold text-lg">✉️ Email</p>
                <p className="text-sm mt-1">support@photogallery.com</p>
              </div>

              <div>
                <p className="font-semibold text-lg">⏰ Working Hours</p>
                <p className="text-sm mt-1">Mon – Sat: 9:00 AM – 6:00 PM</p>
              </div>
            </div>

            <div className="mt-8">
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noreferrer"
                className="inline-block px-6 py-3 bg-cyan-600 text-white rounded-lg shadow hover:bg-cyan-700 transition"
              >
                Follow on Instagram
              </a>
            </div>
          </div>

          {/* Right: Interactive Contact Form */}
          <form
            onSubmit={handleSubmit}
            className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg space-y-5"
            noValidate
            aria-labelledby="contact-form-heading"
          >
            <h2 id="contact-form-heading" className="text-2xl font-bold mb-2">
              Send a Message
            </h2>

            {/* honeypot - hidden to users, bots may fill it */}
            <div style={{ display: "none" }} aria-hidden>
              <label>Website</label>
              <input name="website" value={form.website} onChange={handleChange} />
            </div>

            <div>
              <label className="block text-sm mb-2" htmlFor="name">
                Your Name
              </label>
              <input
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                type="text"
                placeholder="Enter your name"
                className={`w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-700 border ${
                  errors.name ? "border-red-400" : "border-gray-300 dark:border-gray-600"
                } focus:ring-2 focus:ring-cyan-500 outline-none`}
                required
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "error-name" : undefined}
              />
              {errors.name && <p id="error-name" className="text-sm text-red-500 mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-sm mb-2" htmlFor="email">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                type="email"
                placeholder="Enter your email"
                className={`w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-700 border ${
                  errors.email ? "border-red-400" : "border-gray-300 dark:border-gray-600"
                } focus:ring-2 focus:ring-cyan-500 outline-none`}
                required
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "error-email" : undefined}
              />
              {errors.email && <p id="error-email" className="text-sm text-red-500 mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm mb-2" htmlFor="message">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={form.message}
                onChange={handleChange}
                rows="5"
                placeholder="Write your message..."
                className={`w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-700 border ${
                  errors.message ? "border-red-400" : "border-gray-300 dark:border-gray-600"
                } focus:ring-2 focus:ring-cyan-500 outline-none`}
                required
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? "error-message" : undefined}
              />
              {errors.message && <p id="error-message" className="text-sm text-red-500 mt-1">{errors.message}</p>}
            </div>

            {/* status messages */}
            {status.success && <div className="p-3 rounded-md bg-green-50 text-green-700">{status.success}</div>}
            {status.error && <div className="p-3 rounded-md bg-red-50 text-red-700">{status.error}</div>}

            <button
              type="submit"
              disabled={status.loading}
              className="w-full py-3 bg-cyan-600 text-white rounded-lg shadow hover:bg-cyan-700 transition disabled:opacity-60"
              aria-busy={status.loading}
            >
              {status.loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
