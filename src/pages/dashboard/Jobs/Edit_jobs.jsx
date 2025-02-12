import React, { useContext, useState } from "react";
import { Select, message, Input, Button, Form, Card, Typography, Spin, Checkbox } from "antd";
import { useQuery, useMutation } from "@tanstack/react-query";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { experienceLevelOptions, jobTypeOptions, salaryTypeOptions, } from "../../../utils/mockData";
import { Kalbela_AuthProvider } from "../../../context/MainContext";
import sweet_alert from "../../../utils/custom_alert";
import { format } from "date-fns";
// import { categoryOptions, experienceLevelOptions, jobTypeOptions, salaryTypeOptions, whQuestions } from "../utils/mockData";

const { Title } = Typography;

const Edit_jobs = ({ data, set_modal, refetch }) => {

      console.log(data, 'data');
      const [form] = Form.useForm();
      const { base_url, workspace, user } = useContext(Kalbela_AuthProvider)
      const [jobDescription, setJobDescription] = useState(data?.job_description || "");
      const [responsibilities, setResponsibilities] = useState(data?.responsibilities || "");
      const [benefit, setBenefit] = useState(data?.benefit || "");

      const [isNegotiable, setIsNegotiable] = useState(data?.salary_negotiable);
      const [negotiableNote, setNegotiableNote] = useState(data?.negotiableNote || "");
      const [remote, setRemote] = useState(data?.remote);
      const [selectedCountry, setSelectedCountry] = useState(data?.location?.country == 'BD' ? "Bangladesh" : data?.location?.country || "Bangladesh"); // Default country is Bangladesh
      const [isLoadingCountries, setIsLoadingCountries] = useState(false);
      const isBangladesh = selectedCountry === "Bangladesh";
      const [cv_email_sent, setCvEmailSent] = useState(data?.cvEmailSent);

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
            console.log("Form values:", data.company_info);
            values?.salary_range && (values.salary_range.currency = 'BDT');
            // values.url = genarate slag form job title and company name
            values.url = `${values.job_title}-${data.company_info.name}`
                  .toLowerCase()
                  .replace(/[^a-z0-9\s-]/g, "") // Remove invalid characters
                  .replace(/\s+/g, "-")         // Replace spaces with dashes
                  .replace(/^-+|-+$/g, "");
            values.location = {
                  division: remote ? null : values.state,
                  district: remote ? null : values.district,
                  country: selectedCountry,
                  remote: remote,
                  location: values.input_location,
            }

            const attachment = values?.attachment?.[0]?.originFileObj;

            if (attachment) {
                  values.attachment_url = await uploadImage(attachment);
            }
            delete values.attachment;

            delete values.state;
            delete values.district;
            fetch(`${base_url}/jobs/update?job_id=${data._id}`, {
                  method: "PUT",
                  headers: {
                        "Content-Type": "application/json",
                  },
                  body: JSON.stringify(values),
            }).then((res) => res.json())
                  .then((data) => {
                        if (!data.error) {
                              refetch();
                              set_modal(false);
                              sweet_alert("Success", data.message, "success");
                              navigate("/admin/jobs");
                        } else {
                              sweet_alert("Error", data.message, "error");
                        }
                  });
      };

      return (

            <div className="">

                  <Form
                        form={form}
                        name="add_job"
                        onFinish={onFinish}
                        layout="vertical"
                        className="space-y-6 mt-4"
                  >
                        <Form.Item name="job_title" label="Job Title" initialValue={data?.job_title} rules={[{ required: true }]}>
                              <Input defaultValue={data?.job_title} />
                        </Form.Item>

                        <Form.Item name="skills" label="Skills" initialValue={data?.skills} rules={[{ required: true }]}>
                              <Select mode="tags" defaultValue={data?.skills} style={{ width: '100%' }} placeholder="Select or add skills" />
                        </Form.Item>

                        <div className="flex justify-between items-center mb-4">
                              <Title level={4}>Job Description</Title>
                              <Button onClick={handleGenerateDescription} loading={generateJobDescriptionMutation.isLoading}>
                                    Generate with AI
                              </Button>
                        </div>

                        <Form.Item name="job_description" label="Job Description" initialValue={data?.job_description} rules={[{ required: true }]}>
                              <ReactQuill theme="snow" value={jobDescription} onChange={setJobDescription} />
                        </Form.Item>

                        <Form.Item name="responsibilities" label="Responsibilities" initialValue={data?.responsibilities} rules={[{ required: true }]}>
                              <ReactQuill theme="snow" value={responsibilities} onChange={setResponsibilities} />
                        </Form.Item>

                        <Form.Item name="benefit" label="Benefits" initialValue={data?.benefit} rules={[{ required: true }]}>
                              <ReactQuill theme="snow" value={benefit} onChange={setBenefit} />
                        </Form.Item>

                        <div className="flex space-x-4">
                              <Form.Item className="w-full whitespace-nowrap" name="vacancy" label="Number of Vacancies" initialValue={data?.vacancy} rules={[{ required: false }]}>
                                    <Input defaultValue={data?.vacancy} type="number" />
                              </Form.Item>
                              <Form.Item className="w-full" name="expiry_date" label="Deadline" initialValue={format(data?.expiry_date || new Date(), 'yyyy-MM-dd')} rules={[{ required: true }]}>
                                    <Input defaultValue={data?.expiry_date} type="date" />
                              </Form.Item>
                              <Form.Item className="w-full" name="gender" label="Gender" initialValue={data?.gender} rules={[{ required: false }]}>
                                    <Select
                                          showSearch
                                          defaultValue={data?.gender}
                                          filterOption={(input, option) =>
                                                option?.label?.toLowerCase().includes(input.toLowerCase())
                                          }
                                          options={[{ value: 'both', label: 'Both Male and Female' }, { value: 'male', label: 'Male' }, { value: 'female', label: 'Female' }, { value: 'others', label: 'Others' }]}
                                          loading={isDivisionsLoading}
                                          placeholder="Select a gender"
                                    />
                              </Form.Item>
                              <Form.Item className="w-full" initialValue={data?.experience_level} name="experience_level" label="Experience Level" rules={[{ required: true }]}>
                                    <Select defaultValue={data?.experience_level} options={experienceLevelOptions} />
                              </Form.Item>

                        </div>


                        <div className="flex space-x-4">
                              <Form.Item className="w-full" name="category" label="Category" initialValue={data?.category} rules={[{ required: true }]}>
                                    <Select showSearch defaultValue={data?.category} options={categoryOptions} />
                              </Form.Item>

                              <Form.Item className="w-full" name="job_type" label="Job Type" initialValue={data?.job_type} rules={[{ required: true }]}>
                                    <Select showSearch defaultValue={data?.job_type} options={jobTypeOptions} />
                              </Form.Item>
                              <Form.Item name="salary_type" className="w-full" label="Salary Type" initialValue={data?.salary_type} rules={[{ required: true }]}>
                                    <Select showSearch defaultValue={data?.salary_type} options={salaryTypeOptions} />
                              </Form.Item>
                              <Form.Item className="w-full" name="age_range" initialValue={data?.age_range} label="Age Range" rules={[{ required: false }]}>
                                    <Input.Group className="w-full flex ">
                                          <Form.Item name={["age_range", "min"]} defaultValue={data?.age_range?.min} noStyle rules={[{ required: false }]}>
                                                <Input defaultValue={data?.age_range?.min} placeholder="Min" type="number" />
                                          </Form.Item>

                                          <Form.Item name={["age_range", "max"]} defaultValue={data?.age_range?.max} noStyle rules={[{ required: false }]}>
                                                <Input defaultValue={data?.age_range?.max} placeholder="Max" type="number" />
                                          </Form.Item>
                                    </Input.Group>
                              </Form.Item>
                        </div>



                        <Form.Item name="salary_negotiable" label="Salary Negotiable" initialValue={data?.salary_negotiable} valuePropName="checked">
                              <Checkbox defaultChecked={data?.salary_negotiable} onClick={(e) => setIsNegotiable(e.target.checked)}>Salary Negotiable</Checkbox>
                        </Form.Item>


                        {!isNegotiable && <Form.Item label="Salary Range">
                              <Input.Group compact>
                                    <Form.Item name={["salary_range", "min"]} initialValue={data?.salary_range?.min} defaultValue={data?.salary_range?.min} noStyle rules={[{ required: false }]}>
                                          <Input defaultValue={data?.salary_range?.min} style={{ width: '50%' }} placeholder="Min" type="number" />
                                    </Form.Item>

                                    <Form.Item name={["salary_range", "max"]} initialValue={data?.salary_range?.max} defaultValue={data?.salary_range?.max} noStyle rules={[{ required: false }]}>
                                          <Input defaultValue={data?.salary_range?.max} style={{ width: '50%' }} placeholder="Max" type="number" />
                                    </Form.Item>
                              </Input.Group>
                        </Form.Item>
                        }

                        {/* when it is negotiable than show here negotiable note  */}
                        {isNegotiable && <Form.Item name="negotiable_note" initialValue={data?.negotiable_note} label="Negotiable Note">
                              <ReactQuill defaultValue={data?.negotiable_note} theme="snow" value={negotiableNote} onChange={setNegotiableNote} />
                        </Form.Item>}



                        <Form.Item name="remote" initialValue={data?.remote} valuePropName="checked">
                              <Checkbox defaultChecked={data?.remote} onClick={(e) => setRemote(e.target.checked)}> Remote</Checkbox>
                        </Form.Item>
                        {/* {!remote && <Form.Item name="state" initialValue={data?.state} label="Division" rules={[{ required: true }]}>
                              <Select
                                    defaultValue={data?.state}
                                    options={divisions}
                                    loading={isDivisionsLoading}
                                    placeholder="Select a division"
                              />
                        </Form.Item>} */}

                        <div className="flex space-x-4">
                              <Form.Item className="w-full" name="country" label="Country" rules={[{ required: false }]}>
                                    <Select
                                          showSearch
                                          filterOption={(input, option) =>
                                                option?.label?.toLowerCase().includes(input.toLowerCase())
                                          }
                                          defaultValue={{ value: 'Bangladesh', label: 'Bangladesh' }}
                                          options={countries}
                                          loading={isCountriesLoading}
                                          value={selectedCountry}
                                          onChange={(value) => setSelectedCountry(value)}
                                          placeholder="Select a country"
                                    />
                              </Form.Item>

                              {isBangladesh && !remote && (
                                    <Form.Item className="w-full" initialValue={data?.location?.division} name="state" label="District" rules={[{ required: true }]}>
                                          <Select
                                                mode="multiple"
                                                showSearch
                                                defaultValue={data?.location?.division}
                                                filterOption={(input, option) =>
                                                      option?.label?.toLowerCase().includes(input.toLowerCase())
                                                }
                                                options={divisions}
                                                placeholder="Select a division"
                                          />
                                    </Form.Item>
                              )}

                              <Form.Item className="w-full" initialValue={data?.location?.location} name="input_location" label="Location" rules={[{ required: false }]}>
                                    <Input type="text" defaultValue={data?.location?.location} placeholder="Enter a location" />
                              </Form.Item>

                        </div>


                        <div className="flex space-x-4">
                              <Form.Item className="w-full" name="attachment" label="Attachment" rules={[{ required: false }]}>
                                    <Input type="file" />
                              </Form.Item>
                              <Form.Item defaultValue={data?.cv_email_sent} className="w-full" name="cvEmailSent" label="Job Seeker's CV Sent via Email?" valuePropName="checked">
                                    <Checkbox defaultChecked={data?.cv_email_sent} className="border w-full py-1.5 px-4 rounded" onClick={(e) => setCvEmailSent(e.target.checked)}>Yes, CV sent via email</Checkbox>
                              </Form.Item>

                              {cv_email_sent && (
                                    <Form.Item
                                          initialValue={data?.cvEmailAddress}
                                          className="w-full"
                                          name="cvEmailAddress"
                                          label="Enter Job Seeker's Email Address"
                                          rules={[{ required: true, message: 'Please provide the email address' }]}
                                    >
                                          <Input placeholder="example@domain.com" />
                                    </Form.Item>
                              )}
                        </div>


                        {/* <Form.Item name="wh_questions" label="WH Questions">
                                    <Select mode="multiple" options={whQuestions} placeholder="Select WH questions" />
                              </Form.Item> */}

                        <Form.Item>
                              <Button type="primary" htmlType="submit" className="w-full">
                                    Update Job
                              </Button>
                        </Form.Item>
                  </Form>
            </div>

      );
};

export default Edit_jobs;
