import { useActor } from "@caffeineai/core-infrastructure";
import { useEffect, useRef, useState } from "react";
import { createActor } from "./backend";
import AdminPanel from "./components/AdminPanel";
import Contact from "./components/Contact";
import Features from "./components/Features";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import InquiryForm from "./components/InquiryForm";
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

function useHashRoute() {
  const [hash, setHash] = useState(window.location.hash);
  useEffect(() => {
    const handler = () => setHash(window.location.hash);
    window.addEventListener("hashchange", handler);
    return () => window.removeEventListener("hashchange", handler);
  }, []);
  return hash;
}

function MainSite({
  lang,
  setLang,
}: { lang: Lang; setLang: (l: Lang) => void }) {
  const [chatOpen, setChatOpen] = useState(false);
  const { actor } = useActor(createActor);
  const visitRecorded = useRef(false);

  useEffect(() => {
    if (!actor || visitRecorded.current) return;
    visitRecorded.current = true;
    // Record visit — detect city via geolocation, fallback to "Unknown"
    const recordWithCity = (city: string) => {
      actor.recordVisit(city).catch(() => {
        /* ignore */
      });
    };
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          try {
            const res = await fetch(
              `https://nominatim.openstreetmap.org/reverse?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&format=json`,
            );
            const data = (await res.json()) as {
              address?: { city?: string; town?: string; village?: string };
            };
            const city =
              data.address?.city ||
              data.address?.town ||
              data.address?.village ||
              "Unknown";
            recordWithCity(city);
          } catch {
            recordWithCity("Unknown");
          }
        },
        () => recordWithCity("Unknown"),
      );
    } else {
      recordWithCity("Unknown");
    }
  }, [actor]);

  return (
    <div className="font-poppins">
      <Navbar
        lang={lang}
        onLangChange={setLang}
        onOpenChat={() => setChatOpen(true)}
      />
      {/* pt-16 pushes the banner below the fixed 64px navbar */}
      <div className="pt-16">
        <OfferBanner lang={lang} />
      </div>
      <main>
        <Hero lang={lang} onOpenChat={() => setChatOpen(true)} />
        <WhySection lang={lang} />
        <Features lang={lang} />
        <WalkthroughDemo lang={lang} />
        <Testimonials lang={lang} />
        <Pricing lang={lang} />
        <Contact lang={lang} />
        <InquiryForm lang={lang} />
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

export default function App() {
  const [lang, setLang] = useState<Lang>("en");
  const hash = useHashRoute();

  if (hash === "#admin") {
    return (
      <AdminPanel
        onBack={() => {
          window.location.hash = "";
          window.location.reload();
        }}
      />
    );
  }

  return <MainSite lang={lang} setLang={setLang} />;
}
