
import React, { useEffect, useState } from "react";
import api from "../services/api";

const Customer = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);

  const name = localStorage.getItem("name");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    status: "ACTIVE",
  });

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const [page, setPage] = useState(0);
  const [size] = useState(5);

  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  // =========================
  // GET CUSTOMERS
  // =========================

  const getCustomers = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get(
        `/customers?page=${page}&size=${size}`
      );

      setCustomers(response.data.content);
      setTotalPages(response.data.totalPages);
      setTotalElements(response.data.totalElements);
    } catch (error) {
      console.log("CUSTOMER ERROR:", error);
      setError("Unable to load customers.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCustomers();
  }, [page]);

  // =========================
  // FORM CHANGE
  // =========================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // =========================
  // ADD MODAL
  // =========================

  const openAddModal = () => {
    setEditingCustomer(null);

    setFormData({
      name: "",
      email: "",
      phone: "",
      company: "",
      status: "ACTIVE",
    });

    setShowModal(true);
  };

  // =========================
  // EDIT MODAL
  // =========================

  const openEditModal = (customer) => {
    setEditingCustomer(customer);

    setFormData({
      name: customer.name || "",
      email: customer.email || "",
      phone: customer.phone || "",
      company: customer.company || "",
      status: customer.status || "ACTIVE",
    });

    setShowModal(true);
  };

  // =========================
  // ADD / UPDATE
  // =========================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      if (editingCustomer) {
        await api.put(
          `/customers/${editingCustomer.id}`,
          formData
        );
      } else {
        await api.post("/customers", formData);
      }

      setShowModal(false);
      setEditingCustomer(null);

      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        status: "ACTIVE",
      });

      getCustomers();
    } catch (error) {
      console.log(error);
      setError("Unable to save customer.");
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // DELETE
  // =========================

  const deleteCustomer = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this customer?"
    );

    if (!confirmDelete) return;

    try {
      setLoading(true);

      await api.delete(`/customers/${id}`);

      getCustomers();
    } catch (error) {
      console.log(error);
      setError("Unable to delete customer.");
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // SEARCH
  // =========================

  const searchCustomer = async (value) => {
    setSearch(value);

    if (value.trim() === "") {
      getCustomers();
      return;
    }

    try {
      setLoading(true);

      const response = await api.get(
        `/customers/search?name=${value}`
      );

      setCustomers(response.data);
      setTotalElements(response.data.length);
      setTotalPages(1);
    } catch (error) {
      console.log(error);
      setError("Unable to search customers.");
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // FILTER
  // =========================

  const filterCustomer = async (status) => {
    setStatusFilter(status);

    if (status === "ALL") {
      getCustomers();
      return;
    }

    try {
      setLoading(true);

      const response = await api.get(
        `/customers/filter?status=${status}`
      );

      setCustomers(response.data);
      setTotalElements(response.data.length);
      setTotalPages(1);
    } catch (error) {
      console.log(error);
      setError("Unable to filter customers.");
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // UI
  // =========================

  return (
    <div className="min-h-screen bg-slate-50">

      {/* ================= HEADER ================= */}

      <header className="bg-slate-950 text-white px-6 md:px-10 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">

          <div className="flex items-center gap-3">

            <div className="w-11 h-11 rounded-xl bg-linear-to-br from-blue-500 to-indigo-600 flex items-center justify-center font-bold text-xl shadow-lg">
              C
            </div>

            <div>
              <h1 className="text-lg font-bold">
                Smart CRM
              </h1>

              <p className="text-xs text-slate-400">
                Customer Management
              </p>
            </div>

          </div>

          <div className="flex items-center gap-3">

            <div className="hidden sm:block text-right">
              <p className="text-sm font-semibold">
                {name}
              </p>

              <p className="text-xs text-slate-400">
                CRM User
              </p>
            </div>

            <div className="w-10 h-10 rounded-full bg-linear-to-br from-blue-500 to-indigo-600 flex items-center justify-center font-bold">
              {name?.charAt(0).toUpperCase()}
            </div>

          </div>

        </div>
      </header>


      {/* ================= MAIN ================= */}

      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8">

        {/* PAGE TITLE */}

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-8">

          <div>
            <p className="text-sm font-medium text-blue-600 mb-1">
              CUSTOMER MANAGEMENT
            </p>

            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
              Customers
            </h2>

            <p className="text-slate-500 mt-2">
              Manage and track all your customer information.
            </p>
          </div>

          <button
            onClick={openAddModal}
            className="bg-linear-to-r from-blue-600 to-indigo-600
            hover:from-blue-700 hover:to-indigo-700
            text-white px-6 py-3 rounded-xl font-semibold
            shadow-lg hover:shadow-xl transition-all
            flex items-center justify-center gap-2"
          >
            <span className="text-xl">+</span>
            Add Customer
          </button>

        </div>


        {/* ================= STATS ================= */}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-7">

          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
            <p className="text-sm text-slate-500">
              Total Customers
            </p>

            <h3 className="text-3xl font-bold text-slate-900 mt-1">
              {totalElements}
            </h3>

            <p className="text-xs text-blue-600 mt-2">
              All registered customers
            </p>
          </div>


          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
            <p className="text-sm text-slate-500">
              Active Customers
            </p>

            <h3 className="text-3xl font-bold text-green-600 mt-1">
              {customers.filter(
                (customer) => customer.status === "ACTIVE"
              ).length}
            </h3>

            <p className="text-xs text-green-600 mt-2">
              Currently active
            </p>
          </div>


          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
            <p className="text-sm text-slate-500">
              Current Page
            </p>

            <h3 className="text-3xl font-bold text-indigo-600 mt-1">
              {page + 1}
            </h3>

            <p className="text-xs text-slate-500 mt-2">
              Of {totalPages || 1} pages
            </p>
          </div>

        </div>


        {/* ================= ERROR ================= */}

        {error && (
          <div className="mb-5 bg-red-50 border border-red-200 text-red-700 px-5 py-3 rounded-xl">
            {error}
          </div>
        )}


        {/* ================= SEARCH ================= */}

        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 mb-6">

          <div className="flex flex-col md:flex-row gap-4">

            <div className="relative flex-1">

              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                🔍
              </span>

              <input
                type="text"
                placeholder="Search customer by name..."
                value={search}
                onChange={(e) =>
                  searchCustomer(e.target.value)
                }
                className="w-full border border-slate-200 bg-slate-50
                rounded-xl pl-11 pr-4 py-3
                focus:bg-white focus:outline-none
                focus:ring-2 focus:ring-blue-500
                transition"
              />

            </div>


            <select
              value={statusFilter}
              onChange={(e) =>
                filterCustomer(e.target.value)
              }
              className="md:w-48 border border-slate-200
              bg-slate-50 rounded-xl px-4 py-3
              focus:bg-white focus:outline-none
              focus:ring-2 focus:ring-blue-500"
            >

              <option value="ALL">
                All Status
              </option>

              <option value="ACTIVE">
                Active
              </option>

              <option value="INACTIVE">
                Inactive
              </option>

            </select>

          </div>

        </div>


        {/* ================= TABLE ================= */}

        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">

          {loading ? (

            <div className="py-20 text-center">

              <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>

              <p className="text-slate-500">
                Loading customers...
              </p>

            </div>

          ) : customers.length === 0 ? (

            <div className="py-20 text-center">

              <div className="text-6xl mb-4">
                👥
              </div>

              <h3 className="text-xl font-semibold text-slate-800">
                No Customers Found
              </h3>

              <p className="text-slate-500 mt-2">
                Add your first customer to get started.
              </p>

              <button
                onClick={openAddModal}
                className="mt-5 bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700"
              >
                + Add Customer
              </button>

            </div>

          ) : (

            <div className="overflow-x-auto">

              <table className="w-full">

                <thead className="bg-slate-50 border-b border-slate-200">

                  <tr>

                    <th className="text-left px-6 py-4 text-xs uppercase tracking-wide font-semibold text-slate-500">
                      Customer
                    </th>

                    <th className="text-left px-6 py-4 text-xs uppercase tracking-wide font-semibold text-slate-500">
                      Email
                    </th>

                    <th className="text-left px-6 py-4 text-xs uppercase tracking-wide font-semibold text-slate-500">
                      Phone
                    </th>

                    <th className="text-left px-6 py-4 text-xs uppercase tracking-wide font-semibold text-slate-500">
                      Company
                    </th>

                    <th className="text-left px-6 py-4 text-xs uppercase tracking-wide font-semibold text-slate-500">
                      Status
                    </th>

                    <th className="text-right px-6 py-4 text-xs uppercase tracking-wide font-semibold text-slate-500">
                      Actions
                    </th>

                  </tr>

                </thead>


                <tbody className="divide-y divide-slate-100">

                  {customers.map((customer) => (

                    <tr
                      key={customer.id}
                      className="hover:bg-blue-50/40 transition"
                    >

                      {/* CUSTOMER */}

                      <td className="px-6 py-4">

                        <div className="flex items-center gap-3">

                          <div className="w-11 h-11 rounded-xl bg-linear-to-br from-blue-100 to-indigo-100 text-blue-700 flex items-center justify-center font-bold">
                            {customer.name
                              ?.charAt(0)
                              ?.toUpperCase()}
                          </div>

                          <div>

                            <p className="font-semibold text-slate-800">
                              {customer.name}
                            </p>

                            <p className="text-xs text-slate-400">
                              ID #{customer.id}
                            </p>

                          </div>

                        </div>

                      </td>


                      {/* EMAIL */}

                      <td className="px-6 py-4 text-sm text-slate-600">
                        {customer.email}
                      </td>


                      {/* PHONE */}

                      <td className="px-6 py-4 text-sm text-slate-600">
                        {customer.phone || "-"}
                      </td>


                      {/* COMPANY */}

                      <td className="px-6 py-4 text-sm text-slate-600">
                        {customer.company || "-"}
                      </td>


                      {/* STATUS */}

                      <td className="px-6 py-4">

                        {customer.status === "ACTIVE" ? (

                          <span className="inline-flex items-center gap-1.5 bg-green-50 text-green-700 border border-green-200 px-3 py-1.5 rounded-full text-xs font-semibold">

                            <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>

                            ACTIVE

                          </span>

                        ) : (

                          <span className="inline-flex items-center gap-1.5 bg-red-50 text-red-700 border border-red-200 px-3 py-1.5 rounded-full text-xs font-semibold">

                            <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>

                            INACTIVE

                          </span>

                        )}

                      </td>


                      {/* ACTIONS */}

                      <td className="px-6 py-4">

                        <div className="flex justify-end gap-2">

                          <button
                            onClick={() =>
                              openEditModal(customer)
                            }
                            title="Edit Customer"
                            className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition"
                          >
                            ✏️
                          </button>

                          <button
                            onClick={() =>
                              deleteCustomer(customer.id)
                            }
                            title="Delete Customer"
                            className="w-9 h-9 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition"
                          >
                            🗑️
                          </button>

                        </div>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          )}


          {/* ================= PAGINATION ================= */}

          {!search &&
            statusFilter === "ALL" &&
            totalPages > 0 && (

              <div className="flex flex-col sm:flex-row justify-between items-center gap-4 px-6 py-4 border-t border-slate-100">

                <p className="text-sm text-slate-500">

                  Showing page{" "}
                  <span className="font-semibold text-slate-700">
                    {page + 1}
                  </span>{" "}
                  of{" "}
                  <span className="font-semibold text-slate-700">
                    {totalPages}
                  </span>

                </p>


                <div className="flex items-center gap-3">

                  <button
                    disabled={page === 0}
                    onClick={() =>
                      setPage(page - 1)
                    }
                    className="px-4 py-2 border border-slate-200
                    rounded-lg text-sm font-medium
                    hover:bg-slate-50
                    disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    ← Previous
                  </button>


                  <span className="text-sm font-medium text-slate-600">
                    {page + 1} / {totalPages}
                  </span>


                  <button
                    disabled={page === totalPages - 1}
                    onClick={() =>
                      setPage(page + 1)
                    }
                    className="px-4 py-2 border border-slate-200
                    rounded-lg text-sm font-medium
                    hover:bg-slate-50
                    disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Next →
                  </button>

                </div>

              </div>

            )}

        </div>

      </main>


      {/* ================================================= */}
      {/* ADD / EDIT MODAL */}
      {/* ================================================= */}

      {showModal && (

        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">

          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden">

            {/* MODAL HEADER */}

            <div className="bg-linear-to-r from-blue-600 to-indigo-600 px-6 py-5 text-white flex justify-between items-center">

              <div>

                <h2 className="text-xl font-bold">
                  {editingCustomer
                    ? "Edit Customer"
                    : "Add Customer"}
                </h2>

                <p className="text-blue-100 text-sm mt-1">
                  {editingCustomer
                    ? "Update customer information"
                    : "Add a new customer to your CRM"}
                </p>

              </div>


              <button
                onClick={() =>
                  setShowModal(false)
                }
                className="w-9 h-9 rounded-lg bg-white/10 hover:bg-white/20 transition text-lg"
              >
                ✕
              </button>

            </div>


            {/* FORM */}

            <form
              onSubmit={handleSubmit}
              className="p-6 space-y-5"
            >

              {/* NAME */}

              <div>

                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Full Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter customer name"
                  className="w-full border border-slate-200
                  bg-slate-50 rounded-xl px-4 py-3
                  focus:bg-white focus:outline-none
                  focus:ring-2 focus:ring-blue-500"
                />

              </div>


              {/* EMAIL */}

              <div>

                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Email Address
                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="customer@example.com"
                  className="w-full border border-slate-200
                  bg-slate-50 rounded-xl px-4 py-3
                  focus:bg-white focus:outline-none
                  focus:ring-2 focus:ring-blue-500"
                />

              </div>


              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                {/* PHONE */}

                <div>

                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Phone
                  </label>

                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone number"
                    className="w-full border border-slate-200
                    bg-slate-50 rounded-xl px-4 py-3
                    focus:bg-white focus:outline-none
                    focus:ring-2 focus:ring-blue-500"
                  />

                </div>


                {/* COMPANY */}

                <div>

                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Company
                  </label>

                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Company name"
                    className="w-full border border-slate-200
                    bg-slate-50 rounded-xl px-4 py-3
                    focus:bg-white focus:outline-none
                    focus:ring-2 focus:ring-blue-500"
                  />

                </div>

              </div>


              {/* STATUS */}

              <div>

                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Status
                </label>

                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full border border-slate-200
                  bg-slate-50 rounded-xl px-4 py-3
                  focus:bg-white focus:outline-none
                  focus:ring-2 focus:ring-blue-500"
                >

                  <option value="ACTIVE">
                    ACTIVE
                  </option>

                  <option value="INACTIVE">
                    INACTIVE
                  </option>

                </select>

              </div>


              {/* BUTTONS */}

              <div className="flex justify-end gap-3 pt-3">

                <button
                  type="button"
                  onClick={() =>
                    setShowModal(false)
                  }
                  className="px-5 py-3 border border-slate-200
                  rounded-xl font-medium text-slate-600
                  hover:bg-slate-50 transition"
                >
                  Cancel
                </button>


                <button
                  type="submit"
                  className="px-6 py-3 bg-linear-to-r
                  from-blue-600 to-indigo-600
                  text-white rounded-xl font-semibold
                  hover:from-blue-700 hover:to-indigo-700
                  shadow-md transition"
                >
                  {editingCustomer
                    ? "Update Customer"
                    : "Add Customer"}
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  );
};

export default Customer;

