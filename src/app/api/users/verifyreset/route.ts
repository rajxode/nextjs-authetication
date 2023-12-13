
import { NextRequest, NextResponse } from "next/server";
// connect to db
import { connect } from "@/dbConfig/dbConfig";
// user model
import User from "@/models/User";
// bcryptjs
import bcryptjs from 'bcryptjs';


// connect to database
connect();

// post req for reseting password
export async function POST(req:NextRequest){
    try {
        
        // get token and password from body
        const reqBody = await req.json();
        const { token , password } = reqBody;
        
        // find the user with token
        const user = await User.findOne({
                forgotPasswordToken: token, 
                forgotPasswordTokenExpire: {$gt: Date.now()} 
            });

        // if user not found
        if(!user){
            return NextResponse.json({error:'Invalid Token'},{status:400});
        }

        // if user found
        // encrypt the password before saving it inside the database
        const salt = await bcryptjs.genSalt(10);
        // encrypting
        const hashPassword = await bcryptjs.hash(password,salt);

        // save password
        user.password = hashPassword;
        // reset token and expiry
        user.forgotPasswordToken = undefined;
        user.forgotPasswordTokenExpire = undefined;
        // save user
        await user.save();

        // return response
        return NextResponse.json({message:'Password Updated',success:true});

    } catch (error : any) {
        // if error
        return NextResponse.json({error:error.message},{status:501});
    }
}