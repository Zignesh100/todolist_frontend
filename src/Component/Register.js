


import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [inputData, setInputData] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null); 

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/register`, inputData);
      setMessage({ text: "Registration Successful!", type: "success" });

      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      setMessage({ text: error.response?.data?.message || " Registration Failed!", type: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="max-w-xl py-6 px-8 mt-20 bg-white m-auto rounded shadow-md shadow-[#884dee]">
      <form onSubmit={handleSubmit}>
        <div className="h-20 flex justify-center text-2xl font-bold text-[#884dee] items-center">
          "Welcome! Let's get you started."
        </div>

        <div className="mb-4">
          <label htmlFor="fullname" className="block text-gray-600 font-bold">
            Full Name
          </label>
          <input
            type="text"
            name="fullname"
            value={inputData.fullname}
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
            value={inputData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="w-full border border-gray-300 py-2 pl-3 rounded mt-2 outline-none focus:ring-indigo-600"
            required
          />
        </div>

        <div className="mb-4 relative">
          <label htmlFor="password" className="block text-gray-600 font-bold">
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            onChange={handleChange}
            value={inputData.password}
            placeholder="Enter your password"
            className="w-full border border-gray-300 py-2 pl-3 pr-10 rounded mt-2 outline-none focus:ring-indigo-600"
            required
          />

          <span
            className="absolute top-[45px] right-4 cursor-pointer text-gray-600"
            onClick={handleTogglePassword}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <p className="mt-2 text-sm text-gray-600">
          Already have an account?
          <NavLink to="/" className="text-indigo-500 font-bold ml-1">
            Sign in
          </NavLink>
        </p>

        <button
          type="submit"
          className="cursor-pointer py-2 px-4  mt-6 bg-[#884dee] text-white font-bold w-full text-center rounded hover:bg-[#6b3bb8] transition duration-300 flex justify-center items-center"
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="animate-spin border-t-2 border-white border-solid rounded-full w-5 h-5 mr-2"></span>
          ) : null}
          {isLoading ? "Registering..." : "Register"}
        </button>

        {message && (
          <p
            className={`text-center mt-4 font-bold text-lg ${
              message.type === "success" ? "text-green-600" : "text-red-600"
            }`}
          >
            {message.text}
          </p>
        )}
      </form>
    </div>
  );
};

export default Register;
