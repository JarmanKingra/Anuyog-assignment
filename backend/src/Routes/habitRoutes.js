import express from "express";
import {
  createHabit,
  getHabits,
  updateHabit,
  deleteHabit,
} from "../Controllers/habitController.js";
import authMiddleware from "../Middlewares/authMiddleware.js";

const router = express.Router();
router.use(authMiddleware);

router.post("/", createHabit);
router.get("/", getHabits);
router.put("/:id", updateHabit);
router.delete("/:id", deleteHabit);

export default router;