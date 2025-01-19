import { PlusOutlined, SearchOutlined, CloseOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Tag } from "antd";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Kalbela_AuthProvider } from "../../../../../context/MainContext";
import sweet_alert from "../../../../../utils/custom_alert";
import { useQuery } from "@tanstack/react-query";

const { confirm } = Modal;



const Skills = () => {


      const { user, base_url, } = useContext(Kalbela_AuthProvider);

      const { data: demoSkills = [], isLoading, refetch } = useQuery({
            queryKey: ["demoSkills"],
            queryFn: async () => {
                  const res = await fetch(
                        `${base_url}/config/skills?token=${user._id}`
                  );
                  const data = await res.json();
                  return data.data;
            },
      });
      const [skills, setSkills] = useState([]);

      const [isModalVisible, setIsModalVisible] = useState(false);
      const [form] = Form.useForm();


      useEffect(() => {
            setSkills(demoSkills);
      }, [demoSkills]);


      const handleAddSkill = (values) => {
            const skillName = values.name.trim();
            const isDuplicate = skills.some((skill) => skill.name.toLowerCase() === skillName.toLowerCase());

            if (isDuplicate) {
                  Modal.warning({
                        title: "Duplicate Skill",
                        content: "The skill name already exists. Please enter a unique name.",
                  });
                  return;
            }
            console.log(skillName);

            fetch(`${base_url}/config/create-skill?token=${user._id}`, {
                  method: 'POST',
                  headers: {
                        'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({ name: skillName })
            })
                  .then(res => res.json())
                  .then(data => {
                        if (!data.error) {
                              refetch();
                              setSkills([...skills, data.data]);
                              setIsModalVisible(false);
                        }
                        else {
                              sweet_alert("Error", data.message, "error");
                        }
                  });

            form.resetFields();
      };

      const handleDeleteSkill = (id) => {
            console.log(id);
            confirm({
                  title: "Are you sure you want to delete this skill?",
                  icon: <ExclamationCircleOutlined />,
                  okText: "Yes",
                  okType: "danger",
                  cancelText: "No",
                  onOk() {
                        fetch(`${base_url}/config/delete-skill?id=${id}&token=${user._id}`, {
                              method: "DELETE",
                              headers: {
                                    "Content-Type": "application/json",
                              },
                        })
                              .then((res) => res.json())
                              .then((data) => {
                                    if (!data.error) {
                                          sweet_alert("Success", "Skill deleted successfully!", "success");
                                          refetch(); // Refetch the skill list after deletion.
                                    } else {
                                          sweet_alert("Error", data.message || "Failed to delete skill", "error");
                                    }
                              })
                              .catch((error) => {
                                    sweet_alert("Error", "An unexpected error occurred", "error");
                              });
                  },
            });
      };

      const handleSearch = (value) => {
            const filteredSkills = demoSkills.filter((skill) =>
                  skill.name.toLowerCase().includes(value.toLowerCase())
            );
            setSkills(filteredSkills);
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
                              placeholder="Search skills"
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
                              Add Skill
                        </Button>
                  </div>

                  <div className="flex flex-wrap gap-2">
                        {skills.map((skill) => (
                              <Tag
                                    key={skill._id}
                                    closable
                                    onClose={(e) => {
                                          e.preventDefault();
                                          handleDeleteSkill(skill._id);
                                    }}
                                    className="bg-blue-100 text-blue-700 border-none rounded-full px-3 py-1"
                                    closeIcon={<CloseOutlined />}
                              >
                                    {skill.name}
                              </Tag>
                        ))}
                  </div>

                  <Modal
                        title="Add New Skill"
                        visible={isModalVisible}
                        onCancel={() => setIsModalVisible(false)}
                        footer={null}
                  >
                        <Form form={form} onFinish={handleAddSkill} layout="vertical">
                              <Form.Item
                                    name="name"
                                    label="Skill Name"
                                    rules={[{ required: true, message: "Please input the skill name!" }]}
                              >
                                    <Input />
                              </Form.Item>
                              <Form.Item>
                                    <Button type="primary" htmlType="submit" className="bg-blue-500 hover:bg-blue-600">
                                          Add Skill
                                    </Button>
                              </Form.Item>
                        </Form>
                  </Modal>
            </div>
      );
};

export default Skills;
