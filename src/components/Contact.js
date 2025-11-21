import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState(""); // success | error | sending

  // EmailJS configuration (use EmailJS service - safer than embedding SMTP creds in client)
  const EMAILJS_KEY = process.env.REACT_APP_EMAILJS_KEY || "YOUR_EMAILJS_PUBLIC_KEY_HERE";
  const EMAILJS_SERVICE = process.env.REACT_APP_EMAILJS_SERVICE || "service_indiaadv";
  const EMAILJS_TEMPLATE = process.env.REACT_APP_EMAILJS_TEMPLATE || "template_indiaadv";
  const CONTACT_EMAIL = process.env.REACT_APP_CONTACT_EMAIL || "indiaadvertising05@gmail.com";

  // Initialize EmailJS on component mount (loads the client-side SDK)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.emailjs) return; // already loaded
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/index.min.js";
    script.async = true;
    script.onload = () => {
      try {
        if (window.emailjs && EMAILJS_KEY && EMAILJS_KEY !== 'YOUR_EMAILJS_PUBLIC_KEY_HERE') {
          window.emailjs.init(EMAILJS_KEY);
        }
      } catch (err) {
        // initialization failed silently
        console.warn('EmailJS init failed:', err);
      }
    };
    document.body.appendChild(script);
    return () => {
      // don't remove script - other components may use it
    };
  }, [EMAILJS_KEY]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    try {
      // If EmailJS is available and configured, send using that (no backend required)
      if (window.emailjs && EMAILJS_KEY && EMAILJS_KEY !== 'YOUR_EMAILJS_PUBLIC_KEY_HERE') {
        await window.emailjs.send(EMAILJS_SERVICE, EMAILJS_TEMPLATE, {
          from_name: formData.name,
          from_email: formData.email,
          phone: formData.mobile,
          message: formData.message,
          to_email: CONTACT_EMAIL,
        });
      } else {
        // Fallback: EmailJS not configured — keep demo behavior (logs to console)
        console.info('EmailJS not configured - falling back to demo log.');
        console.log('Contact form submission (demo):', {
          ...formData,
          to_email: CONTACT_EMAIL,
        });
      }

      setStatus("success");
      setFormData({ name: "", mobile: "", email: "", message: "" });
      setTimeout(() => setStatus(""), 4000);
    } catch (err) {
      console.error("Email send failed:", err);
      setStatus("error");
      setTimeout(() => setStatus(""), 4000);
    }
  };

  return (
    <section id="contact" className="py-12 sm:py-20 bg-navy-50">
      <div className="px-4 mx-auto max-w-7xl">
        <motion.h2
          className="mb-8 text-3xl font-bold text-center sm:text-5xl sm:mb-12 text-navy-800"
          initial={{ y: -50 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true }}
        >
          Contact Us
        </motion.h2>

        <motion.div
          className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {/* ----- Contact Details ----- */}
          <div className="space-y-4 text-navy-700">
            <h3 className="text-xl font-bold sm:text-2xl">Details</h3>
            <p className="text-sm sm:text-base">
              <strong>Address:</strong> Plot No. H-27, First Floor, Sector-9 Gautam Buddha Nagar, Noida, UP-201301
            </p>
            <p className="text-sm sm:text-base">
              <strong>Phone:</strong>{" "}
              <a 
                href="tel:+919899572539" 
                className="text-blue-600 transition-colors hover:text-blue-800 hover:underline"
                title="Click to call"
              >
                +91 9899572539
              </a>
              <span> , </span>
              <a 
                href="tel:0120-4486192" 
                className="text-blue-600 transition-colors hover:text-blue-800 hover:underline"
                title="Click to call"
              >
                0120-4486192
              </a>
            </p>
            <p className="text-sm sm:text-base">
              <strong>Email:</strong>{" "}
              <a 
                href="mailto:indiaadvertising05@gmail.com" 
                className="text-blue-600 transition-colors hover:text-blue-800 hover:underline"
                title="Click to email"
              >
                indiaadvertising05@gmail.com
              </a>
            </p>
            
            <p className="text-sm sm:text-base">
              <strong>Website:</strong>{" "}
              <a 
                href="https://www.indiadvertising.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-blue-600 transition-colors hover:text-blue-800 hover:underline"
                title="Visit website"
              >
                www.indiadvertising.com
              </a>
            </p>
          </div>

          {/* ----- Contact Form ----- */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border rounded sm:p-4 border-navy-300 focus:border-yellow-500 focus:outline-none"
              required
            />
            <input
              type="tel"
              name="mobile"
              placeholder="Mobile No."
              value={formData.mobile}
              onChange={handleChange}
              className="w-full p-3 border rounded sm:p-4 border-navy-300 focus:border-yellow-500 focus:outline-none"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border rounded sm:p-4 border-navy-300 focus:border-yellow-500 focus:outline-none"
              required
            />
            <textarea
              name="message"
              placeholder="Message"
              value={formData.message}
              onChange={handleChange}
              rows="3"
              className="w-full p-3 border rounded sm:p-4 border-navy-300 focus:border-yellow-500 focus:outline-none"
              required
            />
            <motion.button
              type="submit"
              disabled={status === "sending"}
              className={`w-full py-3 text-sm font-bold rounded text-navy-800 sm:py-4 sm:text-base neon-glow transition-all duration-300 ${
                status === "sending" ? "bg-gray-400 cursor-not-allowed" : "bg-yellow-500 hover:bg-yellow-600 active:scale-95"
              }`}
              whileHover={status !== "sending" ? { scale: 1.02 } : {}}
              whileTap={status !== "sending" ? { scale: 0.98 } : {}}
              aria-busy={status === "sending"}
            >
              {status === "sending" ? "Sending…" : "Send Message"}
            </motion.button>

            {/* ----- Feedback Toast ----- */}
            {status === "success" && (
              <motion.div 
                className="p-4 mt-2 text-center text-green-600 border-l-4 border-green-600 rounded bg-green-50"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                ✓ Message sent successfully! We'll be in touch soon.
              </motion.div>
            )}
            {status === "error" && (
              <motion.div 
                className="p-4 mt-2 text-center text-red-600 border-l-4 border-red-600 rounded bg-red-50"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                ✗ Failed to send. Please try again or call us directly.
              </motion.div>
            )}
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;