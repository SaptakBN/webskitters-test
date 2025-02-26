import { NextFunction, Response } from "express";
import fs from "fs";
import path from "path";
import csv from "csv-parser";
import Question from "../models/question";
import Category from "../models/category";
import Answer from "../models/answer";
import { AuthRequest } from "../middleware/auth.middleware";

export const uploadQuestions = async (req: AuthRequest, res: Response, next: NextFunction) => {
  if (!req.file) {
    res.status(400).json({ message: "No file uploaded" });
    return;
  }

  const filePath = path.join(__dirname, "../../public/uploads/csv", req.file.filename);

  try {
    const questions = await processCSV(filePath);

    for (const question of questions) {
      const categories = [];
      console.log(question);
      if (!question.categoryNames.length || !question.question || !question.options.length || !question.correctAnswer) {
        res.json({ message: "Invalid question data" });
        return;
      }
      for (const categoryName of question.categoryNames) {
        const category = await Category.findOne({ name: categoryName });
        if (category) {
          categories.push(category._id);
        } else {
          const newCategory = new Category({ name: categoryName });
          await newCategory.save();
          categories.push(newCategory._id);
        }
      }
      question.categories = categories;
      //   console.log(question);
    }

    console.log("CSV file successfully processed", questions);

    if (questions.length > 0) {
      await Question.insertMany(questions);
    }

    res.status(200).json({ message: "Questions uploaded successfully", count: questions.length });
  } catch (error) {
    console.error("Error uploading questions:", error);
    next(error);
  } finally {
    fs.unlinkSync(filePath);
  }
};

const processCSV = (filePath: string) => {
  const questions: any[] = [];
  return new Promise<any[]>((resolve, reject) => {
    const promises: Promise<void>[] = [];

    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (row) => {
        promises.push(
          (async () => {
            try {
              const options = row.options.trim().split("|");
              const categoryNames = row.categories.split("|").map((c: string) => c.trim());

              const question = {
                question: row.question.trim(),
                options: options,
                correctAnswer: row.correctAnswer.trim(),
                categoryNames,
              };

              questions.push(question);
            } catch (err) {
              console.error("Error processing row:", err);
            }
          })()
        );
      })
      .on("end", async () => {
        await Promise.all(promises);
        resolve(questions);
      })
      .on("error", (error) => reject(error));
  });
};

export const answerQuestion = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const { questionId } = req.params;
  const { answer } = req.body;

  try {
    const question = await Question.findById(questionId);
    if (!question) {
      res.status(404).json({ message: "Question not found" });
      return;
    }

    const isCorrect = String(question.correctAnswer).trim() === String(answer).trim();

    const updatedAnswer = await Answer.findOneAndUpdate(
      { questionId, userId: req.user?._id },
      { answer, isCorrect },
      { upsert: true, new: true }
    );

    res.status(200).json({ message: "Answer submitted successfully", answer: updatedAnswer });
  } catch (error) {
    next(error);
  }
};
