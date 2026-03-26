import { useEffect, useRef } from "react";
import type { Lang } from "../translations";
import { t } from "../translations";

interface ScreenshotsProps {
  lang: Lang;
}

const SCREENSHOTS = [
  {
    src: "/assets/uploads/img_3906-019d2b17-73c1-7082-ac32-bf9b6dd3ef5d-7.png",
    key: "ss_1",
  },
  {
    src: "/assets/uploads/img_3907-019d2b17-726d-7726-899e-3fa7405222b4-6.png",
    key: "ss_2",
  },
  {
    src: "/assets/uploads/img_3908-019d2b17-6afe-70bd-b79e-47484eb5792a-1.png",
    key: "ss_3",
  },
  {
    src: "/assets/uploads/img_3909-019d2b17-6b75-7649-89ef-d7e73fa2724c-3.png",
    key: "ss_4",
  },
  {
    src: "/assets/uploads/img_3910-019d2b17-712a-7432-b60c-3ca47b4c3121-5.png",
    key: "ss_5",
  },
  {
    src: "/assets/uploads/img_3911-019d2b17-6dbc-7199-a10d-11f9b277a35f-4.png",
    key: "ss_6",
  },
  {
    src: "/assets/uploads/img_3912-019d2b17-6b1c-70dc-b9d3-5577f353b7c4-2.png",
    key: "ss_7",
  },
];

export default function Screenshots({ lang }: ScreenshotsProps) {
  const tr = t[lang];
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) e.target.classList.add("visible");
        }
      },
      { threshold: 0.1 },
    );
    const els = ref.current?.querySelectorAll(".fade-in-up");
    if (els) {
      for (const el of els) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <section id="screenshots" className="py-20 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14 fade-in-up">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">
            {tr.ss_title}
          </h2>
          <p className="text-gray-500 text-lg">{tr.ss_sub}</p>
          <div className="mx-auto mt-4 w-16 h-1 rounded-full gradient-btn" />
        </div>

        <div className="flex gap-6 overflow-x-auto pb-6 screenshots-scroll fade-in-up">
          {SCREENSHOTS.map(({ src, key }, i) => (
            <div
              key={key}
              className="flex-shrink-0 flex flex-col items-center gap-3"
              data-ocid={`screenshots.item.${i + 1}`}
            >
              <div className="phone-frame w-48 sm:w-56">
                <img
                  src={src}
                  alt={tr[key as keyof typeof tr]}
                  className="w-full block"
                />
              </div>
              <span className="text-sm font-semibold text-gray-600 text-center whitespace-nowrap">
                {tr[key as keyof typeof tr]}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
