import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Lang } from "../translations";

interface FlipbookDemoProps {
  lang: Lang;
}

const PAGES = [
  {
    id: "p1",
    img: "/assets/generated/flipbook-page1-welcome.dim_600x800.png",
    en: "Welcome to BillKaro",
    hi: "BillKaro \u092e\u0947\u0902 \u0906\u092a\u0915\u093e \u0938\u094d\u0935\u093e\u0917\u0924 \u0939\u0948",
  },
  {
    id: "p2",
    img: "/assets/generated/flipbook-page2-setup.dim_600x800.png",
    en: "Setup Your Store",
    hi: "\u0905\u092a\u0928\u0940 \u0926\u0941\u0915\u093e\u0928 \u0938\u0947\u091f\u0905\u092a \u0915\u0930\u0947\u0902",
  },
  {
    id: "p3",
    img: "/assets/generated/flipbook-page3-products.dim_600x800.png",
    en: "Add Your Products",
    hi: "\u0905\u092a\u0928\u0947 \u092a\u094d\u0930\u094b\u0921\u0915\u094d\u091f \u091c\u094b\u0921\u093c\u0947\u0902",
  },
  {
    id: "p4",
    img: "/assets/generated/flipbook-page4-billing.dim_600x800.png",
    en: "Create a Bill",
    hi: "\u092c\u093f\u0932 \u092c\u0928\u093e\u090f\u0902",
  },
  {
    id: "p5",
    img: "/assets/generated/flipbook-page5-invoice.dim_600x800.png",
    en: "GST Invoice Generated",
    hi: "GST \u0907\u0928\u0935\u0949\u0907\u0938 \u0924\u0948\u092f\u093e\u0930",
  },
  {
    id: "p6",
    img: "/assets/generated/flipbook-page6-payments.dim_600x800.png",
    en: "Accept Payments",
    hi: "\u092a\u0947\u092e\u0947\u0902\u091f \u0938\u094d\u0935\u0940\u0915\u093e\u0930 \u0915\u0930\u0947\u0902",
  },
  {
    id: "p7",
    img: "/assets/generated/flipbook-page7-dashboard.dim_600x800.png",
    en: "Business Dashboard",
    hi: "\u092c\u093f\u091c\u0928\u0947\u0938 \u0921\u0948\u0936\u092c\u094b\u0930\u094d\u0921",
  },
  {
    id: "p8",
    img: "/assets/generated/flipbook-page8-download.dim_600x800.png",
    en: "Download Free Today",
    hi: "\u0906\u091c \u0939\u0940 \u092b\u094d\u0930\u0940 \u0921\u093e\u0909\u0928\u0932\u094b\u0921 \u0915\u0930\u0947\u0902",
  },
];

