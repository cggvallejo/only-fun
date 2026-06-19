import React from 'react';

const Navbar = ({ scrolled }) => {
  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-logo">
        <img src="/assets/logo.png" alt="Only Fun Cancun Logo" />
      </div>
      <div className="nav-links">
        <a href="#home">Inicio</a>
        <a href="#about">Nosotros</a>
        <a href="#gallery">Galería</a>
      </div>
      <a href="#contact" className="btn-primary" style={{ padding: '8px 20px', fontSize: '0.9rem' }}>
        Contáctanos
      </a>
    </nav>
  );
};

export default Navbar;
