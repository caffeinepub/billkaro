import { useEffect, useRef, useState } from "react";
import type { Lang } from "../translations";
import { t } from "../translations";

interface HowToProps {
  lang: Lang;
}

interface Step {
  title: string;
  desc: string;
  icon: string;
}

const addProductSteps: Record<Lang, Step[]> = {
  en: [
    {
      icon: "📱",
      title: "Open BillKaro App",
      desc: "Launch the app on your phone",
    },
    {
      icon: "🗂",
      title: "Go to Products",
      desc: 'Tap "Products" from the bottom navigation',
    },
    {
      icon: "➕",
      title: "Tap Add Product",
      desc: 'Press the "+" button in the top right',
    },
    {
      icon: "📝",
      title: "Fill Product Details",
      desc: "Enter name, price, HSN code, and SKU",
    },
    {
      icon: "✅",
      title: "Save Product",
      desc: 'Tap "Save" and the product is ready for billing',
    },
  ],
  hi: [
    { icon: "📱", title: "BillKaro ऐप खोलें", desc: "अपने फोन पर ऐप लॉन्च करें" },
    {
      icon: "🗂",
      title: "Products पर जाएं",
      desc: 'नीचे नेविगेशन से "Products" टैप करें',
    },
    { icon: "➕", title: "Add Product टैप करें", desc: 'ऊपर दाईं ओर "+" बटन दबाएं' },
    {
      icon: "📝",
      title: "प्रोडक्ट डिटेल्स भरें",
      desc: "नाम, कीमत, HSN कोड और SKU डालें",
    },
    {
      icon: "✅",
      title: "प्रोडक्ट सेव करें",
      desc: '"Save" टैप करें और प्रोडक्ट बिलिंग के लिए तैयार है',
    },
  ],
  raj: [
    { icon: "📱", title: "BillKaro ऐप खोलो", desc: "थारे फोन पर ऐप चालू करो" },
    {
      icon: "🗂",
      title: "Products पर जाओ",
      desc: 'नीचे नेविगेशन सूं "Products" टैप करो',
    },
    {
      icon: "➕",
      title: "Add Product टैप करो",
      desc: 'ऊपर दाईं तरफ "+" बटन दबाओ',
    },
    {
      icon: "📝",
      title: "प्रोडक्ट डिटेल्स भरो",
      desc: "नाम, भाव, HSN कोड और SKU डालो",
    },
    {
      icon: "✅",
      title: "प्रोडक्ट सेव करो",
      desc: '"Save" टैप करो और प्रोडक्ट बिलिंग खातर तैयार',
    },
  ],
  gu: [
    { icon: "📱", title: "BillKaro એપ ખોલો", desc: "તમારા ફોન પર એપ શરૂ કરો" },
    {
      icon: "🗂",
      title: "Products પર જાઓ",
      desc: 'નીચેની નેવિગેશનથી "Products" ટૅપ કરો',
    },
    {
      icon: "➕",
      title: "Add Product ટૅપ કરો",
      desc: 'ઉપર જમણી બાજુ "+" બટન દબાવો',
    },
    {
      icon: "📝",
      title: "પ્રોડક્ટ વિગત ભરો",
      desc: "નામ, કિંમત, HSN કોડ અને SKU દાખલ કરો",
    },
    {
      icon: "✅",
      title: "પ્રોડક્ટ સેવ કરો",
      desc: '"Save" ટૅપ કરો અને પ્રોડક્ટ બિલિંગ માટે તૈયાર',
    },
  ],
};

