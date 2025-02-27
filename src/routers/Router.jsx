import { createBrowserRouter } from "react-router-dom";
import ScrollToTop from "../hooks/ScrollToTop";
import HomeLayout from "../layouts/HomeLayout";
import HomeRoute from "./HomeRoute";
import Not_Found from "../pages/Not_Found";
import AdminRouter from "./AdminRouter";
import DashboardLayout from "../layouts/DashboardLayout";
import Message_layout from "../layouts/Message_layout";
import Private from "./Private";
import Message from "../pages/dashboard/message/Message";

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
            path: "/admin/message",
            element: (
                  <>
                        <ScrollToTop />
                        <Message_layout />
                  </>
            ),
            children: [{
                  path: "",
                  element: <Private> <Message /></Private>,
            },]
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
