import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Logout function
    const handleLogout = () => {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      localStorage.removeItem("expiryTime");

      navigate("/");
    };

    // Expiry time check karna
    const expiryTime = localStorage.getItem("expiryTime");

    if (expiryTime && Date.now() >= expiryTime) {
      handleLogout(); // Agar expiry ho chuka hai toh turant logout karo
    } else {
      // 1 hour ke baad automatic logout set karo
      const remainingTime = expiryTime - Date.now();
      setTimeout(handleLogout, remainingTime);
    }
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h2 className="text-2xl font-bold text-gray-800">Logging out...</h2>
      <p className="text-gray-600 mt-2">Redirecting to login page</p>
    </div>
  );
};

export default Logout;
