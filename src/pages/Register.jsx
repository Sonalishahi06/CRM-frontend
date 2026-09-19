
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!name || !email || !password || !confirmPassword) {
      alert("Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    try {
      await axios.post(
        "http://localhost:8080/api/auth/register",
        {
          name,
          email,
          password,
        }
      );

      alert("Registration Successful");
      navigate("/");
    } catch (error) {
      console.log("Full Error:", error);
      console.log("Response:", error.response?.data);
      console.log("Status:", error.response?.status);

      alert("Registration failed");
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-linear-to-br from-slate-950 via-blue-950 to-indigo-900 flex items-center justify-center px-4 py-8">

      {/* Background Decorations */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>

      <div className="absolute -bottom-40 -right-32 w-112.5 h-112.5 bg-indigo-500/20 rounded-full blur-3xl"></div>

      <div className="absolute top-1/3 right-1/4 w-40 h-40 bg-cyan-400/10 rounded-full blur-2xl"></div>

      {/* Register Card */}
      <div className="relative w-full max-w-md">

        <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/20">

          {/* Logo */}
          <div className="text-center mb-7">

            <div className="mx-auto mb-4 w-16 h-16 rounded-2xl bg-linear-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg">
              <span className="text-white text-2xl font-bold">
                C
              </span>
            </div>

            <h1 className="text-3xl font-bold text-gray-900">
              Create Account
            </h1>

            <p className="text-gray-500 mt-2 text-sm">
              Join Smart CRM and manage your business efficiently
            </p>

          </div>

          {/* Full Name */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Full Name
            </label>

            <input
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50
              focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500
              focus:border-transparent transition duration-200"
            />
          </div>

          {/* Email */}
          <div className="mb-4">
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
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Password
            </label>

            <input
              type="password"
              placeholder="At least 6 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50
              focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500
              focus:border-transparent transition duration-200"
            />
          </div>

          {/* Confirm Password */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Confirm Password
            </label>

            <input
              type="password"
              placeholder="Re-enter your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleRegister();
                }
              }}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50
              focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500
              focus:border-transparent transition duration-200"
            />
          </div>

          {/* Register Button */}
          <button
            onClick={handleRegister}
            className="w-full bg-linear-to-r from-blue-600 to-indigo-600
            hover:from-blue-700 hover:to-indigo-700
            text-white font-semibold py-3 rounded-xl
            shadow-lg hover:shadow-xl
            transition-all duration-200 transform hover:-translate-y-0.5"
          >
            Create Account
          </button>

          {/* Login Link */}
          <p className="text-center mt-6 text-sm text-gray-500">
            Already have an account?{" "}

            <Link
              to="/"
              className="text-blue-600 font-semibold hover:text-indigo-600 transition"
            >
              Login
            </Link>
          </p>

          {/* Footer */}
          <div className="mt-6 pt-5 border-t border-gray-100 text-center">
            <p className="text-xs text-gray-400">
              Secure registration • Smart CRM
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Register;
