import teacherModel from "../models/teacher.model.js";

export const getAllTeachers = async (req, res) => {
    try {
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
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

export const getTeacherById = async (req, res) => {
    try{
         const id = parseInt(req.params.id);
         const teacher = await teacherModel(id);
         return res.json(teacher);
    }catch(err){
        return res.status(404).json({message: err})
    }
   
   
};

export const UpdateTeacher = async (req, res) => {
  try {
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

  } catch (error) {
    return res.status(500).json({
      message: "Error updating teacher",
      error: error.message,
    });
  }
};
export const CreateTeacher = async (req, res) => {
    try {
        const teacher = new teacherModel(req.body);
        await teacher.save();

        return res.status(200).json({
        message: "Teacher save success",
        data: teacher,
    });
    } catch (error) {
         return res.status(500).json({
            message: "Error save teacher",
            error: error.message,
    });
    }
};

export const DeleteTeacher = async (req, res) => {
  try {
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

  } catch (error) {
    return res.status(500).json({
      message: "Error deleting teacher",
      error: error.message,
    });
  }
};