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
import './index.css';

/**
 * MainPage Component
 * Renders the main landing page with all sections
 */
function MainPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <motion.main
        initial="hidden"
        animate="visible"
        variants={{ 
          visible: { 
            transition: { staggerChildren: 0.1, delayChildren: 0.2 } 
          } 
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
    </div>
  );
}

/**
 * App Component
 * Root component with error boundary and router setup
 */
function App() {
  useEffect(() => {
    // Set light theme on app load
    document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');
    
    // Set page title
    document.title = 'India Advertising | Premium Advertising Solutions';
    
    // Meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'India Advertising - Premium SS Name Plates, Acrylic Signs, LED Boards, and advertising solutions across India.';
      document.head.appendChild(meta);
    }
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