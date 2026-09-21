
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    try {
      const response = await api.post(
        "/auth/login",
        {
          email,
          password,
        }
      );

      console.log("Login Response:", response.data);

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("name", response.data.name);
      localStorage.setItem("role", response.data.role);

      console.log("Saved Token:", localStorage.getItem("token"));
      console.log("Name:", localStorage.getItem("name"));
      console.log("role:", localStorage.getItem("role"));

      navigate("/dashboard");
    } catch (error) {
      console.log("Full Error:", error);

      if (error.response) {
        console.log("Response Data:", error.response.data);
        console.log("Status:", error.response.status);
      } else {
        console.log("ERROR:", error.message);
      }

      alert("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-linear-to-br from-slate-950 via-blue-950 to-indigo-900 flex items-center justify-center px-4">

      {/* Background Decorative Circles */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>

      <div className="absolute -bottom-40 -right-32 w-112.5 h-112.5 bg-indigo-500/20 rounded-full blur-3xl"></div>

      <div className="absolute top-1/3 right-1/4 w-40 h-40 bg-cyan-400/10 rounded-full blur-2xl"></div>

      {/* Login Card */}
      <div className="relative w-full max-w-md">

        <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/20">

          {/* Logo / Branding */}
          <div className="text-center mb-8">

            <div className="mx-auto mb-4 w-16 h-16 rounded-2xl bg-linear-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg">
              <span className="text-white text-2xl font-bold">
                C
              </span>
            </div>

            <h1 className="text-3xl font-bold text-gray-900">
              Welcome Back
            </h1>

            <p className="text-gray-500 mt-2 text-sm">
              Login to your Smart CRM account
            </p>

          </div>

          {/* Email */}
          <div className="mb-5">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email Address
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50
              focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500
              focus:border-transparent transition duration-200"
            />
          </div>

          {/* Password */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleLogin();
                }
              }}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50
              focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500
              focus:border-transparent transition duration-200"
            />
          </div>

          {/* Login Button */}
          <button
            onClick={handleLogin}
            className="w-full bg-linear-to-r from-blue-600 to-indigo-600
            hover:from-blue-700 hover:to-indigo-700
            text-white font-semibold py-3 rounded-xl
            shadow-lg hover:shadow-xl
            transition-all duration-200 transform hover:-translate-y-0.5"
          >
            Login
          </button>

          {/* Register */}
          <p className="text-center mt-6 text-sm text-gray-500">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-blue-600 font-semibold hover:text-indigo-600 transition"
            >
              Create an account
            </Link>
          </p>

          {/* Footer */}
          <div className="mt-7 pt-5 border-t border-gray-100 text-center">
            <p className="text-xs text-gray-400">
              Secure access • Smart CRM
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Login;



