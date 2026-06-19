import React from 'react';

const Hero = () => {
  return (
    <section id="home" className="hero">
      <div className="hero-bg">
        {/* Dynamic Particles - 360 Camera Theme */}
        {/* Camera Icon */}
        <div className="particle" style={{ width: '40px', height: '40px', top: '15%', left: '10%', animationDelay: '0s' }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '100%', height: '100%', color: 'var(--accent-gold)' }}>
            <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"></path>
            <circle cx="12" cy="13" r="3"></circle>
          </svg>
        </div>
        {/* 360 Rotation Arrows */}
        <div className="particle" style={{ width: '50px', height: '50px', top: '55%', left: '8%', animationDelay: '1s' }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '100%', height: '100%', color: 'var(--accent-blue)' }}>
            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
            <path d="M3 3v5h5"></path>
          </svg>
        </div>
        {/* Smartphone Icon */}
        <div className="particle" style={{ width: '45px', height: '45px', top: '25%', right: '15%', animationDelay: '2s' }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '100%', height: '100%', color: 'white' }}>
            <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
            <line x1="12" y1="18" x2="12.01" y2="18"></line>
          </svg>
        </div>
        {/* Video Camera Icon */}
        <div className="particle" style={{ width: '40px', height: '40px', top: '65%', right: '10%', animationDelay: '0.5s' }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '100%', height: '100%', color: 'var(--accent-gold)' }}>
            <polygon points="23 7 16 12 23 17 23 7"></polygon>
            <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
          </svg>
        </div>
        {/* Sparkle/Star Icon */}
        <div className="particle" style={{ width: '35px', height: '35px', top: '80%', left: '30%', animationDelay: '1.5s' }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '100%', height: '100%', color: 'var(--accent-blue)' }}>
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
          </svg>
        </div>
        
        {/* NUEVOS ELEMENTOS */}
        {/* Music Note */}
        <div className="particle" style={{ width: '30px', height: '30px', top: '10%', left: '40%', animationDelay: '0.8s', opacity: 0.4 }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '100%', height: '100%', color: 'white' }}>
            <path d="M9 18V5l12-2v13"></path>
            <circle cx="6" cy="18" r="3"></circle>
            <circle cx="18" cy="16" r="3"></circle>
          </svg>
        </div>
        {/* Small Sparkle */}
        <div className="particle" style={{ width: '25px', height: '25px', top: '40%', right: '25%', animationDelay: '2.5s', opacity: 0.5 }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '100%', height: '100%', color: 'var(--accent-gold)' }}>
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
          </svg>
        </div>
        {/* Play Button */}
        <div className="particle" style={{ width: '35px', height: '35px', top: '75%', right: '35%', animationDelay: '1.2s', opacity: 0.5 }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '100%', height: '100%', color: 'var(--accent-blue)' }}>
            <circle cx="12" cy="12" r="10"></circle>
            <polygon points="10 8 16 12 10 16 10 8"></polygon>
          </svg>
        </div>
        {/* Flash/Zap */}
        <div className="particle" style={{ width: '30px', height: '30px', top: '85%', left: '15%', animationDelay: '3s', opacity: 0.6 }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '100%', height: '100%', color: 'var(--accent-gold)' }}>
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
          </svg>
        </div>
        {/* Aperture */}
        <div className="particle" style={{ width: '45px', height: '45px', top: '15%', right: '35%', animationDelay: '1.7s', opacity: 0.4 }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '100%', height: '100%', color: 'white' }}>
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="14.31" y1="8" x2="20.05" y2="17.94"></line>
            <line x1="9.69" y1="8" x2="21.17" y2="8"></line>
            <line x1="7.38" y1="12" x2="13.12" y2="2.06"></line>
            <line x1="9.69" y1="16" x2="3.95" y2="6.06"></line>
            <line x1="14.31" y1="16" x2="2.83" y2="16"></line>
            <line x1="16.62" y1="12" x2="10.88" y2="21.94"></line>
          </svg>
        </div>
        {/* Another Camera */}
        <div className="particle" style={{ width: '25px', height: '25px', top: '45%', left: '20%', animationDelay: '2.2s', opacity: 0.5 }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '100%', height: '100%', color: 'white' }}>
            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
            <circle cx="12" cy="13" r="4"></circle>
          </svg>
        </div>
      </div>
      <div className="hero-content animate-slide-up">
        <h1 className="animate-fade-in delay-100">Elevamos Cada Momento con Diversión Pura</h1>
        <p className="animate-fade-in delay-200">
          Descubre el entretenimiento premium para bodas, eventos corporativos y fiestas exclusivas en Cancún. 
          Haz que tu celebración de 2026 sea inolvidable.
        </p>
        <div className="hero-buttons animate-fade-in delay-300">
          <a href="#gallery" className="btn-primary">Ver Galería</a>
          <a href="#contact" className="btn-gold">Reservar Ahora</a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
