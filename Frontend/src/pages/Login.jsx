import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Input from '../components/Input'
import { USER_API_ENDPOINT } from '../utils/Constants'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { setUser } from '../redux/userSlice'

const Login = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(email);
    // console.log(password);

    try {
      const res = await axios.post(`${USER_API_ENDPOINT}/login`, { email, password }, { withCredentials: true });

      if (res.data.success) {
        // console.log("Logged In")
        navigate("/");
        dispatch(setUser(res.data.user));
        localStorage.setItem("token", res.data.token);
        toast.success(res.data.message)
      }
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }

  return (
    <div
      className='flex items-center justify-center h-screen '
      style={{ backgroundColor: '#8EC5FF' }}>
      <div className={`mx - auto w-full max-w-lg bg-white rounded-2xl p-10 shadow-lg`}>

        <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
        <p className="mt-2 text-center text-base text-black/60">
          Don&apos;t have any account?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-primary text-[#6E42E5] transition-all duration-200 hover:underline"
          >
            Sign Up
          </Link>
        </p>
        {/* {display error} */}
        {/* {error && <p className="text-red-600 mt-8 text-center">{error}</p>} */}

        <form onSubmit={handleSubmit} className='mt-8'>
          <div className='space-y-5'>
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
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="submit"
              className="w-full cursor-pointer bg-orange-500 text-white py-2 rounded hover:bg-orange-500 transition"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div >
  )
}

export default Login