import express from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { getUserProfile, updateUserProfile } from "../controllers/user.controller";
import upload from "../middleware/multer.middleware";
const router = express.Router();

router.get("/profile", authMiddleware, getUserProfile);
router.put("/profile/update", [authMiddleware, upload], updateUserProfile);

export default router;
