import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  // HARDCODED — WORKS 100% (safe for public key)
  const EMAILJS_KEY      = "ei0Yx7owixM86BFDM";
  const EMAILJS_SERVICE  = "service_k1wt2rk";
  const EMAILJS_TEMPLATE = "template_khp8d4a";

  useEffect(() => {
    if (typeof window === "undefined" || window.emailjs) return;

    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js";
    script.async = true;
    script.onload = () => {
      window.emailjs.init(EMAILJS_KEY);
      console.log("EmailJS Ready!");
    };
    document.body.appendChild(script);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    try {
      await window.emailjs.send(
        EMAILJS_SERVICE,
        EMAILJS_TEMPLATE,
        {
          from_name: formData.name,
          from_email: formData.email,
          phone: formData.mobile,
          message: formData.message,
        }
      );

      setStatus("success");
      setFormData({ name: "", mobile: "", email: "", message: "" });
    } catch (err) {
      console.error("Send failed:", err);
      setStatus("error");
    } finally {
      setTimeout(() => setStatus(""), 5000);
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
          {/* Contact Details */}
          <div className="space-y-4 text-navy-700">
            <h3 className="text-xl font-bold sm:text-2xl">Details</h3>
            <p className="text-sm sm:text-base">
              <strong>Address:</strong> Plot No. H-27, First Floor, Sector-9 Gautam Buddha Nagar, Noida, UP-201301
            </p>
            <p className="text-sm sm:text-base">
              <strong>Phone:</strong>{" "}
              <a href="tel:+919899572539" className="text-blue-600 underline hover:text-blue-800">+91 9899572539</a>
              {" , "}
              <a href="tel:0120-4486192" className="text-blue-600 underline hover:text-blue-800">0120-4486192</a>
            </p>
            <p className="text-sm sm:text-base">
              <strong>Email:</strong>{" "}
              <a href="mailto:indiaadvertising05@gmail.com" className="text-blue-600 underline hover:text-blue-800">
                indiaadvertising05@gmail.com
              </a>
            </p>
            <p className="text-sm sm:text-base">
              <strong>Website:</strong>{" "}
              <a href="https://www.indiadvertising.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline hover:text-blue-800">
                www.indiadvertising.com
              </a>
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required className="w-full p-3 border rounded outline-none sm:p-4 border-navy-300 focus:border-yellow-500" />
            <input type="tel" name="mobile" placeholder="Mobile No." value={formData.mobile} onChange={handleChange} required className="w-full p-3 border rounded outline-none sm:p-4 border-navy-300 focus:border-yellow-500" />
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required className="w-full p-3 border rounded outline-none sm:p-4 border-navy-300 focus:border-yellow-500" />
            <textarea name="message" placeholder="Message" value={formData.message} onChange={handleChange} rows="4" required className="w-full p-3 border rounded outline-none resize-none sm:p-4 border-navy-300 focus:border-yellow-500" />

            <motion.button
              type="submit"
              disabled={status === "sending"}
              className={`w-full py-4 font-bold text-navy-800 rounded transition-all ${status === "sending" ? "bg-gray-400" : "bg-yellow-500 hover:bg-yellow-600"}`}
              whileHover={{ scale: status !== "sending" ? 1.02 : 1 }}
              whileTap={{ scale: status !== "sending" ? 0.98 : 1 }}
            >
              {status === "sending" ? "Sending…" : "Send Message"}
            </motion.button>

            {status === "success" && (
              <motion.div className="p-4 text-center text-green-600 border-l-4 border-green-600 rounded bg-green-50">
                Message sent successfully! We'll reply soon.
              </motion.div>
            )}
            {status === "error" && (
              <motion.div className="p-4 text-center text-red-600 border-l-4 border-red-600 rounded bg-red-50">
                Failed to send. Please try again.
              </motion.div>
            )}
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;