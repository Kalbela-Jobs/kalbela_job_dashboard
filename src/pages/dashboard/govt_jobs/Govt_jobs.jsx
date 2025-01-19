import React, { useContext, useState } from 'react';
import { Layout, Typography } from 'antd';
import AddEditJobForm from './pages/add_govt_jobs/Add_govt_jobs';
import JobsTable from './components/Job_Table';
import ViewJobModal from './components/ViewJobModal';
import Link_Button from '../../../components/small_component/Link_Button';
import { useQuery } from '@tanstack/react-query';
import { Kalbela_AuthProvider } from '../../../context/MainContext';


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

      const handleAddJob = (job) => {
            setJobs([...jobs, { ...job, id: Date.now() }]);
      };

      const handleEditJob = (job) => {
            setJobs(jobs.map((j) => (j.id === job.id ? job : j)));
            setEditingJob(null);
      };

      const handleDeleteJob = (id) => {
            setJobs(jobs.filter((job) => job.id !== id));
      };

      return (
            <Layout className="min-h-screen">

                  <Content className="p-8">
                        <Link_Button name='Create New Job Type' url="add" />
                        <Title level={2} className="mb-8">Government Jobs</Title>
                        {editingJob && <AddEditJobForm
                              onSubmit={editingJob ? handleEditJob : handleAddJob}
                              initialValues={editingJob}
                        />}
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
