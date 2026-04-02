import { Bell, X } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import type { Lang } from "../translations";
import { t } from "../translations";

interface PushNotificationBarProps {
  lang: Lang;
}

export default function PushNotificationBar({
  lang,
}: PushNotificationBarProps) {
  const [visible, setVisible] = useState(false);
  const tr = t[lang];

  useEffect(() => {
    // Don't show if already opted in or dismissed
    if (
      typeof Notification === "undefined" ||
      localStorage.getItem("billkaro_push_opted") === "true" ||
      localStorage.getItem("billkaro_push_dismissed") === "true"
    ) {
      return;
    }
    const timer = setTimeout(() => setVisible(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  const handleAllow = async () => {
    try {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        localStorage.setItem("billkaro_push_opted", "true");
        toast.success(tr.push_opt_thanks);
      } else {
        localStorage.setItem("billkaro_push_dismissed", "true");
      }
    } catch {
      localStorage.setItem("billkaro_push_dismissed", "true");
    }
    setVisible(false);
  };

  const handleLater = () => {
    localStorage.setItem("billkaro_push_dismissed", "true");
    setVisible(false);
  };

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 animate-in slide-in-from-bottom duration-500"
      data-ocid="push.modal"
    >
      <div
        className="mx-auto max-w-2xl m-4 rounded-2xl p-5 shadow-float flex flex-col sm:flex-row items-start sm:items-center gap-4"
        style={{
          background: "#1E1245",
          border: "1px solid rgba(255,138,0,0.3)",
        }}
      >
        <div className="flex items-center gap-3 flex-1">
          <div className="w-10 h-10 rounded-xl bg-[#FF8A00]/20 flex items-center justify-center flex-shrink-0">
            <Bell className="w-5 h-5 text-[#FF8A00]" />
          </div>
          <div>
            <p className="text-white font-semibold text-sm">
              {tr.push_opt_title}
            </p>
            <p className="text-gray-400 text-xs mt-0.5">{tr.push_opt_sub}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            type="button"
            onClick={handleAllow}
            className="flex-1 sm:flex-none gradient-btn text-white text-sm font-bold px-5 py-2.5 rounded-full hover:opacity-90 transition-opacity"
            data-ocid="push.confirm_button"
          >
            {tr.push_opt_allow}
          </button>
          <button
            type="button"
            onClick={handleLater}
            className="flex-1 sm:flex-none text-gray-400 hover:text-white text-sm px-4 py-2.5 rounded-full border border-white/10 hover:border-white/30 transition-colors"
            data-ocid="push.cancel_button"
          >
            {tr.push_opt_later}
          </button>
        </div>
        <button
          type="button"
          onClick={handleLater}
          className="absolute top-3 right-3 text-gray-500 hover:text-white p-1"
          aria-label="Close"
          data-ocid="push.close_button"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
