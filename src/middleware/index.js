import { validationResult } from "express-validator";
import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import userModel from '../models/user.model.js'
import { responseHandler } from 'express-intercept'
import redisClient from '../redis/index.js'
export function teacherMiddleware(req, res, next) {
    if(req.query.minYear){
        const minYear = parseInt(req.query.minYear);
        if(isNaN(minYear) || minYear < 0){
            return res.status(400).json({message: "minYear must be a positive number"})
        }
    }
    next();
}


export function stockMiddleware(req, res, next) {
    const errors = [];
    if(req.query.minQuantity){
        const minQuantity = parseInt(req.query.minQuantity);
        if(isNaN(minQuantity) || minQuantity < 0){
           errors.push({error : ''});
        }
    }
    if(req.query.maxQuantity){
        const maxQuantity = parseInt(req.query.maxQuantity);
        if(isNaN(maxQuantity) || maxQuantity < 0){
            return res.status(400).json({message: "maxQuantity must be a positive number"})
        }
    }
    if(errors.length > 0){
        return res.status(400).json({errors});
    }
    next();
}

export function handleValidation(req,res,next){
    const result = validationResult(req);
    if(result.isEmpty()){
        next();
        return;
    }

    res.status(400).send({errors: result.array()});
}

export function handleError(error,req,res,next){
    console.error(error)
    return res.status(500).json({
        message: error.message
    });
}

export const authenticate = asyncHandler(async (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).json({ message: "No Token Provided" });
    }
    const token = req.headers.authorization.split(" ")[1];
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(payload._id);
        req.user = user;
        next();
    } catch (err) {
        if (err.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Token expired" });
        }
        return res.status(401).json({ message: "Invalid token" });
    }
});

export const CacheInterceptor = (ttl) => {
  return async (req, res, next) => {

    // Only cache GET requests
    if (req.method !== "GET") {
      return next();
    }

    const key = req.originalUrl;

    try {
      // 1. Check cache
      const cached = await redisClient.get(key);

      if (cached) {
        return res.json(JSON.parse(cached));
      }

      // 2. Override res.json
      const originalJson = res.json.bind(res);

      res.json = (body) => {
        redisClient.setEx(key, ttl, JSON.stringify(body));
        return originalJson(body);
      };

      next();

    } catch (err) {
      console.error("Cache error:", err);
      next();
    }
  };
};

export const cacheMiddleware = asyncHandler(async (req, res, next) => {
    const { originalUrl } = req;

    if(req.method == 'GET'){
        const cachedData = await redisClient.get(originalUrl);
        if(cachedData !== null){
            return res.json(JSON.parse(cachedData));
        }
    }
    next();
})

export const invalidateCache = responseHandler().for((req) => {
    const methods = ['POST','PUT','DELETE','PATCH']
    return methods.includes(req.method);
}).if((res) => {
    const codes = [200,201,204]
    return codes.includes(res.statusCode);
}).getString(async (body,res,req) => {
    const {baseUrl} = req;
    const key = await redisClient.keys(`${baseUrl}*`);
    for(const k of key){
        await redisClient.del(k);
    }
} )