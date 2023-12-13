
// helper to get logged in user's data
import { getMyData } from "@/helpers/getMyData";
import { NextRequest,NextResponse } from "next/server";
// user model
import User from "@/models/User";
// db connect
import { connect } from "@/dbConfig/dbConfig";

// connecting to database
connect();


// get request to get user's data
export async function GET(req:NextRequest){
    try {
        
        // get user's id from helper function
        const userId = await getMyData(req);
        // find user
        const user = await User.findOne({_id:userId}).select('-password');

        // return user
        return NextResponse.json({
            message:'User found',
            user
        },{
            status:200
        });
    } catch (error : any) {
        // if error
        return NextResponse.json({
            error:error.message
        },{
            status:501
        })
    }
}