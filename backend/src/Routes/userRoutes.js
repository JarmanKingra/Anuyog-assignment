import express from "express";
import rateLimit from "express-rate-limit";
const router = express.Router();
import {register, login} from "../Controllers/userController.js"

const loginLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 5,
  message: {
    message: "Too many login attempts. Try again in 10 minutes.",
  },
});

router.post('/signup', loginLimiter, register);
router.post('/login', loginLimiter, login);

export default router;