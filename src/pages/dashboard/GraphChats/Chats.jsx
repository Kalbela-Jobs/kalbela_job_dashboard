import { useState } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useContext } from "react";
import { Kalbela_AuthProvider } from "../../../context/MainContext";
import { useQuery } from "@tanstack/react-query";
import Candidatess from "./Candidatess";
import { Button, Modal, Pagination } from "antd";

const Chats = () => {
  const [timeRange, setTimeRange] = useState("month");

  // Dummy data for sales over time

  const { base_url, workspace, user } = useContext(Kalbela_AuthProvider);

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const {
    data: jobs = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["workspace-jobs", workspace?._id, user.role, page, pageSize],
    queryFn: async () => {
      let url = `${base_url}/jobs/${
        user.role === "supper_admin" ? "get-all-jobs" : "workspace-jobs"
      }`;

      if (workspace?._id && user.role !== "supper_admin") {
        url += `?workspace_id=${workspace._id}`;
      }

      url += `${url.includes("?") ? "&" : "?"}page=${page}`;
      url += `${
        url.includes("?") ? "&" : "?"
      }page_size=${pageSize}&limit=${pageSize}`;

      const res = await fetch(url);
      if (!res.ok) {
        throw new Error("Failed to fetch jobs");
      }
      const data = await res.json();
      return data.data || [];
    },
    enabled: !!(workspace?._id || user.role === "supper_admin"),
  });

  const handlePageChange = (newPage, newPageSize) => {
    console.log(newPage, newPageSize);
    setPage(newPage);
    setPageSize(newPageSize);
  };
  console.log("checked22999999999", jobs?.jobs);
  const salesData = {
    week: [
      { name: "Mon", sales: 4000, profit: 2400 },
      { name: "Tue", sales: 3000, profit: 1398 },
      { name: "Wed", sales: 2000, profit: 9800 },
      { name: "Thu", sales: 2780, profit: 3908 },
      { name: "Fri", sales: 1890, profit: 4800 },
      { name: "Sat", sales: 2390, profit: 3800 },
      { name: "Sun", sales: 3490, profit: 4300 },
    ],
    month: [
      { name: "Jan", sales: 4000, profit: 2400 },
      { name: "Feb", sales: 3000, profit: 1398 },
      { name: "Mar", sales: 2000, profit: 9800 },
      { name: "Apr", sales: 2780, profit: 3908 },
      { name: "May", sales: 1890, profit: 4800 },
      { name: "Jun", sales: 2390, profit: 3800 },
      { name: "Jul", sales: 3490, profit: 4300 },
      { name: "Aug", sales: 3490, profit: 4300 },
      { name: "Sep", sales: 4000, profit: 2400 },
      { name: "Oct", sales: 3000, profit: 1398 },
      { name: "Nov", sales: 2000, profit: 9800 },
      { name: "Dec", sales: 2780, profit: 3908 },
    ],
    year: [
      { name: "2018", sales: 24000, profit: 12400 },
      { name: "2019", sales: 30000, profit: 13980 },
      { name: "2020", sales: 27000, profit: 9800 },
      { name: "2021", sales: 27800, profit: 13908 },
      { name: "2022", sales: 31890, profit: 14800 },
      { name: "2023", sales: 39000, profit: 20800 },
    ],
  };

  // Dummy data for product categories

  // Dummy data for traffic sources
  const trafficData = [
    { name: "Direct", total: 50 },
    { name: "Direct", total: 50 },
  ];

  const [storeUrl, setStoreUrl] = useState(null);
  // console.log("store Url", storeUrl);

  // Dummy data for customer demographics dummy Data
  const demographicsData = [
    { name: "18-24", male: 20, female: 30 },
    { name: "25-34", male: 30, female: 40 },
    { name: "35-44", male: 40, female: 35 },
    { name: "45-54", male: 25, female: 20 },
    { name: "55+", male: 15, female: 10 },
  ];

  // Colors for pie charts
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];
  const [openChart, setOpenChart] = useState(null);
  const CustomTooltip = ({ active, payload, datas }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-4 pt-2 mt-6 shadow-md rounded-md border z-50 border-gray-500 ">
          <p className="text-sm font-semibold">
            {datas?.job_title?.slice(0, 22) + "..."}
          </p>
          <p className="text-sm font-semibold">
            Applications: {datas?.applications_count}
          </p>
          <p className="text-sm font-semibold">
            Salary Type : {datas?.salary_type}
          </p>
          <div className="flex justify-center gap-2 items-center">
            <h3 className="text-sm font-semibold"> Age Range :</h3>
            <p className="text-xs font-semibold">
              min ({datas?.age_range?.min}) -
            </p>
            <p className="text-xs  font-semibold">
              max ({datas?.age_range?.min})
            </p>
          </div>
        </div>
      );
    }
    return null;
  };
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="w-full mx-auto space-y-5">
        {/* Sales Trend */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <h2 className="text-xl font-bold text-gray-800">Sales Trend</h2>
            <p className="text-sm text-gray-500">
              Cumulative sales performance
            </p>
          </div>
          <div className="px-6 pb-6">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={salesData[timeRange]}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="sales"
                    stroke="#8884d8"
                    fill="#8884d8"
                    fillOpacity={0.3}
                  />
                  <Area
                    type="monotone"
                    dataKey="profit"
                    stroke="#82ca9d"
                    fill="#82ca9d"
                    fillOpacity={0.3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <h2 className="text-black text-2xl mt-3 mb-1 font-bold">
          Jobs Reviews
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {/*  Jobs Reviews */}
          {jobs?.jobs?.map((job, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden"
              onClick={() => setStoreUrl(job?.url)}
            >
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-800">
                  {job?.job_title.slice(0, 22) + "..."}
                </h2>
              </div>
              <div className="px-6 pb-6">
                <div className="h-60">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart onClick={() => setOpenChart(true)}>
                      <Pie
                        data={trafficData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="total"
                      >
                        {trafficData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip content={<CustomTooltip />} datas={job} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Modal
          title="Chart "
          footer={null}
          open={openChart}
          onCancel={() => setOpenChart(false)}
          className="flex items-center justify-center"
        >
          <Candidatess itemUrl={storeUrl} />
        </Modal>

        <div className="mt-4 flex justify-center">
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
  );
};

export default Chats;
