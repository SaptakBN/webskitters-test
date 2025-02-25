import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/user";

export interface AuthRequest extends Request {
  user?: Omit<IUser, "password" | "comparePassword">;
  file?: Express.Multer.File;
}

export const authMiddleware = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token) {
      res.status(401).json({ message: "Access denied" });
      return;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };
    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user) {
      res.status(401).json({ message: "Invalid token" });
      return;
    }

    next();
  } catch (error) {
    next(error);
  }
};
