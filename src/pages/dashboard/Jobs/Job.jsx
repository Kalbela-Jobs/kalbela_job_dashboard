import { useQuery } from "@tanstack/react-query";
import Link_Button from "../../../components/small_component/Link_Button";
import { Kalbela_AuthProvider } from "../../../context/MainContext";
import { useCallback, useContext, useState } from "react";
import Modal_Component from "../../../components/common/Modal_Component";
import Edit_jobs from "./Edit_jobs";
import Delete_Modal from "../../../components/common/Delete_Modal";
import sweet_alert from "../../../utils/custom_alert";
import { Delete, Eye, Trash } from "lucide-react";
import {
      Table, Input, Button, Dropdown, Menu, Tag, DatePicker,
      Space, Modal, message, Select,
      Pagination
} from 'antd'
import moment from 'moment'; // Added import for moment
const { RangePicker } = DatePicker;

import {
      MoreOutlined,
      EditOutlined,
      StarOutlined,
      PoweroffOutlined,
      EyeOutlined,
      DeleteOutlined
} from '@ant-design/icons'
import { format, isValid } from "date-fns";


const Job = () => {
      const [modal, set_modal] = useState(false);
      const [search_value, set_search_value] = useState("");
      const [delete_modal, set_delete_modal] = useState(false);
      const [statusFilter, setStatusFilter] = useState("");
      const [featured, set_featured] = useState("");
      const [dateRange, setDateRange] = useState([null, null]);
      const [sort_order, set_sort_order] = useState("desc");
      const [page, setPage] = useState(1);
      const [pageSize, setPageSize] = useState(10);

      const { base_url, workspace, user } = useContext(Kalbela_AuthProvider);

      const { data: jobs = [], isLoading, error, refetch } = useQuery({
            queryKey: ["workspace-jobs", workspace?._id, user.role, statusFilter, dateRange, search_value, sort_order, featured, page, pageSize],
            queryFn: async () => {
                  let url = `${base_url}/jobs/${user.role === "supper_admin" ? 'get-all-jobs' : 'workspace-jobs'}`;
                  if (workspace?._id && user.role !== "supper_admin") {
                        url += `?workspace_id=${workspace._id}`;
                  }
                  if (page) {
                        url += `${url.includes('?') ? '&' : '?'}page=${page}`;
                  }
                  if (pageSize) {
                        url += `${url.includes('?') ? '&' : '?'}page_size=${pageSize}&limit=${pageSize}`;
                  }

                  if (featured) {
                        url += `${url.includes('?') ? '&' : '?'}featured=${featured}`;
                  }
                  if (sort_order) {
                        url += `${url.includes('?') ? '&' : '?'}sort_order=${sort_order}`;
                  }
                  if (search_value) {
                        url += `${url.includes('?') ? '&' : '?'}search_value=${search_value}`;
                  }
                  if (statusFilter) {
                        url += `${url.includes('?') ? '&' : '?'}status=${statusFilter}`;
                  }
                  if (dateRange && dateRange[0] && dateRange[1]) { //Updated dateRange check
                        url += `${url.includes('?') ? '&' : '?'}start_date=${dateRange[0].toISOString()}&end_date=${dateRange[1].toISOString()}`;
                  }
                  const res = await fetch(url);
                  if (!res.ok) {
                        throw new Error("Failed to fetch jobs");
                  }
                  const data = await res.json();
                  return data.data || data.data;
            },
            enabled: !!(workspace?._id || user.role === "supper_admin"),
      });

      console.log(jobs, 'jobs');



      const delete_function = async (data) => {

            fetch(`${base_url}/jobs/delete?job_id=${data._id}`, {
                  method: 'DELETE',
            }).then(res => res.json())
                  .then(data => {
                        set_delete_modal(false);
                        if (!data.error) {
                              refetch()
                              sweet_alert("Success", data.message, "success");
                        }
                        else {
                              sweet_alert("Error", data.message, "error");
                        }
                  });
      }

      const update_jobs = async (data, query) => {
            fetch(`${base_url}/jobs/update${query}`, {
                  method: 'PUT',
                  headers: {
                        'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(data)
            }).then((res) => res.json())
                  .then((data) => {
                        set_modal(false);
                        refetch();
                        if (!data.error) {
                              sweet_alert("Success", data.message, "success");
                        }
                        else {
                              sweet_alert("Error", data.message, "error");
                        }
                  });
      }


      const formatDate = useCallback((dateString) => {
            const date = new Date(dateString);
            return isValid(date) ? format(date, 'dd MMM yyyy') : 'Invalid Date';
      }, []);


      const handlePageChange = (newPage, newPageSize) => {
            console.log(newPage, newPageSize);
            setPage(newPage);
            setPageSize(newPageSize);
      };

      return (
            <div>
                  <div className="py-4 bg-white  ">


                        <div className="px-4 sm:px-6 lg:px-8">
                              <Link_Button name="Create New Job" url="add-job" />

                              <div className="sm:flex sm:items-center sm:justify-between">
                                    <div>
                                          <p className="text-xl font-bold text-gray-900">Your Jobs</p>

                                    </div>
                              </div>
                              <div className="flex items-center gap-4 mt-4">
                                    <div
                                          className="max-w-md  ">
                                          <div className="relative">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-400 left-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                                </svg>
                                                <input
                                                      onChange={(e) => set_search_value(e.target.value)}
                                                      type="text"
                                                      placeholder="Search"
                                                      className="w-full py-3 pl-12 pr-4 text-gray-500 border rounded-md outline-none bg-gray-50 focus:bg-white focus:border-indigo-600"
                                                />
                                          </div>
                                    </div>


                                    <Select

                                          style={{ width: 200, height: 50 }}
                                          placeholder="Filter by status"
                                          onChange={(value) => setStatusFilter(value)}
                                          allowClear
                                    >
                                          <Select.Option value="">All</Select.Option>
                                          <Select.Option value="true">Active</Select.Option>
                                          <Select.Option value="false">Inactive</Select.Option>
                                    </Select>
                                    <Select

                                          style={{ width: 200, height: 50 }}
                                          placeholder="Filter by feature"
                                          onChange={(value) => set_featured(value)}
                                          allowClear
                                    >
                                          <Select.Option value="">All</Select.Option>
                                          <Select.Option value="true">Active</Select.Option>
                                          <Select.Option value="false">Inactive</Select.Option>
                                    </Select>
                                    <Select

                                          style={{ width: 200, height: 50 }}
                                          placeholder="Filter by sort order"
                                          onChange={(value) => set_sort_order(value)}
                                          allowClear
                                    >
                                          <Select.Option value="desc">Descending</Select.Option>
                                          <Select.Option value="asc">Ascending</Select.Option>

                                    </Select>

                                    <RangePicker
                                          className=" py-3"
                                          onChange={(dates) => setDateRange(dates)}
                                    />
                              </div>
                              <div className="flex flex-col mt-4 ">
                                    <div className="overflow-x-auto ">
                                          <div className="">
                                                <table className="min-w-full lg:divide-gray-200 lg:divide-y">
                                                      <thead className="hidden lg:table-header-group">
                                                            <tr>
                                                                  <th className="py-3.5 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-widest">
                                                                        Index
                                                                  </th>
                                                                  <th className="py-3.5 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-widest">
                                                                        Job Title
                                                                  </th>
                                                                  {user.role === "supper_admin" && <th className="py-3.5 px-4 text-left text-xs uppercase tracking-widest font-medium text-gray-500">
                                                                        Company Name
                                                                  </th>}
                                                                  <th className="py-3.5 px-4 text-left text-xs uppercase tracking-widest font-medium text-gray-500">
                                                                        Job Type
                                                                  </th>
                                                                  <th className="py-3.5 px-4 text-left text-xs uppercase tracking-widest font-medium text-gray-500">
                                                                        Vacancy
                                                                  </th>
                                                                  <th className="py-3.5 px-4 text-left hidden xl:table-cell text-xs uppercase tracking-widest font-medium text-gray-500">
                                                                        Apply Count
                                                                  </th>
                                                                  <th className="py-3.5 px-4 text-left text-xs uppercase tracking-widest font-medium text-gray-500">
                                                                        Status
                                                                  </th>

                                                                  <th className="py-3.5 px-4 text-left text-xs uppercase tracking-widest font-medium text-gray-500">
                                                                        Feature
                                                                  </th>
                                                                  <th className="py-3.5 px-4 text-left text-xs uppercase tracking-widest font-medium text-gray-500">
                                                                        Deadline
                                                                  </th>
                                                                  <th className="py-3.5 px-4 text-left text-xs uppercase tracking-widest font-medium text-gray-500">
                                                                        Upload Date
                                                                  </th>
                                                                  <th className="py-3.5 px-4 text-left text-xs uppercase tracking-widest font-medium text-gray-500">
                                                                        Action
                                                                  </th>
                                                            </tr>
                                                      </thead>
                                                      <tbody>


                                                            {jobs?.jobs?.map((job, index) => <tr key={job._id} className="bg-gray-50">
                                                                  <td className="px-4 py-4 text-sm font-medium text-gray-900 lg:table-cell whitespace-nowrap">
                                                                        <div className="flex items-center">
                                                                              {index + 1 + (jobs.current_page - 1) * pageSize}
                                                                        </div>
                                                                  </td>
                                                                  <td className="px-4 py-4 text-sm font-bold text-gray-900 align-top lg:align-middle whitespace-nowrap">
                                                                        <a href={`https://kalbelajobs.com/jobs/${job.url}`} target="_blank" rel="noopener noreferrer">  <div className="flex items-center">
                                                                              {job.job_title}
                                                                        </div>
                                                                        </a>

                                                                  </td>
                                                                  {user.role === "supper_admin" && <td className=" px-4 py-4 text-sm font-medium text-gray-900 lg:table-cell whitespace-nowrap">
                                                                        <div className="flex items-center capitalize">
                                                                              {job.company_info.name}
                                                                        </div>
                                                                  </td>}
                                                                  <td className=" px-4 py-4 text-sm font-medium text-gray-900 lg:table-cell whitespace-nowrap">
                                                                        <div className="flex items-center">
                                                                              {job.job_type}
                                                                        </div>
                                                                  </td>
                                                                  <td className="hidden px-4 py-4 text-sm font-medium text-gray-900 lg:table-cell whitespace-nowrap">
                                                                        <div className="flex items-center">
                                                                              {job.vacancy}
                                                                        </div>
                                                                  </td>
                                                                  <td className="hidden px-4 py-4 text-sm font-medium text-gray-900 xl:table-cell whitespace-nowrap">
                                                                        <div className="flex items-center">
                                                                              {job?.applications_count ?? 0}
                                                                        </div>
                                                                  </td>

                                                                  <td className="px-4 py-4 text-sm font-medium text-right text-gray-900 align-top lg:align-middle lg:text-left whitespace-nowrap">
                                                                        <Tag color={job.status ? 'green' : 'red'}>
                                                                              {job.status ? 'Active' : 'Inactive'}
                                                                        </Tag>
                                                                  </td>
                                                                  <td className="px-4 py-4 text-sm font-medium text-right text-gray-900 align-top lg:align-middle lg:text-left whitespace-nowrap">
                                                                        {/* {job.feature_status ? job.feature_status == true ? "Featured" : "Not Featured" : "Not Featured"} */}
                                                                        <Tag color={job.feature_status ? 'gold' : 'default'}>
                                                                              {job.feature_status ? 'Featured' : 'Not Featured'}
                                                                        </Tag>
                                                                  </td>
                                                                  <td className="px-4 py-4 text-sm font-medium text-right text-gray-900 align-top lg:align-middle lg:text-left whitespace-nowrap">
                                                                        {formatDate(job.expiry_date)}
                                                                  </td>
                                                                  <td className="px-4 py-4 text-sm font-medium text-right text-gray-900 align-top lg:align-middle lg:text-left whitespace-nowrap">
                                                                        {formatDate(job.created_at)}
                                                                  </td>
                                                                  <td className=" px-4 py-4 flex justify-end lg:table-cell whitespace-nowrap">

                                                                        <JobActions job={job} setModal={set_modal} updateJobs={update_jobs} setDeleteModal={set_delete_modal} />
                                                                  </td>
                                                            </tr>)}
                                                      </tbody>
                                                </table>
                                          </div>
                                    </div>
                              </div>
                              <div className="mt-4 flex justify-end">
                                    {console.log(jobs, 'jobs')}
                                    <Pagination
                                          current={jobs?.current_page ?? 1}
                                          pageSize={pageSize ?? 10}
                                          total={jobs?.total_jobs ?? 0}
                                          showSizeChanger
                                          defaultCurrent={3}
                                          // showTotal={(total) => `Total ${total} items`}
                                          onChange={handlePageChange}
                                    // onShowSizeChange={handlePageChange}
                                    />
                              </div>
                        </div>
                  </div>

                  {
                        modal && <Modal_Component title="Edit Jobs" modal={modal} set_modal={set_modal} JSX={<Edit_jobs refetch={refetch} set_modal={set_modal} data={modal} />} />
                  }

                  {
                        delete_modal && <Delete_Modal title="Delete Job" set_modal={set_delete_modal} delete_function={delete_function} modal={delete_modal} />
                  }

            </div>
      );
};

export default Job;







export function JobActions({ job, setModal, updateJobs, setDeleteModal }) {
      const menu = (
            <Menu>
                  <Menu.Item key="edit" onClick={() => setModal(job)} icon={<EditOutlined />}>
                        Edit Details
                  </Menu.Item>
                  <Menu.Item
                        key="feature"
                        onClick={() => updateJobs({ feature_status: !job.feature_status }, `?job_id=${job._id}`)}
                        icon={<StarOutlined style={{ color: job.feature_status ? "yellow" : "gray" }} />}
                  >
                        {job.feature_status ? "Unfeature" : "Make Featured"}
                  </Menu.Item>
                  <Menu.Item
                        key="status"
                        onClick={() => updateJobs({ status: !job.status }, `?job_id=${job._id}`)}
                        icon={<PoweroffOutlined style={{ color: job.status ? "green" : "gray" }} />}
                  >
                        {job.status ? "Deactivate" : "Activate"}
                  </Menu.Item>
                  <Menu.Item key="view" icon={<EyeOutlined />}>
                        <a href={`https://kalbelajobs.com/jobs/${job.url}`} target="_blank" rel="noopener noreferrer">
                              View Job
                        </a>
                  </Menu.Item>
                  <Menu.Item key="view_candidates" icon={<EyeOutlined />}>
                        <a href={`https://kalbelajobs.com/jobs/${job.url}`} target="_blank" rel="noopener noreferrer">
                              View Candidates
                        </a>
                  </Menu.Item>
                  <Menu.Divider />
                  <Menu.Item
                        key="delete"
                        onClick={() => setDeleteModal(job)}
                        icon={<DeleteOutlined />}
                        danger
                  >
                        Delete
                  </Menu.Item>
            </Menu>
      )

      return (
            <div className="flex items-center justify-end">
                  <Dropdown overlay={menu} trigger={['click']} placement="bottomRight">
                        <button className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                              <MoreOutlined style={{ fontSize: '24px' }} />
                        </button>
                  </Dropdown>
            </div>
      )
}
