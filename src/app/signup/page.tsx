
'use client'
import React from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';


function SignUp() {

  const [formData,setFormData] = React.useState({
    name:'',
    email:'',
    password:'',
  });

  const handleSubmit = async(e:Event) => {
    try {
      e.preventDefault(); 
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className='flex h-screen justify-center items-center md:p-3'>
      <div className='flex flex-col justify-between w-2/5 h-1/2 rounded shadow p-2 bg-gray-100'>
        <div className='text-center h-auto text-3xl font-semibold'>
          SignUp
        </div>
        <div className='flex flex-col h-1/5'>
          <label>Username</label>
          <input 
            type="text" 
            placeholder='Username...'
            value={formData.name}
            className='h-3/5 bg-gray-200 rounded px-2 focus:outline-none'
            onChange={(e) => setFormData({...formData,name:e.target.value})}
          />
        </div>
        <div className='flex flex-col h-1/5'>
          <label>Email</label>
          <input 
            type="email"
            placeholder='Email...'
            value={formData.email}
            className='h-3/5 bg-gray-200 rounded px-2 focus:outline-none'
            onChange={(e) => setFormData({...formData,email:e.target.value})}
          />
        </div>
        <div className='flex flex-col h-1/5'>
          <label>Password</label>
          <input 
            type="password"
            placeholder='Password...'
            value={formData.password}
            className='h-3/5 bg-gray-200 rounded px-2 focus:outline-none'
            onChange={(e) => setFormData({...formData,password:e.target.value})}
          />
        </div>
        <div className='flex flex-col h-[12%]'>
          <button className='rounded bg-blue-500 text-white h-full font-semibold'>Submit</button>
        </div>
        <div className='w-full h-auto flex justify-center'>
          <Link href='/login'>Login Instead</Link>
        </div>
      </div>
    </div>
  )
}

export default SignUp;