import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser extends Document {
  _id: string;
  name: string;
  email: string;
  phone: string;
  age: number;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  profilePicture?: string;
  isVerified?: boolean;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String },
    email: { type: String, unique: true, required: true },
    phone: { type: String },
    age: { type: Number },
    password: { type: String, required: true },
    profilePicture: { type: String },
    isVerified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Hash password before saving
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare passwords
UserSchema.methods.comparePassword = async function (candidatePassword: string) {
  return bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model<IUser>("User", UserSchema);
