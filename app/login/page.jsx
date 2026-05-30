"use client"
import Image from "next/image"
import { supabase } from "@/lib/supabaseClient"

export default function LoginPage() {
    const handleSignIn = async() => {
        const {error} = await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: `${window.location.origin}/saved`
            }
        })
        if (error) console.log(error.message)
    }

    return (
        <div className="min-h-screen flex items-center justify-center">
            <main className="w-full max-w-sm bg-gray-800 flex flex-col items-center justify-center gap-4 p-10 rounded-xl border border-gray-500 text-center">
                <Image 
                    src="/logo.png"
                    alt="logo"
                    width={50}
                    height={50}
                    className="rounded-full"
                />
                <h1 className="font-bold text-lg">Sign in to WanderAI</h1>
                <span>Save your itineraries and access them anywhere, anytime</span>
                <button onClick={handleSignIn} className="flex justify-center items-center gap-4 py-2 w-full rounded-xl border border-gray-500 cursor-pointer hover:bg-gray-700">
                    <Image 
                        src="/google3.png"
                        alt="google logo"
                        width={20}
                        height={100}
                        className="object-cover"
                    />
                    <span>Continue with Google</span>
                </button>
                <span className="text-sm">By signing in, you agree to our Terms and Privacy Policy</span>
            </main>
        </div>
    )
}