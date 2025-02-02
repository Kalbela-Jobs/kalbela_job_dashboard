"use client"

import { Layout, Form, Input, Button, Typography, Avatar } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { useContext } from 'react';
import { Kalbela_AuthProvider } from '../../../context/MainContext';
import ProfilePic from './components/Profile_pic';
import sweet_alert from '../../../utils/custom_alert';

const { Content } = Layout;
const { Title } = Typography;

export default function ProfileSettings() {
      const [profileForm] = Form.useForm();
      const [passwordForm] = Form.useForm();
      const { user, workspace, setUser, setCookie, base_url } = useContext(Kalbela_AuthProvider);

      const handleUpdate = (values) => {
            console.log('Profile updated:', values);
            fetch(`${base_url}/user/update-profile?id=${user._id}`, {
                  method: "PUT",
                  headers: {
                        "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                        full_name: values.full_name,
                        phone: values.phone,
                  }),
            })
                  .then((res) => res.json())
                  .then((data) => {
                        setUser(data.data);
                        setCookie("kal_bela_jobs_user", data.data, 365);
                        sweet_alert('success', 'Profile updated successfully!');
                  });
      };

      const handlePasswordChange = (values) => {
            console.log('Password changed:', values);
      };

      return (
            <div className="min-h-screen ">
                  <div>
                        <Content className="p-8">
                              <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                                    {/* Left Section - Information */}
                                    <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                                          <Title level={4} className="mb-6">Information</Title>

                                          <div className="flex gap-8 mb-6">
                                                <div>
                                                      <ProfilePic />
                                                </div>

                                                <Form
                                                      form={profileForm}
                                                      layout="vertical"
                                                      onFinish={handleUpdate}
                                                      className="flex-1"
                                                      initialValues={{
                                                            full_name: user?.fullName || user?.name,
                                                            email: user?.email,
                                                            phone: user?.phone || workspace?.phone
                                                      }}
                                                >
                                                      <div className="">
                                                            <Form.Item
                                                                  label="Full Name*"
                                                                  name="full_name"
                                                                  rules={[{ required: true, message: 'Please input your full name!' }]}
                                                            >
                                                                  <Input placeholder="Full name" />
                                                            </Form.Item>


                                                      </div>

                                                      <Form.Item
                                                            label={
                                                                  <span className="flex items-center gap-2">
                                                                        Email Address* <QuestionCircleOutlined className="text-gray-400" />
                                                                  </span>
                                                            }
                                                            name="email"
                                                            rules={[
                                                                  { required: true, message: 'Please input your email!' },
                                                                  { type: 'email', message: 'Please enter a valid email!' }
                                                            ]}
                                                      >
                                                            <Input disabled placeholder="Email address" />
                                                      </Form.Item>

                                                      <Form.Item
                                                            label="Phone Number*"
                                                            name="phone"
                                                            rules={[{ required: true, message: 'Please input your phone number!' }]}
                                                      >
                                                            <Input placeholder="Enter phone number" />
                                                      </Form.Item>

                                                      <Form.Item>
                                                            <Button
                                                                  type="primary"
                                                                  htmlType="submit"
                                                                  className="bg-[#1677ff] hover:bg-[#4096ff]"
                                                            >
                                                                  Update
                                                            </Button>
                                                      </Form.Item>
                                                </Form>
                                          </div>
                                    </div>

                                    {/* Right Section - Change Password */}
                                    <div className="bg-white p-6 rounded-lg shadow-sm">
                                          <Title level={4} className="mb-6">Change Password</Title>

                                          <Form
                                                form={passwordForm}
                                                layout="vertical"
                                                onFinish={handlePasswordChange}
                                          >
                                                <Form.Item
                                                      label="Current Password*"
                                                      name="current_password"
                                                      rules={[{ required: true, message: 'Please input your current password!' }]}
                                                >
                                                      <Input.Password placeholder="********" />
                                                </Form.Item>

                                                <Form.Item
                                                      label="New Password*"
                                                      name="new_password"
                                                      rules={[{ required: true, message: 'Please input your new password!' }]}
                                                >
                                                      <Input.Password placeholder="********" />
                                                </Form.Item>

                                                <Form.Item
                                                      label="Confirm Password*"
                                                      name="confirm_password"
                                                      rules={[
                                                            { required: true, message: 'Please confirm your password!' },
                                                            ({ getFieldValue }) => ({
                                                                  validator(_, value) {
                                                                        if (!value || getFieldValue('new_password') === value) {
                                                                              return Promise.resolve();
                                                                        }
                                                                        return Promise.reject(new Error('The two passwords do not match!'));
                                                                  },
                                                            }),
                                                      ]}
                                                >
                                                      <Input.Password placeholder="********" />
                                                </Form.Item>

                                                <Form.Item>
                                                      <Button
                                                            type="primary"
                                                            htmlType="submit"
                                                            block
                                                            className="bg-[#1677ff] hover:bg-[#4096ff]"
                                                      >
                                                            Change Password
                                                      </Button>
                                                </Form.Item>

                                                <Button type="link" className="p-0 text-[#1677ff]">
                                                      How to Change Password?
                                                </Button>
                                          </Form>
                                    </div>
                              </div>
                        </Content>
                  </div>
            </div>
      );
}
