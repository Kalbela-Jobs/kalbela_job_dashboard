import React, { useContext, useEffect, useRef, useState } from 'react';
import {
      Form,
      Input,
      Button,
      Select,
      Typography,
      Layout,
      Space
} from 'antd';
import { GlobalOutlined, EnvironmentOutlined, LinkOutlined } from '@ant-design/icons';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useQuery } from "@tanstack/react-query";
import uploadImage from '../../../hooks/upload_image';
import { Kalbela_AuthProvider } from '../../../context/MainContext';
import sweet_alert from '../../../utils/custom_alert';
import { useNavigate } from 'react-router-dom';



const { Title } = Typography;
const { Content } = Layout;

export default function Workspace() {
      const [select_package, setSelectPackage] = useState(null);
      const [companyName, setCompanyName] = useState("");
      const [companyWebsite, setCompanyWebsite] = useState("");
      const { user, base_url, setWorkspace, setUser, setCookie } = useContext(Kalbela_AuthProvider);
      const [loading, setLoading] = useState(false);
      const [description, setDescription] = useState("");

      const quillRef = useRef(null);

      const generateWebsite = (name) => {
            return name
                  .toLowerCase()
                  .replace(/[^a-z0-9]/g, "") // Remove special characters
                  .replace(/\s+/g, ""); // Remove spaces
      };

      const handleCompanyNameChange = (e) => {
            const name = e.target.value;
            setCompanyName(name);
            if (!companyWebsite || companyWebsite === generateWebsite(companyName)) {
                  setCompanyWebsite(generateWebsite(name));
            }
      };

      const handleCompanyWebsiteChange = (e) => {
            const sanitizedValue = e.target.value.replace(/[^a-zA-Z0-9-]/g, "").toLowerCase();
            setCompanyWebsite(sanitizedValue);
      };


      const { data: packages = [], } = useQuery({
            queryKey: ["packages"],
            queryFn: async () => {
                  const res = await fetch(
                        "https://server.kalbelajobs.com/api/v1/package"
                  );
                  const data = await res.json();
                  return data.data;
            },
      });


      useEffect(() => {
            if (packages.length > 0) {
                  setSelectPackage(packages[0]);
            }
      }, [packages]);




      const industry = [
            {
                  value: 'it',
                  label: 'IT',
            },
            {
                  value: 'health',
                  label: 'Health',
            },
            {
                  value: 'education',
                  label: 'Education',
            },
            {
                  value: 'finance',
                  label: 'Finance',
            },
            {
                  value: 'construction',
                  label: 'Construction',
            },
            {
                  value: 'retail',
                  label: 'Retail',
            },
            {
                  value: 'hospitality',
                  label: 'Hospitality',
            },
            {
                  value: 'manufacturing',
                  label: 'Manufacturing',
            },
            {
                  value: 'media',
                  label: 'Media & Entertainment',
            },
            {
                  value: 'agriculture',
                  label: 'Agriculture',
            },
            {
                  value: 'others',
                  label: 'Others',
            },
      ];

      const companySize = [
            {
                  value: '1-10',
                  label: '1-10 Employees',
            },
            {
                  value: '11-50',
                  label: '11-50 Employees',
            },
            {
                  value: '51-100',
                  label: '51-100 Employees',
            },
            {
                  value: '101-500',
                  label: '101-500 Employees',
            },
            {
                  value: '501-1000',
                  label: '501-1000 Employees',
            },
            {
                  value: '1001-5000',
                  label: '1001-5000 Employees',
            },
            {
                  value: '5001-10000',
                  label: '5001-10,000 Employees',
            },
            {
                  value: '10001+',
                  label: '10,001+ Employees',
            },
      ];


      const navigate = useNavigate();

      const create_workspace = async (e) => {
            e.preventDefault();
            setLoading(true);
            const form_data = e.target;
            const file = form_data.logo.files[0];
            const logo_url = await uploadImage(file);
            const company_size = form_data.company_size.value;
            const industry = form_data.industry.value;


            const data = {
                  company_name: companyName,
                  company_website: companyWebsite,
                  logo: logo_url,
                  description,
                  company_size,
                  industry,
                  logo: logo_url,
                  package: select_package?._id,
                  staff: [{
                        name: user.name,
                        _id: user._id,
                        role: 'supper_admin'
                  }],

            };


            fetch(`${base_url}/workspace/create?token=${user._id}`, {
                  method: "POST",
                  headers: {
                        "Content-Type": "application/json"
                  },
                  body: JSON.stringify(data)
            }).then((res) => res.json())
                  .then((data) => {
                        console.log(data, 'data');
                        if (!data.error) {
                              setLoading(false);
                              sweet_alert('Success', data.message, 'success');
                              setWorkspace(data.data.workspace);
                              setUser(data.data.user);
                              setCookie('kal_bela_jobs_workspace', data.data.workspace, 365);
                              setCookie('kal_bela_jobs_user', data.data.user, 365);
                              navigate('/admin');

                        } else {
                              setLoading(false);
                              sweet_alert('Error', data.message, 'error');
                        }
                  })
                  .catch((error) => {
                        setLoading(false);
                        sweet_alert('Error', error.message, 'error');
                  });
      }


      const handleDescriptionChange = (value) => {
            setDescription(value);
      };



      return (
            <Layout className="relative py-12 overflow-hidden bg-black sm:py-16 lg:py-20 xl:py-24">
                  <div className="absolute top-0 left-0 -translate-x-48 -translate-y-36">
                        <svg
                              className="blur-3xl filter"
                              style={{ filter: "blur(64px)" }}
                              width={756}
                              height={202}
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                        >
                              <path
                                    d="M434.095 21.875c185.823 0 321.414-55.288 321.414 9.929S268.41 201.855 82.588 201.855c-185.822 0 0-104.834 0-170.051 0-65.217 165.685-9.929 351.507-9.929Z"
                                    fill="url(#b)"
                              />
                              <defs>
                                    <linearGradient
                                          id="b"
                                          x1={0}
                                          y1="201.855"
                                          x2="8.923"
                                          y2="-28.873"
                                          gradientUnits="userSpaceOnUse"
                                    >
                                          <stop offset="0%" style={{ stopColor: "var(--color-cyan-500)" }} />
                                          <stop
                                                offset="100%"
                                                style={{ stopColor: "var(--color-purple-500)" }}
                                          />
                                    </linearGradient>
                              </defs>
                        </svg>
                  </div>
                  <div className="absolute inset-0">
                        <img
                              className="object-cover w-full h-full opacity-50"
                              src="https://landingfoliocom.imgix.net/store/collection/dusk/images/noise.png"
                              alt=""
                        />
                  </div>
                  <div className="relative px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                        <div className="">
                              <h2 className="text-3xl font-normal text-white sm:text-4xl lg:text-5xl xl:text-6xl">
                                    Create your workspace
                              </h2>
                              <p className="mt-4 text-base font-normal text-gray-400 sm:text-lg">
                                    We're here to help you with your hiring needs.
                              </p>
                        </div>
                        <div className="grid grid-cols-1 mt-12 sm:mt-16 lg:mt-20 lg:grid-cols-6 lg:gap-x-24 gap-y-12">
                              <div className="space-y-8 lg:space-y-12 lg:col-span-2 lg:order-last">
                                    <div className="mt-6">
                                          <p className="text-base font-bold text-gray-100">Choose Package</p>
                                          <div className="grid grid-cols-1 gap-4 mt-5 sm:grid-cols-2">

                                                {
                                                      packages.map((item, index) => (
                                                            <div onClick={() => setSelectPackage(item)} key={item._id} className="relative overflow-hidden transition-all duration-200 bg-gray-500 bg-opacity-25 border border-gray-200 cursor-pointer rounded-xl hover:border-gray-400 hover:bg-gray-50 border-opacity-15 opacity-60 group">
                                                                  {select_package?._id === item?._id && <div className="absolute top-0 right-0 p-2">
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
                                                                  </div>}
                                                                  <div className="px-4 py-5" >
                                                                        <div className="flex items-start">

                                                                              <div className="ml-4">
                                                                                    <p className="text-sm capitalize font-bold group-hover:text-gray-900 text-gray-100">{item?.name}</p>
                                                                                    <p className="mt-1 text-sm font-medium hover:text-gray-900 text-gray-100">
                                                                                          {item?.description}
                                                                                    </p>
                                                                              </div>
                                                                        </div>
                                                                  </div>
                                                            </div>
                                                      ))
                                                }

                                          </div>
                                    </div>
                              </div>
                              <div className="lg:col-span-4">
                                    <form
                                          onSubmit={create_workspace}
                                          className="grid grid-cols-1 gap-6 sm:grid-cols-2"
                                    >

                                          <div>
                                                <label htmlFor="companyName" className="text-base font-normal text-white">
                                                      Your company name
                                                </label>
                                                <div className="mt-2">
                                                      <input
                                                            type="text"
                                                            required
                                                            id="companyName"
                                                            placeholder="Enter your company name"
                                                            value={companyName}
                                                            onChange={handleCompanyNameChange}
                                                            className="block w-full px-5 py-4 text-base font-normal text-white placeholder-gray-500 bg-black border border-gray-800 rounded-md focus:border-white focus:ring-white focus:ring-1"
                                                      />
                                                </div>
                                          </div>
                                          <div>
                                                <label htmlFor="companyWebsite" className="text-base font-normal text-white">
                                                      Company website
                                                </label>
                                                <div className="mt-2">
                                                      <input
                                                            type="text"
                                                            required
                                                            id="companyWebsite"
                                                            placeholder="Enter your company website"
                                                            value={companyWebsite}
                                                            onChange={handleCompanyWebsiteChange}
                                                            className="block w-full px-5 py-4 text-base font-normal text-white placeholder-gray-500 bg-black border border-gray-800 rounded-md focus:border-white focus:ring-white focus:ring-1"
                                                      />
                                                </div>
                                          </div>
                                          <div>
                                                <label htmlFor="" className="text-base font-normal text-white">
                                                      Company logo
                                                </label>
                                                <div className="mt-2">
                                                      <input
                                                            type="file"
                                                            required
                                                            name="logo"
                                                            id="logo"
                                                            className="block w-full px-5 py-3 text-base font-normal text-white placeholder-gray-500 bg-black border border-gray-800 rounded-md focus:border-white focus:ring-white focus:ring-1"
                                                      />
                                                </div>
                                          </div>
                                          <div>
                                                <label htmlFor="" className="text-base font-normal text-white">
                                                      Company size
                                                </label>
                                                <div className="mt-2">
                                                      <select
                                                            name="company_size"
                                                            required
                                                            id="company_size"
                                                            className="block w-full py-4 pl-5 pr-10 text-base font-normal text-white placeholder-gray-500 bg-black border border-gray-800 rounded-md focus:border-white focus:ring-white focus:ring-1"
                                                      >
                                                            <option value="">Select company size</option>
                                                            {
                                                                  companySize.map((item, index) => (
                                                                        <option key={item.value} value={item.value}>{item.label}</option>
                                                                  ))
                                                            }
                                                      </select>
                                                </div>
                                          </div>
                                          <div className="sm:col-span-2">
                                                <label htmlFor="" className="text-base font-normal text-white">
                                                      What industry do you work in?
                                                </label>
                                                <div className="mt-2">
                                                      <select
                                                            name="industry"
                                                            required
                                                            id="industry"
                                                            className="block w-full py-4 pl-5 pr-10 text-base font-normal text-white placeholder-gray-500 bg-black border border-gray-800 rounded-md focus:border-white focus:ring-white focus:ring-1"
                                                      >
                                                            <option value="">Select industry</option>
                                                            {
                                                                  industry.map((item, index) => (
                                                                        <option key={item.value} value={item.value}>{item.label}</option>
                                                                  ))
                                                            }
                                                      </select>
                                                </div>
                                          </div>

                                          <div className="sm:col-span-1">
                                                <label htmlFor="contactNumber" className="text-base font-normal text-white">
                                                      Company Contact Number
                                                </label>
                                                <div className="mt-2">
                                                      <input
                                                            required
                                                            type="text"
                                                            id="contactNumber"
                                                            defaultValue={"+880"}
                                                            placeholder="Enter your company contact number"
                                                            className="block w-full py-4 pl-5 pr-10 text-base font-normal text-white placeholder-gray-500 bg-black border border-gray-800 rounded-md focus:border-white focus:ring-white focus:ring-1"
                                                      />
                                                </div>
                                          </div>
                                          <div className="sm:col-span-1">
                                                <label htmlFor="email" className="text-base font-normal text-white">
                                                      Company Email Address
                                                </label>
                                                <div className="mt-2">
                                                      <input
                                                            required
                                                            type="email"
                                                            id="email"
                                                            placeholder="Enter your company email address"
                                                            className="block w-full py-4 pl-5 pr-10 text-base font-normal text-white placeholder-gray-500 bg-black border border-gray-800 rounded-md focus:border-white focus:ring-white focus:ring-1"
                                                      />
                                                </div>
                                          </div>
                                          <div className="sm:col-span-2">
                                                <label htmlFor="address" className="text-base font-normal text-white">
                                                      Company Address
                                                </label>
                                                <div className="mt-2">
                                                      <input
                                                            required
                                                            type="text"
                                                            id="address"
                                                            placeholder="Enter your company address"
                                                            className="block w-full py-4 pl-5 pr-10 text-base font-normal text-white placeholder-gray-500 bg-black border border-gray-800 rounded-md focus:border-white focus:ring-white focus:ring-1"
                                                      />
                                                </div>
                                          </div>
                                          <div className="sm:col-span-2">
                                                <label htmlFor="" className="text-base font-normal text-white">
                                                      Company Description
                                                </label>
                                                <div className="mt-2">

                                                      <ReactQuill
                                                            onChange={handleDescriptionChange}
                                                            required
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
                                                      {loading ? 'Creating...' : 'Create Workspace'}
                                                </button>
                                          </div>
                                    </form>
                              </div>
                        </div>
                  </div>
            </Layout>

      );
}
