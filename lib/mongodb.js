import mongoose from "mongoose";


export const connectDB=async()=>{
    await mongoose.connect(process.env.MONGODB_URI)
    .then(()=>console.log("MongoDB connected Successfully..!!"))
    .catch((error)=>(console.log("Mongo DB connection Error.!!",error)))
}