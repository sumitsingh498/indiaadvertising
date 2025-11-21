// src/components/FloatingChat.jsx
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Sparkles } from "lucide-react";
import companyData from "../data/companyData.json"; // Your real data

const FloatingChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState("welcome");
  const [selectedQuery, setSelectedQuery] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [typing, setTyping] = useState(false);
  const hasOpened = useRef(false);

  // DYNAMIC QUICK OPTIONS FROM JSON
  const quickOptions = companyData.categories
    ?.slice(0, 8) // Show top 8 most popular
    .map(cat => cat.category.replace("Sign", "").trim() + " Signage?")
    .concat(["LED Sign Board Price?", "Send Full Catalogue", "Get Quote for Shop Front"]);

  // Auto-open after 15 seconds (once per visit)
  useEffect(() => {
    if (!hasOpened.current) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        hasOpened.current = true;
      }, 15000);
      return () => clearTimeout(timer);
    }
  }, []);

  // EmailJS Setup (same as your form)
  const EMAILJS_USER_ID = process.env.REACT_APP_EMAILJS_KEY;
  const EMAILJS_SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE;
  const EMAILJS_TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE;

  useEffect(() => {
    if (EMAILJS_USER_ID) {
      const script = document.createElement("script");
      script.src = "https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js";
      script.onload = () => window.emailjs.init(EMAILJS_USER_ID);
      document.body.appendChild(script);
    }
  }, [EMAILJS_USER_ID]);

  const sendMessage = async () => {
    if (!name || !phone) return;
    setLoading(true);

    const templateParams = {
      from_name: name,
      phone: phone,
      message: selectedQuery || "Quick inquiry from chat",
    };

    try {
      if (window.emailjs) {
        await window.emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams);
      }
      setStep("sent");
    } catch (err) {
      setStep("sent"); // Still show success even if offline
    } finally {
      setLoading(false);
      setTimeout(() => {
        setIsOpen(false);
        setTimeout(() => {
          setStep("welcome");
          setName("");
          setPhone("");
          setSelectedQuery("");
        }, 1000);
      }, 3000);
    }
  };

  const handleQuickSelect = (option) => {
    setSelectedQuery(option);
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setStep("form");
    }, 1500);
  };

  return (
    <>
      {/* Floating Button */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.5, type: "spring" }}
        className="fixed z-50 bottom-6 right-6"
      >
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.95 }}
          className="relative flex items-center justify-center w-16 h-16 text-white rounded-full shadow-2xl bg-gradient-to-br from-blue-600 to-blue-800"
        >
          {isOpen ? <X size={32} /> : <MessageCircle size={34} />}
          {!isOpen && (
            <motion.div
              animate={{ scale: [1, 1.4, 1] }}
              transition={{ repeat: Infinity, duration: 4 }}
              className="absolute w-5 h-5 bg-green-500 border-4 border-white rounded-full -top-1 -right-1"
            />
          )}
        </motion.button>
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.9 }}
            className="fixed z-50 overflow-hidden bg-white border border-gray-200 shadow-2xl w-80 bottom-24 right-6 rounded-2xl sm:w-96"
          >
            {/* Header */}
            <div className="p-4 text-white bg-gradient-to-r from-blue-600 to-blue-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white/20">
                    <Sparkles size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold">India Advertising</h4>
                    <p className="text-xs opacity-90">We reply in minutes!</p>
                  </div>
                </div>
                <button onClick={() => setIsOpen(false)} className="p-1 rounded hover:bg-white/20">
                  <X size={20} />
                </button>
              </div>
            </div>

            <div className="p-5 space-y-4 overflow-y-auto h-96 bg-gray-50">
              {step === "welcome" && (
                <>
                  <div className="p-4 bg-white rounded-2xl shadow-sm max-w-[80%]">
                    <p className="font-medium">Namaste! Welcome to India Advertising</p>
                    <p className="mt-1 text-sm text-gray-600">How can we help you today?</p>
                  </div>

                  <div className="grid grid-cols-1 gap-3 mt-4">
                    {quickOptions.map((option) => (
                      <button
                        key={option}
                        onClick={() => handleQuickSelect(option)}
                        className="p-3 text-sm font-medium text-left text-blue-800 transition-all bg-white border border-gray-200 rounded-xl hover:bg-blue-50 hover:shadow-md"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </>
              )}

              {/* Typing Indicator */}
              {typing && (
                <div className="flex items-center gap-2 max-w-[80%]">
                  <div className="p-4 bg-gray-200 rounded-2xl">
                    <div className="flex gap-2">
                      {[0, 0.2, 0.4].map((delay) => (
                        <motion.div
                          key={delay}
                          animate={{ opacity: [0.4, 1, 0.4] }}
                          transition={{ repeat: Infinity, duration: 1.4, delay }}
                          className="w-2 h-2 bg-gray-600 rounded-full"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {step === "form" && (
                <>
                  <div className="p-4 ml-auto bg-blue-100 rounded-2xl max-w-[80%]">
                    <p className="text-sm font-medium">{selectedQuery}</p>
                  </div>

                  <div className="p-4 bg-white rounded-2xl shadow-sm max-w-[80%]">
                    <p className="text-sm">Perfect! Share your details — we'll call you in 5 mins</p>
                  </div>

                  <div className="mt-4 space-y-3">
                    <input
                      type="text"
                      placeholder="Your Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 outline-none rounded-xl focus:border-blue-500"
                    />
                    <input
                      type="tel"
                      placeholder="Mobile Number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 outline-none rounded-xl focus:border-blue-500"
                    />
                  </div>
                </>
              )}

              {step === "sent" && (
                <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="py-12 text-center">
                  <div className="flex items-center justify-center w-20 h-20 mx-auto bg-green-100 rounded-full">
                    <span className="text-5xl">Checkmark</span>
                  </div>
                  <p className="mt-4 text-lg font-bold text-green-600">Thank You!</p>
                  <p className="text-gray-600">We’ll contact you shortly</p>
                </motion.div>
              )}
            </div>

            {step === "form" && (
              <div className="p-4 bg-white border-t">
                <button
                  onClick={sendMessage}
                  disabled={!name || !phone || loading}
                  className="flex items-center justify-center w-full gap-2 py-3 font-bold text-white transition bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl disabled:opacity-50"
                >
                  {loading ? "Sending..." : <>Send Request <Send size={18} /></>}
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