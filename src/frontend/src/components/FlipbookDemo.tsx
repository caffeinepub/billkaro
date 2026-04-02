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
      hi: "आपका स्मार्ट ग्रोसरी बिलिंग ऐप। GST इनवॉइस, प्रोडक्ट कैटलॉग और बहुत कुछ — सब एक जगह।",
    },
    accent: "#FF6B35",
    emoji: "🛒",
  },
  {
    id: "setup",
    title: { en: "Setup Your Store", hi: "अपनी दुकान सेटअप करें" },
    desc: {
      en: "Enter your store name, GST number, and address. Ready to bill in minutes!",
      hi: "अपनी दुकान का नाम, GST नंबर और पता दर्ज करें। मिनटों में बिलिंग शुरू!",
    },
    accent: "#8B5CF6",
    emoji: "🏪",
  },
  {
    id: "products",
    title: { en: "Add Your Products", hi: "प्रोडक्ट जोड़ें" },
    desc: {
      en: "Build your product catalog with names, prices, GST rates, and units. Manage hundreds of items effortlessly.",
      hi: "नाम, मूल्य, GST दर और यूनिट के साथ प्रोडक्ट कैटलॉग बनाएं। सैकड़ों आइटम आसानी से मैनेज करें।",
    },
    accent: "#10B981",
    emoji: "📦",
  },
  {
    id: "create-bill",
    title: { en: "Create a Bill", hi: "बिल बनाएं" },
    desc: {
      en: "Add items, apply discounts, and generate professional bills in seconds. Fast and accurate every time.",
      hi: "आइटम जोड़ें, छूट लगाएं, और पेशेवर बिल सेकंडों में बनाएं। हर बार तेज़ और सटीक।",
    },
    accent: "#F59E0B",
    emoji: "🧾",
  },
  {
    id: "gst-invoice",
    title: { en: "GST Invoice Ready", hi: "GST इनवॉइस तैयार" },
    desc: {
      en: "Auto-calculated GST breakdowns. Share invoices via WhatsApp, print directly, or save as PDF instantly.",
      hi: "ऑटो GST कैलकुलेशन। WhatsApp पर शेयर करें, सीधे प्रिंट करें, या PDF में सेव करें।",
    },
    accent: "#EC4899",
    emoji: "📋",
  },
  {
    id: "payments",
    title: { en: "Accept Any Payment", hi: "कोई भी भुगतान स्वीकार करें" },
    desc: {
      en: "Cash, Card, or UPI — track every transaction with ease. Multiple payment modes, one simple interface.",
      hi: "कैश, कार्ड, या UPI — हर लेन-देन आसानी से ट्रैक करें। एक सरल इंटरफेस में सभी भुगतान।",
    },
    accent: "#06B6D4",
    emoji: "💳",
  },
  {
    id: "dashboard",
    title: { en: "Business Dashboard", hi: "बिज़नेस डैशबोर्ड" },
    desc: {
      en: "View sales reports, export CSV data, and monitor your business performance — all from your phone.",
      hi: "सेल्स रिपोर्ट देखें, CSV एक्सपोर्ट करें, और बिज़नेस परफॉर्मेंस मॉनिटर करें — अपने फोन से।",
    },
    accent: "#8B5CF6",
    emoji: "📊",
  },
];

const PARTICLES = Array.from({ length: 12 }, (_, i) => ({
  id: `p-${i}`,
  offset: i,
}));

