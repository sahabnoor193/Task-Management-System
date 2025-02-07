import React from 'react'
import { Link } from 'react-router-dom'

function Login() {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h1 className="text-center text-3xl font-semibold text-white mb-6">Login</h1>

        <div className="space-y-4">
          {/* Email Input */}
          <div>
            <input
              type="email"
              placeholder="Your Email"
              className="w-full p-3 rounded-md border-2 border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-red-600"
            />
            <label htmlFor="email" className="text-sm text-gray-400">Your Email</label>
          </div>

          {/* Password Input */}
          <div>
            <input
              type="password"
              placeholder="Your Password"
              className="w-full p-3 rounded-md border-2 border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-red-600"
            />
            <label htmlFor="password" className="text-sm text-gray-400">Your Password</label>
          </div>

          {/* Remember Me Checkbox */}
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="remember" className="rounded text-red-600 focus:ring-2 focus:ring-red-600" />
            <label htmlFor="remember" className="text-sm text-gray-400">Remember me</label>
          </div>

          {/* Forgot Password */}
          <div className="text-right">
            <span className="text-sm font-bold text-red-600 cursor-pointer">Forgot Password</span>
          </div>

          {/* Login Button */}
          <button className="w-full py-3 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none">
            Login
          </button>
        </div>

        {/* Sign Up Link */}
        <div className="mt-4 text-center">
          <span className="text-sm text-gray-400">Don't have an account? <Link to="/signup" className="font-bold text-red-600">Sign up</Link></span>
        </div>
      </div>
    </div>
  )
}

export default Login
