'use client'
import { useEffect, useState, useContext } from "react";
import { useForm } from 'react-hook-form';
import Link from "next/link";
import { AuthContext } from "@/context/authContext";

function RegisterForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { registerCT } = useContext(AuthContext);

  const onSubmit = data => {
    registerCT(data.username, data.password, data.fullname);
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit(onSubmit)} className="w-[320px] h-auto p-6 rounded-lg bg-[#f1f7fe]">
        <div className="text-center text-xl font-bold mb-4">Register here</div>
        
        <div className="flex flex-col h-20 mb-2">
          <label className="mb-1 text-[#4d4d4d]" htmlFor="username">Username</label>
          <input
            className="p-2 rounded-xl outline-[#3e4684] shadow-sm"
            id="username"
            {...register('username', {
              required: 'Username is required',
              minLength: {
                value: 4,
                message: 'Username must be at least 4 characters long',
              }
            })}
          />
          {errors.username && <span className="text-red-600 text-xs">{errors.username.message}</span>}
        </div>
        
        <div className="flex flex-col h-20 mb-2">
          <label className="mb-1 text-[#4d4d4d]" htmlFor="password">Password</label>
          <input
            className="p-2 rounded-xl outline-[#3e4684] shadow-sm"
            id="password"
            type="password"
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters long'
              }
            })}
          />
          {errors.password && <span className="text-red-600 text-xs">{errors.password.message}</span>}
        </div>
      
        
        <div className="flex flex-col h-20 mb-2">
          <label className="mb-1 text-[#4d4d4d]" htmlFor="fullname">Full Name</label>
          <input
            className="p-2 rounded-xl outline-[#3e4684] shadow-sm"
            id="fullname"
            {...register('fullname', {
              required: 'Full name is required',
              minLength: {
                value: 2,
                message: 'Full name must be at least 2 characters long',
              }
            })}
          />
          {errors.fullname && <span className="text-red-600 text-xs">{errors.fullname.message}</span>}
        </div>

        <button type="submit" className="w-full bg-[#3e4684] font-bold text-white py-2 rounded-xl mt-4">Register</button>
        <p className="mt-4 text-center text-xs text-gray-500">Do you already have an account? <Link href="/login" className="text-[#3e4684] font-bold">Login</Link></p>
      </form>
    </div>
  );
}

export default RegisterForm;
