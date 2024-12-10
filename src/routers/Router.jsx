
import { createBrowserRouter } from "react-router-dom";
import ScrollToTop from "../hooks/ScrollToTop";
import HomeLayout from "../layouts/HomeLayout";
import HomeRoute from "./HomeRoute";
import Not_Found from "../pages/Not_Found";

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
            path: '*',
            element: (
                  <>
                        <ScrollToTop />
                        <Not_Found />
                  </>
            ),
      }
]);

export default Router;
