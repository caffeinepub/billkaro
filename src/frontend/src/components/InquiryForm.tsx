import { useActor } from "@caffeineai/core-infrastructure";
import {
  CheckCircle,
  Loader2,
  MapPin,
  MessageSquare,
  Phone,
  User,
} from "lucide-react";
import { motion } from "motion/react";
import { useRef, useState } from "react";
import { createActor } from "../backend";
import type { Lang } from "../translations";

interface InquiryFormProps {
  lang: Lang;
}

const LABELS: Record<
  Lang,
  {
    section_title: string;
    section_sub: string;
    name: string;
    name_placeholder: string;
    phone: string;
    phone_placeholder: string;
    phone_hint: string;
    city: string;
    city_placeholder: string;
    detect_city: string;
    detecting: string;
    message: string;
    message_placeholder: string;
    submit: string;
    submitting: string;
    success_title: string;
    success_sub: string;
    error: string;
  }
> = {
  en: {
    section_title: "Send Us an Inquiry",
    section_sub:
      "Have a question or want a demo? Drop us a message and we'll get back to you on WhatsApp.",
    name: "Full Name",
    name_placeholder: "Your full name",
    phone: "Phone Number",
    phone_placeholder: "10-digit mobile number",
    phone_hint: "We'll contact you on WhatsApp",
    city: "City (optional)",
    city_placeholder: "Your city",
    detect_city: "Detect My City",
    detecting: "Detecting…",
    message: "Your Message",
    message_placeholder: "Tell us what you need — demo, pricing, features…",
    submit: "Send Inquiry",
    submitting: "Sending…",
    success_title: "Inquiry Sent!",
    success_sub:
      "We received your message and will contact you on WhatsApp soon.",
    error: "Something went wrong. Please try again.",
  },
  hi: {
    section_title: "हमसे पूछताछ करें",
    section_sub:
      "कोई सवाल है या डेमो चाहिए? हमें मैसेज करें और हम WhatsApp पर जवाब देंगे।",
    name: "पूरा नाम",
    name_placeholder: "आपका पूरा नाम",
    phone: "फोन नंबर",
    phone_placeholder: "10 अंकों का मोबाइल नंबर",
    phone_hint: "हम आपसे WhatsApp पर संपर्क करेंगे",
    city: "शहर (वैकल्पिक)",
    city_placeholder: "आपका शहर",
    detect_city: "मेरा शहर पहचानें",
    detecting: "पहचान रहे हैं…",
    message: "आपका संदेश",
    message_placeholder: "डेमो, प्राइसिंग, फीचर — जो चाहें पूछें…",
    submit: "पूछताछ भेजें",
    submitting: "भेज रहे हैं…",
    success_title: "पूछताछ भेजी गई!",
    success_sub: "हमें आपका संदेश मिल गया, जल्द ही WhatsApp पर संपर्क करेंगे।",
    error: "कुछ गलत हुआ। कृपया पुनः प्रयास करें।",
  },
  raj: {
    section_title: "सवाल पूछो",
    section_sub: "कोई सवाल है या डेमो चाइजे? मैसेज करो, WhatsApp पर जवाब देसां।",
    name: "पूरो नाम",
    name_placeholder: "थारो पूरो नाम",
    phone: "मोबाइल नंबर",
    phone_placeholder: "10 अंक वाळो मोबाइल नंबर",
    phone_hint: "थाने WhatsApp पर बात करसां",
    city: "शहर (जरूरी कोनी)",
    city_placeholder: "थारो शहर",
    detect_city: "मेरो शहर पकड़ो",
    detecting: "पकड़ रह्या हां…",
    message: "थारो संदेश",
    message_placeholder: "डेमो, प्राइस, फीचर — जो चाइजे पूछो…",
    submit: "सवाल भेजो",
    submitting: "भेज रह्या हां…",
    success_title: "सवाल भेज दियो!",
    success_sub: "थारो मैसेज मिल गयो, जल्दी WhatsApp पर बात करसां।",
    error: "कुछ गड़बड़ होगी। फिर कोशिश करो।",
  },
  gu: {
    section_title: "અમને પૂછો",
    section_sub: "કોઈ સવાલ છે કે ડેમો જોઈએ? મેસેજ કરો, WhatsApp પર જવાબ આપીશું.",
    name: "પૂરું નામ",
    name_placeholder: "તમારું પૂરું નામ",
    phone: "ફોન નંબર",
    phone_placeholder: "10 અંકનો મોબાઇલ નંબર",
    phone_hint: "અમે WhatsApp પર સંપર્ક કરીશું",
    city: "શહેર (વૈકલ્પિક)",
    city_placeholder: "તમારું શહેર",
    detect_city: "મારું શહેર શોધો",
    detecting: "શોધી રહ્યા છીએ…",
    message: "તમારો સંદેશ",
    message_placeholder: "ડેમો, ભાવ, ફીચર — જે જોઈએ પૂછો…",
    submit: "પૂછો",
    submitting: "મોકલી રહ્યા છીએ…",
    success_title: "સવાલ મોકલ્યો!",
    success_sub: "અમને તમારો સંદેશ મળ્યો, WhatsApp પર ટૂંક સમયમાં સંપર્ક કરીશું.",
    error: "કંઈક ખોટું થયું. ફરી પ્રયાસ કરો.",
  },
};

