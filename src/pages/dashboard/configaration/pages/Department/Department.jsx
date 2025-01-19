import { PlusOutlined, SearchOutlined, CloseOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Tag } from "antd";
import { useContext, useEffect, useState } from "react";
import { Kalbela_AuthProvider } from "../../../../../context/MainContext";
import { useQuery } from "@tanstack/react-query";
import sweet_alert from "../../../../../utils/custom_alert";
import { Link } from "react-router-dom";

const { confirm } = Modal;

const Department = () => {

      const { user, base_url, } = useContext(Kalbela_AuthProvider);
      const { data: demoDepartments = [], isLoading, refetch } = useQuery({
            queryKey: ["demoDepartments"],
            queryFn: async () => {
                  const res = await fetch(
                        `${base_url}/config/departments?token=${user._id}`
                  );
                  const data = await res.json();
                  return data.data;
            },
      });
      const [departments, setDepartments] = useState(demoDepartments);
      const [isModalVisible, setIsModalVisible] = useState(false);
      const [form] = Form.useForm();
      useEffect(() => {
            setDepartments(demoDepartments);
      }, [demoDepartments]);

      // Handle adding a department
      const handleAddDepartment = (values) => {
            const departmentName = values.name.trim();
            const isDuplicate = departments.some(
                  (department) => department.name.toLowerCase() === departmentName.toLowerCase()
            );

            if (isDuplicate) {
                  Modal.warning({
                        title: "Duplicate Department",
                        content: "The department name already exists. Please enter a unique name.",
                  });
                  return;
            }

            fetch(`${base_url}/config/add-department?token=${user._id}`, {
                  method: 'POST',
                  headers: {
                        'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({ name: departmentName })
            })
                  .then(res => res.json())
                  .then(data => {
                        if (!data.error) {
                              setDepartments([...departments, data.data]);
                              setIsModalVisible(false);
                              refetch();
                        }
                        else {
                              sweet_alert("Error", data.message, "error");
                        }
                  });
            setIsModalVisible(false);
            form.resetFields();
      };

      // Handle deleting a department
      const handleDeleteDepartment = (id) => {
            confirm({
                  title: "Are you sure you want to delete this department?",
                  icon: <ExclamationCircleOutlined />,
                  okText: "Yes",
                  okType: "danger",
                  cancelText: "No",
                  onOk() {
                        fetch(`${base_url}/config/delete-department?id=${id}&token=${user._id}`, {
                              method: "DELETE",
                              headers: {
                                    "Content-Type": "application/json",
                              },
                        })
                              .then((res) => res.json())
                              .then((data) => {
                                    if (!data.error) {
                                          sweet_alert("Success", "Department deleted successfully!", "success");
                                          refetch();
                                    } else {
                                          sweet_alert("Error", data.message || "Failed to delete department", "error");
                                    }
                              })
                              .catch((error) => {
                                    sweet_alert("Error", "An unexpected error occurred", "error");
                              });
                  },
            });
      };

      // Handle searching for a department
      const handleSearch = (value) => {
            const filteredDepartments = demoDepartments.filter((department) =>
                  department.name.toLowerCase().includes(value.toLowerCase())
            );
            setDepartments(filteredDepartments);
      };

      return (
            <div className="p-4 space-y-4">
                  <Link
                        to="/admin/configuration"
                        className="group relative inline-flex items-center overflow-hidden rounded bg-blue-500 px-8 py-3 text-white focus:outline-none focus:ring active:bg-blue-600"
                  >
                        <span className="absolute -start-full transition-all group-hover:start-4">
                              <svg
                                    className="h-5 w-5 rtl:rotate-180"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                              >
                                    <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth="2"
                                          d="M10 19l-7-7m0 0l7-7m-7 7h18"
                                    />
                              </svg>
                        </span>
                        <span className="text-sm font-medium transition-all group-hover:ms-4">Back to Configuration</span>
                  </Link>
                  {/* Search and Add Department Section */}
                  <div className="flex justify-between items-center">
                        <Input
                              placeholder="Search departments"
                              prefix={<SearchOutlined />}
                              onChange={(e) => handleSearch(e.target.value)}
                              className="max-w-xs"
                        />
                        <Button
                              type="primary"
                              icon={<PlusOutlined />}
                              onClick={() => setIsModalVisible(true)}
                              className="bg-blue-500 hover:bg-blue-600"
                        >
                              Add Department
                        </Button>
                  </div>

                  {/* Display Departments as Tags */}
                  <div className="flex flex-wrap gap-2">
                        {departments.map((department) => (
                              <Tag
                                    key={department._id}
                                    closable
                                    onClose={(e) => {
                                          e.preventDefault();
                                          handleDeleteDepartment(department._id);
                                    }}
                                    className="bg-blue-100 text-blue-700 border-none rounded-full px-3 py-1"
                                    closeIcon={<CloseOutlined />}
                              >
                                    {department.name}
                              </Tag>
                        ))}
                  </div>

                  {/* Add Department Modal */}
                  <Modal
                        title="Add New Department"
                        visible={isModalVisible}
                        onCancel={() => setIsModalVisible(false)}
                        footer={null}
                  >
                        <Form form={form} onFinish={handleAddDepartment} layout="vertical">
                              <Form.Item
                                    name="name"
                                    label="Department Name"
                                    rules={[{ required: true, message: "Please input the department name!" }]}
                              >
                                    <Input />
                              </Form.Item>
                              <Form.Item>
                                    <Button type="primary" htmlType="submit" className="bg-blue-500 hover:bg-blue-600">
                                          Add Department
                                    </Button>
                              </Form.Item>
                        </Form>
                  </Modal>
            </div>
      );
};

export default Department;
