import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type : String,
        require: true
    },
    username :{
        type : String,
        require: true
    },
    age : {
        type: Number,
        require : true
    },
    email: {
        type : String,
        unique: true,
        require: true
    },
    role: {

        type : String,
        require: true
    }
})

    const userModel = mongoose.model("User", userSchema);

export default userModel;
