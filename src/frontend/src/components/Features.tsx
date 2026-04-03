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
import { motion } from "motion/react";
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

  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">
            {tr.feat_title}
          </h2>
          <p className="text-gray-500 text-lg">{tr.feat_sub}</p>
          <div className="mx-auto mt-4 w-16 h-1 rounded-full gradient-btn" />
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map(({ icon: Icon, gradient, key }, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="gradient-border-card group bg-white rounded-3xl shadow-card hover:shadow-[0_12px_40px_rgba(255,138,0,0.25)] hover:-translate-y-2 transition-all duration-300 p-6 border border-gray-100"
              data-ocid={`features.item.${i + 1}`}
            >
              <div
                className={`w-12 h-12 rounded-2xl ${gradient} flex items-center justify-center mb-4 shadow-md`}
              >
                <div className="icon-bounce">
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <h3 className="font-bold text-gray-900 text-base mb-2">
                {tr[`${key}_title` as keyof typeof tr]}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {tr[`${key}_desc` as keyof typeof tr]}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
