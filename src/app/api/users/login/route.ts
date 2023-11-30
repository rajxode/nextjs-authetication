
// function to connect to db
import { connect } from "@/dbConfig/dbConfig";
// user model
import User from "@/models/User";
// request and response
import { NextRequest,NextResponse } from "next/server";
// for encrypting password
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

// connect to database
connect();


// post request
export async function POST(req:NextRequest){
    try {
        // user's data
        const reqBody = await req.json();

        // populate data
        const { email , password } = reqBody;

        // validate data
        if(!email || !password){
            // return error message
            return NextResponse.json({
                message:'Please enter valid data'
            },
            {
                status:400
            });
        }

        // find user by email
        const user = await User.findOne({email});

        // if user not found
        if(!user){
            return NextResponse.json({
                message:"User doesn't exist, Try again"
            },
            {
                status:400
            })
        }

        // compare password of found user
        const found = await bcryptjs.compare(password,user.password);

        // if password doesn't match 
        if(!found){
            // return error message
            return NextResponse.json({
                message:'Wrong Email/Password, Try again'
            },
            {
                status:400
            })
        }

        // data to be stored inside the token
        const tokenData = {
            id:user._id,
            email:user.email,
            username:user.username
        };

        // create jwt token payload, secret, expire
        const token = await jwt.sign(tokenData,process.env.JWT_SECRET_KEY!,{expiresIn:'1d'});

        // creating response
        const response = NextResponse.json({
            message:'user logged in',
            success:true
        },
        {
            status:200
        })

        // store the token in cookies
        response.cookies.set("token",token,{httpOnly:true})

        // return the response
        return response;

    } catch (error : any) {
        // if error there return error message
        return NextResponse.json({
            error:error.message
        },
        {
            status:500
        });
    }
}