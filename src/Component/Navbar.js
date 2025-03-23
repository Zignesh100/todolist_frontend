import React, { useEffect, useState } from "react";
import { FiUser, FiLogOut } from "react-icons/fi";
import TaskModal from "../Component/Todolist";
import { useNavigate } from "react-router-dom";
import usericon from "../logo/man.png";
const Navbar = ({ isOpen, setRefresh }) => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/logout");
  };

  useEffect(() => {
    const userData = localStorage.getItem("user");

    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUserName(parsedUser.fullname);

      console.log("ParsedUseData:", parsedUser);
    } else {
      console.log("No user data found in localStorage.");
    }
  }, []);

  return (
    <>
      <div
        className={`fixed top-0 left-0 h-16  shadow-md flex items-center px-6 transition-all duration-300 
          ${
            isOpen ? "w-[calc(100%-13rem)] ml-52" : "w-[calc(100%-4rem)] ml-16"
          }`}
      >
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center font-bold text-[#884dee] px-3 py-1 rounded border border-[#884dee]"
        >
          New Task +
        </button>
        <div className="ml-auto flex items-center space-x-4">
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center space-x-3 cursor-pointer"
            >
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-900">
                <img
                  src={usericon}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-gray-900 font-semibold">
                {userName || "User"}
              </span>
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-3 w-60 px-5 py-3 bg-white rounded-lg shadow-md border">
                <ul className="space-y-3 text-gray-900">
                  <li>
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-3 text-red-600 hover:text-red-800"
                    >
                      <FiLogOut size={20} />
                      <span>Logout</span>
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {isModalOpen && (
        <TaskModal
          setRefresh={setRefresh}
          closeModal={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
};

export default Navbar;
