import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import api from '../services/api'

const Login = () => {

  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")

  const navigate=useNavigate()
  const handleLogin=async()=>{
    if(!email || !password){
      alert("Please enter email and password")
      return
    }
    try{
      const response =await api.post("/auth/login",{
        email,
        password
      })
      console.log("Login Response:", response.data)

       localStorage.setItem("token", response.data.token)

      // alert("Login Successful")

      navigate("/dashboard")
    }
    catch(error){
      console.log("Full Error:", error)

      if (error.response) {
        console.log("Response Data:", error.response.data)
        console.log("Status:", error.response.status)
      }
      else{
        console.log("ERROR:", error.message);
      }

      alert("Invalid email or password")
    
    }
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
     <div className="bg-white p-8 rounded-xl shadow-lg w-96">
        <h1 className="text-3xl font-bold text-center mb-6">CRM Login</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-3 rounded mb-4"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-3 rounded mb-4"
        />

        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700"
        >
          Login
        </button>

        <p className="text-center mt-4">
          Don't have an account?{" "}

          <Link
            to="/register"
            className="text-blue-600 font-semibold"
          >
            Register
          </Link>
         </p>
     </div>
   
    </div>
  )
}

export default Login


