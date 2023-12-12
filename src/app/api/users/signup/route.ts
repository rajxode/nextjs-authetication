
// function to connect to db
import { connect } from "@/dbConfig/dbConfig";
// user model
import User from "@/models/User";
// request and response
import { NextRequest,NextResponse } from "next/server";
// for encrypting password
import bcryptjs from 'bcryptjs';
import { sendMail } from "@/helpers/mailHelper";


// connect to database
connect();


// create controller for post method
export async function POST(req:NextRequest){
    try {
        
        // get user's data from request
        const reqBody = await req.json();

        console.log(reqBody);

        // extract data from reqBody
        const { username, email, password } = reqBody;

        // if data is missing
        if(!username || !email || !password){
            return NextResponse.json({
                message:"Provide valid data"
            },{
                status:400
            });
        }

        // check whether the user already exists or not
        const userExist = await User.findOne({email});

        // if user already exists return message
        if(userExist){
            return NextResponse.json({
                message:'User already exist'
            },
            {
                status:400
            });
        }


        // encrypt the password before saving it inside the database
        const salt = await bcryptjs.genSalt(10);
        // encrypting
        const hashPassword = await bcryptjs.hash(password,salt);

        // create new user inside the database with username, email and encrypted password
        const newUser = new User({
            username,
            email,
            password:hashPassword
        });

        // save the user
        const savedUser = await newUser.save();

        // Send verification email
        await sendMail({email,emailType:'VERIFY',userId:savedUser._id});

        // return the resposne to the user
        return NextResponse.json({
            message:'User Created',
            success:true,
            user:savedUser
        },
        {
            status:201
        });

    } catch (error:any) {
        // if error return error message
        return NextResponse.json({error:error.message},{status:500});
    }
}