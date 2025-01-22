import { ApartmentOutlined, EnvironmentOutlined, ShopOutlined, TeamOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Card, Space } from "antd";
import { Link } from "react-router-dom";

const Config = () => {
      return (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 p-4">
                  <Link to="/admin/configuration/skills"
                        className="group relative inline-flex items-center overflow-hidden rounded bg-gray-700 px-8 py-3 text-white focus:outline-none focus:ring active:bg-gray-700"

                  >
                        <span className="absolute -start-full transition-all group-hover:start-4">
                              <svg
                                    className="size-5 rtl:rotate-180"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                              >
                                    <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth="2"
                                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                                    />
                              </svg>
                        </span>

                        <span className="text-sm font-medium transition-all group-hover:ms-4"> Skills </span>
                  </Link>
                  <Link to="/admin/configuration/positions"
                        className="group relative inline-flex items-center overflow-hidden rounded bg-gray-700 px-8 py-3 text-white focus:outline-none focus:ring active:bg-gray-700"

                  >
                        <span className="absolute -start-full transition-all group-hover:start-4">
                              <svg
                                    className="size-5 rtl:rotate-180"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                              >
                                    <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth="2"
                                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                                    />
                              </svg>
                        </span>

                        <span className="text-sm font-medium transition-all group-hover:ms-4"> Position </span>
                  </Link>
                  <Link to="/admin/configuration/locations"
                        className="group relative inline-flex items-center overflow-hidden rounded bg-gray-700 px-8 py-3 text-white focus:outline-none focus:ring active:bg-gray-700"
                        href="#"
                  >
                        <span className="absolute -start-full transition-all group-hover:start-4">
                              <svg
                                    className="size-5 rtl:rotate-180"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                              >
                                    <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth="2"
                                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                                    />
                              </svg>
                        </span>

                        <span className="text-sm font-medium transition-all group-hover:ms-4"> Location </span>
                  </Link>
                  <Link to={"/admin/configuration/industry"}
                        className="group relative inline-flex items-center overflow-hidden rounded bg-gray-700 px-8 py-3 text-white focus:outline-none focus:ring active:bg-gray-700"

                  >
                        <span className="absolute -start-full transition-all group-hover:start-4">
                              <svg
                                    className="size-5 rtl:rotate-180"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                              >
                                    <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth="2"
                                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                                    />
                              </svg>
                        </span>

                        <span className="text-sm font-medium transition-all group-hover:ms-4"> Industry </span>
                  </Link>

                  <Link to="/admin/configuration/departments"
                        className="group relative inline-flex items-center overflow-hidden rounded bg-gray-700 px-8 py-3 text-white focus:outline-none focus:ring active:bg-gray-700"
                        href="#"
                  >
                        <span className="absolute -start-full transition-all group-hover:start-4">
                              <svg
                                    className="size-5 rtl:rotate-180"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                              >
                                    <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth="2"
                                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                                    />
                              </svg>
                        </span>

                        <span className="text-sm font-medium transition-all group-hover:ms-4"> Department </span>
                  </Link>

                  <Link to="/admin/configuration/hero-logo"
                        className="group relative inline-flex items-center overflow-hidden rounded bg-gray-700 px-8 py-3 text-white focus:outline-none focus:ring active:bg-gray-700"
                        href="#"
                  >
                        <span className="absolute -start-full transition-all group-hover:start-4">
                              <svg
                                    className="size-5 rtl:rotate-180"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                              >
                                    <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth="2"
                                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                                    />
                              </svg>
                        </span>

                        <span className="text-sm font-medium transition-all group-hover:ms-4"> Hero Logo </span>
                  </Link>

            </div>
      );
};

export default Config;
