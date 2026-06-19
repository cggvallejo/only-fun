import React from 'react';
import Camera360Animation from './Camera360Animation';

const About = () => {
  return (
    <section id="about" className="about">
      <div className="about-container">
        <div className="about-text animate-slide-up">
          <h2 className="section-title" style={{ textAlign: 'left' }}>Sobre Nosotros</h2>
          <p>
            Somos <strong>Only Fun Cancun 2026</strong>, liderados por Roberto Prado Mendez. Nos especializamos en brindar entretenimiento premium para los eventos más exigentes.
          </p>
          <p>
            Ya sea una boda de ensueño, un evento corporativo de alto perfil o una fiesta exclusiva privada, nuestro objetivo es elevar cada momento y convertirlo en una experiencia inolvidable llena de diversión pura.
          </p>
          
          <div className="about-stats">
            <div className="stat-item glass-panel">
              <div className="stat-num">100+</div>
              <div>Eventos Exitosos</div>
            </div>
            <div className="stat-item glass-panel">
              <div className="stat-num">Premium</div>
              <div>Calidad Garantizada</div>
            </div>
          </div>
        </div>
        
        <div className="about-image animate-slide-up delay-200">
          <Camera360Animation />
        </div>
      </div>
    </section>
  );
};

export default About;
