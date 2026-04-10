import express from "express";
import * as TeacherController from "../controllers/techer.controller.js";
import { handleValidation, teacherMiddleware } from "../middleware/index.js";
import { createTeacherValidator, handleQuery } from "../validators/teacher.validator.js";

const TeacherRouter = express.Router();

TeacherRouter.get("/", handleQuery,handleValidation,teacherMiddleware, TeacherController.getAllTeachers);
TeacherRouter.get("/:id", TeacherController.getTeacherById);
TeacherRouter.post("/", createTeacherValidator,handleValidation ,TeacherController.CreateTeacher);
TeacherRouter.patch("/:id", TeacherController.UpdateTeacher);
TeacherRouter.delete("/:id", TeacherController.DeleteTeacher);

export default TeacherRouter;
