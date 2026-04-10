import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
const stockSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    quantity: {
      type: Number,
    },
    price: {
      type: Number,
    },
    byUser: {
      type: mongoose.Types.ObjectId,
      ref: "Users",
    },
  },
  {
    timestamps: true,
  },
);

stockSchema.plugin(mongoosePaginate);

const stockModel = mongoose.model("Stock", stockSchema);

export default stockModel;
