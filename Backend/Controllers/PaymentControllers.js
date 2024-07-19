const Schema = require("../Models/PaymentSchema");
const Razorpay = require("razorpay");
const crypto = require("crypto");

const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET,
});

const getKey = async (req, res) => {
  res.status(200).json({ key: instance.key_id });
};

const checkOut = async (req, res) => {
  const options = {
    amount: Number(req.body.amount * 100),
    currency: "INR",
  };
  await instance.orders
    .create(options)
    .then((order) => {
      res.status(200).json({
        success: true,
        order: order,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        error: err,
      });
    });
};

const paymentVerification = async (req, res) => {
  const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
    req.body;
  const shasum = crypto.createHmac("sha256", instance.key_secret);
  shasum.update(`${razorpay_order_id}|${razorpay_payment_id}`);
  const expected_signature = shasum.digest("hex");
  if (expected_signature === razorpay_signature) {
    const payment = await Schema.findOne({
      razorpay_payment_id: razorpay_payment_id,
    });
    if (payment) {
      res.status(200).json({
        success: true,
        message: "Payment already done",
      });
    } else {
      await Schema.create({
        razorpay_payment_id: razorpay_payment_id,
        razorpay_order_id: razorpay_order_id,
        razorpay_signature: razorpay_signature,
      })
        .then(() => {
        //   res.status(200).json({
        //     success: true,
        //     message: "Payment done",
        //   });
            res.redirect(
                `http://localhost:3000/paymentsuccess?reference=${razorpay_payment_id}`
            )
        })
        .catch((err) => {
          res.status(500).json({
            success: false,
            error: err,
          });
        });
    }
  } else {
    res.status(500).json({
      success: false,
      error: "Payment failed",
    });
  }
};

module.exports = { checkOut, paymentVerification, getKey };
