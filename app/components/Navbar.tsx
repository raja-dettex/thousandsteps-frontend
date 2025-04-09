"use client"
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from 'axios'
import { internal_base_url } from "../utils/users";
export const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const router = useRouter();
  const [username, setUsername] = useState<string | undefined>(undefined)
  useEffect(()=> { 
    const user = JSON.parse(localStorage.getItem("token")!)
    if(user) { 
      const {username, email, token } = user
      console.log(username, email, token)
      setIsLoggedIn(true)
      setUsername(username)
    }
    return () => setUsername(username)
  })
  const handleSignOut = async (e: any) => { 
    e.preventDefault()
    localStorage.removeItem('token')
    const res = await axios.get(`${internal_base_url}/api/auth/delete-cookie`)
    console.log(res.data)
    setIsLoggedIn(false)
  }
  return (
    <nav className="bg-[#004E64] px-6 py-4 md:px-10 shadow-lg  font-[Poppins]">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-bold text-white tracking-wide">
          Bhromon Tori
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 items-center font-medium text-[#E0F7FA]">
          <a
            href="#upcoming"
            className="hover:text-[#00A896] transition duration-200"
          >
            Upcoming
          </a>
          <button
            onClick={e=> router.push('/ontrains')}
            className="hover:text-[#00A896] transition duration-200"
          >
            On Train
          </button>
          <a
            href="#about"
            className="hover:text-[#00A896] transition duration-200"
          >
            About
          </a>
        </div>

        {/* Auth Button */}
        <div className="hidden md:block">
          {isLoggedIn ? (
            <div className="flex"><span className="text-[#FFE066] font-semibold bg-[#003E4F] px-4 py-2 rounded-xl">
              Hello, {username}
            </span><button
              
              onClick={e=> handleSignOut(e)}
              className="block bg-[#00A896] text-white px-4 py-2 rounded-xl text-center hover:bg-[#01957f]"
            >
              Sign Out
            </button></div>

          ) : (
            <button
              onClick={e=> router.push('/signIn')}
              className="bg-[#00A896] text-white px-4 py-2 rounded-xl hover:bg-[#01957f] transition"
            >
              Login / Signup
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-[#E0F7FA] focus:outline-none"
          aria-label="Toggle Menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden mt-4 space-y-2 text-[#E0F7FA] font-medium">
          <a href="#upcoming" className="block hover:text-[#00A896]">
            Upcoming
          </a>
          <a href="#ontrain" className="block hover:text-[#00A896]">
            On Train
          </a>
          <a href="#about" className="block hover:text-[#00A896]">
            About
          </a>
          {isLoggedIn ? (
            <><span className="block text-[#FFE066] px-4 py-2 bg-[#003E4F] rounded-xl text-center">
              Hello, {username}
            </span>
            </>
          ) : (
            <button
              
              onClick={e=> router.push('/signIn')}
              className="block bg-[#00A896] text-white px-4 py-2 rounded-xl text-center hover:bg-[#01957f]"
            >
              Login / Signup
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

