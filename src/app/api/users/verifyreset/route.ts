

import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/User";
import bcryptjs from 'bcryptjs';


connect();

export async function POST(req:NextRequest){
    try {
        
        const reqBody = await req.json();
        const { token , password } = reqBody;
        
        const user = await User.findOne({
                forgotPasswordToken: token, 
                forgotPasswordTokenExpire: {$gt: Date.now()} 
            });

        if(!user){
            return NextResponse.json({error:'Invalid Token'},{status:400});
        }

        // encrypt the password before saving it inside the database
        const salt = await bcryptjs.genSalt(10);
        // encrypting
        const hashPassword = await bcryptjs.hash(password,salt);

        user.password = hashPassword;
        user.forgotPasswordToken = undefined;
        user.forgotPasswordTokenExpire = undefined;
        await user.save();

        return NextResponse.json({message:'Password Updated',success:true});

    } catch (error : any) {
        return NextResponse.json({error:error.message},{status:501});
    }
}