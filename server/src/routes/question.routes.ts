import express from "express";
import csvUpload from "../middleware/csv.middleware";
import { authMiddleware } from "../middleware/auth.middleware";
import { uploadQuestions, answerQuestion } from "../controllers/question.controller";
const router = express.Router();

router.post("/upload", [authMiddleware, csvUpload], uploadQuestions);
router.post("/answer/:questionId", authMiddleware, answerQuestion);

export default router;
