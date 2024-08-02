'use client'
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Tạo context
export const AuthContext = createContext();

// Tạo provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  // Đăng ký người dùng
  const registerCT = async (username, password, fullname) => {
    try {
      const response = await axios.post('http://localhost:4000/users/add', { username, password, fullname });
      const newUser = response.data;
      toast.success('Đăng kí thành công!');
      router.push('/login');
      setUser(newUser);
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  // Đăng nhập người dùng
  const loginCT = async (username, password) => {
    try {
      const response = await axios.post('http://localhost:4000/users/login', { username, password });
      const userD = response.data.user;
      setUser(userD);
      localStorage.setItem('user', JSON.stringify(userD));
      toast.success('Đăng nhập thành công!');
      router.push('/');
    } catch (error) {
      console.error('Error logging in:', error);
      toast.error('Error logging in:', error);
    }
  };

  // Đăng xuất người dùng
  const logoutCT = () => {
    setUser(null);
    localStorage.removeItem('user');
    toast.success('Logout thành công!');
    window.location.reload();
  };

  return (
    <AuthContext.Provider value={{ user, registerCT, loginCT, logoutCT }}>
      {children}
    </AuthContext.Provider>
  );
};
