import express from "express";
import csvUpload from "../middleware/csv.middleware";
import { authMiddleware } from "../middleware/auth.middleware";
import { uploadQuestions } from "../controllers/question.controller";
const router = express.Router();

router.post("/upload", [authMiddleware, csvUpload], uploadQuestions);

export default router;
