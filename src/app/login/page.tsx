"use client";
import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";

export default function LoginPage() {
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: Event) => {
    try {
      e.preventDefault();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex h-screen justify-center items-center md:p-3">
      <div className="flex flex-col justify-between w-2/5 h-2/5 rounded-md shadow p-2 bg-slate-100">
        <div className="text-center h-auto text-3xl font-semibold">Login</div>
        <div className="flex flex-col h-1/4">
          <label>Email</label>
          <input
            type="email"
            placeholder="Email..."
            value={formData.email}
            className="h-3/5 rounded px-2 focus:outline-none"
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
        </div>
        <div className="flex flex-col h-1/4">
          <label>Password</label>
          <input
            type="password"
            placeholder="Password..."
            value={formData.password}
            className="h-3/5 rounded px-2 focus:outline-none"
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
        </div>
        <div className="flex flex-col h-[15%]">
          <button className="rounded bg-blue-500 text-white h-full font-semibold">
            Submit
          </button>
        </div>
        <div className="w-full h-auto flex justify-center">
          <Link href="/signup">SignUp Instead</Link>
        </div>
      </div>
    </div>
  );
}
