import {
  Archive,
  BarChart2,
  Coins,
  CreditCard,
  Download,
  Package,
  Receipt,
  Settings,
} from "lucide-react";
import { useEffect, useRef } from "react";
import type { Lang } from "../translations";
import { t } from "../translations";

interface FeaturesProps {
  lang: Lang;
}

const FEATURES = [
  { icon: Receipt, gradient: "gradient-card-1", key: "feat_1" },
  { icon: Package, gradient: "gradient-card-2", key: "feat_2" },
  { icon: Settings, gradient: "gradient-card-3", key: "feat_3" },
  { icon: Archive, gradient: "gradient-card-4", key: "feat_4" },
  { icon: Download, gradient: "gradient-card-5", key: "feat_5" },
  { icon: CreditCard, gradient: "gradient-card-6", key: "feat_6" },
  { icon: Coins, gradient: "gradient-card-7", key: "feat_7" },
  { icon: BarChart2, gradient: "gradient-card-8", key: "feat_8" },
];

export default function Features({ lang }: FeaturesProps) {
  const tr = t[lang];
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) e.target.classList.add("visible");
        }
      },
      { threshold: 0.1 },
    );
    const els = ref.current?.querySelectorAll(".fade-in-up");
    if (els) {
      for (const el of els) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <section id="features" className="py-20 bg-gray-50" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14 fade-in-up">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">
            {tr.feat_title}
          </h2>
          <p className="text-gray-500 text-lg">{tr.feat_sub}</p>
          <div className="mx-auto mt-4 w-16 h-1 rounded-full gradient-btn" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map(({ icon: Icon, gradient, key }, i) => (
            <div
              key={key}
              className="fade-in-up bg-white rounded-3xl shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 p-6 border border-gray-100"
              style={{ transitionDelay: `${i * 0.07}s` }}
              data-ocid={`features.item.${i + 1}`}
            >
              <div
                className={`w-12 h-12 rounded-2xl ${gradient} flex items-center justify-center mb-4 shadow-md`}
              >
                <Icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 text-base mb-2">
                {tr[`${key}_title` as keyof typeof tr]}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {tr[`${key}_desc` as keyof typeof tr]}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
