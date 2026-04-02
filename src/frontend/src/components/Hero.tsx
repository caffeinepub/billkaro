import { Text } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { ArrowRight, Download, MessageCircle } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import type { Lang } from "../translations";
import { t } from "../translations";

interface HeroProps {
  lang: Lang;
  onOpenChat: () => void;
}

// ─── Three.js scene components ───────────────────────────────────────────────

const SPHERE_DATA = [
  {
    pos: [-4, 2, -6] as [number, number, number],
    scale: 1.8,
    color: 0xff6b35,
    speed: 0.003,
  },
  {
    pos: [4, -1, -8] as [number, number, number],
    scale: 2.2,
    color: 0xe2367a,
    speed: 0.002,
  },
  {
    pos: [0, 3, -10] as [number, number, number],
    scale: 2.8,
    color: 0x8b5cf6,
    speed: 0.0015,
  },
  {
    pos: [-6, -2, -7] as [number, number, number],
    scale: 1.5,
    color: 0x6d28d9,
    speed: 0.0025,
  },
  {
    pos: [6, 3, -9] as [number, number, number],
    scale: 2.0,
    color: 0xff6b35,
    speed: 0.0018,
  },
  {
    pos: [-2, -3, -5] as [number, number, number],
    scale: 1.3,
    color: 0xe2367a,
    speed: 0.0035,
  },
  {
    pos: [3, -4, -11] as [number, number, number],
    scale: 2.5,
    color: 0x8b5cf6,
    speed: 0.0012,
  },
  {
    pos: [-5, 4, -12] as [number, number, number],
    scale: 3.0,
    color: 0xff6b35,
    speed: 0.001,
  },
  {
    pos: [7, -2, -6] as [number, number, number],
    scale: 1.6,
    color: 0x6d28d9,
    speed: 0.0028,
  },
  {
    pos: [1, 5, -8] as [number, number, number],
    scale: 1.9,
    color: 0xe2367a,
    speed: 0.0022,
  },
];

function GlowingSphere({
  position,
  scale,
  color,
  speed,
}: {
  position: [number, number, number];
  scale: number;
  color: number;
  speed: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const offset = useMemo(() => Math.random() * Math.PI * 2, []);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const elapsed = clock.getElapsedTime();
    meshRef.current.rotation.x = elapsed * speed * 20;
    meshRef.current.rotation.y = elapsed * speed * 30;
    meshRef.current.position.y =
      position[1] + Math.sin(elapsed * speed * 100 + offset) * 0.4;
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.4}
        transparent
        opacity={0.18}
        roughness={0.2}
        metalness={0.5}
      />
    </mesh>
  );
}

function StarField() {
  const pointsRef = useRef<THREE.Points>(null);

  const { positions, colors } = useMemo(() => {
    const count = 300;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const palette = [
      [1.0, 0.42, 0.21],
      [0.89, 0.21, 0.48],
      [0.54, 0.36, 0.96],
      [1.0, 1.0, 1.0],
      [1.0, 0.65, 0.0],
      [0.78, 0.39, 1.0],
    ];
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20 - 5;
      const c = palette[Math.floor(Math.random() * palette.length)];
      col[i * 3] = c[0];
      col[i * 3 + 1] = c[1];
      col[i * 3 + 2] = c[2];
    }
    return { positions: pos, colors: col };
  }, []);

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y = clock.getElapsedTime() * 0.015;
    pointsRef.current.rotation.x = clock.getElapsedTime() * 0.007;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        vertexColors
        transparent
        opacity={0.9}
        sizeAttenuation
      />
    </points>
  );
}

// ─── Spinning BillKaro Logo ───────────────────────────────────────────────────

function SpinningLogo() {
  const groupRef = useRef<THREE.Group>(null);
  const matRef = useRef<THREE.MeshStandardMaterial>(null);
  const colorA = useMemo(() => new THREE.Color("#ff6b35"), []);
  const colorB = useMemo(() => new THREE.Color("#8b5cf6"), []);
  const tmpColor = useMemo(() => new THREE.Color(), []);

  useFrame(({ clock }) => {
    const elapsed = clock.getElapsedTime();
    if (groupRef.current) {
      // Full Y-axis spin every ~8 seconds
      groupRef.current.rotation.y = elapsed * ((Math.PI * 2) / 8);
      // Gentle bob
      groupRef.current.position.y = Math.sin(elapsed * 0.4) * 0.15;
    }
    if (matRef.current) {
      const t = (Math.sin(elapsed * 0.8) + 1) / 2;
      tmpColor.lerpColors(colorA, colorB, t);
      matRef.current.color.set(tmpColor);
      matRef.current.emissive.set(tmpColor);
      matRef.current.emissiveIntensity = 0.6 + Math.sin(elapsed * 1.2) * 0.2;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, -4]}>
      <Text
        fontSize={1.4}
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.05}
      >
        BillKaro
        <meshStandardMaterial
          ref={matRef}
          color="#ff6b35"
          emissive="#ff6b35"
          emissiveIntensity={0.6}
          roughness={0.15}
          metalness={0.7}
          transparent
          opacity={0.85}
        />
      </Text>
    </group>
  );
}

// ─── Floating Invoice Cards ───────────────────────────────────────────────────

const INVOICE_POSITIONS: [number, number, number][] = [
  [-5, 1, -4],
  [5, -1, -5],
  [-3, -2, -3],
  [4, 2, -6],
  [0, 3, -5],
  [-4, 3, -7],
];

