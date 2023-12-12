
// request
import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

// function to get the logged in user's data
export const getMyData = (req : NextRequest) => {
    try {
        // get the token from the cookies
        const token = req.cookies.get('token')?.value || '';
        // decode the token
        const decodedToken : any = jwt.verify(token,process.env.JWT_SECRET_KEY!);
        // return the token id
        return decodedToken.id;
    } catch (error : any) {
        // if error throw error
        throw new Error(error.message);
    }
}