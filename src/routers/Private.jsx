import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { Kalbela_AuthProvider } from "../context/MainContext";

const Private = ({ children }) => {
  const { user, loading } = useContext(Kalbela_AuthProvider);
  const location = useLocation();

  if (loading) {
    return <p>Loading...</p>;
  }
  if (user?.email) {
    return children;
  }

  if (!user) {
    return <Navigate to="/registration" state={{ from: location }} replace />;
  }
};

export default Private;
