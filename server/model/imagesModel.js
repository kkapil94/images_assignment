import mongoose, { Schema } from "mongoose";

const imageSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    views:{
        type:Number,
    },
    url:{
        type:String,
        required:true
    },
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }
})

export default mongoose.model("Image",imageSchema)