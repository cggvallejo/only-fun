import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Gallery from './components/Gallery';
import BookingSection from './components/BookingSection';
import Footer from './components/Footer';
import WhatsAppBot from './components/WhatsAppBot';
import './index.css';

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [botOpen, setBotOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOpenBot = () => {
    setBotOpen(true);
  };

  const handleCloseBot = () => {
    setBotOpen(false);
  };

  return (
    <div className="app-container">
      <Navbar scrolled={scrolled} onOpenBot={handleOpenBot} />
      <Hero onOpenBot={handleOpenBot} />
      <About />
      <Gallery />
      <BookingSection onOpenBot={handleOpenBot} />
      <Footer />
      <WhatsAppBot isOpen={botOpen} onClose={handleCloseBot} />
    </div>
  );
}

export default App;
