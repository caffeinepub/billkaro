import { useState } from "react";
import Contact from "./components/Contact";
import Features from "./components/Features";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import OfferBanner from "./components/OfferBanner";
import Pricing from "./components/Pricing";
import PushNotificationBar from "./components/PushNotificationBar";
import ShyamaAI from "./components/ShyamaAI";
import Testimonials from "./components/Testimonials";
import WalkthroughDemo from "./components/WalkthroughDemo";
import WhySection from "./components/WhySection";
import { Toaster } from "./components/ui/sonner";
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
      <OfferBanner lang={lang} />
      <main>
        <Hero lang={lang} onOpenChat={() => setChatOpen(true)} />
        <WhySection lang={lang} />
        <Features lang={lang} />
        <WalkthroughDemo lang={lang} />
        <Testimonials lang={lang} />
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
      <PushNotificationBar lang={lang} />
      <Toaster />
    </div>
  );
}
