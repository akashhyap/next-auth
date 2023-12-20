"use client"
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

const ProfilePage = () => {
    const router = useRouter()
    const [data, setData] = useState("Welcome")
    const logout = async () => {
        try {
            await axios.get("/api/users/logout");
            toast.success('Logout successful')
            router.push('/login')
        } catch (error: any) {
            console.log(error.message);
            toast.error(error.message)
        }
    }

    useEffect(() => {
        const getUserDetails = async () => {
            const res = await axios.get('/api/users/profileInfo')
            console.log(res.data);
            setData(res.data.data.username)
        }
        getUserDetails()
    }, [])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-4xl font-semibold mb-5">Profile</h1>
            <h2 className="p-1 rounded bg-green-500">{data === 'nothing' ? "Nothing" : (
                <>  Hey {data}. View your <Link href={`/profile/${data}`} className='border-b'>Profile</Link>
                </>
            )}</h2>
            <div>
                <button
                    onClick={logout}
                    className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >Logout</button>
            </div>
            {/* <div className='mt-10'>
                <button
                    onClick={getUserDetails}
                    className="bg-green-800 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >GetUser Details</button>

            </div> */}
        </div>
    )
}

export default ProfilePage