"use client";

import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { useHabitStore } from "@/store/habitStore";
import { useEffect } from "react";
import motivationalQuotes from "@/utils/motivationalQuotes";
import dashboardMessages from "@/utils/dashboardMessages";
import dashboardHeadlines from "@/utils/dashboardHeadlines";

export default function Dashboard() {
  const { getMyHabits, loading, error } = useHabitStore();
  const user = useAuthStore((s) => s.user);
  const router = useRouter();
  const randomQuote =
    motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
  const dashboardMessage =
    dashboardMessages[Math.floor(Math.random() * dashboardMessages.length)];
  const dashboardHeadline =
    dashboardHeadlines[Math.floor(Math.random() * dashboardHeadlines.length)];

  const { habits } = useHabitStore();

  const totalHabits = habits.length;

  const completedToday = habits.filter((h) => h.isCompletedToday).length;

  const completionRate =
    totalHabits > 0 ? Math.round((completedToday / totalHabits) * 100) : 0;

  useEffect(() => {
    getMyHabits();
  }, []);

  if (!user) return <div>Loading...</div>;

  return (
    <div className="relative min-h-screen bg-gray-950 text-gray-200 overflow-hidden">
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-cyan-500/20 rounded-full blur-[120px]" />

      <div className="relative z-10 flex flex-col p-5 md:p-12 gap-3 ">
        {/* Main Headings */}
        <h3 className="text-[1.9rem] font-medium text-gray-400 tracking-wide text-center">
          Welcome back,
          <span className="ml-2 font-semibold bg-gradient-to-r from-indigo-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent capitalize">
            {user.name}
          </span>
        </h3>
        <div>
          <p className="text-indigo-400 font-medium tracking-wide uppercase text-sm text-center">
            {randomQuote}
          </p>
        </div>

        <div className="flex items-center justify-items-center max-[900px]:flex-col max-[900px]:text-center md:px-10">
          {/* Left Section */}
          <div className="flex-[5] flex flex-col gap-8 max-[900px]:items-center">
            <div>
              <h2 className="text-5xl font-bold leading-tight text-white max-[530px]:text-4xl">
                {dashboardHeadline}
              </h2>
            </div>

            <div className="max-[530px]:hidden">
              <p className="max-w-[550px] text-gray-400 leading-relaxed text-lg max-[900px]:max-w-full">
                {dashboardMessage}
              </p>
            </div>

            <div className="flex gap-6 items-center max-[900px]:flex-col">
              <button
                onClick={() => {
                  getMyHabits();
                  router.replace("/myHabits");
                }}
                className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-10 py-4 text-sm font-semibold rounded-full shadow-[0_15px_40px_rgba(79,70,229,0.4)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(79,70,229,0.6)] cursor-pointer"
              >
                {loading ? "Loading..." : "Go To My Habits"}
              </button>

              <span className="text-sm text-gray-500">
                Stay disciplined daily
              </span>
            </div>
          </div>

          <div className="flex-[3] grid grid-cols-1 sm:grid-cols-2 gap-6 mt-12">
            {/* Total Habits */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-xl">
              <p className="text-xs text-gray-400 uppercase">Total Habits</p>
              <h3 className="text-3xl font-bold text-indigo-400 mt-2">
                {totalHabits}
              </h3>
            </div>

            {/* Completed Today */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-xl">
              <p className="text-xs text-gray-400 uppercase">Completed Today</p>
              <h3 className="text-3xl font-bold text-green-400 mt-2">
                {completedToday}
              </h3>
            </div>

            {/* Completion Rate */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-xl">
              <p className="text-xs text-gray-400 uppercase">
                Today’s Progress
              </p>
              <h3 className="text-3xl font-bold text-cyan-400 mt-2">
                {completionRate}%
              </h3>
            </div>

            <div className="bg-gradient-to-br from-indigo-600/20 via-blue-600/10 to-cyan-500/10 border border-white/10 rounded-2xl p-3 shadow-xl flex flex-col items-center justify-center text-center relative overflow-hidden">
              {/* Glow Effect */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-indigo-500/30 blur-3xl rounded-full"></div>

              <h3 className="text-xl font-semibold text-white mb-6">
                Ready to level up today?
              </h3>

              <button
                onClick={() => router.push("/myHabits")}
                className="relative bg-gradient-to-r from-indigo-600 to-blue-600 px-2 py-1 rounded-full text-white font-semibold shadow-[0_15px_40px_rgba(79,70,229,0.4)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(79,70,229,0.6)] cursor-pointer"
              >
                <p className="text-sm font-light">Go To My Habits →</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
