import Login from "../pages/auth/login/Login";
import WorkSpace from "../pages/auth/registration/Workspace";
import Dashboard from "../pages/dashboard/Dashboard";


const HomeRoute = [
      {
            path: "/",
            element: <Dashboard />,
      },
      {
            path: "/registration",
            element: <WorkSpace />,
      },
      {
            path: "/login",
            element: <Login />,
      }
];

export default HomeRoute;
