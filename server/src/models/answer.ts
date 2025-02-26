import mongoose from "mongoose";

const AnswerSchema = new mongoose.Schema(
  {
    questionId: { type: mongoose.Schema.Types.ObjectId, ref: "Question", required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    answer: { type: String, required: true },
    isCorrect: { type: Boolean, default: false },
  },
  { timestamps: true }
);

AnswerSchema.index({ questionId: 1, userId: 1 }, { unique: true });

export default mongoose.model("Answer", AnswerSchema);

export interface IAnswer {
  questionId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  answer: string;
  isCorrect: boolean;
}
