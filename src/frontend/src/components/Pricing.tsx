import { Calculator, Check, Star } from "lucide-react";
import { useEffect, useRef } from "react";
import type { Lang } from "../translations";
import { t } from "../translations";

interface PricingProps {
  lang: Lang;
}

export default function Pricing({ lang }: PricingProps) {
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

  const freeFeatures = [
    tr.pricing_free_f1,
    tr.pricing_free_f2,
    tr.pricing_free_f3,
    tr.pricing_free_f4,
    tr.pricing_free_f5,
  ];
  const paidFeatures = [
    tr.pricing_paid_f1,
    tr.pricing_paid_f2,
    tr.pricing_paid_f3,
    tr.pricing_paid_f4,
    tr.pricing_paid_f5,
  ];

  return (
    <section id="pricing" className="py-20 bg-gray-50" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 fade-in-up">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">
            {tr.pricing_title}
          </h2>
          <p className="text-gray-500 text-lg">{tr.pricing_sub}</p>
          <div className="mx-auto mt-4 w-16 h-1 rounded-full gradient-btn" />
        </div>

        {/* Bundle Highlight Box */}
        <div
          className="fade-in-up max-w-3xl mx-auto mb-10 rounded-3xl overflow-hidden shadow-float"
          style={{
            background:
              "linear-gradient(135deg, #FF8A00 0%, #E2367A 50%, #6C3FC5 100%)",
          }}
          data-ocid="pricing.bundle.card"
        >
          <div className="p-8 text-white">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                  <Calculator className="w-8 h-8 text-white" />
                </div>
              </div>
              <div className="flex-1 text-center sm:text-left">
                <h3 className="text-2xl sm:text-3xl font-extrabold mb-2">
                  {tr.pricing_bundle_title}
                </h3>
                <p className="text-white/80 text-sm sm:text-base mb-4">
                  {tr.pricing_bundle_sub}
                </p>
                {/* Calculator visual */}
                <div className="inline-flex items-center gap-2 bg-black/20 rounded-xl px-4 py-2">
                  <span className="font-mono text-lg sm:text-xl font-bold text-white">
                    {tr.pricing_bundle_highlight}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {/* Free card */}
          <div
            className="fade-in-up bg-white rounded-3xl shadow-card p-8 border border-gray-100"
            data-ocid="pricing.free.card"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-1">
              {tr.pricing_free_title}
            </h3>
            <p className="text-gray-500 text-sm mb-4">{tr.pricing_free_desc}</p>
            <div className="text-5xl font-extrabold text-gray-900 mb-1">
              {tr.pricing_free_price}
            </div>
            <div className="text-gray-400 text-sm mb-6">Forever free</div>
            <ul className="space-y-3 mb-8">
              {freeFeatures.map((f) => (
                <li
                  key={f}
                  className="flex items-center gap-3 text-sm text-gray-700"
                >
                  <span className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-green-600" />
                  </span>
                  {f}
                </li>
              ))}
            </ul>
            <a
              href="https://gst-invoice---grocery-io0.caffeine.xyz/"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center border-2 border-[#FF8A00] text-[#FF8A00] font-bold py-3 rounded-pill hover:bg-[#FF8A00] hover:text-white transition-colors"
              data-ocid="pricing.free.button"
            >
              {tr.pricing_free_cta}
            </a>
          </div>

          {/* Paid card (recommended) */}
          <div
            className="fade-in-up relative gradient-hero rounded-3xl shadow-float p-8 text-white"
            style={{ transitionDelay: "0.1s" }}
            data-ocid="pricing.paid.card"
          >
            <div className="absolute -top-4 left-1/2 -translate-x-1/2">
              <span className="bg-white text-[#E2367A] text-xs font-bold px-4 py-1.5 rounded-pill flex items-center gap-1 shadow-lg">
                <Star className="w-3 h-3 fill-[#E2367A]" />
                {tr.pricing_badge}
              </span>
            </div>
            <h3 className="text-xl font-bold mb-1">{tr.pricing_paid_title}</h3>
            <p className="text-white/80 text-sm mb-4">{tr.pricing_paid_desc}</p>
            <div className="flex items-end gap-1 mb-1">
              <span className="text-5xl font-extrabold">
                {tr.pricing_paid_price}
              </span>
              <span className="text-white/80 text-sm mb-2">
                {tr.pricing_paid_per}
              </span>
            </div>
            <div className="text-white/60 text-sm mb-6">Pay as you go</div>
            <ul className="space-y-3 mb-8">
              {paidFeatures.map((f) => (
                <li key={f} className="flex items-center gap-3 text-sm">
                  <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-white" />
                  </span>
                  {f}
                </li>
              ))}
            </ul>
            <a
              href="https://gst-invoice---grocery-io0.caffeine.xyz/"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center bg-white text-[#E2367A] font-bold py-3 rounded-pill hover:bg-gray-100 transition-colors shadow-lg"
              data-ocid="pricing.paid.button"
            >
              {tr.pricing_paid_cta}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
