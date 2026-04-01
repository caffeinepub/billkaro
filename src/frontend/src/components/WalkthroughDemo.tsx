import { useCallback, useEffect, useRef, useState } from "react";
import type { Lang } from "../translations";
import { CartoonCharacter } from "./CartoonCharacter";

interface WalkthroughDemoProps {
  lang: Lang;
}

interface WalkthroughStep {
  titleEn: string;
  titleHi: string;
  narrationEn: string;
  narrationHi: string;
  screen:
    | "welcome"
    | "dashboard"
    | "store"
    | "addproduct"
    | "productlist"
    | "newinvoice"
    | "generatebill"
    | "done";
}

const STEPS: WalkthroughStep[] = [
  {
    titleEn: "Welcome to BillKaro",
    titleHi: "BillKaro में स्वागत है",
    narrationEn:
      "Welcome to BillKaro! The smartest GST billing app for your grocery store.",
    narrationHi:
      "BillKaro में आपका स्वागत है! आपकी किराना दुकान के लिए सबसे स्मार्ट GST बिलिंग ऐप।",
    screen: "welcome",
  },
  {
    titleEn: "Home Dashboard",
    titleHi: "होम डैशबोर्ड",
    narrationEn:
      "This is your home dashboard. See today's sales, total invoices, and tax collected at a glance.",
    narrationHi:
      "यह आपका होम डैशबोर्ड है। एक नजर में आज की बिक्री, कुल इनवॉइस और टैक्स देखें।",
    screen: "dashboard",
  },
  {
    titleEn: "Store Setup",
    titleHi: "स्टोर सेटअप",
    narrationEn:
      "First, set up your store. Add your GSTIN, FSSAI license number, and shop address.",
    narrationHi:
      "पहले अपना स्टोर सेट करें। GSTIN, FSSAI लाइसेंस नंबर और दुकान का पता डालें।",
    screen: "store",
  },
  {
    titleEn: "Add Product",
    titleHi: "प्रोडक्ट जोड़ें",
    narrationEn:
      "Add products to your catalog. Enter the product name, price, HSN code, and SKU.",
    narrationHi: "अपने कैटलॉग में प्रोडक्ट जोड़ें। नाम, कीमत, HSN कोड और SKU डालें।",
    screen: "addproduct",
  },
  {
    titleEn: "Product List",
    titleHi: "प्रोडक्ट लिस्ट",
    narrationEn:
      "Your product catalog grows. Search or scan barcode for quick billing.",
    narrationHi:
      "आपका प्रोडक्ट कैटलॉग बड़ा होता है। तेज बिलिंग के लिए खोजें या बारकोड स्कैन करें।",
    screen: "productlist",
  },
  {
    titleEn: "New Invoice",
    titleHi: "नया इनवॉइस",
    narrationEn:
      "Tap New Invoice to start billing. Add customer name and GSTIN if needed.",
    narrationHi:
      "बिलिंग शुरू करने के लिए New Invoice टैप करें। जरूरत हो तो ग्राहक का नाम और GSTIN डालें।",
    screen: "newinvoice",
  },
  {
    titleEn: "Generate Bill",
    titleHi: "बिल बनाएं",
    narrationEn:
      "Add products, choose payment mode - Cash, Card, or UPI - and generate the GST invoice!",
    narrationHi: "प्रोडक्ट जोड़ें, Cash, Card या UPI पेमेंट मोड चुनें और GST इनवॉइस बनाएं!",
    screen: "generatebill",
  },
  {
    titleEn: "Invoice Ready!",
    titleHi: "इनवॉइस तैयार!",
    narrationEn:
      "Your professional GST invoice is ready! Share it directly with your customer. BillKaro makes billing easy!",
    narrationHi:
      "आपका प्रोफेशनल GST इनवॉइस तैयार है! सीधे कस्टमर को शेयर करें। BillKaro बिलिंग को आसान बनाता है!",
    screen: "done",
  },
];

const STEP_DURATION = 6000;

