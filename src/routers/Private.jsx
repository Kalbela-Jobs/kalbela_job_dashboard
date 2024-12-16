import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { Kalbela_AuthProvider } from "../context/MainContext";
import Lottie from "lottie-react";
import groovyWalkAnimation from "./Loading.json";

const Private = ({ children }) => {
      const { user, loading } = useContext(Kalbela_AuthProvider);
      const location = useLocation();

      if (!user && loading) {
            return <h1 className="grid h-screen px-4 bg-black place-content-center"> <Lottie animationData={groovyWalkAnimation} loop={true} /></h1>;
      }
      if (user?.email) {
            return children;
      }

      if (!user) {
            return <Navigate to="/sign-in" state={{ from: location }} replace />;
      }
};

export default Private;
