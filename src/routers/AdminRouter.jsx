import Dashboard from "../pages/dashboard/Dashboard";
import Jobs from "../pages/dashboard/Jobs/Jobs";
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
    element: <Jobs />,
  },
  {
    path: "jobs/edit",
    element: <h1>Edit Jobs</h1>,
  },
];

export default AdminRouter;
