import Dashboard from "../pages/dashboard/Dashboard";

const AdminRouter = [
      {
            path: "",
            element: <Dashboard />,
      },
      {
            path: "jobs",
            element: <h1>Jobs</h1>,
      },
      {
            path: "jobs/edit",
            element: <h1>Edit Jobs</h1>,
      },

];

export default AdminRouter;
