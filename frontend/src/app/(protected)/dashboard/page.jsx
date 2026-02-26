"use client";

import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  return <DashboardContent />;
}

function DashboardContent() {
  const user = useAuthStore((s) => s.user);
  const router = useRouter();


  if (!user) return <div>Loading...</div>;

  return (
  <div className="min-h-screen bg-[radial-gradient(circle_at_top,#0b0b0b,#000)] text-gray-200 flex flex-col p-12 gap-12">

    {/* Greeting */}
    <h3 className="text-[1.9rem] font-medium text-gray-300 tracking-wide">
      Hi{" "}
      <span className="font-semibold bg-[linear-gradient(90deg,#60a5fa,#38bdf8,#22d3ee)] bg-[length:200%_auto] bg-clip-text text-transparent animate-[gradientMove_6s_ease_infinite]">
        {user.name}
      </span>
    </h3>

    {/* Main Content */}
    <div className="flex items-center max-[900px]:flex-col max-[900px]:text-center">

      {/* Left Section */}
      <div className="flex-[5] flex flex-col gap-6 max-[900px]:items-center">

        <div>
          <p className="text-blue-400 font-medium tracking-wide">
            Track Habits. Build Consistency.
          </p>
        </div>

        <div>
          <h2 className="text-5xl font-bold leading-tight text-white max-[530px]:text-4xl">
            Simplify Your Growth with Consistency Tracker
          </h2>
        </div>

        <div className="max-[530px]:hidden">
          <p className="max-w-[550px] text-gray-400 leading-relaxed text-base max-[900px]:max-w-full">
            Build powerful daily routines, monitor streaks, and transform small actions into long-term results.
            Your discipline today defines your success tomorrow.
          </p>
        </div>

        <div>
          <button
            onClick={() => router.replace("/teams/myTeams")}
            className="mt-4 bg-[linear-gradient(135deg,#2563eb,#3b82f6)] text-white px-8 py-3 text-sm font-medium rounded-full shadow-[0_10px_30px_rgba(37,99,235,0.35)] transition-all duration-300 hover:-translate-y-[2px] hover:shadow-[0_15px_40px_rgba(37,99,235,0.55)] active:translate-y-0 max-[530px]:px-4 max-[530px]:py-1"
          >
            My Habits
          </button>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex-[3] flex justify-center items-center">
        <img
          src="image.png"
          alt=""
          className="h-[350px] drop-shadow-[0_20px_40px_rgba(0,0,0,0.7)] max-[530px]:h-[150px]"
        />
      </div>

    </div>
  </div>
);
}
