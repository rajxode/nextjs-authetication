
'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function ForgetPage() {
    
    const [email,setEmail] = useState('');

    const handleSubmit = async() => {
        try {
            await axios.post('/api/users/forgetpassword',{email});
            toast.success('Email sent, Kindly check your email.');
        } catch (error) {
            toast.error('Error in sending mail');
        }
    }

    return (
        <div className='flex w-full min-h-screen items-center justify-center'>
            <div className='w-2/5 h-2/5 min-h-[27vh] bg-white rounded shadow flex flex-col px-[2%] py-[1%] justify-around items-center'>
                <div className='w-full text-center'>
                    <h2 className='text-xl font-semibold'>Verify Email</h2>
                </div>
                <div className='w-full flex justify-center'>
                    <input 
                        type="email"
                        placeholder='Enter your email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className='bg-slate-200 focus:outline-none px-2 w-4/5 rounded h-[35px]'
                    />
                </div>
                <div className='flex flex-col justify-center items-center'>
                    <button className='w-auto px-2 py-1 bg-blue-400 text-white rounded shadow'
                        onClick={handleSubmit}>
                        Send Mail
                    </button>
                    <Link href='/login' className='underline text-purple-600' >Login</Link>
                </div>
            </div>
        </div>
    )
}