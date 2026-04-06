import mongoose from "mongoose";
import courseModel from "./course.model.js";

const teacherSchema = new mongoose.Schema({
    name: {
        type : String,
        required: true
    },
    subject: {
        type : String,
        required: true
    },
    yearsOfExperience: {
        type : Number,
        required: true
    },
    courses:[
        {type: mongoose.Types.ObjectId, ref: 'Course'}
    ]

},{
    timestamps : true
})

    const teacherModel = mongoose.model("Teacher", teacherSchema);

export default teacherModel;
