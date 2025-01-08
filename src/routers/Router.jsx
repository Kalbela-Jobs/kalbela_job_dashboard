import { createBrowserRouter } from "react-router-dom";
import ScrollToTop from "../hooks/ScrollToTop";
import HomeLayout from "../layouts/HomeLayout";
import HomeRoute from "./HomeRoute";
import Not_Found from "../pages/Not_Found";
import AdminRouter from "./AdminRouter";
import DashboardLayout from "../layouts/DashboardLayout";

const Router = createBrowserRouter([
      {
            path: "/",
            element: (
                  <>
                        <ScrollToTop />
                        <HomeLayout />
                  </>
            ),
            children: HomeRoute,
      },
      {
            path: "/admin",
            element: (
                  <>
                        <ScrollToTop />
                        <DashboardLayout />
                  </>
            ),
            children: AdminRouter,
      },

      {
            path: "*",
            element: (
                  <>
                        <ScrollToTop />
                        <Not_Found />
                  </>
            ),
      },
]);

export default Router;
