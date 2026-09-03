import React, { useRef, useState } from 'react';

const ALL_VIDEOS = [
  { id: 'AVKW4584', url: '/videos/AVKW4584.MP4', title: 'Amigos de Fiesta • Pura Buena Vibra', category: 'Amigos & Fiesta' },
  { id: 'BGNI7635', url: '/videos/BGNI7635.MP4', title: 'Mamá e Hijos en la Cabina 360', category: 'Familias & Niños' },
  { id: 'CRKQ9621', url: '/videos/CRKQ9621.MP4', title: 'Diversión entre Amigos en Cancún', category: 'Amigos & Fiesta' },
  { id: 'DXAF4591', url: '/videos/DXAF4591.MP4', title: 'Noche de Chicas • Girls Night Out', category: 'Glamour & Chicas' },
  { id: 'EEJG6543', url: '/videos/EEJG6543.MP4', title: 'Baile y Ritmo Tropical', category: 'Amigos & Fiesta' },
  { id: 'FNAV8175', url: '/videos/FNAV8175.MP4', title: 'Pareja en la Zona Hotelera', category: 'Parejas & Romance' },
  { id: 'GXUU6443', url: '/videos/GXUU6443.MP4', title: 'Grupo frente a la Guitarra de Hard Rock', category: 'Amigos & Fiesta' },
  { id: 'HHRW5498', url: '/videos/HHRW5498.MP4', title: 'Glamour y Estilo en Vestido Esmeralda', category: 'Glamour & Chicas' },
  { id: 'HIAF0851', url: '/videos/HIAF0851.MP4', title: 'Padre e Hijo en la Cabina 360', category: 'Familias & Niños' },
  { id: 'HIZC1522', url: '/videos/HIZC1522.MP4', title: 'Elegancia en Rojo • Fiesta Nocturna', category: 'Glamour & Chicas' },
  { id: 'IEZG5212', url: '/videos/IEZG5212.MP4', title: 'Sonrisas y Elegancia en Vestido Negro', category: 'Glamour & Chicas' },
  { id: 'IIEG1093', url: '/videos/IIEG1093.MP4', title: 'Beso Romántico en Pareja 360', category: 'Parejas & Romance' },
  { id: 'JTCY2670', url: '/videos/JTCY2670.MP4', title: 'Alegría y Baile Familiar', category: 'Familias & Niños' },
  { id: 'MDXG1402', url: '/videos/MDXG1402.MP4', title: 'Glamour Nocturno con Amigas', category: 'Glamour & Chicas' },
  { id: 'MQIH3228', url: '/videos/MQIH3228.MP4', title: 'Pareja Juvenil • Ritmo y Estilo', category: 'Parejas & Romance' },
  { id: 'NBYE9611', url: '/videos/NBYE9611.MP4', title: 'Fiesta con Luces LED y Mucha Energía', category: 'Glamour & Chicas' },
  { id: 'NNCC7659', url: '/videos/NNCC7659.MP4', title: 'Padre e Hijo en Hard Rock Cancún', category: 'Familias & Niños' },
  { id: 'NNDL4081', url: '/videos/NNDL4081.MP4', title: 'Grupo de Amigas • Pura Sonrisa', category: 'Glamour & Chicas' },
  { id: 'PGUX1902', url: '/videos/PGUX1902.MP4', title: 'Amigos con su Mascota • Pet Friendly 360', category: 'Amigos & Fiesta' },
  { id: 'QJRP4655', url: '/videos/QJRP4655.MP4', title: 'Actitud de Fiesta en Cancún', category: 'Glamour & Chicas' },
  { id: 'RUSF8361', url: '/videos/RUSF8361.MP4', title: 'Gran Familia Celebrando en 360', category: 'Familias & Niños' },
  { id: 'SYII9363', url: '/videos/SYII9363.MP4', title: 'Saludos y Fiesta en Pareja', category: 'Parejas & Romance' },
  { id: 'XDTX9730', url: '/videos/XDTX9730.MP4', title: 'Baile y Vueltas en Pareja', category: 'Parejas & Romance' },
];

const CATEGORIES = ['Todos', 'Amigos & Fiesta', 'Familias & Niños', 'Parejas & Romance', 'Glamour & Chicas'];