const generateBillSteps: Record<Lang, Step[]> = {
  en: [
    {
      icon: "📱",
      title: "Open BillKaro App",
      desc: "Launch the app on your phone",
    },
    {
      icon: "🧾",
      title: "Tap New Invoice",
      desc: 'Press "New Invoice" on the home screen',
    },
    {
      icon: "👤",
      title: "Add Customer Details",
      desc: "Enter customer name and GSTIN (optional)",
    },
    {
      icon: "🛒",
      title: "Add Products",
      desc: "Search or scan barcode to add products to bill",
    },
    {
      icon: "💳",
      title: "Choose Payment Mode",
      desc: "Select Cash, Card, or UPI",
    },
    {
      icon: "📤",
      title: "Generate & Share",
      desc: 'Tap "Generate Invoice" to create and share the GST bill',
    },
  ],
  hi: [
    { icon: "📱", title: "BillKaro ऐप खोलें", desc: "अपने फोन पर ऐप लॉन्च करें" },
    {
      icon: "🧾",
      title: "New Invoice टैप करें",
      desc: 'होम स्क्रीन पर "New Invoice" दबाएं',
    },
    {
      icon: "👤",
      title: "कस्टमर डिटेल्स डालें",
      desc: "ग्राहक का नाम और GSTIN (वैकल्पिक) डालें",
    },
    {
      icon: "🛒",
      title: "प्रोडक्ट जोड़ें",
      desc: "बारकोड स्कैन करें या खोजकर प्रोडक्ट जोड़ें",
    },
    { icon: "💳", title: "पेमेंट मोड चुनें", desc: "Cash, Card या UPI सेलेक्ट करें" },
    {
      icon: "📤",
      title: "बिल बनाएं और शेयर करें",
      desc: '"Generate Invoice" टैप करें और GST बिल बनाएं',
    },
  ],
  raj: [
    { icon: "📱", title: "BillKaro ऐप खोलो", desc: "थारे फोन पर ऐप चालू करो" },
    {
      icon: "🧾",
      title: "New Invoice टैप करो",
      desc: 'होम स्क्रीन पर "New Invoice" दबाओ',
    },
    {
      icon: "👤",
      title: "कस्टमर डिटेल्स डालो",
      desc: "ग्राहक रो नाम और GSTIN (वैकल्पिक) डालो",
    },
    {
      icon: "🛒",
      title: "प्रोडक्ट जोड़ो",
      desc: "बारकोड स्कैन करो या खोज'र प्रोडक्ट जोड़ो",
    },
    { icon: "💳", title: "पेमेंट मोड चुणो", desc: "Cash, Card या UPI सेलेक्ट करो" },
    {
      icon: "📤",
      title: "बिल बणाओ और शेयर करो",
      desc: '"Generate Invoice" टैप करो और GST बिल बणाओ',
    },
  ],
  gu: [
    { icon: "📱", title: "BillKaro એપ ખોલો", desc: "તમારા ફોન પર એપ શરૂ કરો" },
    {
      icon: "🧾",
      title: "New Invoice ટૅપ કરો",
      desc: 'હોમ સ્ક્રીન પર "New Invoice" દબાવો',
    },
    {
      icon: "👤",
      title: "ગ્રાહક વિગત ઉમેરો",
      desc: "ગ્રાહકનું નામ અને GSTIN (વૈકલ્પિક) દાખલ કરો",
    },
    {
      icon: "🛒",
      title: "પ્રોડક્ટ ઉમેરો",
      desc: "બારકોડ સ્કૅન કરો અથવા શોધીને પ્રોડક્ટ ઉમેરો",
    },
    {
      icon: "💳",
      title: "ચુકવણી મોડ પસંદ કરો",
      desc: "Cash, Card અથવા UPI પસંદ કરો",
    },
    {
      icon: "📤",
      title: "બિલ બનાવો અને શેર કરો",
      desc: '"Generate Invoice" ટૅપ કરો અને GST બિલ બનાવો',
    },
  ],
};

const STEP_DURATION = 3000;

