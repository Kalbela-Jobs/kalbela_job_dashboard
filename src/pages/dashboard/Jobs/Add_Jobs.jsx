import React, { useContext, useState } from "react";
import { Select, message, Input, Button, Form, Card, Typography, Spin, Checkbox } from "antd";
import { useQuery, useMutation } from "@tanstack/react-query";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { experienceLevelOptions, jobTypeOptions, salaryTypeOptions, } from "../../../utils/mockData";
import { Kalbela_AuthProvider } from "../../../context/MainContext";
import sweet_alert from "../../../utils/custom_alert";
import { useNavigate } from "react-router-dom";
// import { categoryOptions, experienceLevelOptions, jobTypeOptions, salaryTypeOptions, whQuestions } from "../utils/mockData";

const { Title } = Typography;

const Add_Jobs = () => {
      const [form] = Form.useForm();
      const { base_url, workspace, user } = useContext(Kalbela_AuthProvider)
      const [jobDescription, setJobDescription] = useState("");
      const [responsibilities, setResponsibilities] = useState("");
      const [benefit, setBenefit] = useState("");
      const [isNegotiable, setIsNegotiable] = useState(false);
      const [negotiableNote, setNegotiableNote] = useState("");
      const [remote, setRemote] = useState(false);
      const navigate = useNavigate();


      const { data: divisions = [], isLoading: isDivisionsLoading } = useQuery({
            queryKey: ["divisions"],
            queryFn: async () => {
                  const res = await fetch("https://bdapis.com/api/v1.2/divisions");
                  const data = await res.json();
                  return data.data.map(division => ({ value: division.division, label: division.division }));
            },
      });

      const { data: workspace_data = [], isLoading, refetch } = useQuery({
            queryKey: ["workspace_data", user.role === "supper_admin"],

            queryFn: async () => {
                  const res = await fetch(`${base_url}/workspace`);
                  const data = await res.json();
                  return data.data.workspaces;
            },

            // Only enable the query if the user is a "supper_admin"
            enabled: user.role === "supper_admin",
      });



      console.log(workspace_data, "workspace_data");

      const { data: categoryOptions = [], } = useQuery({
            queryKey: ["categoryOptions"],
            queryFn: async () => {
                  const res = await fetch(`${base_url}/category`);
                  const data = await res.json();
                  return data.data.map(category => ({
                        value: category._id,
                        label: category.name,
                  }));
            },

      });
      const { data: jobTypeOptions = [], } = useQuery({
            queryKey: ["jobTypeOptions"],
            queryFn: async () => {
                  const res = await fetch(`${base_url}/job-type`);
                  const data = await res.json();
                  return data.data.map(jobType => ({
                        value: jobType.name,
                        label: jobType.name,
                  }));
            },

      });

      const generateJobDescriptionMutation = useMutation({
            mutationFn: async (data) => {
                  const response = await fetch(`${base_url}/ai/generate-job-description`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(data),
                  });
                  const result = await response.json(); // Assuming the API returns a JSON response
                  return result.data; // Assuming `result.data` contains the full job description string
            },
            onSuccess: (data) => {
                  try {
                        // Parse the job description to extract responsibilities
                        const responsibilitiesStart = data.indexOf("Responsibilities:");
                        const requirementsStart = data.indexOf("Requirements:");
                        console.log("responsibilitiesStart", responsibilitiesStart, requirementsStart);

                        // Extract responsibilities and job description
                        const jobDescription = data.substring(0, responsibilitiesStart).trim();
                        const responsibilities = data
                              .substring(responsibilitiesStart + "Responsibilities:".length, requirementsStart)
                              .trim();
                        console.log(jobDescription, responsibilities, 'result');
                        // Set state with extracted data
                        setJobDescription(jobDescription);
                        setResponsibilities(responsibilities.split("\n").filter(Boolean)); // Split into array by line and remove empty lines

                        message.success("Job description and responsibilities generated successfully!");
                  } catch (error) {
                        console.error("Error parsing job description:", error);
                        message.error("Failed to process the job description.");
                  }
            },
            onError: () => {
                  message.error("Failed to generate job description and responsibilities");
            },
      });


      const handleGenerateDescription = () => {
            const jobTitle = form.getFieldValue("job_title");
            const skills = form.getFieldValue("skills");
            const companyName = form.getFieldValue("Bright Future Soft");
            if (jobTitle && skills) {
                  generateJobDescriptionMutation.mutate({ jobTitle, skills, companyName });
            } else {
                  message.warning("Please enter a job title and select skills before generating");
            }
      };

      const onFinish = (values) => {

            values?.salary_range && (values.salary_range.currency = 'BDT');
            let workspace_info = workspace;
            if (values.company_data) {
                  workspace_info = workspace_data.find(workspace => workspace._id === values.company_data)
            }
            values.url = `${values.job_title}-${workspace_info.company_website}`.toLowerCase().replace(/ /g, "-");

            values.company_info = {
                  name: workspace_info.company_name,
                  logo: workspace_info.logo,
                  website: workspace_info.company_website,
                  company_size: workspace_info.company_size,
                  industry: workspace_info.industry,
                  about: workspace_info.description,
                  company_id: workspace_info._id
            }
            values.location = {
                  division: remote ? null : values.division,
                  district: null,
                  country: 'BD',
                  remote: remote
            }
            values.postedBy = {
                  name: user.name,
                  email: user.email,
                  user_id: user._id
            }
            delete values.division;
            fetch(`${base_url}/jobs/create`, {
                  method: "POST",
                  headers: {
                        "Content-Type": "application/json",
                  },
                  body: JSON.stringify(values),
            }).then((res) => res.json())
                  .then((data) => {
                        if (!data.error) {
                              sweet_alert("Success", data.message, "success");
                              navigate("/admin/jobs");
                        } else {
                              sweet_alert("Error", data.message, "error");
                        }
                  });
      };

      return (
            <div className=" bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
                  <Card className="">
                        <Title level={2} className="text-center mb-8">Add New Job</Title>
                        <Form
                              form={form}
                              name="add_job"
                              onFinish={onFinish}
                              layout="vertical"
                              className="space-y-6"
                        >
                              <Form.Item name="job_title" label="Job Title" rules={[{ required: true }]}>
                                    <Input />
                              </Form.Item>

                              {workspace_data.length > 0 && <Form.Item
                                    name="company_data"
                                    label="Company Name"
                                    rules={[{ required: true, message: "Please select a company!" }]} // Custom error message
                              >
                                    {/* <Select
                                          options={workspace_data.map((workspace) => ({
                                                value: workspace._id,
                                                label: workspace.company_name,
                                          }))}
                                          placeholder="Select a company"
                                    /> */}

                                    <Select
                                          options={workspace_data.map((workspace) => ({
                                                value: workspace._id,
                                                label: (
                                                      <div className="flex items-center">
                                                            <img
                                                                  src={workspace.logo}
                                                                  alt={workspace.company_name}
                                                                  className="w-6 h-6 object-cover rounded-full mr-2"
                                                            />
                                                            {workspace.company_name}
                                                      </div>
                                                ),
                                          }))}
                                          placeholder="Select a company"
                                    />
                              </Form.Item>}

                              <Form.Item name="skills" label="Skills" rules={[{ required: true }]}>
                                    <Select mode="tags" style={{ width: '100%' }} placeholder="Select or add skills" />
                              </Form.Item>

                              <div className="flex justify-between items-center mb-4">
                                    <Title level={4}>Job Description</Title>
                                    <Button onClick={handleGenerateDescription} loading={generateJobDescriptionMutation.isLoading}>
                                          Generate with AI
                                    </Button>
                              </div>

                              <Form.Item name="job_description" label="Job Description" rules={[{ required: true }]}>
                                    <ReactQuill theme="snow" value={jobDescription} onChange={setJobDescription} />
                              </Form.Item>

                              <Form.Item name="responsibilities" label="Responsibilities" rules={[{ required: true }]}>
                                    <ReactQuill theme="snow" value={responsibilities} onChange={setResponsibilities} />
                              </Form.Item>
                              <Form.Item name="benefit" label="Benefits" rules={[{ required: true }]}>
                                    <ReactQuill theme="snow" value={benefit} onChange={setBenefit} />
                              </Form.Item>

                              <div className="flex space-x-4">
                                    <Form.Item className="w-full" name="vacancy" label="Number of Vacancies" rules={[{ required: true }]}>
                                          <Input type="number" />
                                    </Form.Item>
                                    <Form.Item className="w-full" name="expiry_date" label="Deadline" rules={[{ required: true }]}>
                                          <Input type="date" />
                                    </Form.Item>
                              </div>


                              <div className="flex space-x-4">
                                    <Form.Item className="w-full" name="category" label="Category" rules={[{ required: true }]}>
                                          <Select options={categoryOptions} />
                                    </Form.Item>

                                    <Form.Item className="w-full" name="job_type" label="Job Type" rules={[{ required: true }]}>
                                          <Select options={jobTypeOptions} />
                                    </Form.Item>
                              </div>

                              <Form.Item name="salary_type" label="Salary Type" rules={[{ required: true }]}>
                                    <Select options={salaryTypeOptions} />
                              </Form.Item>

                              <Form.Item name="salary_negotiable" valuePropName="checked">
                                    <Checkbox onClick={(e) => setIsNegotiable(e.target.checked)}>Salary Negotiable</Checkbox>
                              </Form.Item>


                              {!isNegotiable && <Form.Item label="Salary Range">
                                    <Input.Group compact>
                                          <Form.Item name={["salary_range", "min"]} noStyle rules={[{ required: true }]}>
                                                <Input style={{ width: '50%' }} placeholder="Min" type="number" />
                                          </Form.Item>

                                          <Form.Item name={["salary_range", "max"]} noStyle rules={[{ required: true }]}>
                                                <Input style={{ width: '50%' }} placeholder="Max" type="number" />
                                          </Form.Item>
                                    </Input.Group>
                              </Form.Item>
                              }

                              {/* when it is negotiable than show here negotiable note  */}
                              {isNegotiable && <Form.Item name="negotiable_note" label="Negotiable Note">
                                    <ReactQuill theme="snow" value={negotiableNote} onChange={setNegotiableNote} />
                              </Form.Item>}



                              <Form.Item name="remote" valuePropName="checked">
                                    <Checkbox onClick={(e) => setRemote(e.target.checked)}> Remote</Checkbox>
                              </Form.Item>
                              {!remote && <Form.Item name="state" label="Division" rules={[{ required: true }]}>
                                    <Select
                                          options={divisions}
                                          loading={isDivisionsLoading}
                                          placeholder="Select a division"
                                    />
                              </Form.Item>}



                              <Form.Item name="experience_level" label="Experience Level" rules={[{ required: true }]}>
                                    <Select options={experienceLevelOptions} />
                              </Form.Item>

                              <Form.Item name="attachment" label="Attachment" rules={[{ required: false }]}>
                                    <Input type="file" />
                              </Form.Item>

                              {/* <Form.Item name="wh_questions" label="WH Questions">
                                    <Select mode="multiple" options={whQuestions} placeholder="Select WH questions" />
                              </Form.Item> */}

                              <Form.Item>
                                    <Button type="primary" htmlType="submit" className="w-full">
                                          Add Job
                                    </Button>
                              </Form.Item>
                        </Form>
                  </Card>
            </div >
      );
};

export default Add_Jobs;
