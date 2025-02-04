
import { Outlet } from "react-router-dom";
import HomeNav from "../components/nav&sidenav/HomeNav";
import Navbar from "../pages/home/pages/components/ui/Navbar/Navbar";
import Footer from "../pages/home/pages/components/ui/Footer/Footer";


const HomeLayout = () => {
      return (
            <div className="bg-gray-900">
                  <Navbar />
                  <Outlet />
                  <Footer />

            </div>
      );
};

export default HomeLayout;
