import React from "react";
import { motion } from "framer-motion";
import logo from "../assets/indiaadvertisings-logo.png";

export default function Footer() {
  const quickLinks = [
    { name: "Home", href: "#home" },
    { name: "About Us", href: "#about" },
    { name: "Products", href: "#products" },
    { name: "Gallery", href: "#gallery" },
    { name: "Contact", href: "#contact" },
  ];

  const socialLinks = [
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/company/indiaadvertising",
      icon: (
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      ),
    },
    {
      name: "Facebook",
      href: "https://facebook.com/indiaadvertising",
      icon: (
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      ),
    },
    {
      name: "Instagram",
      href: "https://instagram.com/indiaadvertising",
      icon: (
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.919C2.163 15.584 2.151 15.204 2.151 12c0-3.205.012-3.584.069-4.849.149-3.225 1.664-4.771 4.919-4.919C8.407 2.175 8.787 2.163 12 2.163zm0-2.163C8.735 0 8.332.012 7.052.07 3.785.218 1.27 2.733.072 6.001.012 7.332 0 7.735 0 12s.012 4.668.072 5.948c1.198 3.268 3.713 5.783 6.98 5.931C8.332 23.988 8.735 24 12 24s3.668-.012 4.948-.07c3.268-1.198 5.783-3.713 5.931-6.98C23.988 15.668 24 15.332 24 12s-.012-4.668-.072-5.948c-1.198-3.268-3.713-5.783-6.98-5.931C15.668.012 15.332 0 12 0z" />
      ),
    },
    {
      name: "WhatsApp",
      href: "https://wa.me/919899575231",
      icon: (
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.297-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.262c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297C11.387.001 2.693 8.696.001 17.086c-.001.347.043.683.127 1.01l-1.262 4.608a1.25 1.25 0 001.536 1.536l4.608-1.262c.327.084.663.128 1.01.127 8.39-.692 17.084-9.386 17.086-17.086C22.783 8.694 17.084.001 8.694.001z" />
      ),
    },
  ];

  return (
    <footer className="bg-black text-yellow-400 pt-12 pb-8" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4">
        {/* Four Equal Columns - Horizontal on md+ */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-6 text-center md:text-left">
          {/* 1. Logo */}
          <div className="flex flex-col items-center md:items-start">
            <div className="relative mb-4">
              <div className="absolute inset-0 -m-4 border-4 border-yellow-500 rounded-none animate-spin-slow"></div>
              <motion.img
                src={logo}
                alt="India Advertising Logo"
                className="relative z-10 w-28 h-28 sm:w-32 sm:h-32 lg:w-36 lg:h-36 object-contain bg-gradient-to-br from-yellow-400 to-blue-900 p-2 shadow-2xl"
                initial={{ scale: 0.8, rotate: -10 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              />
            </div>
          </div>

          {/* 2. Company Name */}
          <div className="flex flex-col justify-center">
            <h3 className="text-2xl sm:text-3xl font-bold text-yellow-400">India Advertising</h3>
            <p className="text-sm text-yellow-300 mt-1">Colour Your Life... Pan India Coverage.</p>
          </div>

          {/* 3. Quick Links */}
          <nav className="flex flex-col" aria-label="Quick Links">
            <h4 className="text-xl font-semibold text-yellow-400 mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <motion.a
                    href={link.href}
                    className="text-yellow-300 hover:text-yellow-500 transition-colors duration-200 inline-block focus:ring-2 focus:ring-yellow-400 rounded px-1 py-0.5"
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {link.name}
                  </motion.a>
                </li>
              ))}
            </ul>
          </nav>

          {/* 4. Social Media */}
          <div className="flex flex-col">
            <h4 className="text-xl font-semibold text-yellow-400 mb-3">Follow Us</h4>
            <div className="flex justify-center md:justify-start space-x-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="w-11 h-11 flex items-center justify-center rounded-full bg-yellow-900/20 hover:bg-yellow-500/30 transition-all duration-300 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                  whileHover={{ scale: 1.15, rotate: 10 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                    {social.icon}
                  </svg>
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-10 pt-6 border-t border-yellow-800 text-center text-sm text-yellow-500">
          © {new Date().getFullYear()}{" "}
          <span className="font-semibold text-yellow-300">India Advertising</span> | All Rights Reserved |{" "}
          <span className="text-yellow-400">GST: 09BEDPA0157E1Z3</span>
        </div>
      </div>

      {/* Tailwind Animation */}
      <style jsx>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
      `}</style>
    </footer>
  );
}