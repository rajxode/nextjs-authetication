
'use client'
import React from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';
import Link from 'next/link';


function SignUp() {

  // route to other pages
  const router = useRouter();
  // data of user
  const [formData,setFormData] = React.useState({
    username:'',
    email:'',
    password:'',
  });

  const [isLoading,setIsLoading] = React.useState(false);

  // handle the form submit
  const handleSubmit = async() => {
    try {
      // make the api call for signup
      setIsLoading(true);
      const response = await axios.post('/api/users/signup',formData);
      // success message
      toast.success('New User created !!!');
      // redirect to the login page
      router.push('/login');
    } catch (err : any) {
      console.log(err);
      // show error message
      toast.error(`Error: ${err.response.data.message}`);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className='flex h-screen justify-center items-center md:p-3'>
      <div className='flex flex-col justify-between w-2/5 h-1/2 rounded shadow p-2 bg-gray-100'>
        {/* heading  */}
        <div className='text-center h-auto text-3xl font-semibold'>
          SignUp
        </div>
        <div className='flex flex-col h-1/5'>
          {/* username input */}
          <label>Username</label>
          <input 
            type="text" 
            placeholder='Username...'
            value={formData.username}
            className='h-3/5 bg-gray-200 rounded px-2 focus:outline-none'
            // set the value of username
            onChange={(e) => setFormData({...formData,username:e.target.value})}
          />
        </div>
        <div className='flex flex-col h-1/5'>
          {/* email address of user */}
          <label>Email</label>
          <input 
            type="email"
            placeholder='Email...'
            value={formData.email}
            className='h-3/5 bg-gray-200 rounded px-2 focus:outline-none'
            // set value of email
            onChange={(e) => setFormData({...formData,email:e.target.value})}
          />
        </div>
        <div className='flex flex-col h-1/5'>
          {/* password of user */}
          <label>Password</label>
          <input 
            type="password"
            placeholder='Password...'
            value={formData.password}
            className='h-3/5 bg-gray-200 rounded px-2 focus:outline-none'
            // set the password of the user
            onChange={(e) => setFormData({...formData,password:e.target.value})}
          />
        </div>
        <div className='flex flex-col h-[12%]'>
          {/* handle the form submission */}
          <button className={`rounded text-white h-full font-semibold ${ isLoading ? 'bg-blue-300' : 'bg-blue-500'}`}
            onClick={handleSubmit}
          >
            {
              isLoading
              ?
              <i className="fa-solid fa-circle-notch fa-spin"></i>
              :
              null
            }
            &nbsp;
            Sign Up
          </button>
        </div>
        {/* link for login page */}
        <div className='w-full h-auto flex justify-center'>
          <Link href='/login' className="underline text-purple-600">Login Instead</Link>
        </div>
      </div>
    </div>
  )
}

export default SignUp;