const express = require("express");
const mongoose  = require("mongoose");
const router =  require("./routes/userRoutes")
const cookieParser = require("cookie-parser")
const cors = require("cors");
const app = express();
app.use(cors({
    origin:'http://localhost:3000', 
    credentials:true,     
}))
app.use(express.json())
app.use("/api",router)
app.use(cookieParser())


mongoose.connect("mongodb+srv://Admin:pass123@cluster0.xfjlyln.mongodb.net/MERN_Auth?retryWrites=true&w=majority")
.then(()=>{
    app.listen(5000);
    console.log("connected");
}).catch((e)=>console.log(e))