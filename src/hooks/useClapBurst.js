import { useCallback, useEffect, useRef } from "react";

const EMOJI = "👏";
const SPRITE_SIZE = 64;
const PARTICLE_COUNT = 2000;
const GRAVITY = 0.1;

function rand(min, max) {
  return min + Math.random() * (max - min);
}

function createEmojiSprite() {
  const sprite = document.createElement("canvas");
  sprite.width = SPRITE_SIZE;
  sprite.height = SPRITE_SIZE;
  const ctx = sprite.getContext("2d");
  ctx.font = `${SPRITE_SIZE * 0.85}px sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(EMOJI, SPRITE_SIZE / 2, SPRITE_SIZE / 2);
  return sprite;
}

export function useClapBurst() {
  const canvasRef = useRef(null);
  const spriteRef = useRef(null);
  const particlesRef = useRef([]);
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    spriteRef.current = createEmojiSprite();
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  const animate = useCallback((timestamp) => {
    const canvas = canvasRef.current;
    const sprite = spriteRef.current;
    if (!canvas || !sprite) return;
    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (const p of particlesRef.current) {
      const age = timestamp - p.start;
      const t = age / p.life;
      if (t >= 1) {
        p.dead = true;
        continue;
      }
      p.vy += GRAVITY;
      p.x += p.vx;
      p.y += p.vy;
      p.rotation += p.rotationSpeed;
      const opacity = t < 0.7 ? 1 : 1 - (t - 0.7) / 0.3;

      ctx.save();
      ctx.globalAlpha = Math.max(0, opacity);
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.drawImage(sprite, -p.size / 2, -p.size / 2, p.size, p.size);
      ctx.restore();
    }

    particlesRef.current = particlesRef.current.filter((p) => !p.dead);

    if (particlesRef.current.length > 0) {
      rafRef.current = requestAnimationFrame(animate);
    } else {
      rafRef.current = null;
    }
  }, []);

  const trigger = useCallback(
    (originX, originY) => {
      const now = performance.now();
      const newParticles = Array.from({ length: PARTICLE_COUNT }, () => {
        const angle = rand(0, Math.PI * 2);
        const speed = rand(2, 16);
        return {
          x: originX,
          y: originY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - rand(3, 8),
          rotation: rand(0, Math.PI * 2),
          rotationSpeed: rand(-0.15, 0.15),
          size: rand(12, 30),
          life: rand(1300, 2100),
          start: now,
          dead: false,
        };
      });
      particlesRef.current = particlesRef.current.concat(newParticles);
      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(animate);
      }
    },
    [animate]
  );

  return [canvasRef, trigger];
}
