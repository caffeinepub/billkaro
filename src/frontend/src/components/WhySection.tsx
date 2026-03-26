import { Package, Receipt, Smile } from "lucide-react";
import { useEffect, useRef } from "react";
import type { Lang } from "../translations";
import { t } from "../translations";

interface WhyProps {
  lang: Lang;
}

const CARDS = [
  { icon: Receipt, gradient: "gradient-card-1", key: "why_1" },
  { icon: Package, gradient: "gradient-card-2", key: "why_2" },
  { icon: Smile, gradient: "gradient-card-3", key: "why_3" },
];

function observeFadeElements(ref: React.RefObject<HTMLDivElement | null>) {
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
  return observer;
}

export default function WhySection({ lang }: WhyProps) {
  const tr = t[lang];
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = observeFadeElements(ref);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-20 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14 fade-in-up">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">
            {tr.why_title}
          </h2>
          <p className="text-gray-500 text-lg">{tr.why_sub}</p>
          <div className="mx-auto mt-4 w-16 h-1 rounded-full gradient-btn" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {CARDS.map(({ icon: Icon, gradient, key }, i) => (
            <div
              key={key}
              className="fade-in-up rounded-3xl bg-white shadow-card hover:shadow-card-hover transition-shadow duration-300 p-8 text-center border border-gray-100"
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <div
                className={`w-16 h-16 rounded-2xl ${gradient} flex items-center justify-center mx-auto mb-5 shadow-lg`}
              >
                <Icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {tr[`${key}_title` as keyof typeof tr]}
              </h3>
              <p className="text-gray-500 leading-relaxed">
                {tr[`${key}_desc` as keyof typeof tr]}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
