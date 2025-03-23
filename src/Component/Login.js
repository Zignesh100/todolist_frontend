import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { baseUrl } from "../App";

const Login = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("error"); 
  const [loading, setLoading] = useState(false);
  const [inputData, setInputData] = useState({
    email: "",
    password: "",
  });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({ email: "", password: "" });
    if (!validateForm()) return;
    setLoading(true);

    try {
      const response = await axios.post(
        `${baseUrl}/api/login`,
        inputData
      );

      const { token, user } = response.data;

      if (token && user) {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        console.log("Token Saved:", token);
      }

      setMessage("Login Successful");
      setMessageType("success");

      setTimeout(() => {
        navigate("/layout/home");
      }, 2000);
    } catch (error) {
      setMessage(error.response?.data?.message || "Login Failed");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let valid = true;
    let newErrors = { email: "", password: "" };

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!inputData.email || !emailPattern.test(inputData.email)) {
      newErrors.email = "Please enter a valid email address.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  return (
    <div className="max-w-xl py-6 px-8 mt-28 bg-white m-auto rounded shadow-md">
      <form onSubmit={handleSubmit}>
        <div className="h-20 flex justify-center text-2xl font-bold text-[#884dee] items-center">
          Welcome Back! Please log in to continue.
        </div>

        <div className="mb-6">
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
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
        </div>

        <div>
          <label htmlFor="password" className="block text-gray-600 font-bold">
            Password
          </label>
          <div className="relative">
            <input
              type={passwordVisible ? "text" : "password"}
              name="password"
              value={inputData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full border border-gray-300 py-2 pl-3 rounded mt-2 outline-none focus:ring-indigo-600"
              required
            />
            <div
              className="absolute right-3 top-5 text-gray-600 text-xl cursor-pointer"
              onClick={togglePasswordVisibility}
            >
              {passwordVisible ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password}</p>
          )}
        </div>

        {message && (
          <div
            className={`my-2 text-sm font-semibold text-center ${
              messageType === "success" ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </div>
        )}

        <p className="mt-2 text-sm text-gray-600">
          Don’t have an account?
          <NavLink to="/signup" className="text-indigo-500 font-bold ml-1">
            Sign up
          </NavLink>
        </p>

        <button
          type="submit"
          className="cursor-pointer py-2 px-4  mt-6 bg-[#884dee] text-white font-bold w-full text-center rounded hover:bg-[#6b3bb8] transition duration-300 flex justify-center items-center"
          disabled={loading}
        >


{loading ? (
            <span className="animate-spin border-t-2 border-white border-solid rounded-full w-5 h-5 mr-2"></span>
          ) : null}
        
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
