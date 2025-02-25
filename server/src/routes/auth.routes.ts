import express from "express";
import { register, login, verifyEmail } from "../controllers/auth.controller";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/verify/:token", verifyEmail);

export default router;
