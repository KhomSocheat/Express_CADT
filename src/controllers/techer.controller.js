import teacherModel from "../models/teacher.model.js";
import asyncHandler from 'express-async-handler';
export const getAllTeachers = asyncHandler(async (req, res) => {
  // Get all teachers with courses populated
  let filteredTeachers = await teacherModel.find().populate('courses');

  // Filter by subject if query exists
  if (req.query.subject) {
    filteredTeachers = filteredTeachers.filter((t) => t.subject === req.query.subject);
  }

  // Filter by minimum years of experience if query exists
  if (req.query.minYear) {
    const minYear = parseInt(req.query.minYear, 10);
    filteredTeachers = filteredTeachers.filter((t) => t.yearsOfExperience >= minYear);
  }

  return res.json(filteredTeachers);
});

export const getTeacherById = asyncHandler(async (req, res) => {
     const id = parseInt(req.params.id);
     const teacher = await teacherModel(id);
     return res.json(teacher);
});

export const UpdateTeacher = asyncHandler(async (req, res) => {
    const teacherId = req.params.id;

    const updateTeacher = await teacherModel.findByIdAndUpdate(
      teacherId,
      req.body,
      { new: true } // return updated data
    );

    return res.status(200).json({
      message: "Teacher update success",
      data: updateTeacher,
    });
});
export const CreateTeacher = asyncHandler(async (req, res) => {
        const teacher = new teacherModel(req.body);

        await teacher.save();
        return res.status(200).json({
          message: "Teacher save success",
          data: teacher,
        });
});

export const DeleteTeacher = asyncHandler(async (req, res) => {
    const teacherId = req.params.id;

    const deletedTeacher = await teacherModel.findByIdAndDelete(teacherId);

    if (!deletedTeacher) {
      return res.status(404).json({
        message: "Teacher not found",
      });
    }

    return res.status(200).json({
      message: `Teacher with id ${teacherId} deleted successfully`,
      data: deletedTeacher,
    });
});