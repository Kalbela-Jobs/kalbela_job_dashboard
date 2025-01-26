import { path } from "framer-motion/client";
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
import Message from "../pages/dashboard/message/Message";
import Organization_management from "../pages/dashboard/organization/Organization_management";
import Profile from "../pages/dashboard/profile/Profile";
import Workspace_profile from "../pages/dashboard/profile/Workspace_profile";


import Private from "./Private";
import Config from "../pages/dashboard/configaration/Config";
import Skills from "../pages/dashboard/configaration/pages/skills/Skills";
import Position from "../pages/dashboard/configaration/pages/Position/Position";
import Location from "../pages/dashboard/configaration/pages/Location/Location";
import Industry from "../pages/dashboard/configaration/pages/Industry/Industry";
import Department from "../pages/dashboard/configaration/pages/Department/Department";
import Govt_jobs from "../pages/dashboard/govt_jobs/Govt_jobs";
import AddEditJobForm from "../pages/dashboard/govt_jobs/pages/add_govt_jobs/Add_govt_jobs";
import Hero_logo from "../pages/dashboard/configaration/pages/Hero_logo/Hero_logo";
import AddGovtOrgWithTable from "../pages/dashboard/govt_jobs/pages/add_govt_org/Add_govt_org";

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
            element: <Private><Job /></Private>,
      },
      {
            path: "govt-jobs",
            element: <Private><Govt_jobs /></Private>,
      },
      {
            path: "govt-jobs/add",
            element: <Private><AddEditJobForm /></Private>,
      },
      {
            path: "govt-jobs/govt-organizations",
            element: <Private><AddGovtOrgWithTable /></Private>,
      },
      {
            path: "jobs/add-job",
            element: <Private> <Add_Jobs /></Private>,
      },
      {
            path: "category",
            element: <Private> <Category /></Private>,
      },
      {
            path: "category/add-category",
            element: <Private> <Add_Category /></Private>,
      }, {
            path: 'job-type',
            element: <Private> <Job_type /></Private>
      },
      {
            path: 'job-type/add-job-type',
            element: <Private> <Add_job_type /></Private>
      }, {
            path: 'career-resources/category',
            element: <Private> <Career_resources_category /></Private>
      },
      {
            path: 'career-resources/category/add-career-resources',
            element: <Private> <Add_career_resources_category /></Private>
      },
      {
            path: 'career-resources',
            element: <Private> <Career_resources /></Private>
      },
      {
            path: 'career-resources/add-career-resources',
            element: <Private> <Add_career_resources /></Private>
      },
      {
            path: 'configuration',
            element: <Private> <Config /></Private>
      },
      {
            path: 'configuration/skills',
            element: <Private> <Skills /></Private>
      },
      {
            path: 'configuration/positions',
            element: <Private> <Position /></Private>
      },
      {
            path: 'configuration/locations',
            element: <Private> <Location /></Private>
      },
      {
            path: 'configuration/industry',
            element: <Private> <Industry /></Private>
      },
      {
            path: 'configuration/departments',
            element: <Private> <Department /></Private>
      },
      {
            path: 'configuration/hero-logo',
            element: <Private> <Hero_logo /></Private>
      },
      {
            path: 'candidates',
            element: <Private> <Candidate /></Private>
      },
      {
            path: 'candidate/:id',
            element: <Private> <Single_candidate /></Private>
      }, {
            path: 'hr-management',
            element: <Private> <Hr_management /></Private>
      },
      {
            path: 'hr-management/add-hr',
            element: <Private> <Add_new_hr /></Private>
      },
      {
            path: "organization",
            element: <Private> <Organization_management /></Private>,
      },
      {
            path: "profile",
            element: <Private> <Workspace_profile /></Private>,
      },
      {
            path: "message",
            element: <Private> <Message /></Private>,
      },

];

export default AdminRouter;