const CONFETTI_ITEMS = [
  { id: "c0", left: "5%", color: "#f97316", dur: 1.2, delay: 0 },
  { id: "c1", left: "10.5%", color: "#a855f7", dur: 1.5, delay: 0.1 },
  { id: "c2", left: "16%", color: "#22c55e", dur: 1.2, delay: 0.2 },
  { id: "c3", left: "21.5%", color: "#3b82f6", dur: 1.8, delay: 0.3 },
  { id: "c4", left: "27%", color: "#ec4899", dur: 1.2, delay: 0.4 },
  { id: "c5", left: "32.5%", color: "#f97316", dur: 1.5, delay: 0.5 },
  { id: "c6", left: "38%", color: "#a855f7", dur: 1.2, delay: 0 },
  { id: "c7", left: "43.5%", color: "#22c55e", dur: 1.8, delay: 0.1 },
  { id: "c8", left: "49%", color: "#3b82f6", dur: 1.5, delay: 0.2 },
  { id: "c9", left: "54.5%", color: "#ec4899", dur: 1.2, delay: 0.3 },
  { id: "c10", left: "60%", color: "#f97316", dur: 1.5, delay: 0.4 },
  { id: "c11", left: "65.5%", color: "#a855f7", dur: 1.8, delay: 0.5 },
  { id: "c12", left: "71%", color: "#22c55e", dur: 1.2, delay: 0 },
  { id: "c13", left: "76.5%", color: "#3b82f6", dur: 1.5, delay: 0.1 },
  { id: "c14", left: "82%", color: "#ec4899", dur: 1.2, delay: 0.2 },
  { id: "c15", left: "87.5%", color: "#f97316", dur: 1.8, delay: 0.3 },
  { id: "c16", left: "93%", color: "#a855f7", dur: 1.5, delay: 0.4 },
  { id: "c17", left: "5.5%", color: "#22c55e", dur: 1.2, delay: 0.5 },
];

