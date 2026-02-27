"use client";
import { clientServer } from "@/lib";
import { create } from "zustand";
import { notify } from "./notificationStore";

export const useHabitStore = create((set) => ({
  habits: [],
  currentHabit: null,
  loading: false,
  error: null,
  habitSummary: null,
  summaryLoading: false,

  createHabit: async (title, description) => {
    try {
      set({ loading: true, error: null });

      const res = await clientServer.post("/api/habits", {
        title: title,
        description: description,
      });
      set((state) => ({
        habits: [...state.habits, res.data],
        loading: false,
      }));
      notify("Habit created successfully", "success");
      return { success: true };
    } catch (err) {
      console.log(err);
      const message =
        err.response?.data?.message || "Failed to create a Habits";
      set({
        error: message,
        loading: false,
      });
      notify(message, "error");

      return { success: false };
    }
  },

  getMyHabits: async () => {
    try {
      set({ loading: true, error: null });

      const res = await clientServer.get("/api/habits");
      set({
        habits: res.data,
        loading: false,
      });
    } catch (err) {
      console.log(err);
      const message = err.response?.data?.message || "Failed get your Habits";
      set({
        error: message,
        loading: false,
      });
      notify(message, "error");

      return { success: false };
    }
  },

  updateHabit: async (id, title, description) => {
  try {
    const res = await clientServer.put(`/api/habits/${id}`, {
      title,
      description,
    });

    set((state) => ({
      habits: state.habits.map((h) =>
        h._id === id ? res.data : h
      ),
    }));

    notify("Habit updated", "success");
    return { success: true };

  } catch (err) {
    notify("Failed to update habit", "error");
    return { success: false };
  }
},

deleteHabit: async (id) => {
  try {
    await clientServer.delete(`/api/habits/${id}`);

    set((state) => ({
      habits: state.habits.filter((h) => h._id !== id),
    }));

    notify("Habit deleted", "success");
    return { success: true };

  } catch (err) {
    notify("Failed to delete habit", "error");
    return { success: false };
  }
},

  markHabitLogComplete: async (habitId) => {
    try {
      set({ loading: true, error: null });

      const res = await clientServer.post(`/api/habitLogs/${habitId}`);
      set({
        loading: false,
      });
      notify("Marked Successfully", "success");
      console.log(res.data);
    } catch (err) {
      console.log(err);
      const message = err.response?.data?.message || "Failed get your Habits";
      set({
        error: message,
        loading: false,
      });
      notify(message, "error");

      return { success: false };
    }
  },

  getHabitSummary: async (habitId) => {
  try {
    set({ summaryLoading: true, error: null });

    const res = await clientServer.get(`/api/habitLogs/getHabitSummary/${habitId}`);

    set({
      habitSummary: res.data,
      loading: false,
    });

    return { success: true };
  } catch (err) {
    console.log(err);
    const message =
      err.response?.data?.message || "Failed to fetch habit summary";

    set({
      error: message,
      loading: false,
    });

    notify(message, "error");
    return { success: false };
  }
},
}));
