import React, { useContext, useState } from "react";
import { Layout, Typography } from "antd";
import AddEditJobForm from "./pages/add_govt_jobs/Add_govt_jobs";
import JobsTable from "./components/Job_Table";
import ViewJobModal from "./components/ViewJobModal";
import Link_Button from "../../../components/small_component/Link_Button";
import { useQuery } from "@tanstack/react-query";
import { Kalbela_AuthProvider } from "../../../context/MainContext";
import sweet_alert from "../../../utils/custom_alert";
import EditGovtJobs from "./pages/add_govt_jobs/Edit_govt_jobs";

const { Content } = Layout;
const { Title } = Typography;

const Govt_jobs = () => {
  const { base_url, workspace, user } = useContext(Kalbela_AuthProvider);

  const {
    data: jobs = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["jobs"],
    queryFn: async () => {
      const res = await fetch(`${base_url}/jobs/get-all-govt-jobs`);
      const data = await res.json();
      return data.data;
    },
  });

  // const [jobs, setJobs] = useState([]);
  const [editingJob, setEditingJob] = useState(false);
  const [viewingJob, setViewingJob] = useState(null);

  const handleDeleteJob = (id) => {
    fetch(`${base_url}/jobs/delete-govt-jobs?job_id=${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) {
          refetch();
          sweet_alert("Success", data.message, "success");
        } else {
          sweet_alert("Error", data.message, "error");
        }
      })
      .catch((error) => {
        sweet_alert("Error", "An unexpected error occurred", "error");
      });
  };

  return (
    <Layout className="min-h-screen">
      <Content className="p-8">
        <div className="flex gap-4 items-center">
          <Link_Button name="Create New Job Type" url="add" />
          <Link_Button
            name="Government Organizations"
            url="/admin/govt-jobs/govt-organizations"
          />
        </div>
        <Title level={2} className="mb-8">
          Government Jobs
        </Title>
        {editingJob && (
          <EditGovtJobs
            data={editingJob}
            onClose={() => setEditingJob(null)}
            base_url={base_url}
          />
        )}
        {/* <AddGovtOrgWithTable /> */}
        <JobsTable
          jobs={jobs}
          onEdit={setEditingJob}
          onDelete={handleDeleteJob}
          onView={setViewingJob}
        />
        <ViewJobModal job={viewingJob} onClose={() => setViewingJob(null)} />
      </Content>
    </Layout>
  );
};

export default Govt_jobs;
