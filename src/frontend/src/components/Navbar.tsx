import { Menu, X, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import type { Lang } from "../translations";
import { t } from "../translations";

interface NavbarProps {
  lang: Lang;
  onLangChange: (l: Lang) => void;
  onOpenChat: () => void;
}

const LANGS: { code: Lang; label: string }[] = [
  { code: "en", label: "EN" },
  { code: "hi", label: "HI" },
  { code: "raj", label: "RAJ" },
  { code: "gu", label: "GUJ" },
];

export default function Navbar({
  lang,
  onLangChange,
  onOpenChat,
}: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const tr = t[lang];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-[#170C2F] shadow-lg" : "bg-[#170C2F]/95"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            type="button"
            className="flex items-center gap-2 cursor-pointer bg-transparent border-0 p-0"
            onClick={() => scrollTo("hero")}
          >
            <div className="w-9 h-9 rounded-xl gradient-btn flex items-center justify-center shadow-lg">
              <Zap className="w-5 h-5 text-white fill-white" />
            </div>
            <span className="text-white font-bold text-xl">
              Bill<span className="text-[#FF8A00]">Karo</span>
            </span>
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            {["features", "screenshots", "pricing", "contact"].map((sec) => (
              <button
                type="button"
                key={sec}
                onClick={() => scrollTo(sec)}
                className="text-gray-300 hover:text-white text-sm font-medium transition-colors relative nav-link"
                data-ocid={`nav.${sec}.link`}
              >
                {tr[`nav_${sec}` as keyof typeof tr]}
              </button>
            ))}
          </div>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-3">
            {/* Language switcher */}
            <div className="flex items-center bg-white/10 rounded-pill overflow-hidden">
              {LANGS.map(({ code, label }) => (
                <button
                  key={code}
                  type="button"
                  onClick={() => onLangChange(code)}
                  className={`px-2.5 py-1.5 text-xs font-semibold transition-colors ${
                    lang === code
                      ? "bg-[#FF8A00] text-white"
                      : "text-gray-300 hover:text-white"
                  }`}
                  data-ocid={`nav.${code}.toggle`}
                >
                  {label}
                </button>
              ))}
            </div>
            <a
              href="https://gst-invoice---grocery-io0.caffeine.xyz/"
              target="_blank"
              rel="noopener noreferrer"
              className="gradient-btn text-white text-sm font-semibold px-5 py-2 rounded-pill hover:opacity-90 transition-opacity shadow-md"
              data-ocid="nav.cta.button"
            >
              {tr.nav_cta}
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="md:hidden text-white p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            data-ocid="nav.hamburger.button"
          >
            {menuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#170C2F] border-t border-white/10 px-4 pb-4">
          <div className="flex flex-col gap-3 pt-3">
            {["features", "screenshots", "pricing", "contact"].map((sec) => (
              <button
                type="button"
                key={sec}
                onClick={() => scrollTo(sec)}
                className="text-gray-300 hover:text-white text-sm font-medium text-left py-2"
              >
                {tr[`nav_${sec}` as keyof typeof tr]}
              </button>
            ))}
            {/* Mobile lang toggle — 2x2 grid */}
            <div className="grid grid-cols-4 gap-1 mt-2">
              {LANGS.map(({ code, label }) => (
                <button
                  key={code}
                  type="button"
                  onClick={() => onLangChange(code)}
                  className={`py-2 text-xs font-semibold rounded-lg transition-colors ${
                    lang === code
                      ? "bg-[#FF8A00] text-white"
                      : "bg-white/10 text-gray-300"
                  }`}
                  data-ocid={`nav.mobile.${code}.toggle`}
                >
                  {label}
                </button>
              ))}
            </div>
            <a
              href="https://gst-invoice---grocery-io0.caffeine.xyz/"
              target="_blank"
              rel="noopener noreferrer"
              className="gradient-btn text-white text-sm font-semibold px-5 py-3 rounded-pill text-center mt-1"
            >
              {tr.nav_cta}
            </a>
            <button
              type="button"
              onClick={() => {
                setMenuOpen(false);
                onOpenChat();
              }}
              className="text-[#FF8A00] text-sm font-medium py-2 text-left"
            >
              {tr.hero_cta2}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
