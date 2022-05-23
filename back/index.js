import express from "express";
import cors from "cors";
import multer from "multer";

import db from "./db.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use("/files", express.static("./upload/"));

const upload = multer({
  dest: "./upload/",
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./upload");
    },
    filename: (req, file, cb) => {
      const fileName = file.originalname;
      cb(null, fileName);
    },
  }),
});

app.post("/upload", upload.single("file"), async (req, res) => {
  const { filename, size } = req.file;
  const fileSaveFormat = {
    filename,
    size,
    url: `http://localhost:5000/files/${filename}`,
    createAt: Date.now,
  };

  await db.collection("upload").insertOne(fileSaveFormat);

  res.send({
    upload: true,
    files: req.files,
  });
});

app.listen(5000, () => {
  console.log("App running on http://localhost:5000");
});
