import Login from "../pages/auth/login/Login";
import Registration from "../pages/auth/registration/Registration";
import VerifyOTP from "../pages/auth/registration/Verify_OTP";
import WorkspaceAccount from "../pages/auth/registration/Workspace";

import Home from "../pages/home/pages/home/Home";

const HomeRoute = [
      {
            path: "/",
            element: <Home />,
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
