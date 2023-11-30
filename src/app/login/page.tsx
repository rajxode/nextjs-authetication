
"use client";
import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";

export default function LoginPage() {

  // for navigation
  const router = useRouter();

  // user's data
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });

  // handle form submit
  const handleSubmit = async () => {
    try {
      // make api call
      const response = await axios.post('/api/users/login',formData);
      console.log(response.data);
      // toast notification
      toast.success('User logged in');
      // redirect to profile page
      router.push('/profile');
    } catch (err : any) {
      // show error message
      toast.error(`Error: ${err.response.data.message}`)
    }
  };


  return (
    <div className="flex h-screen justify-center items-center md:p-3">
      <div className="flex flex-col justify-between w-2/5 h-2/5 rounded-md shadow p-2 bg-slate-100">
        {/* heading */}
        <div className="text-center h-auto text-3xl font-semibold">Login</div>
        <div className="flex flex-col h-1/4">
          {/* email input */}
          <label>Email</label>
          <input
            type="email"
            placeholder="Email..."
            value={formData.email}
            className="h-3/5 rounded px-2 focus:outline-none bg-gray-200"
            // set email 
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
        </div>
        <div className="flex flex-col h-1/4">
          {/* password input */}
          <label>Password</label>
          <input
            type="password"
            placeholder="Password..."
            value={formData.password}
            className="h-3/5 rounded px-2 focus:outline-none bg-gray-200"
            // set password
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
        </div>
        <div className="flex flex-col h-[15%]">
          {/* submit button */}
          <button className="rounded bg-blue-500 text-white h-full font-semibold"
            onClick={handleSubmit}
          >
            Sign In
          </button>
        </div>
        <div className="w-full h-auto flex justify-center">
          {/* link for signup Page */}
          <Link href="/signup">SignUp Instead</Link>
        </div>
      </div>
    </div>
  );
}
