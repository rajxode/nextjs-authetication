
import { getMyData } from "@/helpers/getMyData";
import { NextRequest,NextResponse } from "next/server";
import User from "@/models/User";

import { connect } from "@/dbConfig/dbConfig";

connect();

export async function GET(req:NextRequest){
    try {
        
        const userId = await getMyData(req);
        const user = await User.findOne({_id:userId}).select('-password');

        return NextResponse.json({
            message:'User found',
            user
        },{
            status:200
        });
    } catch (error : any) {
        return NextResponse.json({
            error:error.message
        },{
            status:501
        })
    }
}