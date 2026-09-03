import React, { useEffect, useRef, useState } from 'react';

const Camera360Animation = () => {
  const [speed, setSpeed] = useState(1); // 0.5 (Slow-Mo), 1 (Normal), 2 (Party)
  const [isFlashing, setIsFlashing] = useState(false);
  const [activeSpeedMode, setActiveSpeedMode] = useState('normal'); // 'slow', 'normal', 'fast'
  
  const angleRef = useRef(0);
  const animFrameRef = useRef(null);
  const [displayAngle, setDisplayAngle] = useState(0);

  useEffect(() => {
    let lastFlashTime = Date.now();

    const animate = () => {
      // Speed multiplier
      const increment = 1.2 * speed;
      angleRef.current = (angleRef.current + increment) % 360;
      setDisplayAngle(Math.round(angleRef.current));

      // Trigger periodic camera flash every ~4 seconds
      const now = Date.now();
      if (now - lastFlashTime > 4000) {
        setIsFlashing(true);
        setTimeout(() => setIsFlashing(false), 300);
        lastFlashTime = now;
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [speed]);

  // Convert angle to radians for trigonometric positioning
  const rad = (angleRef.current * Math.PI) / 180;
  
  // Elliptical orbit for perspective 3D effect
  // Stage center is (200, 195)
  // Horizontal radius rx = 150, Vertical radius ry = 62
  const cx = 200;
  const cy = 195;
  const rx = 150;
  const ry = 62;

  const camX = cx + rx * Math.cos(rad);
  const camY = cy + ry * Math.sin(rad);

  // Depth factor: camera is in front when sin(rad) > 0 (camY > cy)
  const isFront = Math.sin(rad) > 0;
  const depthScale = 0.85 + 0.35 * ((camY - (cy - ry)) / (2 * ry)); // 0.85 to 1.20
  const zIndexCam = isFront ? 30 : 5;

  const handleSpeedChange = (newSpeed, mode) => {
    setSpeed(newSpeed);
    setActiveSpeedMode(mode);
  };

  const triggerManualFlash = () => {
    setIsFlashing(true);
    setTimeout(() => setIsFlashing(false), 350);
  };

  return (
    <div className="camera-360-studio-card glass-panel animate-scale-up">
      {/* Studio Top HUD Bar */}
      <div className="studio-hud-header">
        <div className="studio-rec-indicator">
          <span className="rec-dot"></span>
          <strong>REC</strong>
          <span className="rec-timecode">00:0{Math.floor(displayAngle / 60)}:{String(displayAngle % 60).padStart(2, '0')}</span>
        </div>
        <div className="studio-badge-specs">
          <span className="spec-item">4K 60FPS</span>
          <span className="spec-item-highlight">360° SLOW-MO</span>
        </div>
      </div>

      {/* Main 3D Canvas Stage */}
      <div className="studio-stage-viewport">
        {/* Flash Overlay */}
        <div className={`studio-flash-overlay ${isFlashing ? 'active' : ''}`} />

        <svg viewBox="0 0 400 370" className="studio-stage-svg">
          <defs>
            {/* Gradients */}
            <radialGradient id="platformBaseGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#3182ce" stopOpacity="0.4" />
              <stop offset="70%" stopColor="#d69e2e" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#06090e" stopOpacity="0.9" />
            </radialGradient>

            <linearGradient id="metalRimGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ecc94b" />
              <stop offset="30%" stopColor="#744210" />
              <stop offset="70%" stopColor="#ecc94b" />
              <stop offset="100%" stopColor="#d69e2e" />
            </linearGradient>

            <radialGradient id="spotlightCone" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ecc94b" stopOpacity="0.55" />
              <stop offset="50%" stopColor="#3182ce" stopOpacity="0.2" />
              <stop offset="100%" stopColor="transparent" stopOpacity="0" />
            </radialGradient>

            <linearGradient id="armMetalGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#4a5568" />
              <stop offset="50%" stopColor="#cbd5e0" />
              <stop offset="100%" stopColor="#2d3748" />
            </linearGradient>

            <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            
            <filter id="subtleShadow" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="12" stdDeviation="10" floodColor="#000" floodOpacity="0.7" />
            </filter>
          </defs>

          {/* 1. Ambient Background Particles */}
          <g className="studio-particles">
            <circle cx="60" cy="80" r="2.5" fill="#ecc94b" opacity="0.6" />
            <circle cx="340" cy="90" r="2" fill="#3182ce" opacity="0.7" />
            <circle cx="80" cy="280" r="3" fill="#ecc94b" opacity="0.4" />
            <circle cx="330" cy="270" r="2.5" fill="#ecc94b" opacity="0.6" />
            <polygon points="50,140 54,144 50,148 46,144" fill="#d69e2e" opacity="0.5" />
            <polygon points="355,160 360,165 355,170 350,165" fill="#ecc94b" opacity="0.6" />
          </g>

          {/* 2. Platform Drop Shadow */}
          <ellipse cx="200" cy="235" rx="145" ry="58" fill="#000000" opacity="0.65" filter="url(#subtleShadow)" />

          {/* 3. Platform Cylinder Side Wall (Depth 3D) */}
          <path 
            d="M 52 195 A 148 58 0 0 0 348 195 L 348 214 A 148 58 0 0 1 52 214 Z" 
            fill="url(#metalRimGrad)" 
            opacity="0.9" 
          />

          {/* 4. Platform Top Glass Surface */}
          <ellipse 
            cx="200" 
            cy="195" 
            rx="148" 
            ry="58" 
            fill="url(#platformBaseGlow)" 
            stroke="url(#metalRimGrad)" 
            strokeWidth="3.5" 
          />

          {/* 5. Animated Rotating LED Chase Ring */}
          <ellipse 
            cx="200" 
            cy="195" 
            rx="140" 
            ry="54" 
            fill="none" 
            stroke="#ecc94b" 
            strokeWidth="2" 
            strokeDasharray="12 16"
            strokeDashoffset={-displayAngle * 1.5}
            filter="url(#neonGlow)"
            opacity="0.85"
          />

          {/* Inner Stage Ring & Only Fun Monogram */}
          <ellipse 
            cx="200" 
            cy="195" 
            rx="95" 
            ry="36" 
            fill="none" 
            stroke="rgba(214, 158, 46, 0.4)" 
            strokeWidth="1.5" 
            strokeDasharray="6 6"
          />
          <text 
            x="200" 
            y="199" 
            textAnchor="middle" 
            fill="rgba(236, 201, 75, 0.55)" 
            fontSize="11" 
            fontWeight="800" 
            letterSpacing="3"
          >
            ★ ONLY FUN 360 ★
          </text>

          {/* 6. Spotlight Cone (Cast from Camera to Center) */}
          <polygon 
            points={`${camX},${camY - 50} 150,195 250,195`} 
            fill="url(#spotlightCone)" 
            opacity={isFlashing ? 0.9 : 0.45}
            style={{ transition: 'opacity 0.15s' }}
          />

          {/* 7. Motorized Arm: Center Base to Camera Support */}
          {/* Central Motor Turntable */}
          <ellipse cx="200" cy="195" rx="16" ry="7" fill="#1a202c" stroke="#d69e2e" strokeWidth="2" />
          
          {/* Sweeping Radial Support Bar */}
          <line 
            x1="200" 
            y1="195" 
            x2={camX} 
            y2={camY} 
            stroke="url(#armMetalGrad)" 
            strokeWidth="5" 
            strokeLinecap="round"
          />
          {/* Counter-weight near center opposite to camera */}
          <circle 
            cx={cx - 30 * Math.cos(rad)} 
            cy={cy - 12 * Math.sin(rad)} 
            r="7" 
            fill="#d69e2e" 
            stroke="#1a202c" 
            strokeWidth="2"
          />

          {/* 8. People / Celebrants on Platform (Behind Camera if Front, In Front if Back) */}
          <g id="celebrants" style={{ transform: 'translate(200px, 195px)' }}>
            {/* Shadow under feet */}
            <ellipse cx="0" cy="0" rx="36" ry="12" fill="rgba(0,0,0,0.6)" />

            {/* Guest 1: Elegant Party Pose with Raised Glass */}
            <g transform="translate(-18, -100)">
              {/* Champagne Glass & Arm */}
              <line x1="-12" y1="36" x2="-26" y2="12" stroke="#f0f4f8" strokeWidth="3.5" strokeLinecap="round" />
              <polygon points="-30,6 -22,6 -26,16" fill="#ecc94b" opacity="0.9" />
              <line x1="-26" y1="16" x2="-26" y2="24" stroke="#ecc94b" strokeWidth="2" />

              {/* Head & Hair */}
              <circle cx="-5" cy="12" r="10" fill="#f0f4f8" />
              <path d="M -15 14 Q -10 0 5 8 Q 8 22 -6 20 Z" fill="#d69e2e" opacity="0.85" />

              {/* Body / Party Dress */}
              <path d="M -12 25 L 2 25 L 8 85 L -20 85 Z" fill="#e2e8f0" />
              {/* Gold Belt/Sash */}
              <rect x="-14" y="44" width="20" height="4" fill="#d69e2e" />

              {/* Legs */}
              <line x1="-11" y1="85" x2="-11" y2="110" stroke="#f0f4f8" strokeWidth="4" strokeLinecap="round" />
              <line x1="1" y1="85" x2="3" y2="110" stroke="#f0f4f8" strokeWidth="4" strokeLinecap="round" />
            </g>

            {/* Guest 2: Dynamic Celebration Pose (Hands up / Confetti) */}
            <g transform="translate(16, -108)">
              {/* Head */}
              <circle cx="0" cy="12" r="10" fill="#ffffff" />

              {/* Raised Left Arm */}
              <line x1="-5" y1="28" x2="-20" y2="6" stroke="#ffffff" strokeWidth="3.8" strokeLinecap="round" />
              {/* Raised Right Arm */}
              <line x1="8" y1="28" x2="22" y2="4" stroke="#ffffff" strokeWidth="3.8" strokeLinecap="round" />

              {/* Suit / Tuxedo Torso */}
              <path d="M -8 26 L 8 26 L 6 68 L -6 68 Z" fill="#1a202c" stroke="#d69e2e" strokeWidth="1" />
              {/* Gold Tie */}
              <polygon points="0,28 -2,42 0,46 2,42" fill="#ecc94b" />

              {/* Legs */}
              <line x1="-4" y1="68" x2="-6" y2="118" stroke="#1a202c" strokeWidth="4.5" strokeLinecap="round" />
              <line x1="5" y1="68" x2="8" y2="118" stroke="#1a202c" strokeWidth="4.5" strokeLinecap="round" />
            </g>

            {/* Sparkles / Confetti Burst around guests */}
            <circle cx="-35" cy="-70" r="3" fill="#ecc94b" className="sparkle-float" />
            <circle cx="38" cy="-85" r="2.5" fill="#3182ce" className="sparkle-float" />
            <circle cx="5" cy="-115" r="3" fill="#ecc94b" className="sparkle-float" />
          </g>

          {/* 9. The High-Tech Camera Rig (Positioned Dynamically in 3D Orbit) */}
          <g 
            transform={`translate(${camX}, ${camY}) scale(${depthScale})`} 
            style={{ zIndex: zIndexCam }}
          >
            {/* Telescopic Vertical Pole */}
            <line 
              x1="0" 
              y1="0" 
              x2="0" 
              y2="-68" 
              stroke="url(#armMetalGrad)" 
              strokeWidth="5.5" 
              strokeLinecap="round" 
            />
            {/* Joint Knob */}
            <circle cx="0" cy="-35" r="4.5" fill="#d69e2e" />

            {/* Camera Gimbal Rig */}
            <g transform="translate(0, -68)">
              {/* Glowing Halo Ring Light (Aro de Luz LED) */}
              <circle 
                cx="0" 
                cy="0" 
                r="22" 
                fill="none" 
                stroke="#ffffff" 
                strokeWidth="4" 
                filter="url(#neonGlow)"
              />
              <circle 
                cx="0" 
                cy="0" 
                r="22" 
                fill="none" 
                stroke="#ecc94b" 
                strokeWidth="2" 
                opacity="0.8"
              />

              {/* Smartphone Body Inside Ring */}
              <rect 
                x="-9" 
                y="-15" 
                width="18" 
                height="30" 
                rx="3.5" 
                fill="#0a0f18" 
                stroke="#3182ce" 
                strokeWidth="1.5" 
              />
              
              {/* Screen / Viewfinder Live Glow */}
              <rect 
                x="-7" 
                y="-13" 
                width="14" 
                height="26" 
                rx="2" 
                fill="#101828" 
              />
              <circle cx="0" cy="-4" r="3" fill="#ecc94b" opacity="0.8" />
              <rect x="-5" y="4" width="10" height="2" fill="#25D366" />

              {/* Active Recording Lens & Camera Flash Burst */}
              <circle 
                cx="0" 
                cy="-4" 
                r={isFlashing ? 14 : 4.5} 
                fill={isFlashing ? '#ffffff' : '#e53e3e'} 
                filter={isFlashing ? 'url(#neonGlow)' : 'none'}
                style={{ transition: 'r 0.1s ease, fill 0.1s ease' }}
              />
            </g>
          </g>
        </svg>
      </div>

      {/* Interactive Studio Footer Controls */}
      <div className="studio-hud-footer">
        <div className="studio-speed-selector">
          <span className="control-label">Velocidad:</span>
          <button 
            className={`speed-pill ${activeSpeedMode === 'slow' ? 'active' : ''}`}
            onClick={() => handleSpeedChange(0.4, 'slow')}
          >
            🐢 Slow-Mo
          </button>
          <button 
            className={`speed-pill ${activeSpeedMode === 'normal' ? 'active' : ''}`}
            onClick={() => handleSpeedChange(1, 'normal')}
          >
            ⚡ Normal
          </button>
          <button 
            className={`speed-pill ${activeSpeedMode === 'fast' ? 'active' : ''}`}
            onClick={() => handleSpeedChange(2.2, 'fast')}
          >
            🎉 Fiesta
          </button>
        </div>

        <button 
          className="btn-flash-trigger" 
          onClick={triggerManualFlash}
          title="Disparar Flash 360"
        >
          <span>📸 Flash</span>
        </button>
      </div>
    </div>
  );
};

export default Camera360Animation;
