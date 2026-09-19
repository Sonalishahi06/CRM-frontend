import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const Dashboard = () => {
  const navigate = useNavigate();

  const [customerCount, setCustomerCount] = useState(0);
  const [leadCount, setLeadCount] = useState(0);
  const [taskCount, setTaskCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const name = localStorage.getItem("name");
  const role = localStorage.getItem("role");

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      const customerResponse = await api.get("/customers");
      const leadResponse = await api.get("/leads");
      const taskResponse = await api.get("/tasks");

      console.log("Customers:", customerResponse.data);
      console.log("Leads:", leadResponse.data);
      console.log("Tasks:", taskResponse.data);

      setCustomerCount(customerResponse.data.totalElements);
      setLeadCount(leadResponse.data.length);
      setTaskCount(taskResponse.data.length);
    } catch (error) {
      console.log("Dashboard Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    localStorage.removeItem("role");

    navigate("/");
  };

  return (
    <div className="min-h-screen bg-slate-50">

      {/* ================= NAVBAR ================= */}
      <nav className="bg-slate-950 text-white px-6 md:px-10 py-4 flex justify-between items-center shadow-lg">

        {/* Logo */}
        <div className="flex items-center gap-3">

          <div className="w-10 h-10 rounded-xl bg-linear-to-br from-blue-500 to-indigo-600 flex items-center justify-center font-bold text-lg shadow-lg">
            C
          </div>

          <div>
            <h1 className="text-lg md:text-xl font-bold">
              Smart CRM
            </h1>

            <p className="text-xs text-slate-400">
              Customer Relationship Management
            </p>
          </div>

        </div>


        {/* User + Logout */}
        <div className="flex items-center gap-3">

          <div className="hidden sm:block text-right">

            <p className="text-sm font-semibold">
              {name || "User"}
            </p>

            <p className="text-xs text-slate-400">
              {role || "USER"}
            </p>

          </div>

          <div className="w-10 h-10 rounded-full bg-linear-to-br from-blue-500 to-indigo-600 flex items-center justify-center font-bold">
            {name ? name.charAt(0).toUpperCase() : "U"}
          </div>

          <button
            onClick={handleLogout}
            className="ml-2 px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 transition font-medium text-sm"
          >
            Logout
          </button>

        </div>

      </nav>


      {/* ================= MAIN ================= */}
      <main className="max-w-7xl mx-auto px-5 md:px-8 py-8">

        {/* Welcome Section */}
        <div className="mb-8">

          <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider">
            Dashboard
          </p>

          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-1">
            Welcome back, {name || "User"} 👋
          </h2>

          <p className="text-slate-500 mt-2">
            Here's what's happening with your CRM today.
          </p>

        </div>


        {/* ================= STATS ================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

          {/* Customers */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition">

            <div className="flex justify-between items-start">

              <div>

                <p className="text-sm font-medium text-slate-500">
                  Total Customers
                </p>

                <p className="text-4xl font-bold text-slate-900 mt-3">
                  {loading ? "..." : customerCount}
                </p>

              </div>

              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-2xl">
                👥
              </div>

            </div>

            <button
              onClick={() => navigate("/customers")}
              className="mt-6 text-blue-600 font-semibold text-sm hover:text-blue-700"
            >
              View Customers →
            </button>

          </div>


          {/* Leads */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition">

            <div className="flex justify-between items-start">

              <div>

                <p className="text-sm font-medium text-slate-500">
                  Total Leads
                </p>

                <p className="text-4xl font-bold text-slate-900 mt-3">
                  {loading ? "..." : leadCount}
                </p>

              </div>

              <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center text-2xl">
                🎯
              </div>

            </div>

            <button
              onClick={() => navigate("/leads")}
              className="mt-6 text-green-600 font-semibold text-sm hover:text-green-700"
            >
              View Leads →
            </button>

          </div>


          {/* Tasks */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition">

            <div className="flex justify-between items-start">

              <div>

                <p className="text-sm font-medium text-slate-500">
                  Total Tasks
                </p>

                <p className="text-4xl font-bold text-slate-900 mt-3">
                  {loading ? "..." : taskCount}
                </p>

              </div>

              <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center text-2xl">
                ✅
              </div>

            </div>

            <button
              onClick={() => navigate("/tasks")}
              className="mt-6 text-purple-600 font-semibold text-sm hover:text-purple-700"
            >
              View Tasks →
            </button>

          </div>

        </div>


        {/* ================= QUICK ACTIONS ================= */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mb-8">

          <div className="mb-5">

            <h3 className="text-xl font-bold text-slate-900">
              Quick Actions
            </h3>

            <p className="text-sm text-slate-500 mt-1">
              Manage your CRM data quickly.
            </p>

          </div>


          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

            <button
              onClick={() => navigate("/customers")}
              className="p-4 rounded-xl border border-slate-200 hover:border-blue-400 hover:bg-blue-50 transition text-left"
            >

              <div className="text-2xl mb-2">
                👤
              </div>

              <p className="font-semibold text-slate-800">
                Manage Customers
              </p>

              <p className="text-xs text-slate-500 mt-1">
                Add, edit and search customers
              </p>

            </button>


            <button
              onClick={() => navigate("/leads")}
              className="p-4 rounded-xl border border-slate-200 hover:border-green-400 hover:bg-green-50 transition text-left"
            >

              <div className="text-2xl mb-2">
                🎯
              </div>

              <p className="font-semibold text-slate-800">
                Manage Leads
              </p>

              <p className="text-xs text-slate-500 mt-1">
                Track and manage your leads
              </p>

            </button>


            <button
              onClick={() => navigate("/tasks")}
              className="p-4 rounded-xl border border-slate-200 hover:border-purple-400 hover:bg-purple-50 transition text-left"
            >

              <div className="text-2xl mb-2">
                📋
              </div>

              <p className="font-semibold text-slate-800">
                Manage Tasks
              </p>

              <p className="text-xs text-slate-500 mt-1">
                Track pending and completed tasks
              </p>

            </button>

          </div>

        </div>


        {/* ================= ADMIN PANEL ================= */}
        {role === "ADMIN" && (

          <div className="bg-slate-950 rounded-2xl p-6 md:p-8 text-white shadow-lg">

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

              <div>

                <div className="flex items-center gap-2 mb-2">

                  <span className="px-2.5 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold">
                    ADMIN
                  </span>

                </div>

                <h3 className="text-xl font-bold">
                  Admin Control Panel
                </h3>

                <p className="text-slate-400 text-sm mt-1">
                  Manage users and monitor CRM data.
                </p>

              </div>


              <button
                onClick={() => navigate("/admin")}
                className="px-6 py-3 rounded-xl bg-linear-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 transition font-semibold shadow-lg"
              >
                Go to Admin Panel →
              </button>

            </div>

          </div>

        )}

      </main>

    </div>
  );
};

export default Dashboard;