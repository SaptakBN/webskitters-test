import mongoose from "mongoose";
import seed from "../seed/admin.seed";

const connectDB = async (): Promise<void> => {
  try {
    const mongoURI = process.env.MONGO_URI as string;

    if (!mongoURI) {
      throw new Error("MONGO_URI is not defined in environment variables.");
    }

    console.log("MongoDB Connecting...");

    await mongoose.connect(mongoURI);

    console.log("MongoDB Connected...");

    await seed();
  } catch (error) {
    console.error("MongoDB Connection Error:", error);

    process.exit(1);
  }
};

export default connectDB;
