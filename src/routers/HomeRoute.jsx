import Login from "../pages/auth/login/Login";
import Registration from "../pages/auth/registration/Registration";
import VerifyOTP from "../pages/auth/registration/Verify_OTP";
import WorkspaceAccount from "../pages/auth/registration/Workspace";
import About from "../pages/home/pages/about/About";
import Features from "../pages/home/pages/components/ui/Features/Features";
import Pricing from "../pages/home/pages/components/ui/Pricing/Pricing";

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
      },
      {
            path: 'pricing',
            element: <Pricing />
      },
      {
            path: 'features',
            element: <Features />
      }
];

export default HomeRoute;
