import React, { useContext } from "react"
import { Form, Input, DatePicker, Upload, Button, Select, InputNumber, message, Divider, Card } from "antd"
import { UploadOutlined } from "@ant-design/icons"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import moment from "moment"
import { Kalbela_AuthProvider } from "../../../../../context/MainContext"
import uploadImage from "../../../../../hooks/upload_image"

const { Option } = Select

const AddEditJobForm = ({ initialValues, isEditing = false }) => {
      const [form] = Form.useForm()
      const navigate = useNavigate()
      const queryClient = useQueryClient()
      const { base_url, user } = useContext(Kalbela_AuthProvider)

      // Fetch organizations
      const { data: organizations = [], isLoading } = useQuery({
            queryKey: ["organizations"],
            queryFn: async () => {
                  const res = await fetch(`${base_url}/workspace/get-all-govt-org`)
                  const data = await res.json()
                  return data.data
            },
      })

      const handleSubmit = async (values) => {
            try {
                  // Handle file uploads
                  if (values.document?.file) {
                        const formData = new FormData()
                        formData.append("file", values.document?.[0]?.originFileObj)
                        // Implement your file upload logic here
                        const documentUrl = await uploadImage(formData)
                        values.document_url = documentUrl
                  }

                  // Submit the form data
                  const response = await fetch(`${base_url}/jobs/create-govt-jobs`, {
                        method: "POST",
                        headers: {
                              "Content-Type": "application/json",
                        },
                        body: JSON.stringify(values),
                  })

                  const data = await response.json()

                  if (data.error) {
                        message.error(data.message)
                  } else {
                        message.success("Job posted successfully")
                        navigate("/admin/govt-jobs")
                  }
            } catch (error) {
                  console.error("Submission failed:", error)
                  message.error("Failed to submit the form. Please try again.")
            }
      }

      return (
            <Card className=" p-6">
                  <Form
                        form={form}
                        layout="vertical"
                        onFinish={handleSubmit}
                        initialValues={{
                              ...initialValues,
                              applicationStartDate: initialValues?.applicationStartDate ? moment(initialValues.applicationStartDate) : null,
                              applicationDeadline: initialValues?.applicationDeadline ? moment(initialValues.applicationDeadline) : null,
                        }}
                  >
                        {/* Job Details Section */}
                        <div className="mb-8">
                              <h2 className="text-2xl font-bold mb-4">Job Details</h2>
                              <Divider />

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <Form.Item name="title" label="Title" rules={[{ required: true, message: "Please enter job title" }]}>
                                          <Input placeholder="Enter job title" />
                                    </Form.Item>
                                    <Form.Item
                                          name="org_info"
                                          label="Organization"
                                          rules={[{ required: true, message: "Please select an organization" }]}
                                    >
                                          <Select placeholder="Select an organization" loading={isLoading} showSearch optionFilterProp="children">
                                                {organizations.map((org) => (
                                                      <Option key={org._id} value={JSON.stringify(org)}>
                                                            <div className="flex items-center gap-2">
                                                                  <img src={org.logo || "/placeholder.svg"} alt={org.name} className="w-6 h-6 rounded-full" />
                                                                  <span>{org.name}</span>
                                                            </div>
                                                      </Option>
                                                ))}
                                          </Select>
                                    </Form.Item>

                              </div>


                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <Form.Item
                                          name="advertisementNo"
                                          label="Advertisement No"
                                          rules={[{ required: true, message: "Please enter advertisement number" }]}
                                    >
                                          <Input placeholder="Enter advertisement number" />
                                    </Form.Item>

                                    <Form.Item
                                          name="vacancy"
                                          label="Vacancy"
                                          rules={[{ required: true, message: "Please enter number of vacancies" }]}
                                    >
                                          <InputNumber placeholder="Enter number of vacancies" min={1} className="w-full" />
                                    </Form.Item>
                              </div>
                        </div>

                        {/* Application Dates Section */}
                        <div className="mb-8">
                              <h2 className="text-2xl font-bold mb-4">Application Date</h2>
                              <Divider />

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <Form.Item
                                          name="applicationStartDate"
                                          label="Application Start Date"
                                          rules={[{ required: true, message: "Please select start date" }]}
                                    >
                                          <DatePicker className="w-full" placeholder="Pick a date" format="YYYY-MM-DD" />
                                    </Form.Item>

                                    <Form.Item
                                          name="applicationDeadline"
                                          label="Application Deadline"
                                          rules={[{ required: true, message: "Please select deadline" }]}
                                    >
                                          <DatePicker className="w-full" placeholder="Pick a date" format="YYYY-MM-DD" />
                                    </Form.Item>
                              </div>
                        </div>

                        {/* Additional Information Section */}
                        <div className="mb-8">
                              <h2 className="text-2xl font-bold mb-4">Additional Information</h2>
                              <Divider />
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <Form.Item
                                          className="w-full "
                                          name="document"
                                          label="Upload Document"
                                          rules={[{ required: true, message: "Please upload a document" }]}
                                          extra="Upload a PDF document for the job listing."
                                    >
                                          <Upload maxCount={1} beforeUpload={() => false}>
                                                <Button icon={<UploadOutlined />}>Choose File</Button>
                                          </Upload>
                                    </Form.Item>

                                    <Form.Item
                                          name="hyperlink"
                                          label="Hyperlink"
                                          rules={[
                                                { required: true, message: "Please enter hyperlink" },
                                                { type: "url", message: "Please enter a valid URL" },
                                          ]}
                                          extra="Provide a link to the official job listing."
                                    >
                                          <Input placeholder="Enter hyperlink" />
                                    </Form.Item>
                              </div>
                        </div>

                        <Form.Item>
                              <Button type="primary" htmlType="submit" className="bg-black text-white px-8 h-10 font-medium">
                                    {isEditing ? "Update Job" : "Add Job"}
                              </Button>
                        </Form.Item>
                  </Form>
            </Card>
      )
}

export default AddEditJobForm
