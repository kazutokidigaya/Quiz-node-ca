import express from "express";
import {
  createQuiz,
  getAllQuiz,
  getQuizById,
  submitQuiz,
} from "../controllers/quiz.controllers.js";
import {
  authenticateUser,
  refreshAccessTokenIfNeeded,
} from "../middleware/auth.middleware.js";

const router = express.Router();

router.use(refreshAccessTokenIfNeeded);

router.post("/create", createQuiz);

router.get("/", getAllQuiz);

router.get("/:quizId", getQuizById);

router.post("/submit", authenticateUser, submitQuiz);

export default router;
