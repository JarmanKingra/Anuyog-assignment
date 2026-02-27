"use client";
import CreateHabitModal from "@/components/habitModels/createHabitModel";
import { useEffect, useState } from "react";
import { useHabitStore } from "@/store/habitStore";
import { useRouter } from "next/navigation";
import EditHabitModal from "@/components/habitModels/editHabit";

export default function MyHabits() {
  const { habits } = useHabitStore();
  const [showModal, setShowModal] = useState(false);
  const { getMyHabits, markHabitLogComplete } = useHabitStore();
  const [editHabit, setEditHabit] = useState(null);
  const router = useRouter();

  useEffect(() => {
    getMyHabits();
  }, []);

  const handleMarkComplete = async (habitId) => {
    await markHabitLogComplete(habitId);
    await getMyHabits();
  };

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-6xl mx-auto flex justify-between items-center mb-8">
        <div>
          <h1 className="text-xl md:text-3xl font-bold text-white">My Habits</h1>
          <p className="text-blue-200 mt-1 text-sm md:text-xl pr-2 md:pr-0">
            Track your consistency. Build discipline daily.
          </p>
        </div>

        <button
          className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm px-3 py-1 md:px-6 md:py-3 rounded-xl shadow-md transition-all duration-200 cursor-pointer"
          onClick={() => setShowModal(true)}
        >
          + Add Habit
        </button>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-2xl shadow-sm border">
          <p className="text-gray-500 text-sm">Total Habits</p>
          <h2 className="text-2xl font-bold text-gray-800 mt-2">
            {habits.length}
          </h2>
        </div>
      </div>

      {/* Habit Cards */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 overflow-y-hidden">
        {habits.map((habit) => (
          <div
            key={habit._id}
            className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
          >
            {/* Top heading and options */}
            <div>
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-semibold text-gray-800 capitalize">
                  {habit.title}
                </h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => setEditHabit(habit)}
                    className="text-gray-400 hover:text-indigo-600 text-sm cursor-pointer"
                  >
                    ✏️
                  </button>
                </div>
              </div>
              {habit.description ? (
                <p className="text-sm text-gray-500 mt-3 line-clamp-2">
                  Description: {habit.description}
                </p>
              ) : (<p className="text-sm text-gray-500 mt-3 line-clamp-2 italic">
                  No Description available
                </p>)}
            </div>

            {/* Middle Visual Divider Line*/}
            <div className="h-px bg-gray-100 my-4"></div>

            {/* Options Section */}
            <div className="flex justify-between items-center">
              <button
                onClick={() => {
                  handleMarkComplete(habit._id);
                }}
                disabled={habit.isCompletedToday}
                className={`text-sm px-4 py-2 rounded-lg transition cursor-pointer
    ${
      habit.isCompletedToday
        ? "bg-green-100 text-green-600 line-through cursor-not-allowed opacity-70"
        : "bg-indigo-600 text-white hover:bg-indigo-500"
    }`}
              >
                {habit.isCompletedToday ? "Completed Today" : "Mark Complete"}
              </button>

              <button
                onClick={() => router.push(`/myHabits/${habit._id}`)}
                className="text-sm px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 transition cursor-pointer"
              >
                View
              </button>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-500 mt-3 line-clamp-2">
                   Started on: {new Date(habit.createdAt).toLocaleDateString("en-CA")}
                </p>
            </div>
          </div>
        ))}
      </div>
      {showModal && <CreateHabitModal onClose={() => setShowModal(false)} />}
      {editHabit && (
        <EditHabitModal habit={editHabit} onClose={() => setEditHabit(null)} />
      )}
    </div>
  );
}
