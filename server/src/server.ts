import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db";
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import path from "path";

dotenv.config();

const app = express();
connectDB();
app.use(express.json());
app.use(cors());
console.log(path.join(__dirname, "public"));
app.use(express.static(path.join(__dirname, "../public")));

app.use("/api", authRoutes);
app.use("/api/user", userRoutes);

app.get("/", (req, res) => {
  res.send("Hello from server");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));