export default function InquiryForm({ lang }: InquiryFormProps) {
  const lb = LABELS[lang];
  const { actor } = useActor(createActor);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [message, setMessage] = useState("");
  const [detecting, setDetecting] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const formRef = useRef<HTMLFormElement>(null);

  const detectCity = () => {
    if (!navigator.geolocation) return;
    setDetecting(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&format=json`,
          );
          const data = (await res.json()) as {
            address?: {
              city?: string;
              town?: string;
              village?: string;
              state_district?: string;
            };
          };
          const addr = data.address;
          const detectedCity =
            addr?.city ||
            addr?.town ||
            addr?.village ||
            addr?.state_district ||
            "";
          setCity(detectedCity);
        } catch {
          /* ignore */
        } finally {
          setDetecting(false);
        }
      },
      () => setDetecting(false),
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!actor) return;
    setSubmitting(true);
    setError("");
    try {
      await actor.submitContact(
        name.trim(),
        phone.trim(),
        city.trim() || "Unknown",
        message.trim(),
      );
      setSuccess(true);
      setName("");
      setPhone("");
      setCity("");
      setMessage("");
    } catch (err) {
      console.error(err);
      setError(lb.error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="inquiry" className="py-20 bg-[#0E0621]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">
            {lb.section_title}
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            {lb.section_sub}
          </p>
          <div className="mx-auto mt-4 w-16 h-1 rounded-full gradient-btn" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.15 }}
        >
          {success ? (
            <div
              className="rounded-3xl p-12 flex flex-col items-center gap-4 text-center"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,138,0,0.12) 0%, rgba(106,43,217,0.18) 100%)",
                border: "1px solid rgba(255,138,0,0.25)",
              }}
              data-ocid="inquiry.success.banner"
            >
              <CheckCircle className="w-16 h-16 text-[#FF8A00]" />
              <h3 className="text-2xl font-bold text-white">
                {lb.success_title}
              </h3>
              <p className="text-gray-300">{lb.success_sub}</p>
              <button
                type="button"
                onClick={() => setSuccess(false)}
                className="mt-4 gradient-btn text-white font-semibold px-8 py-3 rounded-pill hover:opacity-90 transition-opacity shadow-lg"
              >
                {lb.submit}
              </button>
            </div>
          ) : (
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="rounded-3xl p-8 sm:p-10 flex flex-col gap-6"
              style={{
                background:
                  "linear-gradient(145deg, rgba(255,138,0,0.08) 0%, rgba(106,43,217,0.14) 100%)",
                border: "1px solid rgba(255,255,255,0.10)",
              }}
              data-ocid="inquiry.form"
            >
              {/* Name */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="inq-name"
                  className="text-gray-300 text-sm font-semibold flex items-center gap-2"
                >
                  <User className="w-4 h-4 text-[#FF8A00]" />
                  {lb.name} <span className="text-[#E2367A]">*</span>
                </label>
                <input
                  id="inq-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={lb.name_placeholder}
                  className="bg-white/8 border border-white/15 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FF8A00]/50 focus:border-[#FF8A00]/60 transition-all"
                  data-ocid="inquiry.name.input"
                  style={{ background: "rgba(255,255,255,0.06)" }}
                />
              </div>

              {/* Phone */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="inq-phone"
                  className="text-gray-300 text-sm font-semibold flex items-center gap-2"
                >
                  <Phone className="w-4 h-4 text-[#FF8A00]" />
                  {lb.phone} <span className="text-[#E2367A]">*</span>
                </label>
                <input
                  id="inq-phone"
                  type="tel"
                  required
                  pattern="[0-9]{10,13}"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder={lb.phone_placeholder}
                  className="bg-white/8 border border-white/15 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FF8A00]/50 focus:border-[#FF8A00]/60 transition-all"
                  data-ocid="inquiry.phone.input"
                  style={{ background: "rgba(255,255,255,0.06)" }}
                />
                <p className="text-xs text-[#25D366] flex items-center gap-1">
                  <MessageSquare className="w-3 h-3" />
                  {lb.phone_hint}
                </p>
              </div>

              {/* City */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="inq-city"
                  className="text-gray-300 text-sm font-semibold flex items-center gap-2"
                >
                  <MapPin className="w-4 h-4 text-[#FF8A00]" />
                  {lb.city}
                </label>
                <div className="flex gap-3">
                  <input
                    id="inq-city"
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder={lb.city_placeholder}
                    className="flex-1 border border-white/15 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FF8A00]/50 focus:border-[#FF8A00]/60 transition-all"
                    data-ocid="inquiry.city.input"
                    style={{ background: "rgba(255,255,255,0.06)" }}
                  />
                  <button
                    type="button"
                    onClick={detectCity}
                    disabled={detecting}
                    className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold text-white border border-[#6A2BD9]/50 hover:border-[#FF8A00]/60 transition-all disabled:opacity-60 whitespace-nowrap"
                    style={{ background: "rgba(106,43,217,0.25)" }}
                    data-ocid="inquiry.detect-city.button"
                  >
                    {detecting ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <MapPin className="w-4 h-4" />
                    )}
                    <span className="hidden sm:inline">
                      {detecting ? lb.detecting : lb.detect_city}
                    </span>
                  </button>
                </div>
              </div>

              {/* Message */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="inq-message"
                  className="text-gray-300 text-sm font-semibold flex items-center gap-2"
                >
                  <MessageSquare className="w-4 h-4 text-[#FF8A00]" />
                  {lb.message} <span className="text-[#E2367A]">*</span>
                </label>
                <textarea
                  id="inq-message"
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={lb.message_placeholder}
                  className="border border-white/15 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FF8A00]/50 focus:border-[#FF8A00]/60 transition-all resize-none"
                  data-ocid="inquiry.message.input"
                  style={{ background: "rgba(255,255,255,0.06)" }}
                />
              </div>

              {error && (
                <p className="text-red-400 text-sm text-center">{error}</p>
              )}

              <button
                type="submit"
                disabled={submitting || !actor}
                className="btn-shimmer gradient-btn text-white font-bold py-4 rounded-xl hover:opacity-90 transition-all disabled:opacity-60 flex items-center justify-center gap-2 shadow-lg text-base"
                data-ocid="inquiry.submit.button"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    {lb.submitting}
                  </>
                ) : (
                  lb.submit
                )}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
