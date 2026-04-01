import { useEffect, useState } from "react";

interface CartoonCharacterProps {
  isSpeaking: boolean;
  speechText?: string;
  size?: "small" | "medium" | "large";
  showSpeechBubble?: boolean;
}

const SIZE_MAP = {
  small: "w-16 h-auto",
  medium: "w-36 md:w-44 h-auto",
  large: "w-48 md:w-56 h-auto",
};

export function CartoonCharacter({
  isSpeaking,
  speechText,
  size = "medium",
  showSpeechBubble = false,
}: CartoonCharacterProps) {
  const [mouthOpen, setMouthOpen] = useState(false);
  const [expressionFrame, setExpressionFrame] = useState(0);
  const [visible, setVisible] = useState(false);

  // Entrance animation
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(t);
  }, []);

  // Lip-sync interval — toggles mouth at 130ms
  useEffect(() => {
    if (!isSpeaking) {
      setMouthOpen(false);
      return;
    }
    const interval = setInterval(() => {
      setMouthOpen((prev) => !prev);
    }, 130);
    return () => clearInterval(interval);
  }, [isSpeaking]);

  // Expression cycle — advances frame every 260ms while speaking
  useEffect(() => {
    if (!isSpeaking) {
      setExpressionFrame(0);
      return;
    }
    const interval = setInterval(() => {
      setExpressionFrame((prev) => (prev + 1) % 4);
    }, 260);
    return () => clearInterval(interval);
  }, [isSpeaking]);

  // Derived expression values
  // Eyebrow Y shift: raise slightly on frames 0,2 (mouth open phases)
  const browShift =
    isSpeaking && (expressionFrame === 0 || expressionFrame === 2) ? -2 : 0;

  // Eye squint: slightly smaller ry on frames 1,3
  const eyeRy =
    isSpeaking && (expressionFrame === 1 || expressionFrame === 3) ? 8 : 9;

  // Cheek opacity
  const cheekOpacity = isSpeaking ? 0.5 : 0.35;

  // Mouth paths
  const mouthPath = mouthOpen ? (
    <ellipse cx="100" cy="222" rx="10" ry="7" fill="#c0392b" />
  ) : (
    <path
      d="M88 220 Q100 230 112 220"
      stroke="#c0392b"
      strokeWidth="2.5"
      fill="none"
      strokeLinecap="round"
    />
  );

  return (
    <div
      className="flex flex-col items-center"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible
          ? "translateY(0) scale(1)"
          : "translateY(20px) scale(0.85)",
        transition:
          "opacity 0.5s ease, transform 0.5s cubic-bezier(0.34,1.56,0.64,1)",
      }}
    >
      {showSpeechBubble && speechText && (
        <div
          className="mb-2 bg-white text-gray-800 rounded-2xl px-3 py-2 text-xs font-medium shadow-xl max-w-[160px] text-center relative"
          style={{ animation: "speechBubbleIn 0.4s ease both" }}
        >
          {speechText}
          <div
            className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0"
            style={{
              borderLeft: "7px solid transparent",
              borderRight: "7px solid transparent",
              borderTop: "8px solid white",
            }}
          />
        </div>
      )}

      <div
        className={SIZE_MAP[size]}
        style={{
          animation: isSpeaking
            ? "none"
            : "shyamaFloat 3s ease-in-out infinite",
          filter:
            "drop-shadow(0 8px 24px rgba(249,115,22,0.35)) drop-shadow(0 2px 8px rgba(168,85,247,0.25))",
        }}
      >
        <svg
          viewBox="0 0 200 320"
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: "100%", height: "auto", display: "block" }}
          role="img"
          aria-label="Shyama"
        >
          {/* ── Neck ── */}
          <rect x="88" y="248" width="24" height="22" rx="4" fill="#f0c080" />

          {/* ── Body / Kurta (orange-to-purple gradient) ── */}
          <defs>
            <linearGradient id="kurta" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#f97316" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>
            <linearGradient id="dupatta" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#fb923c" />
              <stop offset="100%" stopColor="#c084fc" />
            </linearGradient>
          </defs>
          {/* Kurta body */}
          <path
            d="M40 270 Q30 290 35 320 L165 320 Q170 290 160 270 Q140 258 100 258 Q60 258 40 270Z"
            fill="url(#kurta)"
          />
          {/* Kurta neckline V */}
          <path
            d="M88 268 L100 282 L112 268"
            stroke="#fff"
            strokeWidth="1.5"
            fill="none"
            opacity="0.6"
          />
          {/* Dupatta drape over left shoulder */}
          <path
            d="M40 270 Q50 255 70 260 Q85 264 88 268"
            stroke="url(#dupatta)"
            strokeWidth="10"
            fill="none"
            strokeLinecap="round"
            opacity="0.85"
          />
          {/* Dupatta tail flowing down right */}
          <path
            d="M112 268 Q130 264 148 268 Q165 272 162 290"
            stroke="url(#dupatta)"
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            opacity="0.75"
          />

          {/* ── Arms ── */}
          <path
            d="M60 278 Q38 295 42 318"
            stroke="#f0c080"
            strokeWidth="14"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M140 278 Q162 295 158 318"
            stroke="#f0c080"
            strokeWidth="14"
            fill="none"
            strokeLinecap="round"
          />
          <ellipse
            cx="43"
            cy="310"
            rx="6"
            ry="3"
            fill="none"
            stroke="#f97316"
            strokeWidth="2"
          />
          <ellipse
            cx="157"
            cy="310"
            rx="6"
            ry="3"
            fill="none"
            stroke="#a855f7"
            strokeWidth="2"
          />

          {/* ── Head ── */}
          <ellipse cx="100" cy="185" rx="52" ry="60" fill="#f0c080" />

          {/* ── Ears ── */}
          <ellipse cx="48" cy="190" rx="8" ry="11" fill="#e8b870" />
          <ellipse cx="152" cy="190" rx="8" ry="11" fill="#e8b870" />
          <circle cx="48" cy="200" r="4" fill="#f97316" />
          <circle cx="152" cy="200" r="4" fill="#a855f7" />

          {/* ── Hair ── */}
          <ellipse cx="100" cy="150" rx="52" ry="38" fill="#2d1a0e" />
          <line
            x1="100"
            y1="128"
            x2="100"
            y2="148"
            stroke="#8B4513"
            strokeWidth="1.5"
            opacity="0.5"
          />
          <path
            d="M48 150 Q40 175 44 200"
            stroke="#2d1a0e"
            strokeWidth="14"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M152 150 Q160 175 156 200"
            stroke="#2d1a0e"
            strokeWidth="14"
            fill="none"
            strokeLinecap="round"
          />
          <ellipse cx="100" cy="128" rx="18" ry="14" fill="#2d1a0e" />
          <path
            d="M92 124 Q100 120 108 124"
            stroke="#5c3317"
            strokeWidth="2"
            fill="none"
            opacity="0.7"
          />
          <circle cx="100" cy="148" r="3.5" fill="#f97316" />

          {/* ── Eyebrows — shift Y when speaking (expressive raise) ── */}
          <path
            d={`M72 ${170 + browShift} Q82 ${165 + browShift} 90 ${168 + browShift}`}
            stroke="#2d1a0e"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
            style={{ transition: "d 0.15s ease" }}
          />
          <path
            d={`M110 ${168 + browShift} Q118 ${165 + browShift} 128 ${170 + browShift}`}
            stroke="#2d1a0e"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
            style={{ transition: "d 0.15s ease" }}
          />

          {/* ── Eyes — slight squint on expression frames 1,3 ── */}
          <ellipse cx="81" cy="182" rx="11" ry={eyeRy} fill="white" />
          <ellipse cx="119" cy="182" rx="11" ry={eyeRy} fill="white" />
          {/* Irises */}
          <circle cx="81" cy="183" r="6" fill="#3d1f0a" />
          <circle cx="119" cy="183" r="6" fill="#3d1f0a" />
          {/* Pupils */}
          <circle cx="81" cy="183" r="3" fill="#1a0a00" />
          <circle cx="119" cy="183" r="3" fill="#1a0a00" />
          {/* Eye shine */}
          <circle cx="83" cy="181" r="2" fill="white" />
          <circle cx="121" cy="181" r="2" fill="white" />
          {/* Lower lashes */}
          <path
            d="M72 188 Q81 192 90 188"
            stroke="#2d1a0e"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M110 188 Q119 192 128 188"
            stroke="#2d1a0e"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
          />

          {/* ── Nose ── */}
          <path
            d="M97 196 Q100 205 103 196"
            stroke="#c9905a"
            strokeWidth="1.8"
            fill="none"
            strokeLinecap="round"
          />
          <circle cx="94" cy="205" r="2" fill="#c9905a" opacity="0.6" />
          <circle cx="106" cy="205" r="2" fill="#c9905a" opacity="0.6" />

          {/* ── Cheek blush — higher opacity when speaking ── */}
          <ellipse
            cx="68"
            cy="208"
            rx="10"
            ry="6"
            fill="#f9a8d4"
            opacity={cheekOpacity}
          />
          <ellipse
            cx="132"
            cy="208"
            rx="10"
            ry="6"
            fill="#f9a8d4"
            opacity={cheekOpacity}
          />

          {/* ── Mouth — lip-sync ── */}
          {mouthPath}

          {/* ── Bindi on forehead ── */}
          <circle cx="100" cy="164" r="4" fill="#dc2626" />
          <circle cx="100" cy="164" r="2" fill="#fbbf24" />
        </svg>
      </div>

      {isSpeaking && (
        <div className="flex gap-1 mt-1">
          {[0, 0.2, 0.4].map((delay) => (
            <div
              key={delay}
              className="rounded-full bg-orange-400"
              style={{
                width: size === "small" ? 4 : 6,
                height: size === "small" ? 4 : 6,
                animation: `dotPulse 0.8s ease ${delay}s infinite`,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
