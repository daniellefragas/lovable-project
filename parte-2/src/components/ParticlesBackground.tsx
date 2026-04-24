import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseX: number;
  baseY: number;
  size: number;
  alpha: number;
}

export const ParticlesBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -9999, y: -9999, active: false });
  const particles = useRef<Particle[]>([]);
  const raf = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Density based on area
      const target = Math.floor((width * height) / 9000);
      const count = Math.max(60, Math.min(220, target));
      particles.current = Array.from({ length: count }).map(() => {
        const x = Math.random() * width;
        const y = Math.random() * height;
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.25 + Math.random() * 0.45;
        return {
          x,
          y,
          baseX: x,
          baseY: y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: Math.random() * 1.4 + 0.4,
          alpha: Math.random() * 0.5 + 0.25,
        };
      });
    };

    resize();
    window.addEventListener("resize", resize);

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current.x = e.clientX - rect.left;
      mouse.current.y = e.clientY - rect.top;
      mouse.current.active = true;
    };
    const onLeave = () => {
      mouse.current.active = false;
      mouse.current.x = -9999;
      mouse.current.y = -9999;
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);

    const REPEL_RADIUS = 130;
    const CONNECT_DIST = 110;

    const tick = () => {
      ctx.clearRect(0, 0, width, height);

      const ps = particles.current;
      const mx = mouse.current.x;
      const my = mouse.current.y;

      for (let i = 0; i < ps.length; i++) {
        const p = ps[i];

        // Mouse repulsion
        const dx = p.x - mx;
        const dy = p.y - my;
        const dist = Math.hypot(dx, dy);
        if (dist < REPEL_RADIUS && dist > 0.0001) {
          const force = (REPEL_RADIUS - dist) / REPEL_RADIUS;
          const angle = Math.atan2(dy, dx);
          p.vx += Math.cos(angle) * force * 0.9;
          p.vy += Math.sin(angle) * force * 0.9;
        }

        // Tiny random steering so motion feels organic
        p.vx += (Math.random() - 0.5) * 0.02;
        p.vy += (Math.random() - 0.5) * 0.02;

        // Gentle friction (keeps motion alive but caps speed)
        p.vx *= 0.992;
        p.vy *= 0.992;

        // Maintain a minimum drift so they never stop
        const sp = Math.hypot(p.vx, p.vy);
        const MIN_SPEED = 0.18;
        const MAX_SPEED = 1.6;
        if (sp < MIN_SPEED) {
          const a = Math.atan2(p.vy || (Math.random() - 0.5), p.vx || (Math.random() - 0.5));
          p.vx = Math.cos(a) * MIN_SPEED;
          p.vy = Math.sin(a) * MIN_SPEED;
        } else if (sp > MAX_SPEED) {
          p.vx = (p.vx / sp) * MAX_SPEED;
          p.vy = (p.vy / sp) * MAX_SPEED;
        }

        p.x += p.vx;
        p.y += p.vy;

        // Wrap around screen edges
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(165, 100%, 50%, ${p.alpha})`;
        ctx.fill();
      }

      // Draw connecting lines between near particles
      for (let i = 0; i < ps.length; i++) {
        for (let j = i + 1; j < ps.length; j++) {
          const a = ps[i];
          const b = ps[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d = Math.hypot(dx, dy);
          if (d < CONNECT_DIST) {
            const op = (1 - d / CONNECT_DIST) * 0.18;
            ctx.strokeStyle = `hsla(165, 100%, 60%, ${op})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      raf.current = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Base radial gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(220_25%_7%)_0%,_hsl(220_25%_3%)_75%)]" />
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
      {/* Vignette / bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-py-dark to-transparent" />
    </div>
  );
};