function speak(text: string, lang: Lang) {
  if (typeof window === "undefined" || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang === "hi" ? "hi-IN" : "en-IN";
  utterance.rate = 0.9;
  utterance.pitch = 1.2;
  const trySpeak = () => {
    const voices = window.speechSynthesis.getVoices();
    const targetLang = lang === "hi" ? "hi" : "en";
    const femaleVoice = voices.find(
      (v) =>
        v.lang.toLowerCase().startsWith(targetLang) &&
        (v.name.toLowerCase().includes("female") ||
          v.name.toLowerCase().includes("woman") ||
          v.name.toLowerCase().includes("zira") ||
          v.name.toLowerCase().includes("samantha") ||
          v.name.toLowerCase().includes("google")),
    );
    if (femaleVoice) utterance.voice = femaleVoice;
    window.speechSynthesis.speak(utterance);
  };
  if (window.speechSynthesis.getVoices().length === 0) {
    window.speechSynthesis.onvoiceschanged = trySpeak;
  } else {
    trySpeak();
  }
}

// ---------- Phone screen mockups ----------

function ScreenWelcome() {
  return (
    <div className="flex flex-col items-center justify-center h-full bg-gradient-to-b from-orange-400 to-purple-600 gap-3 px-4">
      <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center shadow-xl">
        <span className="text-3xl">🧾</span>
      </div>
      <div className="text-white text-xl font-bold tracking-wide">BillKaro</div>
      <div className="text-white/80 text-xs text-center">Smart GST Billing</div>
      <div className="mt-4 flex gap-1">
        <span className="w-1.5 h-1.5 rounded-full bg-white/60" />
        <span className="w-1.5 h-1.5 rounded-full bg-white/60" />
        <span className="w-1.5 h-1.5 rounded-full bg-white/60" />
      </div>
    </div>
  );
}

function ScreenDashboard() {
  return (
    <div className="flex flex-col h-full bg-gray-50 px-3 pt-4 pb-2 gap-2">
      <div className="text-xs font-bold text-gray-700 mb-1">Dashboard</div>
      <div className="grid grid-cols-1 gap-2">
        {[
          {
            label: "Today Sales",
            value: "₹2,450",
            color: "from-orange-400 to-orange-500",
            icon: "💰",
          },
          {
            label: "Invoices",
            value: "12",
            color: "from-purple-400 to-purple-500",
            icon: "🧾",
          },
          {
            label: "Tax",
            value: "₹441",
            color: "from-pink-400 to-pink-500",
            icon: "📊",
          },
        ].map((card, i) => (
          <div
            key={card.label}
            className={`rounded-xl bg-gradient-to-r ${card.color} text-white px-3 py-2 flex items-center gap-2 shadow`}
            style={{ animation: `slideInRight 0.4s ease ${i * 0.15}s both` }}
          >
            <span className="text-lg">{card.icon}</span>
            <div>
              <div className="text-xs opacity-80">{card.label}</div>
              <div className="text-base font-bold">{card.value}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ScreenStore() {
  return (
    <div className="flex flex-col h-full bg-white px-3 pt-4 pb-2 gap-2">
      <div className="text-xs font-bold text-gray-700 mb-2">Store Setup</div>
      {[
        { label: "GSTIN", placeholder: "27AAAPZ123...", delay: 0 },
        { label: "FSSAI License", placeholder: "12345678...", delay: 0.1 },
        { label: "Shop Address", placeholder: "123, MG Road...", delay: 0.2 },
        { label: "City", placeholder: "Jaipur", delay: 0.3 },
      ].map((f) => (
        <div
          key={f.label}
          style={{ animation: `fadeSlideIn 0.4s ease ${f.delay}s both` }}
        >
          <div className="text-[9px] text-gray-500 mb-0.5">{f.label}</div>
          <div className="border border-gray-200 rounded-lg px-2 py-1.5 text-[10px] text-gray-400 bg-gray-50">
            {f.placeholder}
          </div>
        </div>
      ))}
      <button
        type="button"
        className="mt-auto w-full py-2 rounded-xl bg-gradient-to-r from-orange-400 to-purple-500 text-white text-xs font-bold shadow"
      >
        Save Store
      </button>
    </div>
  );
}

function ScreenAddProduct() {
  const [saved, setSaved] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setSaved(true), 2500);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="flex flex-col h-full bg-white px-3 pt-4 pb-2 gap-1.5">
      <div className="text-xs font-bold text-gray-700 mb-1">Add Product</div>
      {[
        { label: "Product Name", value: "Basmati Rice 1kg", delay: 0 },
        { label: "Price (Rs)", value: "85.00", delay: 0.1 },
        { label: "HSN Code", value: "1006", delay: 0.2 },
        { label: "SKU", value: "RICE-BAS-1KG", delay: 0.3 },
      ].map((f) => (
        <div
          key={f.label}
          style={{ animation: `fadeSlideIn 0.4s ease ${f.delay}s both` }}
        >
          <div className="text-[9px] text-gray-500 mb-0.5">{f.label}</div>
          <div className="border border-orange-200 rounded-lg px-2 py-1.5 text-[10px] text-gray-700 bg-orange-50">
            {f.value}
          </div>
        </div>
      ))}
      <button
        type="button"
        className={`mt-auto w-full py-2 rounded-xl text-white text-xs font-bold shadow transition-all duration-500 ${
          saved
            ? "bg-green-500 scale-105"
            : "bg-gradient-to-r from-orange-400 to-orange-500"
        }`}
      >
        {saved ? "Saved!" : "Save Product"}
      </button>
    </div>
  );
}

function ScreenProductList() {
  const products = [
    { name: "Basmati Rice 1kg", price: "₹85", hsn: "1006" },
    { name: "Toor Dal 500g", price: "₹65", hsn: "0713" },
    { name: "Mustard Oil 1L", price: "₹135", hsn: "1514" },
  ];
  return (
    <div className="flex flex-col h-full bg-gray-50 px-3 pt-4 pb-2 gap-2">
      <div className="flex items-center gap-2 bg-white rounded-xl border border-gray-200 px-2 py-1.5 shadow-sm">
        <span className="text-gray-400 text-xs">🔍</span>
        <span className="text-[10px] text-gray-400">Search products...</span>
      </div>
      {products.map((p, i) => (
        <div
          key={p.name}
          className="bg-white rounded-xl px-3 py-2 shadow-sm border border-gray-100 flex items-center justify-between"
          style={{ animation: `slideInRight 0.4s ease ${i * 0.12}s both` }}
        >
          <div>
            <div className="text-[10px] font-semibold text-gray-700">
              {p.name}
            </div>
            <div className="text-[9px] text-gray-400">HSN: {p.hsn}</div>
          </div>
          <div className="text-xs font-bold text-orange-500">{p.price}</div>
        </div>
      ))}
    </div>
  );
}

function ScreenNewInvoice() {
  return (
    <div className="flex flex-col h-full bg-white px-3 pt-4 pb-2 gap-2">
      <div className="text-xs font-bold text-gray-700 mb-1">New Invoice</div>
      {[
        { label: "Customer Name", value: "Ramesh Kumar", delay: 0 },
        { label: "Phone", value: "9876543210", delay: 0.1 },
        { label: "GSTIN (optional)", value: "07AAAPZ...", delay: 0.2 },
      ].map((f) => (
        <div
          key={f.label}
          style={{ animation: `fadeSlideIn 0.4s ease ${f.delay}s both` }}
        >
          <div className="text-[9px] text-gray-500 mb-0.5">{f.label}</div>
          <div className="border border-purple-200 rounded-lg px-2 py-1.5 text-[10px] text-gray-700 bg-purple-50">
            {f.value}
          </div>
        </div>
      ))}
      <div
        className="mt-2 bg-orange-50 border border-orange-200 rounded-xl p-2"
        style={{ animation: "fadeSlideIn 0.4s ease 0.3s both" }}
      >
        <div className="text-[9px] font-semibold text-orange-600">
          + Add Products
        </div>
        <div className="text-[9px] text-gray-400 mt-0.5">
          Search or scan barcode
        </div>
      </div>
    </div>
  );
}

function ScreenGenerateBill() {
  return (
    <div className="flex flex-col h-full bg-white px-3 pt-3 pb-2 gap-1.5">
      <div className="text-xs font-bold text-gray-700">Invoice #1024</div>
      <div className="text-[9px] text-gray-400 mb-1">Ramesh Kumar</div>
      {[
        { name: "Basmati Rice", qty: 2, price: "₹170" },
        { name: "Toor Dal", qty: 1, price: "₹65" },
      ].map((item, i) => (
        <div
          key={item.name}
          className="flex justify-between text-[10px] border-b border-gray-100 pb-1"
          style={{ animation: `fadeSlideIn 0.3s ease ${i * 0.1}s both` }}
        >
          <span className="text-gray-700">
            {item.name} x{item.qty}
          </span>
          <span className="font-semibold text-gray-800">{item.price}</span>
        </div>
      ))}
      <div className="flex justify-between text-[9px] text-gray-500 mt-1">
        <span>CGST (2.5%)</span>
        <span>₹5.88</span>
      </div>
      <div className="flex justify-between text-[9px] text-gray-500">
        <span>SGST (2.5%)</span>
        <span>₹5.88</span>
      </div>
      <div className="flex justify-between text-xs font-bold text-gray-800 mt-1 border-t border-gray-200 pt-1">
        <span>Total</span>
        <span>₹246.76</span>
      </div>
      <div className="flex gap-1 mt-1">
        {["Cash", "Card", "UPI"].map((m) => (
          <button
            key={m}
            type="button"
            className={`flex-1 py-1 rounded-lg text-[9px] font-semibold ${
              m === "UPI"
                ? "bg-gradient-to-r from-orange-400 to-purple-500 text-white"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            {m}
          </button>
        ))}
      </div>
    </div>
  );
}

function ScreenDone() {
  return (
    <div className="flex flex-col items-center justify-center h-full bg-gradient-to-b from-green-50 to-emerald-100 px-3 gap-2">
      <div
        className="w-14 h-14 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center shadow-lg"
        style={{ animation: "popIn 0.5s cubic-bezier(0.34,1.56,0.64,1) both" }}
      >
        <span className="text-2xl">✓</span>
      </div>
      <div className="text-sm font-bold text-green-800">Invoice Ready!</div>
      <div className="text-[10px] text-green-700 text-center">
        GST Invoice #1024
      </div>
      <div className="bg-white rounded-xl w-full p-2 shadow">
        <div className="text-[9px] text-gray-500">Ramesh Kumar</div>
        <div className="text-xs font-bold text-gray-800">Total: ₹246.76</div>
        <div className="text-[9px] text-green-600 mt-0.5">UPI • Paid</div>
      </div>
      <button
        type="button"
        className="w-full py-1.5 rounded-xl bg-gradient-to-r from-orange-400 to-purple-500 text-white text-[10px] font-bold shadow"
      >
        Share Invoice
      </button>
      {/* CSS confetti */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[2rem]">
        {CONFETTI_ITEMS.map((c) => (
          <div
            key={c.id}
            className="absolute w-1.5 h-1.5 rounded-sm"
            style={{
              left: c.left,
              top: "-10%",
              backgroundColor: c.color,
              animation: `confettiFall ${c.dur}s ease ${c.delay}s both`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

const SCREEN_MAP = {
  welcome: ScreenWelcome,
  dashboard: ScreenDashboard,
  store: ScreenStore,
  addproduct: ScreenAddProduct,
  productlist: ScreenProductList,
  newinvoice: ScreenNewInvoice,
  generatebill: ScreenGenerateBill,
  done: ScreenDone,
};

export default function WalkthroughDemo({ lang }: WalkthroughDemoProps) {
  const [started, setStarted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [screenAnim, setScreenAnim] = useState(true);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const step = STEPS[currentStep];
  const narration = lang === "hi" ? step.narrationHi : step.narrationEn;
  const title = lang === "hi" ? step.titleHi : step.titleEn;
  const ScreenComponent = SCREEN_MAP[step.screen];

  const stopTimers = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (progressRef.current) clearInterval(progressRef.current);
  }, []);

  const goToStep = useCallback(
    (idx: number, withSpeak = true) => {
      setScreenAnim(false);
      setTimeout(() => {
        setCurrentStep(idx);
        setProgress(0);
        setScreenAnim(true);
        if (withSpeak) {
          const s = STEPS[idx];
          const text = lang === "hi" ? s.narrationHi : s.narrationEn;
          setIsSpeaking(true);
          speak(text, lang);
          const est = text.length * 65;
          setTimeout(() => setIsSpeaking(false), est);
        }
      }, 250);
    },
    [lang],
  );

  useEffect(() => {
    if (!started || paused) {
      stopTimers();
      return;
    }
    stopTimers();
    setProgress(0);

    progressRef.current = setInterval(() => {
      setProgress((p) => Math.min(100, p + 100 / (STEP_DURATION / 50)));
    }, 50);

    timerRef.current = setInterval(() => {
      setCurrentStep((prev) => {
        const next = (prev + 1) % STEPS.length;
        setScreenAnim(false);
        setTimeout(() => {
          setProgress(0);
          setScreenAnim(true);
          const s = STEPS[next];
          const text = lang === "hi" ? s.narrationHi : s.narrationEn;
          setIsSpeaking(true);
          speak(text, lang);
          const est = text.length * 65;
          setTimeout(() => setIsSpeaking(false), est);
        }, 250);
        return next;
      });
    }, STEP_DURATION);

    return stopTimers;
  }, [started, paused, lang, stopTimers]);

  const handleStart = () => {
    setStarted(true);
    setCurrentStep(0);
    setProgress(0);
    setPaused(false);
    setIsSpeaking(true);
    const text = lang === "hi" ? STEPS[0].narrationHi : STEPS[0].narrationEn;
    speak(text, lang);
    const est = text.length * 65;
    setTimeout(() => setIsSpeaking(false), est);
  };

  const handlePauseResume = () => {
    if (!paused) {
      window.speechSynthesis?.pause();
    } else {
      window.speechSynthesis?.resume();
    }
    setPaused((v) => !v);
  };

  const handleRestart = () => {
    setPaused(false);
    setProgress(0);
    goToStep(0, true);
  };

  const handlePrev = () => {
    stopTimers();
    const prev = (currentStep - 1 + STEPS.length) % STEPS.length;
    goToStep(prev, true);
  };

  const handleNext = () => {
    stopTimers();
    const next = (currentStep + 1) % STEPS.length;
    goToStep(next, true);
  };

  return (
    <>
      <style>{`
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes popIn {
          from { opacity: 0; transform: scale(0.4); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes confettiFall {
          from { opacity: 1; transform: translateY(0) rotate(0deg); }
          to { opacity: 0; transform: translateY(280px) rotate(540deg); }
        }
        @keyframes speechBubbleIn {
          from { opacity: 0; transform: scale(0.85) translateY(8px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes shyamaBounce {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes shyamaSpeak {
          0%, 100% { transform: translateY(0px) scale(1); }
          25% { transform: translateY(-4px) scale(1.03); }
          75% { transform: translateY(-8px) scale(1.03); }
        }
        @keyframes screenReveal {
          from { opacity: 0; transform: scale(0.92) translateY(12px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes dotPulse {
          0%, 100% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(1.4); opacity: 1; }
        }
        .shyama-idle { animation: shyamaBounce 2.5s ease-in-out infinite; }
        .shyama-speaking { animation: shyamaSpeak 0.6s ease-in-out infinite; }
        .screen-reveal { animation: screenReveal 0.4s cubic-bezier(0.34,1.2,0.64,1) both; }
      `}</style>

      <section
        id="walkthrough"
        className="relative py-16 md:py-24 overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #1e1b4b 0%, #3b0764 40%, #4a044e 100%)",
        }}
      >
        <div
          className="absolute top-0 left-0 w-96 h-96 rounded-full opacity-20 blur-3xl"
          style={{
            background: "radial-gradient(circle, #f97316, transparent)",
          }}
        />
        <div
          className="absolute bottom-0 right-0 w-80 h-80 rounded-full opacity-20 blur-3xl"
          style={{
            background: "radial-gradient(circle, #a855f7, transparent)",
          }}
        />

        <div className="relative max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <span className="inline-block px-4 py-1 rounded-full text-xs font-semibold bg-orange-400/20 text-orange-300 border border-orange-400/30 mb-4">
              {lang === "hi" ? "लाइव डेमो" : "Live Demo"}
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-3">
              {lang === "hi" ? "BillKaro ऐप वॉकथ्रू" : "BillKaro App Walkthrough"}
            </h2>
            <p className="text-white/70 text-base md:text-lg">
              {lang === "hi"
                ? "Shyama आपको पूरे ऐप के बारे में बताएगी"
                : "Watch Shyama guide you through the complete app"}
            </p>
          </div>

          {!started ? (
            <div className="flex flex-col items-center gap-8">
              <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
                <div className="relative flex flex-col items-center">
                  <div className="shyama-idle">
                    <img
                      src="/assets/generated/shyama-cartoon-transparent.dim_400x500.png"
                      alt="Shyama"
                      className="w-36 md:w-48 drop-shadow-2xl"
                    />
                  </div>
                  <div
                    className="absolute -top-12 left-1/2 -translate-x-1/2 md:-translate-x-0 md:left-full md:top-8 bg-white text-gray-800 rounded-2xl px-4 py-2 text-xs font-medium shadow-xl max-w-[160px] text-center"
                    style={{ animation: "speechBubbleIn 0.5s ease both" }}
                  >
                    <span className="block">
                      {lang === "hi"
                        ? "नमस्ते! चलिए शुरू करते हैं!"
                        : "Hi! Let's get started!"}
                    </span>
                    <span
                      className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0"
                      style={{
                        borderLeft: "8px solid transparent",
                        borderRight: "8px solid transparent",
                        borderTop: "8px solid white",
                      }}
                    />
                  </div>
                </div>

                <div className="flex flex-col items-center md:items-start gap-4">
                  <div className="text-white/80 text-sm max-w-xs text-center md:text-left">
                    {lang === "hi"
                      ? "8 चरणों में BillKaro ऐप की पूरी जानकारी, Shyama की आवाज़ में"
                      : "A complete 8-step tour of BillKaro, narrated by Shyama"}
                  </div>
                  <div className="flex flex-wrap gap-2 max-w-sm">
                    {STEPS.map((s, i) => (
                      <span
                        key={s.screen}
                        className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-white/70 border border-white/10"
                      >
                        {i + 1}. {lang === "hi" ? s.titleHi : s.titleEn}
                      </span>
                    ))}
                  </div>
                  <button
                    type="button"
                    data-ocid="walkthrough.primary_button"
                    onClick={handleStart}
                    className="mt-2 px-8 py-3.5 rounded-2xl font-bold text-white text-base shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95"
                    style={{
                      background:
                        "linear-gradient(135deg, #f97316, #ec4899, #a855f7)",
                      boxShadow: "0 0 40px rgba(249,115,22,0.4)",
                    }}
                  >
                    {lang === "hi" ? "वॉकथ्रू शुरू करें" : "Start Walkthrough"}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-12">
              <div className="relative flex-shrink-0 flex flex-col items-center">
                <CartoonCharacter
                  isSpeaking={isSpeaking}
                  speechText={narration}
                  size="medium"
                  showSpeechBubble={true}
                />
              </div>

              <div className="flex-1 flex flex-col items-center gap-6">
                <div className="text-center">
                  <div className="text-orange-300 text-xs font-semibold mb-1">
                    {lang === "hi"
                      ? `चरण ${currentStep + 1} / ${STEPS.length}`
                      : `Step ${currentStep + 1} of ${STEPS.length}`}
                  </div>
                  <h3 className="text-2xl font-bold text-white">{title}</h3>
                </div>

                <div
                  className="relative"
                  style={{
                    width: 220,
                    height: 390,
                    borderRadius: "2rem",
                    border: "3px solid rgba(255,255,255,0.15)",
                    background: "#1a1a2e",
                    boxShadow:
                      "0 0 60px rgba(168,85,247,0.3), 0 25px 50px rgba(0,0,0,0.5)",
                    overflow: "hidden",
                  }}
                >
                  <div
                    className="absolute top-0 left-1/2 -translate-x-1/2 z-10"
                    style={{
                      width: 60,
                      height: 18,
                      borderRadius: "0 0 12px 12px",
                      background: "#1a1a2e",
                    }}
                  />
                  <div
                    key={`screen-${currentStep}`}
                    className={`absolute inset-0 ${screenAnim ? "screen-reveal" : "opacity-0"}`}
                    style={{ paddingTop: 22 }}
                  >
                    <ScreenComponent />
                  </div>
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 60%)",
                      borderRadius: "2rem",
                    }}
                  />
                </div>

                <div className="flex gap-2">
                  {STEPS.map((s, i) => (
                    <button
                      key={s.screen}
                      type="button"
                      data-ocid={`walkthrough.item.${i + 1}`}
                      onClick={() => {
                        stopTimers();
                        goToStep(i, true);
                      }}
                      className="transition-all duration-300"
                      style={{
                        width: i === currentStep ? 24 : 8,
                        height: 8,
                        borderRadius: 4,
                        background:
                          i === currentStep
                            ? "linear-gradient(90deg, #f97316, #a855f7)"
                            : "rgba(255,255,255,0.25)",
                      }}
                    />
                  ))}
                </div>

                <div className="w-full max-w-sm">
                  <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-none"
                      style={{
                        width: `${progress}%`,
                        background: "linear-gradient(90deg, #f97316, #a855f7)",
                      }}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    data-ocid="walkthrough.pagination_prev"
                    onClick={handlePrev}
                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all duration-200 hover:scale-110 text-sm"
                  >
                    ◀
                  </button>
                  <button
                    type="button"
                    data-ocid="walkthrough.toggle"
                    onClick={handlePauseResume}
                    className="px-5 py-2 rounded-full font-semibold text-sm text-white border border-white/20 bg-white/10 hover:bg-white/20 transition-all duration-200"
                  >
                    {paused
                      ? lang === "hi"
                        ? "जारी रखें"
                        : "Resume"
                      : lang === "hi"
                        ? "रोकें"
                        : "Pause"}
                  </button>
                  <button
                    type="button"
                    data-ocid="walkthrough.secondary_button"
                    onClick={handleRestart}
                    className="px-4 py-2 rounded-full font-semibold text-xs text-white/70 border border-white/10 hover:bg-white/10 transition-all duration-200"
                  >
                    {lang === "hi" ? "दोबारा शुरू करें" : "Restart"}
                  </button>
                  <button
                    type="button"
                    data-ocid="walkthrough.pagination_next"
                    onClick={handleNext}
                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all duration-200 hover:scale-110 text-sm"
                  >
                    ▶
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
