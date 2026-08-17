import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const Dashboard = () => {

  const navigate = useNavigate();

  const [customerCount, setCustomerCount] = useState(0);
  const [leadCount, setLeadCount] = useState(0);
  const [taskCount, setTaskCount] = useState(0);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {

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
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-200">

      <nav className="bg-blue-600 text-white px-8 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          CRM Dashboard
        </h1>

        <button
          onClick={handleLogout}
          className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </nav>

      <div className="p-8">

        <h2 className="text-3xl font-bold mb-6">
          Welcome to CRM 👋
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Customers */}
          <div className="bg-white p-6 rounded-xl shadow">

            <h3 className="text-xl font-semibold">
              Customers
            </h3>

            <p className="text-4xl font-bold mt-3">
              {customerCount}
            </p>

            <p className="text-gray-500 mt-2">
              Total Customers
            </p>

            <button
              onClick={() => navigate("/customers")}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
            >
              View Customers
            </button>

          </div>

          {/* Leads */}
          <div className="bg-white p-6 rounded-xl shadow">

            <h3 className="text-xl font-semibold">
              Leads
            </h3>

            <p className="text-4xl font-bold mt-3">
              {leadCount}
            </p>

            <p className="text-gray-500 mt-2">
              Total Leads
            </p>

            <button
              onClick={() => navigate("/leads")}
              className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
            >
              View Leads
            </button>

          </div>

          {/* Tasks */}
          <div className="bg-white p-6 rounded-xl shadow">

            <h3 className="text-xl font-semibold">
              Tasks
            </h3>

            <p className="text-4xl font-bold mt-3">
              {taskCount}
            </p>

            <p className="text-gray-500 mt-2">
              Total Tasks
            </p>

            <button
              onClick={() => navigate("/tasks")}
              className="mt-4 bg-purple-600 text-white px-4 py-2 rounded"
            >
              View Tasks
            </button>

          </div>

        </div>

      </div>
    </div>
  );
};

export default Dashboard;