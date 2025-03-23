import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const DashboardLayout = ({ setRefresh }) => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="flex h-screen ">
      <Sidebar isOpen={isOpen} toggleSidebar={() => setIsOpen(!isOpen)} />

      <div
        className={`flex-1 transition-all duration-300 ${
          isOpen ? "ml-52" : "ml-16"
        }`}
      >
        <Navbar isOpen={isOpen} setRefresh={setRefresh} />

        <div className="p-6 pt-20">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
