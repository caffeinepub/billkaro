import { useCallback, useEffect, useRef, useState } from "react";
import type { Lang } from "../translations";

interface FlipbookDemoProps {
  lang: Lang;
}

const PAGES = [
  {
    id: "welcome",
    title: { en: "Welcome to BillKaro", hi: "BillKaro में आपका स्वागत है" },
    desc: {
      en: "Your smart grocery billing app. GST invoices, product catalog, and more — all in one place.",
      hi: "आपका स्मार्ट ग्रोसरी बिलिंग ऐप। GST इनवॉइस, प्रोडक्ट कैटलॉग और बहुत कुछ।",
    },
    img: "/assets/uploads/img_3908-019d2b17-6afe-70bd-b79e-47484eb5792a-1.png",
    mood: "happy",
    accent: "#FF6B35",
  },
  {
    id: "setup",
    title: { en: "Setup Your Store", hi: "अपनी दुकान सेटअप करें" },
    desc: {
      en: "Enter your store name, GST number, and address. Ready to bill in minutes!",
      hi: "अपनी दुकान का नाम, GST नंबर और पता दर्ज करें। मिनटों में बिलिंग शुरू!",
    },
    img: "/assets/uploads/img_3912-019d2b17-6b1c-70dc-b9d3-5577f353b7c4-2.png",
    mood: "explain",
    accent: "#8B5CF6",
  },
  {
    id: "products",
    title: { en: "Add Your Products", hi: "प्रोडक्ट जोड़ें" },
    desc: {
      en: "Build your product catalog with names, prices, GST rates, and units.",
      hi: "नाम, मूल्य, GST दर और यूनिट के साथ प्रोडक्ट कैटलॉग बनाएं।",
    },
    img: "/assets/uploads/img_3909-019d2b17-6b75-7649-89ef-d7e73fa2724c-3.png",
    mood: "point",
    accent: "#10B981",
  },
  {
    id: "create-bill",
    title: { en: "Create a Bill", hi: "बिल बनाएं" },
    desc: {
      en: "Add items, apply discounts, and generate professional bills in seconds.",
      hi: "आइटम जोड़ें, छूट लगाएं, और पेशेवर बिल सेकंडों में बनाएं।",
    },
    img: "/assets/uploads/img_3911-019d2b17-6dbc-7199-a10d-11f9b277a35f-4.png",
    mood: "happy",
    accent: "#F59E0B",
  },
  {
    id: "gst-invoice",
    title: { en: "GST Invoice Ready", hi: "GST इनवॉइस तैयार" },
    desc: {
      en: "Auto-calculated GST. Share invoices via WhatsApp, print, or save as PDF.",
      hi: "ऑटो GST कैलकुलेशन। WhatsApp, प्रिंट, या PDF के रूप में शेयर करें।",
    },
    img: "/assets/uploads/img_3910-019d2b17-712a-7432-b60c-3ca47b4c3121-5.png",
    mood: "celebrate",
    accent: "#EC4899",
  },
  {
    id: "payments",
    title: { en: "Accept Any Payment", hi: "कोई भी भुगतान स्वीकार करें" },
    desc: {
      en: "Cash, Card, or UPI — track every transaction with ease.",
      hi: "कैश, कार्ड, या UPI — हर लेन-देन आसानी से ट्रैक करें।",
    },
    img: "/assets/uploads/img_3907-019d2b17-726d-7726-899e-3fa7405222b4-6.png",
    mood: "explain",
    accent: "#06B6D4",
  },
  {
    id: "dashboard",
    title: { en: "Business Dashboard", hi: "बिज़नेस डैशबोर्ड" },
    desc: {
      en: "View sales reports, export CSV, and monitor your business performance.",
      hi: "सेल्स रिपोर्ट देखें, CSV एक्सपोर्ट करें, और बिज़नेस परफॉर्मेंस मॉनिटर करें।",
    },
    img: "/assets/uploads/img_3906-019d2b17-73c1-7082-ac32-bf9b6dd3ef5d-7.png",
    mood: "celebrate",
    accent: "#8B5CF6",
  },
];

