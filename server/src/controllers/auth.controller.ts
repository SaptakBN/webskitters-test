import { NextFunction, Request, Response } from "express";
import User from "../models/user";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, password } = req.body;
    if (await User.findOne({ email })) {
      res.status(400).json({ message: "User already exists" });
      return;
    }
    const token = jwt.sign({ email }, process.env.JWT_SECRET as string, { expiresIn: "5m" });
    await sendVerificationEmail(email, token);
    await User.create({ email, password });
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await user.comparePassword(password))) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    if (!user.isVerified) {
      res.status(401).json({ message: "Email not verified" });
    }

    if (user) {
      const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET as string, {
        expiresIn: "1d",
      });
      res.json({ user: { id: user._id, email: user.email }, token });
    }
  } catch (error) {
    next(error);
  }
};

const sendVerificationEmail = async (email: string, token: string) => {
  let transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    secure: false,
    auth: {
      user: "saptakb738@gmail.com",
      pass: "felx mewl zwbg rxxa",
    },
    // auth: { user: process.env.EMAIL, pass: process.env.EMAIL_PASS },
  });

  await transporter.sendMail({
    from: process.env.EMAIL,
    to: email,
    subject: "Verify your email",
    text: `Click the link to verify: ${process.env.FRONTEND_URL}/verify/${token}`,
  });
};

export const verifyEmail = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { token } = req.params;
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { email: string };
    const user = await User.findOne({ email: decoded.email });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    user.isVerified = true;
    await user.save();
    res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    next(error);
  }
};
