import Habit from "../Models/habitModel.js"
import HabitLog from "../Models/habitLog.js";
import { formatLocalDate } from "../Utils/dateFormatter.js";

export const markHabitComplete = async (req, res) => {
  try {
    const { habitId } = req.params;

    if (!habitId) {
      return res.status(400).json({ message: "Habit ID is required" });
    }

    const habit = await Habit.findOne({
      _id: habitId,
      user: req.user._id,
    });

    if (!habit) {
      return res.status(404).json({ message: "Habit not found" });
    }

    const today = formatLocalDate(new Date());

    const log = await HabitLog.create({
      habit: habitId,
      date: today,
      completed: true,
    });

    return res.status(201).json(log);
  } catch (error) {
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ message: "Habit already marked complete today" });
    }

    return res.status(500).json({ message: "Server error" });
  }
};

export const getHabitLogs = async (req, res) => {
  try {
    const { habitId } = req.params;

    const habit = await Habit.findOne({
      _id: habitId,
      user: req.user._id,
    });

    if (!habit) {
      return res.status(404).json({ message: "Habit not found" });
    }

    const logs = await HabitLog.find({ habit: habitId }).sort({
      date: -1,
    });

    return res.status(200).json(logs);
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

export const getHabitSummary = async (req, res) => {
  try {
    const { id } = req.params;

    const habit = await Habit.findOne({
      _id: id,
      user: req.user._id,
    });

    if (!habit) {
      return res.status(404).json({ message: "Habit not found" });
    }

    const logs = await HabitLog.find({ habit: id }).sort({ date: 1 });

    const dateArray = logs.map((log) => log.date);
    const dateSet = new Set(dateArray);

    const todayDate = new Date();
    let checkDate = new Date(todayDate);

    // -------- CURRENT STREAK (Active Logic) --------
    let currentStreak = 0;

    if (!dateSet.has(formatLocalDate(checkDate))) {
      checkDate.setDate(checkDate.getDate() - 1);
    }

    while (dateSet.has(formatLocalDate(checkDate))) {
      currentStreak++;
      checkDate.setDate(checkDate.getDate() - 1);
    }

    // -------- MAX STREAK --------
    let maxStreak = 0;
    let streak = 0;

    for (let i = 0; i < dateArray.length; i++) {
      if (i === 0) {
        streak = 1;
      } else {
        const prev = new Date(dateArray[i - 1]);
        const curr = new Date(dateArray[i]);

        const diff =
          (curr - prev) / (1000 * 60 * 60 * 24);

        if (diff === 1) {
          streak++;
        } else {
          streak = 1;
        }
      }

      maxStreak = Math.max(maxStreak, streak);
    }

    // -------- COMPLETION RATE --------
    const createdAt = new Date(habit.createdAt);

    const totalDays =
      Math.floor(
        (new Date(formatLocalDate(todayDate)) -
          new Date(formatLocalDate(createdAt))) /
          (1000 * 60 * 60 * 24)
      ) + 1;

    const completionRate =
      totalDays > 0
        ? Math.round((logs.length / totalDays) * 100)
        : 0;

    return res.json({
      currentStreak,
      maxStreak,
      completionRate,
      totalCompletions: logs.length,
      totalDays
    });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};