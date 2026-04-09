import { useActor, useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ArrowLeft,
  BarChart2,
  LogOut,
  MessageCircle,
  Shield,
  Trash2,
  Users,
} from "lucide-react";
import { createActor } from "../backend";
import type { ContactRecord, VisitStats } from "../backend";

// --- Types ---
interface StatCardProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  gradient: string;
}

function StatCard({ label, value, icon, gradient }: StatCardProps) {
  return (
    <div
      className="rounded-2xl p-6 flex items-center gap-4 shadow-lg"
      style={{ background: gradient }}
    >
      <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
        {icon}
      </div>
      <div>
        <p className="text-white/70 text-sm font-medium">{label}</p>
        <p className="text-white text-2xl font-extrabold">{value}</p>
      </div>
    </div>
  );
}

interface CityBarProps {
  city: string;
  count: number;
  max: number;
}

function CityBar({ city, count, max }: CityBarProps) {
  const pct = max > 0 ? Math.round((count / max) * 100) : 0;
  return (
    <div className="flex items-center gap-3">
      <span className="text-gray-300 text-sm w-28 truncate flex-shrink-0">
        {city}
      </span>
      <div className="flex-1 bg-white/10 rounded-full h-3 overflow-hidden">
        <div
          className="h-3 rounded-full"
          style={{
            width: `${pct}%`,
            background: "linear-gradient(90deg, #FF8A00, #E2367A)",
          }}
        />
      </div>
      <span className="text-gray-400 text-sm w-8 text-right">{count}</span>
    </div>
  );
}

interface DayBarProps {
  label: string;
  count: number;
  max: number;
}

function DayBar({ label, count, max }: DayBarProps) {
  const pct = max > 0 ? Math.round((count / max) * 100) : 0;
  return (
    <div className="flex flex-col items-center gap-1">
      <span className="text-gray-400 text-xs">{count}</span>
      <div
        className="w-8 bg-white/10 rounded-md flex flex-col justify-end"
        style={{ height: "80px" }}
      >
        <div
          className="w-full rounded-md"
          style={{
            height: `${pct}%`,
            minHeight: pct > 0 ? "4px" : "0",
            background: "linear-gradient(180deg, #FF8A00, #6A2BD9)",
          }}
        />
      </div>
      <span className="text-gray-400 text-xs">{label}</span>
    </div>
  );
}