const InteractiveVideo = ({ video, index }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(err => {
        console.log('Reproducción prevenida', err);
      });
    }
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    const newMuted = !isMuted;
    videoRef.current.muted = newMuted;
    setIsMuted(newMuted);
  };

  return (
    <div 
      className="gallery-item-video animate-slide-up"
      style={{ 
        width: '100%', 
        maxWidth: '340px', 
        aspectRatio: '9/16', 
        background: '#0a0f18', 
        borderRadius: '16px', 
        overflow: 'hidden',
        position: 'relative',
        cursor: 'pointer',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease'
      }}
      onClick={togglePlay}
    >
      <video 
        ref={videoRef}
        src={`${video.url}#t=0.1`} 
        width="100%" 
        height="100%" 
        loop 
        muted={isMuted}
        playsInline
        preload="metadata"
        title={video.title}
        style={{ objectFit: 'cover', border: 'none', display: 'block' }}
      />

      {/* Overlay Superior con Badge 360 y Categoría */}
      <div style={{
        position: 'absolute',
        top: '12px',
        left: '12px',
        right: '12px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 2
      }}>
        <span style={{
          background: 'rgba(10, 15, 24, 0.8)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(214, 158, 46, 0.5)',
          color: 'var(--accent-gold-light)',
          fontSize: '0.74rem',
          fontWeight: 700,
          padding: '4px 10px',
          borderRadius: '20px'
        }}>
          360° VIDEO
        </span>

        {/* Botón de Audio */}
        <button
          onClick={toggleMute}
          aria-label={isMuted ? 'Activar sonido' : 'Silenciar'}
          style={{
            background: 'rgba(10, 15, 24, 0.8)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255, 255, 255, 0.25)',
            color: 'white',
            borderRadius: '50%',
            width: '34px',
            height: '34px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'background 0.2s'
          }}
        >
          {isMuted ? (
            /* Icono Silenciado */
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
              <line x1="23" y1="9" x2="17" y2="15"></line>
              <line x1="17" y1="9" x2="23" y2="15"></line>
            </svg>
          ) : (
            /* Icono Con Sonido */
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 5"></polygon>
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
            </svg>
          )}
        </button>
      </div>

      {/* Botón Central de Play cuando está pausado */}
      {!isPlaying && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'rgba(214, 158, 46, 0.88)',
          borderRadius: '50%',
          width: '64px',
          height: '64px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 0 25px rgba(214, 158, 46, 0.65)',
          pointerEvents: 'none',
          transition: 'transform 0.2s ease'
        }}>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="#0a0f18">
            <path d="M8 5V19L19 12L8 5Z" />
          </svg>
        </div>
      )}

      {/* Barra Inferior con Título del Video Adaptable sin recortes */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: '30px 16px 14px',
        background: 'linear-gradient(to top, rgba(6, 9, 14, 0.96) 0%, rgba(6, 9, 14, 0.75) 65%, transparent 100%)',
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
        textAlign: 'left'
      }}>
        <span style={{ 
          fontSize: '0.94rem', 
          fontWeight: 700, 
          color: 'white', 
          lineHeight: '1.3',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden'
        }}>
          {video.title}
        </span>
        <span style={{ fontSize: '0.76rem', color: 'var(--accent-gold-light)', fontWeight: 600 }}>
          {isPlaying ? '▶ Reproduciendo (Toca para pausar)' : '▶ Toca para reproducir'}
        </span>
      </div>
    </div>
  );
};

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [visibleCount, setVisibleCount] = useState(6);

  const filteredVideos = ALL_VIDEOS.filter(video => {
    if (selectedCategory === 'Todos') return true;
    return video.category === selectedCategory;
  });

  const displayedVideos = filteredVideos.slice(0, visibleCount);

  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat);
    setVisibleCount(6);
  };

  const handleLoadMore = () => {
    setVisibleCount(prev => Math.min(prev + 6, filteredVideos.length));
  };

  return (
    <section id="gallery" className="gallery" style={{ padding: '80px 5%' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
        <span className="badge-gold">Videos Oficiales Only Fun</span>
        <h2 className="section-title animate-slide-up">Nuestra Galería de Videos 360</h2>
        <p className="section-subtitle animate-slide-up delay-100">
          Momentos reales capturados en Cancún y la Riviera Maya con nuestra cabina 360°.
        </p>

        {/* Filtros por Categoría Real */}
        <div style={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          justifyContent: 'center', 
          gap: '10px', 
          marginBottom: '40px' 
        }}>
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              style={{
                padding: '8px 18px',
                borderRadius: '25px',
                fontSize: '0.88rem',
                fontWeight: 600,
                border: selectedCategory === cat ? '1px solid var(--accent-gold)' : '1px solid rgba(255, 255, 255, 0.15)',
                background: selectedCategory === cat ? 'linear-gradient(135deg, var(--accent-gold), var(--accent-gold-light))' : 'rgba(255, 255, 255, 0.05)',
                color: selectedCategory === cat ? '#06090e' : 'var(--text-main)',
                cursor: 'pointer',
                transition: 'all 0.25s ease'
              }}
            >
              {cat} {cat === 'Todos' ? `(${ALL_VIDEOS.length})` : `(${ALL_VIDEOS.filter(v => v.category === cat).length})`}
            </button>
          ))}
        </div>

        {/* Grid de Videos */}
        <div 
          className="gallery-grid" 
          style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
            gap: '25px',
            justifyItems: 'center',
            marginBottom: '40px'
          }}
        >
          {displayedVideos.map((video, index) => (
            <InteractiveVideo key={video.id} video={video} index={index} />
          ))}
        </div>

        {/* Botón de Cargar Más */}
        {visibleCount < filteredVideos.length && (
          <div style={{ marginTop: '20px' }}>
            <button
              onClick={handleLoadMore}
              className="btn-gold"
              style={{
                padding: '14px 32px',
                fontSize: '1rem',
                fontWeight: 800,
                cursor: 'pointer',
                boxShadow: '0 10px 25px rgba(214, 158, 46, 0.3)'
              }}
            >
              Cargar Más Videos ({filteredVideos.length - visibleCount} restantes) ➔
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;
