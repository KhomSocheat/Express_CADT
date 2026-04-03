import { checkSchema } from "express-validator";
import userModel from "../models/user.model.js";

export const createUserValidator = checkSchema({
    
    name: {
        notEmpty: {
            errorMessage: "Name is required"
        },
        matches: {
            options: /^[A-Za-z\s]+$/,
            errorMessage: "Only letters and spaces are allowed"
        },
        trim: true
    },

    username: {
        notEmpty: {
            errorMessage: "Username is required"
        },
        custom: {
            options: async (value) => {
                const user = await userModel.findOne({ username: value });

                if (user) {
                    throw new Error(`Username ${value} already exists`);
                }

                return true;
            }
        }
    },

    age: {
        isInt: {
            options: {
                min: 18,
                max: 100
            },
            errorMessage: "Age must be between 18 and 100"
        }
    },

    email: {
        notEmpty: {
            errorMessage: "Email is required"
        },
        isEmail: {
            errorMessage: "Invalid email"
        },
        custom: {
            options: async (value) => {
                const email = await userModel.findOne({ email: value });

                if (email) {
                    throw new Error(`Email ${value} already exists`);
                }

                return true;
            }
        }
    },

    role: {
        isIn: {
            options: [["member", "admin", "editor"]],
            errorMessage: "Role must be member, admin, or editor"
        }
    }

});