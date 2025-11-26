import React, { useRef, useEffect } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';

const Home = () => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-100, 100], [10, -10]), { stiffness: 100, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-100, 100], [-10, 10]), { stiffness: 100, damping: 20 });

  useEffect(() => {
    const el = ref.current;
    const handleMouseMove = (e) => {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      x.set(e.clientX - rect.left - rect.width / 2);
      y.set(e.clientY - rect.top - rect.height / 2);
    };

    const handleMouseLeave = () => {
      x.set(0);
      y.set(0);
    };

    el?.addEventListener('mousemove', handleMouseMove);
    el?.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      el?.removeEventListener('mousemove', handleMouseMove);
      el?.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [x, y]);

  return (
    <section id="home" className="relative flex items-center justify-center w-full min-h-screen px-4 py-16 overflow-hidden sm:py-20 sm:px-6 lg:px-10 bg-gradient-to-br from-gray-950 via-emerald-900/80 to-black">
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => {
          const delay = i * 0.4;
          const size = 40 + Math.random() * 100;
          return (
            <motion.div
              key={i}
              className="absolute bg-gradient-to-br from-emerald-400 via-lime-400 to-yellow-400 rounded-xl opacity-10"
              style={{
                width: size,
                height: size * 0.6,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                rotateZ: Math.random() * 360,
              }}
              animate={{
                y: [0, -50, 0],
                x: [-20, 20, -20],
                rotateY: [0, 360, 0],
                rotateX: [0, 180, 0],
                scale: [1, 1.3, 1],
              }}
              transition={{
                duration: 8 + Math.random() * 6,
                repeat: Infinity,
                delay,
                ease: 'easeInOut',
              }}
            />
          );
        })}
      </div>

      <div className="absolute inset-0 z-0 bg-gradient-to-br from-black/70 via-black/40 to-black/70"></div>

      <motion.div ref={ref} className="relative z-10 flex flex-col items-center justify-center w-full max-w-6xl text-center" style={{ transformStyle: 'preserve-3d' }}>
        <motion.h1
          className="mb-6 text-5xl font-extrabold leading-tight tracking-widest text-transparent sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl bg-gradient-to-r from-emerald-400 via-yellow-300 to-emerald-500 bg-clip-text drop-shadow-lg"
          initial={{ scale: 0.5, opacity: 0, y: 100 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: 'backOut' }}
          style={{ rotateX, rotateY }}
        >
          INDIA ADVERTISING
        </motion.h1>

        <motion.p className="mb-10 text-lg italic font-light tracking-widest uppercase sm:text-xl md:text-2xl lg:text-3xl text-emerald-300" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 1 }}>
          Colour Your Life...
        </motion.p>

        <motion.p className="max-w-4xl px-4 mx-auto text-sm leading-relaxed sm:text-base md:text-lg lg:text-xl text-emerald-100 mb-14" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 1.3 }}>
          Established in 2019, India Advertising is a distinguished manufacturer of premium signage and advertising solutions. We design and implement impactful indoor and outdoor advertising solutions that help brands stand out and stay remembered.
        </motion.p>

        <motion.div className="grid w-full max-w-5xl grid-cols-1 gap-6 px-4 mb-12 sm:grid-cols-2 md:grid-cols-4 sm:gap-8" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 1.5 }}>
          {[
            { name: 'Outdoor Branding', icon: '🎯' },
            { name: 'Indoor Branding', icon: '🖼️' },
            { name: 'Facade Design', icon: '🏙️' },
            { name: 'Interior Concepts', icon: '🏠' },
          ].map((service, i) => (
            <motion.div key={i} className="p-6 text-center transition-transform duration-300 border shadow-lg sm:p-8 rounded-2xl bg-gradient-to-br from-emerald-400/10 to-lime-400/10 border-emerald-400/40 backdrop-blur-md hover:shadow-emerald-500/60" whileHover={{ scale: 1.08, rotateY: 10 }}>
              <div className="mb-3 text-4xl sm:text-5xl">{service.icon}</div>
              <h3 className="text-lg font-semibold tracking-wide text-emerald-200 sm:text-xl">{service.name}</h3>
            </motion.div>
          ))}
        </motion.div>

        <motion.div className="max-w-4xl px-6 mx-auto mb-16 sm:px-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 2 }}>
          <p className="text-lg italic leading-relaxed text-emerald-200 sm:text-xl">"Our mission is to amplify your brand's story through creative solutions."</p>
        </motion.div>

        <motion.div className="grid w-full max-w-5xl grid-cols-1 gap-6 px-4 mb-12 sm:grid-cols-3 sm:gap-8 md:gap-10" initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1, delay: 2.3 }}>
          {[
            { num: '200+', label: 'Clients', icon: '🏢', color: 'from-emerald-400 to-lime-500' },
            { num: '7+', label: 'Years', icon: '⏳', color: 'from-yellow-400 to-emerald-500' },
            { num: 'Pan India', label: 'Coverage', icon: '🌎', color: 'from-emerald-300 to-green-600' },
          ].map((stat, i) => (
            <motion.div key={i} className={`p-6 sm:p-8 md:p-10 rounded-2xl bg-gradient-to-br ${stat.color}/20 border border-emerald-400/40 backdrop-blur-md text-center shadow-lg hover:shadow-emerald-500/60`} whileHover={{ scale: 1.08 }}>
              <div className="mb-3 text-4xl sm:text-5xl">{stat.icon}</div>
              <h3 className="mb-2 text-2xl font-extrabold sm:text-3xl text-emerald-300">{stat.num}</h3>
              <p className="text-sm font-medium uppercase text-emerald-100 sm:text-lg">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.a 
          href="#contact" 
          className="relative px-10 py-4 overflow-hidden text-lg font-bold text-gray-900 transition-shadow duration-300 rounded-full shadow-2xl bg-gradient-to-r from-emerald-500 via-lime-400 to-yellow-400 sm:px-14 sm:py-5 group hover:shadow-emerald-500/50" 
          whileHover={{ scale: 1.05 }} 
          whileTap={{ scale: 0.95 }}
          aria-label="Get a quote - scroll to contact form"
        >
          <span className="relative z-10">Get a Quote</span>
          <div className="absolute inset-0 transition-transform duration-700 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:translate-x-full"></div>
        </motion.a>
      </motion.div>
    </section>
  );
};

export default Home;
