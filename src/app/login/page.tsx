"use client"
import Link from "next/link"
import { useRouter } from "next/navigation"
import axios from "axios"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"

const LoginPage = () => {
    const router = useRouter();
    const [user, setUser] = useState({
        email: "",
        password: ""
    })
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [loading, setLoading] = useState(false);

    // Singup method
    const onLogin = async () => {
        try {
            setLoading(true)
            const response = await axios.post("/api/users/login", user);
            console.log("Login success", response.data);
            toast.success("Login success");
            router.push("/profile");
        } catch (error: any) {
            console.log("Error:", error.message);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    //Disable button if fields are empty
    useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false);
        } else{
            setButtonDisabled(true);
        }
    }, [user]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-4xl font-semibold mb-5">{loading ? "Processing" : "Login"}</h1>
            <div className="flex flex-col mb-4">
                <label htmlFor="email" className="mb-2">Email</label>
                <input type="email" id="email" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} placeholder="Email" className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600 text-black" />
            </div>
            <div className="flex flex-col mb-4">
                <label htmlFor="password" className="mb-2">Paswword</label>
                <input type="password" id="password" value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} placeholder="Password" className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600 text-black" />
            </div>
            <div className="flex flex-col mb-4">
                <button onClick={onLogin} className="p-2 mb-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600">Login</button>
                <Link href="/signup">Visit Sign page</Link>
            </div>
        </div>
    )
}

export default LoginPage