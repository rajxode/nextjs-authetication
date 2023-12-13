
// db connection
import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
// model 
import User from "@/models/User";
// for sending mail
import { sendMail } from "@/helpers/mailHelper";

// connect to database
connect();


// post req to generate forget password token
export async function POST(req:NextRequest){
    try {  
        // get user's email 
        const reqBody = await req.json();

        const { email } = reqBody;

        // find user
        const user = await User.findOne({email});
        // send mail to user's email
        await sendMail({email,emailType:'RESET',userId:user._id});

        // return response
        return NextResponse.json({
            message:'Email Sent',
            success:true
        },
        {
            status:200
        })
    } catch (error : any ) {
        // if there is some error
        return NextResponse.json({error:error.message},{status:500});
    }
}