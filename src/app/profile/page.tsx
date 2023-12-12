
'use client';
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

function Profile() {

  const router = useRouter();
  const [user,setUser] = useState();


  const logout = async() => {
    try {
      await axios.get('/api/users/logout');
      toast.success('User Logged Out');
      router.push('/login');
    } catch (error : any) {
      toast.error(`Error: ${error.response.data.message}`)
    }
  }

  const getMyData = async() => {
    try {
      const response = await axios.get('/api/users/mydata');
      setUser(response.data.user.username);
    } catch (error : any) {
      toast.error(`Error: ${error.response.data.message}`)
    }
  }

  useEffect(() => {
    getMyData();
  },[]);

  return (
    <div className='w-full min-h-screen flex flex-col justify-center items-center'>
        Profile Page
        <div>
          {user ? user : ''}
        </div>
        <br />
        <button className='w-auto bg-blue-700 text-white hover:bg-blue-800 rounded px-2 py-1 shadow'
          onClick={logout}
        >
          Logout
        </button>
    </div>
  )
}

export default Profile;