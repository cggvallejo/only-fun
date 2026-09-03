import React, { useEffect, useRef } from 'react';

const DynamicParticles = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    // Mouse tracking for interactive physics
    let mouse = { x: -1000, y: -1000, radius: 140 };
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Colors matching Only Fun palette (Gold, Champagne, Electric Blue, White)
    const colors = [
      'rgba(236, 201, 75, ', // Gold light
      'rgba(214, 158, 46, ',  // Deep gold
      'rgba(49, 130, 206, ',  // Electric blue
      'rgba(99, 179, 237, ',  // Ice blue
      'rgba(255, 255, 255, '  // Pure white
    ];

    // Particle generator
    const particleCount = 75;
    const particles = [];

    class Particle {
      constructor() {
        this.reset(true);
      }

      reset(initial = false) {
        this.x = Math.random() * width;
        this.y = initial ? Math.random() * height : height + 20;
        this.size = Math.random() * 3.5 + 1.2;
        this.baseSize = this.size;
        this.speedY = Math.random() * 0.7 + 0.3; // Upward drift
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.colorPrefix = colors[Math.floor(Math.random() * colors.length)];
        this.alpha = Math.random() * 0.6 + 0.2;
        this.twinkleSpeed = Math.random() * 0.03 + 0.01;
        this.angle = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.03;
        // Types: 'orb', 'sparkle', 'confetti'
        const rand = Math.random();
        this.type = rand < 0.55 ? 'orb' : rand < 0.85 ? 'sparkle' : 'confetti';
        this.wobbleSpeed = Math.random() * 0.04 + 0.02;
      }

      update() {
        this.y -= this.speedY;
        this.angle += this.rotationSpeed;
        this.x += Math.sin(this.angle) * 0.5 + this.speedX;

        // Mouse avoidance / interaction
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius && dist > 0) {
          const force = (mouse.radius - dist) / mouse.radius;
          const dirX = dx / dist;
          const dirY = dy / dist;
          this.x += dirX * force * 4.5;
          this.y += dirY * force * 4.5;
        }

        // Twinkle
        this.alpha += Math.sin(Date.now() * this.twinkleSpeed * 0.05) * 0.01;
        if (this.alpha < 0.15) this.alpha = 0.15;
        if (this.alpha > 0.85) this.alpha = 0.85;

        // Reset if drifted above top
        if (this.y < -30 || this.x < -30 || this.x > width + 30) {
          this.reset(false);
        }
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);

        if (this.type === 'orb') {
          const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, this.size * 2.2);
          grad.addColorStop(0, `${this.colorPrefix}${this.alpha})`);
          grad.addColorStop(0.5, `${this.colorPrefix}${this.alpha * 0.5})`);
          grad.addColorStop(1, `${this.colorPrefix}0)`);
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(0, 0, this.size * 2.2, 0, Math.PI * 2);
          ctx.fill();
        } else if (this.type === 'sparkle') {
          // 4-pointed sparkle star
          ctx.fillStyle = `${this.colorPrefix}${this.alpha})`;
          ctx.beginPath();
          const s = this.size * 2;
          ctx.moveTo(0, -s);
          ctx.quadraticCurveTo(0, 0, s, 0);
          ctx.quadraticCurveTo(0, 0, 0, s);
          ctx.quadraticCurveTo(0, 0, -s, 0);
          ctx.quadraticCurveTo(0, 0, 0, -s);
          ctx.fill();
        } else if (this.type === 'confetti') {
          // Golden floating rectangle
          ctx.fillStyle = `${this.colorPrefix}${this.alpha * 0.8})`;
          ctx.fillRect(-this.size, -this.size * 0.6, this.size * 2, this.size * 1.2);
        }

        ctx.restore();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    // Occasional camera flash burst
    let flash = { active: false, x: 0, y: 0, radius: 0, alpha: 0 };
    const triggerFlash = () => {
      flash.active = true;
      flash.x = Math.random() * (width * 0.7) + width * 0.15;
      flash.y = Math.random() * (height * 0.7) + height * 0.15;
      flash.radius = Math.random() * 80 + 100;
      flash.alpha = 0.5;

      setTimeout(() => {
        if (canvas) {
          const nextDelay = Math.random() * 3500 + 2500;
          setTimeout(triggerFlash, nextDelay);
        }
      }, 300);
    };

    const flashTimeout = setTimeout(triggerFlash, 2000);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render Camera Flash effect
      if (flash.active) {
        const flashGrad = ctx.createRadialGradient(flash.x, flash.y, 0, flash.x, flash.y, flash.radius);
        flashGrad.addColorStop(0, `rgba(255, 255, 255, ${flash.alpha})`);
        flashGrad.addColorStop(0.3, `rgba(236, 201, 75, ${flash.alpha * 0.6})`);
        flashGrad.addColorStop(1, 'rgba(236, 201, 75, 0)');
        ctx.fillStyle = flashGrad;
        ctx.beginPath();
        ctx.arc(flash.x, flash.y, flash.radius, 0, Math.PI * 2);
        ctx.fill();

        flash.alpha -= 0.035;
        if (flash.alpha <= 0) {
          flash.active = false;
        }
      }

      // Render Particles
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearTimeout(flashTimeout);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="dynamic-particles-canvas"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0
      }}
    />
  );
};

export default DynamicParticles;
