import React from 'react'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const navigate = useNavigate()

  const handleLogout=()=>{
    localStorage.removeItem("token");
    navigate("/")
  }

  return (
    <div className=" min-h-screen bg-gray-200">
      <nav className="bg-blue-600 text-white px-8 py-4 flex justify-between items-center">
        <h1 className=" text-2xl font-bold">CRM Dashboard</h1>
        <button 
        onClick={handleLogout}
        className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </nav>

      <div className='p-8'>
        <h2 className='text-3xl font-bold mb-6'>
          Welcome to CRM 👋
        </h2>

        <div className='flex flex-wrap gap-6'>
          <div className='bg-white rounded-xl p-6 shadow flex-1 min-w-250px'>
            <h3 className='font-semibold text-2xl'>
            Customers
            </h3>
            <p className='text-gray-500 mt-2'>
              Manage your Customers
            </p>
            <button 
            onClick={()=>navigate("/customers")}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">
              View Customers
            </button>
          </div>

          <div className="bg-white p-6 rounded-xl shadow flex-1 min-w-250px">
            <h3 className="text-xl font-semibold">
              Leads
            </h3>
            <p className="text-gray-500 mt-2">
              Manage your Leads
            </p>
            <button
            onClick={()=>navigate("/leads")}
            className='mt-4 bg-green-600 text-white px-4 py-2 rounded'>
              View Leads
            </button>
          </div>

          <div className="bg-white p-6 rounded-xl shadow flex-1 min-w-250px">
            <h3 className="text-xl font-semibold">
              Tasks
            </h3>

            <p className="text-gray-500 mt-2">
              Manage your tasks
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
  )
}

export default Dashboard