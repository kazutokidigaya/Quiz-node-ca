import express from "express";
import { createQuiz, getAllQuiz } from "../controllers/quiz.controllers.js";

const router = express.Router();

router.post("/create", createQuiz);

router.get("/", getAllQuiz);

export default router;
