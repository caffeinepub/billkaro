import { ArrowRight, Download, MessageCircle } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useRef } from "react";
import type { Lang } from "../translations";
import { t } from "../translations";

interface HeroProps {
  lang: Lang;
  onOpenChat: () => void;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
}

const PARTICLE_COLORS = [
  "255,107,53",
  "226,54,122",
  "139,92,246",
  "255,255,255",
];

function HeroParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const count = 80;
    particlesRef.current = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      size: 1.5 + Math.random() * 2.5,
      color:
        PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)],
      alpha: 0.4 + Math.random() * 0.6,
    }));

    const LINK_DISTANCE = 120;

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      const particles = particlesRef.current;

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < LINK_DISTANCE) {
            const opacity = (1 - dist / LINK_DISTANCE) * 0.15;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(${particles[i].color},${opacity})`;
            ctx.lineWidth = 1;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color},${p.alpha})`;
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}

export default function Hero({ lang, onOpenChat }: HeroProps) {
  const tr = t[lang];

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center gradient-hero wave-bottom pt-16 overflow-hidden"
    >
      <HeroParticles />

      <div
        className="absolute top-20 left-10 w-72 h-72 bg-white/5 rounded-full blur-3xl"
        style={{ zIndex: 0 }}
      />
      <div
        className="absolute bottom-20 right-10 w-96 h-96 bg-white/5 rounded-full blur-3xl"
        style={{ zIndex: 0 }}
      />

      <div
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full"
        style={{ zIndex: 1 }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="text-white"
          >
            <span className="inline-block bg-white/20 text-white text-xs font-bold px-4 py-1.5 rounded-pill mb-4 backdrop-blur-sm border border-white/20">
              <Download className="w-3 h-3 inline mr-1" />
              {tr.hero_badge}
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-4">
              {tr.hero_headline}
            </h1>

            <p className="text-lg sm:text-xl text-white/90 mb-2 font-medium">
              {tr.hero_sub}
            </p>
            <p className="text-base text-white/75 mb-8">{tr.hero_sub2}</p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://gst-invoice---grocery-io0.caffeine.xyz/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-white text-[#E2367A] font-bold px-8 py-4 rounded-pill text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-200"
                data-ocid="hero.primary_button"
              >
                {tr.hero_cta}
                <ArrowRight className="w-5 h-5" />
              </a>
              <button
                type="button"
                onClick={onOpenChat}
                className="inline-flex items-center justify-center gap-2 bg-white/15 backdrop-blur-sm border border-white/30 text-white font-semibold px-8 py-4 rounded-pill text-lg hover:bg-white/25 transition-all duration-200"
                data-ocid="hero.secondary_button"
              >
                <MessageCircle className="w-5 h-5" />
                {tr.hero_cta2}
              </button>
            </div>

            <div className="flex flex-wrap gap-6 mt-10">
              {[
                ["Free", "Download"],
                ["₹1", "Per Invoice"],
                ["GST", "Compliant"],
              ].map(([val, lbl]) => (
                <div key={val} className="text-center">
                  <div className="text-2xl font-extrabold text-white">
                    {val}
                  </div>
                  <div className="text-xs text-white/70 font-medium">{lbl}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="animate-float relative">
              <div className="phone-frame w-64 sm:w-72 lg:w-80">
                <img
                  src="/assets/uploads/img_3906-019d2b17-73c1-7082-ac32-bf9b6dd3ef5d-7.png"
                  alt="BillKaro Home Dashboard"
                  className="w-full block"
                />
              </div>
              <div className="absolute -right-4 top-8 bg-white rounded-2xl shadow-xl px-4 py-2 hidden lg:block">
                <div className="text-xs text-gray-500 font-medium">
                  Today's Sales
                </div>
                <div className="text-xl font-bold gradient-text">₹12,540</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
