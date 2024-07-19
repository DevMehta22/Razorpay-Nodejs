const express = require("express")
const router = express.Router()
const {checkOut,paymentVerification,getKey} = require("../Controllers/PaymentControllers")

router.get("/key",getKey)
router.post("/checkout", checkOut)
router.post("/paymentverification", paymentVerification)


module.exports = router