const PARTICLES = [
  { id: "p-a", offset: 0 },
  { id: "p-b", offset: 1 },
  { id: "p-c", offset: 2 },
  { id: "p-d", offset: 3 },
  { id: "p-e", offset: 4 },
  { id: "p-f", offset: 5 },
  { id: "p-g", offset: 6 },
  { id: "p-h", offset: 7 },
  { id: "p-i", offset: 8 },
  { id: "p-j", offset: 9 },
  { id: "p-k", offset: 10 },
  { id: "p-l", offset: 11 },
];

// Shyama SVG illustrated character
function ShyamaCharacter({
  mood,
  accent,
  talking,
}: {
  mood: string;
  accent: string;
  talking?: boolean;
}) {
  const mouthOpen = talking;
  const happy = mood === "happy" || mood === "celebrate";
  const celebrating = mood === "celebrate";

  return (
    <svg
      viewBox="0 0 120 180"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      role="img"
      aria-label="Shyama illustrated character"
      style={{ filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.15))" }}
    >
      {/* Saree / dress body */}
      <ellipse cx="60" cy="148" rx="32" ry="28" fill={accent} opacity="0.9" />
      <ellipse cx="60" cy="148" rx="28" ry="24" fill={accent} />
      {/* Saree drape */}
      <path
        d="M32 138 Q48 125 60 130 Q72 125 88 138 Q80 155 60 158 Q40 155 32 138z"
        fill={accent}
        opacity="0.7"
      />
      {/* Saree border */}
      <path
        d="M32 138 Q48 125 60 130 Q72 125 88 138"
        fill="none"
        stroke="#FFD700"
        strokeWidth="2"
        opacity="0.8"
      />
      {/* Neck */}
      <rect x="53" y="95" width="14" height="16" rx="6" fill="#F4A261" />
      {/* Head */}
      <ellipse cx="60" cy="82" rx="28" ry="30" fill="#F4A261" />
      {/* Hair top */}
      <ellipse cx="60" cy="56" rx="28" ry="14" fill="#1a0a00" />
      {/* Bun */}
      <circle cx="60" cy="46" r="11" fill="#1a0a00" />
      {/* Hair sides */}
      <path
        d="M32 72 Q28 90 33 102"
        stroke="#1a0a00"
        strokeWidth="8"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M88 72 Q92 90 87 102"
        stroke="#1a0a00"
        strokeWidth="8"
        fill="none"
        strokeLinecap="round"
      />
      {/* Bindi */}
      <circle cx="60" cy="68" r="3" fill="#DC2626" />
      {/* Eyebrows */}
      <path
        d={happy ? "M46 76 Q50 73 54 76" : "M46 74 Q50 76 54 74"}
        stroke="#1a0a00"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d={happy ? "M66 76 Q70 73 74 76" : "M66 74 Q70 76 74 74"}
        stroke="#1a0a00"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
      {/* Eyes */}
      <ellipse cx="50" cy="82" rx="6" ry="6" fill="white" />
      <ellipse cx="70" cy="82" rx="6" ry="6" fill="white" />
      <circle cx="51" cy="83" r="3.5" fill="#1a0a00" />
      <circle cx="71" cy="83" r="3.5" fill="#1a0a00" />
      <circle cx="52" cy="81" r="1" fill="white" />
      <circle cx="72" cy="81" r="1" fill="white" />
      {/* Cheeks */}
      <ellipse cx="41" cy="90" rx="7" ry="5" fill="#EC4899" opacity="0.35" />
      <ellipse cx="79" cy="90" rx="7" ry="5" fill="#EC4899" opacity="0.35" />
      {/* Nose */}
      <ellipse cx="60" cy="91" rx="3" ry="2" fill="#E07B4A" />
      {/* Mouth */}
      {mouthOpen ? (
        <>
          <path
            d="M51 99 Q60 108 69 99"
            fill="#DC2626"
            stroke="#DC2626"
            strokeWidth="1"
          />
          <ellipse cx="60" cy="102" rx="6" ry="4" fill="#7f1d1d" />
          <path d="M53 100 Q60 96 67 100" fill="white" />
        </>
      ) : (
        <path
          d={happy ? "M51 99 Q60 108 69 99" : "M51 100 Q60 102 69 100"}
          fill="none"
          stroke="#DC2626"
          strokeWidth="2"
          strokeLinecap="round"
        />
      )}
      {/* Earrings */}
      <circle cx="32" cy="84" r="4" fill="#FFD700" />
      <circle cx="88" cy="84" r="4" fill="#FFD700" />
      {/* Arms */}
      <path
        d={
          mood === "point" ? "M32 120 Q15 110 10 95" : "M32 120 Q22 130 25 145"
        }
        stroke={accent}
        strokeWidth="10"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M88 120 Q98 130 95 145"
        stroke={accent}
        strokeWidth="10"
        fill="none"
        strokeLinecap="round"
      />
      {/* Hand pointer for 'point' mood */}
      {mood === "point" && (
        <>
          <circle cx="10" cy="94" r="6" fill="#F4A261" />
          <line
            x1="5"
            y1="89"
            x2="10"
            y2="84"
            stroke="#F4A261"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </>
      )}
      {/* Celebrate stars */}
      {celebrating && (
        <>
          <text x="8" y="75" fontSize="14" opacity="0.9">
            ⭐
          </text>
          <text x="96" y="70" fontSize="12" opacity="0.9">
            ✨
          </text>
          <text x="15" y="55" fontSize="10" opacity="0.7">
            🌟
          </text>
        </>
      )}
    </svg>
  );
}

