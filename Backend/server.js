require("dotenv").config()

const express = require("express")
const app = express()
const cors = require("cors")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")

const routes = require("./Routes/PaymentRoutes")

app.use(express.json())
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use("/api",routes)




mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("Connected to MongoDB")
    const port = process.env.PORT
    app.listen(port, (err) => {
        if (err) {
            console.log(err)
            } else {
                console.log(`Server is running on port ${port}`)
                }
                })

    }).catch((err)=>{
        console.log(err)      
})
