import { Layout, Menu, Button, Form, Input, Avatar, Alert, Typography } from 'antd';
import { UserOutlined, CreditCardOutlined, HistoryOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { useContext } from 'react';
import { Kalbela_AuthProvider } from '../../../context/MainContext';


const { Content, Sider } = Layout;
const { Title } = Typography;

export default function Profile() {
      const [form] = Form.useForm();
      const [passwordForm] = Form.useForm();
      const { user } = useContext(Kalbela_AuthProvider)

      const handleUpdate = (values) => {
            console.log('Updated values:', values);
      };

      const handlePasswordChange = (values) => {
            console.log('Password changed:', values);
      };

      return (
            <Layout className="min-h-screen ">
                  {/* <Alert
                        message={
                              <div className="flex justify-between items-center">
                                    <span>
                                          Your company is not verified, please verify your company.{' '}
                                          <Button type="link" className="p-0 text-blue-400">
                                                Details
                                          </Button>
                                    </span>
                                    <Button type="link" className="text-blue-400">
                                          How to verify?
                                    </Button>
                              </div>
                        }
                        type="warning"
                        className="mb-0"
                  /> */}

                  <Layout className="bg-white">
                        <Sider className="bg-white" width={250}>
                              <Title level={4} className="px-6 py-4">
                                    My Account
                              </Title>
                              <Menu
                                    mode="inline"
                                    defaultSelectedKeys={['account']}
                                    items={[
                                          { key: 'account', label: 'Account Information', icon: <UserOutlined /> },
                                          { key: 'subscription', label: 'Subscription', icon: <CreditCardOutlined /> },
                                          { key: 'billing', label: 'Billing', icon: <CreditCardOutlined /> },
                                          { key: 'history', label: 'Payment History', icon: <HistoryOutlined /> },
                                    ]}
                              />
                              <div className="px-6 mt-auto">
                                    <Button danger type="primary" block className="mt-8">
                                          Delete Account
                                    </Button>
                              </div>
                        </Sider>

                        <Content className="p-8">
                              <div className="flex justify-between items-center mb-8">
                                    <Title level={3} className="m-0">
                                          Account Information
                                    </Title>
                                    {/* <Button type="primary" className="bg-blue-500">
                                          Switch To Candidate
                                    </Button> */}
                              </div>

                              <div className="flex gap-8">
                                    <div className="flex-1">
                                          <Title level={4}>Information</Title>
                                          <div className="mb-6 flex items-center gap-4">
                                                <Avatar size={64} icon={<UserOutlined />} />
                                                <Button type="link" className="text-blue-400 p-0">
                                                      Change
                                                </Button>
                                          </div>

                                          <Form
                                                form={form}
                                                layout="vertical"
                                                onFinish={handleUpdate}
                                                initialValues={{ full_name: user.fullName, email: user.email, phone: user.phone }}
                                          >
                                                <div className="grid grid-cols-2 gap-4">
                                                      <Form.Item
                                                            label="Full Name"
                                                            name="full_name"
                                                            required
                                                      >
                                                            <Input />
                                                      </Form.Item>

                                                </div>

                                                <Form.Item
                                                      label={
                                                            <span className="flex items-center gap-2">
                                                                  Email Address <QuestionCircleOutlined />
                                                            </span>
                                                      }
                                                      name="email"
                                                      required
                                                >
                                                      <Input />
                                                </Form.Item>

                                                <Form.Item
                                                      label="Phone Number"
                                                      name="phone"
                                                      required
                                                >
                                                      <Input placeholder="Enter phone number" />
                                                </Form.Item>

                                                <Form.Item>
                                                      <Button type="primary" htmlType="submit" className="bg-blue-400">
                                                            Update
                                                      </Button>
                                                </Form.Item>
                                          </Form>
                                    </div>

                                    <div className="w-96">
                                          <Title level={4}>Change Password</Title>
                                          <Form
                                                form={passwordForm}
                                                layout="vertical"
                                                onFinish={handlePasswordChange}
                                          >
                                                <Form.Item
                                                      label="Current Password"
                                                      name="currentPassword"
                                                      required
                                                >
                                                      <Input.Password />
                                                </Form.Item>

                                                <Form.Item
                                                      label="New Password"
                                                      name="newPassword"
                                                      required
                                                >
                                                      <Input.Password />
                                                </Form.Item>

                                                <Form.Item
                                                      label="Confirm Password"
                                                      name="confirmPassword"
                                                      required
                                                >
                                                      <Input.Password />
                                                </Form.Item>

                                                <Form.Item>
                                                      <Button type="primary" htmlType="submit" block className="bg-blue-400">
                                                            Change Password
                                                      </Button>
                                                </Form.Item>

                                                <Button type="link" className="p-0 text-blue-400">
                                                      How to Change Password?
                                                </Button>
                                          </Form>
                                    </div>
                              </div>
                        </Content>
                  </Layout>
            </Layout>
      );
}