export default function FlipbookDemo({ lang }: FlipbookDemoProps) {
  const [pageIndex, setPageIndex] = useState(0);
  const [flipping, setFlipping] = useState(false);
  const [flipDir, setFlipDir] = useState<"next" | "prev">("next");
  const [animPhase, setAnimPhase] = useState<"idle" | "folding" | "done">(
    "idle",
  );
  const [nextIndex, setNextIndex] = useState(0);
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [autoPlay, setAutoPlay] = useState(false);

  const flip = useCallback(
    (targetIdx: number, dir: "next" | "prev") => {
      if (flipping) return;
      setFlipDir(dir);
      setNextIndex(targetIdx);
      setFlipping(true);
      setAnimPhase("folding");
      setTimeout(() => {
        setPageIndex(targetIdx);
        setAnimPhase("done");
        setTimeout(() => {
          setFlipping(false);
          setAnimPhase("idle");
        }, 300);
      }, 500);
    },
    [flipping],
  );

  const goNext = useCallback(() => {
    flip((pageIndex + 1) % PAGES.length, "next");
  }, [pageIndex, flip]);

  const goPrev = useCallback(() => {
    flip((pageIndex - 1 + PAGES.length) % PAGES.length, "prev");
  }, [pageIndex, flip]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [goNext, goPrev]);

  useEffect(() => {
    if (autoPlay) {
      autoRef.current = setInterval(goNext, 4000);
    } else if (autoRef.current) {
      clearInterval(autoRef.current);
    }
    return () => {
      if (autoRef.current) clearInterval(autoRef.current);
    };
  }, [autoPlay, goNext]);

  const cur = PAGES[pageIndex];
  const nxt = PAGES[nextIndex];
  const showPage = flipping ? nxt : cur;

  // 3D page turn: the flipping page rotates around Y axis
  const flipAngle =
    animPhase === "folding" ? (flipDir === "next" ? -180 : 180) : 0;

  return (
    <section
      id="product-demo"
      className="py-20 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)",
      }}
    >
      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {PARTICLES.map((pt) => (
          <div
            key={pt.id}
            className="absolute rounded-full"
            style={{
              width: `${8 + (pt.offset % 4) * 6}px`,
              height: `${8 + (pt.offset % 4) * 6}px`,
              left: `${(pt.offset * 13 + 5) % 95}%`,
              top: `${(pt.offset * 17 + 8) % 85}%`,
              background: `${cur.accent}30`,
              animation: `float${pt.offset % 3} ${4 + (pt.offset % 3)}s ease-in-out infinite`,
              animationDelay: `${pt.offset * 0.4}s`,
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes float0 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-14px)} }
        @keyframes float1 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-20px)} }
        @keyframes float2 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes pageFlipIn { from{opacity:0;transform:rotateY(15deg)} to{opacity:1;transform:rotateY(0deg)} }
      `}</style>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <span
            className="inline-block px-5 py-1.5 rounded-full text-sm font-bold tracking-widest mb-4 uppercase"
            style={{
              background: `${cur.accent}30`,
              color: cur.accent,
              border: `1px solid ${cur.accent}50`,
            }}
          >
            {lang === "hi" ? "प्रोडक्ट डेमो" : "Product Demo"}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">
            {lang === "hi" ? "BillKaro की पूरी जानकारी" : "Explore BillKaro"}
          </h2>
          <p className="text-white/60 text-base max-w-lg mx-auto">
            {lang === "hi"
              ? "पेज पलटें और जानें कैसे BillKaro आपके बिज़नेस को आसान बनाता है"
              : "Flip through every feature and see how BillKaro transforms your business"}
          </p>
        </div>

        {/* Book */}
        <div className="flex items-center justify-center gap-4 sm:gap-8">
          {/* Prev */}
          <button
            type="button"
            onClick={goPrev}
            disabled={flipping}
            className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-white transition-all duration-200 hover:scale-110 active:scale-95 disabled:opacity-40"
            style={{
              background: `${cur.accent}40`,
              border: `2px solid ${cur.accent}60`,
            }}
            aria-label="Previous page"
          >
            <svg
              viewBox="0 0 24 24"
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              role="img"
              aria-label="Previous"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          {/* Book container */}
          <div
            className="relative"
            style={{
              perspective: "1400px",
              width: "min(640px, 92vw)",
              height: "min(420px, 64vw)",
            }}
          >
            {/* Book base shadow */}
            <div
              className="absolute inset-0 rounded-2xl"
              style={{
                boxShadow:
                  "0 40px 80px -15px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.06)",
                background: "#18162a",
              }}
            />

            {/* Book spread (two pages) */}
            <div
              className="absolute inset-0 rounded-2xl overflow-hidden flex"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* LEFT PAGE — Shyama character + text */}
              <div
                className="w-1/2 h-full relative flex flex-col items-center justify-between p-4 sm:p-6"
                style={{
                  background:
                    "linear-gradient(160deg, #ffffff 0%, #f8f4ff 100%)",
                  borderRight: "1px solid #e5e7eb",
                  animation:
                    flipping && animPhase === "done"
                      ? "pageFlipIn 0.3s ease-out"
                      : undefined,
                }}
              >
                {/* Page number */}
                <div
                  className="self-start text-xs font-bold opacity-40 tracking-widest uppercase"
                  style={{ color: cur.accent }}
                >
                  {lang === "hi"
                    ? `पेज ${pageIndex + 1}`
                    : `Page ${pageIndex + 1}`}
                </div>

                {/* Character */}
                <div
                  className="flex-1 flex items-center justify-center w-full"
                  style={{ maxHeight: "60%" }}
                >
                  <ShyamaCharacter
                    mood={showPage.mood}
                    accent={showPage.accent}
                    talking={flipping}
                  />
                </div>

                {/* Title + description */}
                <div className="text-center space-y-1">
                  <h3 className="font-extrabold text-gray-900 text-sm sm:text-base leading-tight">
                    {showPage.title[lang]}
                  </h3>
                  <p className="text-gray-500 text-xs leading-relaxed line-clamp-3">
                    {showPage.desc[lang]}
                  </p>
                </div>

                {/* Spine shadow */}
                <div className="absolute right-0 top-0 bottom-0 w-3 bg-gradient-to-l from-black/10 to-transparent pointer-events-none" />
              </div>

              {/* RIGHT PAGE — Real app screenshot */}
              <div
                className="w-1/2 h-full relative overflow-hidden"
                style={{
                  background: "#f9fafb",
                  transformStyle: "preserve-3d",
                }}
              >
                {/* Current page (visible) */}
                <div
                  className="absolute inset-0"
                  style={{
                    backfaceVisibility: "hidden",
                    transform:
                      animPhase === "folding"
                        ? `rotateY(${flipAngle}deg)`
                        : "rotateY(0deg)",
                    transition:
                      animPhase === "folding"
                        ? "transform 0.5s cubic-bezier(0.645, 0.045, 0.355, 1.000)"
                        : "none",
                    transformOrigin:
                      flipDir === "next" ? "left center" : "right center",
                    transformStyle: "preserve-3d",
                  }}
                >
                  <img
                    src={cur.img}
                    alt={cur.title.en}
                    className="w-full h-full object-cover"
                  />
                  {/* Page fold effect */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        animPhase === "folding"
                          ? "linear-gradient(to right, rgba(0,0,0,0.15) 0%, transparent 30%)"
                          : "none",
                    }}
                  />
                  {/* Back face of flipping page (next page preview) */}
                  <div
                    className="absolute inset-0"
                    style={{
                      backfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                      background: "#f0f0f0",
                    }}
                  >
                    <img
                      src={nxt.img}
                      alt={nxt.title.en}
                      className="w-full h-full object-cover opacity-80"
                    />
                  </div>
                </div>

                {/* Spine inner shadow */}
                <div className="absolute left-0 top-0 bottom-0 w-3 bg-gradient-to-r from-black/10 to-transparent pointer-events-none z-10" />

                {/* Feature badge */}
                <div
                  className="absolute top-3 right-3 px-2 py-1 rounded-lg text-white text-xs font-bold z-20"
                  style={{
                    background: `${showPage.accent}cc`,
                    backdropFilter: "blur(4px)",
                  }}
                >
                  {showPage.title[lang]}
                </div>

                {/* Page corner fold */}
                <div
                  className="absolute bottom-0 right-0 w-8 h-8 z-20 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(135deg, transparent 50%, rgba(0,0,0,0.18) 50%)",
                  }}
                />
              </div>
            </div>

            {/* Book spine center line */}
            <div
              className="absolute top-0 bottom-0 left-1/2 -translate-x-px w-px z-30 pointer-events-none"
              style={{
                background:
                  "linear-gradient(to bottom, #c4b5fd40, #a78bfa80, #c4b5fd40)",
              }}
            />
          </div>

          {/* Next */}
          <button
            type="button"
            onClick={goNext}
            disabled={flipping}
            className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-white transition-all duration-200 hover:scale-110 active:scale-95 disabled:opacity-40"
            style={{
              background: `${cur.accent}40`,
              border: `2px solid ${cur.accent}60`,
            }}
            aria-label="Next page"
          >
            <svg
              viewBox="0 0 24 24"
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              role="img"
              aria-label="Next"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>

        {/* Controls */}
        <div className="flex flex-col items-center gap-4 mt-8">
          {/* Dots */}
          <div className="flex items-center gap-2">
            {PAGES.map((p, i) => (
              <button
                key={p.id}
                type="button"
                disabled={flipping}
                onClick={() => flip(i, i > pageIndex ? "next" : "prev")}
                className="transition-all duration-300 rounded-full"
                style={{
                  width: i === pageIndex ? 32 : 10,
                  height: 10,
                  background:
                    i === pageIndex ? cur.accent : "rgba(255,255,255,0.25)",
                  border: "none",
                  cursor: flipping ? "not-allowed" : "pointer",
                }}
                aria-label={`Go to page ${i + 1}`}
              />
            ))}
          </div>

          {/* Page counter + autoplay */}
          <div className="flex items-center gap-4">
            <span className="text-white/50 text-sm font-mono">
              {pageIndex + 1} / {PAGES.length}
            </span>
            <button
              type="button"
              onClick={() => setAutoPlay((v) => !v)}
              className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-white transition-all duration-200 hover:scale-105"
              style={{
                background: autoPlay
                  ? `${cur.accent}60`
                  : "rgba(255,255,255,0.12)",
                border: `1px solid ${autoPlay ? cur.accent : "rgba(255,255,255,0.2)"}`,
              }}
            >
              {autoPlay ? (
                <svg
                  viewBox="0 0 24 24"
                  className="w-4 h-4"
                  fill="currentColor"
                  role="img"
                  aria-label="Pause"
                >
                  <rect x="6" y="4" width="4" height="16" />
                  <rect x="14" y="4" width="4" height="16" />
                </svg>
              ) : (
                <svg
                  viewBox="0 0 24 24"
                  className="w-4 h-4"
                  fill="currentColor"
                  role="img"
                  aria-label="Play"
                >
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
              )}
              {autoPlay
                ? lang === "hi"
                  ? "रोकें"
                  : "Pause"
                : lang === "hi"
                  ? "ऑटो-प्ले"
                  : "Auto-Play"}
            </button>
          </div>

          {/* Hint */}
          <p className="text-white/30 text-xs">
            {lang === "hi"
              ? "← → तीर कीज़ से भी पेज पलटें"
              : "Use ← → arrow keys to flip pages"}
          </p>
        </div>
      </div>
    </section>
  );
}
