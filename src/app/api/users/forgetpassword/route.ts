

import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/User";
import { sendMail } from "@/helpers/mailHelper";

connect();

export async function POST(req:NextRequest){
    try {
        const reqBody = await req.json();

        const { email } = reqBody;

        const user = await User.findOne({email});
        await sendMail({email,emailType:'RESET',userId:user._id});

        return NextResponse.json({
            message:'Email Sent',
            success:true
        },
        {
            status:200
        })
    } catch (error : any ) {
        return NextResponse.json({error:error.message},{status:500});
    }
}