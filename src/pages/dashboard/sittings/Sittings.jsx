import { Kalbela_AuthProvider } from "../../../context/MainContext"
import uploadImage from "../../../hooks/upload_image"
import sweet_alert from "../../../utils/custom_alert"
import { useContext, useState } from "react";
import { Layout, Form, Input, Select, Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useQuery } from "@tanstack/react-query";
import ImgCrop from "antd-img-crop";


const { Content } = Layout;

const companySize = [
      { value: "1-10", label: "1-10 Employees" },
      { value: "11-50", label: "11-50 Employees" },
      { value: "51-100", label: "51-100 Employees" },
      { value: "101-500", label: "101-500 Employees" },
      { value: "501-1000", label: "501-1000 Employees" },
      { value: "1001-5000", label: "1001-5000 Employees" },
      { value: "5001-10000", label: "5001-10,000 Employees" },
      { value: "10001+", label: "10,001+ Employees" },
];

const SettingsPage = () => {
      const [form] = Form.useForm();
      const { user, workspace, base_url, setWorkspace, setCookie } = useContext(Kalbela_AuthProvider);

      const { data: industry = [], isLoading } = useQuery({
            queryKey: ["industries"],
            queryFn: async () => {
                  const res = await fetch(`${base_url}/config/industries?token=${user._id}`);
                  const data = await res.json();
                  return data.data.map((industry) => ({
                        value: industry.name,
                        label: industry.name,
                  }));
            },
      });

      const [previewOpen, setPreviewOpen] = useState(false);
      const [previewImage, setPreviewImage] = useState("");
      const beforeUpload = (file) => {
            const isImage = file.type.startsWith("image/");
            if (!isImage) {
                  message.error("You can only upload image files!");
                  return false;
            }
            return true;
      };

      const onFinish = async (values) => {
            const update_data = {
                  cover_image: values.cover_image?.[0]?.originFileObj
                        ? await uploadImage(values.cover_image[0].originFileObj)
                        : workspace.cover_image,
                  logo: values.logo?.[0]?.originFileObj
                        ? await uploadImage(values.logo[0].originFileObj)
                        : workspace.logo,
                  company_website: values.company_website,
                  company_size: values.company_size,
                  industry: values.industry,
                  address: values.address,
                  description: values.description,
                  website: values.website,
            };

            try {
                  const response = await fetch(`${base_url}/workspace/update?workspace_id=${workspace._id}&token=${user._id}`, {
                        method: 'PATCH',
                        headers: {
                              'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(update_data),
                  });

                  const data = await response.json();

                  if (!data.error) {
                        setWorkspace(data.data);
                        setCookie('kal_bela_jobs_workspace', data.data, 365);
                        sweet_alert("Success", data.message, "success");
                  } else {
                        sweet_alert("Error", data.message, "error");
                  }
            } catch (error) {
                  sweet_alert("Error", "An unexpected error occurred", "error");
                  console.error("Error updating workspace:", error);
            }
      };

      if (isLoading) {
            return <div>Loading...</div>;
      }


      const handleChange = async ({ fileList: newFileList }) => {
            if (newFileList.length) {
                  const file = newFileList[0].originFileObj;
                  const profile_pic = await uploadImage(file);

            }
      };

      return (
            <Layout className="min-h-screen bg-gray-100">
                  <Content className="p-8">
                        <div className="bg-white rounded-lg shadow-md p-6">
                              <h1 className="text-3xl font-bold text-gray-800 mb-6">Update Your Workspace</h1>
                              <Form
                                    form={form}
                                    layout="vertical"
                                    onFinish={onFinish}
                                    initialValues={{
                                          ...workspace,
                                          logo: workspace.logo ? [{ url: workspace.logo, name: "logo" }] : [],
                                          cover_image: workspace.cover_image ? [{ url: workspace.cover_image, name: "cover_image" }] : [],
                                    }}
                              >
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                          <Form.Item
                                                name="company_name"
                                                label="Company Name"
                                                rules={[{ required: true, message: "Please enter your company name" }]}
                                          >
                                                <Input className="w-full px-4 py-2 border rounded-md" readOnly />
                                          </Form.Item>
                                          <Form.Item
                                                name="company_website"
                                                label="Company Unique ID"
                                                rules={[{ required: true, message: "Please enter your company unique ID" }]}
                                          >
                                                <Input className="w-full px-4 py-2 border rounded-md" readOnly />
                                          </Form.Item>
                                          <Form.Item
                                                name="logo"
                                                label="Company Logo"
                                                valuePropName="fileList"
                                                getValueFromEvent={(e) => Array.isArray(e) ? e : e?.fileList}
                                          >
                                                <Upload
                                                      name="logo"
                                                      listType="picture"
                                                      maxCount={1}
                                                      beforeUpload={() => false}
                                                >
                                                      <Button icon={<UploadOutlined />}>Upload Logo</Button>
                                                </Upload>
                                          </Form.Item>
                                          <Form.Item
                                                name="cover_image"
                                                label="Cover Image"
                                                valuePropName="fileList"
                                                getValueFromEvent={(e) => Array.isArray(e) ? e : e?.fileList}
                                          >
                                                <ImgCrop aspect={20 / 9} quality={1}>
                                                      <Upload
                                                            name="cover_image"
                                                            listType="picture"
                                                            maxCount={1}
                                                            beforeUpload={() => false}
                                                      >
                                                            <Button icon={<UploadOutlined />}>Upload Cover Image</Button>
                                                      </Upload>
                                                </ImgCrop>
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
                                                rules={[{ required: true, message: "Please select your industry" }]}
                                          >
                                                <Select
                                                      showSearch
                                                      placeholder="Select industry"
                                                      options={industry}
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
                  </Content >
            </Layout >
      );
};

export default SettingsPage;
