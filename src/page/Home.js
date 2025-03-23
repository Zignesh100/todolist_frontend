import React, { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "../Component/Pagination";
import { CiEdit } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";
import DeleteModal from "../Component/DeleteModal";
const Home = ({refresh}) => {
  const [message, setMessage] = useState();
  const [tasks, setTasks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [tasksPerPage] = useState(5);
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
    try {
      const response = await axios.get("https://todolist-67oy.onrender.com/api/todos", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(response.data.tasks);
    } catch (error) {
      console.error("Error fetching tasks:", error.response?.data || error);
    }
  };
  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://todolist-67oy.onrender.com/api/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
     
      fetchTasks(); 
    } catch (error) {
      console.error("Error deleting task:", error.response?.data || error);
    }
  };

  // Handle Edit Task
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


  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `https://todolist-67oy.onrender.com/api/tasks/${editingTask}`,
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
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">📝 My Tasks</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 shadow-lg rounded-lg">
          <thead>
            <tr className="bg-gray-200 text-gray-700 uppercase text-sm">
              <th className="py-3 px-4 border">Title</th>
              <th className="py-3 px-4 border">Description</th>
              <th className="py-3 px-4 border">Due Date</th>

              <th className="py-3 px-4 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentTasks.length > 0 ? (
              currentTasks.map((task) => (
                <tr key={task._id} className="text-center hover:bg-gray-100">
                  <td className="py-3 px-4 border">{task.title}</td>
                  <td className="py-3 px-4 border">{task.description}</td>
                  <td className="py-3 px-4 border">
                    {new Date(task.dueDate).toLocaleDateString()}
                  </td>

                  <td className="py-3 px-4 border">
                    <button
                      className="px-2 text-green-600 py-1 mr-2"
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
                <td colSpan="5" className="py-4 px-4 text-center text-gray-500">
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
            {message && <p className="mb-3 text-center font-semibold">{message}</p>}

            <form onSubmit={handleUpdate}>
              <input
                type="text"
                className="w-full border p-2 rounded mb-3"
                placeholder="Task Title"
                value={editForm.title}
                onChange={(e) =>
                  setEditForm({ ...editForm, title: e.target.value })
                }
                required
              />

              <textarea
                className="w-full border p-2 rounded mb-3"
                placeholder="Task Description"
                value={editForm.description}
                onChange={(e) =>
                  setEditForm({ ...editForm, description: e.target.value })
                }
                required
              />

              <input
                type="date"
                className="w-full border p-2 rounded mb-3"
                value={editForm.dueDate}
                onChange={(e) =>
                  setEditForm({ ...editForm, dueDate: e.target.value })
                }
                required
              />

              <div className="flex justify-between mt-4">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded"
                  onClick={() => setEditingTask(null)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded"
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
