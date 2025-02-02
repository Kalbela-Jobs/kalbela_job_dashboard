import React, { useContext, useState } from "react";
import { Modal, Form, Input, Upload, Button, Table, Popconfirm } from "antd";
import { ContainerFilled, UploadOutlined } from "@ant-design/icons";
import uploadImage from "../../../../../hooks/upload_image";
import { Kalbela_AuthProvider } from "../../../../../context/MainContext";
import sweet_alert from "../../../../../utils/custom_alert";
import { useQuery } from "@tanstack/react-query";
import Link_Button from "../../../../../components/small_component/Link_Button";

const AddGovtOrgWithTable = () => {

      const { base_url, user } = useContext(Kalbela_AuthProvider)
      const { data: organizations = [], isLoading, refetch } = useQuery({
            queryKey: ["workspace-hr"],

            queryFn: async () => {
                  const res = await fetch(
                        `${base_url}/workspace/get-all-govt-org`
                  );
                  const data = await res.json();
                  return data.data;
            },
      });

      console.log(organizations, 'organizations');

      const [isModalVisible, setIsModalVisible] = useState(false);
      const [form] = Form.useForm();


      // Handle form submission to add new organization
      const handleAddIndustry = async (values) => {
            const orgLogo = values.govtOrgLogo?.[0]?.originFileObj;
            const newOrganization = {
                  key: Date.now(), // unique key
                  name: values.govtOrgName,
                  description: values.orgDescription,
                  logo: await uploadImage(orgLogo),
            };

            console.log(newOrganization, 'newOrganization');

            fetch(`${base_url}/workspace/create-govt-org`, {
                  method: "POST",
                  headers: {
                        "Content-Type": "application/json",
                  },
                  body: JSON.stringify(newOrganization),
            })
                  .then((res) => res.json())
                  .then((data) => {
                        if (!data.error) {
                              sweet_alert("Success", data.message, "success");
                              refetch();
                              form.resetFields();
                              setIsModalVisible(false);
                        } else {
                              sweet_alert("Error", data.message, "error");
                        }
                  });
      };

      // Handle delete organization
      const handleDelete = (key) => {
            fetch(`${base_url}/workspace/delete-govt-org?govt_org_id=${key}`, {
                  method: "DELETE",
                  headers: {
                        "Content-Type": "application/json",
                  },

            })
                  .then((res) => res.json())
                  .then((data) => {
                        if (!data.error) {
                              sweet_alert("Success", data.message, "success");
                              refetch();
                        } else {
                              sweet_alert("Error", data.message, "error");
                        }
                  });
      };

      // Table columns
      const columns = [
            {
                  title: "Logo",
                  dataIndex: "logo",
                  key: "logo",
                  render: (logo) => (
                        <img
                              className="w-10 h-10 border border-gray-200 object-contain rounded"
                              src={logo}
                              alt="Org Logo"
                        />
                  ),
            },
            {
                  title: "Name",
                  dataIndex: "name",
                  key: "name",
                  responsive: ["sm"],
            },
            {
                  title: "Description",
                  dataIndex: "description",
                  key: "description",
                  responsive: ["md"],
                  render: (description) => <p className="whitespace-pre-wrap">{description}</p>, // Handles multi-line text
            },

            {
                  title: "Actions",
                  key: "actions",
                  render: (_, record) => (
                        <Popconfirm
                              title="Are you sure to delete this organization?"
                              onConfirm={() => handleDelete(record._id)}
                              okText="Yes"
                              cancelText="No"
                        >
                              <Button danger>Delete</Button>
                        </Popconfirm>
                  ),
            },
      ];

      return (
            <div className="p-4">

                  <div className='flex gap-4 items-center'>
                        <Link_Button name='Back to Government Jobs' url="/admin/govt-jobs" />
                        <div className="pb-4">
                              <button
                                    className="group relative inline-flex items-center overflow-hidden rounded bg-gray-900 px-8 py-3 text-white focus:outline-none focus:ring active:bg-gray-500"
                                    onClick={() => setIsModalVisible(true)}
                              >
                                    <span className="absolute -start-full transition-all group-hover:start-4">
                                          <svg
                                                className="size-5 rtl:rotate-180"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                          >
                                                <path
                                                      strokeLinecap="round"
                                                      strokeLinejoin="round"
                                                      strokeWidth="2"
                                                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                                                />
                                          </svg>
                                    </span>

                                    <span className="text-sm font-medium transition-all capitalize group-hover:ms-4"> Add Govt Organization </span>
                              </button>
                        </div>
                        {/* <Link_Button name='Add Govt Organization' onClick={() => setIsModalVisible(true)} /> */}
                  </div>


                  {/* Table to display organizations */}
                  <Table
                        columns={columns}
                        dataSource={organizations}
                        bordered
                        pagination={{ pageSize: 5 }}
                        scroll={{ x: 600 }}
                  />

                  {/* Modal for adding organization */}
                  <Modal
                        title="Add Government Organization"
                        visible={isModalVisible}
                        onCancel={() => setIsModalVisible(false)}
                        footer={null}
                  >
                        <Form form={form} onFinish={handleAddIndustry} layout="vertical">
                              {/* Govt Organization Name */}
                              <Form.Item
                                    name="govtOrgName"
                                    label="Govt Organization Name"
                                    rules={[{ required: true, message: "Please input the government organization name!" }]}
                              >
                                    <Input />
                              </Form.Item>

                              {/* Govt Organization Description */}
                              <Form.Item
                                    name="orgDescription"
                                    label="Organization Description"
                                    rules={[{ required: true, message: "Please input the organization description!" }]}
                              >
                                    <Input.TextArea rows={4} placeholder="Enter multi-line text here" />
                              </Form.Item>

                              {/* Govt Organization Logo */}
                              <Form.Item
                                    name="govtOrgLogo"
                                    label="Govt Organization Logo"
                                    valuePropName="fileList"
                                    getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
                                    rules={[{ required: true, message: "Please upload the government organization logo!" }]}
                              >
                                    <Upload
                                          name="logo"
                                          listType="picture"
                                          maxCount={1}
                                          beforeUpload={() => false} // Prevent auto-upload
                                    >
                                          <Button icon={<UploadOutlined />}>Upload Logo</Button>
                                    </Upload>
                              </Form.Item>

                              {/* Submit Button */}
                              <Form.Item>
                                    <Button type="primary" htmlType="submit" className="bg-blue-500 hover:bg-blue-600">
                                          Add Govt Organization
                                    </Button>
                              </Form.Item>
                        </Form>
                  </Modal>
            </div>
      );
};

export default AddGovtOrgWithTable;
