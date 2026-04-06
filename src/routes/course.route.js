import express from "express";
import * as CourseController from "../controllers/course.controller.js";

const CourseRouter = express.Router();

CourseRouter.get("/", CourseController.getAllCourse);
CourseRouter.get("/:id", CourseController.getCourseById);
CourseRouter.post("/", CourseController.CreateCourse);
CourseRouter.patch("/:id", CourseController.UpdateCourse);
CourseRouter.delete("/:id", CourseController.DeleteCourse);

export default CourseRouter;
