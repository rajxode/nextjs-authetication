
// nodemailer
import nodemailer from 'nodemailer';
// User model
import User from '@/models/User';
// for encrypting the password
import bcryptjs from 'bcryptjs';


// function to send email
export const sendMail = async({email,emailType,userId} : any) => {
    try {
        // create an encrypted token from userId
        const hashedToken = await bcryptjs.hash(userId.toString(),10);

        // if sending email for verifying the user
        if(emailType === 'VERIFY'){
            // update the user's data
            await User.findByIdAndUpdate(userId,{
                verifyToken: hashedToken,
                verifyTokenExpiry: Date.now() + 3600000
            })
        }
        // if sending email reset the user's password
        else if(emailType === 'RESET'){
            // update the data
            await User.findByIdAndUpdate(userId,{
                forgotPasswordToken: hashedToken,
                forgotPasswordTokenExpire: Date.now() + 3600000
            })
        }

        // transporter for sending email
        const transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                // mailtrap pass and username
              user: process.env.SMTP_USER,
              pass: process.env.SMTP_PASS
            }
        });

        // option to send mail
        const mailOptions = {
            // from user
            from:process.env.SMTP_FROM_EMAIL,
            // to user
            to:email,
            // subject
            subject: emailType === 'VERIFY' ? 'verify your email' : 'reset password',
            // mail body
            html:`<p>
                Copy paste the following link to verify your token
                <br />
                ${process.env.DOMAIN}verifyemail?=${hashedToken}
            </p>`
        }

        // sending mail
        const mailResponse = await transporter.sendMail(mailOptions);
        return mailResponse;

    } catch (error : any) {
        throw new Error(error.message);
    }
}