import { Text } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { ArrowRight, Download, MessageCircle } from "lucide-react";
import { motion } from "motion/react";
import { useMemo, useRef } from "react";
import type * as THREE from "three";
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

// ─── Thermal Receipt Invoice Cards ───────────────────────────────────────────

const INVOICE_DATA = [
  {
    store: "BillKaro Store",
    lines: [
      { item: "Atta 5kg", price: "250" },
      { item: "Daal 1kg", price: "120" },
      { item: "Sugar 2kg", price: "90" },
      { item: "Oil 1L", price: "145" },
    ],
    subtotal: "605",
    gst: "30",
    total: "635",
    inv: "INV-0021",
  },
  {
    store: "Sharma Kirana",
    lines: [
      { item: "Rice 10kg", price: "480" },
      { item: "Salt 1kg", price: "20" },
      { item: "Biscuits x4", price: "60" },
      { item: "Soap x2", price: "80" },
    ],
    subtotal: "640",
    gst: "32",
    total: "672",
    inv: "INV-0038",
  },
  {
    store: "Patel General",
    lines: [
      { item: "Milk 2L", price: "110" },
      { item: "Bread", price: "45" },
      { item: "Eggs x12", price: "90" },
      { item: "Butter 100g", price: "55" },
    ],
    subtotal: "300",
    gst: "15",
    total: "315",
    inv: "INV-0055",
  },
  {
    store: "Raj Grocery",
    lines: [
      { item: "Maggi x6", price: "102" },
      { item: "Tea 250g", price: "85" },
      { item: "Coffee 100g", price: "120" },
      { item: "Chips x3", price: "60" },
    ],
    subtotal: "367",
    gst: "18",
    total: "385",
    inv: "INV-0072",
  },
  {
    store: "Verma Stores",
    lines: [
      { item: "Detergent 1kg", price: "130" },
      { item: "Shampoo 200ml", price: "95" },
      { item: "Toothpaste", price: "60" },
      { item: "Facewash", price: "110" },
    ],
    subtotal: "395",
    gst: "20",
    total: "415",
    inv: "INV-0089",
  },
  {
    store: "Gupta Bazaar",
    lines: [
      { item: "Paneer 200g", price: "90" },
      { item: "Curd 500g", price: "50" },
      { item: "Ghee 500ml", price: "290" },
      { item: "Makhana 100g", price: "75" },
    ],
    subtotal: "505",
    gst: "25",
    total: "530",
    inv: "INV-0104",
  },
];

const INVOICE_POSITIONS: [number, number, number][] = [
  [-5, 1, -4],
  [5, -1, -5],
  [-3, -2, -3],
  [4, 2, -6],
  [0.5, 3.5, -5],
  [-4.5, 3, -7],
];

