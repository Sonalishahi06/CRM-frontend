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
    assignedTo: ""
  });

  const name = localStorage.getItem("name");
  const role=localStorage.getItem("role");

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


  // =========================
  // USE EFFECT
  // =========================

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
      [name]: value
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
      assignedTo: ""
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
          : null
      };

      await api.post("/leads", leadData);

      setShowModal(false);

      setFormData({
        name: "",
        email: "",
        phone: "",
        source: "",
        status: "NEW",
        assignedTo: ""
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

      await api.put(
        `/leads/${id}/status`,
        {
          status: status
        }
      );

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
        return "bg-blue-100 text-blue-700";

      case "CONTACTED":
        return "bg-yellow-100 text-yellow-700";

      case "QUALIFIED":
        return "bg-purple-100 text-purple-700";

      case "WON":
        return "bg-green-100 text-green-700";

      case "LOST":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";

    }

  };


  return (

    <div className="min-h-screen bg-gray-100">

      {/* ================= HEADER ================= */}

      <div className="bg-white shadow-sm px-8 py-4 flex justify-between items-center">

        <div>

          <h1 className="text-2xl font-bold text-gray-800">
            Smart CRM
          </h1>

          <p className="text-sm text-gray-500">
            Lead Management
          </p>

        </div>

        <div className="flex items-center gap-3">

          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center font-bold text-blue-600">
            {name?.charAt(0).toUpperCase()}
          </div>

          <span className="font-medium text-gray-700">
            {name}
          </span>

        </div>

      </div>


      {/* ================= MAIN ================= */}

      <div className="p-8">

        <div className="flex justify-between items-center mb-6">

          <div>

            <h2 className="text-3xl font-bold text-gray-800">
              Leads
            </h2>

            <p className="text-gray-500 mt-1">
              Manage all your leads
            </p>

          </div>
           
           {role=="ADMIN" &&(
             <button
            onClick={openAddModal}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg font-medium"
          >
            + Add Lead
          </button>
           )}
          

        </div>


        {/* ================= ERROR ================= */}

        {error && (

          <div className="bg-red-100 text-red-700 px-4 py-3 rounded-lg mb-5">
            {error}
          </div>

        )}


        {/* ================= TABLE ================= */}

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">

          {loading ? (

            <div className="p-10 text-center text-gray-500">
              Loading leads...
            </div>

          ) : leads.length === 0 ? (

            <div className="p-10 text-center">

              <div className="text-5xl mb-3">
                🎯
              </div>

              <h3 className="text-lg font-semibold text-gray-700">
                No Leads Found
              </h3>

              <p className="text-gray-500 mt-1">
                Add your first lead.
              </p>

            </div>

          ) : (

            <div className="overflow-x-auto">

              <table className="w-full">

                <thead className="bg-gray-50 border-b">

                  <tr>

                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                      Lead
                    </th>

                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                      Email
                    </th>

                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                      Phone
                    </th>

                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                      Source
                    </th>

                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                      Status
                    </th>

                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                      Assigned To
                    </th>

                  </tr>

                </thead>


                <tbody>

                  {leads.map((lead) => (

                    <tr
                      key={lead.id}
                      className="border-b hover:bg-gray-50"
                    >

                      {/* LEAD */}

                      <td className="px-6 py-4">

                        <div className="flex items-center gap-3">

                          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">

                            {lead.name
                              ?.charAt(0)
                              ?.toUpperCase()}

                          </div>

                          <div>

                            <p className="font-semibold text-gray-800">
                              {lead.name}
                            </p>

                            <p className="text-xs text-gray-400">
                              ID: #{lead.id}
                            </p>

                          </div>

                        </div>

                      </td>


                      {/* EMAIL */}

                      <td className="px-6 py-4 text-gray-600">
                        {lead.email || "-"}
                      </td>


                      {/* PHONE */}

                      <td className="px-6 py-4 text-gray-600">
                        {lead.phone}
                      </td>


                      {/* SOURCE */}

                      <td className="px-6 py-4 text-gray-600">
                        {lead.source || "-"}
                      </td>


                      {/* STATUS */}

                      <td className="px-6 py-4">

                        <select
                          value={lead.status}
                          onChange={(e) =>
                            updateStatus(
                              lead.id,
                              e.target.value
                            )
                          }
                          className={`px-3 py-2 rounded-lg text-sm font-semibold border-0 ${getStatusClass(lead.status)}`}
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

                      </td>


                      {/* ASSIGNED TO */}

                      <td className="px-6 py-4 text-gray-600">
                        {lead.assignedTo || "-"}
                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          )}

        </div>

      </div>


      {/* ================= ADD LEAD MODAL ================= */}

      {showModal && (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">

          <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl">

            {/* HEADER */}

            <div className="px-6 py-5 border-b flex justify-between items-center">

              <div>

                <h2 className="text-xl font-bold text-gray-800">
                  Add Lead
                </h2>

                <p className="text-sm text-gray-500">
                  Enter lead information
                </p>

              </div>

              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 text-xl"
              >
                X
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
                  placeholder="Enter lead name"
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
                  required
                  placeholder="Enter phone"
                  className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                />

              </div>


              {/* SOURCE */}

              <div>

                <label className="block text-sm font-medium mb-1">
                  Source
                </label>

                <input
                  type="text"
                  name="source"
                  value={formData.source}
                  onChange={handleChange}
                  placeholder="Website, LinkedIn, Referral..."
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

              </div>


              {/* ASSIGNED TO */}

              <div>

                <label className="block text-sm font-medium mb-1">
                  Assigned To
                </label>

                <input
                  type="number"
                  name="assignedTo"
                  value={formData.assignedTo}
                  onChange={handleChange}
                  placeholder="User ID"
                  className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                />

              </div>


              {/* BUTTONS */}

              <div className="flex justify-end gap-3 pt-4">

                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-5 py-3 border rounded-lg"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-5 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Add Lead
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