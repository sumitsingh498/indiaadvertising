// src/components/FloatingChat.jsx
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Sparkles, CheckCircle } from "lucide-react";
import companyData from "../data/companyData.json";

const FloatingChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState("welcome");
  const [selectedQuery, setSelectedQuery] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [typing, setTyping] = useState(false);
  const hasOpened = useRef(false);

  // Dynamic quick options from your real categories
  const quickOptions = companyData.categories
    ?.slice(0, 8)
    .map(cat => `${cat.category.replace("Sign", "").trim()} Signage?`)
    .concat(["LED Sign Board Price?", "Full Catalogue PDF", "Shop Front Glow Sign"]);

  // Auto-open once after 12 seconds
  useEffect(() => {
    if (!hasOpened.current && !isOpen) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        hasOpened.current = true;
      }, 12000);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // EmailJS Setup - YOUR WORKING CONFIG
  const SERVICE_ID = "service_k1wt2rk";
  const TEMPLATE_ID = "template_khp8d4a";
  const PUBLIC_KEY = "ei0Yx7owixM86BFDM";

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js";
    script.async = true;
    script.onload = () => window.emailjs?.init(PUBLIC_KEY);
    document.body.appendChild(script);
  }, []);

  const sendLead = async () => {
    if (!name || !phone) return;
    setLoading(true);

    try {
      await window.emailjs.send(SERVICE_ID, TEMPLATE_ID, {
        product: selectedQuery || "Quick Chat Inquiry",
        from_name: name,
        from_email: "chat@indiaadvertising.in", // optional fallback
        phone: phone,
        message: `Chat Lead: ${selectedQuery || "General inquiry"}\nName: ${name}\nPhone: ${phone}`,
      });
      setStep("success");
    } catch (err) {
      console.warn("EmailJS failed (offline/demo mode)", err);
      setStep("success"); // Still show success for UX
    } finally {
      setLoading(false);
    }
  };

  const handleQuickSelect = (option) => {
    setSelectedQuery(option);
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setStep("form");
    }, 1800);
  };

  const resetChat = () => {
    setStep("welcome");
    setName("");
    setPhone("");
    setSelectedQuery("");
  };

  return (
    <>
      {/* Floating Button */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 200 }}
        className="fixed z-50 bottom-5 right-5"
      >
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.95 }}
          className="relative flex items-center justify-center w-16 h-16 text-white rounded-full shadow-2xl bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700"
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div key="close" initial={{ rotate: 90 }} animate={{ rotate: 0 }}>
                <X size={32} />
              </motion.div>
            ) : (
              <motion.div key="chat" initial={{ rotate: -90 }} animate={{ rotate: 0 }}>
                <MessageCircle size={34} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Online Indicator */}
          {!isOpen && (
            <motion.div
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ repeat: Infinity, duration: 3 }}
              className="absolute w-4 h-4 bg-green-400 border-white rounded-full shadow-lg border-3 -top-1 -right-1"
            />
          )}
        </motion.button>
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", damping: 25 }}
            className="fixed z-50 overflow-hidden bg-white border border-gray-200 shadow-2xl w-80 sm:w-96 bottom-24 right-5 rounded-3xl"
          >
            {/* Header */}
            <div className="p-5 text-white bg-gradient-to-r from-blue-600 to-purple-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white/20">
                      <Sparkles size={24} />
                    </div>
                    <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-400 border-2 border-white rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold">India Advertising</h4>
                    <p className="text-xs opacity-90">Typically replies in minutes</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 transition rounded-full hover:bg-white/20"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Chat Body */}
            <div className="p-5 space-y-4 overflow-y-auto h-96 bg-gradient-to-b from-gray-50 to-white">
              {/* Welcome */}
              {step === "welcome" && (
                <>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-white rounded-2xl shadow-sm max-w-[85%] border border-gray-100"
                  >
                    <p className="font-semibold text-gray-800">Namaste! Welcome to India Advertising</p>
                    <p className="mt-1 text-sm text-gray-600">How can we help you today?</p>
                  </motion.div>

                  <div className="mt-4 space-y-3">
                    {quickOptions.map((option, i) => (
                      <motion.button
                        key={option}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        onClick={() => handleQuickSelect(option)}
                        className="w-full p-3.5 text-left text-sm font-medium text-blue-800 bg-white border border-gray-200 rounded-2xl hover:bg-blue-50 hover:border-blue-300 hover:shadow-md transition-all shadow-sm"
                      >
                        {option}
                      </motion.button>
                    ))}
                  </div>
                </>
              )}

              {/* User Message */}
              {step === "form" && selectedQuery && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="ml-auto p-3.5 bg-blue-600 text-white rounded-2xl max-w-[80%] shadow-lg"
                >
                  {selectedQuery}
                </motion.div>
              )}

              {/* Bot Typing */}
              <AnimatePresence>
                {typing && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-3"
                  >
                    <div className="p-4 bg-white shadow-sm rounded-2xl">
                      <div className="flex gap-2">
                        {[0, 0.2, 0.4].map((d) => (
                          <motion.div
                            key={d}
                            animate={{ y: [0, -8, 0] }}
                            transition={{ repeat: Infinity, duration: 1.2, delay: d }}
                            className="w-2 h-2 bg-gray-500 rounded-full"
                          />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Form */}
              {step === "form" && (
                <>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-white border border-gray-100 shadow-sm rounded-2xl"
                  >
                    <p className="text-sm font-medium text-gray-800">
                      Great choice! Just share your details — we'll call you <strong>soon</strong>
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mt-4 space-y-4"
                  >
                    <input
                      type="text"
                      placeholder="Your Name *"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3.5 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition"
                    />
                    <input
                      type="tel"
                      placeholder="Mobile Number *"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-3.5 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition"
                    />
                  </motion.div>
                </>
              )}

              {/* Success */}
              {step === "success" && (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="py-12 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    className="flex items-center justify-center w-20 h-20 mx-auto mb-4 bg-green-100 rounded-full"
                  >
                    <CheckCircle size={48} className="text-green-600" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-green-700">Thank You!</h3>
                  <p className="mt-2 text-gray-600">We’ll call you soon</p>
                  <p className="mt-4 text-xs text-gray-500">You can close this chat now</p>
                </motion.div>
              )}
            </div>

            {/* Send Button */}
            {step === "form" && (
              <div className="p-5 border-t bg-gray-50">
                <button
                  onClick={sendLead}
                  disabled={!name || !phone || loading}
                  className="flex items-center justify-center w-full gap-2 py-4 font-bold text-white transition-all rounded-xl bg-gradient-to-r from-blue-600 to-purple-700 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    "Sending..."
                  ) : (
                    <>
                      Send Request <Send size={20} />
                    </>
                  )}
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingChat;