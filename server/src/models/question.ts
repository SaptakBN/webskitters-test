import mongoose, { Schema, Document } from "mongoose";

export interface IQuestion extends Document {
  text: string;
  options: string[];
  correctAnswer: string;
  categories: mongoose.Types.ObjectId[];
}

const QuestionSchema: Schema = new Schema(
  {
    text: { type: String, required: true, trim: true },
    options: { type: [String], required: true },
    correctAnswer: { type: String, required: true },
    categories: [{ type: Schema.Types.ObjectId, ref: "Category", required: true }],
  },
  { timestamps: true }
);

export default mongoose.model<IQuestion>("Question", QuestionSchema);
