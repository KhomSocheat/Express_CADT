import express from "express";
import * as CourseController from "../controllers/course.controller.js";

const CourseRouter = express.Router();

CourseRouter.get("/", CourseController.getCourses);
CourseRouter.get("/:id", CourseController.getCourseById);
CourseRouter.post("/", CourseController.createCourse);
CourseRouter.patch("/:id", CourseController.updateCourse);
CourseRouter.delete("/:id", CourseController.deleteCourse);

export default CourseRouter;
