import { teachers } from "../models/teacher.model.js";

export const getAllTeachers = (req, res) => {
    let filteredTeachers = teachers;
    if(req.query.subject){
        filteredTeachers = teachers.filter((t) => {
            return t.subject == req.query.subject
        })
    }
    if(req.query.minYear){
        filteredTeachers = teachers.filter((t) => {
            return t.yearsOfExperience <= req.query.minYear
        }
        )
    }
    return res.json(filteredTeachers);
};

export const getTeacherById = (req, res) => {
    const id = parseInt(req.params.id);
    const teacher = teachers.find((t) => {
        return t.id === id;
    });
    if (!teacher) {
        return res.status(404).json({ message: "Not Found" });
    }
    return res.json(teacher);
};

export const UpdateTeacher = (req, res) => {
    const teacherId = req.params.id;
    const teacherIndex = teachers.findIndex((t) => {
        return teacherId == t.id;
    });

    if (teacherIndex === -1) {
        return res.status(404).json({ message: "Not Found" });
    }

    teachers[teacherIndex] = { id: parseInt(teacherId), ...req.body };
    return res.json({ message: `Teacher with id ${teacherId} updated` });
};

export const CreateTeacher = (req, res) => {
    teachers.push(req.body);

    return res
        .status(201)
        .json({ message: `Teacher with name ${req.body.name} created` });
};

export const DeleteTeacher = (req, res) => {
    const id = parseInt(req.params.id);
    const deleteIndex = teachers.findIndex((t) => {
        return t.id === id;
    });
    if (deleteIndex === -1) {
        return res.status(404).json({ message: "Not Found" });
    }
    teachers.splice(deleteIndex, 1);
    return res.json({ message: `Teacher with id ${id} deleted` });
};

