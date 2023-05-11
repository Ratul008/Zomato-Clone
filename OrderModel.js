const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    order_list: { type: Array, require: true },
    total: { type: Number, require: true },
    user_email: { type: String, require: true },
    mobile: { type: Number, require: true },
    order_id: { type: String, require: true },
    payment_id: { type: String, require: true },
    order_status: { type: Boolean, require: true },
    username: { type: String, require: true },
    address: { type: String, require: true },
  },
  {
    versionKey: false,
  }
);

const OrderModel = mongoose.model("order", OrderSchema, "orders");

module.exports = OrderModel;
