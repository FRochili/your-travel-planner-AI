"use client"
import Image from "next/image"
import { supabase } from "@/lib/supabaseClient"
import Link from "next/link"
import useStore from "@/lib/store"

export default function Navbar() {
    
    const {user} = useStore()

    const handleLogin = () => {
        window.location.href = '/login'
    }
    const handleLogout = async() => {
        const {error} = await supabase.auth.signOut()
        if (error) console.log(error.message)
        window.location.href = '/'
    }

    return (
        <div className="w-full bg-gray-800 flex items-center justify-between gap-4 p-4 border border-gray-500 text-center">
            {/*image and logo */}
            <div className="flex gap-2 justify-center items-center">
                <Image 
                    src="/logo.png"
                    alt="logo"
                    width={30}
                    height={30}
                    className="rounded-full"
                    />
                <h1 className="font-bold text-lg">YourTravelPlannerAI</h1>
            </div>

            {/*plan, saved, signin*/}
            <div className="flex gap-4 justify-center items-center">
                <nav className="flex gap-4 justify-center items-center cursor-pointer">
                    <Link href="/" className="hover:text-white text-gray-300 transition">Plan</Link>
                    <Link href="/saved" className="hover:text-white text-gray-300 transition">Saved</Link>
                </nav>
                {
                    user 
                    ? <button onClick={()=>handleLogout()} className="border border-gray-500 p-2 rounded-md font-bold cursor-pointer hover:bg-gray-700">Sign out</button>
                    : <button onClick={()=>handleLogin()} className="border border-gray-500 p-2 rounded-md font-bold cursor-pointer hover:bg-gray-700">Sign in</button>
                }
                
            </div>
        </div>
    )
}