
// client side
'use client';
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';


function Profile() {
  
  // router
  const router = useRouter();
  // logged in user
  const [user,setUser] = useState();

  // for logout user
  const logout = async() => {
    try {
      // make api call
      await axios.get('/api/users/logout');
      // toast notification
      toast.success('User Logged Out');
      // redirect user to login page
      router.push('/login');
    } catch (error : any) {
      toast.error(`Error: ${error.response.data.message}`)
    }
  }


  // to get loggedIN user's data
  const getMyData = async() => {
    try {
      // make api call
      const response = await axios.get('/api/users/mydata');
      // store the data
      setUser(response.data.user.username);
    } catch (error : any) {
      toast.error(`Error: ${error.response.data.message}`)
    }
  }


  // fetch logged in user's data
  useEffect(() => {
    getMyData();
  },[]);


  // render the page
  return (
    <div className='w-full min-h-screen flex flex-col'>

      {/* navbar */}
      <div className='w-full flex h-[55px] bg-blue-500 text-white justify-between px-[5%] items-center'>
        <div>
          Navbar
        </div>
        <div>
          {/* Logout button */}
          <button onClick={logout}>
            Logout
          </button>
        </div>
      </div>
      

      {/* page */}
      <div className='w-full min-h-[92vh] flex justify-center items-center'>
        <div className='text-xl font-semibold'>
          {/* user's name */}
          {user ? `Hello ${user}` : ''}
        </div>
      </div>
    </div>
  )
}

export default Profile;