import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type : String,
        required: true
    },
    username :{
        type : String,
        required: true
    },
    age : {
        type: Number,
        required : true
    },
    email: {
        type : String,
        unique: true,
        required: true
    },
    role: {

        type : String,
        required: true
    }
})

    const userModel = mongoose.model("User", userSchema);

export default userModel;
