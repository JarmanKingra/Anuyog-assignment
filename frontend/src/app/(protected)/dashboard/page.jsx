"use client";

import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { useHabitStore } from "@/store/habitStore";

export default function Dashboard() {
  const { getMyHabits, loading, error } = useHabitStore();
  const user = useAuthStore((s) => s.user);
  const router = useRouter();

  const getHabits = async () => {

    const result = await getMyHabits();
  };

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

      {/* Container containing -- headings and picture */}
      <div className="flex items-center justify-items-center max-[900px]:flex-col max-[900px]:text-center md:px-10">

        {/* Left Section */}
        <div className="flex-[5] flex flex-col gap-8 max-[900px]:items-center">

          <div>
            <p className="text-indigo-400 font-medium tracking-wide uppercase text-sm">
              Consistency is Power
            </p>
          </div>

          <div>
            <h2 className="text-6xl font-bold leading-tight text-white max-[530px]:text-4xl">
              Build Habits.
              <br />
              Break Limits.
            </h2>
          </div>

          <div className="max-[530px]:hidden">
            <p className="max-w-[550px] text-gray-400 leading-relaxed text-lg max-[900px]:max-w-full">
              Small daily actions compound into extraordinary results.
              Track streaks, measure discipline, and stay accountable
              every single day.
            </p>
          </div>

          <div className="flex gap-6 items-center max-[900px]:flex-col">
            <button
              onClick={() => {
                getHabits();
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

        {/* Right Section */}
        <div className="flex-[3] flex justify-center items-center relative mt-12 max-[900px]:mt-8">

          <div className="relative">
            <div className="absolute inset-0 bg-indigo-500/20 blur-3xl rounded-full"></div>

            <img
              src="image.png"
              alt=""
              className="relative h-[380px] drop-shadow-[0_30px_60px_rgba(0,0,0,0.8)] max-[530px]:h-[180px]"
            />
          </div>

        </div>

      </div>
    </div>
  </div>
);
}
