import React, { useContext, useState } from "react";
import { Select, message, Input, Button, Form, Card, Typography, Spin, Checkbox, DatePicker, Upload } from "antd";
import { useQuery, useMutation } from "@tanstack/react-query";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { experienceLevelOptions, jobTypeOptions, salaryTypeOptions, } from "../../../utils/mockData";
import { Kalbela_AuthProvider } from "../../../context/MainContext";
import sweet_alert from "../../../utils/custom_alert";
import { useNavigate } from "react-router-dom";
import uploadImage from "../../../hooks/upload_image";
import { UploadOutlined } from "@ant-design/icons";
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
      const [cv_email_sent, setCvEmailSent] = useState(false);
      const navigate = useNavigate();

      const [selectedCountry, setSelectedCountry] = useState("Bangladesh"); // Default country is Bangladesh
      const [isLoadingCountries, setIsLoadingCountries] = useState(false);
      const isBangladesh = selectedCountry === "Bangladesh";



      const { data: divisions = [], isLoading: isDivisionsLoading } = useQuery({
            queryKey: ["divisions"],
            queryFn: async () => {
                  const res = await fetch(`${base_url}/config/locations`);
                  const data = await res.json();
                  return data.data.map(division => ({ value: division.name, label: division.name }));
            },
      });

      const { data: countries = [], isLoading: isCountriesLoading } = useQuery({
            queryKey: ["countries"],
            queryFn: async () => {
                  const res = await fetch(`https://restcountries.com/v3.1/all`);
                  const data = await res.json();
                  return data
                        .map((country) => ({
                              label: country.name.common,
                              value: country.name.common,
                        }))
                        .sort((a, b) => a.label.localeCompare(b.label)); // Sort by label (country name)
            },
      });

      const { data: skills = [], isLoading: isSkillsLoading } = useQuery({
            queryKey: ["skills"],
            queryFn: async () => {
                  const res = await fetch(`${base_url}/config/skills`);
                  const data = await res.json();
                  return data.data.map(skill => ({ value: skill.name, label: skill.name }));
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

      const onFinish = async (values) => {



            values?.salary_range && (values.salary_range.currency = 'BDT');
            let workspace_info = workspace;
            if (values.company_data) {
                  workspace_info = workspace_data.find(workspace => workspace._id === values.company_data)
            }
            values.url = `${values.job_title}-${workspace_info.company_website}`
                  .toLowerCase()
                  .replace(/[^a-z0-9-]+/g, '-') // Replace non-alphanumeric characters (excluding '-') with '-'
                  .replace(/--+/g, '-') // Replace multiple '-' with a single '-'
                  .replace(/^-+|-+$/g, ''); // Trim '-' from the start and end

            values.company_info = {
                  name: workspace_info.company_name,
                  logo: workspace_info.logo,
                  website: workspace_info.company_website,
                  company_size: workspace_info.company_size,
                  industry: workspace_info.industry,
                  about: workspace_info.description,
                  company_id: workspace_info._id,
                  company_address: workspace_info?.address ?? ''
            }
            values.location = {
                  division: remote ? null : values.division,
                  location: values?.input_location,
                  district: null,
                  country: selectedCountry,
                  remote: remote
            }
            values.postedBy = {
                  name: user.name,
                  email: user.email,
                  user_id: user._id
            }
            values.cv_email_sent = cv_email_sent;

            const attachment = values?.attachment?.file;

            if (attachment) {
                  values.attachment_url = await uploadImage(attachment);
            }
            delete values.attachment;
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
                                    <Input placeholder="Enter job title" />
                              </Form.Item>

                              {workspace_data.length > 0 && <Form.Item
                                    name="company_data"
                                    label="Company Name"
                                    rules={[{ required: true, message: "Please select a company!" }]} // Custom error message
                              >

                                    <Select
                                          showSearch
                                          filterOption={(input, option) =>
                                                option?.label?.props?.children[1]?.toLowerCase().includes(input.toLowerCase()) // Search by company name
                                          }
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
                                    <Select showSearch options={skills} mode="tags" style={{ width: '100%' }} placeholder="Select or add skills" />
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
                                          <Input placeholder="Number of Vacancies" type="number" />
                                    </Form.Item>
                                    <Form.Item className="w-full" name="expiry_date" label="Deadline" rules={[{ required: true }]}>
                                          <DatePicker disabledDate={(current) => current && current.isBefore(new Date(), "day")} format="DD-MM-YYYY" className="w-full" />
                                    </Form.Item>
                                    <Form.Item className="w-full" name="experience_level" label="Experience Level" rules={[{ required: true }]}>
                                          <Select placeholder="Select an experience level" options={experienceLevelOptions} />
                                    </Form.Item>
                              </div>


                              <div className="flex space-x-4">
                                    <Form.Item className="w-full" name="category" label="Category" rules={[{ required: true }]}>
                                          <Select placeholder="Select a category" showSearch filterOption={(input, option) =>
                                                option?.label?.toLowerCase().includes(input.toLowerCase())
                                          } options={categoryOptions} />
                                    </Form.Item>

                                    <Form.Item className="w-full" name="job_type" label="Job Type" rules={[{ required: true }]}>
                                          <Select placeholder="Select a job type" showSearch filterOption={(input, option) =>
                                                option?.label?.toLowerCase().includes(input.toLowerCase())
                                          } options={jobTypeOptions} />
                                    </Form.Item>

                                    <Form.Item name="salary_type" className="w-full" label="Salary Type" rules={[{ required: true }]}>
                                          <Select placeholder="Select a salary type" showSearch filterOption={(input, option) =>
                                                option?.label?.toLowerCase().includes(input.toLowerCase())
                                          } options={salaryTypeOptions} />
                                    </Form.Item>
                                    <Form.Item className="w-full" name="gender" label="Gender" rules={[{ required: false }]}>
                                          <Select
                                                showSearch
                                                filterOption={(input, option) =>
                                                      option?.label?.toLowerCase().includes(input.toLowerCase())
                                                }
                                                options={[{ value: 'both', label: 'Both Male and Female' }, { value: 'male', label: 'Male' }, { value: 'female', label: 'Female' }, { value: 'others', label: 'Others' }]}
                                                loading={isDivisionsLoading}
                                                placeholder="Select a gender"
                                          />
                                    </Form.Item>

                                    <Form.Item className="w-full" name="age_range" label="Age Range" rules={[{ required: false }]}>
                                          <Input.Group className="w-full flex ">
                                                <Form.Item name={["age_range", "min"]} noStyle rules={[{ required: false }]}>
                                                      <Input placeholder="Min" type="number" />
                                                </Form.Item>

                                                <Form.Item name={["age_range", "max"]} noStyle rules={[{ required: false }]}>
                                                      <Input placeholder="Max" type="number" />
                                                </Form.Item>
                                          </Input.Group>
                                    </Form.Item>

                              </div>

                              <Form.Item name="salary_negotiable" valuePropName="checked">
                                    <Checkbox onClick={(e) => setIsNegotiable(e.target.checked)}>Salary Negotiable</Checkbox>
                              </Form.Item>


                              {!isNegotiable && <div className="flex space-x-4">
                                    <Form.Item className="w-full" label="Salary Range">
                                          <Input.Group compact>
                                                <Form.Item name={["salary_range", "min"]} noStyle rules={[{ required: true }]}>
                                                      <Input style={{ width: '50%' }} placeholder="Min" type="number" />
                                                </Form.Item>

                                                <Form.Item name={["salary_range", "max"]} noStyle rules={[{ required: false }]}>
                                                      <Input style={{ width: '50%' }} placeholder="Max" type="number" />
                                                </Form.Item>
                                          </Input.Group>

                                    </Form.Item>
                                    <Form.Item className="w-full" name={"currency"} label="Currency" rules={[{ required: false }]}>
                                          <Select placeholder="Select a currency" showSearch filterOption={(input, option) =>
                                                option?.label?.toLowerCase().includes(input.toLowerCase())
                                          } options={[{ value: 'BDT', label: 'BDT' }, { value: 'USD', label: 'USD' }, { value: 'EUR', label: 'EUR' }, { value: 'Other', label: 'Other' }]} />
                                    </Form.Item>
                              </div>
                              }

                              {/* when it is negotiable than show here negotiable note  */}
                              {isNegotiable && <Form.Item name="negotiable_note" label="Negotiable Note">
                                    <ReactQuill theme="snow" value={negotiableNote} onChange={setNegotiableNote} />
                              </Form.Item>}



                              <Form.Item name="remote" valuePropName="checked">
                                    <Checkbox onClick={(e) => setRemote(e.target.checked)}> Remote</Checkbox>
                              </Form.Item>
                              <div className="flex space-x-4">
                                    <Form.Item className="w-full" name="country" label="Country" rules={[{ required: false }]}>
                                          <Select
                                                showSearch
                                                filterOption={(input, option) =>
                                                      option?.label?.toLowerCase().includes(input.toLowerCase())
                                                }
                                                defaultValue={{ value: 'Bangladesh', label: 'Bangladesh' }}
                                                options={countries}
                                                loading={isLoadingCountries}
                                                value={selectedCountry}
                                                onChange={(value) => setSelectedCountry(value)}
                                                placeholder="Select a country"
                                          />
                                    </Form.Item>

                                    {/* Conditionally render District (Divisions) if the country is Bangladesh */}
                                    {isBangladesh && !remote && (
                                          <Form.Item className="w-full" name="state" label="District" rules={[{ required: true }]}>
                                                <Select
                                                      showSearch
                                                      filterOption={(input, option) =>
                                                            option?.label?.toLowerCase().includes(input.toLowerCase())
                                                      }
                                                      options={divisions}
                                                      placeholder="Select a division"
                                                />
                                          </Form.Item>
                                    )}

                                    {/* Location Input */}
                                    <Form.Item className="w-full" name="input_location" label="Location" rules={[{ required: false }]}>
                                          <Input type="text" placeholder="Enter a location" />
                                    </Form.Item>

                              </div>





                              <div className="flex space-x-4">

                                    <Form.Item
                                          className=" w-full"
                                          name="attachment"
                                          label="Attachment"
                                          rules={[{ required: false }]}
                                    >
                                          <Upload beforeUpload={() => false} multiple={false} className="w-full">
                                                <Button icon={<UploadOutlined />} block className="w-full">
                                                      Click to Upload
                                                </Button>
                                          </Upload>
                                    </Form.Item>
                                    <Form.Item className="w-full" name="cvEmailSent" label="Job Seeker's CV Sent via Email?" valuePropName="checked">
                                          <Checkbox className="border w-full py-1.5 px-4 rounded" onClick={(e) => setCvEmailSent(e.target.checked)}>Yes, CV sent via email</Checkbox>
                                    </Form.Item>

                                    {cv_email_sent && (
                                          <Form.Item
                                                className="w-full"
                                                name="cvEmailAddress"
                                                label="Enter Job Seeker's Email Address"
                                                rules={[{ required: true, message: 'Please provide the email address' }]}
                                          >
                                                <Input placeholder="example@domain.com" />
                                          </Form.Item>
                                    )}
                              </div>


                              <Form.Item>
                                    <Button type="primary" htmlType="submit" className="w-full">
                                          Add Job
                                    </Button>
                              </Form.Item>
                        </Form>
                  </Card>
            </div>
      );
};

export default Add_Jobs;
