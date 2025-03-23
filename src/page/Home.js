import React, { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "../Component/Pagination";
import { CiEdit } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";
import DeleteModal from "../Component/DeleteModal";

const Home = ({ refresh }) => {
  const [message, setMessage] = useState();
  const [tasks, setTasks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [tasksPerPage] = useState(5);
  const [loading, setLoading] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [editForm, setEditForm] = useState({
    title: "",
    description: "",
    dueDate: "",
  });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchTasks();
  }, [refresh]);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/todos`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTasks(response.data.tasks);
    } catch (error) {
      console.error("Error fetching tasks:", error.response?.data || error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error.response?.data || error);
    }
  };

  const handleEdit = (task) => {
    setEditingTask(task._id);
    setEditForm({
      title: task.title,
      description: task.description,
      dueDate: task.dueDate.split("T")[0],
    });
  };

  const openDeleteModal = (taskId) => {
    setTaskToDelete(taskId);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/api/tasks/${editingTask}`,
        editForm,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setTasks(
        tasks.map((task) =>
          task._id === editingTask ? response.data.task : task
        )
      );
      setEditingTask(null);
    } catch (error) {
      console.error("Error updating task:", error.response?.data || error);
    }
  };

  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);

  return (
    <div className="p-4 ">
      <h2 className="text-2xl font-bold mb-4">📝 My Tasks</h2>

        <div className="w-full  bg-white max-w-5xl overflow-x-auto">
        <table className="table-auto w-full bg-white border border-gray-300 shadow-lg rounded-lg">
          <thead>
            <tr className="bg-gray-200 text-gray-700 uppercase text-sm text-left">
              <th className="py-3 px-4 border w-1/4">Title</th>
              <th className="py-3 px-4 border w-2/4">Description</th>
              <th className="py-3 px-4 border w-1/4">Due Date</th>
              <th className="py-3 px-4 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="4" className="py-4 text-center text-gray-600">
                  Loading tasks...
                </td>
              </tr>
            ) : currentTasks.length > 0 ? (
              currentTasks.map((task) => (
                <tr key={task._id} className="hover:bg-gray-100">
                  <td className="py-3 px-4 border break-words">{task.title}</td>
                  <td className="py-3 px-4 border break-words relative group">
                    <span className="truncate block w-48">
                      {task.description ? task.description.substring(0, 40) + "..." : ""}
                    </span>
                    {task.description && (
                      <span className="absolute left-0 top-8 hidden w-[500px] bg-gray-800 text-white text-xs rounded-md px-2 py-1 group-hover:block z-10">
                        {task.description}
                      </span>
                    )}
                  </td>

                  <td className="py-3 px-4 border">
                    {new Date(task.dueDate).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4 border flex gap-2">
                    <button
                      className="px-2 text-green-600 py-1"
                      onClick={() => handleEdit(task)}
                    >
                      <CiEdit size={22} />
                    </button>
                    <button
                      className="px-2 py-1 text-red-600"
                      onClick={() => openDeleteModal(task._id)}
                    >
                      <MdDeleteForever size={22} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="py-4 text-center text-gray-500">
                  No tasks found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Pagination
        tasksPerPage={tasksPerPage}
        totalTasks={tasks.length}
        paginate={setCurrentPage}
        currentPage={currentPage}
      />

      {editingTask && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Edit Task</h2>
            {message && (
              <p className="mb-3 text-center font-semibold">{message}</p>
            )}

            <form onSubmit={handleUpdate}>
              <input
                type="text"
                name="title"
                className="w-full border p-2 rounded mb-3"
                placeholder="Task Title"
                value={editForm.title}
                onChange={handleChange}
                required
              />

              <textarea
                name="description"
                className="w-full border p-2 rounded mb-3"
                placeholder="Task Description"
                value={editForm.description}
                onChange={handleChange}
                required
              />

              <input
                type="date"
                name="dueDate"
                className="w-full border p-2 rounded mb-3"
                value={editForm.dueDate}
                onChange={handleChange}
                required
              />

              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  className="px-4 py-2 hover:bg-gray-100 text-gray-700 rounded"
                  onClick={() => setEditingTask(null)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#884dee] text-white rounded"
                >
                  Update Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <DeleteModal
        isOpen={showDeleteModal}
        onClose={closeDeleteModal}
        onDelete={() => handleDelete(taskToDelete)}
      />
    </div>
  );
};

export default Home;
