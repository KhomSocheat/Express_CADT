import asyncHandler from "express-async-handler";
import courseModel from "../models/course.model.js";
import mongoose from "mongoose";

export const createCourse = asyncHandler(async (req, res) => {
    const course = new courseModel(req.body);
    await course.save();
    return res.status(201).json(course);
});

export const getCourses = asyncHandler(async (req, res) => {
    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;
    const populate = req.query.populate || "";

    const options = {
        page,
        limit,
        populate,
    };

    const courses = await courseModel.paginate({}, options);

    return res.json(courses);
});

export const getCourseById = asyncHandler(async (req, res) => {
    const id = req.params.id; //this is req from user 

    if (!mongoose.Types.ObjectId.isValid(id)) {
        const error = new Error("Invalid ID");
        error.statusCode = 400;
        throw error;
    }

    const course = await courseModel.findById(id);

    if (!course) {
        const error = new Error("Course not found");
        error.statusCode = 404;
        throw error;
    }

    return res.json(course);
});

export const updateCourse = asyncHandler(async (req, res) => {
    const id = req.params.id;

    const course = await courseModel.findByIdAndUpdate(id, req.body, { new: true });

    if (!course) {
        const error = new Error("Course not found");
        error.statusCode = 404;
        throw error;
    }

    return res.json(course);
});

export const deleteCourse = asyncHandler(async (req, res) => {
    const id = req.params.id;

    const course = await courseModel.findByIdAndDelete(id);

    if (!course) {
        const error = new Error("Course not found");
        error.statusCode = 404;
        throw error;
    }

    return res.json({ message: "Course deleted successfully" });
});