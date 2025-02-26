import express from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { getAllCategories, getQuestionsByCategory } from "../controllers/category.controller";
const router = express.Router();

router.get("/", authMiddleware, getAllCategories);
router.get("/:categoryId", getQuestionsByCategory);

export default router;
