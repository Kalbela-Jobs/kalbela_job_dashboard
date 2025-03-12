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

const Chats = () => {
  const [timeRange, setTimeRange] = useState("month");

  // Dummy data for sales over time
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
  const categoryData = [
    { name: "Electronics", value: 400 },
    { name: "Clothing", value: 300 },
    { name: "Home & Kitchen", value: 300 },
    { name: "Books", value: 200 },
    { name: "Sports", value: 100 },
  ];

  // Dummy data for traffic sources
  const trafficData = [
    { name: "Direct", value: 40 },
    { name: "Organic Search", value: 30 },
    { name: "Paid Search", value: 15 },
    { name: "Social Media", value: 10 },
    { name: "Referral", value: 5 },
  ];

  // Dummy data for customer demographics
  const demographicsData = [
    { name: "18-24", male: 20, female: 30 },
    { name: "25-34", male: 30, female: 40 },
    { name: "35-44", male: 40, female: 35 },
    { name: "45-54", male: 25, female: 20 },
    { name: "55+", male: 15, female: 10 },
  ];

  // Colors for pie charts
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Traffic Sources */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-800">
                Traffic Sources
              </h2>
              <p className="text-sm text-gray-500">
                Where your customers come from
              </p>
            </div>
            <div className="px-6 pb-6">
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={trafficData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) =>
                        `${name}: ${(percent * 100).toFixed(0)}%`
                      }
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {trafficData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Customer Demographics */}
          <div className="col-span-1 md:col-span-2 bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-800">
                Customer Demographics
              </h2>
              <p className="text-sm text-gray-500">
                Age and gender distribution
              </p>
            </div>
            <div className="px-6 pb-6">
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={demographicsData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="male" name="Male" fill="#8884d8" />
                    <Bar dataKey="female" name="Female" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chats;
