import { NextFunction, Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
import Category from "../models/category";
import Question from "../models/question";

export const getAllCategories = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const categories = await Category.find({});

    res.json(categories);
  } catch (error) {
    next(error);
  }
};

export const getQuestionsByCategory = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const { categoryId } = req.params;
  try {
    if (!categoryId) res.json({ message: "Invalid categoryId" });

    const category = await Category.findById(categoryId);

    if (!category) res.json({ message: "Category not found" });

    const questions = await Question.find({ categories: categoryId }).populate("categories");

    res.json({ questions });
  } catch (error) {
    next(error);
  }
};
