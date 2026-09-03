import React from 'react';

const Navbar = ({ scrolled, onOpenBot }) => {
  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-logo">
        <a href="#home" aria-label="Only Fun Inicio">
          <img src="/assets/logo.png" alt="Only Fun Cancun Logo" />
        </a>
      </div>
      <div className="nav-links">
        <a href="#home">Inicio</a>
        <a href="#about">Nosotros</a>
        <a href="#gallery">Galería</a>
        <a href="#contact">Cotizar Riviera Maya</a>
      </div>
      <a href="#contact" className="btn-primary" style={{ padding: '8px 20px', fontSize: '0.9rem' }}>
        Contáctanos
      </a>
    </nav>
  );
};

export default Navbar;