function InvoiceCard({
  position,
  index,
}: {
  position: [number, number, number];
  index: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const offset = useMemo(
    () => (index / INVOICE_POSITIONS.length) * Math.PI * 2,
    [index],
  );

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const elapsed = clock.getElapsedTime();
    // Float up/down
    meshRef.current.position.y =
      position[1] + Math.sin(elapsed * 0.6 + offset) * 0.3;
    // Slow tumble
    meshRef.current.rotation.y = elapsed * 0.25 + offset;
    meshRef.current.rotation.z = Math.sin(elapsed * 0.3 + offset) * 0.15;
  });

  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry args={[1.2, 1.6, 0.05]} />
      <meshStandardMaterial
        color="#ffffff"
        emissive="#ffffff"
        emissiveIntensity={0.08}
        transparent
        opacity={0.13}
        roughness={0.4}
        metalness={0.3}
      />
    </mesh>
  );
}

function InvoiceCards() {
  return (
    <>
      {INVOICE_POSITIONS.map((pos, i) => (
        <InvoiceCard
          key={`invoice-${pos[0]}-${pos[1]}-${pos[2]}`}
          position={pos}
          index={i}
        />
      ))}
    </>
  );
}

function ThreeScene() {
  return (
    <>
      <ambientLight intensity={0.3} color={0x8b5cf6} />
      <pointLight position={[5, 5, 2]} intensity={1.5} color={0xff6b35} />
      <pointLight position={[-5, -3, 2]} intensity={1.2} color={0x8b5cf6} />
      <pointLight position={[0, 8, -4]} intensity={0.8} color={0xe2367a} />
      <StarField />
      <SpinningLogo />
      <InvoiceCards />
      {SPHERE_DATA.map((s) => (
        <GlowingSphere
          key={`sphere-${s.color}-${s.pos[0]}`}
          position={s.pos}
          scale={s.scale}
          color={s.color}
          speed={s.speed}
        />
      ))}
    </>
  );
}

// ─── Enhanced 2D Canvas particles ────────────────────────────────────────────

interface Particle2D {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  baseSize: number;
  color: string;
  alpha: number;
  seed: number;
  isStar: boolean;
}

const PARTICLE_COLORS = [
  "255,107,53",
  "226,54,122",
  "139,92,246",
  "255,255,255",
  "255,165,0",
  "200,100,255",
];

function EnhancedParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const particlesRef = useRef<Particle2D[]>([]);
  const mouseRef = useRef<{ x: number; y: number } | null>(null);

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

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onMouseLeave = () => {
      mouseRef.current = null;
    };
    const parent = canvas.parentElement;
    parent?.addEventListener("mousemove", onMouseMove);
    parent?.addEventListener("mouseleave", onMouseLeave);

    const count = 150;
    particlesRef.current = Array.from({ length: count }, (_, i) => {
      const isStar = i < count * 0.2;
      const base = isStar ? 5 + Math.random() * 3 : 1 + Math.random() * 4;
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: base,
        baseSize: base,
        color:
          PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)],
        alpha: 0.4 + Math.random() * 0.5,
        seed: Math.random() * Math.PI * 2,
        isStar,
      };
    });

    const LINK_DISTANCE = 150;
    const REPULSE_RADIUS = 120;

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      const particles = particlesRef.current;
      const mouse = mouseRef.current;
      const now = Date.now();

      for (const p of particles) {
        if (p.isStar) {
          p.size = p.baseSize + Math.sin(now / 1000 + p.seed) * 1.5;
        }
        if (mouse) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < REPULSE_RADIUS && dist > 0) {
            const force = (1 - dist / REPULSE_RADIUS) * 1.5;
            p.vx += (dx / dist) * force * 0.15;
            p.vy += (dy / dist) * force * 0.15;
          }
        }
        p.vx *= 0.98;
        p.vy *= 0.98;
        const spd = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (spd < 0.1) {
          p.vx += (Math.random() - 0.5) * 0.05;
          p.vy += (Math.random() - 0.5) * 0.05;
        }
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
            const opacity = (1 - dist / LINK_DISTANCE) * 0.2;
            const grad = ctx.createLinearGradient(
              particles[i].x,
              particles[i].y,
              particles[j].x,
              particles[j].y,
            );
            grad.addColorStop(0, `rgba(${particles[i].color},${opacity})`);
            grad.addColorStop(1, `rgba(${particles[j].color},${opacity})`);
            ctx.beginPath();
            ctx.strokeStyle = grad;
            ctx.lineWidth = 1;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      for (const p of particles) {
        const glowR = p.size * 3;
        const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, glowR);
        grd.addColorStop(0, `rgba(${p.color},${p.alpha * 0.8})`);
        grd.addColorStop(0.4, `rgba(${p.color},${p.alpha * 0.3})`);
        grd.addColorStop(1, `rgba(${p.color},0)`);
        ctx.beginPath();
        ctx.arc(p.x, p.y, glowR, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();

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
      parent?.removeEventListener("mousemove", onMouseMove);
      parent?.removeEventListener("mouseleave", onMouseLeave);
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
        zIndex: 1,
        pointerEvents: "none",
      }}
    />
  );
}

// ─── Hero component ───────────────────────────────────────────────────────────

export default function Hero({ lang, onOpenChat }: HeroProps) {
  const tr = t[lang];

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center gradient-hero wave-bottom pt-16 overflow-hidden"
    >
      {/* Layer 0: Three.js 3D scene */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
        }}
      >
        <Canvas
          frameloop="always"
          camera={{ position: [0, 0, 5], fov: 70 }}
          gl={{ alpha: true, antialias: true }}
          style={{ width: "100%", height: "100%" }}
        >
          <ThreeScene />
        </Canvas>
      </div>

      {/* Layer 1: Enhanced 2D particle canvas */}
      <EnhancedParticles />

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
        style={{ zIndex: 2 }}
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
