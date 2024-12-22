import mongoose from "mongoose";
import { type } from "os";

const userSchema=new mongoose.Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    }
},{timestamps:true})

export const User=mongoose.models.User|| mongoose.model("User",userSchema);