import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import {useDispatch} from 'react-redux';
import { setUser } from '../redux/authSlice';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false);

  const [details, setDetails] = useState({
    email: "demo@email.com",
    password: "demo",
  })

  const handleChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true)

      const res = await fetch("http://localhost:3000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({ ...details })
      });

      const data = await res.json()

      if (data.success) {
        toast.success(data.message)
        dispatch(setUser(data.user));
        navigate('/chat')
      }else{
        toast.error(data.message);
      }
      
    } catch (error) {
      toast.error(error?.message);
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-white pb-6">
          Login to Fluxa
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={details.email}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <input
            type="password"
            placeholder="Password"
            name="password"
            value={details.password}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <button className={` text-white w-full bg-indigo-500 py-2 rounded-lg hover:bg-indigo-600 transition`} disabled={loading}>
            {loading ? 'Loading...' : 'Login'}
          </button>
        </form>

        <p className="text-sm text-gray-400 text-center pt-3">
          Don’t have an account?
          <Link to="/signup" className="text-indigo-400 font-medium"> Sign up</Link>
        </p>
      </div>
    </div>
  )
}

export default Login