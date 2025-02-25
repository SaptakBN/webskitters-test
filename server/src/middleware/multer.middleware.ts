import multer, { FileFilterCallback } from "multer";
import fs from "fs";
import { AuthRequest } from "./auth.middleware";

const storage = multer.diskStorage({
  destination: function (req: AuthRequest, file, cb) {
    const dir = "public/images/users";
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: function (req: AuthRequest, file, cb) {
    const extension = file.mimetype.split("/")[1];
    cb(null, `user-${req.user?._id}-${Date.now()}.${extension}`);
  },
});

const fileFilter = (req: AuthRequest, file: Express.Multer.File, cb: FileFilterCallback) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new Error("Only images are allowed"));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 1024 * 1024 * 5 },
}).single("image");

export default upload;
