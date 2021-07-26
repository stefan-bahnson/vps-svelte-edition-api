import mongoose from "mongoose"

const OrderSchema = new mongoose.Schema({
  title: {
    type: String,
    default: null,
  },
  description: {
    type: String,
    default: null,
  },
  status: {
    type: String,
    default: "Pending",
  },
  tags: [String],
  created: {
    type: Date,
  },
})

const Order = mongoose.model("order", OrderSchema)

export default Order
