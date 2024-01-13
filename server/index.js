import express from "express"
import userRoute from "./routes/userRoute.js"
import {connect}from "./utils/mongodb.js"
import {errorHandler} from "./middleware/errorHandler.js"
import singleUpload from "./middleware/multer.js"
import dotenv from "dotenv"
import { isValidated } from "./middleware/isValidated.js"
import {v2 as cloudinary} from "cloudinary"
import cors from "cors"
const app = express()
dotenv.config()



cloudinary.config({ 
  cloud_name: "dbssa7j9g", 
  api_key: process.env.API_KEY, 
  api_secret: process.env.API_SECRET,
  secure: true
});

connect()

app.use(cors())
app.use(express.json())
app.use("/api/v1/auth",userRoute)
app.use(singleUpload)
app.use(isValidated)
app.use(errorHandler)


app.listen( process.env.PORT || 4000,()=>{
    console.log("server connected to PORT:",process.env.PORT || 4000 )
})