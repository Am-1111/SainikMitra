import { NextResponse } from 'next/server';
import {User} from "../../../../../models/User.js"
import {connectDB} from "../../../../../lib/mongodb.js"
import bcrypt from "bcryptjs";
export async function POST(req) {
    try {
        await connectDB();
        const {firstname,lastname,email,password}=await req.json();
        const hashPassword= await bcrypt.hash(password,10)
        const existedUser=await User.findOne({email});
    if(existedUser){
        return NextResponse.json({existedUser:true},{message:"User Already Exists"},{status:400})

        
    }
        const createUser= await User.create({
            firstname,
            lastname,
            email,
            password:hashPassword
        })
        if(createUser){
            return NextResponse.json({message:"User Registered."} ,{status:201})
        }

        
    } catch (error) {
        console.log(error)
        return NextResponse.json({message:"Error Occured While Registering the User"},{status:500})
    }
}