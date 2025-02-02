


import { PlusOutlined, SearchOutlined, CloseOutlined, ExclamationCircleOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Tag, Upload } from "antd";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import sweet_alert from "../../../../../utils/custom_alert";
import { Kalbela_AuthProvider } from "../../../../../context/MainContext";
import { useQuery } from "@tanstack/react-query";
import uploadImage from "../../../../../hooks/upload_image";

const { confirm } = Modal;


const Hero_logo = () => {

      const { user, base_url, } = useContext(Kalbela_AuthProvider);
      const { data: demoHero_logo = [], isLoading, refetch } = useQuery({
            queryKey: ["demoHero_logo"],
            queryFn: async () => {
                  const res = await fetch(
                        `${base_url}/config/hero-logo?token=${user._id}`
                  );
                  const data = await res.json();
                  return data.data;
            },
      });
      const [hero_logo, setHero_logo] = useState(demoHero_logo);
      const [isModalVisible, setIsModalVisible] = useState(false);
      const [form] = Form.useForm();

      useEffect(() => {
            setHero_logo(demoHero_logo);
      }, [demoHero_logo]);

      const handleAddHeroLogo = async (values) => {
            console.log(values, 'values');

            const uploadedLogos = await Promise.all(
                  values.companyLogo.map(async (file) => {
                        return await uploadImage(file.originFileObj);
                  })
            );

            uploadedLogos.forEach((logo) => {
                  const data = {
                        logo,
                        name: values.companyName
                  };

                  fetch(`${base_url}/config/hero-logo?token=${user._id}`, {
                        method: 'POST',
                        headers: {
                              'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(data)
                  })
                        .then(res => res.json())
                        .then(data => {
                              if (!data.error) {
                                    refetch();
                              }
                              else {
                                    sweet_alert("Error", data.message, "error");
                              }
                        });
            });

            sweet_alert("Success", "Hero logo added successfully!", "success");
            setIsModalVisible(false);
            form.resetFields();
      };

      const handleDeleteHeroLogo = (id) => {
            confirm({
                  title: "Are you sure you want to delete this hero logo?",
                  icon: <ExclamationCircleOutlined />,
                  okText: "Yes",
                  okType: "danger",
                  cancelText: "No",
                  onOk() {
                        fetch(`${base_url}/config/delete-hero-logo?id=${id}&token=${user._id}`, {
                              method: "DELETE",
                              headers: {
                                    "Content-Type": "application/json",
                              },
                        })
                              .then((res) => res.json())
                              .then((data) => {
                                    if (!data.error) {
                                          sweet_alert("Success", "Hero logo deleted successfully!", "success");
                                          refetch();
                                    } else {
                                          sweet_alert("Error", data.message || "Failed to delete hero logo", "error");
                                    }
                              })
                              .catch((error) => {
                                    sweet_alert("Error", "An unexpected error occurred", "error");
                              });
                  },
            });
      };

      const handleSearch = (value) => {
            const filteredHero_logo = hero_logo.filter((hero_logo) =>
                  hero_logo.name.toLowerCase().includes(value.toLowerCase())
            );
            setHero_logo(filteredHero_logo);
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
                              placeholder="Search Hero Logos"
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
                              Add Hero Logo
                        </Button>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                        {hero_logo.map((logo) => (
                              <div
                                    key={logo._id}
                                    className="relative group size-80 bg-gray-100 rounded-lg overflow-hidden shadow hover:shadow-lg"
                              >
                                    {/* Logo Image */}
                                    <img
                                          src={logo.logo} // Replace `logo.logo` with the actual field name for the logo URL
                                          alt={logo.name}
                                          className="w-full h-full object-scale-down"
                                    />

                                    {/* Overlay for Name and Close Button */}
                                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity">

                                          <span className="text-white text-sm font-medium">{logo.name}</span>

                                          {/* Close Button */}
                                          <button
                                                onClick={(e) => {
                                                      e.preventDefault();
                                                      handleDeleteHeroLogo(logo._id);
                                                }}
                                                className="mt-2 size-8 text-white  bg-red-500 hover:bg-red-600 rounded-full p-1 focus:outline-none"
                                          >
                                                <CloseOutlined className="w-4 h-4" />
                                          </button>
                                    </div>
                              </div>
                        ))}
                  </div>


                  <Modal
                        title="Add New Hero Logo"
                        visible={isModalVisible}
                        onCancel={() => setIsModalVisible(false)}
                        footer={null}
                  >
                        <Form form={form} onFinish={handleAddHeroLogo} layout="vertical">

                              {/* Company Name */}
                              <Form.Item
                                    name="companyName"
                                    label="Company Name"
                                    rules={[{ required: true, message: "Please input the company name!" }]}
                              >
                                    <Input />
                              </Form.Item>

                              {/* Company Logo */}
                              <Form.Item
                                    name="companyLogo"
                                    label="Company Logo"
                                    valuePropName="fileList"
                                    getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
                                    rules={[{ required: true, message: "Please upload the company logo!" }]}
                              >
                                    <Upload
                                          name="logo"
                                          listType="picture"
                                          maxCount={10}
                                          beforeUpload={() => false} // Prevent auto-upload
                                    >
                                          <Button icon={<UploadOutlined />}>Upload Logo</Button>
                                    </Upload>
                              </Form.Item>

                              {/* Submit Button */}
                              <Form.Item>
                                    <Button type="primary" htmlType="submit" className="bg-blue-500 hover:bg-blue-600">
                                          Add Hero Logo
                                    </Button>
                              </Form.Item>
                        </Form>
                  </Modal>

            </div>
      );
};

export default Hero_logo;
