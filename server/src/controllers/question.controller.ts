import { NextFunction, Response } from "express";
import fs from "fs";
import path from "path";
import csv from "csv-parser";
import Question from "../models/question";
import Category from "../models/category";
import { AuthRequest } from "../middleware/auth.middleware";

export const uploadQuestions = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.file) {
      res.status(400).json({ message: "No file uploaded" });
      return;
    }

    const filePath = path.join(__dirname, "../../public/uploads/csv", req.file.filename);

    const questions: any[] = [];

    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", async (row) => {
        try {
          // Fetch category IDs from names
          const categoryNames = row.categories.split("|").map((c: string) => c.trim());
          const categories = await Category.find({ name: { $in: categoryNames } });
          const categoryIds = categories.map((cat) => cat._id);
          const question = {
            text: row.text,
            options: row.options.split("|"),
            correctAnswer: row.correctAnswer,
            categoryIds,
          };
          console.log(question);
          // Prepare question object
          questions.push(question);
        } catch (err) {
          console.error("Error processing row:", err);
        }
      })
      .on("end", async () => {
        console.log("CSV file successfully processed", questions);
        // Insert all questions into MongoDB
        // await Question.insertMany(questions);
        res.status(200).json({ message: "Questions uploaded successfully" });

        // Remove the file after processing
        // fs.unlinkSync(filePath);
      });
  } catch (error) {
    console.error("Error uploading questions:", error);
    next(error);
  }
};
