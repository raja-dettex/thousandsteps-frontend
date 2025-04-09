"use client";
import React, { useState } from "react";
import {addUser, internal_base_url, login } from '../utils/users'
import { useRouter } from "next/navigation";
import axios from 'axios'
export default function AuthPage ()  {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(false);
  const [ name, setName] = useState("");
  const [email, setEmail] = useState("")
  const [ password, setPassword] = useState("")
  const [mobile, setMobile] = useState("")
  const [role, setRole] = useState("")
  const handleSignUp = async ( e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => { 
    console.log('signup')
    e.preventDefault()
    const user = { username: email.split('@')[0], email, password, mobile, role}
    const response = await addUser(user)
    if(response?.status === 201) { 
      console.log("response data", response.data)
      setIsLogin(true)
    } 
    else console.log(response?.data)     
  }

  const handleSignIn = async ( e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => { 
    e.preventDefault()
    console.log("sign in")
    const response = await login(email, password)
    if(response?.status === 201) { 
      console.log(response.data)
      localStorage.setItem("token", JSON.stringify({...response.data, email}))
      try { 
        const res = await axios.post(`${internal_base_url}/api/auth/set-cookie`, { 
          token: response.data.token, role: response.data.role
        })
        if(response.data.role === 'admin') { 
        
          router.push("/dashboard/admin")
          return
        }
        router.push(`/`)
      }  catch(error) { console.log(error)}
       
    } 
    else console.log(response?.data)     
  }

  
  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">
        {/* Tab Switch */}
        <div className="flex justify-center mb-8">
          <button
            className={`px-6 py-2 font-semibold rounded-l-full transition ${
              isLogin ? "bg-blue-600 text-white" : "bg-blue-100 text-blue-800"
            }`}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button
            className={`px-6 py-2 font-semibold rounded-r-full transition ${
              !isLogin ? "bg-blue-600 text-white" : "bg-blue-100 text-blue-800"
            }`}
            onClick={() => setIsLogin(false)}
          >
            Signup
          </button>
        </div>

        {/* Form */}
        <form className="space-y-5">
          {!isLogin && (
            <><div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                placeholder="John Doe"
                onChange={e=> setName(e.target.value)}
                value={name}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Mobile</label>
            <input
              type="tel"
              placeholder="+91"
              onChange={e=> setMobile(e.target.value)}
                value={mobile}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">role</label>
            <input
              type="text"
              placeholder="role"
              onChange={e=> setRole(e.target.value)}
              value={role}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          </>
          )}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              onChange={e=> setEmail(e.target.value)}
              value={email}
              placeholder="you@example.com"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              onChange={e=> setPassword(e.target.value)}
              value={password}
              placeholder="••••••••"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          
          <button
            type="submit"
            onClick={async e=> { 
              console.log("log in " + isLogin )
              if(!isLogin) { 
                await handleSignUp(e)
                return 
              } else { 
                await handleSignIn(e)
                return
              }
            }}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-lg transition"
          >
            {isLogin ? "Login to Bhromon Tori" : "Create your account"}
          </button>
        </form>

        {isLogin && (
          <p className="text-sm text-center text-gray-500 mt-4">
            Don’t have an account?{" "}
            <button
              onClick={() => setIsLogin(false)}
              className="text-blue-600 hover:underline font-medium"
            >
              Sign up here
            </button>
          </p>
        )}
        {!isLogin && (
          <p className="text-sm text-center text-gray-500 mt-4">
            Already have an account?{" "}
            <button
              onClick={(e) => setIsLogin(true)}
              className="text-blue-600 hover:underline font-medium"
            >
              Login here
            </button>
          </p>
        )}
      </div>
    </div>
  );
};