export default function FlipbookDemo({ lang }: FlipbookDemoProps) {
  const [current, setCurrent] = useState(0);
  const [flipping, setFlipping] = useState(false);
  const [flipDir, setFlipDir] = useState<"next" | "prev">("next");
  const [autoPlay, setAutoPlay] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback(
    (idx: number, dir: "next" | "prev" = "next") => {
      if (flipping) return;
      setFlipDir(dir);
      setFlipping(true);
      setTimeout(() => {
        setCurrent(idx);
        setFlipping(false);
      }, 350);
    },
    [flipping],
  );

  const goNext = useCallback(() => {
    goTo((current + 1) % PAGES.length, "next");
  }, [current, goTo]);

  const goPrev = useCallback(() => {
    goTo((current - 1 + PAGES.length) % PAGES.length, "prev");
  }, [current, goTo]);

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
      timerRef.current = setInterval(goNext, 3000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [autoPlay, goNext]);

  const page = PAGES[current];
  const caption = lang === "hi" ? page.hi : page.en;

  return (
    <section
      id="product-demo"
      className="py-20 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #FF6B35 0%, #8B5CF6 50%, #EC4899 100%)",
      }}
    >
      {/* Decorative circles */}
      <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-white/10 blur-2xl" />
      <div className="absolute bottom-10 right-10 w-56 h-56 rounded-full bg-white/10 blur-3xl" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1 rounded-full bg-white/20 text-white text-sm font-semibold tracking-wide mb-4">
            {lang === "hi"
              ? "\u0907\u0902\u091f\u0930\u090f\u0915\u094d\u091f\u093f\u0935 \u0921\u0947\u092e\u094b"
              : "Interactive Demo"}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">
            {lang === "hi"
              ? "\u092a\u094d\u0930\u094b\u0921\u0915\u094d\u091f \u0921\u0947\u092e\u094b"
              : "Product Demo"}
          </h2>
          <p className="text-white/80 text-lg max-w-xl mx-auto">
            {lang === "hi"
              ? "BillKaro \u0910\u092a \u0915\u093e \u092a\u0942\u0930\u093e \u0935\u0949\u0915\u0925\u094d\u0930\u0942 - \u092a\u0947\u091c \u092a\u0932\u091f\u0947\u0902 \u0914\u0930 \u091c\u093e\u0928\u0947\u0902"
              : "Flip through the complete BillKaro app walkthrough"}
          </p>
        </div>

        {/* Flipbook frame */}
        <div className="flex items-center justify-center gap-4 sm:gap-8">
          {/* Prev button */}
          <Button
            variant="outline"
            size="icon"
            onClick={goPrev}
            data-ocid="flipbook.pagination_prev"
            className="w-12 h-12 rounded-full bg-white/20 border-white/30 text-white hover:bg-white/30 hover:text-white flex-shrink-0"
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>

          {/* Book */}
          <div
            className="relative"
            style={{
              perspective: "1200px",
              width: "min(320px, 80vw)",
            }}
          >
            {/* Book shadow */}
            <div
              className="absolute inset-0 rounded-2xl"
              style={{
                boxShadow:
                  "0 30px 60px -10px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.1)",
              }}
            />

            {/* Page */}
            <div
              className="relative rounded-2xl overflow-hidden bg-white"
              style={{
                transformStyle: "preserve-3d",
                transform: flipping
                  ? flipDir === "next"
                    ? "rotateY(-25deg) scale(0.97)"
                    : "rotateY(25deg) scale(0.97)"
                  : "rotateY(0deg) scale(1)",
                transition: flipping
                  ? "transform 0.35s ease-in-out"
                  : "transform 0.35s ease-out",
              }}
            >
              {/* Left spine shadow */}
              <div className="absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-black/20 to-transparent z-10 pointer-events-none" />

              <img
                src={page.img}
                alt={caption}
                className="w-full block"
                style={{ aspectRatio: "3/4", objectFit: "cover" }}
              />

              {/* Page corner fold */}
              <div
                className="absolute bottom-0 right-0 w-10 h-10"
                style={{
                  background:
                    "linear-gradient(135deg, transparent 50%, rgba(0,0,0,0.15) 50%)",
                }}
              />

              {/* Caption bar */}
              <div
                className="absolute bottom-0 left-0 right-0 px-4 py-3 text-center"
                style={{
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)",
                }}
              >
                <p className="text-white font-bold text-base drop-shadow-sm">
                  {caption}
                </p>
              </div>
            </div>
          </div>

          {/* Next button */}
          <Button
            variant="outline"
            size="icon"
            onClick={goNext}
            data-ocid="flipbook.pagination_next"
            className="w-12 h-12 rounded-full bg-white/20 border-white/30 text-white hover:bg-white/30 hover:text-white flex-shrink-0"
          >
            <ChevronRight className="w-6 h-6" />
          </Button>
        </div>

        {/* Controls row */}
        <div className="flex flex-col items-center gap-4 mt-8">
          {/* Page indicator dots */}
          <div className="flex gap-2" data-ocid="flipbook.panel">
            {PAGES.map((p, i) => (
              <button
                key={p.id}
                type="button"
                onClick={() => goTo(i, i > current ? "next" : "prev")}
                data-ocid={`flipbook.item.${i + 1}`}
                className="transition-all duration-200"
                style={{
                  width: i === current ? 28 : 10,
                  height: 10,
                  borderRadius: 5,
                  background: i === current ? "#fff" : "rgba(255,255,255,0.4)",
                  border: "none",
                  cursor: "pointer",
                }}
                aria-label={`Go to page ${i + 1}`}
              />
            ))}
          </div>

          {/* Page number + Auto-play */}
          <div className="flex items-center gap-4">
            <span className="text-white/80 text-sm font-mono">
              {current + 1} / {PAGES.length}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setAutoPlay((v) => !v)}
              data-ocid="flipbook.toggle"
              className="bg-white/20 border-white/30 text-white hover:bg-white/30 hover:text-white gap-2"
            >
              {autoPlay ? (
                <>
                  <Pause className="w-4 h-4" />{" "}
                  {lang === "hi" ? "\u0930\u094b\u0915\u0947\u0902" : "Pause"}
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />{" "}
                  {lang === "hi"
                    ? "\u0911\u091f\u094b-\u092a\u094d\u0932\u0947"
                    : "Auto-Play"}
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
