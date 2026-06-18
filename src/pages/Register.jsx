import React ,{useState}from 'react'
import {Link,useNavigate} from "react-router-dom"
import api from '../services/api';

const Register = () => {
    

    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [confirmPassword,setConfirmPassword]=useState("");

    const navigate=useNavigate();

    const handleRegister=async () => {
      if(password!==confirmPassword){
        alert("Password do not match");
        return;
      }

      if(password.length < 6){
    alert("Password must be at least 6 characters");
    return;
      }

      try{
        await api.post("/auth/register",{
          name,
          email,
          password
        });
        alert("Registration Successful");
        navigate("/");
      }
      catch(error){
    console.log("Full Error:", error);

    if(error.response){
        console.log("Response Data:", error.response.data);
        console.log("Status:", error.response.status);
    }

    alert("Registration failed");
}
    };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <div className="bg-white p-8 rounded-xl shadow-lg w-96">
        <h2 className="text-3xl font-bold text-center mb-6">Register</h2>
        <input
         type="text" 
         placeholder="Full Name" 
         value={name}
         onChange={(e)=>setName(e.target.value)}
         className="w-full border p-3 rounded mb-4" />

        <input 
        type="email" 
        placeholder="Email" 
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
        className="w-full border p-3 rounded mb-4"
        />

        <input 
        type="password" 
        placeholder="Enter password (at least 6 characters)" 
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full border p-3 rounded mb-4"
        />

        <input
         type="password" 
         placeholder="Confirm password" 
         value={confirmPassword}
         onChange={(e)=>setConfirmPassword(e.target.value)} 
         className="w-full border p-3 rounded mb-4"         
         />

        <button 
        onClick={handleRegister}
        className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700">
        Register
        </button>
        <p className="text-center mt-4">
             Already have an account?{" "} 
             <Link to="/"className="text-blue-600 font-semibold">
             Login</Link>
        </p>
    </div>
    </div>
  );
};


export default Register;