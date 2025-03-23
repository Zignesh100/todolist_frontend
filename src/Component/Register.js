import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const [message, setmessage] = useState();
  const [inputdata, setinputdata] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault(); 
  
    try {
      const response = await axios.post(
        "https://todolist-67oy.onrender.com/api/register",
        inputdata
      );
      setmessage("Register Successful ");
  
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      setmessage(error.response?.data?.message || "Registration Failed ");
    }
  };
  
  const handleChange = (e) => {
    setinputdata({ ...inputdata, [e.target.name]: e.target.value });
  };
  return (
    <div className="max-w-xl py-6 px-8 mt-20 bg-white m-auto rounded shadow-md shadow-[#884dee]">
      <form onSubmit={handleSubmit}>
        <div className="h-20 flex justify-center text-2xl font-bold text-[#884dee]  items-center">
        "Welcome! Let's get you started."

        </div>

        <div className="mb-4">
          <label htmlFor="fullname" className="block text-gray-600 font-bold">
            Full Name
          </label>
          <input
            type="text"
            name="fullname"
            value={inputdata.fullname}
            onChange={handleChange}
            placeholder="Enter your full name"
            className="w-full border border-gray-300 py-2 pl-3 rounded mt-2 outline-none focus:ring-indigo-600"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-600 font-bold">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={inputdata.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="w-full border border-gray-300 py-2 pl-3 rounded mt-2 outline-none focus:ring-indigo-600"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-600 font-bold">
            Password
          </label>
          <input
            type="password"
            name="password"
            onChange={handleChange}
            value={inputdata.password}
            placeholder="Enter your password"
            className="w-full border border-gray-300 py-2 pl-3 rounded mt-2 outline-none focus:ring-indigo-600"
            required
          />
        </div>

        <p className="mt-2 text-sm text-gray-600">
          Already have an account?
          <NavLink to="/" className="text-indigo-500 font-bold ml-1">
            Sign in
          </NavLink>
        </p>

        <button
          type="submit"
          className="cursor-pointer py-2 px-4 block mt-6 bg-[#884dee] text-white font-bold w-full text-center rounded hover:bg-[#6b3bb8] transition duration-300"
        >
          Register
        </button>

        {message && (
          <p className="text-center mt-4 font-bold text-lg">{message}</p>
        )}
      </form>
    </div>
  );
};

export default Register;
