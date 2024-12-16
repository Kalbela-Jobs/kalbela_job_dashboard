import { useState } from "react";

export default function CountrySelector({ value, onChange }) {
      const [open, setOpen] = useState(false);
      const [search, setSearch] = useState("");

      const countries = [
            { emoji: "\ud83c\uddfa\ud83c\uddf8", name: "United States of America" },
            { emoji: "\ud83c\uddf3\ud83c\uddf1", name: "Netherlands" },
            { emoji: "\ud83c\uddff\ud83c\uddc3", name: "New Zealand" },
      ];

      const filteredCountries = countries.filter((country) =>
            country.name.toLowerCase().includes(search.toLowerCase())
      );

      const handleCountrySelect = (countryName) => {
            onChange(countryName);
            setOpen(false);
      };

      return (
            <div className="py-8 bg-white">
                  <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
                        <div className="max-w-xs mx-auto">
                              {open && (
                                    <div
                                          className="absolute top-0 left-0 w-full h-screen z-0 bg-transparent"
                                          onClick={() => setOpen(false)}
                                    ></div>
                              )}

                              <div className="relative">
                                    <label htmlFor="country" className="block text-sm font-bold text-gray-900">
                                          Country
                                    </label>

                                    <div className="mt-2">
                                          <div
                                                onClick={() => setOpen(!open)}
                                                className="cursor-pointer block w-full py-3 px-4 border-gray-300 border rounded-lg focus:outline-none focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm"
                                          >
                                                <div className="flex justify-between items-center">
                                                      <div className="flex items-center justify-start space-x-2">
                                                            <svg
                                                                  xmlns="http://www.w3.org/2000/svg"
                                                                  className="h-4 w-4 text-gray-400"
                                                                  fill="none"
                                                                  viewBox="0 0 24 24"
                                                                  stroke="currentColor"
                                                                  strokeWidth={2}
                                                            >
                                                                  <path
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                                                                  />
                                                            </svg>
                                                            <span>{value || "Select a country"}</span>
                                                      </div>
                                                      <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            className={`h-4 w-4 transform ${open ? "rotate-180" : ""}`}
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            stroke="currentColor"
                                                            strokeWidth={2}
                                                      >
                                                            <path
                                                                  strokeLinecap="round"
                                                                  strokeLinejoin="round"
                                                                  d="M19 9l-7 7-7-7"
                                                            />
                                                      </svg>
                                                </div>
                                          </div>
                                    </div>

                                    {open && (
                                          <div className="absolute mt-2 w-full z-10">
                                                <div className="border-gray-300 bg-white shadow border rounded-lg w-full text-sm px-4 py-2 space-y-2">
                                                      <div className="relative mt-2">
                                                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                                                  <svg
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        className="w-4 h-4 text-gray-400"
                                                                        fill="none"
                                                                        viewBox="0 0 24 24"
                                                                        stroke="currentColor"
                                                                        strokeWidth={2}
                                                                  >
                                                                        <path
                                                                              strokeLinecap="round"
                                                                              strokeLinejoin="round"
                                                                              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                                                        />
                                                                  </svg>
                                                            </div>
                                                            <input
                                                                  type="text"
                                                                  placeholder="Search countries"
                                                                  value={search}
                                                                  onChange={(e) => setSearch(e.target.value)}
                                                                  className="block w-full py-2 pl-8 pr-2 placeholder-gray-500 border-gray-300 rounded-lg focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm caret-indigo-600"
                                                            />
                                                      </div>

                                                      <ul className="flex flex-col">
                                                            {filteredCountries.map((country, index) => (
                                                                  <li
                                                                        key={index}
                                                                        onClick={() => handleCountrySelect(country.name)}
                                                                        className="w-full rounded-md p-2 hover:bg-gray-100 cursor-pointer"
                                                                  >
                                                                        {country.emoji} {country.name}
                                                                  </li>
                                                            ))}
                                                      </ul>
                                                </div>
                                          </div>
                                    )}
                              </div>
                        </div>
                  </div>
            </div>
      );
}
