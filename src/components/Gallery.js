import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import localData from "../data/companyData.json";

const Gallery = () => {
  const [data, setData] = useState(localData);
  const error = null;
  const marqueeRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [visibleStart, setVisibleStart] = useState(0);
  const autoScrollSpeed = 0.8;
  const [pause, setPause] = useState(false);

  // Base URL for images - use public folder in a pure frontend app
  const IMAGE_BASE = process.env.PUBLIC_URL || "";

  // Derived values (safe access)
  const gallery = data?.gallery || [];
  const clients = data?.clients || [];
  const length = gallery.length;
  const maxDots = 50;
  const showPaginated = length > maxDots;
  const dotsToShow = showPaginated ? 10 : length;
  const companyName = data?.companyInfo?.name || 'India Advertising';
  const tagline = `Premium Advertising Solutions in ${data?.companyInfo?.location || 'India'}`;
  const description = data?.companyInfo?.description || '';

  // Using local JSON file (no backend) - data is already loaded
  useEffect(() => {
    setData(localData);
  }, []);

  // --- Dot pagination logic ---
  useEffect(() => {
    if (!data || length === 0 || !showPaginated) {
      setVisibleStart(0);
      return;
    }
    const half = Math.floor(dotsToShow / 2);
    let newStart = activeIndex - half;
    newStart = Math.max(0, newStart);
    newStart = Math.min(newStart, length - dotsToShow);
    setVisibleStart(newStart);
  }, [activeIndex, length, dotsToShow, showPaginated, data]);

  // --- Continuous Auto Scroll ---
  useEffect(() => {
    const marquee = marqueeRef.current;
    if (!marquee || length === 0) return;
    let animationFrame;

    const scroll = () => {
      if (!pause) {
        marquee.scrollLeft += autoScrollSpeed;
        if (marquee.scrollLeft + marquee.clientWidth >= marquee.scrollWidth) {
          marquee.scrollLeft = 0;
        }
      }
      animationFrame = requestAnimationFrame(scroll);
    };

    animationFrame = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationFrame);
  }, [pause, length]);

  // --- Update active index on scroll ---
  useEffect(() => {
    const marquee = marqueeRef.current;
    if (!marquee || length === 0) return;

    const handleScroll = () => {
      const imageWidth = marquee.scrollWidth / length;
      const index = Math.round(marquee.scrollLeft / imageWidth) % length;
      setActiveIndex(index);
    };

    marquee.addEventListener("scroll", handleScroll);
    return () => marquee.removeEventListener("scroll", handleScroll);
  }, [length]);

  // --- Hover Pause ---
  useEffect(() => {
    const marquee = marqueeRef.current;
    if (!marquee) return;
    const stop = () => setPause(true);
    const resume = () => setPause(false);
    marquee.addEventListener("mouseenter", stop);
    marquee.addEventListener("mouseleave", resume);
    return () => {
      marquee.removeEventListener("mouseenter", stop);
      marquee.removeEventListener("mouseleave", resume);
    };
  }, []);

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="text-center text-red-500">
          <h2>Error Loading Gallery</h2>
          <p>{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 mt-4 text-white bg-blue-600 rounded"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="text-center">
          <p className="text-gray-600">Loading Gallery...</p>
        </div>
      </div>
    );
  }

  // --- Handle dot click ---
  const handleDotClick = (index) => {
    const marquee = marqueeRef.current;
    if (!marquee || length === 0) return;
    const imageWidth = marquee.scrollWidth / length;

    setPause(true);
    marquee.scrollTo({
      left: imageWidth * index,
      behavior: "smooth",
    });
    setActiveIndex(index);
    setTimeout(() => setPause(false), 2500);
  };

  // --- Next/Prev ---
  const handleNext = () => handleDotClick((activeIndex + 1) % length);
  const handlePrev = () =>
    handleDotClick((activeIndex - 1 + length) % length);

  const startIdx = showPaginated ? visibleStart : 0;
  const numToShow = showPaginated ? dotsToShow : length;

  return (
    <section
      id="gallery"
      className="flex flex-col w-full min-h-screen py-10 bg-white sm:py-16"
    >
      <div className="flex flex-col flex-1 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Header */}
        <motion.h2
          className="mb-3 text-3xl font-bold text-center text-blue-800 sm:text-4xl md:text-5xl"
          initial={{ y: -50 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true }}
        >
          {companyName}
        </motion.h2>
        <p className="mb-8 text-base text-center text-gray-600 sm:text-lg sm:mb-10">
          {tagline}
        </p>

        {/* Gallery Marquee */}
        <div
          ref={marqueeRef}
          className="relative flex mb-6 overflow-x-scroll scroll-smooth sm:mb-8 no-scrollbar"
          style={{ scrollBehavior: "smooth" }}
        >
          {gallery.length > 0 ? (
            gallery.map((img, index) => {
              // Normalize image path: companyData.json uses `uploads/...` while
              // actual files are in public/images/. Map uploads/ -> images/ if needed.
              const raw = img.image || "";
              let imgSrc = raw;
              if (!(raw.startsWith("http") || raw.startsWith("/"))) {
                let p = raw;
                if (p.startsWith("uploads/")) p = p.replace(/^uploads\//, "images/");
                imgSrc = `${IMAGE_BASE}/${p}`;
              }

              return (
                <motion.div
                  key={`${img.image}-${index}`} // Better key for stability
                  className="flex justify-center flex-shrink-0 mx-2 sm:mx-3"
                >
                  <motion.img
                    src={imgSrc}
                    alt={img.caption || 'Gallery image'}
                    className="object-cover w-48 transition-transform duration-300 rounded-lg shadow-md cursor-pointer h-36 sm:w-64 sm:h-48 md:w-80 md:h-56 lg:w-96 lg:h-64 hover:scale-105"
                    whileHover={{ scale: 1.08, rotate: 1 }}
                    loading="lazy"
                      onError={(e) => {
                        console.error(`Failed to load image: ${img.image}`);
                        // Replace broken image with a local placeholder (logo exists in public/images)
                        const placeholder = `${IMAGE_BASE}/images/logo.jpeg`;
                        if (e.target.src !== placeholder) {
                          e.target.onerror = null; // prevent loop
                          e.target.src = placeholder;
                        }
                      }}
                  />
                </motion.div>
              );
            })
          ) : (
            <div className="flex justify-center w-full py-8">
              <p className="text-gray-500">No images in gallery yet.</p>
            </div>
          )}
        </div>

        {/* Navigation Controls */}
        {length > 0 && (
          <div className="flex flex-wrap items-center justify-center mt-2 space-x-2 sm:mt-4">
            <button
              onClick={handlePrev}
              className="px-3 py-2 text-sm font-medium text-white transition-colors bg-blue-600 rounded-full hover:bg-blue-700"
            >
              ‹
            </button>

            {Array.from({ length: numToShow }, (_, i) => {
              const idx = startIdx + i;
              return (
                <button
                  key={idx}
                  onClick={() => handleDotClick(idx)}
                  className={`h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full transition-all duration-300 ${
                    activeIndex === idx
                      ? "bg-blue-600 scale-125"
                      : "bg-gray-400 hover:bg-blue-300"
                  }`}
                />
              );
            })}

            <button
              onClick={handleNext}
              className="px-3 py-2 text-sm font-medium text-white transition-colors bg-blue-600 rounded-full hover:bg-blue-700"
            >
              ›
            </button>
          </div>
        )}

        {/* Description */}
        <p className="max-w-3xl mx-auto mb-10 text-sm text-center text-gray-700 sm:mb-14 sm:text-base md:text-lg">
          {description}
        </p>

        {/* Our Happy Customers */}
        <h3 className="mb-5 text-xl font-semibold text-center text-blue-800 sm:text-2xl md:text-3xl sm:mb-6">
          Our Happy Customers
        </h3>

        <motion.div
          className="flex flex-wrap justify-center gap-2 px-2 sm:gap-3 md:gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {clients.length > 0 ? (
            clients.map((client, index) => (
              <motion.span
                key={index}
                className="px-3 py-1 text-xs font-medium text-blue-700 transition-all duration-300 bg-blue-100 rounded-full sm:px-4 sm:py-2 sm:text-sm md:text-base hover:bg-yellow-400 hover:text-white"
                whileHover={{ scale: 1.1 }}
              >
                {client}
              </motion.span>
            ))
          ) : (
            <p className="w-full text-center text-gray-500">No clients listed yet.</p>
          )}
        </motion.div>
      </div>

      {/* Hide scrollbar style */}
      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};

export default Gallery;