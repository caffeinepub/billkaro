import { X } from "lucide-react";
import { useEffect, useState } from "react";
import type { Lang } from "../translations";
import { t } from "../translations";

interface OfferBannerProps {
  lang: Lang;
}

function getNextSunday(): Date {
  const now = new Date();
  const day = now.getDay(); // 0=Sun
  const daysUntilSunday = day === 0 ? 7 : 7 - day;
  const nextSunday = new Date(now);
  nextSunday.setDate(now.getDate() + daysUntilSunday);
  nextSunday.setHours(23, 59, 59, 0);
  return nextSunday;
}

function formatCountdown(ms: number) {
  if (ms <= 0) return "00:00:00";
  const totalSecs = Math.floor(ms / 1000);
  const h = Math.floor(totalSecs / 3600);
  const m = Math.floor((totalSecs % 3600) / 60);
  const s = totalSecs % 60;
  return [
    String(h).padStart(2, "0"),
    String(m).padStart(2, "0"),
    String(s).padStart(2, "0"),
  ].join(":");
}

export default function OfferBanner({ lang }: OfferBannerProps) {
  const [dismissed, setDismissed] = useState(false);
  const [countdown, setCountdown] = useState("");
  const tr = t[lang];
  const target = getNextSunday();

  useEffect(() => {
    const tick = () => {
      const diff = target.getTime() - Date.now();
      setCountdown(formatCountdown(diff));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);

  if (dismissed) return null;

  const dismiss = () => {
    setDismissed(true);
  };

  const waUrl =
    "https://wa.me/917023285769?text=Hi%2C%20I%20want%20to%20claim%20the%2050%20Free%20Credits%20Sunday%20offer%20for%20BillKaro";

  return (
    <div
      className="w-full text-white text-sm relative overflow-hidden"
      style={{
        background:
          "linear-gradient(90deg, #FF8A00 0%, #E2367A 50%, #8B5CF6 100%)",
      }}
      data-ocid="offer.banner.panel"
    >
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col sm:flex-row items-center gap-2 sm:gap-4 justify-between">
        {/* Left */}
        <div className="flex items-center gap-2 text-center sm:text-left">
          <span className="text-lg">🔥</span>
          <span className="font-bold text-xs sm:text-sm">
            {tr.offer_banner_title}
          </span>
        </div>

        {/* Middle — countdown */}
        <div className="flex items-center gap-2">
          <span className="text-xs opacity-80">{tr.offer_banner_sub}</span>
          <span className="font-mono font-bold bg-black/20 rounded px-2 py-0.5 text-xs tracking-wider">
            {countdown}
          </span>
        </div>

        {/* Right — CTA */}
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="animate-pulse bg-white text-[#E2367A] font-extrabold text-sm px-6 py-2 rounded-full shadow-lg hover:bg-yellow-50 hover:scale-105 transition-all duration-200 whitespace-nowrap flex-shrink-0"
          data-ocid="offer.banner.button"
          style={{
            boxShadow: "0 0 16px rgba(255,255,255,0.5)",
          }}
        >
          {tr.offer_banner_cta}
        </a>

        {/* Dismiss */}
        <button
          type="button"
          onClick={dismiss}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-1"
          aria-label="Close"
          data-ocid="offer.banner.close_button"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
