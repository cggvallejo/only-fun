import React, { useState } from 'react';

const RIVIERA_LOCATIONS = [
  'Playa del Carmen',
  'Cancún',
  'Tulum',
  'Isla Mujeres',
  'Cozumel',
  'Puerto Morelos',
  'Riviera Maya (Otra zona)'
];

const DURATION_OPTIONS = [
  '2 Horas',
  '3 Horas',
  '4 Horas',
  '5 Horas',
  'Todo el Evento (+6 horas)'
];

const EVENT_TYPES = [
  'Boda / Wedding',
  'Cumpleaños / Fiesta Privada',
  'Evento Corporativo',
  'XV Años',
  'Despedida de Soltera/o',
  'Otro'
];

const WhatsAppBot = ({ isOpen: externalIsOpen, onClose: externalOnClose }) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;

  const toggleOpen = () => {
    if (externalOnClose && isOpen) {
      externalOnClose();
    } else {
      setInternalIsOpen(!internalIsOpen);
    }
  };

  const [formData, setFormData] = useState({
    name: '',
    eventDate: '',
    duration: '3 Horas',
    location: 'Cancún',
    exactAddress: '',
    eventType: 'Boda / Wedding',
    extraNotes: ''
  });

  const [step, setStep] = useState(1);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrorMsg('');
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setErrorMsg('Por favor ingresa tu nombre.');
      return;
    }
    if (!formData.eventDate) {
      setErrorMsg('Por favor selecciona la fecha del evento.');
      return;
    }
    setStep(2);
  };

  const handleSendWhatsApp = (e) => {
    e.preventDefault();
    if (!formData.exactAddress.trim()) {
      setErrorMsg('Por favor ingresa el lugar o dirección exacta del evento.');
      return;
    }

    const phoneNumber = '529841975555'; // 984 197 5555
    const message = `¡Hola Only Fun Cancún! 🎉 Me gustaría cotizar para mi evento:

👤 *Nombre:* ${formData.name.trim()}
📅 *Fecha del evento:* ${formData.eventDate}
⏱️ *Duración:* ${formData.duration}
📍 *Destino / Zona:* ${formData.location}
🏠 *Lugar / Dirección exacta:* ${formData.exactAddress.trim()}
✨ *Tipo de evento:* ${formData.eventType}
${formData.extraNotes.trim() ? `📝 *Detalles adicionales:* ${formData.extraNotes.trim()}` : ''}

¿Podrían confirmarme disponibilidad y paquetes? ¡Gracias!`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <>
      {/* Contenedor Flotante Inferior: Solo Asistente Virtual */}
      <div className="floating-actions-container">
        {/* Botón del Asistente Virtual (Diseño Distintivo Dorado / Robot) */}
        <button 
          className={`assistant-trigger-pill ${isOpen ? 'active' : ''}`}
          onClick={toggleOpen}
          aria-label="Abrir Asistente Virtual de Cotizaciones"
        >
          <div className="assistant-pill-icon">
            <img src="/assets/avatar-onlyfun.png" alt="Only Fun Asistente" className="assistant-pill-logo" />
            <span className="assistant-pulse-ring"></span>
          </div>
          <div className="assistant-pill-text">
            <strong>{isOpen ? 'Cerrar Asistente' : 'Asistente Virtual'}</strong>
            <small>{isOpen ? '✕ Minimizar' : '✨ Cotizar en 1 min'}</small>
          </div>
        </button>
      </div>

      {/* Ventana Modal / Chat del Asistente Virtual */}
      {isOpen && (
        <div className="wa-bot-window glass-panel animate-scale-up">
          {/* Header del Chat */}
          <div className="wa-bot-header">
            <div className="wa-bot-header-avatar assistant-avatar-glow">
              <img src="/assets/avatar-onlyfun.png" alt="Only Fun" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
              <span className="wa-bot-online-badge"></span>
            </div>
            <div className="wa-bot-header-info">
              <h4>Asistente Virtual Only Fun ✨</h4>
              <p>Cotizador Automático Riviera Maya</p>
            </div>
            <button className="wa-bot-close-btn" onClick={toggleOpen} aria-label="Cerrar">✕</button>
          </div>

          {/* Banner informativo de WhatsApp Directo */}
          <div className="assistant-direct-banner">
            <span>¿Prefieres hablar de inmediato con un asesor humano?</span>
            <a 
              href="https://wa.me/529841975555" 
              target="_blank" 
              rel="noopener noreferrer"
              className="assistant-wa-link"
            >
              Abrir WhatsApp Directo (984 197 5555) ➔
            </a>
          </div>

          {/* Cuerpo del Asistente */}
          <div className="wa-bot-body">
            <div className="wa-bot-msg-bot">
              <div className="wa-bot-msg-bubble">
                ¡Hola! 👋 Soy tu <strong>Asistente Virtual</strong>. Te ayudaré a estructurar los detalles de tu evento para verificar disponibilidad y enviártelo por WhatsApp listo para cotizar.
              </div>
            </div>

            {errorMsg && (
              <div className="wa-bot-alert-error animate-fade-in">
                ⚠️ {errorMsg}
              </div>
            )}

            {step === 1 ? (
              <form onSubmit={handleNext} className="wa-bot-form animate-fade-in">
                <div className="wa-form-group">
                  <label>👤 Nombre del Cliente</label>
                  <input 
                    type="text" 
                    name="name" 
                    value={formData.name} 
                    onChange={handleChange}
                    placeholder="Tu nombre y apellido" 
                    required
                    autoFocus
                  />
                </div>

                <div className="wa-form-group">
                  <label>📅 Fecha de tu Evento</label>
                  <input 
                    type="date" 
                    name="eventDate" 
                    value={formData.eventDate} 
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="wa-form-group">
                  <label>⏱️ Duración Estimada</label>
                  <select name="duration" value={formData.duration} onChange={handleChange}>
                    {DURATION_OPTIONS.map(opt => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>

                <div className="wa-form-group">
                  <label>🎉 Tipo de Evento</label>
                  <select name="eventType" value={formData.eventType} onChange={handleChange}>
                    {EVENT_TYPES.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <button type="submit" className="btn-gold wa-btn-full">
                  Siguiente: Ubicación en Riviera Maya ➔
                </button>
              </form>
            ) : (
              <form onSubmit={handleSendWhatsApp} className="wa-bot-form animate-fade-in">
                <div className="wa-form-group">
                  <label>📍 Destino / Zona en Riviera Maya</label>
                  <select 
                    name="location" 
                    value={formData.location} 
                    onChange={handleChange}
                    className="wa-select-highlight"
                  >
                    {RIVIERA_LOCATIONS.map(loc => (
                      <option key={loc} value={loc}>{loc}</option>
                    ))}
                  </select>
                  <small style={{ color: 'var(--accent-gold)', fontSize: '0.78rem', marginTop: '4px', display: 'block' }}>
                    * Cobertura exclusiva: Playa del Carmen, Cancún, Isla Mujeres, Tulum y Cozumel
                  </small>
                </div>

                <div className="wa-form-group">
                  <label>🏠 Dirección Exacta o Venue / Hotel</label>
                  <input 
                    type="text" 
                    name="exactAddress" 
                    value={formData.exactAddress} 
                    onChange={handleChange}
                    placeholder="Ej. Hotel Xcaret Arte / Salón Coral / Domicilio particular..." 
                    required
                  />
                </div>

                <div className="wa-form-group">
                  <label>📝 Notas o Requerimientos Especiales (Opcional)</label>
                  <textarea 
                    name="extraNotes" 
                    value={formData.extraNotes} 
                    onChange={handleChange}
                    rows="2"
                    placeholder="Ej. Requerimos videos 360 con logotipo personalizado..."
                  />
                </div>

                <div className="wa-bot-actions-row">
                  <button 
                    type="button" 
                    className="btn-outline-back" 
                    onClick={() => { setStep(1); setErrorMsg(''); }}
                  >
                    ⬅ Volver
                  </button>
                  <button type="submit" className="btn-whatsapp-submit">
                    <span>Enviar a WhatsApp (984 197 5555)</span>
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                      <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"></path>
                    </svg>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default WhatsAppBot;
