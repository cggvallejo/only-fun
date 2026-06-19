import React from 'react';

const Footer = () => {
  return (
    <footer id="contact" className="footer">
      <div className="footer-content">
        <div className="footer-logo">
          <img src="/assets/logo.png" alt="Logo" style={{ width: 40, height: 40, objectFit: 'cover', objectPosition: 'center', transform: 'scale(1.15)', borderRadius: '50%', verticalAlign: 'middle', marginRight: 10 }} />
          Only Fun Cancun
        </div>
        
        <div className="footer-contact">
          <h4>Contacto Directo</h4>
          <p style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>📞 984 236 1900</p>
          <p style={{ color: 'var(--text-muted)' }}>Roberto Prado Mendez</p>
        </div>
        
        <div className="footer-social" style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
          <a href="https://www.instagram.com/onlyfuncancun2026/" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ padding: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%' }} aria-label="Instagram">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
          </a>
          <a href="https://www.facebook.com/profile.php?id=61590702525639" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ padding: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%' }} aria-label="Facebook">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
            </svg>
          </a>
          <a href="https://www.tiktok.com/@onlyfuncancu?lang=es" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ padding: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%' }} aria-label="TikTok">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5v3a8 8 0 0 1-5-1.5z"></path>
            </svg>
          </a>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Only Fun Cancun 2026. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
