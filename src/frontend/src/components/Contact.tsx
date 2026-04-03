import { MapPin, MessageCircle, Phone } from "lucide-react";
import { motion } from "motion/react";
import type { Lang } from "../translations";
import { t } from "../translations";

interface ContactProps {
  lang: Lang;
}

export default function Contact({ lang }: ContactProps) {
  const tr = t[lang];

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">
            {tr.contact_title}
          </h2>
          <p className="text-gray-500 text-lg">{tr.contact_sub}</p>
          <div className="mx-auto mt-4 w-16 h-1 rounded-full gradient-btn" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col gap-6"
          >
            <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100 shadow-card">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 gradient-btn rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0">
                  <Phone className="w-7 h-7 text-white" />
                </div>
                <div>
                  <div className="font-bold text-gray-900 text-xl">
                    {tr.contact_name}
                  </div>
                  <div className="text-gray-500">{tr.contact_phone}</div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-gray-500 mb-6">
                <MapPin className="w-4 h-4 text-[#E2367A] flex-shrink-0" />
                <span className="text-sm">{tr.contact_location}</span>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="https://wa.me/917023285769?text=Hi%20Ankit%2C%20I%20want%20to%20know%20more%20about%20BillKaro"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] text-white font-bold py-3 rounded-pill hover:bg-[#1ebe58] transition-colors shadow-md"
                  data-ocid="contact.whatsapp.button"
                >
                  <MessageCircle className="w-5 h-5" />
                  {tr.contact_wa}
                </a>
                <a
                  href="tel:+917023285769"
                  className="flex-1 flex items-center justify-center gap-2 gradient-btn text-white font-bold py-3 rounded-pill hover:opacity-90 transition-opacity shadow-md"
                  data-ocid="contact.call.button"
                >
                  <Phone className="w-5 h-5" />
                  {tr.contact_call}
                </a>
              </div>
            </div>
          </motion.div>

          {/* Google Map */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="rounded-3xl overflow-hidden shadow-card border border-gray-100"
          >
            <iframe
              src="https://maps.google.com/maps?q=302012+jaipur+rajasthan&output=embed"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="BillKaro Location"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
