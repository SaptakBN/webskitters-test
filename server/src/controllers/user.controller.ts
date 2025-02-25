import User from "../models/user";
import { NextFunction, Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
import fs from "fs/promises";
import path from "path";

// Get Profile
export const getUserProfile = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const user = await User.findById(req.user?.id).select("-password");
  res.json(user);
};

// Update Profile
export const updateUserProfile = async (req: AuthRequest, res: Response, next: NextFunction) => {
  // console.log(req.file, req.body);
  try {
    const userId = req.user?._id!;
    const existingUser = await User.findById(userId);
    if (!existingUser) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    if (req.file) {
      const filePath = `/images/users/${req.file.filename}`;
      if (existingUser.profilePicture) {
        await fs
          .unlink(path.join("public", existingUser.profilePicture))
          .then(() => {
            existingUser.profilePicture = req.file ? filePath : existingUser.profilePicture;
          })
          .catch((err) => {
            console.error("Error deleting old image:", err);
          });
      } else {
        existingUser.profilePicture = filePath;
      }
    }
    existingUser.name = req.body.name || existingUser.name;
    existingUser.phone = req.body.phone || existingUser.phone;
    existingUser.age = req.body.age || existingUser.age;
    const updatedUser = await existingUser.save();
    const user = await User.findById(updatedUser._id).select("-password");
    res.status(200).json(user);
    res.status(200).json({ message: "Profile updated successfully" });
  } catch (error) {
    console.error("Error updating user image:", error);
    next(error);
  }
};
