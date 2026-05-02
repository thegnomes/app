import { useEffect, useRef, useCallback } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseVx: number;
  baseVy: number;
  radius: number;
  baseRadius: number;
  color: string;
  alpha: number;
  glowIntensity: number;
}

interface GravityParticlesProps {
  isActive: boolean;
  particleCount?: number;
  interactionRadius?: number;
  gravityStrength?: number;
  baseSpeed?: number;
  attractMode?: boolean;
}

const PARTICLE_COLOR = '#ffffff';

function rand(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

function createParticle(
  width: number,
  height: number,
  baseSpeed: number
): Particle {
  const angle = Math.random() * Math.PI * 2;
  const speed = rand(baseSpeed * 0.3, baseSpeed);
  const radius = rand(0.45, 1.15);

  return {
    x: Math.random() * width,
    y: Math.random() * height,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    baseVx: Math.cos(angle) * speed,
    baseVy: Math.sin(angle) * speed,
    radius,
    baseRadius: radius,
    color: PARTICLE_COLOR,
    alpha: rand(0.28, 0.68),
    glowIntensity: 0,
  };
}

export function GravityParticles({
  isActive,
  particleCount = 120,
  interactionRadius = 220,
  gravityStrength = 0.8,
  baseSpeed = 0.6,
  attractMode = true,
}: GravityParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({
    x: 0,
    y: 0,
    active: false,
  });
  const rafRef = useRef<number>(0);
  const dimsRef = useRef<{ width: number; height: number }>({
    width: 0,
    height: 0,
  });

  const initParticles = useCallback(
    (width: number, height: number) => {
      particlesRef.current = Array.from({ length: particleCount }, () =>
        createParticle(width, height, baseSpeed)
      );
    },
    [particleCount, baseSpeed]
  );

  useEffect(() => {
    if (!isActive) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = window.innerWidth;
      const height = window.innerHeight;
      dimsRef.current = { width, height };
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      if (particlesRef.current.length === 0) {
        initParticles(width, height);
      }
    };

    resize();
    window.addEventListener('resize', resize);

    const handlePointerMove = (e: PointerEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.active = true;
    };

    const handlePointerLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerleave', handlePointerLeave);

    const animate = () => {
      const { width, height } = dimsRef.current;
      ctx.clearRect(0, 0, width, height);

      const mouse = mouseRef.current;
      const strength = gravityStrength;
      const radius = interactionRadius;
      const radiusSq = radius * radius;

      for (let i = 0; i < particlesRef.current.length; i++) {
        const p = particlesRef.current[i];

        // Gravity interaction
        let distSq = 0;
        let dx = 0;
        let dy = 0;

        if (mouse.active) {
          dx = mouse.x - p.x;
          dy = mouse.y - p.y;
          distSq = dx * dx + dy * dy;
        }

        let targetGlow = 0;

        if (mouse.active && distSq < radiusSq && distSq > 0.1) {
          const dist = Math.sqrt(distSq);
          const force = (1 - dist / radius) * strength;
          const nx = dx / dist;
          const ny = dy / dist;

          if (attractMode) {
            p.vx += nx * force * 0.15;
            p.vy += ny * force * 0.15;
          } else {
            p.vx -= nx * force * 0.15;
            p.vy -= ny * force * 0.15;
          }

          targetGlow = (1 - dist / radius) * 12;
        }

        // Return to base velocity (damping towards natural drift)
        p.vx += (p.baseVx - p.vx) * 0.02;
        p.vy += (p.baseVy - p.vy) * 0.02;

        // Speed limit
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        const maxSpeed = baseSpeed * 4;
        if (speed > maxSpeed) {
          p.vx = (p.vx / speed) * maxSpeed;
          p.vy = (p.vy / speed) * maxSpeed;
        }

        // Update position
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around edges
        if (p.x < -p.radius * 2) p.x = width + p.radius * 2;
        if (p.x > width + p.radius * 2) p.x = -p.radius * 2;
        if (p.y < -p.radius * 2) p.y = height + p.radius * 2;
        if (p.y > height + p.radius * 2) p.y = -p.radius * 2;

        // Smooth glow transition
        p.glowIntensity += (targetGlow - p.glowIntensity) * 0.1;

        // Draw particle
        const drawRadius = p.baseRadius + p.glowIntensity * 0.04;
        ctx.beginPath();
        ctx.arc(p.x, p.y, drawRadius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;

        if (p.glowIntensity > 0.5) {
          ctx.shadowBlur = p.glowIntensity;
          ctx.shadowColor = p.color;
        } else {
          ctx.shadowBlur = 0;
        }

        ctx.globalAlpha = p.alpha;
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;

        // Optional: soft halo for strongly glowing particles
        if (p.glowIntensity > 5) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, drawRadius * 3, 0, Math.PI * 2);
          const gradient = ctx.createRadialGradient(
            p.x,
            p.y,
            drawRadius * 0.5,
            p.x,
            p.y,
            drawRadius * 3
          );
          gradient.addColorStop(0, p.color);
          gradient.addColorStop(1, 'transparent');
          ctx.fillStyle = gradient;
          ctx.globalAlpha = p.alpha * 0.15;
          ctx.fill();
          ctx.globalAlpha = 1;
        }
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerleave', handlePointerLeave);
      cancelAnimationFrame(rafRef.current);
    };
  }, [isActive, initParticles, gravityStrength, interactionRadius, baseSpeed, attractMode]);

  if (!isActive) return null;

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-[1]"
      style={{ opacity: 0.85 }}
    />
  );
}
