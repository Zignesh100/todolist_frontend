import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const TokenExpiryChecker = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkExpiry = () => {
      const expiryTime = localStorage.getItem("expiryTime");
      if (expiryTime && Date.now() >= expiryTime) {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        localStorage.removeItem("expiryTime");
        navigate("/");
      }
    };

    // Har 1 minute me expiry check karega
    const interval = setInterval(checkExpiry, 60 * 1000);
    return () => clearInterval(interval);
  }, [navigate]);

  return null;
};

export default TokenExpiryChecker;
