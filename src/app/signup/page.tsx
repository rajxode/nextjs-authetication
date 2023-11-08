
'use client'
import React from 'react';

function SignUp() {

  const [formData,setFormData] = React.useState({
    name:'',
    email:'',
    password:'',
  });

  return (
    <div className='flex min-h-screen items-center justify-between md:p-3'>
      <div className='flex flex-col w-full h-[80vh] rounded shadow p-2'>
        <h1 className='text-center'>
          SignUp
        </h1>
        <div className='flex justify-between'>
          <label>Username</label>
          <input 
            type="text" 
            placeholder='Username...'
            value={formData.name}
            onChange={(e) => setFormData({...formData,name:e.target.value})}
          />
        </div>
        <div className='flex justify-between'>
          <label>Email</label>
          <input 
            type="email"
            placeholder='Email...'
            value={formData.email}
            onChange={(e) => setFormData({...formData,email:e.target.value})}
          />
        </div>
        <div className='flex justify-between'>
          <label>Password</label>
          <input 
            type="password"
            placeholder='Password...'
            value={formData.password}
            onChange={(e) => setFormData({...formData,password:e.target.value})}
          />
        </div>
        <div className='flex justify-between'>
          <button className='border'>Submit</button>
        </div>
      </div>
    </div>
  )
}

export default SignUp;