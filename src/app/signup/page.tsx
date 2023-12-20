"use client"
import Link from "next/link"
import { useRouter } from "next/navigation"
import axios from "axios"
import { useEffect, useState } from "react"
import { toast } from "react-hot-toast"

const SignupPage = () => {
    const router = useRouter();
    //User
    const [user, setUser] = useState({
        email: "",
        password: "",
        username: ""
    })
    //Button
    const [buttonDisabled, setButtonDisabled] = useState(false);
    //Loading state
    const [loading, setLoading] = useState(false)
    // Singup method
    const onSignup = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/signup", user);
            console.log("Signup success", response.data);
            router.push("/login");

        } catch (error: any) {
            console.log("Signup failed:", error);

            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);


    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-4xl font-semibold mb-5">{loading ? "Processing" : "Signup"}</h1>
            <div className="flex flex-col mb-4">
                <label htmlFor="username" className="mb-2">Username</label>
                <input type="text" id="username" value={user.username} onChange={(e) => setUser({ ...user, username: e.target.value })} placeholder="Username" className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600 text-black" />
            </div>
            <div className="flex flex-col mb-4">
                <label htmlFor="email" className="mb-2">Email</label>
                <input type="email" id="email" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} placeholder="Email" className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600 text-black" />
            </div>
            <div className="flex flex-col mb-4">
                <label htmlFor="password" className="mb-2">Paswword</label>
                <input type="password" id="password" value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} placeholder="Password" className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600 text-black" />
            </div>
            <div className="flex flex-col mb-4">
                <button onClick={onSignup} className="p-2 mb-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600">
                    {buttonDisabled ? "No signup" : "Signup"}
                </button>
                <Link href="/login">Visit login page</Link>
            </div>
        </div>
    )
}

export default SignupPage