export default function HowTo({ lang }: HowToProps) {
  const tr = t[lang];
  const [activeTab, setActiveTab] = useState<"product" | "bill">("product");
  const [activeStep, setActiveStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);
  const [animDir, setAnimDir] = useState<"in" | "out">("in");
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const steps =
    activeTab === "product" ? addProductSteps[lang] : generateBillSteps[lang];

  const goToStep = (idx: number) => {
    setAnimDir("out");
    setTimeout(() => {
      setActiveStep(idx);
      setProgress(0);
      setAnimDir("in");
    }, 200);
  };

  const switchTab = (tab: "product" | "bill") => {
    setActiveTab(tab);
    setAnimDir("out");
    setTimeout(() => {
      setActiveStep(0);
      setProgress(0);
      setAnimDir("in");
    }, 200);
  };

  useEffect(() => {
    if (paused) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (progressRef.current) clearInterval(progressRef.current);
      return;
    }

    setProgress(0);

    progressRef.current = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) return 100;
        return p + 100 / (STEP_DURATION / 50);
      });
    }, 50);

    intervalRef.current = setInterval(() => {
      setActiveStep((prev) => {
        const next = (prev + 1) % steps.length;
        setAnimDir("out");
        setTimeout(() => {
          setAnimDir("in");
        }, 200);
        setProgress(0);
        return next;
      });
    }, STEP_DURATION);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (progressRef.current) clearInterval(progressRef.current);
    };
  }, [paused, steps.length]);

  const stepColors = [
    "from-orange-400 to-orange-600",
    "from-pink-400 to-pink-600",
    "from-purple-400 to-purple-600",
    "from-blue-400 to-blue-600",
    "from-teal-400 to-teal-600",
    "from-green-400 to-green-600",
  ];

  const pausedLabel =
    lang === "en"
      ? "Paused"
      : lang === "hi"
        ? "रुका हुआ"
        : lang === "raj"
          ? "रुक्यो"
          : "થોભ્યો";
  const advancingLabel =
    lang === "en"
      ? "Auto-advancing..."
      : lang === "hi"
        ? "अगले चरण पर जा रहा है..."
        : lang === "raj"
          ? "आगे जा रह्यो..."
          : "આગળ જઈ રહ્યો છે...";

  return (
    <section
      id="howto"
      className="py-16 bg-gradient-to-br from-orange-500 via-pink-500 to-purple-600"
    >
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            {tr.howto_title}
          </h2>
          <p className="text-white/80 text-lg">{tr.howto_sub}</p>
        </div>

        <div className="flex justify-center gap-4 mb-10">
          <button
            type="button"
            data-ocid="howto.tab"
            onClick={() => switchTab("product")}
            className={`px-6 py-3 rounded-full font-semibold text-sm md:text-base transition-all duration-300 ${
              activeTab === "product"
                ? "bg-white text-orange-600 shadow-lg scale-105"
                : "bg-white/20 text-white hover:bg-white/30"
            }`}
          >
            {tr.howto_tab_product}
          </button>
          <button
            type="button"
            data-ocid="howto.tab"
            onClick={() => switchTab("bill")}
            className={`px-6 py-3 rounded-full font-semibold text-sm md:text-base transition-all duration-300 ${
              activeTab === "bill"
                ? "bg-white text-purple-600 shadow-lg scale-105"
                : "bg-white/20 text-white hover:bg-white/30"
            }`}
          >
            {tr.howto_tab_bill}
          </button>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {steps.map((step, idx) => (
            <button
              type="button"
              key={step.title}
              data-ocid={`howto.item.${idx + 1}`}
              onClick={() => goToStep(idx)}
              className={`flex items-center gap-2 px-3 py-2 rounded-full text-xs font-semibold transition-all duration-300 ${
                activeStep === idx
                  ? "bg-white text-purple-700 shadow-md scale-105"
                  : "bg-white/20 text-white hover:bg-white/30"
              }`}
            >
              <span
                className={`w-5 h-5 rounded-full bg-gradient-to-br ${stepColors[idx % stepColors.length]} text-white flex items-center justify-center text-xs font-bold`}
              >
                {idx + 1}
              </span>
              <span className="hidden sm:inline">{step.title}</span>
              <span className="sm:hidden">{idx + 1}</span>
            </button>
          ))}
        </div>

        <div
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          className="relative"
        >
          <div
            className={`bg-white rounded-3xl shadow-2xl p-8 md:p-12 transition-all duration-300 ${
              animDir === "in"
                ? "opacity-100 translate-y-0 scale-100"
                : "opacity-0 translate-y-4 scale-95"
            }`}
          >
            <div className="flex items-center gap-4 mb-6">
              <div
                className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${stepColors[activeStep % stepColors.length]} flex items-center justify-center shadow-lg`}
              >
                <span className="text-3xl">{steps[activeStep]?.icon}</span>
              </div>
              <div>
                <div className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
                  {tr.howto_step} {activeStep + 1} / {steps.length}
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-800">
                  {steps[activeStep]?.title}
                </h3>
              </div>
            </div>

            <p className="text-gray-600 text-base md:text-lg leading-relaxed">
              {steps[activeStep]?.desc}
            </p>

            <div className="mt-8">
              <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className={`h-full bg-gradient-to-r ${stepColors[activeStep % stepColors.length]} rounded-full transition-none`}
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex justify-between mt-2 text-xs text-gray-400">
                <span>{paused ? pausedLabel : advancingLabel}</span>
                <span>
                  {activeStep + 1}/{steps.length}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-4 mt-6">
          <button
            type="button"
            data-ocid="howto.pagination_prev"
            onClick={() =>
              goToStep((activeStep - 1 + steps.length) % steps.length)
            }
            className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center transition-all duration-200 hover:scale-110"
          >
            &#8592;
          </button>
          <button
            type="button"
            data-ocid="howto.pagination_next"
            onClick={() => goToStep((activeStep + 1) % steps.length)}
            className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center transition-all duration-200 hover:scale-110"
          >
            &#8594;
          </button>
        </div>
      </div>
    </section>
  );
}
