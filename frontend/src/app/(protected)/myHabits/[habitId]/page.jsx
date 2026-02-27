"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useHabitStore } from "@/store/habitStore";
import DeleteHabitModal from "@/components/habitModels/deleteHabit";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function HabitDetailPage() {
  const { habitId } = useParams();
  const { habitSummary, loading, getHabitSummary } = useHabitStore();
  const [deleteHabit, setDeleteHabit] = useState(null);

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

  if (!habitSummary) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center text-gray-400">
        No data found.
      </div>
    );
  }

  const completed = habitSummary.totalCompletions;
  const totalDays = habitSummary.totalDays;
  const missed = Math.max(totalDays - completed, 0);

  const data = {
    labels: ["Completed Days", "Missed Days"],
    datasets: [
      {
        data: [completed, missed],
        backgroundColor: ["#22c55e", "#ef4444"],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    cutout: "70%",
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-900 p-6 text-white">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between mb-4">
          <h1 className="text-xl md:text-3xl font-bold">Habit Analytics</h1>
          <button
            onClick={() => setDeleteHabit(habitId)}
            className="text-gray-400 hover:text-red-600 text-3xl cursor-pointer"
          >
            🗑
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Current Streak */}
          <div className="bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-700">
            <p className="text-gray-400 text-sm">Current Streak</p>
            <h2 className="text-2xl md:text-4xl font-bold text-orange-400 mt-2">
              🔥 {habitSummary.currentStreak} days
            </h2>
          </div>

          {/* Max Streak */}
          <div className="bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-700">
            <p className="text-gray-400 text-sm">Max Streak</p>
            <h2 className="text-2xl md:text-4xl font-bold text-indigo-400 mt-2">
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
            <h2 className="text-2xl md:text-3xl font-bold mt-2">
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

      <div className="mt-10 flex justify-center">
        <div className="bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-700 w-full max-w-md">
          <h2 className="text-lg font-semibold mb-2 text-center">
            Consistency Overview
          </h2>
          <p className="text font-semibold mb-2 text-center">
            Total Days :  {totalDays}
          </p>

          <div className="relative md:w-64 md:h-64 mx-auto flex justify-center items-center">
            <Doughnut data={data} options={options} />
          </div>

          {/* Custom Legend  */}
          <div className="flex justify-center gap-6 mt-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-green-500"></div>
              <span>Completed :  {completed}</span>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-red-500"></div>
              <span>Missed :  {missed}</span>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="absolute inset-0 flex items-center justify-center flex-col">
        <span className="text-2xl font-bold text-white">
          {habitSummary.completionRate}%
        </span>
        <span className="text-xs text-gray-400">Consistency</span>
      </div> */}

      {deleteHabit && (
        <DeleteHabitModal
          habitId={deleteHabit}
          onClose={() => setDeleteHabit(null)}
        />
      )}
    </div>
  );
}
