import React from 'react'
import {Link} from "react-router-dom"

const Register = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <div className="bg-white p-8 rounded-xl shadow-lg w-96">
        <h2 className="text-3xl font-bold text-center mb-6">Register</h2>
        <input type="text" placeholder="Full Name" className="w-full border p-3 rounded mb-4" />
        <input type="email" placeholder="Email" className="w-full border p-3 rounded mb-4"/>
        <input type="password" placeholder="Password" className="w-full border p-3 rounded mb-4"/>
        <input type="password" placeholder="Confirm password" className="w-full border p-3 rounded mb-4"/>

        <button className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700">Register</button>
        <p className="text-center mt-4">
             Already have an account?{" "} 
             <Link to="/"className="text-blue-600 font-semibold">
             Login</Link>
        </p>
    </div>
    </div>
  )
}

export default Register