// --- Main AdminPanel ---
export default function AdminPanel({ onBack }: { onBack: () => void }) {
  const { loginStatus, login, clear } = useInternetIdentity();
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  const isLoggedIn = loginStatus === "success";

  const { data: contacts = [], isLoading: loadingContacts } = useQuery<
    ContactRecord[]
  >({
    queryKey: ["admin-contacts"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllContacts();
    },
    enabled: !!actor && isLoggedIn,
  });

  const { data: stats } = useQuery<VisitStats>({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      if (!actor)
        return { totalVisits: BigInt(0), visitsByCity: [], dailyVisits: [] };
      return actor.getVisitStats();
    },
    enabled: !!actor && isLoggedIn,
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("No actor");
      await actor.deleteContact(id);
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ["admin-contacts"] });
    },
  });

  // --- Not logged in ---
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#0E0621] flex flex-col items-center justify-center px-4">
        <div
          className="w-full max-w-sm rounded-3xl p-10 flex flex-col items-center gap-6 text-center shadow-2xl"
          style={{
            background:
              "linear-gradient(145deg, rgba(255,138,0,0.10) 0%, rgba(106,43,217,0.18) 100%)",
            border: "1px solid rgba(255,255,255,0.10)",
          }}
        >
          <div className="w-16 h-16 gradient-btn rounded-2xl flex items-center justify-center shadow-lg">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-extrabold text-white">BillKaro Admin</h1>
          <p className="text-gray-400 text-sm">
            Login with Internet Identity to access the admin panel.
          </p>
          <button
            type="button"
            onClick={() => login()}
            className="w-full gradient-btn text-white font-bold py-3 rounded-xl hover:opacity-90 transition-opacity shadow-lg"
            data-ocid="admin.login.button"
          >
            Login with Internet Identity
          </button>
          <button
            type="button"
            onClick={onBack}
            className="text-gray-400 hover:text-white text-sm flex items-center gap-1 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Site
          </button>
        </div>
      </div>
    );
  }

  // --- Logged in ---
  const totalVisits = stats ? Number(stats.totalVisits) : 0;
  const totalInquiries = contacts.length;

  const citiesSorted = stats
    ? [...stats.visitsByCity]
        .sort((a, b) => Number(b[1]) - Number(a[1]))
        .slice(0, 8)
    : [];
  const maxCity = citiesSorted.length > 0 ? Number(citiesSorted[0][1]) : 1;

  // Daily visits — last 7 days
  const now = Date.now();
  const DAY_MS = 86_400_000;
  const dayLabels = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(now - (6 - i) * DAY_MS);
    return d.toLocaleDateString("en-IN", { weekday: "short" });
  });
  const dayKeys = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(now - (6 - i) * DAY_MS);
    return Math.floor(d.getTime() / DAY_MS);
  });
  const dailyMap = new Map<number, number>();
  if (stats) {
    for (const [ts, count] of stats.dailyVisits) {
      const dayKey = Math.floor(Number(ts) / DAY_MS);
      dailyMap.set(dayKey, (dailyMap.get(dayKey) ?? 0) + Number(count));
    }
  }
  const dailyCounts = dayKeys.map((k) => dailyMap.get(k) ?? 0);
  const maxDay = Math.max(...dailyCounts, 1);

  return (
    <div className="min-h-screen bg-[#0E0621] text-white">
      {/* Header */}
      <header className="bg-[#170C2F] border-b border-white/10 px-6 py-4 flex items-center justify-between sticky top-0 z-40 shadow-lg">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBack}
            className="text-gray-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/10"
            data-ocid="admin.back.button"
            aria-label="Back to site"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 gradient-btn rounded-lg flex items-center justify-center">
              <BarChart2 className="w-4 h-4 text-white" />
            </div>
            <span className="font-extrabold text-lg">BillKaro Admin Panel</span>
          </div>
        </div>
        <button
          type="button"
          onClick={() => clear()}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm px-3 py-2 rounded-lg hover:bg-white/10"
          data-ocid="admin.logout.button"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col gap-10">
        {/* Stats */}
        <section>
          <h2 className="text-lg font-bold text-gray-200 mb-4">Overview</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <StatCard
              label="Total Site Visits"
              value={totalVisits.toLocaleString("en-IN")}
              icon={<BarChart2 className="w-6 h-6 text-white" />}
              gradient="linear-gradient(135deg, #FF8A00 0%, #E2367A 100%)"
            />
            <StatCard
              label="Total Inquiries"
              value={totalInquiries}
              icon={<Users className="w-6 h-6 text-white" />}
              gradient="linear-gradient(135deg, #6A2BD9 0%, #E2367A 100%)"
            />
          </div>
        </section>

        {/* Charts */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Visits by city */}
          <div
            className="rounded-2xl p-6 flex flex-col gap-4"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <h3 className="font-bold text-gray-200 flex items-center gap-2">
              <BarChart2 className="w-5 h-5 text-[#FF8A00]" />
              Visits by City
            </h3>
            {citiesSorted.length === 0 ? (
              <p className="text-gray-500 text-sm">No visit data yet.</p>
            ) : (
              <div className="flex flex-col gap-3">
                {citiesSorted.map(([city, count]) => (
                  <CityBar
                    key={city}
                    city={city}
                    count={Number(count)}
                    max={maxCity}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Daily visits */}
          <div
            className="rounded-2xl p-6 flex flex-col gap-4"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <h3 className="font-bold text-gray-200 flex items-center gap-2">
              <BarChart2 className="w-5 h-5 text-[#6A2BD9]" />
              Daily Visits — Last 7 Days
            </h3>
            <div
              className="flex items-end justify-around mt-2"
              style={{ height: "120px" }}
            >
              {dayLabels.map((label, i) => (
                <DayBar
                  key={label}
                  label={label}
                  count={dailyCounts[i]}
                  max={maxDay}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Inquiries Table */}
        <section>
          <h2 className="text-lg font-bold text-gray-200 mb-4 flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-[#FF8A00]" />
            Customer Inquiries
            <span className="ml-2 text-sm font-normal text-gray-400">
              ({totalInquiries})
            </span>
          </h2>
          <div
            className="rounded-2xl overflow-hidden"
            style={{ border: "1px solid rgba(255,255,255,0.08)" }}
          >
            {loadingContacts ? (
              <div className="p-10 flex items-center justify-center gap-3 text-gray-400">
                <div className="w-5 h-5 border-2 border-[#FF8A00] border-t-transparent rounded-full animate-spin" />
                Loading inquiries…
              </div>
            ) : contacts.length === 0 ? (
              <div
                className="p-10 text-center text-gray-500"
                data-ocid="admin.inquiries.empty"
              >
                No inquiries yet.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table
                  className="w-full text-sm"
                  data-ocid="admin.inquiries.table"
                >
                  <thead>
                    <tr className="bg-white/5 text-gray-400 text-left text-xs uppercase tracking-wide">
                      <th className="px-4 py-3 font-semibold">Name</th>
                      <th className="px-4 py-3 font-semibold">Phone</th>
                      <th className="px-4 py-3 font-semibold">City</th>
                      <th className="px-4 py-3 font-semibold">Message</th>
                      <th className="px-4 py-3 font-semibold">Date</th>
                      <th className="px-4 py-3 font-semibold text-center">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {contacts.map((c, idx) => {
                      const dateStr = new Date(
                        Number(c.timestamp) / 1_000_000,
                      ).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      });
                      const waMsg = encodeURIComponent(
                        `Hi ${c.name}, I saw your BillKaro inquiry. How can I help you?`,
                      );
                      const waUrl = `https://wa.me/91${c.phone}?text=${waMsg}`;
                      return (
                        <tr
                          key={String(c.id)}
                          className={`border-t border-white/5 hover:bg-white/4 transition-colors ${idx % 2 === 0 ? "" : "bg-white/[0.02]"}`}
                          data-ocid={`admin.inquiry.row.${String(c.id)}`}
                        >
                          <td className="px-4 py-3 font-medium text-white">
                            {c.name}
                          </td>
                          <td className="px-4 py-3 text-gray-300">{c.phone}</td>
                          <td className="px-4 py-3 text-gray-300">
                            {c.city || "—"}
                          </td>
                          <td className="px-4 py-3 text-gray-400 max-w-xs">
                            <span className="line-clamp-2">{c.message}</span>
                          </td>
                          <td className="px-4 py-3 text-gray-400 whitespace-nowrap">
                            {dateStr}
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center justify-center gap-2">
                              <a
                                href={waUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1 bg-[#25D366] hover:bg-[#1ebe58] text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap"
                                data-ocid={`admin.whatsapp.${String(c.id)}.button`}
                              >
                                <MessageCircle className="w-3.5 h-3.5" />
                                WhatsApp
                              </a>
                              <button
                                type="button"
                                onClick={() => deleteMutation.mutate(c.id)}
                                disabled={deleteMutation.isPending}
                                className="flex items-center gap-1 bg-red-500/20 hover:bg-red-500/40 text-red-400 hover:text-red-300 text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors"
                                data-ocid={`admin.delete.${String(c.id)}.button`}
                                aria-label={`Delete inquiry from ${c.name}`}
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
