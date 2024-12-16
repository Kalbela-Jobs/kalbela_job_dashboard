import Add_Category from "../pages/dashboard/category/add/Add_Category";
import Category from "../pages/dashboard/category/Category";
import Dashboard from "../pages/dashboard/Dashboard";
import Add_Jobs from "../pages/dashboard/Jobs/Add_Jobs";
import Job from "../pages/dashboard/Jobs/Job";

import Private from "./Private";

const AdminRouter = [
      {
            path: "",
            element: (
                  <Private>
                        <Dashboard />
                  </Private>
            ),
      },
      {
            path: "dashboard",
            element: (
                  <Private>
                        <Dashboard />
                  </Private>
            ),
      },
      {
            path: "jobs",
            element: <Job />,
      },
      {
            path: "jobs/add-job",
            element: <Add_Jobs />,
      },
      {
            path: "category",
            element: <Category />,
      },
      {
            path: "category/add-category",
            element: <Add_Category />,
      }
];

export default AdminRouter;
