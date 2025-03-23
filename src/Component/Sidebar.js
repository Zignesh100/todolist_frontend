



import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FiHome, FiUser, FiSettings, FiLogOut, FiMenu } from "react-icons/fi";
import { FaListUl } from "react-icons/fa";
import { LuClipboardList } from "react-icons/lu";
import usericon from "../logo/man.png"; // Adjust the path if needed

const Sidebar = ({ isOpen, toggleSidebar }) => {

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
 
  const userName = JSON.parse(localStorage.getItem("user"))?.name || "User"; 

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");  
    window.location.href = "/"; 
  };

  return (
    <div className={`fixed h-screen border shadow-md shadow-[#884dee] transition-all duration-300 ${isOpen ? "w-52" : "w-16"}`}>
      {/* Sidebar Header */}
      <div className="flex justify-between items-center p-4">
        <h2 className={`text-lg font-bold transition-all ${isOpen ? "block" : "hidden"}`}>
          <NavLink to="/layout/dashboard" className="text-[#6b3bb8]">
            TODOList
          </NavLink>
        </h2>
        <button onClick={toggleSidebar} className="p-2 rounded hover:bg-[#d1beee]">
          <FiMenu size={24} />
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="mt-4">
        <NavLink to="/layout/home" className="flex items-center px-4 py-2 hover:bg-[#d1beee] rounded">
          <LuClipboardList size={24} className="mr-2 text-[#6b3bb8]" />
          <p className="text-[#6b3bb8] font-bold">{isOpen && "List"}</p>
        </NavLink>




      
      </nav>




























      
    </div>
  );
};

export default Sidebar;