export default function FlipbookDemo({ lang }: FlipbookDemoProps) {
  const [pageIndex, setPageIndex] = useState(0);
  const [flipping, setFlipping] = useState(false);
  const [flipDir, setFlipDir] = useState<"next" | "prev">("next");
  const [animPhase, setAnimPhase] = useState<
    "idle" | "folding" | "snapping" | "done"
  >("idle");
  const [nextIndex, setNextIndex] = useState(0);
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [autoPlay, setAutoPlay] = useState(false);

  // Touch state
  const touchStartX = useRef<number | null>(null);
  const [dragX, setDragX] = useState(0);
  const isDragging = useRef(false);

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
          setDragX(0);
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

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [goNext, goPrev]);

  // Auto-play
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

  // Touch handlers
  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      if (flipping) return;
      touchStartX.current = e.touches[0].clientX;
      isDragging.current = true;
      setDragX(0);
    },
    [flipping],
  );

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging.current || touchStartX.current === null) return;
    const dx = e.touches[0].clientX - touchStartX.current;
    // Clamp drag to ±180px
    setDragX(Math.max(-180, Math.min(180, dx)));
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const threshold = 60;
    if (dragX < -threshold) {
      goNext();
    } else if (dragX > threshold) {
      goPrev();
    } else {
      // Snap back
      setAnimPhase("snapping");
      setTimeout(() => {
        setDragX(0);
        setAnimPhase("idle");
      }, 300);
    }
    touchStartX.current = null;
  }, [dragX, goNext, goPrev]);

  const cur = PAGES[pageIndex];
  const nxt = PAGES[nextIndex];
  const showPage = animPhase === "done" ? nxt : cur;

  // Compute the rotation for the page
  // During drag: map dragX to rotateY (-180 to 180deg range → max ±90deg visual)
  // During fold animation: go to ±180
  let pageRotateY = 0;
  if (animPhase === "folding") {
    pageRotateY = flipDir === "next" ? -180 : 180;
  } else if (animPhase === "snapping") {
    pageRotateY = 0;
  } else if (isDragging.current || dragX !== 0) {
    // Map 180px drag to 90deg rotation for realistic feel
    pageRotateY = (dragX / 180) * 90;
  }

  const isFolding = animPhase === "folding";
  const isSnapping = animPhase === "snapping";

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
        @keyframes pageReveal { from{opacity:0;transform:rotateY(-8deg) scale(0.97)} to{opacity:1;transform:rotateY(0deg) scale(1)} }
      `}</style>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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
              : "Swipe or flip through every feature and see how BillKaro transforms your business"}
          </p>
        </div>

        {/* Book */}
        <div className="flex items-center justify-center gap-4 sm:gap-8">
          {/* Prev button */}
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
            data-ocid="flipbook.pagination_prev"
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

          {/* Book container with perspective */}
          <div
            className="relative select-none"
            style={{
              perspective: "1200px",
              width: "min(480px, 88vw)",
              height: "min(380px, 72vw)",
            }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            data-ocid="flipbook.canvas_target"
          >
            {/* Book shadow base */}
            <div
              className="absolute inset-0 rounded-2xl"
              style={{
                boxShadow:
                  "0 40px 80px -15px rgba(0,0,0,0.85), 0 0 0 1px rgba(255,255,255,0.06)",
                background: "#18162a",
              }}
            />

            {/* BACK face — shows next/prev page content */}
            <div
              className="absolute inset-0 rounded-2xl overflow-hidden flex flex-col items-center justify-center px-8 py-8"
              style={{
                transformStyle: "preserve-3d",
                backfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
                background: `linear-gradient(160deg, #fffdf7 0%, ${nxt.accent}18 100%)`,
              }}
            >
              <div
                className="text-6xl mb-6"
                style={{ filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.12))" }}
              >
                {nxt.emoji}
              </div>
              <h3
                className="text-2xl sm:text-3xl font-extrabold text-center leading-tight mb-4"
                style={{ color: nxt.accent }}
              >
                {nxt.title[lang]}
              </h3>
              <p className="text-gray-600 text-sm sm:text-base text-center leading-relaxed max-w-xs">
                {nxt.desc[lang]}
              </p>
            </div>

            {/* FRONT face — the page that flips */}
            <div
              className="absolute inset-0 rounded-2xl overflow-hidden"
              style={{
                transformStyle: "preserve-3d",
                transform: `rotateY(${pageRotateY}deg)`,
                transition: isFolding
                  ? "transform 0.5s cubic-bezier(0.645,0.045,0.355,1.000)"
                  : isSnapping
                    ? "transform 0.3s ease-out"
                    : "none",
                transformOrigin:
                  pageRotateY < 0 ? "right center" : "left center",
              }}
            >
              {/* Front face content */}
              <div
                className="absolute inset-0 flex flex-col items-center justify-center px-8 py-8"
                style={{
                  backfaceVisibility: "hidden",
                  background: `linear-gradient(160deg, #fffdf7 0%, ${showPage.accent}18 100%)`,
                }}
              >
                {/* Page number top-left */}
                <div
                  className="absolute top-4 left-5 text-xs font-bold tracking-widest uppercase opacity-50"
                  style={{ color: showPage.accent }}
                >
                  {lang === "hi"
                    ? `पेज ${pageIndex + 1}`
                    : `Page ${pageIndex + 1}`}
                </div>

                {/* Page number top-right */}
                <div
                  className="absolute top-4 right-5 text-xs font-bold tracking-widest uppercase opacity-30"
                  style={{ color: showPage.accent }}
                >
                  {PAGES.length}
                </div>

                {/* Decorative line under page number */}
                <div
                  className="absolute top-10 left-5 right-5 h-px"
                  style={{ background: `${showPage.accent}30` }}
                />

                {/* Main content */}
                <div className="flex flex-col items-center gap-5 text-center max-w-sm">
                  {/* Big emoji */}
                  <div
                    className="text-7xl sm:text-8xl"
                    style={{
                      filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.15))",
                      animation:
                        animPhase === "done"
                          ? "pageReveal 0.3s ease-out"
                          : undefined,
                    }}
                  >
                    {showPage.emoji}
                  </div>

                  {/* Title */}
                  <h3
                    className="text-xl sm:text-2xl md:text-3xl font-extrabold leading-tight"
                    style={{ color: showPage.accent }}
                  >
                    {showPage.title[lang]}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                    {showPage.desc[lang]}
                  </p>
                </div>

                {/* Bottom decorative line */}
                <div
                  className="absolute bottom-10 left-5 right-5 h-px"
                  style={{ background: `${showPage.accent}30` }}
                />

                {/* Page curl corner */}
                <div
                  className="absolute bottom-0 right-0 w-10 h-10 pointer-events-none"
                  style={{
                    background: `linear-gradient(135deg, transparent 50%, ${showPage.accent}40 50%)`,
                    borderBottomRightRadius: "16px",
                  }}
                />

                {/* Spine shadow on right */}
                <div className="absolute right-0 top-0 bottom-0 w-4 bg-gradient-to-l from-black/8 to-transparent pointer-events-none" />
                {/* Spine shadow on left */}
                <div className="absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-black/8 to-transparent pointer-events-none" />
              </div>

              {/* Back face of the flipping page */}
              <div
                className="absolute inset-0 flex flex-col items-center justify-center px-8 py-8"
                style={{
                  backfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                  background: `linear-gradient(160deg, #fffbf0 0%, ${nxt.accent}15 100%)`,
                }}
              >
                <div className="text-5xl mb-4">{nxt.emoji}</div>
                <h3
                  className="text-xl font-extrabold text-center"
                  style={{ color: nxt.accent }}
                >
                  {nxt.title[lang]}
                </h3>
                <p className="text-gray-500 text-xs text-center mt-3 leading-relaxed max-w-xs">
                  {nxt.desc[lang]}
                </p>
              </div>
            </div>

            {/* Touch hint overlay (only on mobile, fades away) */}
            <div
              className="absolute bottom-3 inset-x-0 flex justify-center pointer-events-none"
              style={{ opacity: 0.45 }}
            >
              <span className="text-xs text-white bg-black/30 px-3 py-1 rounded-full backdrop-blur-sm">
                {lang === "hi" ? "← स्वाइप करें →" : "← swipe to flip →"}
              </span>
            </div>
          </div>

          {/* Next button */}
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
            data-ocid="flipbook.pagination_next"
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
          <div className="flex items-center gap-2" data-ocid="flipbook.list">
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
                data-ocid="flipbook.tab"
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
              data-ocid="flipbook.toggle"
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
              : "Use ← → arrow keys or swipe to flip pages"}
          </p>
        </div>
      </div>
    </section>
  );
}
