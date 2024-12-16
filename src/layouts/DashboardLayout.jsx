import { Outlet } from "react-router-dom";
import Header from "../components/nav&sidenav/Header";
import Sidebar from "../components/nav&sidenav/Sidebar";
import MyContext from "../context/Dashboard_context";
import { useContext } from "react";

const DashboardLayout = () => {
      const { open } = useContext(MyContext);
      return (
            <div className="flex">
                  <Sidebar />
                  <div className={`flex-1 flex flex-col lg:ml-64 md:ml-0`}>
                        <Header />
                        <div >
                              <Outlet />
                        </div>
                  </div>
            </div>
      );
};

export default DashboardLayout;
