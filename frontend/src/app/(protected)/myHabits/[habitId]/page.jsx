"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { useHabitStore } from "@/store/habitStore";

export default function HabitDetailPage() {
  const { habitId } = useParams();
  const { habitSummary, loading, getHabitSummary } = useHabitStore();

  useEffect(() => {
    if (habitId) {
      getHabitSummary(habitId);
    }
  }, [habitId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">
        Loading summary...
      </div>
    );
  }

  if (!habitSummary) return null;

  return (
    <div className="min-h-screen bg-gray-900 p-6 text-white">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Habit Analytics</h1>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Current Streak */}
          <div className="bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-700">
            <p className="text-gray-400 text-sm">Current Streak</p>
            <h2 className="text-4xl font-bold text-orange-400 mt-2">
              🔥 {habitSummary.currentStreak} days
            </h2>
          </div>

          {/* Max Streak */}
          <div className="bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-700">
            <p className="text-gray-400 text-sm">Max Streak</p>
            <h2 className="text-4xl font-bold text-indigo-400 mt-2">
              {habitSummary.maxStreak} days
            </h2>
          </div>

          {/* Completion Rate */}
          <div className="bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-700 col-span-1 sm:col-span-2">
            <p className="text-gray-400 text-sm mb-2">Completion Rate</p>

            <div className="w-full bg-gray-700 rounded-full h-4">
              <div
                className="bg-green-500 h-4 rounded-full transition-all duration-500"
                style={{
                  width: `${habitSummary.completionRate}%`,
                }}
              ></div>
            </div>

            <p className="mt-3 text-lg font-semibold text-green-400">
              {habitSummary.completionRate}%
            </p>
          </div>

          <div className="bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-700 col-span-1 sm:col-span-2">
            <p className="text-gray-400 text-sm">Habit Duration</p>
            <h2 className="text-3xl font-bold mt-2">
              Day {habitSummary.totalDays}
            </h2>
            <p className="text-green-400 text-sm mt-1">
              {habitSummary.totalCompletions} days completed
            </p>
          </div>

          {/* Total Completions */}
          <div className="bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-700 col-span-1 sm:col-span-2">
            <p className="text-gray-400 text-sm">Total Completions</p>
            <h2 className="text-3xl font-bold mt-2">
              {habitSummary.totalCompletions}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}
