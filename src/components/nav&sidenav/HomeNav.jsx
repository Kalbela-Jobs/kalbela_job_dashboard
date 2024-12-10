

import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const HomeNav = () => {
      const [expanded, setExpanded] = useState(false);

      const menuItems = [
            { label: 'Home', link: '/' },
            { label: 'About', link: '/about' },

      ];

      return (
            <header className="py-4 bg-black sm:py-6">
                  <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between">
                              <div className="shrink-0">
                                    <Link to="/" title="" className="flex">
                                          <img
                                                className="w-auto h-12"
                                                src="https://www.brightfuturesoft.com/static/media/logo%20full%20name%20png%202-01%20(1)%20(1).f35f04f782ea6b4a59b2.png"
                                                alt=""
                                          />
                                    </Link>
                              </div>

                              <div className="flex md:hidden">
                                    <button
                                          type="button"
                                          className="text-white"
                                          onClick={() => setExpanded(!expanded)}
                                          aria-expanded={expanded}
                                    >
                                          {!expanded ? (
                                                <svg
                                                      className="w-7 h-7"
                                                      xmlns="http://www.w3.org/2000/svg"
                                                      fill="none"
                                                      viewBox="0 0 24 24"
                                                      stroke="currentColor"
                                                >
                                                      <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="1.5"
                                                            d="M4 6h16M4 12h16M4 18h16"
                                                      />
                                                </svg>
                                          ) : (
                                                <svg
                                                      className="w-7 h-7"
                                                      xmlns="http://www.w3.org/2000/svg"
                                                      fill="none"
                                                      viewBox="0 0 24 24"
                                                      stroke="currentColor"
                                                >
                                                      <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M6 18L18 6M6 6l12 12"
                                                      />
                                                </svg>
                                          )}
                                    </button>
                              </div>

                              <nav className="hidden ml-auto mr-10 space-x-10 md:flex md:items-center md:justify-end lg:space-x-12">
                                    {menuItems.map((item, index) => (
                                          <Link
                                                key={index}
                                                to={item.link}
                                                title={item.label}
                                                className="text-base font-normal text-gray-400 transition-all duration-200 hover:text-white"
                                          >
                                                {item.label}
                                          </Link>
                                    ))}
                              </nav>

                              <div className="relative hidden md:items-center md:justify-center md:inline-flex group">
                                    <div className="absolute transition-all duration-200 rounded-full -inset-px bg-gradient-to-r from-cyan-500 to-purple-500 group-hover:shadow-lg group-hover:shadow-cyan-500/50"></div>
                                    <a
                                          href="#"
                                          title=""
                                          className="relative inline-flex items-center justify-center px-6 py-2 text-base font-normal text-white bg-black border border-transparent rounded-full"
                                          role="button"
                                    >
                                          Custom Button
                                    </a>
                              </div>
                        </div>

                        {expanded && (
                              <nav>
                                    <div className="flex flex-col pt-8 pb-4 space-y-6">
                                          {menuItems.map((item, index) => (
                                                <Link
                                                      key={index}
                                                      to={item.link}
                                                      title={item.label}
                                                      className="text-base font-normal text-gray-400 transition-all duration-200 hover:text-white"
                                                >
                                                      {item.label}
                                                </Link>
                                          ))}

                                          <div className="relative inline-flex items-center justify-center group">
                                                <div className="absolute transition-all duration-200 rounded-full -inset-px bg-gradient-to-r from-cyan-500 to-purple-500 group-hover:shadow-lg group-hover:shadow-cyan-500/50"></div>
                                                <a
                                                      href="#"
                                                      title=""
                                                      className="relative inline-flex items-center justify-center w-full px-6 py-2 text-base font-normal text-white bg-black border border-transparent rounded-full"
                                                      role="button"
                                                >
                                                      Custom Button
                                                </a>
                                          </div>
                                    </div>
                              </nav>
                        )}
                  </div>
            </header>
      );
};

export default HomeNav;
