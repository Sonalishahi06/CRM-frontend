import React, { useEffect, useState } from "react";
import api from "../services/api";

const Lead = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    source: "",
    status: "NEW",
    assignedTo: "",
  });

  const name = localStorage.getItem("name");
  const role = localStorage.getItem("role");

  // =========================
  // GET ALL LEADS
  // =========================

  const getLeads = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/leads");

      console.log("LEADS:", response.data);

      setLeads(response.data);
    } catch (error) {
      console.log("Lead Error:", error);
      setError("Unable to load leads.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getLeads();
  }, []);

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
  // OPEN ADD MODAL
  // =========================

  const openAddModal = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      source: "",
      status: "NEW",
      assignedTo: "",
    });

    setShowModal(true);
  };

  // =========================
  // CREATE LEAD
  // =========================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const leadData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        source: formData.source,
        status: formData.status,
        assignedTo: formData.assignedTo
          ? Number(formData.assignedTo)
          : null,
      };

      await api.post("/leads", leadData);

      setShowModal(false);

      setFormData({
        name: "",
        email: "",
        phone: "",
        source: "",
        status: "NEW",
        assignedTo: "",
      });

      getLeads();
    } catch (error) {
      console.log("Create Lead Error:", error);
      setError("Unable to create lead.");
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // UPDATE STATUS
  // =========================

  const updateStatus = async (id, status) => {
    try {
      setError("");

      await api.put(`/leads/${id}/status`, {
        status: status,
      });

      getLeads();
    } catch (error) {
      console.log("Status Update Error:", error);
      setError("Unable to update lead status.");
    }
  };

  // =========================
  // STATUS STYLE
  // =========================

  const getStatusClass = (status) => {
    switch (status) {
      case "NEW":
        return "bg-blue-100 text-blue-700 border-blue-200";

      case "CONTACTED":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";

      case "QUALIFIED":
        return "bg-purple-100 text-purple-700 border-purple-200";

      case "WON":
        return "bg-green-100 text-green-700 border-green-200";

      case "LOST":
        return "bg-red-100 text-red-700 border-red-200";

      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  // =========================
  // STATUS DOT
  // =========================

  const getStatusDot = (status) => {
    switch (status) {
      case "NEW":
        return "bg-blue-500";

      case "CONTACTED":
        return "bg-yellow-500";

      case "QUALIFIED":
        return "bg-purple-500";

      case "WON":
        return "bg-green-500";

      case "LOST":
        return "bg-red-500";

      default:
        return "bg-gray-500";
    }
  };

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
                Lead Management
              </p>
            </div>

          </div>

          {/* User */}

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
              {name
                ? name.charAt(0).toUpperCase()
                : "U"}
            </div>

          </div>

        </div>

      </header>


      {/* ================= MAIN ================= */}

      <main className="max-w-7xl mx-auto px-5 md:px-8 py-8">

        {/* Heading */}

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-8">

          <div>

            <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider">
              Sales Pipeline
            </p>

            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-1">
              Leads
            </h2>

            <p className="text-slate-500 mt-2">
              Track and manage your sales leads efficiently.
            </p>

          </div>


          {/* ADMIN ONLY */}

          {role === "ADMIN" && (

            <button
              onClick={openAddModal}
              className="self-start md:self-auto px-5 py-3 rounded-xl bg-linear-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold shadow-lg transition"
            >
              + Add Lead
            </button>

          )}

        </div>


        {/* ================= STATS ================= */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">

          {/* Total */}

          <div className="bg-slate-50 rounded-2xl p-5 border border-blue-100 shadow-sm">

            <div className="flex justify-between items-center">

              <div>

                <p className="text-sm text-slate-500 font-medium">
                  Total Leads
                </p>

                <p className="text-3xl font-bold text-slate-900 mt-2">
                  {leads.length}
                </p>

              </div>

              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-xl">
                🎯
              </div>

            </div>

          </div>


          {/* New */}

          <div className="bg-slate-50 rounded-2xl p-5 border border-blue-100 shadow-sm">

            <div className="flex justify-between items-center">

              <div>

                <p className="text-sm text-slate-500 font-medium">
                  New Leads
                </p>

                <p className="text-3xl font-bold text-slate-900 mt-2">
                  {
                    leads.filter(
                      (lead) => lead.status === "NEW"
                    ).length
                  }
                </p>

              </div>

              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-xl">
                🆕
              </div>

            </div>

          </div>


          {/* Qualified */}

          <div className="bg-slate-50 rounded-2xl p-5 border border-purple-100 shadow-sm">

            <div className="flex justify-between items-center">

              <div>

                <p className="text-sm text-slate-500 font-medium">
                  Qualified
                </p>

                <p className="text-3xl font-bold text-slate-900 mt-2">
                  {
                    leads.filter(
                      (lead) => lead.status === "QUALIFIED"
                    ).length
                  }
                </p>

              </div>

              <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center text-xl">
                ⭐
              </div>

            </div>

          </div>


          {/* Won */}

          <div className="bg-slate-50 rounded-2xl p-5 border border-green-100 shadow-sm">

            <div className="flex justify-between items-center">

              <div>

                <p className="text-sm text-slate-500 font-medium">
                  Won Leads
                </p>

                <p className="text-3xl font-bold text-slate-900 mt-2">
                  {
                    leads.filter(
                      (lead) => lead.status === "WON"
                    ).length
                  }
                </p>

              </div>

              <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center text-xl">
                🏆
              </div>

            </div>

          </div>

        </div>


        {/* ================= ERROR ================= */}

        {error && (

          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-5 py-4 rounded-xl flex items-center gap-3">

            <div className="w-9 h-9 rounded-full bg-red-100 flex items-center justify-center">
              ⚠️
            </div>

            <p className="text-sm font-medium">
              {error}
            </p>

          </div>

        )}


        {/* ================= TABLE ================= */}

        <div className="bg-slate-50 rounded-2xl border border-blue-100 shadow-sm overflow-hidden">

          {/* Table Header */}

          <div className="px-6 md:px-7 py-5 border-b border-slate-200">

            <div className="flex items-center justify-between">

              <div>

                <h3 className="text-xl font-bold text-slate-900">
                  Lead Pipeline
                </h3>

                <p className="text-sm text-slate-500 mt-1">
                  All leads currently available in the CRM.
                </p>

              </div>

              <div className="hidden sm:block px-3 py-1.5 rounded-lg bg-blue-100 text-blue-700 text-sm font-semibold">
                {leads.length} Leads
              </div>

            </div>

          </div>


          {/* Loading */}

          {loading ? (

            <div className="p-12 text-center">

              <div className="w-9 h-9 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto">
              </div>

              <p className="text-slate-500 mt-4 text-sm">
                Loading leads...
              </p>

            </div>

          ) : leads.length === 0 ? (

            <div className="p-12 text-center">

              <div className="text-5xl mb-4">
                🎯
              </div>

              <h3 className="text-lg font-bold text-slate-700">
                No Leads Found
              </h3>

              <p className="text-sm text-slate-500 mt-1">
                Start by adding your first lead.
              </p>

              {role === "ADMIN" && (

                <button
                  onClick={openAddModal}
                  className="mt-5 px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold"
                >
                  + Add Lead
                </button>

              )}

            </div>

          ) : (

            <div className="overflow-x-auto">

              <table className="w-full">

                <thead className="bg-blue-50/70">

                  <tr>

                    <th className="text-left px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Lead
                    </th>

                    <th className="text-left px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Email
                    </th>

                    <th className="text-left px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Phone
                    </th>

                    <th className="text-left px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Source
                    </th>

                    <th className="text-left px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Status
                    </th>

                    <th className="text-left px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Assigned To
                    </th>

                  </tr>

                </thead>


                <tbody>

                  {leads.map((lead) => (

                    <tr
                      key={lead.id}
                      className="border-t border-slate-100 hover:bg-blue-50/60 transition"
                    >

                      {/* LEAD */}

                      <td className="px-6 py-4">

                        <div className="flex items-center gap-3">

                          <div className="w-10 h-10 rounded-full bg-linear-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center font-bold">

                            {lead.name
                              ?.charAt(0)
                              ?.toUpperCase()}

                          </div>

                          <div>

                            <p className="font-semibold text-slate-800">
                              {lead.name || "-"}
                            </p>

                            <p className="text-xs text-slate-400">
                              Lead #{lead.id}
                            </p>

                          </div>

                        </div>

                      </td>


                      {/* EMAIL */}

                      <td className="px-6 py-4 text-sm text-slate-600">
                        {lead.email || "-"}
                      </td>


                      {/* PHONE */}

                      <td className="px-6 py-4 text-sm text-slate-600">
                        {lead.phone || "-"}
                      </td>


                      {/* SOURCE */}

                      <td className="px-6 py-4">

                        <span className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-600 text-sm">
                          {lead.source || "-"}
                        </span>

                      </td>


                      {/* STATUS */}

                      <td className="px-6 py-4">

                        <div className="relative inline-block">

                          <select
                            value={lead.status}
                            onChange={(e) =>
                              updateStatus(
                                lead.id,
                                e.target.value
                              )
                            }
                            className={`appearance-none pl-8 pr-8 py-2 rounded-lg text-xs font-bold border cursor-pointer outline-none ${getStatusClass(
                              lead.status
                            )}`}
                          >

                            <option value="NEW">
                              NEW
                            </option>

                            <option value="CONTACTED">
                              CONTACTED
                            </option>

                            <option value="QUALIFIED">
                              QUALIFIED
                            </option>

                            <option value="WON">
                              WON
                            </option>

                            <option value="LOST">
                              LOST
                            </option>

                          </select>

                          <span
                            className={`absolute left-3 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full ${getStatusDot(
                              lead.status
                            )}`}
                          >
                          </span>

                        </div>

                      </td>


                      {/* ASSIGNED TO */}

                      <td className="px-6 py-4">

                        <span className="text-sm text-slate-600">
                          {lead.assignedTo || "-"}
                        </span>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          )}

        </div>

      </main>


      {/* ================= ADD LEAD MODAL ================= */}

      {showModal && (

        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">

          <div className="bg-slate-50 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden">

            {/* MODAL HEADER */}

            <div className="bg-linear-to-r from-blue-600 to-indigo-600 px-6 py-5 text-white flex justify-between items-center">

              <div>

                <h2 className="text-xl font-bold">
                  Add New Lead
                </h2>

                <p className="text-sm text-blue-100 mt-1">
                  Enter the lead details below.
                </p>

              </div>

              <button
                onClick={() => setShowModal(false)}
                className="w-9 h-9 rounded-lg bg-white/10 hover:bg-white/20 transition flex items-center justify-center text-lg"
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

                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter lead name"
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                />

              </div>


              {/* EMAIL + PHONE */}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <div>

                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                    Email
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter email"
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  />

                </div>


                <div>

                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                    Phone
                  </label>

                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="Enter phone"
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  />

                </div>

              </div>


              {/* SOURCE */}

              <div>

                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  Lead Source
                </label>

                <input
                  type="text"
                  name="source"
                  value={formData.source}
                  onChange={handleChange}
                  placeholder="Website, LinkedIn, Referral..."
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                />

              </div>


              {/* STATUS + ASSIGNED */}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <div>

                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                    Status
                  </label>

                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 transition"
                  >

                    <option value="NEW">NEW</option>
                    <option value="CONTACTED">CONTACTED</option>
                    <option value="QUALIFIED">QUALIFIED</option>
                    <option value="WON">WON</option>
                    <option value="LOST">LOST</option>

                  </select>

                </div>


                <div>

                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                    Assigned To
                  </label>

                  <input
                    type="number"
                    name="assignedTo"
                    value={formData.assignedTo}
                    onChange={handleChange}
                    placeholder="User ID"
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 transition"
                  />

                </div>

              </div>


              {/* BUTTONS */}

              <div className="flex justify-end gap-3 pt-4">

                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-5 py-3 rounded-xl border border-slate-200 bg-white text-slate-700 font-semibold hover:bg-slate-100 transition"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-3 rounded-xl bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold shadow-md transition disabled:opacity-60"
                >
                  {loading ? "Adding..." : "Add Lead"}
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  );
};

export default Lead;