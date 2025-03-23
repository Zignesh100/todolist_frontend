// src/pages/Dashboard.js
import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user, logout } = useAuth();
  console.log('Dashboard rendered. User:', user);
  const [userName, setUserName] = useState(""); 
  const userData = localStorage.getItem("user");

  
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
    <div>
      <h1  className='text-3xl text-[#884dee]    font-bold'>Welcome,</h1><span className="text-gray-900 font-semibold">{userName|| "User"}</span> <p className='text-[#884dee] '>  Manage your to-do</p>
      
    </div>
  );
};

export default Dashboard;
