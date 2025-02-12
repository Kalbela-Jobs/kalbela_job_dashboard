import { useContext, useState } from "react";
import { Kalbela_AuthProvider } from "../../../context/MainContext";
import { useQuery } from "@tanstack/react-query";
import { User } from "lucide-react";
import { Table, Input, Pagination, Spin } from "antd";
import { Link, useParams } from "react-router-dom";

const Job_candidate = () => {
      const { base_url, workspace } = useContext(Kalbela_AuthProvider);
      const { id } = useParams();

      // State for pagination and search
      const [searchTerm, setSearchTerm] = useState("");
      const [currentPage, setCurrentPage] = useState(1);
      const [pageSize, setPageSize] = useState(10);

      // Fetch data
      const { data: candidates = {}, isLoading, error, refetch } = useQuery({
            queryKey: ["job_candidates", searchTerm, currentPage, pageSize],
            queryFn: async () => {
                  const res = await fetch(
                        `${base_url}/employer/candidate-by-job?job_slug=${id}&page=${currentPage}&limit=${pageSize}&search=${searchTerm}`
                  );
                  const data = await res.json();
                  return data.data;
            },
            enabled: !!id, // Only fetch if workspace ID exists
      });


      console.log(candidates, "candidates");

      // Handle search
      const handleSearch = (e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
            refetch();
      };

      // Handle pagination change
      const handlePageChange = (page, pageSize) => {
            setCurrentPage(page);
            setPageSize(pageSize);
            refetch();
      };

      // Define table columns
      const columns = [
            {
                  title: "Customer",
                  dataIndex: "full_name",
                  key: "full_name",
                  render: (text, record) => (
                        <div className="flex items-center">
                              {record?.profile_image ? (
                                    <img
                                          className="w-8 h-8 rounded-full mr-3"
                                          src={record.profile_image}
                                          alt={text}
                                    />
                              ) : (
                                    <User className="size-8 p-2 border rounded mr-3" />
                              )}
                              {text}
                        </div>
                  ),
            },
            {
                  title: "Email",
                  dataIndex: "user_email",
                  key: "user_email",
            },
            {
                  title: "Phone",
                  dataIndex: "user_phone_number",
                  key: "user_phone_number",
            },
            {
                  title: "Join Date",
                  dataIndex: "created_at",
                  key: "created_at",
                  render: (date) =>
                        new Date(date).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                        }),
            },
            {
                  title: "Status",
                  dataIndex: "status",
                  key: "status",
                  render: (status) => (
                        <span className="px-2 py-1 text-green-700 bg-green-100 rounded">
                              {status}
                        </span>
                  ),
            },
            {
                  title: "Actions",
                  key: "actions",
                  render: (_, record) => (
                        <Link
                              to={`/admin/candidate/${record._id}`}
                              className="px-3 py-2 text-sm text-gray-700 bg-gray-100 border border-gray-300 rounded-md shadow-sm hover:bg-indigo-600 hover:text-white transition-all duration-200"
                        >
                              View Profile
                        </Link>
                  ),
            },
      ];

      return (
            <div className="p-6 bg-white rounded-md shadow-md">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Candidates List</h2>

                  {/* Search Input */}
                  <Input.Search
                        placeholder="Search candidates..."
                        allowClear
                        value={searchTerm}
                        onChange={handleSearch}
                        className="w-full max-w-md mb-4"
                  />

                  {/* Table */}
                  {isLoading ? (
                        <div className="flex justify-center py-10">
                              <Spin size="large" />
                        </div>
                  ) : (
                        <Table
                              columns={columns}
                              dataSource={candidates.candidates}
                              pagination={false} // Using custom pagination
                              rowKey="_id"
                        />
                  )}

                  {/* Pagination */}
                  <div className="flex justify-center mt-6">
                        <Pagination
                              current={currentPage}
                              pageSize={pageSize}
                              onChange={handlePageChange}
                              total={candidates?.pagination?.total} // Replace with actual total count from API if available
                              showSizeChanger
                        />
                  </div>
            </div>
      );
};

export default Job_candidate;
