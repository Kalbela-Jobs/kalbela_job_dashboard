
import { Outlet } from "react-router-dom";
import HomeNav from "../components/nav&sidenav/HomeNav";
import HomeFooter from "../components/footer/HomeFooter";

const HomeLayout = () => {
      return (
            <div>

                  <Outlet />

            </div>
      );
};

export default HomeLayout;
