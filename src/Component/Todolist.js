

import axios from "axios";
import React, { useState } from "react";
import { baseUrl } from "../App";

const TaskModal = ({ closeModal, addTaskToList, setRefresh }) => {
  const [task, setTask] = useState({
    title: "",
    description: "",
    dueDate: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  // ✅ Reusable handleChange function
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await axios.post(
        `${baseUrl}/api/todos`,
        task,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setRefresh((prev) => !prev);
      setMessage("Task added successfully!");

      if (typeof addTaskToList === "function") {
        addTaskToList(response.data.task);
      }

      setTimeout(() => {
        setTask({ title: "", description: "", dueDate: "" });
        closeModal();
      }, 1000);
    } catch (error) {
      setMessage("Failed to add task.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center  z-[1000]">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Add New Task</h2>

        {message && <p className="mb-3 text-center font-semibold">{message}</p>}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Task Title"
            className="w-full border p-2 rounded mb-3"
            value={task.title}
            onChange={handleChange}
            required
          />

          <textarea
            name="description"
            placeholder="Task Description"
            className="w-full border p-2 rounded mb-3"
            value={task.description}
            onChange={handleChange}
            required
          />

          <input
            type="date"
            name="dueDate"
            className="w-full border p-2 rounded mb-3"
            value={task.dueDate}
            onChange={handleChange}
            required
          />

          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={closeModal}
              className="px-4 py-2 text-gray-700 rounded hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`px-4 py-2 text-white rounded ${
                loading ? "bg-gray-400 cursor-not-allowed" : "bg-[#884dee]"
              }`}
              disabled={loading}
            >
              {loading ? "Adding..." : "Add Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;
