import React, { useEffect, useState } from "react";
import api from "../services/api";

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [customers, setCustomers] = useState([]);

  const [loadingUsers, setLoadingUsers] = useState(false);
  const [loadingCustomers, setLoadingCustomers] = useState(false);

  const [error, setError] = useState("");

  const name = localStorage.getItem("name");

  // =========================
  // GET ALL USERS
  // =========================

  const getUsers = async () => {
    try {
      setLoadingUsers(true);
      setError("");

      const response = await api.get("/admin/users");

      console.log("USERS:", response.data);

      setUsers(response.data);
    } catch (error) {
      console.log("Users Error:", error);

      if (error.response?.status === 403) {
        setError("You are not authorized to access admin data.");
      } else {
        setError("Unable to load users.");
      }
    } finally {
      setLoadingUsers(false);
    }
  };

  // =========================
  // GET ALL CUSTOMERS
  // =========================

  const getCustomers = async () => {
    try {
      setLoadingCustomers(true);
      setError("");

      const response = await api.get("/admin/customers");

      console.log("ADMIN CUSTOMERS:", response.data);

      setCustomers(response.data);
    } catch (error) {
      console.log("Customers Error:", error);

      if (error.response?.status === 403) {
        setError("You are not authorized to access admin data.");
      } else {
        setError("Unable to load customers.");
      }
    } finally {
      setLoadingCustomers(false);
    }
  };

  // =========================
  // USE EFFECT
  // =========================

  useEffect(() => {
    getUsers();
    getCustomers();
  }, []);

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-100 via-blue-50 to-indigo-100">

      {/* ================= HEADER ================= */}

      <header className="bg-slate-950 text-white px-6 md:px-10 py-4 shadow-lg">

        <div className="max-w-7xl mx-auto flex justify-between items-center">

          {/* Logo */}

          <div className="flex items-center gap-3">

            <div className="w-11 h-11 rounded-xl bg-linear-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-xl font-bold shadow-lg">
              C
            </div>

            <div>
              <h1 className="text-xl font-bold">
                Smart CRM
              </h1>

              <p className="text-xs text-slate-400">
                Administration
              </p>
            </div>

          </div>


          {/* Admin User */}

          <div className="flex items-center gap-3">

            <div className="hidden sm:block text-right">

              <p className="text-sm font-semibold">
                {name || "Admin"}
              </p>

              <span className="text-xs text-blue-400 font-medium">
                Administrator
              </span>

            </div>

            <div className="w-11 h-11 rounded-full bg-linear-to-br from-blue-500 to-indigo-600 flex items-center justify-center font-bold text-lg">
              {name
                ? name.charAt(0).toUpperCase()
                : "A"}
            </div>

          </div>

        </div>

      </header>


      {/* ================= MAIN ================= */}

      <main className="max-w-7xl mx-auto px-5 md:px-8 py-8">

        {/* Page Heading */}

        <div className="mb-8">

          <div className="flex items-center gap-2 mb-2">

            <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wide">
              Admin Panel
            </span>

          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
            Admin Dashboard
          </h2>

          <p className="text-slate-500 mt-2">
            Manage users and monitor customer data from one place.
          </p>

        </div>


        {/* ================= ERROR ================= */}

        {error && (

          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-5 py-4 rounded-xl flex items-center gap-3">

            <div className="w-9 h-9 rounded-full bg-red-100 flex items-center justify-center">
              ⚠️
            </div>

            <div>
              <p className="font-semibold">
                Something went wrong
              </p>

              <p className="text-sm">
                {error}
              </p>
            </div>

          </div>

        )}


        {/* ================= STATS ================= */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">

          {/* Users */}

          <div className="bg-slate-50 rounded-2xl border border-blue-100 p-6 shadow-sm hover:shadow-md transition">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm font-medium text-slate-500">
                  Total Users
                </p>

                <p className="text-4xl font-bold text-slate-900 mt-2">
                  {loadingUsers ? "..." : users.length}
                </p>

                <p className="text-sm text-slate-500 mt-2">
                  Registered CRM users
                </p>

              </div>

              <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center text-2xl">
                👥
              </div>

            </div>

          </div>


          {/* Customers */}

          <div className="bg-slate-50 rounded-2xl border border-indigo-100 p-6 shadow-sm hover:shadow-md transition">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm font-medium text-slate-500">
                  Total Customers
                </p>

                <p className="text-4xl font-bold text-slate-900 mt-2">
                  {loadingCustomers ? "..." : customers.length}
                </p>

                <p className="text-sm text-slate-500 mt-2">
                  Customers across the CRM
                </p>

              </div>

              <div className="w-14 h-14 rounded-2xl bg-indigo-100 flex items-center justify-center text-2xl">
                🏢
              </div>

            </div>

          </div>

        </div>


        {/* ================= USERS ================= */}

        <section className="bg-slate-50 rounded-2xl shadow-sm border border-blue-100 overflow-hidden mb-8">

          {/* Section Header */}

          <div className="px-6 md:px-7 py-6 border-b border-slate-200">

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

              <div>

                <h3 className="text-xl font-bold text-slate-900">
                  All Users
                </h3>

                <p className="text-sm text-slate-500 mt-1">
                  View all registered users and their roles.
                </p>

              </div>

              <div className="px-3 py-1.5 rounded-lg bg-blue-100 text-blue-700 text-sm font-semibold">
                {users.length} Users
              </div>

            </div>

          </div>


          {/* Loading */}

          {loadingUsers ? (

            <div className="p-12 text-center">

              <div className="w-9 h-9 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto">
              </div>

              <p className="text-slate-500 mt-4 text-sm">
                Loading users...
              </p>

            </div>

          ) : users.length === 0 ? (

            <div className="p-12 text-center">

              <div className="text-4xl mb-3">
                👥
              </div>

              <p className="font-semibold text-slate-700">
                No users found
              </p>

              <p className="text-sm text-slate-500 mt-1">
                There are currently no registered users.
              </p>

            </div>

          ) : (

            <div className="overflow-x-auto">

              <table className="w-full">

                <thead className="bg-blue-50/70">

                  <tr>

                    <th className="text-left px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                      ID
                    </th>

                    <th className="text-left px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                      User
                    </th>

                    <th className="text-left px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Email
                    </th>

                    <th className="text-left px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Role
                    </th>

                  </tr>

                </thead>


                <tbody>

                  {users.map((user) => (

                    <tr
                      key={user.id}
                      className="border-t border-slate-100 hover:bg-blue-50/60 transition"
                    >

                      <td className="px-6 py-4 text-sm font-medium text-slate-500">
                        #{user.id}
                      </td>


                      <td className="px-6 py-4">

                        <div className="flex items-center gap-3">

                          <div className="w-10 h-10 rounded-full bg-linear-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center font-bold">
                            {user.name
                              ? user.name.charAt(0).toUpperCase()
                              : "U"}
                          </div>

                          <div>

                            <p className="font-semibold text-slate-800">
                              {user.name || "-"}
                            </p>

                            <p className="text-xs text-slate-400">
                              User ID #{user.id}
                            </p>

                          </div>

                        </div>

                      </td>


                      <td className="px-6 py-4 text-sm text-slate-600">
                        {user.email || "-"}
                      </td>


                      <td className="px-6 py-4">

                        <span
                          className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold
                          ${
                            user.role === "ADMIN"
                              ? "bg-purple-100 text-purple-700"
                              : "bg-blue-100 text-blue-700"
                          }`}
                        >

                          <span className="w-1.5 h-1.5 rounded-full bg-current">
                          </span>

                          {user.role || "-"}

                        </span>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          )}

        </section>


        {/* ================= CUSTOMERS ================= */}

        <section className="bg-slate-50 rounded-2xl shadow-sm border border-indigo-100 overflow-hidden">

          {/* Section Header */}

          <div className="px-6 md:px-7 py-6 border-b border-slate-200">

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

              <div>

                <h3 className="text-xl font-bold text-slate-900">
                  All Customers
                </h3>

                <p className="text-sm text-slate-500 mt-1">
                  Monitor all customers available to the administrator.
                </p>

              </div>

              <div className="px-3 py-1.5 rounded-lg bg-indigo-100 text-indigo-700 text-sm font-semibold">
                {customers.length} Customers
              </div>

            </div>

          </div>


          {/* Loading */}

          {loadingCustomers ? (

            <div className="p-12 text-center">

              <div className="w-9 h-9 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto">
              </div>

              <p className="text-slate-500 mt-4 text-sm">
                Loading customers...
              </p>

            </div>

          ) : customers.length === 0 ? (

            <div className="p-12 text-center">

              <div className="text-4xl mb-3">
                🏢
              </div>

              <p className="font-semibold text-slate-700">
                No customers found
              </p>

              <p className="text-sm text-slate-500 mt-1">
                There are currently no customers in the CRM.
              </p>

            </div>

          ) : (

            <div className="overflow-x-auto">

              <table className="w-full">

                <thead className="bg-indigo-50/70">

                  <tr>

                    <th className="text-left px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                      ID
                    </th>

                    <th className="text-left px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Customer
                    </th>

                    <th className="text-left px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Email
                    </th>

                    <th className="text-left px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Phone
                    </th>

                  </tr>

                </thead>


                <tbody>

                  {customers.map((customer) => (

                    <tr
                      key={customer.id}
                      className="border-t border-slate-100 hover:bg-indigo-50/60 transition"
                    >

                      <td className="px-6 py-4 text-sm font-medium text-slate-500">
                        #{customer.id}
                      </td>


                      <td className="px-6 py-4">

                        <div className="flex items-center gap-3">

                          <div className="w-10 h-10 rounded-full bg-linear-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center font-bold">
                            {customer.name
                              ? customer.name.charAt(0).toUpperCase()
                              : "C"}
                          </div>

                          <div>

                            <p className="font-semibold text-slate-800">
                              {customer.name || "-"}
                            </p>

                            <p className="text-xs text-slate-400">
                              Customer #{customer.id}
                            </p>

                          </div>

                        </div>

                      </td>


                      <td className="px-6 py-4 text-sm text-slate-600">
                        {customer.email || "-"}
                      </td>


                      <td className="px-6 py-4 text-sm text-slate-600">
                        {customer.phone || "-"}
                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          )}

        </section>

      </main>

    </div>
  );
};

export default Admin;