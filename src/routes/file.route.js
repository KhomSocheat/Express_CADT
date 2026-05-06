import express from "express";
import * as FileController from "../controllers/file.controller.js";
import { upload } from "../middleware/multer.js";

const FileRouter = express.Router();

FileRouter.post("/upload", upload, FileController.uploadSingleFile);
FileRouter.post("/uploads", uploads, FileController.uploadMultipleFiles);

export default FileRouter;