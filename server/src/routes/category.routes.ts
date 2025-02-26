import express from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import {
  getAllCategories,
  getCategoriesWithQuestionCount,
  getQuestionsByCategory,
} from "../controllers/category.controller";
const router = express.Router();

router.get("/", authMiddleware, getAllCategories);
router.get("/question-count", authMiddleware, getCategoriesWithQuestionCount);
router.get("/:categoryId", authMiddleware, getQuestionsByCategory);

export default router;
