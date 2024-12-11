import { Outlet } from "react-router-dom";
import Header from "../components/nav&sidenav/Header";
import Sidebar from "../components/nav&sidenav/Sidebar";

const DashboardLayout = () => {
  // const [openDropdown, setOpenDropdown] = useState(null);
  return (
    <div>
      <div
        className="flex flex-col min-h-screen"
        //   onClick={() => setOpenDropdown(null)}
      >
        <Header />
        <div className="flex flex-1">
          <Sidebar />
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
