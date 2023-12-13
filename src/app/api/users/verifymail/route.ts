
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/User";

// connect to database
connect();

// post req to verify user's email
export async function POST(req: NextRequest) {
    try {
        
        // get token req body
        const reqBody = await req.json();
        const {token} = reqBody;

        // found the user having similar token and within the expiry time
        const user = await User.findOne({verifyToken : token, verifyTokenExpiry : {$gt: Date.now()} });

        // if no such user found
        if(!user){
            return NextResponse.json({error:'Invalid Token'},
            {status:400})
        }

        // if user found
        // mark user as verified
        user.isVerified = true;

        // reset token and expiry
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;
        // save user
        await user.save();

        // return response 
        return NextResponse.json({message:'Email Verified',success:true});

    } catch (error : any) {
        // if error
        return NextResponse.json({error:error.message},
            {status:501}
        )
    }
}