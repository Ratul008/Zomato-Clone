const OrderModel = require("../model/OrderModel");
const Razorpay = require("razorpay");
var crypto = require("crypto");
let saveOrder = async (data) => {
  // request => get details post
  // let data = request.body;

  let newOrder = new OrderModel({
    order_list: data.order_list,
    total: data.total,
    user_email: data.user_email,
    mobile: data.mobile,
    order_id: data.order_id,
    payment_id: data.payment_id,
    order_status: data.order_status,
    username: data.username,
    address: data.address,
  });
  try {
    await newOrder.save();
    return true;
  } catch (error) {
    return false;
  }
};
var instance = new Razorpay({
  key_id: "rzp_test_RB0WElnRLezVJ5",
  key_secret: "VLMCIrqKxRMNR9EcRcbL2UG8",
});

module.exports.createOrder = (request, response) => {
  let { amount } = request.body;
  var options = {
    amount: amount * 100,
    currency: "INR",
    receipt: "order_rcptid_11",
  };
  instance.orders.create(options, (error, order) => {
    if (error) {
      response.status(500).send({
        status: false,
        message: "Unable to create id",
      });
    } else {
      response.status(200).send({
        status: true,
        order,
      });
    }
  });
};

module.exports.verify = async (req, res) => {
  let data = req.body;
  let { order_id, payment_id, signature } = req.body;
  let token = order_id + "|" + payment_id;
  var expectedSignature = crypto
    .createHmac("sha256", "VLMCIrqKxRMNR9EcRcbL2UG8")
    .update(token.toString())
    .digest("hex");
  console.log("sig received ", signature);
  console.log("sig generated ", expectedSignature);

  if (expectedSignature === signature) {
    data["order_status"] = true;
    await saveOrder(data);
    res.send({ status: true });
  } else {
    res.send({ status: false });
  }
};
