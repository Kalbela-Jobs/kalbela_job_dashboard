import React, { useContext, useState } from 'react';
import { Layout, Typography } from 'antd';
import AddEditJobForm from './pages/add_govt_jobs/Add_govt_jobs';
import JobsTable from './components/Job_Table';
import ViewJobModal from './components/ViewJobModal';
import Link_Button from '../../../components/small_component/Link_Button';
import { useQuery } from '@tanstack/react-query';
import { Kalbela_AuthProvider } from '../../../context/MainContext';
import sweet_alert from '../../../utils/custom_alert';
import AddGovtOrgWithTable from './pages/add_govt_org/Add_govt_org';


const { Content } = Layout;
const { Title } = Typography;

const Govt_jobs = () => {
      const { base_url, workspace, user } = useContext(Kalbela_AuthProvider)

      const { data: jobs = [], isLoading, refetch } = useQuery({
            queryKey: ["jobs"],
            queryFn: async () => {
                  const res = await fetch(
                        `${base_url}/jobs/get-all-govt-jobs`
                  );
                  const data = await res.json();
                  return data.data;
            },
      });

      // const [jobs, setJobs] = useState([]);
      const [editingJob, setEditingJob] = useState(null);
      const [viewingJob, setViewingJob] = useState(null);



      const handleEditJob = (job) => {
            fetch(`${base_url}/jobs/update?job_id=${job._id}`, {
                  method: 'PUT',
                  headers: {
                        'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(job),
            }).then(res => res.json())
                  .then(data => {
                        setEditingJob(null);
                  });
            setEditingJob(null);
      };

      const handleDeleteJob = (id) => {
            fetch(`${base_url}/jobs/delete-govt-jobs?job_id=${id}`, {
                  method: 'DELETE',
            }).then(res => res.json())
                  .then(data => {
                        if (!data.error) {
                              refetch()
                              sweet_alert("Success", data.message, "success");
                        }
                        else {
                              sweet_alert("Error", data.message, "error");
                        }
                  })
                  .catch(error => {
                        sweet_alert("Error", "An unexpected error occurred", "error");
                  });
      };

      return (
            <Layout className="min-h-screen">

                  <Content className="p-8">
                        <div className='flex gap-4 items-center'>
                              <Link_Button name='Create New Job Type' url="add" />
                              <Link_Button name='Government Organizations' url="/admin/govt-jobs/govt-organizations" />
                        </div>
                        <Title level={2} className="mb-8">Government Jobs</Title>
                        {editingJob && <AddEditJobForm
                              onSubmit={editingJob && handleEditJob}
                              initialValues={editingJob}
                        />}
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
