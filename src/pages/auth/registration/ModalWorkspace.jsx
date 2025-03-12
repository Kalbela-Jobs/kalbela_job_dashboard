import React, { useContext, useEffect, useRef, useState } from "react";
import { Form, Input, Button, Select, Typography, Layout, Space } from "antd";
import {
  GlobalOutlined,
  EnvironmentOutlined,
  LinkOutlined,
} from "@ant-design/icons";
import "./modalWokspace.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useQuery } from "@tanstack/react-query";
import uploadImage from "../../../hooks/upload_image";
import { Kalbela_AuthProvider } from "../../../context/MainContext";
import sweet_alert from "../../../utils/custom_alert";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;
const { Content } = Layout;

export default function ModalWorkspace({ controlWidth }) {
  const { user, base_url, setWorkspace, setUser, setCookie } =
    useContext(Kalbela_AuthProvider);
  const [select_package, setSelectPackage] = useState(null);
  const [companyWebsite, setCompanyWebsite] = useState("");
  const [companyName, setCompanyName] = useState("");

  console.log(user, "user");

  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState("");

  const quillRef = useRef(null);

  const generateWebsite = (name) => {
    return name
      ?.toLowerCase()
      .replace(/[^a-z0-9]/g, "") // Remove special characters
      .replace(/\s+/g, ""); // Remove spaces
  };

  console.log(companyName, "companyName");
  const { Option } = Select;

  useEffect(() => {
    if (user?.name) {
      console.log(user.name, "user.name");
      setCompanyName(user.name);
      setCompanyWebsite(generateWebsite(user.name));
    }
  }, [user?.name]);
  const handleCompanyNameChange = (e) => {
    const name = e.target.value;
    setCompanyName(name);
    if (!companyWebsite || companyWebsite === generateWebsite(companyName)) {
      setCompanyWebsite(generateWebsite(name));
    }
  };

  const handleCompanyWebsiteChange = (e) => {
    const sanitizedValue = e.target.value
      .replace(/[^a-zA-Z0-9-]/g, "")
      ?.toLowerCase();
    setCompanyWebsite(sanitizedValue);
  };

  const { data: packages = [] } = useQuery({
    queryKey: ["packages"],
    queryFn: async () => {
      const res = await fetch("https://server.kalbelajobs.com/api/v1/package");
      const data = await res.json();
      return data.data;
    },
  });

  useEffect(() => {
    if (packages.length > 0) {
      setSelectPackage(packages[0]);
    }
  }, [packages]);

  const {
    data: industry = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["demoIndustries"],
    queryFn: async () => {
      const res = await fetch(
        `${base_url}/config/industries?token=${user._id}`
      );
      const data = await res.json();
      return data.data;
    },
  });

  const companySize = [
    {
      value: "1-10",
      label: "1-10 Employees",
    },
    {
      value: "11-50",
      label: "11-50 Employees",
    },
    {
      value: "51-100",
      label: "51-100 Employees",
    },
    {
      value: "101-500",
      label: "101-500 Employees",
    },
    {
      value: "501-1000",
      label: "501-1000 Employees",
    },
    {
      value: "1001-5000",
      label: "1001-5000 Employees",
    },
    {
      value: "5001-10000",
      label: "5001-10,000 Employees",
    },
    {
      value: "10001+",
      label: "10,001+ Employees",
    },
  ];

  const navigate = useNavigate();

  const create_workspace = async (e) => {
    e.preventDefault();
    setLoading(true);
    const form_data = e.target;
    const file = form_data.logo.files[0];
    const license = form_data?.license?.files[0];
    const logo_url = await uploadImage(file); // Assuming file is defined somewhere
    let license_url = ""; // Use 'let' here instead of 'const'
    if (license) {
      license_url = await uploadImage(license); // Now you can reassign 'license_url'
    }

    const company_size = form_data.company_size.value;
    const industry = form_data.industry.value;
    const address = form_data.address.value;

    const data = {
      company_name: companyName,
      company_website: companyWebsite,
      logo: logo_url,
      description,
      company_size,
      industry,
      address,
      trade_license: license_url,
      package: select_package?._id,
      website: form_data?.website?.value,
      staff: [
        {
          name: user.name,
          _id: user._id,
          role: "supper_admin",
        },
      ],
    };

    fetch(`${base_url}/workspace/create?token=${user._id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "data");
        if (!data.error) {
          setLoading(false);
          sweet_alert("Success", data.message, "success");
          setWorkspace(data.data.workspace);
          setUser(data.data.user);
          setCookie("kal_bela_jobs_workspace", data.data.workspace, 365);
          setCookie("kal_bela_jobs_user", data.data.user, 365);
          navigate("/admin");
        } else {
          setLoading(false);
          sweet_alert("Error", data.message, "error");
        }
      })
      .catch((error) => {
        setLoading(false);
        sweet_alert("Error", error.message, "error");
      });
  };

  const handleDescriptionChange = (value) => {
    setDescription(value);
  };

  return (
    <div className="relative py-12 overflow-hidden bg-white sm:py-16 lg:py-20 xl:py-24">
      <div className="relative px-4 mx-auto max-w-7xl sm:px-6 bg-white lg:px-8">
        <div className="">
          <h2 className="text-[24px] font-semibold text-black sm:text-4xl lg:text-5xl xl:text-6xl">
            Create your workspace
          </h2>
          <p className="mt-4 text-base font-normal text-gray-800 sm:text-lg">
            We're here to help you with your hiring needs.
          </p>
        </div>
        <div className="grid grid-cols-1 mt-12 sm:mt-16 lg:mt-20 lg:grid-cols-6 lg:gap-x-24 gap-y-12">
          <div className="space-y-8 lg:space-y-12 lg:col-span-2 lg:order-last">
            <div className="mt-6">
              <p className="text-base font-bold text-gray-800">
                Choose Package
              </p>
              <div
                className={`${
                  controlWidth
                    ? "grid grid-cols-2 gap-4 mt-5 lg:grid-cols-1 "
                    : "grid grid-cols-1 gap-4 mt-5 sm:grid-cols-2 "
                }`}
              >
                {packages.map((item, index) => (
                  <div
                    onClick={() => setSelectPackage(item)}
                    key={item._id}
                    className="relative overflow-hidden transition-all duration-200 bg-gray-500 bg-opacity-25 border border-gray-200 cursor-pointer rounded-xl hover:border-gray-400 hover:bg-gray-50 border-opacity-15 opacity-60 group"
                  >
                    {select_package?._id === item?._id && (
                      <div className="absolute top-0 right-0 p-2">
                        <svg
                          className="w-6 h-6 text-green-500"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    )}
                    <div className="px-4 py-5">
                      <div className="flex items-start">
                        <div className="ml-4">
                          <p className="text-sm capitalize font-bold group-hover:text-gray-900 ">
                            {item?.name}
                          </p>
                          <p className="mt-1 text-sm font-medium hover:text-gray-900 ">
                            {item?.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="lg:col-span-4">
            <form
              onSubmit={create_workspace}
              className="grid grid-cols-1 gap-6 sm:grid-cols-2"
            >
              <div>
                <label
                  htmlFor="companyName"
                  className="text-base font-normal text-black"
                >
                  Your company name <span className="text-red-500">*</span>
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    required
                    defaultValue={companyName}
                    id="companyName"
                    placeholder="Enter your company name"
                    onChange={handleCompanyNameChange}
                    className="block w-full px-5 py-4 text-base font-normal text-black placeholder-gray-500 bg-white border border-gray-800 rounded-md focus:border-white focus:ring-white focus:ring-1"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="companyWebsite"
                  className="text-base font-normal text-black"
                >
                  Company Uniq ID <span className="text-red-500">*</span>
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    required
                    id="companyWebsite"
                    placeholder="Enter your company uniq id"
                    value={companyWebsite}
                    onChange={handleCompanyWebsiteChange}
                    className="block w-full px-5 py-4 text-base font-normal text-black placeholder-gray-500 bg-white border border-gray-800 rounded-md focus:border-white focus:ring-white focus:ring-1"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="" className="text-base font-normal text-black">
                  Company logo <span className="text-red-500">*</span>
                </label>
                <div className="mt-2">
                  <input
                    type="file"
                    required
                    name="logo"
                    id="logo"
                    className="block w-full px-5 py-3 text-base font-normal text-black placeholder-gray-500 bg-white border border-gray-800 rounded-md focus:border-white focus:ring-white focus:ring-1"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="" className="text-base font-normal text-black">
                  Trade License Copy
                </label>
                <div className="mt-2">
                  <input
                    type="file"
                    name="license"
                    id="license"
                    className="block w-full px-5 py-3 text-base font-normal text-black placeholder-gray-500 bg-white border border-gray-800 rounded-md focus:border-white focus:ring-white focus:ring-1"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="" className="text-base font-normal text-black">
                  Company size <span className="text-red-500">*</span>
                </label>
                <div className="mt-2">
                  <select
                    name="company_size"
                    required
                    id="company_size"
                    className="block w-full py-4 pl-5 pr-10 text-base font-normal text-black placeholder-gray-500 bg-white border border-gray-800 rounded-md focus:border-white focus:ring-white focus:ring-1"
                  >
                    <option value="">Select company size</option>
                    {companySize.map((item, index) => (
                      <option key={item.value} value={item.value}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="sm:col-span-1">
                <label
                  htmlFor="website"
                  className="text-base font-normal text-black"
                >
                  Company Website
                </label>
                <div className="mt-2">
                  <input
                    type="url"
                    id="website"
                    placeholder="Enter your company website"
                    className="block w-full py-4 pl-5 pr-10 text-base font-normal text-black placeholder-gray-500 bg-white border border-gray-800 rounded-md focus:border-white focus:ring-white focus:ring-1"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="" className="text-base font-normal text-black">
                  What industry do you work in?{" "}
                  <span className="text-red-500">*</span>
                </label>
                <div className="mt-2 ">
                  <Select
                    required
                    name="industry"
                    id="industry"
                    className="custom-select bgColor !border-opacity-20 block  w-full"
                    placeholder="Select industry"
                    dropdownClassName="custom-dropdown"
                    showSearch
                  >
                    {industry.map((item) => (
                      <Option
                        key={item.name}
                        value={item.name}
                        className="text-black"
                      >
                        {item.name}
                      </Option>
                    ))}
                  </Select>

                  {/* <Select
                                                            name="industry"
                                                            required
                                                            id="industry"
                                                            className="block w-full py-4 pl-5 pr-10 text-base font-normal text-white placeholder-gray-500 bg-black border border-gray-800 rounded-md focus:border-white focus:ring-white focus:ring-1"
                                                      >

                                                            <option value="">Select industry</option>
                                                            {
                                                                  industry.map((item, index) => (
                                                                        <option key={item.name} value={item.name}>{item.name}</option>
                                                                  ))
                                                            }
                                                      </Select> */}
                </div>
              </div>

              <div className="sm:col-span-1">
                <label
                  htmlFor="contactNumber"
                  className="text-base font-normal text-black"
                >
                  Company Contact Number <span className="text-red-500">*</span>
                </label>
                <div className="mt-2">
                  <input
                    required
                    type="text"
                    id="contactNumber"
                    defaultValue={"+880"}
                    placeholder="Enter your company contact number"
                    className="block w-full py-4 pl-5 pr-10 text-base font-normal text-black placeholder-gray-500 bg-white border border-gray-800 rounded-md focus:border-white focus:ring-white focus:ring-1"
                  />
                </div>
              </div>
              <div className="sm:col-span-1">
                <label
                  htmlFor="email"
                  className="text-base font-normal text-black"
                >
                  Company Email Address <span className="text-red-500">*</span>
                </label>
                <div className="mt-2">
                  <input
                    required
                    type="email"
                    id="email"
                    placeholder="Enter your company email address"
                    className="block w-full py-4 pl-5 pr-10 text-base font-normal text-black placeholder-gray-500 bg-white border border-gray-800 rounded-md focus:border-white focus:ring-white focus:ring-1"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="address"
                  className="text-base font-normal text-black"
                >
                  Company Address <span className="text-red-500">*</span>
                </label>
                <div className="mt-2">
                  <input
                    required
                    type="text"
                    id="address"
                    name="address"
                    placeholder="Enter your company address"
                    className="block w-full py-4 pl-5 pr-10 text-base font-normal text-black placeholder-gray-500 bg-white border border-gray-800 rounded-md focus:border-white focus:ring-white focus:ring-1"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="" className="text-base font-normal text-black">
                  Company Description
                </label>
                <div className="mt-2">
                  <ReactQuill
                    onChange={handleDescriptionChange}
                    name="description"
                    id="description"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <button
                  disabled={loading}
                  type="submit"
                  className="inline-flex items-center justify-center px-10 py-4 text-base font-normal text-white transition-all duration-200 rounded-md bg-gradient-to-r from-cyan-500 to-purple-500 hover:contrast-150 filter"
                >
                  {loading ? "Creating..." : "Create Workspace"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
