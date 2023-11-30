
// response
import { NextResponse } from "next/server";

// get request
export async function GET(){
    try {
        // create response
        const response = NextResponse.json({
            message:'User logout successfully',
            success:true
        },
        {
            status:200
        });

        // remove token cookie
        response.cookies.set('token','',{
            httpOnly:true,
            // expires time (1970)
            expires: new Date(0)
        });

        // return response
        return response;

    } catch (error : any) {
        // return error message
        return NextResponse.json({
            error:error.message
        }
        , {
            status:500
        })       
    }
}