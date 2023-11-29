
// mongoose to talk with dB
import mongoose from "mongoose";

// creating a schema for user
const userSchema = new mongoose.Schema({
    // username of user
    username:{
        type:String,
        required:[true,"Please provide an email"],
        unique:true,
    },
    // email address of the user
    email:{
        type:String,
        require:[true,"Please give email address"],
        unique:true,
    },
    // password of the user
    password:{
        type:String,
        required:[true,"Please enter a password"]
    },
    // whether the user is verified or not
    isVerified:{
        type:Boolean,
        default:false,
    },
    // whether the user is admin or not
    isAdmin:{
        type:Boolean,
        default:false,
    },
    // token generated on forget password / reset password
    forgotPasswordToken:String,
    // expire time of token
    forgotPasswordTokenExpire:String,
    // token to verify user
    verifyToken:String,
    // expiry of token
    verifyTokenExpiry:String
});


// check whether the model already exist or not
// if exists, use that
// else, create new
const User = mongoose.models.users || mongoose.model("users",userSchema);


export default User;