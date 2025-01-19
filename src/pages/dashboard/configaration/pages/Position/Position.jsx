import { PlusOutlined, SearchOutlined, CloseOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Tag } from "antd";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Kalbela_AuthProvider } from "../../../../../context/MainContext";
import { useQuery } from "@tanstack/react-query";

const { confirm } = Modal;

const demoPositions = [
      { _id: "1", name: "Frontend Developer" },
      { _id: "2", name: "Backend Developer" },
      { _id: "3", name: "Fullstack Developer" },
      { _id: "4", name: "Data Scientist" },
      { _id: "5", name: "Project Manager" },
      { _id: "6", name: "DevOps Engineer" },
];

const Position = () => {
      const { user, base_url, } = useContext(Kalbela_AuthProvider);

      const { data: demoPositions = [], isLoading, refetch } = useQuery({
            queryKey: ["demoPositions"],
            queryFn: async () => {
                  const res = await fetch(
                        `${base_url}/config/positions?token=${user._id}`
                  );
                  const data = await res.json();
                  return data.data;
            },
      });
      const [positions, setPositions] = useState(demoPositions);
      const [isModalVisible, setIsModalVisible] = useState(false);
      const [form] = Form.useForm();

      useEffect(() => {
            setPositions(demoPositions);
      }, [demoPositions]);


      const handleAddPosition = (values) => {
            const positionName = values.name.trim();
            const isDuplicate = positions.some(
                  (position) => position.name.toLowerCase() === positionName.toLowerCase()
            );

            if (isDuplicate) {
                  Modal.warning({
                        title: "Duplicate Position",
                        content: "The position name already exists. Please enter a unique name.",
                  });
                  return;
            }

            fetch(`${base_url}/config/add-position?token=${user._id}`, {
                  method: 'POST',
                  headers: {
                        'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({ name: positionName })
            })
                  .then(res => res.json())
                  .then(data => {
                        if (!data.error) {
                              setPositions([...positions, data.data]);
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

      const handleDeletePosition = (id) => {
            confirm({
                  title: "Are you sure you want to delete this position?",
                  icon: <ExclamationCircleOutlined />,
                  okText: "Yes",
                  okType: "danger",
                  cancelText: "No",
                  onOk() {
                        fetch(`${base_url}/config/delete-position?id=${id}&token=${user._id}`, {
                              method: "DELETE",
                              headers: {
                                    "Content-Type": "application/json",
                              },
                        })
                              .then((res) => res.json())
                              .then((data) => {
                                    if (!data.error) {
                                          sweet_alert("Success", "Position deleted successfully!", "success");
                                          refetch(); // Refetch the skill list after deletion.
                                    } else {
                                          sweet_alert("Error", data.message || "Failed to delete position", "error");
                                    }
                              })
                              .catch((error) => {
                                    sweet_alert("Error", "An unexpected error occurred", "error");
                              });
                  },
            });
      };

      const handleSearch = (value) => {
            const filteredPositions = demoPositions.filter((position) =>
                  position.name.toLowerCase().includes(value.toLowerCase())
            );
            setPositions(filteredPositions);
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
                              placeholder="Search positions"
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
                              Add Position
                        </Button>
                  </div>

                  <div className="flex flex-wrap gap-2">
                        {positions.map((position) => (
                              <Tag
                                    key={position._id}
                                    closable
                                    onClose={(e) => {
                                          e.preventDefault();
                                          handleDeletePosition(position._id);
                                    }}
                                    className="bg-green-100 text-green-700 border-none rounded-full px-3 py-1"
                                    closeIcon={<CloseOutlined />}
                              >
                                    {position.name}
                              </Tag>
                        ))}
                  </div>

                  <Modal
                        title="Add New Position"
                        visible={isModalVisible}
                        onCancel={() => setIsModalVisible(false)}
                        footer={null}
                  >
                        <Form form={form} onFinish={handleAddPosition} layout="vertical">
                              <Form.Item
                                    name="name"
                                    label="Position Name"
                                    rules={[{ required: true, message: "Please input the position name!" }]}
                              >
                                    <Input />
                              </Form.Item>
                              <Form.Item>
                                    <Button type="primary" htmlType="submit" className="bg-blue-500 hover:bg-blue-600">
                                          Add Position
                                    </Button>
                              </Form.Item>
                        </Form>
                  </Modal>
            </div>
      );
};

export default Position;
