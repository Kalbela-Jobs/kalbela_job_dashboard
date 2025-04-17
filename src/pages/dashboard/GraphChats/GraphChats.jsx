import { useQuery } from "@tanstack/react-query";
import CircleMetric from "./components/CircleMetric";
import DonutChart from "./components/DonutChart";
import MetricCard from "./components/MetricCard";
import TriangleChart from "./components/TriangleChart";
import { useCallback, useContext, useEffect, useState } from "react";
import { Kalbela_AuthProvider } from "../../../context/MainContext";
import { Pagination } from "antd";
import { format, isValid } from "date-fns";
import Salary_Expectation from "./components/Salary_Expectation";

const GraphChats = () => {
      const { base_url, workspace, user } = useContext(Kalbela_AuthProvider);
      const [modal, set_modal] = useState(false);
      const [search_value, set_search_value] = useState("");
      const [delete_modal, set_delete_modal] = useState(false);
      const [statusFilter, setStatusFilter] = useState("");
      const [expiredFilter, setExpiredFilter] = useState("");
      const [featured, set_featured] = useState("");
      const [dateRange, setDateRange] = useState([null, null]);
      const [sort_order, set_sort_order] = useState("desc");
      const [page, setPage] = useState(1);
      const [pageSize, setPageSize] = useState(10);




      console.log(pageSize, 'pageSize');
      const {
            data: jobs = [],
            isLoading,
            error,
            refetch,
      } = useQuery({
            queryKey: [
                  "workspace-jobs",
                  workspace?._id,
                  user.role,
                  statusFilter,
                  dateRange,
                  search_value,
                  sort_order,
                  featured,
                  page,
                  pageSize,
                  expiredFilter,
            ],
            queryFn: async () => {
                  let url = `${base_url}/jobs/${user.role === "supper_admin" ? "get-all-jobs" : "workspace-jobs"
                        }`;
                  if (workspace?._id && user.role !== "supper_admin") {
                        url += `?workspace_id=${workspace._id}`;
                  }
                  if (page) {
                        url += `${url.includes("?") ? "&" : "?"}page=${page}`;
                  }
                  if (pageSize) {
                        url += `${url.includes("?") ? "&" : "?"}limit=${pageSize}`;
                  }

                  if (featured) {
                        url += `${url.includes("?") ? "&" : "?"}featured=${featured}`;
                  }
                  if (sort_order) {
                        url += `${url.includes("?") ? "&" : "?"}sort_order=${sort_order}`;
                  }
                  if (search_value) {
                        url += `${url.includes("?") ? "&" : "?"}search_value=${search_value}`;
                  }
                  if (statusFilter) {
                        url += `${url.includes("?") ? "&" : "?"}status=${statusFilter}`;
                  }
                  if (expiredFilter) {
                        url += `${url.includes("?") ? "&" : "?"}expired=${expiredFilter}`;
                  }
                  if (dateRange && dateRange[0] && dateRange[1]) {
                        //Updated dateRange check
                        url += `${url.includes("?") ? "&" : "?"
                              }start_date=${dateRange[0].toISOString()}&end_date=${dateRange[1].toISOString()}`;
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



      const handlePageChange = (newPage, newPageSize) => {
            console.log(newPage, newPageSize);
            setPage(newPage);
            setPageSize(newPageSize);
      };

      const formatDate = useCallback((dateString) => {
            const date = new Date(dateString);
            return isValid(date) ? format(date, "dd MMM yyyy") : "Invalid Date";
      }, []);




      return (
            <div className="min-h-screen bg-gray-100 p-4" >
                  <div className="">
                        {
                              jobs?.jobs?.map((job) => (
                                    <div key={job._id} className="bg-white rounded-lg shadow-sm mb-4">

                                          <div className="p-4 border-b flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                      <span className="h-2 w-2 rounded-full bg-green-500"></span>
                                                      <h2 className="text-sm font-medium text-gray-700">{job.job_title}</h2>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                      <button className="text-xs whitespace-nowrap bg-gray-100 text-gray-600 px-3 py-1 rounded-full flex items-center">
                                                            <span className="mr-1">📅</span> {formatDate(job.expiry_date)}
                                                      </button>
                                                      <button className="text-xs hidden lg:block bg-blue-50 text-blue-600 px-3 py-1 rounded-full">+ Follow</button>
                                                      <div className=" hidden lg:flex items-center gap-1">
                                                            <span className="text-gray-400">•</span>
                                                            <span className="text-gray-400">•</span>
                                                            <span className="text-gray-400">•</span>
                                                      </div>
                                                </div>
                                          </div>

                                          <div className="lg:grid grid-cols-6 gap-4 p-4">
                                                <div className="col-span-1">
                                                      <TriangleChart value={job.applications_count} label="applications" percentages={[40, 30, 30]} />
                                                </div>
                                                <div className="col-span-1">
                                                      <DonutChart percentages={[70, 30]} colors={["#4299e1", "#ebf5ff"]} label="Filled" value="70%" />
                                                </div>
                                                <div className="col-span-1">
                                                      <Salary_Expectation value="20%" />
                                                </div>
                                                <div className="col-span-1">
                                                      <CircleMetric value="100%" />
                                                </div>

                                                <div className="col-span-1">
                                                      <div className="h-full flex flex-col justify-center space-y-4">
                                                            <MetricCard icon="chart" value={job.view_count ?? 0} label="Views" />
                                                            <MetricCard icon="user" value={job.view_count ?? 0} label="Yet to View" />
                                                      </div>
                                                </div>
                                                <div className="col-span-1">
                                                      <div className="h-full flex flex-col justify-center space-y-4">
                                                            <MetricCard icon="chart" value="0" label="Shortlisted" />

                                                      </div>
                                                </div>
                                          </div>
                                    </div>
                              ))
                        }
                  </div>
                  <Pagination
                        current={jobs?.current_page ?? 1}
                        pageSize={pageSize ?? 10}
                        total={jobs?.total_jobs ?? 0}
                        showSizeChanger
                        defaultCurrent={3}

                        onChange={handlePageChange}

                  />
            </div >
      )
}
export default GraphChats;
