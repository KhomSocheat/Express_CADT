import { checkSchema } from "express-validator";

export const createUserValidator = checkSchema({
    name: {
        matches: {
            options: {
                matches : [/^[A-Za\s]+$/]
            }
        }

    },
    username:{
        isAlpha: true
    },
    age:{
        isInt: {
            options : {
                min: 18,
                max : 100,
            }
        }
    },
    email:{
        isEmail: true
    },
    role: {
        isIn: {
            options: ["member","admin","editor "]
        }
    }

})

