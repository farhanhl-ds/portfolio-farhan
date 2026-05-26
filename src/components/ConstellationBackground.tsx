import { useEffect, useRef } from "react";

export default function ConstellationBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef<{ x: number | null; y: number | null; rx: number | null; ry: number | null }>({
    x: null,
    y: null,
    rx: null, // real client mouse
    ry: null
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let dpr = window.devicePixelRatio || 1;

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      baseOpacity: number;
      phase: number;
      twinkleSpeed: number;
      tint: string;
    }

    interface ShootingStar {
      x: number;
      y: number;
      vx: number;
      vy: number;
      length: number;
      life: number;
      maxLife: number;
      opacity: number;
    }

    let particles: Particle[] = [];
    let shootingStars: ShootingStar[] = [];
    const maxParticles = 60;
    const connectionDistance = 140;

    const initParticles = (w: number, h: number) => {
      particles = [];
      const count = Math.min(maxParticles, Math.floor((w * h) / 16000));
      const tints = [
        "rgba(222, 219, 200,", // Warm cream (primary match)
        "rgba(222, 219, 200,",
        "rgba(222, 219, 200,",
        "rgba(147, 197, 253,", // Light blue star
        "rgba(253, 186, 116,"  // Light orange/amber star
      ];
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          radius: Math.random() * 2.0 + 0.8,
          baseOpacity: Math.random() * 0.45 + 0.25,
          phase: Math.random() * Math.PI * 2,
          twinkleSpeed: 0.015 + Math.random() * 0.02,
          tint: tints[Math.floor(Math.random() * tints.length)]
        });
      }
    };

    const handleResize = () => {
      if (!canvas) return;
      const rect = canvas.parentElement?.getBoundingClientRect() || canvas.getBoundingClientRect();
      dpr = window.devicePixelRatio || 1;
      width = rect.width;
      height = rect.height;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);

      // (Re)initialize particles to suit space
      initParticles(width, height);
    };

    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });
    
    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }
    handleResize();

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.rx = e.clientX - rect.left;
      mouseRef.current.ry = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouseRef.current.rx = null;
      mouseRef.current.ry = null;
    };

    const parent = canvas.parentElement;
    if (parent) {
      parent.addEventListener("mousemove", handleMouseMove);
      parent.addEventListener("mouseleave", handleMouseLeave);
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Dampened mouse easing for ultra-smooth responsiveness
      if (mouseRef.current.rx !== null && mouseRef.current.ry !== null) {
        if (mouseRef.current.x === null) {
          mouseRef.current.x = mouseRef.current.rx;
          mouseRef.current.y = mouseRef.current.ry;
        } else {
          mouseRef.current.x += (mouseRef.current.rx - mouseRef.current.x) * 0.08;
          mouseRef.current.y += (mouseRef.current.ry - mouseRef.current.y) * 0.08;
        }
      } else {
        mouseRef.current.x = null;
        mouseRef.current.y = null;
      }

      // Draw faint, premium subtle color glow under mouse
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      if (mx !== null && my !== null) {
        const glowRad = 150;
        const radGrd = ctx.createRadialGradient(mx, my, 0, mx, my, glowRad);
        radGrd.addColorStop(0, "rgba(222, 219, 200, 0.04)");
        radGrd.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = radGrd;
        ctx.beginPath();
        ctx.arc(mx, my, glowRad, 0, Math.PI * 2);
        ctx.fill();
      }

      // 1. Lines between particles with dynamic lighting
      ctx.lineWidth = 0.85;
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];

        // Active twinkling phase modifier
        p1.phase += p1.twinkleSpeed;
        const currentOpacity = p1.baseOpacity + Math.sin(p1.phase) * 0.2;
        const safeOpacity = Math.max(0.1, Math.min(1, currentOpacity));

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            // Lines pulse with the average opacity of both stars
            const pulseFactor = (safeOpacity + (p2.baseOpacity + Math.sin(p2.phase) * 0.2)) / 2;
            const alpha = (1 - dist / connectionDistance) * 0.25 * pulseFactor;
            ctx.strokeStyle = `rgba(222, 219, 200, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }

        // Lines linking to Cursor
        if (mx !== null && my !== null) {
          const mdx = p1.x - mx;
          const mdy = p1.y - my;
          const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
          const mouseConnectionDistance = 180;

          if (mdist < mouseConnectionDistance) {
            const mAlpha = (1 - mdist / mouseConnectionDistance) * 0.4 * safeOpacity;
            ctx.strokeStyle = `rgba(222, 219, 200, ${mAlpha})`;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(mx, my);
            ctx.stroke();

            // Sensation of gravitational attraction: pull star slightly
            const pullPower = (1 - mdist / mouseConnectionDistance) * 0.08;
            p1.x -= mdx * pullPower * 0.1;
            p1.y -= mdy * pullPower * 0.1;
          }
        }
      }

      // 2. Render shooting stars (meteors)
      if (Math.random() < 0.0035 && shootingStars.length < 2) {
        shootingStars.push({
          x: Math.random() * width * 0.8,
          y: Math.random() * height * 0.4,
          vx: Math.random() * 4 + 5,
          vy: Math.random() * 2 + 2,
          length: Math.random() * 80 + 50,
          life: 0,
          maxLife: Math.random() * 40 + 25,
          opacity: Math.random() * 0.5 + 0.4
        });
      }

      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const ss = shootingStars[i];
        ss.life++;
        if (ss.life >= ss.maxLife) {
          shootingStars.splice(i, 1);
          continue;
        }

        ss.x += ss.vx;
        ss.y += ss.vy;

        const lifeRatio = 1 - ss.life / ss.maxLife;
        const fadeOpacity = ss.opacity * Math.sin(lifeRatio * Math.PI);

        // Draw meteor streak line gradient
        const streamGrd = ctx.createLinearGradient(
          ss.x,
          ss.y,
          ss.x - ss.vx * (ss.length / 10),
          ss.y - ss.vy * (ss.length / 10)
        );
        streamGrd.addColorStop(0, `rgba(255, 255, 255, ${fadeOpacity})`);
        streamGrd.addColorStop(0.3, `rgba(222, 219, 200, ${fadeOpacity * 0.4})`);
        streamGrd.addColorStop(1, "rgba(222, 219, 200, 0)");

        ctx.strokeStyle = streamGrd;
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.moveTo(ss.x, ss.y);
        ctx.lineTo(ss.x - ss.vx * 3, ss.y - ss.vy * 3);
        ctx.stroke();
      }

      // 3. Draw particles (stars) and update positions
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        const currentOpacity = p.baseOpacity + Math.sin(p.phase) * 0.2;
        const safeOpacity = Math.max(0.15, Math.min(0.9, currentOpacity));

        // Pulsing starry glow radius
        const displayRadius = p.radius + Math.sin(p.phase) * 0.4;
        const safeRadius = Math.max(0.4, displayRadius);

        // Draw individual star
        ctx.fillStyle = `${p.tint}${safeOpacity})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, safeRadius, 0, Math.PI * 2);
        ctx.fill();

        // Standard floating movement
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around margins seamlessly
        const margin = 20;
        if (p.x < -margin) p.x = width + margin;
        if (p.x > width + margin) p.x = -margin;
        if (p.y < -margin) p.y = height + margin;
        if (p.y > height + margin) p.y = -margin;
      }

      // 4. Subtle, responsive visual feedback on mouse cursor location
      if (mx !== null && my !== null) {
        ctx.fillStyle = "rgba(222, 219, 200, 0.55)";
        ctx.beginPath();
        ctx.arc(mx, my, 2.5, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = "rgba(222, 219, 200, 0.12)";
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.arc(mx, my, 14, 0, Math.PI * 2);
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      if (parent) {
        parent.removeEventListener("mousemove", handleMouseMove);
        parent.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none mix-blend-screen opacity-75"
    />
  );
}

