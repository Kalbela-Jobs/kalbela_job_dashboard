import Login from "../pages/auth/login/Login";
import Registration from "../pages/auth/registration/Registration";
import VerifyOTP from "../pages/auth/registration/Verify_OTP";
import WorkspaceAccount from "../pages/auth/registration/Workspace";

import Dashboard from "../pages/dashboard/Dashboard";

const HomeRoute = [
      {
            path: "/",
            element: <Dashboard />,
      },
      {
            path: "/sign-up",
            element: <Registration />,
      },
      {
            path: "/sign-in",
            element: <Login />,
      },
      {
            path: "/create-workspace",
            element: <WorkspaceAccount />,
      },
      {
            path: "/verify_otp",
            element: <VerifyOTP />,
      }
];

export default HomeRoute;
