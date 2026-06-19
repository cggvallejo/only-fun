import React, { useRef, useState } from 'react';

const InteractiveVideo = ({ reel, index }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.play().catch(e => console.log('Autoplay prevented', e));
      setIsPlaying(true);
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleClick = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play().catch(e => console.log('Autoplay prevented', e));
        setIsPlaying(true);
      }
    }
  };

  return (
    <div 
      className={`gallery-item-video animate-slide-up delay-${(index + 1) * 100}`}
      style={{ 
        width: '100%', 
        maxWidth: '350px', 
        aspectRatio: '9/16', 
        background: 'black', 
        borderRadius: '12px', 
        overflow: 'hidden',
        position: 'relative',
        cursor: 'pointer'
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <video 
        ref={videoRef}
        src={reel.url} 
        width="100%" 
        height="100%" 
        loop 
        muted 
        playsInline
        title={reel.title}
        style={{ objectFit: 'cover', border: 'none', display: 'block' }}
      ></video>
      
      {!isPlaying && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'rgba(0,0,0,0.5)',
          borderRadius: '50%',
          width: '60px',
          height: '60px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none'
        }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 5V19L19 12L8 5Z" />
          </svg>
        </div>
      )}
    </div>
  );
};

const Gallery = () => {
  const reels = [
    { id: 'DZVbd4VNWjL', url: '/videos/DZVbd4VNWjL.mp4', title: 'Reel 1' },
    { id: 'DZPszKvNxT4', url: '/videos/DZPszKvNxT4.mp4', title: 'Reel 2' },
    { id: 'DZOc5biNXQl', url: '/videos/DZOc5biNXQl.mp4', title: 'Reel 3' },
    { id: 'DZOajBKtgTs', url: '/videos/DZOajBKtgTs.mp4', title: 'Reel 4' },
    { id: 'DZOZTW8tTvd', url: '/videos/DZOZTW8tTvd.mp4', title: 'Reel 5' },
    { id: 'DZOZL6oNQQv', url: '/videos/DZOZL6oNQQv.mp4', title: 'Reel 6' },
    { id: 'DZOZH3WtEEg', url: '/videos/DZOZH3WtEEg.mp4', title: 'Reel 7' },
    { id: 'DZOYigdNKXf', url: '/videos/DZOYigdNKXf.mp4', title: 'Reel 8' },
    { id: 'DZOYcTctvSx', url: '/videos/DZOYcTctvSx.mp4', title: 'Reel 9' },
    { id: 'DZOXbELtsFw', url: '/videos/DZOXbELtsFw.mp4', title: 'Reel 10' },
    { id: 'DZOXVZoN58X', url: '/videos/DZOXVZoN58X.mp4', title: 'Reel 11' },
    { id: 'DZOXNYYNFVp', url: '/videos/DZOXNYYNFVp.mp4', title: 'Reel 12' },
    { id: 'DZOW8KmN2oa', url: '/videos/DZOW8KmN2oa.mp4', title: 'Reel 13' },
    { id: 'DZOW3DatR6V', url: '/videos/DZOW3DatR6V.mp4', title: 'Reel 14' },
    { id: 'DZOWwwPN9mm', url: '/videos/DZOWwwPN9mm.mp4', title: 'Reel 15' },
  ];

  return (
    <section id="gallery" className="gallery">
      <h2 className="section-title animate-slide-up">Nuestra Galería</h2>
      <p className="section-subtitle animate-slide-up delay-100">
        Disfruta de la diversión pura en nuestros eventos directamente desde Instagram.
      </p>
      
      <div className="gallery-grid" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '30px' }}>
        {reels.map((reel, index) => (
          <InteractiveVideo key={reel.id} reel={reel} index={index} />
        ))}
      </div>
    </section>
  );
};

export default Gallery;
