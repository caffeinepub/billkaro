import { useState } from "react";
import Contact from "./components/Contact";
import Features from "./components/Features";
import FlipbookDemo from "./components/FlipbookDemo";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import HowTo from "./components/HowTo";
import Navbar from "./components/Navbar";
import Pricing from "./components/Pricing";
import Screenshots from "./components/Screenshots";
import ShyamaAI from "./components/ShyamaAI";
import WalkthroughDemo from "./components/WalkthroughDemo";
import WhySection from "./components/WhySection";
import type { Lang } from "./translations";

export default function App() {
  const [lang, setLang] = useState<Lang>("en");
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <div className="font-poppins">
      <Navbar
        lang={lang}
        onLangChange={setLang}
        onOpenChat={() => setChatOpen(true)}
      />
      <main>
        <Hero lang={lang} onOpenChat={() => setChatOpen(true)} />
        <WhySection lang={lang} />
        <Features lang={lang} />
        <Screenshots lang={lang} />
        <HowTo lang={lang} />
        <WalkthroughDemo lang={lang} />
        <FlipbookDemo lang={lang} />
        <Pricing lang={lang} />
        <Contact lang={lang} />
      </main>
      <Footer lang={lang} />
      <ShyamaAI
        lang={lang}
        onLangChange={setLang}
        isOpen={chatOpen}
        onToggle={() => setChatOpen((v) => !v)}
      />
    </div>
  );
}
