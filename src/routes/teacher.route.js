import express from "express";
import * as TeacherController from "../controllers/techer.controller.js";

const TeacherRouter = express.Router();

TeacherRouter.get("/", TeacherController.getAllTeachers);
TeacherRouter.get("/:id", TeacherController.getTeacherById);
TeacherRouter.post("/", TeacherController.CreateTeacher);
TeacherRouter.patch("/:id", TeacherController.UpdateTeacher);
TeacherRouter.delete("/:id", TeacherController.DeleteTeacher);

export default TeacherRouter;
