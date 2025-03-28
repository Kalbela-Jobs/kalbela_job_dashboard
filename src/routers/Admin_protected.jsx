import Lottie from "lottie-react";
import { Kalbela_AuthProvider } from "../context/MainContext";
import groovyWalkAnimation from "./Loading.json";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";

const Admin_protected = ({ children }) => {
      const { user, loading } = useContext(Kalbela_AuthProvider)
      const location = useLocation()
      const navigate = useNavigate()

      if (loading) {
            return (
                  <>

                        <h1 className="grid h-screen px-4 bg-black place-content-center"> <Lottie animationData={groovyWalkAnimation} loop={true} /></h1>

                  </>
            )
      }
      if (user.role === 'workspace_admin' && !user.workspace?._id) {
            navigate('/create-workspace', { replace: true });
      }
      else {
            navigate("/admin", { replace: true });
      }

      if (!loading && user.role === 'workspace_admin' && !user.workspace?._id) {
            return children
      }

      console.log(user, "user");

      // return <Navigate to="/login" state={{ from: location }} replace></Navigate>
};

export default Admin_protected;
