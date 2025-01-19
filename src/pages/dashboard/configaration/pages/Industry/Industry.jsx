import { PlusOutlined, SearchOutlined, CloseOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Tag } from "antd";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import sweet_alert from "../../../../../utils/custom_alert";
import { Kalbela_AuthProvider } from "../../../../../context/MainContext";
import { useQuery } from "@tanstack/react-query";

const { confirm } = Modal;


const Industry = () => {

      const { user, base_url, } = useContext(Kalbela_AuthProvider);
      const { data: demoIndustries = [], isLoading, refetch } = useQuery({
            queryKey: ["demoIndustries"],
            queryFn: async () => {
                  const res = await fetch(
                        `${base_url}/config/industries?token=${user._id}`
                  );
                  const data = await res.json();
                  return data.data;
            },
      });
      const [industries, setIndustries] = useState(demoIndustries);
      const [isModalVisible, setIsModalVisible] = useState(false);
      const [form] = Form.useForm();

      useEffect(() => {
            setIndustries(demoIndustries);
      }, [demoIndustries]);

      const handleAddIndustry = (values) => {
            const industryName = values.name.trim();
            const isDuplicate = industries.some(
                  (industry) => industry.name.toLowerCase() === industryName.toLowerCase()
            );

            if (isDuplicate) {
                  Modal.warning({
                        title: "Duplicate Industry",
                        content: "The industry name already exists. Please enter a unique name.",
                  });
                  return;
            }

            fetch(`${base_url}/config/add-industry?token=${user._id}`, {
                  method: 'POST',
                  headers: {
                        'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({ name: industryName })
            })
                  .then(res => res.json())
                  .then(data => {
                        if (!data.error) {
                              setIndustries([...industries, data.data]);
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

      const handleDeleteIndustry = (id) => {
            confirm({
                  title: "Are you sure you want to delete this industry?",
                  icon: <ExclamationCircleOutlined />,
                  okText: "Yes",
                  okType: "danger",
                  cancelText: "No",
                  onOk() {
                        fetch(`${base_url}/config/delete-industry?id=${id}&token=${user._id}`, {
                              method: "DELETE",
                              headers: {
                                    "Content-Type": "application/json",
                              },
                        })
                              .then((res) => res.json())
                              .then((data) => {
                                    if (!data.error) {
                                          sweet_alert("Success", "Industry deleted successfully!", "success");
                                          refetch();
                                    } else {
                                          sweet_alert("Error", data.message || "Failed to delete industry", "error");
                                    }
                              })
                              .catch((error) => {
                                    sweet_alert("Error", "An unexpected error occurred", "error");
                              });
                  },
            });
      };

      const handleSearch = (value) => {
            const filteredIndustries = demoIndustries.filter((industry) =>
                  industry.name.toLowerCase().includes(value.toLowerCase())
            );
            setIndustries(filteredIndustries);
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

                  <div className="flex justify-between items-center">
                        <Input
                              placeholder="Search industries"
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
                              Add Industry
                        </Button>
                  </div>

                  <div className="flex flex-wrap gap-2">
                        {industries.map((industry) => (
                              <Tag
                                    key={industry._id}
                                    closable
                                    onClose={(e) => {
                                          e.preventDefault();
                                          handleDeleteIndustry(industry._id);
                                    }}
                                    className="bg-green-100 text-green-700 border-none rounded-full px-3 py-1"
                                    closeIcon={<CloseOutlined />}
                              >
                                    {industry.name}
                              </Tag>
                        ))}
                  </div>

                  <Modal
                        title="Add New Industry"
                        visible={isModalVisible}
                        onCancel={() => setIsModalVisible(false)}
                        footer={null}
                  >
                        <Form form={form} onFinish={handleAddIndustry} layout="vertical">
                              <Form.Item
                                    name="name"
                                    label="Industry Name"
                                    rules={[{ required: true, message: "Please input the industry name!" }]}
                              >
                                    <Input />
                              </Form.Item>
                              <Form.Item>
                                    <Button type="primary" htmlType="submit" className="bg-blue-500 hover:bg-blue-600">
                                          Add Industry
                                    </Button>
                              </Form.Item>
                        </Form>
                  </Modal>
            </div>
      );
};

export default Industry;
