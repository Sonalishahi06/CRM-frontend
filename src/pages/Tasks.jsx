import React, { useEffect, useState } from "react";
import api from "../services/api";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [formError, setFormError] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    assignedTo: "",
    status: "PENDING",
  });

  const name = localStorage.getItem("name");
  const role = localStorage.getItem("role");

  // =========================
  // GET ALL TASKS
  // =========================

  const getTasks = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/tasks");

      console.log("TASKS:", response.data);

      setTasks(response.data);
    } catch (error) {
      console.log("Task Error:", error);
      setError("Unable to load tasks.");
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // USE EFFECT
  // =========================

  useEffect(() => {
    getTasks();
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
    setFormError("");

    setFormData({
      title: "",
      description: "",
      assignedTo: "",
      status: "PENDING",
    });

    setShowModal(true);
  };

  // =========================
  // CREATE TASK
  // =========================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setFormError("");

      const taskData = {
        title: formData.title,
        description: formData.description,
        assignedTo: Number(formData.assignedTo),
        status: formData.status,
      };

      await api.post("/tasks", taskData);

      setShowModal(false);

      setFormData({
        title: "",
        description: "",
        assignedTo: "",
        status: "PENDING",
      });

      getTasks();
    } catch (error) {
      console.log("Create Task Error:", error);

      setFormError(
        error.response?.data?.message || "Unable to create task."
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // UPDATE TASK STATUS
  // =========================

  const updateStatus = async (id, status) => {
    try {
      setError("");

      await api.put(`/tasks/${id}/status`, {
        status: status,
      });

      getTasks();
    } catch (error) {
      console.log("Task Status Error:", error);
      setError("Unable to update task status.");
    }
  };

  // =========================
  // STATUS STYLE
  // =========================

  const getStatusClass = (status) => {
    switch (status) {
      case "PENDING":
        return "bg-amber-50 text-amber-700 border-amber-200";

      case "IN_PROGRESS":
        return "bg-blue-50 text-blue-700 border-blue-200";

      case "COMPLETED":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";

      default:
        return "bg-slate-50 text-slate-700 border-slate-200";
    }
  };

  const getStatusDot = (status) => {
    switch (status) {
      case "PENDING":
        return "bg-amber-500";

      case "IN_PROGRESS":
        return "bg-blue-500";

      case "COMPLETED":
        return "bg-emerald-500";

      default:
        return "bg-slate-500";
    }
  };

  // =========================
  // TASK STATS
  // =========================

  const pendingTasks = tasks.filter(
    (task) => task.status === "PENDING"
  ).length;

  const inProgressTasks = tasks.filter(
    (task) => task.status === "IN_PROGRESS"
  ).length;

  const completedTasks = tasks.filter(
    (task) => task.status === "COMPLETED"
  ).length;

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-100 via-blue-50 to-indigo-100">

      {/* ================= HEADER ================= */}

      <div className="bg-slate-950 text-white px-6 md:px-10 py-4 flex justify-between items-center shadow-lg">

        <div className="flex items-center gap-3">

          <div className="w-11 h-11 rounded-xl bg-linear-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-lg font-bold shadow-lg">
            C
          </div>

          <div>
            <h1 className="text-xl font-bold">
              Smart CRM
            </h1>

            <p className="text-xs text-slate-400">
              Task Management
            </p>
          </div>

        </div>

        <div className="flex items-center gap-3">

          <div className="hidden sm:block text-right">

            <p className="text-sm font-semibold text-white">
              {name}
            </p>

            <p className="text-xs text-slate-400">
              {role || "User"}
            </p>

          </div>

          <div className="w-10 h-10 rounded-full bg-linear-to-br from-blue-500 to-indigo-600 flex items-center justify-center font-bold shadow-md">
            {name?.charAt(0).toUpperCase()}
          </div>

        </div>

      </div>


      {/* ================= MAIN ================= */}

      <div className="p-5 md:p-8 max-w-7xl mx-auto">

        {/* PAGE HEADER */}

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-7">

          <div>

            <p className="text-xs font-bold tracking-[0.2em] text-blue-600 uppercase mb-2">
              Task Management
            </p>

            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
              Tasks
            </h2>

            <p className="text-slate-500 mt-1">
              Create, track and manage your team's tasks.
            </p>

          </div>

          <button
            onClick={openAddModal}
            className="w-full sm:w-auto bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg shadow-blue-200 transition-all duration-200 hover:-translate-y-0.5"
          >
            + Add Task
          </button>

        </div>


        {/* ================= STATS ================= */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-7">

          {/* TOTAL */}

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition">

            <div className="flex justify-between items-center">

              <div>

                <p className="text-sm font-medium text-slate-500">
                  Total Tasks
                </p>

                <h3 className="text-3xl font-bold text-slate-900 mt-2">
                  {tasks.length}
                </h3>

              </div>

              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-2xl">
                📋
              </div>

            </div>

          </div>


          {/* PENDING */}

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition">

            <div className="flex justify-between items-center">

              <div>

                <p className="text-sm font-medium text-slate-500">
                  Pending
                </p>

                <h3 className="text-3xl font-bold text-amber-600 mt-2">
                  {pendingTasks}
                </h3>

              </div>

              <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center text-2xl">
                ⏳
              </div>

            </div>

          </div>


          {/* IN PROGRESS */}

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition">

            <div className="flex justify-between items-center">

              <div>

                <p className="text-sm font-medium text-slate-500">
                  In Progress
                </p>

                <h3 className="text-3xl font-bold text-blue-600 mt-2">
                  {inProgressTasks}
                </h3>

              </div>

              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-2xl">
                🔄
              </div>

            </div>

          </div>


          {/* COMPLETED */}

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition">

            <div className="flex justify-between items-center">

              <div>

                <p className="text-sm font-medium text-slate-500">
                  Completed
                </p>

                <h3 className="text-3xl font-bold text-emerald-600 mt-2">
                  {completedTasks}
                </h3>

              </div>

              <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center text-2xl">
                ✓
              </div>

            </div>

          </div>

        </div>


        {/* ================= PAGE ERROR ================= */}

        {error && (

          <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">

            <div className="flex items-center gap-2">

              <span className="text-lg">
                ⚠️
              </span>

              <span>
                {error}
              </span>

            </div>

          </div>

        )}


        {/* ================= TABLE ================= */}

        <div className="bg-slate-50 border border-slate-200 rounded-2xl shadow-lg overflow-hidden">

          <div className="px-6 py-5 border-b border-slate-200 flex justify-between items-center">

            <div>

              <h3 className="text-lg font-bold text-slate-900">
                All Tasks
              </h3>

              <p className="text-sm text-slate-500 mt-1">
                Track task progress and assignments
              </p>

            </div>

            <div className="px-3 py-1.5 rounded-full bg-blue-100 text-blue-700 text-xs font-bold">
              {tasks.length} Tasks
            </div>

          </div>


          {loading ? (

            <div className="p-16 text-center">

              <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>

              <p className="text-slate-500 font-medium">
                Loading tasks...
              </p>

            </div>

          ) : tasks.length === 0 ? (

            <div className="p-16 text-center">

              <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center text-3xl mx-auto mb-4">
                📋
              </div>

              <h3 className="text-lg font-bold text-slate-800">
                No Tasks Found
              </h3>

              <p className="text-slate-500 mt-1 mb-5">
                Start by creating your first task.
              </p>

              <button
                onClick={openAddModal}
                className="bg-linear-to-r from-blue-600 to-indigo-600 text-white px-5 py-2.5 rounded-xl font-semibold"
              >
                + Add Task
              </button>

            </div>

          ) : (

            <div className="overflow-x-auto">

              <table className="w-full">

                <thead className="bg-blue-50/70 border-b border-slate-200">

                  <tr>

                    <th className="text-left px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                      Task
                    </th>

                    <th className="text-left px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                      Description
                    </th>

                    <th className="text-left px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                      Assigned To
                    </th>

                    <th className="text-left px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                      Status
                    </th>

                    <th className="text-left px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                      Created At
                    </th>

                  </tr>

                </thead>


                <tbody>

                  {tasks.map((task) => (

                    <tr
                      key={task.id}
                      className="border-b border-slate-100 last:border-b-0 hover:bg-blue-50/40 transition"
                    >

                      {/* TASK */}

                      <td className="px-6 py-4">

                        <div className="flex items-center gap-3">

                          <div className="w-10 h-10 rounded-xl bg-linear-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center font-bold shadow-sm">
                            {task.title?.charAt(0).toUpperCase()}
                          </div>

                          <div>

                            <p className="font-semibold text-slate-800">
                              {task.title}
                            </p>

                            <p className="text-xs text-slate-400 mt-0.5">
                              ID: #{task.id}
                            </p>

                          </div>

                        </div>

                      </td>


                      {/* DESCRIPTION */}

                      <td className="px-6 py-4 max-w-xs">

                        <p className="text-sm text-slate-600 truncate">
                          {task.description || "-"}
                        </p>

                      </td>


                      {/* ASSIGNED TO */}

                      <td className="px-6 py-4">

                        {task.assignedTo ? (

                          <div className="flex items-center gap-2">

                            <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-bold">
                              {String(task.assignedTo).charAt(0)}
                            </div>

                            <span className="text-sm font-medium text-slate-700">
                              User #{task.assignedTo}
                            </span>

                          </div>

                        ) : (

                          <span className="text-slate-400">
                            -
                          </span>

                        )}

                      </td>


                      {/* STATUS */}

                      <td className="px-6 py-4">

                        <div className="relative inline-block">

                          <select
                            value={task.status}
                            onChange={(e) =>
                              updateStatus(
                                task.id,
                                e.target.value
                              )
                            }
                            className={`appearance-none pl-8 pr-9 py-2 rounded-xl text-xs font-bold border cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-300 ${getStatusClass(task.status)}`}
                          >

                            <option value="PENDING">
                              PENDING
                            </option>

                            <option value="IN_PROGRESS">
                              IN PROGRESS
                            </option>

                            <option value="COMPLETED">
                              COMPLETED
                            </option>

                          </select>

                          <span
                            className={`absolute left-3 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full pointer-events-none ${getStatusDot(task.status)}`}
                          ></span>

                          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs pointer-events-none">
                            ▾
                          </span>

                        </div>

                      </td>


                      {/* CREATED AT */}

                      <td className="px-6 py-4">

                        <span className="text-sm text-slate-600 whitespace-nowrap">
                          {task.createdAt
                            ? new Date(task.createdAt).toLocaleString()
                            : "-"}
                        </span>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          )}

        </div>

      </div>


      {/* ================= ADD TASK MODAL ================= */}

      {showModal && (

        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">

          <div className="bg-slate-50 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden">

            {/* MODAL HEADER */}

            <div className="bg-linear-to-r from-blue-600 to-indigo-600 px-6 py-5 text-white flex justify-between items-center">

              <div>

                <h2 className="text-xl font-bold">
                  Add New Task
                </h2>

                <p className="text-sm text-blue-100 mt-1">
                  Create and assign a new task
                </p>

              </div>

              <button
                type="button"
                onClick={() => {
                  setShowModal(false);
                  setFormError("");
                }}
                className="w-9 h-9 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center text-lg transition"
              >
                ✕
              </button>

            </div>


            {/* FORM */}

            <form
              onSubmit={handleSubmit}
              className="p-6 space-y-5"
            >

              {/* FORM ERROR */}

              {formError && (

                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">

                  <div className="flex items-start gap-2">

                    <span className="text-lg">
                      ⚠️
                    </span>

                    <span>
                      {formError}
                    </span>

                  </div>

                </div>

              )}


              {/* TITLE */}

              <div>

                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Task Title
                </label>

                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  placeholder="e.g. Follow up with customer"
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                />

              </div>


              {/* DESCRIPTION */}

              <div>

                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Description
                </label>

                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Enter task details..."
                  rows="3"
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none transition"
                />

              </div>


              {/* ASSIGNED + STATUS */}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                <div>

                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Assigned To
                  </label>

                  <input
                    type="number"
                    name="assignedTo"
                    value={formData.assignedTo}
                    onChange={handleChange}
                    required
                    placeholder="User ID"
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  />

                </div>


                <div>

                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Status
                  </label>

                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  >

                    <option value="PENDING">
                      PENDING
                    </option>

                    <option value="IN_PROGRESS">
                      IN PROGRESS
                    </option>

                    <option value="COMPLETED">
                      COMPLETED
                    </option>

                  </select>

                </div>

              </div>


              {/* BUTTONS */}

              <div className="flex justify-end gap-3 pt-2">

                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setFormError("");
                  }}
                  className="px-5 py-3 rounded-xl border border-slate-200 bg-white text-slate-700 font-semibold hover:bg-slate-100 transition"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-3 rounded-xl bg-linear-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-md hover:from-blue-700 hover:to-indigo-700 disabled:opacity-60 transition"
                >

                  {loading ? "Adding..." : "Add Task"}

                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  );
};

export default Tasks;