import { motion } from "motion/react";
import type { Lang } from "../translations";

interface TestimonialsProps {
  lang: Lang;
}

const testimonials = [
  {
    id: "t1",
    name: "Ramesh Gupta",
    rating: 5,
    message:
      "BillKaro ne meri dukaan ki billing bilkul aasaan kar di. Ab GST invoice sirf 10 second mein ban jaata hai!",
  },
  {
    id: "t2",
    name: "Sunita Sharma",
    rating: 5,
    message:
      "Bahut hi simple aur fast app hai. Mere customers bhi khush hain kyunki unhe turant bill milta hai.",
  },
  {
    id: "t3",
    name: "Anil Verma",
    rating: 5,
    message:
      "I was worried about GST compliance but BillKaro makes it so easy. The invoice format is perfect and professional.",
  },
  {
    id: "t4",
    name: "Priya Agarwal",
    rating: 4,
    message:
      "Product catalog feature bahut useful hai. Ek baar products add karo, phir sirf tap karke bill banao!",
  },
  {
    id: "t5",
    name: "Deepak Jain",
    rating: 5,
    message:
      "CSV export feature se monthly accounts banana bahut easy ho gaya. Accountant ko bhi pasand aaya.",
  },
  {
    id: "t6",
    name: "Kavita Mehta",
    rating: 5,
    message:
      "App free download hai aur sirf bill generate karne pe charge lagta hai. Bilkul sahi pricing!",
  },
  {
    id: "t7",
    name: "Mukesh Patel",
    rating: 5,
    message:
      "Dashboard mein roz ki sales, invoices sab ek jagah dikhta hai. Bohot convenient hai yaar.",
  },
  {
    id: "t8",
    name: "Geeta Rawat",
    rating: 4,
    message:
      "UPI, cash, card — teeno payment modes support karta hai. Aajkal ke customers ke liye perfect app.",
  },
  {
    id: "t9",
    name: "Suresh Bansal",
    rating: 5,
    message:
      "Best billing app for small grocery stores. It handles HSN codes, GSTIN, FSSAI — everything in one place!",
  },
  {
    id: "t10",
    name: "Lalita Yadav",
    rating: 5,
    message:
      "Shyama chatbot bahut helpful hai! Jab bhi koi problem hoti hai, woh turant guide karti hai.",
  },
];

const row1 = testimonials.slice(0, 5);
const row2 = testimonials.slice(5);

const FEATURES = [
  "GST Invoices \u2713",
  "Product Catalog \u2713",
  "Cash / Card / UPI \u2713",
  "CSV Export \u2713",
  "Dashboard Analytics \u2713",
  "Free Download \u2713",
  "FSSAI Support \u2713",
  "Barcode Scanning \u2713",
  "Hindi & English \u2713",
  "Instant Sharing \u2713",
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5 mb-2" aria-label={`${rating} out of 5 stars`}>
      {["s1", "s2", "s3", "s4", "s5"].map((key, i) => (
        <svg
          key={key}
          className="w-4 h-4"
          viewBox="0 0 20 20"
          fill={i < rating ? "#FF6B35" : "#e5e7eb"}
          aria-hidden="true"
          role="img"
        >
          <title>{i < rating ? "filled star" : "empty star"}</title>
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function TestimonialCard({
  id,
  name,
  rating,
  message,
}: { id: string; name: string; rating: number; message: string }) {
  return (
    <div
      className="flex-shrink-0 w-72 bg-white rounded-2xl px-5 py-4 mx-3 border border-gray-100"
      style={{
        boxShadow:
          "0 4px 24px 0 rgba(139,92,246,0.08), 0 1px 4px rgba(0,0,0,0.06)",
      }}
      data-ocid={`testimonials.item.${id}`}
    >
      <StarRating rating={rating} />
      <p className="text-gray-600 text-sm leading-relaxed mb-3">"{message}"</p>
      <div className="font-bold text-gray-800 text-sm">— {name}</div>
    </div>
  );
}

export default function Testimonials({ lang }: TestimonialsProps) {
  return (
    <>
      <style>{`
        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes scroll-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        @keyframes marquee-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .scroll-left-track {
          animation: scroll-left 28s linear infinite;
          display: flex;
        }
        .scroll-right-track {
          animation: scroll-right 32s linear infinite;
          display: flex;
        }
        .marquee-track {
          animation: marquee-left 20s linear infinite;
          display: flex;
        }
        .scroll-left-track:hover,
        .scroll-right-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      <section
        id="testimonials"
        className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span
              className="inline-block px-4 py-1.5 rounded-full text-xs font-bold mb-4 text-white"
              style={{ background: "linear-gradient(90deg, #FF6B35, #E2367A)" }}
            >
              {lang === "hi" ? "उपयोगकर्ताओं की राय" : "User Reviews"}
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4">
              {lang === "hi"
                ? "हमारे उपयोगकर्ता क्या कहते हैं"
                : "What Our Users Say"}
            </h2>
            <p className="text-gray-500 text-base md:text-lg max-w-xl mx-auto">
              {lang === "hi"
                ? "देशभर के किराना दुकानदारों का विश्वास"
                : "Trusted by grocery shop owners across India"}
            </p>
          </motion.div>
        </div>

        <div className="w-full overflow-hidden mb-4">
          <div className="scroll-left-track">
            {[...row1, ...row1.map((t) => ({ ...t, id: `${t.id}-dup` }))].map(
              (item) => (
                <TestimonialCard key={item.id} {...item} />
              ),
            )}
          </div>
        </div>

        <div className="w-full overflow-hidden mb-12">
          <div className="scroll-right-track">
            {[...row2, ...row2.map((t) => ({ ...t, id: `${t.id}-dup` }))].map(
              (item) => (
                <TestimonialCard key={item.id} {...item} />
              ),
            )}
          </div>
        </div>

        <div
          className="w-full overflow-hidden py-4"
          style={{
            background:
              "linear-gradient(90deg, #FF6B35 0%, #E2367A 40%, #8B5CF6 100%)",
          }}
        >
          <div className="marquee-track">
            {[
              ...FEATURES.map((f, i) => ({ f, k: `f-${i}` })),
              ...FEATURES.map((f, i) => ({ f, k: `fd-${i}` })),
            ].map(({ f, k }) => (
              <span
                key={k}
                className="flex-shrink-0 text-white font-bold text-sm px-6 py-1 border-r border-white/30 whitespace-nowrap"
              >
                {f}
              </span>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
