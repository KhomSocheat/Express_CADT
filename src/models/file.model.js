import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"

const fileSchema = new mongoose.Schema(
  {
    filename: {
        type: String,
        required: true,
    },
    size: {
        type: Number,
        required: true,
    },
    originalName: {
        type: String,
        required: true,
    },
    path:{
        type: String,
        required: true,
    },
    mimetype:{
        type: String,
        required: true,
    },
    encoding:{
        type: String,
        required: true,
    },
  },{
    timestamps: true,
  }
);

fileSchema.plugin(mongoosePaginate)

const fileModel = mongoose.model("File", fileSchema);

export default fileModel;
