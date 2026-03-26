import { Zap } from "lucide-react";
import type { Lang } from "../translations";
import { t } from "../translations";

interface FooterProps {
  lang: Lang;
}

export default function Footer({ lang }: FooterProps) {
  const tr = t[lang];

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-[#170C2F] text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-9 h-9 rounded-xl gradient-btn flex items-center justify-center">
                <Zap className="w-5 h-5 text-white fill-white" />
              </div>
              <span className="text-white font-bold text-xl">
                Bill<span className="text-[#FF8A00]">Karo</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm">{tr.footer_tagline}</p>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-2">
            {["features", "screenshots", "pricing", "contact"].map((sec) => (
              <button
                type="button"
                key={sec}
                onClick={() => scrollTo(sec)}
                className="text-gray-400 hover:text-white text-sm text-left transition-colors"
              >
                {tr[`nav_${sec}` as keyof typeof tr]}
              </button>
            ))}
          </div>

          {/* Contact */}
          <div>
            <p className="text-gray-400 text-sm">{tr.footer_contact}</p>
            <a
              href="https://wa.me/917023285769"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 mt-2 text-[#25D366] text-sm hover:text-[#1ebe58] transition-colors"
            >
              WhatsApp Support
            </a>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 text-center">
          <p className="text-gray-500 text-sm">{tr.footer_copy}</p>
        </div>
      </div>
    </footer>
  );
}
