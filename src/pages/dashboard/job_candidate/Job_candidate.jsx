import { useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { UserOutlined, DownloadOutlined, FileExcelOutlined, FilePdfOutlined } from '@ant-design/icons';
import { Link, useParams } from "react-router-dom";
import { Table, Input, Button, Space, Spin, Checkbox, Tag, Avatar, Typography, Row, Col } from "antd";
import { Kalbela_AuthProvider } from "../../../context/MainContext";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const { Title } = Typography;
const { Search } = Input;

const JobCandidate = () => {
      const { base_url } = useContext(Kalbela_AuthProvider);
      const { id } = useParams();

      // State for pagination, search, and filters
      const [searchTerm, setSearchTerm] = useState("");
      const [currentPage, setCurrentPage] = useState(1);
      const [pageSize, setPageSize] = useState(10);
      const [ratings, setRatings] = useState([]);
      const [hideStatus, setHideStatus] = useState([]);

      // Fetch candidates data
      const { data: candidates = {}, isLoading, refetch } = useQuery({
            queryKey: ["job_candidates", searchTerm, currentPage, pageSize, ratings, hideStatus],
            queryFn: async () => {
                  const res = await fetch(
                        `${base_url}/employer/candidate-by-job?job_slug=${id}&page=${currentPage}&limit=${pageSize}&search=${searchTerm}&ratings=${ratings.join(",")}&hideStatus=${hideStatus.join(",")}`
                  );
                  const data = await res.json();
                  return data.data;
            },
            enabled: !!id,
      });

      console.log(candidates);

      const handleSearch = (value) => {
            setSearchTerm(value);
            setCurrentPage(1);
            refetch();
      };

      const handlePageChange = (page, pageSize) => {
            setCurrentPage(page);
            setPageSize(pageSize);
            refetch();
      };

      const handleRatingChange = (checkedValues) => {
            setRatings(checkedValues);
            setCurrentPage(1);
            refetch();
      };

      const handleStatusChange = (checkedValues) => {
            setHideStatus(checkedValues);
            setCurrentPage(1);
            refetch();
      };

      const downloadExcel = () => {
            if (!candidates || !candidates.candidates) return;

            // Extract candidate data
            const candidateData = candidates.candidates.map(candidate => ({
                  Email: candidate.user_email,
                  Phone: candidate.user_phone_number,
                  Position: candidate.job_slug,
                  Resume_url: candidate.resume_url,
                  Status: candidate.status,
                  Expected_salary: candidate.expected_salary,
                  Apply_date: new Date(candidate.created_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                  })
            }));

            // Create worksheet and workbook
            const worksheet = XLSX.utils.json_to_sheet(candidateData);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, "Candidates");

            // Generate Excel file
            const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
            const data = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
            saveAs(data, "candidates.xlsx");
      };

      const downloadPDF = () => {
            // Implement PDF download logic here
            console.log("Downloading PDF");
      };

      const columns = [
            {
                  title: "Customer",
                  dataIndex: "full_name",
                  key: "full_name",
                  render: (text, record) => (
                        <Space>
                              <Avatar src={record.profile_image} icon={<UserOutlined />} />
                              {text}
                        </Space>
                  ),
            },
            { title: "Email", dataIndex: "user_email", key: "user_email" },
            { title: "Phone", dataIndex: "user_phone_number", key: "user_phone_number" },
            {
                  title: "Apply Date",
                  dataIndex: "created_at",
                  key: "created_at",
                  render: (date) => new Date(date).toLocaleDateString("en-US", {
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
                        <Tag color={status === "selected" ? "green" : "volcano"}>
                              {status.toUpperCase()}
                        </Tag>
                  ),
            },
            {
                  title: "Actions",
                  key: "actions",
                  render: (_, record) => (
                        <Link to={`/admin/candidate/${record._id}`}>
                              <Button type="primary" size="small">
                                    View Profile
                              </Button>
                        </Link>
                  ),
            },
      ];

      return (
            <div style={{ padding: 24, background: '#fff', borderRadius: 8, boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)' }}>
                  <Row justify="space-between" align="middle" style={{ marginBottom: 16 }}>
                        <Col>
                              <Title level={2}>Candidates List</Title>
                        </Col>
                        <Col>
                              <Space>
                                    <Button icon={<FileExcelOutlined />} onClick={downloadExcel}>
                                          Excel
                                    </Button>
                                    <Button icon={<FilePdfOutlined />} onClick={downloadPDF}>
                                          PDF
                                    </Button>
                              </Space>
                        </Col>
                  </Row>

                  <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
                        <Col xs={24} sm={12} md={8} lg={6}>
                              <Search
                                    placeholder="Search candidates..."
                                    allowClear
                                    enterButton="Search"
                                    size="large"
                                    onSearch={handleSearch}
                              />
                        </Col>
                  </Row>

                  <Table
                        columns={columns}
                        dataSource={candidates.candidates}
                        rowKey="_id"
                        loading={isLoading}
                        pagination={{
                              current: currentPage,
                              pageSize: pageSize,
                              total: candidates?.pagination?.total,
                              onChange: handlePageChange,
                              showSizeChanger: true,
                        }}
                  />
            </div>
      );
};

export default JobCandidate;
