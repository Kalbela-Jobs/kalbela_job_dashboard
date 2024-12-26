import { useQuery } from "@tanstack/react-query";
import Link_Button from "../../../components/small_component/Link_Button";
import { Kalbela_AuthProvider } from "../../../context/MainContext";
import { useContext, useState } from "react";
import Modal_Component from "../../../components/common/Modal_Component";
import Edit_jobs from "./Edit_jobs";
import Delete_Modal from "../../../components/common/Delete_Modal";
import sweet_alert from "../../../utils/custom_alert";

const Job = () => {
      const [modal, set_modal] = useState(false);
      const [delete_modal, set_delete_modal] = useState(false);

      const { base_url, workspace } = useContext(Kalbela_AuthProvider)
      const { data: jobs = [], isLoading: loading, error, refetch } = useQuery({
            queryKey: ["workspace-jobs", workspace?._id], // Include `workspace?._id` for cache invalidation
            queryFn: async () => {
                  if (!workspace?._id) return []; // Avoid fetching if workspace ID is undefined
                  const res = await fetch(`${base_url}/jobs/workspace-jobs?workspace_id=${workspace._id}`);

                  if (!res.ok) {
                        throw new Error("Failed to fetch workspace jobs");
                  }

                  const data = await res.json();
                  return data.data; // Adjust based on your API response structure
            },
            enabled: !!workspace?._id, // Only fetch data if workspace ID exists
      });

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



      return (
            <div>
                  <div className="py-4 bg-white ">


                        <div className="px-4 sm:px-6 lg:px-8">
                              <Link_Button name="Create New Job" url="add-job" />
                              <div className="sm:flex sm:items-center sm:justify-between">
                                    <div>
                                          <p className="text-xl font-bold text-gray-900">Your Jobs</p>

                                    </div>

                              </div>
                              <div className="flex flex-col mt-4 ">
                                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                                                <table className="min-w-full lg:divide-gray-200 lg:divide-y">
                                                      <thead className="hidden lg:table-header-group">
                                                            <tr>
                                                                  <th className="py-3.5 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-widest">
                                                                        Job Title
                                                                  </th>
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
                                                                  <th className="relative py-3.5 pl-4 pr-4 md:pr-0">
                                                                        <span className=""> Actions </span>
                                                                  </th>
                                                            </tr>
                                                      </thead>
                                                      <tbody>


                                                            {jobs.map((job) => <tr key={job._id} className="bg-gray-50">
                                                                  <td className="px-4 py-4 text-sm font-bold text-gray-900 align-top lg:align-middle whitespace-nowrap">
                                                                        <div className="flex items-center">
                                                                              {job.job_title}
                                                                        </div>

                                                                  </td>
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
                                                                        {job.status ? job.status == true ? "Active" : "Inactive" : "Pending"}
                                                                  </td>
                                                                  <td className="hidden px-4 py-4 lg:table-cell whitespace-nowrap">
                                                                        <div className="flex items-center space-x-4">
                                                                              <button
                                                                                    onClick={() => set_modal(job)}
                                                                                    type="button"
                                                                                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 transition-all duration-200 bg-gray-100 border border-gray-300 rounded-md shadow-sm hover:bg-indigo-600 focus:outline-none hover:text-white hover:border-indigo-600 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                                                              >
                                                                                    Edit Details
                                                                              </button>
                                                                              <button
                                                                                    type="button"
                                                                                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 transition-all duration-200 bg-gray-100 border border-gray-300 rounded-md shadow-sm hover:bg-indigo-600 focus:outline-none hover:text-white hover:border-indigo-600 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                                                              >
                                                                                    Applications
                                                                              </button>
                                                                              <button
                                                                                    onClick={() => set_delete_modal(job)}
                                                                                    type="button"
                                                                                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 transition-all duration-200 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                                                              >
                                                                                    <svg
                                                                                          className="w-5 h-5 mr-2 -ml-1"
                                                                                          xmlns="http://www.w3.org/2000/svg"
                                                                                          fill="none"
                                                                                          viewBox="0 0 24 24"
                                                                                          stroke="currentColor"
                                                                                          strokeWidth={2}
                                                                                    >
                                                                                          <path
                                                                                                strokeLinecap="round"
                                                                                                strokeLinejoin="round"
                                                                                                d="M6 18L18 6M6 6l12 12"
                                                                                          />
                                                                                    </svg>
                                                                                    Remove
                                                                              </button>
                                                                        </div>
                                                                  </td>
                                                            </tr>)}
                                                      </tbody>
                                                </table>
                                          </div>
                                    </div>
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
