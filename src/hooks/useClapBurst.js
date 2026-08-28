import { useCallback, useEffect, useRef } from "react";

const SPRITE_SIZE = 96;
const PARTICLE_COUNT = 500;
const STAGGER_MS = 550;

const CLAP_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
  <g transform="translate(16,24) rotate(-14) scale(0.72)">
    <rect x="6" y="0" width="5.5" height="10" rx="2.6" fill="#ffffff" transform="rotate(18 8.75 5)" />
    <rect x="2" y="-6" width="6" height="14" rx="3" fill="#ffffff" />
    <rect x="-3" y="-8" width="6" height="16" rx="3" fill="#ffffff" />
    <rect x="-8" y="-2" width="6" height="12" rx="3" fill="#ffffff" transform="rotate(-18 -5 4)" />
    <rect x="-8" y="6" width="16" height="10" rx="5" fill="#dbe6ff" />
  </g>
  <g transform="translate(32,24) rotate(14) scale(-0.72,0.72)">
    <rect x="6" y="0" width="5.5" height="10" rx="2.6" fill="#ffffff" transform="rotate(18 8.75 5)" />
    <rect x="2" y="-6" width="6" height="14" rx="3" fill="#ffffff" />
    <rect x="-3" y="-8" width="6" height="16" rx="3" fill="#ffffff" />
    <rect x="-8" y="-2" width="6" height="12" rx="3" fill="#ffffff" transform="rotate(-18 -5 4)" />
    <rect x="-8" y="6" width="16" height="10" rx="5" fill="#dbe6ff" />
  </g>
</svg>`;

function rand(min, max) {
  return min + Math.random() * (max - min);
}

export function useClapBurst() {
  const canvasRef = useRef(null);
  const spriteRef = useRef(null);
  const particlesRef = useRef([]);
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
    };
    resize();
    window.addEventListener("resize", resize);

    const img = new Image();
    img.onload = () => {
      const sprite = document.createElement("canvas");
      sprite.width = SPRITE_SIZE;
      sprite.height = SPRITE_SIZE;
      sprite.getContext("2d").drawImage(img, 0, 0, SPRITE_SIZE, SPRITE_SIZE);
      spriteRef.current = sprite;
    };
    img.src = `data:image/svg+xml,${encodeURIComponent(CLAP_SVG)}`;

    return () => window.removeEventListener("resize", resize);
  }, []);

  const animate = useCallback((timestamp) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const sprite = spriteRef.current;

    for (const p of particlesRef.current) {
      const age = timestamp - p.start;
      if (age < 0) continue;
      const t = age / p.life;
      if (t >= 1) {
        p.dead = true;
        continue;
      }
      p.x += p.vx;
      p.y += p.vy;

      let opacity;
      if (t < 0.12) opacity = t / 0.12;
      else if (t > 0.65) opacity = 1 - (t - 0.65) / 0.35;
      else opacity = 1;

      if (sprite) {
        ctx.save();
        ctx.globalAlpha = Math.max(0, opacity);
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.drawImage(sprite, -p.size / 2, -p.size / 2, p.size, p.size);
        ctx.restore();
      }
    }

    particlesRef.current = particlesRef.current.filter((p) => !p.dead);

    if (particlesRef.current.length > 0) {
      rafRef.current = requestAnimationFrame(animate);
    } else {
      rafRef.current = null;
    }
  }, []);

  const trigger = useCallback(() => {
    const now = performance.now();
    const width = window.innerWidth;
    const height = window.innerHeight;
    const newParticles = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: rand(0, width),
      y: rand(0, height),
      vx: rand(-0.15, 0.15),
      vy: rand(-0.6, -0.15),
      rotation: rand(-0.5, 0.5),
      size: rand(26, 58),
      life: rand(1000, 1600),
      start: now + rand(0, STAGGER_MS),
      dead: false,
    }));
    particlesRef.current = particlesRef.current.concat(newParticles);
    if (!rafRef.current) {
      rafRef.current = requestAnimationFrame(animate);
    }
  }, [animate]);

  return [canvasRef, trigger];
}
