import express from "express";
import UserRouter from "./user.route.js";
import TeacherRouter from "./teacher.route.js";
import BookRouter from "./book.route.js";
import MoneyRouter from "./money.route.js";
import StockRouter from "./stock.route.js";
import CourseRouter from "./course.route.js";
import AuthRouter from "./auth.route.js";
import { authenticate,CacheInterceptor,cacheMiddleware,invalidateCache } from "../middleware/index.js";
import rateLimit from 'express-rate-limit';
import RedisStore from 'rate-limit-redis';

const limiter = (ttl,request) => rateLimit({
    windowMs: ttl,
    max: request,
    statusCode: 429,
    message: { message: "Too many requests, please try again later." },
    store : new RedisStore({
        sendCommand: (...args) => redisClient.sendCommand(...args)
    })
})

const authLimiter = limiter(60 * 60 * 1000 ,20);
const generalLimiter = limiter(60 * 1000 ,30);

const ApiRouter = express.Router();

ApiRouter.use("/user" ,generalLimiter, authenticate ,cacheMiddleware,CacheInterceptor(60 * 10),invalidateCache ,UserRouter);
ApiRouter.use("/teacher",generalLimiter, authenticate, cacheMiddleware, CacheInterceptor(60 * 10), invalidateCache, TeacherRouter);
ApiRouter.use("/book",generalLimiter, authenticate, cacheMiddleware, CacheInterceptor(60 * 10), invalidateCache, BookRouter);
ApiRouter.use("/money",generalLimiter, authenticate, cacheMiddleware, CacheInterceptor(60 * 10), invalidateCache, MoneyRouter);
ApiRouter.use("/stock",generalLimiter, authenticate, cacheMiddleware, CacheInterceptor(60 * 10), invalidateCache, StockRouter);
ApiRouter.use("/course",generalLimiter, authenticate, cacheMiddleware, CacheInterceptor(60 * 10), invalidateCache, CourseRouter);
ApiRouter.use("/auth",authLimiter, AuthRouter);
ApiRouter.use("/file",FileRouter);

export {ApiRouter   ,generalLimiter,authLimiter};
