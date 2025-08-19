import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Input from "../components/Input"
import axios from 'axios';
import { USER_API_ENDPOINT } from '../utils/Constants';
import toast from 'react-hot-toast';

export default function Signup() {
  const navigate = useNavigate()

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(name);
    // console.log(email);
    // console.log(password);

    try {
      const res = await axios.post(`${USER_API_ENDPOINT}/register`, {
        name, email, password
      }, {
        headers: {
          'Content-Type': "application/json"
        },
        withCredentials: true
      })
      if (res.data.success) {
        navigate('/login')
        toast.success(res.data.message)
      }
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }

  return (
    <div className="flex items-center justify-center h-screen bg-[#8EC5FF]">
      <div className={`mx - auto w-full max-w-lg bg-white rounded-2xl p-10 shadow-4xl`}>
        <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
        <p className="mt-2 text-center text-base text-black/60">
          Already have an account?&nbsp;
          <Link
            to="/login"
            className="font-medium text-[#6E42E5] text-primary transition-all duration-200 hover:underline"
          >
            Sign In
          </Link>
        </p>
        {/* {error && <p className="text-red-600 mt-8 text-center">{error}</p>} */}

        <form onSubmit={handleSubmit}>
          <div className='space-y-5'>
            <Input
              label="Full Name: "
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              label="Email: "
              placeholder="Enter your email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              label="Password: "
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="submit"
              className="w-full cursor-pointer bg-orange-500 text-white py-2 rounded hover:bg-orange-500 transition"
            >
              Create Account
            </button>
          </div>
        </form>
      </div>
    </div >
  )
}