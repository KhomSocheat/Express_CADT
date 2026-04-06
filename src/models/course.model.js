import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
    title: {
        type : String,
        required: true
    },
    credit: {
        type : Number,
        required: true
    },
    description: {
        type : String,
        required : true
    }
})

const courseModel = mongoose.model("Course", courseSchema);

export default courseModel;
