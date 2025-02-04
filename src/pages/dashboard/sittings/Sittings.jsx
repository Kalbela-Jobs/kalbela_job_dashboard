import { useContext, useState } from "react"
import { Layout, Tabs, Form, Input, Select, Upload, Button } from "antd"
import { UploadOutlined } from "@ant-design/icons"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
import { useQuery } from "@tanstack/react-query"
import { Kalbela_AuthProvider } from "../../../context/MainContext"

const { Sider, Content } = Layout
const { TabPane } = Tabs

const companySize = [
      { value: "1-10", label: "1-10 Employees" },
      { value: "11-50", label: "11-50 Employees" },
      { value: "51-100", label: "51-100 Employees" },
      { value: "101-500", label: "101-500 Employees" },
      { value: "501-1000", label: "501-1000 Employees" },
      { value: "1001-5000", label: "1001-5000 Employees" },
      { value: "5001-10000", label: "5001-10,000 Employees" },
      { value: "10001+", label: "10,001+ Employees" },
]



const SettingsPage = () => {
      const [form] = Form.useForm()
      const [activeTab, setActiveTab] = useState("1")
      const { user, workspace, base_url } = useContext(Kalbela_AuthProvider)

      const { data: industry = [], isLoading, refetch } = useQuery({
            queryKey: ["demoIndustries"],
            queryFn: async () => {
                  const res = await fetch(
                        `${base_url}/config/industries?token=${user._id}`
                  );
                  const data = await res.json();
                  const industries = data.data.map((industry) => ({
                        value: industry.name,
                        label: industry.name,
                  }));

                  return industries;

            },
      });

      const workspaceInfo = workspace || {}

      const onFinish = (values) => {
            console.log("Form values:", values)
            // Handle form submission
      }

      return (
            <Layout className="min-h-screen bg-gray-100">

                  <Content className="p-8">
                        <div className=" bg-white rounded-lg shadow-md p-6">
                              <h1 className="text-3xl font-bold text-gray-800 mb-6">Update Your Workspace</h1>
                              <Form
                                    form={form}
                                    layout="vertical"
                                    onFinish={onFinish}
                                    initialValues={{
                                          ...workspaceInfo,
                                          logo: workspaceInfo.logo ? [{ url: workspaceInfo.logo, name: "logo" }] : [],
                                          trade_license: workspaceInfo.trade_license ? [{ url: workspaceInfo.trade_license, name: "license" }] : [],
                                    }}
                              >
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                          <Form.Item
                                                name="company_name"
                                                label="Company Name"
                                                rules={[{ required: true,  message: "Please enter your company name" }]}
                                          >
                                                <Input className="w-full read-only px-4 py-2 border rounded-md" />
                                          </Form.Item>
                                          <Form.Item
                                                name="company_website"
                                                label="Company Unique ID"
                                                rules={[{ required: true, message: "Please enter your company unique ID" }]}
                                          >
                                                <Input className="w-full px-4 py-2 border rounded-md" />
                                          </Form.Item>
                                          <Form.Item
                                                name="logo"
                                                label="Company Logo"
                                                valuePropName="fileList"
                                                getValueFromEvent={(e) => {
                                                      if (Array.isArray(e)) {
                                                            return e
                                                      }
                                                      return e && e.fileList
                                                }}

                                          >
                                                <Upload
                                                      name="logo"
                                                      listType="picture"
                                                      maxCount={1}
                                                      beforeUpload={() => false} // Prevent auto upload
                                                >
                                                      <Button icon={<UploadOutlined />}>Upload Logo</Button>
                                                </Upload>
                                          </Form.Item>
                                          <Form.Item
                                                name="trade_license"
                                                label="Trade License Copy"
                                                valuePropName="fileList"
                                                getValueFromEvent={(e) => {
                                                      if (Array.isArray(e)) {
                                                            return e
                                                      }
                                                      return e && e.fileList
                                                }}
                                          >
                                                <Upload
                                                      name="license"
                                                      listType="picture"
                                                      maxCount={1}
                                                      beforeUpload={() => false} // Prevent auto upload
                                                >
                                                      <Button icon={<UploadOutlined />}>Upload License</Button>
                                                </Upload>
                                          </Form.Item>
                                          <Form.Item
                                                name="company_size"
                                                label="Company Size"
                                                rules={[{ required: true, message: "Please select your company size" }]}
                                          >
                                                <Select options={companySize} />
                                          </Form.Item>
                                          <Form.Item name="website" label="Company Website">
                                                <Input className="w-full px-4 py-2 border rounded-md" />
                                          </Form.Item>
                                          <Form.Item
                                                name="industry"
                                                label="Industry"
                                                initialValue={workspaceInfo.industry}
                                                rules={[{ required: true, message: "Please select your industry" }]}
                                          >
                                                <Select
                                                      showSearch
                                                      value={workspaceInfo.industry} // Ensure the selected value is always controlled
                                                      placeholder="Select industry"
                                                      options={industry} // Pass industry options
                                                      onChange={(value) => form.setFieldsValue({ industry: value })} // Update form value when selection changes
                                                />
                                          </Form.Item>
                                          <Form.Item
                                                name="address"
                                                label="Company Address"
                                                rules={[{ required: true, message: "Please enter your company address" }]}
                                          >
                                                <Input className="w-full px-4 py-2 border rounded-md" />
                                          </Form.Item>
                                    </div>
                                    <Form.Item name="description" label="Company Description" className="col-span-2">
                                          <ReactQuill theme="snow" />
                                    </Form.Item>
                                    <Form.Item>
                                          <Button
                                                type="primary"
                                                htmlType="submit"
                                                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                                          >
                                                Update Workspace
                                          </Button>
                                    </Form.Item>
                              </Form>
                        </div>
                  </Content>
            </Layout>
      )
}

export default SettingsPage
