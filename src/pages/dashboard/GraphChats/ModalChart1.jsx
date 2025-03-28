"use client";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const ModalChart1 = ({ candidatesData = [] }) => {
  // Process data: Remove commas and filter only dates present in candidatesData
  const salaryChartData = candidatesData
    .map((candidate) => ({
      date: candidate.created_at.split("T")[0], // Extract YYYY-MM-DD
      expectedSalary: Number(
        candidate.expected_salary.replace(/k/g, "000").replace(/,/g, "")
      ), // Remove commas & convert
    }))
    .filter((data) => !isNaN(data.expectedSalary)); // Remove invalid salaries

  return (
    <div className="mt-4 lg:mt-0 ">
      <h2 className="text-md font-bold mb-2 text-gray-800">
        Expected Salary by Date
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={salaryChartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" interval={0} angle={-15} textAnchor="end" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="expectedSalary"
            name="Expected Salary"
            fill="#4F46E5"
            barSize={40} // Adjust bar width
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ModalChart1;
