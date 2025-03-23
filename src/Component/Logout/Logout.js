import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    setTimeout(() => {
      navigate("/");
    }, 2000);
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h2 className="text-2xl font-bold text-gray-800">Logging out...</h2>
      <p className="text-gray-600 mt-2">Redirecting to login page</p>
    </div>
  );
};

export default Logout;
