import { Outlet } from "react-router-dom";
import Header from "../components/nav&sidenav/Header";
import Sidebar from "../components/nav&sidenav/Sidebar";

const DashboardLayout = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
