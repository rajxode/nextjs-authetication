
'use client';

import axios from "axios";
import Link from "next/link";
import React, { useEffect , useState } from 'react';


export default function verifyEmail(){
    const [token,setToken] = useState('');
    const [verified,setVerify] = useState(false);
    const [error,setError]= useState(false);


    const verifyUserEmail = async() => {
        try {
            const response = await axios.post('/api/users/verifymail',{token});
            console.log(response.data);
            setVerify(true);
        } catch (error : any) {
            setError(true);
            console.log(error);
        }
    }

    useEffect(() => {
        const url = window.location.search.split('=')[1];
        setToken(url || '');
    },[])

    useEffect(() => {
        if(token.length > 0){
            verifyUserEmail();
        }
    },[token]);


    return(
        <div className="flex flex-col justify-center items-center w-full min-h-screen">
            <h1>
                Verify Email
            </h1>

            <h1>
                { token ? `${token}` : 'no token'}
            </h1>

            <div>
                {
                    verified
                    ?
                    <Link href='/login'>
                        Login 
                    </Link>
                    :
                    <h3>
                        Something went wrong cannot verify email
                    </h3>
                }
            </div>
        </div>
    )
}