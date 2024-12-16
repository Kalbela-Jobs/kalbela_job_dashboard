import React, { useEffect, useState } from "react";
import JoditEditor from "jodit-react";
import Select from "react-select";
import { skillsArray } from "../../../utils/dashboard_menu";
import { message } from "antd";
import CreatableSelect from "react-select/creatable";
import { useQuery } from "@tanstack/react-query";
import Link_Button from "../../../components/small_component/Link_Button";
import ReactQuill from "react-quill";

const Add_Jobs = () => {
      const [formData, setFormData] = useState({
            job_title: "",
            vacancy: "",
            job_type: "",
            expire_date: "",
            country: "",
            state: "",
            city: "",
            category: "",
            employment_type: "",
            experience_level: "",
            salary_type: "",
            salary_range: {
                  "min": 0,
                  "max": 0,
                  "currency": "BDT"
            },

            office_start_time: "",
            office_end_time: "",
            skills: [],
      });

      const { data: state = [] } = useQuery({
            queryKey: ["state"],
            queryFn: async () => {
                  const res = await fetch("https://bdapis.com/api/v1.2/divisions");
                  const data = await res.json();
                  return data.data;
            },
      });

      const { data: city = [], isLoading } = useQuery({
            queryKey: ["city", formData.state],
            queryFn: async () => {
                  if (!formData.state) return []; // Avoid fetching if no state is selected
                  const res = await fetch(`https://bdapis.com/api/v1.2/division/${formData.state.value}`);
                  console.log(`https://bdapis.com/api/v1.2/division/${formData.state}`, 'https://bdapis.com/api/v1.2/division/');
                  const data = await res.json();
                  return data.data;
            },
      });




      const divisionOptions = state.map((city) => ({
            value: city.division,
            label: city.division,
      }));


      const city_options = Array.isArray(city) ? city.map((district) => ({
            value: district.district,
            label: district.district,
      })) : [];




      const jobTypeOptions = [
            { value: "full-time", label: "Full-time" },
            { value: "part-time", label: "Part-time" },
            { value: "contract", label: "Contract" },
            { value: "internship", label: "Internship" },
      ];



      const categoryOptions = [
            { value: "software-engineer", label: "Software Engineer" },
            { value: "data-analyst", label: "Data Analyst" },
            { value: "project-manager", label: "Project Manager" },
            { value: "graphic-designer", label: "Graphic Designer" },
            { value: "content-writer", label: "Content Writer" },
      ];

      const employmentTypeOptions = [
            { value: "full-time", label: "Full-time" },
            { value: "part-time", label: "Part-time" },
            { value: "contract", label: "Contract" },
            { value: "internship", label: "Internship" },
            { value: "temporary", label: "Temporary" },
      ];

      const experienceLevelOptions = [
            { value: "entry-level", label: "Entry Level" },
            { value: "mid-level", label: "Mid Level" },
            { value: "senior-level", label: "Senior Level" },
            { value: "executive-level", label: "Executive Level" },
            { value: "internship", label: "Internship" },
      ];

      const salaryTypeOptions = [
            { value: "hourly", label: "Hourly" },
            { value: "monthly", label: "Monthly" },
            { value: "yearly", label: "Yearly" },
            { value: "project-based", label: "Project-Based" },
      ];

      const [description, setDescription] = useState("Jobs Description");
      const [content, setContent] = useState("");

      const handleSelectChange = (selectedOption, actionMeta) => {
            setFormData((prevData) => ({
                  ...prevData,
                  [actionMeta.name]: selectedOption,
            }));
      };

      const handleChange = (e) => {
            const { name, value } = e.target;
            setFormData((prevData) => ({
                  ...prevData,
                  [name]: value,
            }));
      };

      const handleSubmit = (e) => {
            e.preventDefault();
            const submittedData = {
                  ...formData,
                  [description]: content,
            };
            console.log("Submitted data:", submittedData);

            fetch("http://localhost:5005/api/v1/jobs/create", {
                  method: "POST",
                  headers: {
                        "Content-Type": "application/json",
                  },
                  body: JSON.stringify(submittedData),
            })
                  .then((res) => res.json())
                  .then((data) => {
                        message.success("Job added successfully!");
                        console.log("API response:", data);
                  })
                  .catch((error) => {
                        message.error("Failed to add job");
                        console.error("API error:", error);
                  });
      };

      const config = {
            height: 300,
      };

      return (
            <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
                  <Link_Button name='Back to Jobs' url="/admin/jobs/" />
                  <div className="bg-white rounded-lg shadow-md overflow-hidden">
                        <div className="px-4 py-5 sm:px-6">
                              <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                                    Add Jobs
                              </h2>
                        </div>
                        <form onSubmit={handleSubmit} className="px-4 py-5 sm:p-6">
                              <div className="grid grid-cols-1 gap-6 sm:grid-cols-1">
                                    <div>
                                          <label htmlFor="job_title" className="block text-md font-semibold">
                                                Job Title
                                          </label>
                                          <input
                                                type="text"
                                                name="job_title"
                                                placeholder="Job Title"
                                                id="job_title"
                                                value={formData.job_title}
                                                onChange={handleChange}
                                                required
                                                className="mt-1 block w-full py-2 px-3 border border-blue-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                          />
                                    </div>

                                    <div className="form-control mt-5 mb-6">
                                          <div className="flex gap-2 pb-2">
                                                <label>
                                                      <button
                                                            onClick={() => setDescription("Jobs Description")}
                                                            type="button"
                                                            className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
                                                      >
                                                            Jobs Description
                                                      </button>
                                                </label>
                                                <label>
                                                      <button
                                                            onClick={() => setDescription("Responsibility")}
                                                            type="button"
                                                            className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
                                                      >
                                                            Responsibility
                                                      </button>
                                                </label>
                                          </div>
                                          {/* <JoditEditor
                                                className="mt-4"
                                                config={config}
                                                value={content}
                                                tabIndex={2}
                                                onBlur={(newContent) => {
                                                      setContent(newContent);
                                                      console.log(`${description}:`, newContent);
                                                }}
                                          /> */}

                                          <ReactQuill />
                                    </div>

                                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-3">
                                          <div>
                                                <label htmlFor="vacancy" className="block text-md font-semibold">
                                                      Vacancy
                                                </label>
                                                <input
                                                      type="text"
                                                      name="vacancy"
                                                      id="vacancy"
                                                      placeholder="Vacancy info"
                                                      value={formData.vacancy}
                                                      onChange={handleChange}
                                                      required
                                                      className="mt-1 block w-full py-2 px-3 border border-blue-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                                />
                                          </div>

                                          <div>
                                                <label htmlFor="job_type" className="block text-md font-semibold">
                                                      Job Type
                                                </label>
                                                <Select
                                                      name="job_type"
                                                      id="job_type"
                                                      options={jobTypeOptions}
                                                      value={formData.job_type}
                                                      onChange={(selectedOption) => handleSelectChange(selectedOption, { name: "job_type" })}
                                                      className="mt-1"
                                                />
                                          </div>

                                          <div>
                                                <label htmlFor="salary_type" className="block text-md font-semibold">
                                                      Salary Type
                                                </label>
                                                <Select
                                                      name="salary_type"
                                                      id="salary_type"
                                                      options={salaryTypeOptions}
                                                      value={formData.salary_type}
                                                      onChange={(selectedOption) => handleSelectChange(selectedOption, { name: "salary_type" })}
                                                      className="mt-1"
                                                />
                                          </div>
                                    </div>

                                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-3">
                                          <div>
                                                <label htmlFor="expire_date" className="block text-md font-semibold">
                                                      Expiry Date*
                                                </label>
                                                <input
                                                      type="date"
                                                      name="expire_date"
                                                      id="expire_date"
                                                      value={formData.expire_date}
                                                      onChange={handleChange}
                                                      className="cursor-pointer mt-1 block w-full py-2 px-3 border border-blue-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                                />
                                          </div>

                                          <div>
                                                <label htmlFor="category" className="block text-md font-semibold">
                                                      Category*
                                                </label>
                                                <Select
                                                      name="category"
                                                      id="category"
                                                      options={categoryOptions}
                                                      value={formData.category}
                                                      onChange={(selectedOption) => handleSelectChange(selectedOption, { name: "category" })}
                                                      className="mt-1"
                                                />
                                          </div>




                                    </div>

                                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-3">


                                          <div>
                                                <label htmlFor="city" className="block text-md font-semibold">
                                                      Division
                                                </label>
                                                <Select
                                                      isSearchable
                                                      name="state"
                                                      id="state"
                                                      options={divisionOptions}
                                                      value={formData.state}
                                                      onChange={(selectedOption) => handleSelectChange(selectedOption, { name: "state" })}
                                                      placeholder="Select a division"
                                                      className="mt-1"
                                                />
                                          </div>
                                          <div>
                                                <label htmlFor="state" className="block text-md font-semibold">
                                                      State
                                                </label>
                                                <Select
                                                      name="city"
                                                      id="city"
                                                      options={city_options}
                                                      value={formData.city}
                                                      onChange={(selectedOption) => handleSelectChange(selectedOption, { name: "city" })}
                                                      className="mt-1"
                                                />
                                          </div>
                                    </div>

                                    <div>
                                          <label htmlFor="skills" className="block text-md font-semibold">
                                                Skills
                                          </label>
                                          <CreatableSelect
                                                isMulti
                                                name="skills"
                                                options={skillsArray}
                                                value={formData.skills}
                                                onChange={(selectedOptions) => handleSelectChange(selectedOptions, { name: "skills" })}
                                                className="mt-1"
                                          />
                                    </div>

                                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-3 mt-16">
                                          <div>
                                                <label htmlFor="employment_type" className="block text-md font-semibold">
                                                      Employment Type
                                                </label>
                                                <Select
                                                      name="employment_type"
                                                      id="employment_type"
                                                      options={employmentTypeOptions}
                                                      value={formData.employment_type}
                                                      onChange={(selectedOption) => handleSelectChange(selectedOption, { name: "employment_type" })}
                                                      className="mt-1"
                                                />
                                          </div>

                                          <div>
                                                <label htmlFor="experience_level" className="block text-md font-semibold">
                                                      Experience Level
                                                </label>
                                                <Select
                                                      name="experience_level"
                                                      id="experience_level"
                                                      options={experienceLevelOptions}
                                                      value={formData.experience_level}
                                                      onChange={(selectedOption) => handleSelectChange(selectedOption, { name: "experience_level" })}
                                                      className="mt-1"
                                                />
                                          </div>
                                    </div>

                                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-3 my-3">


                                          <div>
                                                <label htmlFor="salary" className="block text-md font-semibold">
                                                      Salary
                                                </label>
                                                <input
                                                      type="number"
                                                      name="salary"
                                                      id="salary"
                                                      value={formData.salary || ""}
                                                      onChange={handleChange}
                                                      placeholder="Enter salary amount"
                                                      className="mt-1 block w-full py-2 px-3 border border-blue-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                                />
                                          </div>
                                          <div>
                                                <label htmlFor="salary" className="block text-md font-semibold">
                                                      Salary
                                                </label>
                                                <input
                                                      type="number"
                                                      name="salary"
                                                      id="salary"
                                                      value={formData.salary || ""}
                                                      onChange={handleChange}
                                                      placeholder="Enter salary amount"
                                                      className="mt-1 block w-full py-2 px-3 border border-blue-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                                />
                                          </div>
                                    </div>

                                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-3 my-3">
                                          <div>
                                                <label htmlFor="office_start_time" className="block text-md font-semibold">
                                                      Office Start Time
                                                </label>
                                                <input
                                                      type="time"
                                                      name="office_start_time"
                                                      id="office_start_time"
                                                      value={formData.office_start_time || ""}
                                                      onChange={handleChange}
                                                      className="mt-1 block w-full py-2 px-3 border border-blue-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                                />
                                          </div>

                                          <div>
                                                <label htmlFor="office_end_time" className="block text-md font-semibold">
                                                      Office End Time
                                                </label>
                                                <input
                                                      type="time"
                                                      name="office_end_time"
                                                      id="office_end_time"
                                                      value={formData.office_end_time || ""}
                                                      onChange={handleChange}
                                                      className="mt-1 block w-full py-2 px-3 border border-blue-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                                />
                                          </div>
                                    </div>

                                    <div className="mt-6">
                                          <button
                                                type="submit"
                                                className="w-1/3 mx-auto inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                          >
                                                Add Job
                                          </button>
                                    </div>
                              </div>
                        </form>
                  </div>
            </div>
      );
};

export default Add_Jobs;