function InvoiceCard({
  position,
  index,
}: {
  position: [number, number, number];
  index: number;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const offset = useMemo(
    () => (index / INVOICE_POSITIONS.length) * Math.PI * 2,
    [index],
  );

  const data = INVOICE_DATA[index % INVOICE_DATA.length];

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const elapsed = clock.getElapsedTime();
    groupRef.current.position.y =
      position[1] + Math.sin(elapsed * 0.5 + offset) * 0.25;
    // Gentle tilt — no full spin so text stays readable
    groupRef.current.rotation.y = Math.sin(elapsed * 0.2 + offset) * 0.18;
    groupRef.current.rotation.z = Math.sin(elapsed * 0.25 + offset) * 0.06;
  });

  const cardW = 1.4;
  const cardH = 2.2;
  const cardD = 0.04;
  const textColor = "#1a1a1a";
  const divider = "──────────";
  const z = cardD / 2 + 0.001; // just in front of the card face
  const leftX = -cardW / 2 + 0.1;

  // Line positions from top of card
  const topY = cardH / 2 - 0.13;
  const lineH = 0.115; // vertical spacing between lines

  return (
    <group ref={groupRef} position={[position[0], position[1], position[2]]}>
      {/* Paper card body */}
      <mesh>
        <boxGeometry args={[cardW, cardH, cardD]} />
        <meshStandardMaterial
          color="#f5f0e8"
          roughness={0.9}
          metalness={0.0}
          transparent
          opacity={0.96}
        />
      </mesh>

      {/* Slightly darker header strip */}
      <mesh position={[0, topY - 0.03, z - 0.001]}>
        <planeGeometry args={[cardW, 0.22]} />
        <meshStandardMaterial color="#ebe4d5" />
      </mesh>

      {/* === Receipt text lines === */}

      {/* Store name — centered, bold-looking via larger size */}
      <Text
        fontSize={0.1}
        color={textColor}
        anchorX="center"
        anchorY="middle"
        position={[0, topY, z]}
        maxWidth={cardW - 0.12}
      >
        {data.store}
      </Text>

      {/* Invoice number */}
      <Text
        fontSize={0.075}
        color="#555555"
        anchorX="center"
        anchorY="middle"
        position={[0, topY - lineH * 0.9, z]}
        maxWidth={cardW - 0.12}
      >
        {data.inv}
      </Text>

      {/* Divider 1 */}
      <Text
        fontSize={0.07}
        color="#888888"
        anchorX="center"
        anchorY="middle"
        position={[0, topY - lineH * 1.85, z]}
      >
        {divider}
      </Text>

      {/* Item lines */}
      {data.lines.map((line, li) => (
        <group key={line.item}>
          <Text
            fontSize={0.078}
            color={textColor}
            anchorX="left"
            anchorY="middle"
            position={[leftX, topY - lineH * (2.85 + li), z]}
            maxWidth={0.9}
          >
            {line.item}
          </Text>
          <Text
            fontSize={0.078}
            color={textColor}
            anchorX="right"
            anchorY="middle"
            position={[cardW / 2 - 0.08, topY - lineH * (2.85 + li), z]}
          >
            {`\u20B9${line.price}`}
          </Text>
        </group>
      ))}

      {/* Divider 2 */}
      <Text
        fontSize={0.07}
        color="#888888"
        anchorX="center"
        anchorY="middle"
        position={[0, topY - lineH * 7.1, z]}
      >
        {divider}
      </Text>

      {/* Subtotal */}
      <Text
        fontSize={0.078}
        color={textColor}
        anchorX="left"
        anchorY="middle"
        position={[leftX, topY - lineH * 8.0, z]}
      >
        Subtotal:
      </Text>
      <Text
        fontSize={0.078}
        color={textColor}
        anchorX="right"
        anchorY="middle"
        position={[cardW / 2 - 0.08, topY - lineH * 8.0, z]}
      >
        {`\u20B9${data.subtotal}`}
      </Text>

      {/* GST */}
      <Text
        fontSize={0.078}
        color={textColor}
        anchorX="left"
        anchorY="middle"
        position={[leftX, topY - lineH * 9.0, z]}
      >
        GST (5%):
      </Text>
      <Text
        fontSize={0.078}
        color={textColor}
        anchorX="right"
        anchorY="middle"
        position={[cardW / 2 - 0.08, topY - lineH * 9.0, z]}
      >
        {`\u20B9${data.gst}`}
      </Text>

      {/* Divider 3 */}
      <Text
        fontSize={0.07}
        color="#888888"
        anchorX="center"
        anchorY="middle"
        position={[0, topY - lineH * 10.0, z]}
      >
        {divider}
      </Text>

      {/* Total — larger */}
      <Text
        fontSize={0.092}
        color="#111111"
        anchorX="left"
        anchorY="middle"
        position={[leftX, topY - lineH * 11.0, z]}
      >
        TOTAL:
      </Text>
      <Text
        fontSize={0.092}
        color="#111111"
        anchorX="right"
        anchorY="middle"
        position={[cardW / 2 - 0.08, topY - lineH * 11.0, z]}
      >
        {`\u20B9${data.total}`}
      </Text>

      {/* Thank you */}
      <Text
        fontSize={0.08}
        color="#555555"
        anchorX="center"
        anchorY="middle"
        position={[0, topY - lineH * 12.2, z]}
      >
        Thank You!
      </Text>

      {/* Powered by BillKaro */}
      <Text
        fontSize={0.065}
        color="#ff6b35"
        anchorX="center"
        anchorY="middle"
        position={[0, topY - lineH * 13.1, z]}
      >
        BillKaro
      </Text>
    </group>
  );
}

function InvoiceCards() {
  return (
    <>
      {INVOICE_POSITIONS.map((pos, i) => (
        <InvoiceCard
          key={`invoice-${INVOICE_DATA[i].inv}`}
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
      <ambientLight intensity={0.8} color={0xffffff} />
      <pointLight position={[5, 5, 2]} intensity={1.5} color={0xff6b35} />
      <pointLight position={[-5, -3, 2]} intensity={1.2} color={0x8b5cf6} />
      <pointLight position={[0, 8, -4]} intensity={0.8} color={0xe2367a} />
      <directionalLight position={[0, 0, 5]} intensity={0.6} color={0xffffff} />
      <StarField />
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
                ["\u20B91", "Per Invoice"],
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
