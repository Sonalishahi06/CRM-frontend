import React, { useEffect, useState } from "react";
import api from '../services/api';

const Customer = () => {
  // =========================
  // STATES
  // =========================

  const [customers, setCustomers] = useState([]);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  // Modal open/close
  const [showModal, setShowModal] = useState(false);

  // Edit ke time customer store hoga
  const [editingCustomer, setEditingCustomer] = useState(null);

  // Form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    status: "ACTIVE",
  });

  // Search
  const [search, setSearch] = useState("");

  // Filter
  const [statusFilter, setStatusFilter] = useState("ALL");

  // Pagination
  const [page, setPage] = useState(0);
  const [size] = useState(5);

  const [totalPages, setTotalPages] = useState(0);

  const [totalElements, setTotalElements] = useState(0);


  // =========================
  // GET ALL CUSTOMERS
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
      console.log(error);

      setError("Unable to load customers.");

    } finally {
      setLoading(false);
    }
  };


  // =========================
  // USE EFFECT
  // =========================

  useEffect(() => {
    getCustomers();
  }, [page]);


  // =========================
  // FORM INPUT CHANGE
  // =========================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };


  // =========================
  // OPEN ADD CUSTOMER MODAL
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
  // OPEN EDIT MODAL
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
  // ADD / UPDATE CUSTOMER
  // =========================

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      setError("");

      if (editingCustomer) {

        // UPDATE

        await api.put(
          `/customers/${editingCustomer.id}`,
          formData
        );

      } else {

        // ADD

        await api.post(
          "/customers",
          formData
        );

      }

      // Close modal
      setShowModal(false);

      // Reset editing
      setEditingCustomer(null);

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        status: "ACTIVE",
      });

      // Refresh customer list
      getCustomers();

    } catch (error) {

      console.log(error);

      setError("Unable to save customer.");

    } finally {

      setLoading(false);

    }
  };


  // =========================
  // DELETE CUSTOMER
  // =========================

  const deleteCustomer = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this customer?"
    );

    if (!confirmDelete) {
      return;
    }

    try {

      setLoading(true);

      await api.delete(
        `/customers/${id}`
      );

      getCustomers();

    } catch (error) {

      console.log(error);

      setError("Unable to delete customer.");

    } finally {

      setLoading(false);

    }
  };


  // =========================
  // SEARCH CUSTOMER
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
  // FILTER CUSTOMER
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
  // JSX
  // =========================

  return (

    <div className="min-h-screen bg-gray-100">

      {/* ================= HEADER ================= */}

      <div className="bg-white shadow-sm px-8 py-4 flex justify-between items-center">

        <div>

          <h1 className="text-2xl font-bold text-gray-800">
            Smart CRM
          </h1>

          <p className="text-sm text-gray-500">
            Customer Management
          </p>

        </div>

        <div className="flex items-center gap-3">

          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center font-bold text-blue-600">
            S
          </div>

          <span className="font-medium text-gray-700">
            Sonali
          </span>

        </div>

      </div>


      {/* ================= MAIN ================= */}

      <div className="p-8">


        {/* ================= TITLE ================= */}

        <div className="flex justify-between items-center mb-6">

          <div>

            <h2 className="text-3xl font-bold text-gray-800">
              Customers
            </h2>

            <p className="text-gray-500 mt-1">
              Manage all your customers
            </p>

          </div>


          {/* ADD BUTTON */}

          <button
            onClick={openAddModal}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg font-medium"
          >
            + Add Customer
          </button>

        </div>


        {/* ================= ERROR ================= */}

        {error && (

          <div className="bg-red-100 text-red-700 px-4 py-3 rounded-lg mb-5">

            {error}

          </div>

        )}


        {/* ================= SEARCH & FILTER ================= */}

        <div className="bg-white p-5 rounded-xl shadow-sm mb-6">

          <div className="flex gap-4">


            {/* SEARCH */}

            <input
              type="text"
              placeholder="Search customer by name..."
              value={search}
              onChange={(e) =>
                searchCustomer(e.target.value)
              }
              className="flex-1 border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />


            {/* FILTER */}

            <select
              value={statusFilter}
              onChange={(e) =>
                filterCustomer(e.target.value)
              }
              className="border border-gray-300 rounded-lg px-4 py-3 outline-none"
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


        {/* ================= CUSTOMER TABLE ================= */}

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">


          {loading ? (

            <div className="p-10 text-center text-gray-500">
              Loading customers...
            </div>

          ) : customers.length === 0 ? (

            <div className="p-10 text-center">

              <div className="text-5xl mb-3">
                👥
              </div>

              <h3 className="text-lg font-semibold text-gray-700">
                No Customers Found
              </h3>

              <p className="text-gray-500 mt-1">
                Add your first customer.
              </p>

            </div>

          ) : (

            <div className="overflow-x-auto">

              <table className="w-full">


                {/* TABLE HEADER */}

                <thead className="bg-gray-50 border-b">

                  <tr>

                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                      Customer
                    </th>

                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                      Email
                    </th>

                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                      Phone
                    </th>

                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                      Company
                    </th>

                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                      Status
                    </th>

                    <th className="text-right px-6 py-4 text-sm font-semibold text-gray-600">
                      Actions
                    </th>

                  </tr>

                </thead>


                {/* TABLE BODY */}

                <tbody>

                  {customers.map((customer) => (

                    <tr
                      key={customer.id}
                      className="border-b hover:bg-gray-50"
                    >


                      {/* CUSTOMER */}

                      <td className="px-6 py-4">

                        <div className="flex items-center gap-3">

                          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">

                            {customer.name
                              ?.charAt(0)
                              ?.toUpperCase()}

                          </div>

                          <div>

                            <p className="font-semibold text-gray-800">
                              {customer.name}
                            </p>

                            <p className="text-xs text-gray-400">
                              ID: #{customer.id}
                            </p>

                          </div>

                        </div>

                      </td>


                      {/* EMAIL */}

                      <td className="px-6 py-4 text-gray-600">
                        {customer.email}
                      </td>


                      {/* PHONE */}

                      <td className="px-6 py-4 text-gray-600">
                        {customer.phone || "-"}
                      </td>


                      {/* COMPANY */}

                      <td className="px-6 py-4 text-gray-600">
                        {customer.company || "-"}
                      </td>


                      {/* STATUS */}

                      <td className="px-6 py-4">

                        {customer.status === "ACTIVE" ? (

                          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
                            ACTIVE
                          </span>

                        ) : (

                          <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-semibold">
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
                            className="bg-blue-100 text-blue-600 px-3 py-2 rounded-lg hover:bg-blue-200"
                          >
                            ✏️
                          </button>

                          <button
                            onClick={() =>
                              deleteCustomer(customer.id)
                            }
                            className="bg-red-100 text-red-600 px-3 py-2 rounded-lg hover:bg-red-200"
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

              <div className="flex justify-between items-center px-6 py-4 border-t">

                <p className="text-sm text-gray-500">

                  Total Customers:{" "}

                  <span className="font-semibold text-gray-700">
                    {totalElements}
                  </span>

                </p>


                <div className="flex items-center gap-3">

                  <button
                    disabled={page === 0}
                    onClick={() =>
                      setPage(page - 1)
                    }
                    className="px-4 py-2 border rounded-lg disabled:opacity-40"
                  >
                    ← Previous
                  </button>


                  <span className="text-sm text-gray-600">

                    Page {page + 1} of {totalPages}

                  </span>


                  <button
                    disabled={page === totalPages - 1}
                    onClick={() =>
                      setPage(page + 1)
                    }
                    className="px-4 py-2 border rounded-lg disabled:opacity-40"
                  >
                    Next →

                  </button>

                </div>

              </div>

            )}

        </div>

      </div>


      {/* ================================================= */}
      {/* ADD / EDIT CUSTOMER MODAL */}
      {/* ================================================= */}

      {showModal && (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">


          <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl">


            {/* MODAL HEADER */}

            <div className="px-6 py-5 border-b flex justify-between items-center">

              <div>

                <h2 className="text-xl font-bold text-gray-800">

                  {editingCustomer
                    ? "Edit Customer"
                    : "Add Customer"}

                </h2>

                <p className="text-sm text-gray-500">
                  Enter customer information
                </p>

              </div>


              <button
                onClick={() =>
                  setShowModal(false)
                }
                className="text-gray-500 text-xl"
              >
                ✕
              </button>

            </div>


            {/* FORM */}

            <form
              onSubmit={handleSubmit}
              className="p-6 space-y-4"
            >


              {/* NAME */}

              <div>

                <label className="block text-sm font-medium mb-1">
                  Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter name"
                  className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                />

              </div>


              {/* EMAIL */}

              <div>

                <label className="block text-sm font-medium mb-1">
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Enter email"
                  className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                />

              </div>


              {/* PHONE */}

              <div>

                <label className="block text-sm font-medium mb-1">
                  Phone
                </label>

                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter phone"
                  className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                />

              </div>


              {/* COMPANY */}

              <div>

                <label className="block text-sm font-medium mb-1">
                  Company
                </label>

                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Enter company"
                  className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                />

              </div>


              {/* STATUS */}

              <div>

                <label className="block text-sm font-medium mb-1">
                  Status
                </label>

                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-3 outline-none"
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

              <div className="flex justify-end gap-3 pt-4">

                <button
                  type="button"
                  onClick={() =>
                    setShowModal(false)
                  }
                  className="px-5 py-3 border rounded-lg"
                >
                  Cancel
                </button>


                <button
                  type="submit"
                  className="px-5 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
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