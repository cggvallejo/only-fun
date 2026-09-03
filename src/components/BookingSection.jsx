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
  'Evento Completo (+6 horas)'
];

const EVENT_TYPES = [
  'Boda / Wedding',
  'Cumpleaños / Fiesta Privada',
  'Evento Corporativo',
  'XV Años',
  'Despedida de Soltera/o',
  'Graduación / Fiesta Temática'
];

const BookingSection = ({ onOpenBot }) => {
  const [formData, setFormData] = useState({
    name: '',
    eventDate: '',
    duration: '3 Horas',
    location: 'Cancún',
    exactAddress: '',
    eventType: 'Boda / Wedding',
    extraNotes: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const phoneNumber = '529841975555';
    const message = `¡Hola Only Fun Cancún! 🎉 Deseo cotizar mi evento:

👤 *Nombre:* ${formData.name.trim()}
📅 *Fecha del evento:* ${formData.eventDate}
⏱️ *Duración:* ${formData.duration}
📍 *Destino / Zona:* ${formData.location}
🏠 *Dirección / Lugar exacto:* ${formData.exactAddress.trim()}
✨ *Tipo de evento:* ${formData.eventType}
${formData.extraNotes.trim() ? `📝 *Detalles adicionales:* ${formData.extraNotes.trim()}` : ''}

¿Me pueden proporcionar disponibilidad y presupuesto? ¡Muchas gracias!`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
    setSubmitted(true);
  };

  return (
    <section id="contact" className="booking-section">
      <div className="booking-container">
        <div className="booking-header">
          <span className="badge-gold">Cobertura en Toda la Riviera Maya</span>
          <h2 className="section-title">Cotiza y Reserva tu Fecha</h2>
          <p className="section-subtitle">
            Playa del Carmen • Cancún • Isla Mujeres • Tulum • Cozumel
            <br />
            Envíanos los datos de tu evento y te respondemos de inmediato por WhatsApp al <strong>984 197 5555</strong>.
          </p>
        </div>

        <div className="booking-grid">
          {/* Card de Información y Beneficios */}
          <div className="booking-info-card glass-panel">
            <div className="booking-info-item">
              <div className="info-icon">📍</div>
              <div>
                <h4>Zona de Cobertura</h4>
                <p>Eventos en todo Cancún, Playa del Carmen, Tulum, Isla Mujeres y Cozumel.</p>
              </div>
            </div>

            <div className="booking-info-item">
              <div className="info-icon">📸</div>
              <div>
                <h4>Cabina 360 & Entretenimiento</h4>
                <p>Videos en alta definición, efectos en cámara lenta, música y descarga instantánea vía QR.</p>
              </div>
            </div>

            <div className="booking-info-item">
              <div className="info-icon">💬</div>
              <div>
                <h4>Atención Inmediata por WhatsApp</h4>
                <p>Respuesta rápida y confirmación de disponibilidad al <strong>984 197 5555</strong>.</p>
              </div>
            </div>

            <div className="booking-whatsapp-direct">
              <a 
                href="https://wa.me/529841975555?text=%C2%A1Hola%20Only%20Fun%20Canc%C3%BAn!%20Me%20gustar%C3%ADa%20solicitar%20informaci%C3%B3n%20para%20un%20evento."
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-whatsapp-large"
              >
                <span>Chatear directo con un asesor</span>
                <strong>+52 984 197 5555</strong>
              </a>
            </div>
          </div>

          {/* Formulario de Cotización */}
          <div className="booking-form-card glass-panel">
            <form onSubmit={handleSubmit} className="booking-form">
              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="booking-name">👤 Nombre del Cliente *</label>
                  <input 
                    id="booking-name"
                    type="text" 
                    name="name" 
                    value={formData.name} 
                    onChange={handleChange}
                    placeholder="Tu nombre y apellido" 
                    required
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="booking-date">📅 Fecha del Evento *</label>
                  <input 
                    id="booking-date"
                    type="date" 
                    name="eventDate" 
                    value={formData.eventDate} 
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="booking-location">📍 Destino / Zona en Riviera Maya *</label>
                  <select 
                    id="booking-location"
                    name="location" 
                    value={formData.location} 
                    onChange={handleChange}
                    className="select-highlighted"
                    required
                  >
                    {RIVIERA_LOCATIONS.map(loc => (
                      <option key={loc} value={loc}>{loc}</option>
                    ))}
                  </select>
                </div>
                <div className="form-field">
                  <label htmlFor="booking-duration">⏱️ Duración del Evento *</label>
                  <select 
                    id="booking-duration"
                    name="duration" 
                    value={formData.duration} 
                    onChange={handleChange}
                    required
                  >
                    {DURATION_OPTIONS.map(opt => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-field full-width">
                  <label htmlFor="booking-address">🏠 Dirección Exacta o Venue / Hotel *</label>
                  <input 
                    id="booking-address"
                    type="text" 
                    name="exactAddress" 
                    value={formData.exactAddress} 
                    onChange={handleChange}
                    placeholder="Ej. Hotel Dreams Riviera Cancún / Domicilio en Playa del Carmen..." 
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="booking-event-type">🎉 Tipo de Evento</label>
                  <select 
                    id="booking-event-type"
                    name="eventType" 
                    value={formData.eventType} 
                    onChange={handleChange}
                  >
                    {EVENT_TYPES.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                <div className="form-field">
                  <label htmlFor="booking-notes">📝 Comentarios adicionales (Opcional)</label>
                  <input 
                    id="booking-notes"
                    type="text" 
                    name="extraNotes" 
                    value={formData.extraNotes} 
                    onChange={handleChange}
                    placeholder="¿Algún requerimiento especial?"
                  />
                </div>
              </div>

              <button type="submit" className="btn-gold-action full-width">
                <span>Enviar Cotización a WhatsApp (984 197 5555)</span>
                <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingSection;
