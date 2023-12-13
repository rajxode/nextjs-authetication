
'use client';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function ResetPage() {

    const [token,setToken] = useState('');
    const router = useRouter();
    const [password,setPassword] = useState('');
    const [cnfPassword,setCnfPassword] = useState('');


    const handleSubmit = async() => {
        try {
            if( password !== cnfPassword){
                toast.error('Password does not match');
                return;
            }
            const response = await axios.post('/api/users/verifyreset',{ token , password });
            toast.success('Password Updated !!!');
            router.push('/login');
        } catch (error) {
            toast.error('Error in reseting password');
        }
    }

    useEffect(() => {
        const url = window.location.search.split('=')[1];
        setToken(url || '');
    },[])

    return(
        <>
            { 
                token 
                ? 
                <div className='flex w-full min-h-screen items-center justify-center'>
                    <div className='w-2/5 h-2/5 min-h-[27vh] bg-white rounded shadow flex flex-col px-[2%] py-[1%] justify-around items-center'>
                        <div className='w-full text-center'>
                            <h2 className='text-xl font-semibold'>Reset Password</h2>
                        </div>
                        <div className='w-full flex flex-col justify-between items-center'>
                            <input 
                                type="password"
                                placeholder='Password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className='bg-slate-200 focus:outline-none px-2 w-4/5 rounded h-[35px] mb-2'
                            />
                            <input 
                                type="password"
                                placeholder='Confirm Password'
                                value={cnfPassword}
                                onChange={(e) => setCnfPassword(e.target.value)}
                                className='bg-slate-200 focus:outline-none px-2 w-4/5 rounded h-[35px]'
                            />
                        </div>
                        <div className='flex flex-col justify-center items-center'>
                            <button className='w-auto px-2 py-1 bg-blue-400 text-white rounded shadow'
                                onClick={handleSubmit}>
                                Reset Password
                            </button>
                        </div>
                    </div>
                </div> 
                :
                <div className='flex w-full min-h-screen justify-center items-center text-center'>
                    No token Yet, Please wait...
                    <br />
                    If not redirected to Reset password page, Try again
                </div>
            }
        </>
    )
}
