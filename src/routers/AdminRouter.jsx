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
            path: "jobs",
            element: <Job />,
      },
      {
            path: "jobs/add-job",
            element: <Add_Jobs />,
      },
];

export default AdminRouter;
