"use client";

import { useState } from "react";
import { useHabitStore } from "@/store/habitStore";
import { useRouter } from "next/navigation";

export default function DeleteHabitModal({ habitId, onClose }) {
  const { deleteHabit } = useHabitStore();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    setLoading(true);
    const res = await deleteHabit(habitId);
    setLoading(false);

    if (res?.success) {
      onClose();
    }
    router.push("/myHabits")

  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-gray-900 text-white w-full max-w-sm rounded-2xl p-6 shadow-xl border border-gray-700"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-bold mb-4 text-red-500">
          Delete Habit
        </h2>

        <p className="text-gray-300 mb-6 text-sm">
          Are you sure you want to delete this habit?
          This action cannot be undone.
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-gray-600 text-gray-300 hover:bg-gray-800 cursor-pointer"
          >
            Cancel
          </button>

          <button
            onClick={handleDelete}
            disabled={loading}
            className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 disabled:opacity-60 cursor-pointer"
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}