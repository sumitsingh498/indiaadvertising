// E:\indiaadvertising\src\App.js
import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import ErrorBoundary from './components/ErrorBoundary';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Products from './components/Products';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import Footer from './components/Footer';
import FloatingChat from './components/FloatingChat';  // Already exists
import './index.css';

function MainPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <motion.main
        initial="hidden"
        animate="visible"
        variants={{
          visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
        }}
        role="main"
      >
        <Home />
        <About />
        <Products />
        <Gallery />
        <Contact />
      </motion.main>
      <Footer />
      <FloatingChat />   {/* This is your magic chat */}
    </div>
  );
}

function App() {
  useEffect(() => {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');
    document.title = 'India Advertising | LED Sign Board | ACP | 3D Letters | Name Plates';

    const meta = document.createElement('meta');
    meta.name = 'description';
    meta.content = 'Premium LED Sign Boards, ACP Glow Signs, 3D Acrylic Letters, SS Name Plates manufacturer in India. Best price guaranteed.';
    document.head.appendChild(meta);
  }, []);

  return (
    <ErrorBoundary>
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="*" element={<MainPage />} />
        </Routes>
      </Router>
    </ErrorBoundary>
  );
}

export default App;