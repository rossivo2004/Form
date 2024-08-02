'use client'
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "@/context/authContext";
import Link from "next/link";


export default function UserList() {
    const [user, setUser] = useState(null);
    const { logoutCT } = useContext(AuthContext);

    useEffect(() => {
        // Retrieve user data from localStorage
        const user_local = localStorage.getItem('user');
        if (user_local) {
            try {
                const parsedUser = JSON.parse(user_local);
                setUser(parsedUser);

                // Fetch additional data from the API if user ID exists
                if (parsedUser?.id) {
                    fetchUserData(parsedUser.id);
                }
            } catch (error) {
                console.error("Error parsing user data from localStorage:", error);
            }
        }
    }, []);

    async function fetchUserData(userId) {
        try {
            const response = await axios.get(`http://localhost:4000/users/${userId}`);
            setUser(response.data);
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    }

    console.log(user);

    return (
        <div>
            {user ? (
                <div className="min-h-screen w-[420px] flex flex-col items-center justify-center bg-gray-100">
                    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
                        <h2 className="text-2xl font-bold mb-4 text-center">Dashboard</h2>
                        <div className="mb-4">
                            <p className="text-gray-700"><span className="font-bold">Username:</span> {user.username}</p>
                            <p className="text-gray-700"><span className="font-bold">Fullname:</span> {user.fullname}</p>
                        </div>
                        <button
                            onClick={logoutCT}
                            className="w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition-colors"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            ) : (
                <div className="min-h-screen w-[420px] flex flex-col items-center justify-center bg-gray-100">
                    <p>Chưa đăng đăng nhập.</p>
                    <Link href="/login" className="underline">Đăng nhập ngay</Link>
                </div>
            )}
        </div>
    );
}
