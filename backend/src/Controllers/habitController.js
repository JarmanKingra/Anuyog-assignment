import Habit from "../Models/habitModel.js";
import HabitLog from "../Models/habitLog.js";
import { formatLocalDate } from "../Utils/dateFormatter.js";

export const createHabit = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }
    const habit = await Habit.create({
      user: req.user._id,
      title,
      description,
    });
    return res.status(201).json(habit);
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

// export const getHabits = async (req, res) => {
//   try {
//     const habits = await Habit.find({ user: req.user._id });

//     const today = formatLocalDate(new Date());

//     const result = [];

//     for (let habit of habits) {
//       const log = await HabitLog.findOne({
//         habit: habit._id,
//         date: today,
//       });

//       result.push({
//         ...habit.toObject(),
//         isCompletedToday: !!log,
//       });
//     }

//     return res.json(result);

//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ message: "Server error" });
//   }
// };

export const getHabits = async (req, res) => {
  try {
    const habits = await Habit.find({ user: req.user._id });

    const today = formatLocalDate(new Date());

    // Get all habit IDs
    const habitIds = habits.map(h => h._id);

    // Get all logs for today in ONE query
    const todayLogs = await HabitLog.find({
      habit: { $in: habitIds },
      date: today,
    });

    // Convert to simple array of completed habit IDs
    const completedIds = todayLogs.map(log => log.habit.toString());

    const result = habits.map(habit => ({
      ...habit.toObject(),
      isCompletedToday: completedIds.includes(
        habit._id.toString()
      ),
    }));

    return res.json(result);

  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

export const updateHabit = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    const habit = await Habit.findOneAndUpdate(
      { _id: id, user: req.user._id, },
      { title, description },
      { new: true },
    );
    if (!habit) {
      return res.status(404).json({ message: "Habit not found" });
    }
    return res.status(200).json(habit);
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

export const deleteHabit = async (req, res) => {
  try {
    const { id } = req.params;

    const habit = await Habit.findOneAndDelete({
      _id: id,
      user: req.user._id,
    });
    if (!habit) {
      return res.status(404).json({ message: "Habit not found" });
    }

    await HabitLog.deleteMany({ habit: id });

    return res.status(200).json({ message: "Habit deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};
