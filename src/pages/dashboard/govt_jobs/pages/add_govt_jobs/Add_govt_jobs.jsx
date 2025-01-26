import React, { useContext, useState } from "react"
import { Form, Input, DatePicker, Upload, Button, Select, InputNumber, message, Divider, Card, Tooltip } from "antd"
import { UploadOutlined } from "@ant-design/icons"
import { useQuery } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import moment from "moment"
import { Kalbela_AuthProvider } from "../../../../../context/MainContext"
import uploadImage from "../../../../../hooks/upload_image"
import { desc } from "framer-motion/client"

const { Option } = Select

const AddEditJobForm = ({ initialValues, isEditing = false }) => {
      const [form] = Form.useForm()
      const [jobFields, setJobFields] = useState([{ key: 1 }])
      const [showTooltip, setShowTooltip] = useState(false)
      const navigate = useNavigate()
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
            // Check if document is provided and upload the document if it exists
            if (values.document?.file) {
                  console.log(values.document);
                  const documentUrl = await uploadImage(values.document.file);  // Upload image and get URL
                  values.document_url = documentUrl;  // Set the document URL to the form data
            }

            try {
                  console.log(values);

                  // Loop over each job field and send each job individually
                  for (let index = 0; index < jobFields.length; index++) {
                        const jobData = {
                              title: values[`title_${index}`],
                              hyperlink: values[`hyperlink_${index}`],
                              organization: JSON.parse(values.org_info),
                              advertisementNo: values.advertisementNo,
                              vacancy: values[`vacancy_${index}`],
                              applicationStartDate: values.applicationStartDate.format("YYYY-MM-DD"),
                              applicationDeadline: values.applicationDeadline.format("YYYY-MM-DD"),
                              uploadDocument: values.document_url,  // Attach the document URL
                        };

                        // Send each job data to the backend
                        const response = await fetch(`${base_url}/jobs/create-govt-jobs`, {
                              method: "POST",
                              headers: {
                                    "Content-Type": "application/json",
                              },
                              body: JSON.stringify(jobData),  // Send single job object
                        });

                        const data = await response.json();

                        if (data.error) {
                              message.error(data.message);  // Show error message for each failed job
                        } else {
                              message.success(`Job ${jobData.title} posted successfully`);  // Success message for each job
                        }
                  }

                  // After posting all jobs, navigate to the job listing page
                  navigate("/admin/govt-jobs");

            } catch (error) {
                  console.error("Submission failed:", error);
                  message.error("Failed to submit the form. Please try again.");  // General error message if something goes wrong
            }
      };

      const handleAddMore = () => {
            const currentValues = form.getFieldsValue()
            const isComplete = jobFields.every((field, index) => {
                  const title = currentValues[`title_${index}`]
                  const vacancy = currentValues[`vacancy_${index}`]
                  const hyperlink = currentValues[`hyperlink_${index}`]
                  return title && vacancy && hyperlink
            })

            if (isComplete) {
                  setJobFields((prev) => [...prev, { key: prev.length + 1 }])
                  setShowTooltip(false)
            } else {
                  setShowTooltip(true)
                  message.error("Please fill out all fields before adding more.")
            }
      }


      const disabledDeadlineDates = (current) => {
            const startDate = form.getFieldValue("applicationStartDate");
            return startDate && current && current.isBefore(startDate, "day");
      };


      return (
            <Card className="p-6">
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
                        <h2 className="text-2xl font-bold mb-4">Job Details</h2>
                        <Divider />



                        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                              <Form.Item
                                    name="org_info"
                                    label="Organization"
                                    rules={[{ required: true, message: "Please select an organization" }]}
                              >
                                    <Select
                                          placeholder="Select an organization"
                                          loading={isLoading}
                                          showSearch
                                          filterOption={(input, option) =>
                                                option?.value && JSON.parse(option.value)?.name?.toLowerCase().includes(input.toLowerCase())
                                          }
                                    >
                                          {organizations.map((org) => (
                                                <Option key={org._id} value={JSON.stringify({ id: org._id, name: org.name, logo: org.logo, description: org.description })}>
                                                      <div className="flex items-center gap-2">
                                                            <img src={org.logo || "/placeholder.svg"} alt={org.name} className="w-6 h-6 rounded-full" />
                                                            <span>{org.name}</span>
                                                      </div>
                                                </Option>
                                          ))}
                                    </Select>
                              </Form.Item>
                              <Form.Item
                                    name="advertisementNo"
                                    label="Advertisement No"
                                    rules={[{ required: true, message: "Please enter advertisement number" }]}
                              >
                                    <Input placeholder="Enter advertisement number" />
                              </Form.Item>


                              <Form.Item
                                    name="applicationStartDate"
                                    label="Application Start Date"
                                    rules={[{ required: true, message: "Please select start date" }]}
                              >
                                    <DatePicker className="w-full" placeholder="Pick a date" format="DD-MM-YYYY" />
                              </Form.Item>

                              <Form.Item
                                    name="applicationDeadline"
                                    label="Application Deadline"
                                    rules={[{ required: true, message: "Please select deadline" }]}
                              >
                                    <DatePicker disabledDate={disabledDeadlineDates} className="w-full" placeholder="Pick a date" format="DD-MM-YYYY" />
                              </Form.Item>
                              <Form.Item
                                    name="document"

                                    label="Upload Document"
                                    className="w-full "
                                    rules={[{ required: true, message: "Please upload a document" }]}
                                    extra="Upload a PDF document for the job listing."
                              >
                                    <Upload className="w-full " maxCount={1} beforeUpload={() => false}>
                                          <Button icon={<UploadOutlined />}>Choose File</Button>
                                    </Upload>
                              </Form.Item>
                        </div>


                        <Divider />
                        {jobFields.map((field, index) => (
                              <div key={field.key} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <Form.Item
                                          name={`title_${index}`}
                                          label={`Title ${index + 1}`}
                                          rules={[{ required: true, message: "Please enter job title" }]}
                                    >
                                          <Input placeholder={`Enter job title ${index + 1}`} />
                                    </Form.Item>
                                    <Form.Item
                                          name={`vacancy_${index}`}
                                          label={`Vacancy ${index + 1}`}
                                          rules={[{ required: true, message: "Please enter vacancy" }]}
                                    >
                                          <InputNumber placeholder={`Enter vacancy ${index + 1}`} min={1} className="w-full" />
                                    </Form.Item>
                                    <Form.Item
                                          name={`hyperlink_${index}`}
                                          label={`Hyper link ${index + 1}`}
                                          rules={[{ required: true, message: "Please enter hyperlink" }]}
                                    >
                                          <Input placeholder={`Enter hyperlink ${index + 1}`} min={1} className="w-full" />
                                    </Form.Item>
                              </div>
                        ))}

                        <Tooltip
                              title="Please fill out all fields before adding more."
                              visible={showTooltip}
                              onVisibleChange={(visible) => setShowTooltip(visible)}
                        >
                              <Button type="dashed" onClick={handleAddMore} className="w-full my-4">
                                    Add More
                              </Button>
                        </Tooltip>

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
