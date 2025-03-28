import React from "react";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const ModalChart2 = ({ candidatesData }) => {
  // Process job application data
  const processJobData = (data) => {
    const groupedData = data.reduce((acc, curr) => {
      const date = curr.created_at.split("T")[0]; // Extract only YYYY-MM-DD
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {});

    return Object.keys(groupedData).map((date) => ({
      date,
      totalApplied: groupedData[date],
    }));
  };

  const jobApplicationsChartData = processJobData(candidatesData);
  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={jobApplicationsChartData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Area
            type="monotone"
            dataKey="totalApplied"
            stroke="#8884d8"
            fill="#8884d8"
            fillOpacity={0.3}
            name="Applications"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ModalChart2;
