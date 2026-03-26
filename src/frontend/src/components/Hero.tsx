import { ArrowRight, Download, MessageCircle } from "lucide-react";
import { motion } from "motion/react";
import type { Lang } from "../translations";
import { t } from "../translations";

interface HeroProps {
  lang: Lang;
  onOpenChat: () => void;
}

export default function Hero({ lang, onOpenChat }: HeroProps) {
  const tr = t[lang];

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center gradient-hero wave-bottom pt-16 overflow-hidden"
    >
      <div className="absolute top-20 left-10 w-72 h-72 bg-white/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-white/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="text-white"
          >
            <span className="inline-block bg-white/20 text-white text-xs font-bold px-4 py-1.5 rounded-pill mb-4 backdrop-blur-sm border border-white/20">
              <Download className="w-3 h-3 inline mr-1" />
              {tr.hero_badge}
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-4">
              {tr.hero_headline}
            </h1>

            <p className="text-lg sm:text-xl text-white/90 mb-2 font-medium">
              {tr.hero_sub}
            </p>
            <p className="text-base text-white/75 mb-8">{tr.hero_sub2}</p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://gst-invoice---grocery-io0.caffeine.xyz/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-white text-[#E2367A] font-bold px-8 py-4 rounded-pill text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-200"
                data-ocid="hero.primary_button"
              >
                {tr.hero_cta}
                <ArrowRight className="w-5 h-5" />
              </a>
              <button
                type="button"
                onClick={onOpenChat}
                className="inline-flex items-center justify-center gap-2 bg-white/15 backdrop-blur-sm border border-white/30 text-white font-semibold px-8 py-4 rounded-pill text-lg hover:bg-white/25 transition-all duration-200"
                data-ocid="hero.secondary_button"
              >
                <MessageCircle className="w-5 h-5" />
                {tr.hero_cta2}
              </button>
            </div>

            <div className="flex flex-wrap gap-6 mt-10">
              {[
                ["Free", "Download"],
                ["₹1", "Per Invoice"],
                ["GST", "Compliant"],
              ].map(([val, lbl]) => (
                <div key={val} className="text-center">
                  <div className="text-2xl font-extrabold text-white">
                    {val}
                  </div>
                  <div className="text-xs text-white/70 font-medium">{lbl}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="animate-float relative">
              <div className="phone-frame w-64 sm:w-72 lg:w-80">
                <img
                  src="/assets/uploads/img_3906-019d2b17-73c1-7082-ac32-bf9b6dd3ef5d-7.png"
                  alt="BillKaro Home Dashboard"
                  className="w-full block"
                />
              </div>
              <div className="absolute -right-4 top-8 bg-white rounded-2xl shadow-xl px-4 py-2 hidden lg:block">
                <div className="text-xs text-gray-500 font-medium">
                  Today's Sales
                </div>
                <div className="text-xl font-bold gradient-text">₹12,540</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
