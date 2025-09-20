"use client"

import type React from "react"

import { signIn, useSession} from "next-auth/react"
import { useEffect, useState } from "react"
import Image from "next/image"
import { FcGoogle } from "react-icons/fc"
import { useRouter } from "next/navigation"


export default function LoginPage() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false);
  const router=useRouter();
  const { data: session } = useSession();


  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
   router.push("/")
  }

  const handleGoogleLogin = async () => {
    setIsLoading(true)
    const res =await signIn("google", { callbackUrl: "/" });
    console.log("his is goofle responce",res);
    setIsLoading(false)
  }

  useEffect(() => {
  if (session) {

    localStorage.setItem("user", JSON.stringify(session.user));
  }
}, [session]);


  return (
    <div className="min-h-screen flex ">
      <div className="hidden lg:flex lg:w-1/2  justify-center relative">
        <Image height={500} width={1200} src="https://images.pexels.com/photos/1875480/pexels-photo-1875480.jpeg" alt="Login illustration" className=" w-full h-screen rounded-lg py-8 object-contain z-10" />
        <div className="absolute inset-0 bg-black/20 z-10"></div>
        <div className="absolute bottom-20 text-white z-10">
          <h2 className="text-2xl font-bold mb-2 text-center">Welcome back</h2>
          <p className="text-lg opacity-90">Sign in to continue your journey</p>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-black/20">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-foreground">Sign in to your account</h2>
            <p className="mt-2 text-muted-foreground">Welcome back! Please enter your details.</p>
          </div>

          <form onSubmit={handleEmailLogin} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Enter your password"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary border cursor-pointer hover:bg-neutral-700 text-primary-foreground py-2 px-4 rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-background text-muted-foreground">Or continue with</span>
            </div>
          </div>

          <button
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="w-full flex items-center cursor-pointer justify-center gap-3 bg-white text-gray-900 border border-gray-300 py-2 px-4 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
           <FcGoogle />
            {isLoading ? "Signing in..." : "Continue with Google"}
          </button>
        </div>
      </div>
    </div>
  )
}
