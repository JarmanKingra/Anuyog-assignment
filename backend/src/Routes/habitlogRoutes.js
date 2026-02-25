import express from "express";
import {
  markHabitComplete,
  getHabitLogs,
  getHabitSummary
} from "../Controllers/habitlogController.js";
import authMiddleware from "../Middlewares/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/:habitId", markHabitComplete);
router.get("/:habitId", getHabitLogs);
router.get("/getHabitSummary/:id", getHabitSummary)

export default router;
