import express from "express";
import UserRouter from "./user.route.js";
import TeacherRouter from "./teacher.route.js";
import BookRouter from "./book.route.js";
import MoneyRouter from "./money.route.js";
import StockRouter from "./stock.route.js";
import CourseRouter from "./course.route.js";
import AuthRouter from "./auth.route.js";
const ApiRouter = express.Router();

ApiRouter.use("/user", UserRouter);
ApiRouter.use("/teacher", TeacherRouter);
ApiRouter.use("/book", BookRouter);
ApiRouter.use("/money", MoneyRouter);
ApiRouter.use("/stock", StockRouter);
ApiRouter.use("/course", CourseRouter);
ApiRouter.use("/auth", AuthRouter);

export default ApiRouter;
