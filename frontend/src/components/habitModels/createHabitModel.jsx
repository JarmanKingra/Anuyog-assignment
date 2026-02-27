"use client";

import { useState } from "react";
import { useHabitStore } from "@/store/habitStore";

export default function CreateHabitModal({ onClose }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { createHabit, loading, error } = useHabitStore();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) return;

    const result = await createHabit(title, description);

    if (result?.success) {
      setTitle("");
      setDescription("");
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-[#111] text-white w-full max-w-md rounded-xl p-8 shadow-2xl"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <h2 className="text-2xl font-bold mb-6">Create Habit</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Habit title *"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="px-4 py-3 rounded-lg bg-[#1c1c1c] border border-gray-700 focus:border-blue-500 outline-none"
          />

          <textarea
            placeholder="Description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="px-4 py-3 rounded-lg bg-[#1c1c1c] border border-gray-700 focus:border-blue-500 outline-none resize-none"
            rows={3}
          />

          {error && <p className={styles.error}>{error}</p>}

          <div className="flex justify-end gap-3 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 transition cursor-pointer"
            >
              {loading ? "Creating..." : "Create Habit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
