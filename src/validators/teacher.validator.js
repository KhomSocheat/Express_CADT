import { checkSchema, query } from "express-validator";
import teacherModel from "../models/teacher.model.js";

export const createTeacherValidator = checkSchema({

    name: {
        notEmpty: {
            errorMessage: "Name is required"
        },
        isLength: {
            options: { min: 2 },
            errorMessage: "Name must be at least 2 characters"
        },
        matches: {
            options: /^[A-Za-z\s]+$/,
            errorMessage: "Only letters and spaces are allowed"
        },
        trim: true
    },

    subject: {
        notEmpty: {
            errorMessage: "Subject is required"
        },
        isLength: {
            options: { min: 2 },
            errorMessage: "Subject must be at least 2 characters"
        },
        trim: true
    },

    yearsOfExperience: {
        notEmpty: {
            errorMessage: "Years of experience is required"
        },
        isInt: {
            options: { min: 0 },
            errorMessage: "Years of experience must be a number >= 0"
        },
        toInt: true
    }

});

export const handleQuery = [
  query("populate")
    .optional()
    .isIn(["courses"])
];