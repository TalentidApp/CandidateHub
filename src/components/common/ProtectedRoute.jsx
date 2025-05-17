import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import  useAuthStore  from "../../constants/store";
import Loader from "./Loader";

const ProtectedRoute = () => {
  const { isAuthenticated, token, checkAuth } = useAuthStore();
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  useEffect(() => {
    const verifyAuth = async () => {
      if (isAuthenticated && token) {
        setIsAuthChecked(true);
        return;
      }
      const isValid = await checkAuth();
      setIsAuthChecked(true);
      if (!isValid) {
        console.log("Not authenticated, redirecting to login");
        localStorage.setItem("redirectAfterLogin", window.location.pathname);
        window.location.href = "/login"; 
      }
    };
    verifyAuth();
  }, [isAuthenticated, token, checkAuth]);

  if (!isAuthChecked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-purple-200 to-purple-300">
        <Loader />
      </div>
    );
  }

  return isAuthenticated && token ? <Outlet /> : null; 
};

export default ProtectedRoute;