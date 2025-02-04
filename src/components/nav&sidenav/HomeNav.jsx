import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/image.png";

const HomeNav = () => {
      const [expanded, setExpanded] = useState(false);

      return (
            <header className="bg-[#FCF8F1] bg-opacity-30">
                  <div className="px-4 max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between h-16 lg:h-20">
                              {/* Logo */}
                              <div className="flex-shrink-0">
                                    <Link to="/" className="flex">
                                          <img className="w-auto h-10" src={logo} alt="Kalbela Jobs" />
                                    </Link>
                              </div>

                              {/* Mobile Menu Button */}
                              <button
                                    type="button"
                                    className="inline-flex p-2 text-black transition-all duration-200 rounded-md lg:hidden focus:bg-gray-100 hover:bg-gray-100"
                                    onClick={() => setExpanded(!expanded)}
                              >
                                    {expanded ? (
                                          <svg
                                                className="w-6 h-6"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                          >
                                                <path
                                                      strokeLinecap="round"
                                                      strokeLinejoin="round"
                                                      strokeWidth={2}
                                                      d="M6 18L18 6M6 6l12 12"
                                                />
                                          </svg>
                                    ) : (
                                          <svg
                                                className="w-6 h-6"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                          >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
                                          </svg>
                                    )}
                              </button>

                              {/* Desktop Navigation */}
                              <div className="hidden lg:flex lg:items-center lg:justify-center lg:space-x-10">
                                    <NavLink to="/features" className="text-base text-black transition-all duration-200 hover:text-opacity-80">
                                          Features
                                    </NavLink>
                                    <a href="#" className="text-base text-black transition-all duration-200 hover:text-opacity-80">
                                          Solutions
                                    </a>
                                    <a href="#" className="text-base text-black transition-all duration-200 hover:text-opacity-80">
                                          Resources
                                    </a>
                                    <Link to="/pricing" className="text-base text-black transition-all duration-200 hover:text-opacity-80">
                                          Pricing
                                    </Link>
                              </div>

                              {/* Join Now Button */}
                              <Link
                                    to="/sign-up"
                                    className="hidden lg:inline-flex items-center justify-center px-5 py-2.5 text-base transition-all duration-200 hover:bg-yellow-300 hover:text-black focus:text-black focus:bg-yellow-300 font-semibold text-white bg-black rounded-full"
                                    role="button"
                              >
                                    Join Now
                              </Link>
                        </div>

                        {/* Mobile Menu Items */}
                        {expanded && (
                              <div className="lg:hidden flex flex-col items-center space-y-4 py-4">
                                    <NavLink to="/features" className="text-base text-black transition-all duration-200 hover:text-opacity-80">
                                          Features
                                    </NavLink>
                                    <a href="#" className="text-base text-black transition-all duration-200 hover:text-opacity-80">
                                          Solutions
                                    </a>
                                    <a href="#" className="text-base text-black transition-all duration-200 hover:text-opacity-80">
                                          Resources
                                    </a>
                                    <Link to="/pricing" className="text-base text-black transition-all duration-200 hover:text-opacity-80">
                                          Pricing
                                    </Link>
                                    <Link
                                          to="/sign-up"
                                          className="inline-flex items-center justify-center px-5 py-2.5 text-base transition-all duration-200 hover:bg-yellow-300 hover:text-black focus:text-black focus:bg-yellow-300 font-semibold text-white bg-black rounded-full"
                                          role="button"
                                    >
                                          Join Now
                                    </Link>
                              </div>
                        )}
                  </div>
            </header>
      );
};

export default HomeNav;
