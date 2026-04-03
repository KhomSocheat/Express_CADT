import { checkSchema } from "express-validator";

export const createStockValidator = checkSchema({

    name: {
        notEmpty: {
            errorMessage: "Name is required"
        },
        isLength: {
            options: { min: 2 },
            errorMessage: "Name must be at least 2 characters"
        },
        matches: {
            options: /^[A-Za-z0-9\s]+$/,
            errorMessage: "Name can only contain letters, numbers, and spaces"
        },
        trim: true
    },

    quantity: {
        notEmpty: {
            errorMessage: "Quantity is required"
        },
        isInt: {
            options: { min: 0 },
            errorMessage: "Quantity must be a number >= 0"
        },
        toInt: true
    },

    price: {
        notEmpty: {
            errorMessage: "Price is required"
        },
        isFloat: {
            options: { min: 0 },
            errorMessage: "Price must be a number >= 0"
        },
        toFloat: true
    }

});