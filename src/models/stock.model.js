import mongoose from "mongoose";

const stockSchema = new mongoose.Schema({
    name: {
        type : String,

    },
    quantity: {
        type : Number,
    },
    price: {
        type : Number,
    },
    byUser: {
        type: mongoose.Types.ObjectId,
        ref: 'Users'
    }
},{
    timestamps : true
})

const stockModel = mongoose.model("Stock", stockSchema);

export default stockModel;
