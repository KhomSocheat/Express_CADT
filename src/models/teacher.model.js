import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema({
    name: {
        type : String,
        require: true
    },
    subject: {
        type : String,
        require: true
    },
    yearsOfExperience: {
        type : Number,
        require : true
    }

})

    const teacherModel = mongoose.model("Teacher", teacherSchema);

export default teacherModel;
