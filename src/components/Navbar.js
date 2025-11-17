import React, { useState } from 'react';
import { motion } from 'framer-motion';
import logo from '../assets/indiaadvertising-logo.png'; // Import from src/assets

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = ['Home', 'About', 'Products', 'Gallery', 'Contact'];

  const scrollToSection = (sectionId) => {
    setIsOpen(false);
    // Smooth scroll to section
    setTimeout(() => {
      const element = document.getElementById(sectionId.toLowerCase());
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <motion.nav 
      initial={{ y: -100 }} 
      animate={{ y: 0 }} 
      className="sticky top-0 z-50 px-4 border-b shadow-md bg-white/90 backdrop-blur-md border-yellow-300/30 sm:px-6"
    >
      <div className="flex items-center justify-between h-16 mx-auto max-w-7xl">
        <motion.div className="flex items-center" whileHover={{ scale: 1.05 }}>
          <a href="#home" className="flex items-center" title="India Advertising - Home">
            <img src={logo} alt="India Advertising Logo" className="w-auto h-8 mr-2 sm:h-10 sm:mr-3" />
            <span className="hidden text-lg font-bold sm:text-xl text-navy-700 sm:block"></span>
          </a>
        </motion.div>
        <div className="items-baseline hidden space-x-6 md:flex">
          {navItems.map((item) => (
            <motion.button
              key={item}
              onClick={() => scrollToSection(item)}
              className="px-3 py-2 text-sm font-medium transition-colors rounded-md cursor-pointer hover:text-yellow-500 text-navy-700 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              {item}
            </motion.button>
          ))}
        </div>
        <div className="md:hidden">
          <motion.button 
            onClick={() => setIsOpen(!isOpen)} 
            className="p-2 text-navy-700 hover:text-yellow-500 focus:ring-2 focus:ring-yellow-400 rounded-md focus:outline-none"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /> }
            </svg>
          </motion.button>
        </div>
      </div>
      {isOpen && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="pb-4 md:hidden bg-white/90">
          <div className="px-2 space-y-2">
            {navItems.map((item) => (
              <motion.button
                key={item}
                onClick={() => scrollToSection(item)}
                className="block w-full px-3 py-2 text-base font-medium text-left transition-colors rounded-md cursor-pointer hover:text-yellow-500 text-navy-700 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
              >
                {item}
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;