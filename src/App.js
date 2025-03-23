import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Component/Login";
import Register from "./Component/Register";
import DashboardLayout from "./Component/DashboardLayout";
import Home from "./page/Home";
import Dashboard from "./Component/Dashboard";
import Logout from "./Component/Logout/Logout";
import PrivateRoute from "./PrivateRoute"; 
import { useState } from "react";
export const baseUrl = "https://todolist-67oy.onrender.com"

function App() {
  const isAuthenticated = localStorage.getItem("token") || false;
  const [refresh,setRefresh] = useState(false)

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/logout" element={<Logout />} />

        
        <Route element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
          <Route path="/layout" element={<DashboardLayout setRefresh={setRefresh}/>}>
            <Route path="home" element={<Home refresh={refresh} />} />
            <Route path="dashboard" element={<Dashboard name={"userName"} />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
