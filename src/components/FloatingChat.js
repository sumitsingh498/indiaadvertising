// src/components/FloatingChat.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Sparkles } from "lucide-react";

const FloatingChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState("welcome"); // welcome | quick | form | sent
  const [selectedQuery, setSelectedQuery] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  // Reuse your existing EmailJS logic
  const sendMessage = async () => {
    setLoading(true);
    // Simulate sending (you already have EmailJS in QuoteForm)
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSent(true);
    setTimeout(() => {
      setStep("sent");
      setTimeout(() => {
        setIsOpen(false);
        setStep("welcome");
        setSent(false);
      }, 3000);
    }, 1500);
  };

  const quickOptions = [
    "LED Sign Board Price?",
    "ACP Glow Sign Board",
    "3D Acrylic Letters",
    "Custom Name Plate",
    "Shop Front Signage",
    "Send Full Catalogue",
  ];

  return (
    <>
      {/* Floating Bubble */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2, type: "spring" }}
        className="fixed z-50 bottom-6 right-6"
      >
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center justify-center w-16 h-16 text-white rounded-full shadow-2xl bg-gradient-to-r from-blue-600 to-blue-700"
        >
          {isOpen ? <X size={28} /> : <MessageCircle size={32} />}
          {!isOpen && (
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 3 }}
              className="absolute w-4 h-4 bg-red-500 rounded-full -top-1 -right-1"
            />
          )}
        </motion.button>
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed z-50 overflow-hidden bg-white border border-gray-200 shadow-2xl bottom-24 right-6 w-80 rounded-2xl"
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
                    <p className="text-xs opacity-90">Typically replies in minutes</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 transition rounded-full hover:bg-white/20"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="p-4 space-y-4 overflow-y-auto h-96">
              {step === "welcome" && (
                <>
                  <div className="bg-gray-100 rounded-2xl p-4 rounded-tl-none max-w-[85%]">
                    <p className="text-sm font-medium">Namaste! Welcome to India Advertising</p>
                    <p className="mt-1 text-xs text-gray-600">
                      How can we help you today?
                    </p>
                  </div>

                  <div className="space-y-2">
                    {quickOptions.map((option) => (
                      <motion.button
                        key={option}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          setSelectedQuery(option);
                          setStep("form");
                        }}
                        className="w-full p-3 text-sm font-medium text-left text-blue-800 transition bg-blue-50 hover:bg-blue-100 rounded-xl"
                      >
                        {option}
                      </motion.button>
                    ))}
                  </div>
                </>
              )}

              {step === "form" && (
                <>
                  <div className="bg-blue-50 rounded-2xl p-4 rounded-br-none max-w-[85%] ml-auto">
                    <p className="text-sm">{selectedQuery}</p>
                  </div>

                  <div className="bg-gray-100 rounded-2xl p-4 rounded-tl-none max-w-[85%]">
                    <p className="text-sm">Great! Please share your name & number. We'll call you in 5 mins</p>
                  </div>

                  <div className="mt-4 space-y-3">
                    <input
                      type="text"
                      placeholder="Your Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3 transition border border-gray-300 outline-none rounded-xl focus:border-blue-500"
                    />
                    <input
                      type="tel"
                      placeholder="Mobile Number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-3 transition border border-gray-300 outline-none rounded-xl focus:border-blue-500"
                    />
                  </div>
                </>
              )}

              {step === "sent" && (
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  className="py-8 text-center"
                >
                  <div className="flex items-center justify-center w-20 h-20 mx-auto bg-green-100 rounded-full">
                    <span className="text-4xl">Checkmark</span>
                  </div>
                  <p className="mt-4 font-bold text-green-600">Thank you!</p>
                  <p className="text-sm text-gray-600">We'll call you shortly</p>
                </motion.div>
              )}
            </div>

            {/* Footer - Send Button */}
            {step === "form" && (
              <div className="p-4 border-t bg-gray-50">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={sendMessage}
                  disabled={!name || !phone || loading}
                  className="flex items-center justify-center w-full gap-2 py-3 font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl disabled:opacity-50"
                >
                  {loading ? (
                    "Sending..."
                  ) : (
                    <>
                      <Send size={18} />
                      Send Request
                    </>
                  )}
                </motion.button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingChat;