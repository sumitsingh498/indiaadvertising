// src/components/Navbar.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/indiaadvertising-logo.png";
import { Menu, X, ChevronDown } from "lucide-react";
import companyData from "../data/companyData.json"; // ← Your real data

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [showProductsDropdown, setShowProductsDropdown] = useState(false);

  // DYNAMIC CATEGORIES FROM JSON
  const categories = companyData.categories || [];

  const navItems = [
    { name: "Home", id: "home" },
    { name: "About", id: "about" },
    { name: "Products", id: "products", hasDropdown: true },
    { name: "Gallery", id: "gallery" },
    { name: "Contact", id: "contact" },
  ];

  const scrollToSection = (id) => {
    setIsOpen(false);
    setShowProductsDropdown(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Scroll spy
  useEffect(() => {
    const handleScroll = () => {
      let current = "home";
      navItems.forEach((item) => {
        const section = document.getElementById(item.id);
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            current = item.id;
          }
        }
      });
      setActiveSection(current);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -20 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100 shadow-sm"
    >
      {/* Slim & Modern Header */}
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <button onClick={() => scrollToSection("home")} className="flex items-center">
              <img src={logo} alt="India Advertising" className="h-9 sm:h-10" />
            </button>
          </div>

          {/* Desktop Menu */}
          <div className="items-center hidden space-x-8 md:flex">
            {navItems.map((item) => (
              <div key={item.name} className="relative">
                <button
                  onClick={() => item.hasDropdown ? null : scrollToSection(item.id)}
                  onMouseEnter={() => item.hasDropdown && setShowProductsDropdown(true)}
                  className="flex items-center space-x-1 text-base font-medium text-gray-700 transition-colors duration-200 hover:text-blue-700"
                >
                  <span
                    className={`pb-1 border-b-2 transition-all duration-300 ${
                      activeSection === item.id
                        ? "text-blue-700 border-blue-700"
                        : "border-transparent"
                    }`}
                  >
                    {item.name}
                  </span>
                  {item.hasDropdown && (
                    <ChevronDown
                      size={15}
                      className={`transition-transform duration-200 ${
                        showProductsDropdown ? "rotate-180" : ""
                      }`}
                    />
                  )}
                </button>
              </div>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-gray-700 rounded-md md:hidden hover:bg-gray-100"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* DYNAMIC PRODUCTS DROPDOWN - Reads from your JSON */}
      <AnimatePresence>
        {showProductsDropdown && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            onMouseLeave={() => setShowProductsDropdown(false)}
            className="absolute left-0 w-full bg-white border-t border-gray-200 shadow-lg top-full"
          >
            <div className="px-6 py-10 mx-auto max-w-7xl">
              <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {categories.map((cat) => (
                  <button
                    key={cat.category}
                    onClick={() => {
                      scrollToSection("products");
                      setShowProductsDropdown(false);
                    }}
                    className="p-5 text-sm text-left transition-all duration-300 border border-gray-100 rounded-xl hover:bg-blue-50 hover:text-blue-700 group hover:border-blue-200 hover:shadow-md"
                  >
                    <p className="font-semibold text-gray-800 group-hover:text-blue-700 line-clamp-2">
                      {cat.category}
                    </p>
                    <p className="mt-2 text-xs text-gray-500">
                      {cat.subProducts?.length || 0} Products
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-y-0 right-0 bg-white shadow-2xl w-80 md:hidden"
          >
            <div className="flex flex-col h-full px-6 pt-20 overflow-y-auto">
              <div className="space-y-2">
                {navItems.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => scrollToSection(item.id)}
                    className={`block w-full text-left py-4 px-4 text-lg font-medium rounded-lg transition-colors ${
                      activeSection === item.id
                        ? "bg-blue-50 text-blue-700"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {item.name}
                  </button>
                ))}
              </div>

              <div className="pb-10 mt-8">
                <div className="p-6 text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl">
                  <p className="text-lg font-semibold">Need Custom Signage?</p>
                  <p className="mt-1 text-sm opacity-90">Get free consultation today</p>
                  <button
                    onClick={() => scrollToSection("contact")}
                    className="w-full py-3 mt-4 font-semibold text-blue-700 transition bg-white rounded-lg hover:bg-gray-100"
                  >
                    Contact Us
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;