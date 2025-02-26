import multer from "multer";
import fs from "fs";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = "public/uploads/csv";
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const fileFilter = (req: any, file: any, cb: any) => {
  if (file.mimetype === "text/csv") {
    cb(null, true);
  } else {
    cb(new Error("Only CSV files are allowed"), false);
  }
};

const csvUpload = multer({ storage, fileFilter }).single("file");

export default csvUpload;
