import teacherModel from "../models/teacher.model.js";
import asyncHandler from "express-async-handler";



export const getAllTeachers = asyncHandler(async (req, res) => {
  const limit = parseInt(req.query.limit) || 10;
  const page = parseInt(req.query.page) || 1;
  const populate = req.query.populate || ''
  const minYear = parseInt(req.query.minYear) || 0;
  const options = {
    page, 
    limit,
    populate
  };
  let filteredTeachers = await teacherModel.paginate({
    yearsOfExperience: {
        $gte : minYear
    }
  },options);

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
    { new: true }, // return updated data
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
