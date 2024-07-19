const mongoose = require("mongoose")

const Schema = new mongoose.Schema({
    razorpay_payment_id:{
        type:String,
        required:true
    },
    razorpay_order_id:{
        type:String,
        required:true
    },
    razorpay_signature:{
        type:String,
        required:true
    },
})
module.exports = mongoose.model("Razorpay",Schema)