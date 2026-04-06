import asyncHandler from "express-async-handler";
import courseModel from "../models/course.model.js";

export const CreateCourse = asyncHandler(async (req, res) => {
	const course = new courseModel(req.body);
	await course.save();
	return res.status(201).json(course);
});

export const getAllCourse = asyncHandler(async (req, res) => {
	const course = await courseModel.find();
	return res.json(course);
});

export const getCourseById = asyncHandler(async (req, res) => {
	const id = req.params.id;
	const item = await courseModel.findById(id);
	if (!item) {
		return res.status(404).json({ message: "Not Found" });
	}
	return res.json(item);
});

export const UpdateCourse = asyncHandler(async (req, res) => {
	const courseId = req.params.id;
	const item = await courseModel.findByIdAndUpdate(courseId, req.body, { new: true });
	return res.status(200).json({ message: `Course with id ${courseId} updated`, item });
});


export const DeleteCourse = asyncHandler(async (req, res) => {
	const courseId = req.params.id;
	await courseModel.findByIdAndDelete(courseId);
	return res.json({ message: `Course with id ${courseId} deleted` });
});

