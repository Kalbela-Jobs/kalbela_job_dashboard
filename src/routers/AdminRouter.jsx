import Candidate from "../pages/dashboard/candidate/Candidate";
import Single_candidate from "../pages/dashboard/candidate/single_candidate/Single_candidate";
import Add_career_resources from "../pages/dashboard/carear_resource/add/Add_carear_resource";
import Career_resources from "../pages/dashboard/carear_resource/Career_resources";
import Add_career_resources_category from "../pages/dashboard/carear_resource/Career_resources_category/Add_career_resources_category";
import Career_resources_category from "../pages/dashboard/carear_resource/Career_resources_category/Career_resources_category";
import Add_Category from "../pages/dashboard/category/add/Add_Category";
import Category from "../pages/dashboard/category/Category";
import Dashboard from "../pages/dashboard/Dashboard";
import Add_new_hr from "../pages/dashboard/hr_management/add/Add_new_hr";
import Hr_management from "../pages/dashboard/hr_management/Hr_management";
import Add_job_type from "../pages/dashboard/job_type/add/Add_job_type";
import Job_type from "../pages/dashboard/job_type/Job_Type";
import Add_Jobs from "../pages/dashboard/Jobs/Add_Jobs";
import Job from "../pages/dashboard/Jobs/Job";
import Organization_management from "../pages/dashboard/organization/Organization_management";

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
      }, {
            path: 'job-type',
            element: <Job_type />
      },
      {
            path: 'job-type/add-job-type',
            element: <Add_job_type />
      }, {
            path: 'career-resources/category',
            element: <Career_resources_category />
      },
      {
            path: 'career-resources/category/add-career-resources',
            element: <Add_career_resources_category />
      },
      {
            path: 'career-resources',
            element: <Career_resources />
      },
      {
            path: 'career-resources/add-career-resources',
            element: <Add_career_resources />
      },
      {
            path: 'candidates',
            element: <Candidate />
      },
      {
            path: 'candidate/:id',
            element: <Single_candidate />
      }, {
            path: 'hr-management',
            element: <Hr_management />
      },
      {
            path: 'hr-management/add-hr',
            element: <Add_new_hr />
      },
      {
            path: "organization",
            element: <Organization_management />,
      }
];

export default AdminRouter;
