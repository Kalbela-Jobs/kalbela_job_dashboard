import { useState } from "react";
import JoditEditor from "jodit-react";
import Select from "react-select";
import { skillsArray } from "../../../utils/dashboard_menu";
const Jobs = () => {
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
    salary_type: " ",
    salary: 0,
    office_start_time: "select start time",
    office_end_time: "select End time",
    skills: [],
  });

  const handleSelectChange = (selectedOptions) => {
    setFormData((prevData) => ({
      ...prevData,
      skills: selectedOptions,
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
    console.log("Form Data:", formData);
  };

  const [content, setContent] = useState("");
  const config = {
    height: 300,
  };
  console.log(content);

  return (
    <div className="min-h-screen bg-gray-100  pb-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-4 py-5 sm:px-6">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Jobs
          </h2>
        </div>
        <form onSubmit={handleSubmit} className="px-4 py-5 sm:p-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-1">
            <div>
              <label htmlFor="title" className="block text-md font-semibold">
                Job Title
              </label>
              <input
                type="text"
                name="job_title"
                placeholder="Job Title"
                id="job_title"
                value={formData.title}
                onChange={handleChange}
                required
                className="mt-1 block w-full py-2 px-3 border border-blue-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            <div className="form-control mt-5 mb-6">
              <label>
                <button className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2">
                  Jobs Description
                </button>
              </label>
              <JoditEditor
                className="mt-4"
                config={config}
                value={content}
                tabIndex={2}
                onBlur={(newContent) => setContent(newContent)}
              />
            </div>

            <div className="grid  grid-cols-1 xl:grid-cols-3 gap-3">
              <div>
                <label
                  htmlFor="company"
                  className="block text-md font-semibold"
                >
                  Vacancy
                </label>
                <input
                  type="text"
                  name="vacancy"
                  id="vacancy"
                  placeholder="Vacency info"
                  value={formData.company}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full py-2 px-3 border border-blue-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>

              <div>
                <label htmlFor="type" className="block text-md font-semibold">
                  Job Type
                </label>
                <select
                  name="job_type"
                  id="job_type"
                  value={formData.job_type || ""}
                  onChange={handleChange}
                  className="mt-1 block w-full py-2 px-3 border border-blue-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="" disabled>
                    Select Jobs Type
                  </option>
                  <option>Full-time</option>
                  <option>Part-time</option>
                  <option>Contract</option>
                  <option>Internship</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="country"
                  className="block text-sm font-medium text-gray-700"
                >
                  Country
                </label>
                <select
                  name="country"
                  id="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="mt-1 block w-full py-2 px-3 border border-blue-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="" disabled>
                    Select Country
                  </option>
                  <option value="Bangladesh">Bangladesh</option>
                  <option value="India">India</option>
                  <option value="Pakistan">Pakistan</option>
                  <option value="Nepal">Nepal</option>
                </select>
              </div>
            </div>

            <div className="grid  grid-cols-1 xl:grid-cols-2 gap-3">
              <div>
                <label
                  htmlFor="applicationDeadline"
                  className="block text-md font-semibold"
                >
                  Expiry Date*
                </label>
                <input
                  type="date"
                  name="expire_date"
                  id="expire_date"
                  value={formData.applicationDeadline}
                  onChange={handleChange}
                  className="cursor-pointer mt-1 block w-full py-2 px-3 border border-blue-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>

              <div>
                <label htmlFor="state" className="block text-md font-semibold">
                  State
                </label>
                <select
                  name="state"
                  id="state"
                  value={formData.state}
                  onChange={handleChange}
                  className="mt-1 block w-full py-2 px-3 border border-blue-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="" disabled>
                    Select State
                  </option>
                  <option value="No Idea">No Idea</option>
                  <option value="Dinajpur">Dinajpur</option>
                  <option value="Rangpur">Rangpur</option>
                </select>
              </div>
            </div>

            <div className="grid  grid-cols-1 xl:grid-cols-2 gap-3">
              <div>
                <label htmlFor="type" className="block text-md font-semibold">
                  Category*
                </label>
                <select
                  name="category"
                  id="category"
                  value={formData.category || ""}
                  onChange={handleChange}
                  className="mt-1 block w-full py-2 px-3 border border-blue-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="" disabled>
                    Select Category
                  </option>
                  <option value="software-engineer">Software Engineer</option>
                  <option value="data-analyst">Data Analyst</option>
                  <option value="project-manager">Project Manager</option>
                  <option value="graphic-designer">Graphic Designer</option>
                  <option value="content-writer">Content Writer</option>
                </select>
              </div>

              <div>
                <label htmlFor="type" className="block text-md font-semibold">
                  City
                </label>
                <select
                  name="city"
                  id="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="mt-1 block w-full py-2 px-3 border border-blue-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="" disabled>
                    Select City
                  </option>
                  <option value="">No Idea</option>
                  <option value="dinajpur">Dinajpur</option>
                  <option value="ronpur">Ronpur</option>
                  <option value="dhaka">Dhaka</option>
                  <option value="chittagong">Chittagong</option>
                  <option value="kushtia">Kushtia</option>
                  <option value="khulna">Khulna</option>
                  <option value="barishal">Barishal</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="skills" className="block text-md font-semibold">
                Skills
              </label>
              <Select
                isMulti
                options={skillsArray}
                value={formData.skills}
                onChange={handleSelectChange}
                className="mt-1 block w-full py-2 px-3  bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>

          <div className="grid  grid-cols-1 xl:grid-cols-2 gap-3 mt-16">
            <div>
              <label htmlFor="type" className="block text-md font-semibold">
                Employment Type
              </label>
              <select
                name="employment_type" // Updated to match the state field
                id="employment_type"
                value={formData.employment_type || ""} // Bind to `formData.type`
                onChange={handleChange} // Use the existing `handleChange` method
                className="mt-1 block w-full py-2 px-3 border border-blue-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="" disabled>
                  Select Employment Type
                </option>
                <option value="full-time">Full-time</option>
                <option value="part-time">Part-time</option>
                <option value="contract">Contract</option>
                <option value="internship">Internship</option>
                <option value="temporary">Temporary</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="experience_level"
                className="block text-md font-semibold"
              >
                Experience Level
              </label>
              <select
                name="experience_level"
                id="experience_level"
                value={formData.experience_level || ""}
                onChange={handleChange}
                className="mt-1 block w-full py-2 px-3 border border-blue-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="" disabled>
                  Select Experience Level
                </option>
                <option value="entry-level">Entry Level</option>
                <option value="mid-level">Mid Level</option>
                <option value="senior-level">Senior Level</option>
                <option value="executive-level">Executive Level</option>
                <option value="internship">Internship</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-3 my-3">
            <div>
              <label
                htmlFor="salary_type"
                className="block text-md font-semibold"
              >
                Salary Type
              </label>
              <select
                name="salary_type"
                id="salary_type"
                value={formData.salary_type || ""}
                onChange={handleChange}
                className="mt-1 block w-full py-2 px-3 border border-blue-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="" disabled>
                  Select Salary Type
                </option>
                <option value="hourly">Hourly</option>
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
                <option value="project-based">Project-Based</option>
              </select>
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
              <label
                htmlFor="office_start_time"
                className="block text-md font-semibold"
              >
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
              <label
                htmlFor="office_end_time"
                className="block text-md font-semibold"
              >
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
        </form>
      </div>
    </div>
  );
};

export default Jobs;
