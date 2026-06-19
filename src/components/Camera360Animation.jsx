import React, { useEffect, useRef } from 'react';

const Camera360Animation = () => {
  const spinnerRef = useRef(null);
  const cameraRef = useRef(null);

  useEffect(() => {
    let angle = 0;
    let animationFrameId;

    const animate = () => {
      angle += 1.5; // degrees per frame
      if (angle >= 360) angle = 0;
      
      if (spinnerRef.current) {
        spinnerRef.current.style.transform = `rotateZ(${angle}deg)`;
      }
      
      if (cameraRef.current) {
        // Counter rotate Z so it always faces the center/same direction, 
        // and rotate X -90 to stand up from the 60deg tilted platform.
        cameraRef.current.style.transform = `translate(50%, -50%) rotateZ(${-angle}deg) rotateX(-90deg)`;
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div className="camera-360-container" style={{
      width: '100%',
      maxWidth: '400px',
      aspectRatio: '1',
      margin: '0 auto',
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      animation: 'float360 4s ease-in-out infinite',
      perspective: '1000px'
    }}>
      {/* Platform */}
      <div className="platform-base" style={{
        position: 'absolute',
        width: '80%',
        height: '80%',
        borderRadius: '50%',
        background: 'radial-gradient(circle at center, rgba(49, 130, 206, 0.2) 0%, rgba(214, 158, 46, 0.1) 100%)',
        border: '3px solid var(--accent-gold)',
        transform: 'rotateX(60deg)',
        boxShadow: '0 20px 50px rgba(0,0,0,0.5), inset 0 0 40px rgba(214, 158, 46, 0.4)',
        transformStyle: 'preserve-3d'
      }}>
        {/* Rotating Mechanism */}
        <div ref={spinnerRef} style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          top: 0,
          left: 0,
          transformOrigin: '50% 50%',
          transformStyle: 'preserve-3d'
        }}>
          {/* Arm */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '50%',
            height: '6px',
            background: 'var(--text-muted)',
            transformOrigin: '0 50%',
            transform: 'translateY(-50%)',
            boxShadow: '0 5px 10px rgba(0,0,0,0.5)'
          }}></div>
          
          {/* Camera Head */}
          <div ref={cameraRef} style={{
            position: 'absolute',
            right: '0',
            top: '50%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            transformOrigin: 'center bottom',
            zIndex: 20
          }}>
            <div style={{
              width: '40px',
              height: '60px',
              background: '#1a202c',
              borderRadius: '6px',
              border: '2px solid var(--accent-blue)',
              position: 'relative',
              display: 'flex',
              justifyContent: 'center',
              marginBottom: '-5px',
              zIndex: 15,
              boxShadow: '0 0 15px rgba(49, 130, 206, 0.4)'
            }}>
              <div style={{
                width: '14px',
                height: '14px',
                background: 'white',
                borderRadius: '50%',
                marginTop: '8px',
                animation: 'camera-flash 0.5s infinite'
              }}></div>
            </div>
            <div style={{
              width: '8px',
              height: '100px',
              background: 'linear-gradient(to right, #4a5568, #2d3748)',
              borderRadius: '4px'
            }}></div>
          </div>
        </div>
      </div>

      {/* Person Figure */}
      <div style={{
        position: 'absolute',
        bottom: '25%',
        width: '70px',
        height: '140px',
        background: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23f0f4f8"><path d="M12 2C10.9 2 10 2.9 10 4C10 5.1 10.9 6 12 6C13.1 6 14 5.1 14 4C14 2.9 13.1 2 12 2ZM16 10H15V22H13V15H11V22H9V10H8C6.9 10 6 9.1 6 8V7H18V8C18 9.1 17.1 10 16 10Z"/></svg>') no-repeat center center`,
        backgroundSize: 'contain',
        zIndex: 10,
        filter: 'drop-shadow(0 15px 10px rgba(0,0,0,0.6))'
      }}></div>

      {/* Center Text */}
      <div style={{
        position: 'absolute',
        bottom: '5%',
        color: 'var(--accent-gold)',
        fontWeight: 800,
        fontSize: '1.2rem',
        letterSpacing: '2px',
        textShadow: '0 0 15px var(--accent-gold)',
        opacity: 0.9,
        zIndex: 25
      }}>360° EXPERIENCE</div>
    </div>
  );
};

export default Camera360Animation;
