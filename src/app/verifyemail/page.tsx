
// page to verify user's email on signup

'use client';
import axios from "axios";
import Link from "next/link";
import React, { useEffect , useState } from 'react';
import toast from "react-hot-toast";


export default function verifyEmail(){
    
    // token from url
    const [token,setToken] = useState('');
    // if email is verified
    const [verified,setVerify] = useState(false);


    // verify token in url
    const verifyUserEmail = async() => {
        try {
            // make api call
            const response = await axios.post('/api/users/verifymail',{token});
            // set verify true
            setVerify(true);
        } catch (error : any) {
            toast.error('Error in verifing email');
        }
    }


    // get token from url
    useEffect(() => {
        const url = window.location.search.split('=')[1];
        setToken(url || '');
    },[])


    // if token is stored then verify the token
    useEffect(() => {
        if(token.length > 0){
            verifyUserEmail();
        }
    },[token]);


    // render the page
    return(
        <div className="flex flex-col justify-center items-center w-full min-h-screen">
            <h1>
                Verify Email
            </h1>

            {/* show token if present */}
            <h1>
                { token ? `${token}` : 'no token'}
            </h1>

            <div>
                {   
                    verified
                    ?
                    // if email verified then show this message
                    <>
                        <h2>
                            Your email is verified, please login by click on link given below
                        </h2>
                        <Link href='/login' className="underline text-purple-600">
                            Login 
                        </Link>
                    </>
                    :
                    // if error in email verification
                    <h3>
                        Something went wrong cannot verify email
                    </h3>
                }
            </div>
        </div>
    )
}