import express from "express";
import UserRouter from "./user.route.js";
import TeacherRouter from "./teacher.route.js";
import BookRouter from "./book.route.js";
import MoneyRouter from "./money.route.js";
import StockRouter from "./stock.route.js";
import CourseRouter from "./course.route.js";
import AuthRouter from "./auth.route.js";
import { authenticate } from "../middleware/index.js";
const ApiRouter = express.Router();

ApiRouter.use("/user" ,authenticate ,UserRouter);
ApiRouter.use("/teacher", authenticate, TeacherRouter);
ApiRouter.use("/book", authenticate, BookRouter);
ApiRouter.use("/money", authenticate, MoneyRouter);
ApiRouter.use("/stock", authenticate, StockRouter);
ApiRouter.use("/course", authenticate, CourseRouter);
ApiRouter.use("/auth", AuthRouter);

export default ApiRouter;
