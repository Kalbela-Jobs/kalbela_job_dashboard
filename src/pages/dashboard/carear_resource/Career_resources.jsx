import { useQuery } from "@tanstack/react-query";
import Link_Button from "../../../components/small_component/Link_Button";
import { useContext } from "react";
import { Kalbela_AuthProvider } from "../../../context/MainContext";

const Career_resources = () => {
      const { user, base_url, setWorkspace, setUser, setCookie } = useContext(Kalbela_AuthProvider);
      const { data: career_resources = [], isLoading, refetch } = useQuery({
            queryKey: ["career_resources"],
            queryFn: async () => {
                  const res = await fetch(
                        `${base_url}/resource/`
                  );
                  const data = await res.json();
                  return data.data.resources;
            },
      });

      return (
            <div>
                  <div className="py-4 bg-white">
                        <div className="px-4 sm:px-6 lg:px-8">
                              <Link_Button name='Create New Career Resource' url="add-career-resources" />
                              <div className="sm:flex sm:items-center sm:justify-between">
                                    <div>
                                          <p className="text-xl font-bold text-gray-900">Career Resource List</p>

                                    </div>

                              </div>
                              <div className="flex flex-col mt-4 lg:mt-8">
                                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                                                <table className="min-w-full divide-y divide-gray-200">
                                                      <thead className="hidden lg:table-header-group">
                                                            <tr>
                                                                  <th className="py-3.5 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-widest">
                                                                        Name
                                                                  </th>
                                                                  <th className="py-3.5 px-4 text-left text-xs uppercase tracking-widest font-medium text-gray-500">
                                                                        Category
                                                                  </th>
                                                                  <th className="py-3.5 px-4 text-left text-xs uppercase tracking-widest font-medium text-gray-500">
                                                                        Description
                                                                  </th>

                                                                  <th className="py-3.5 px-4 text-center text-xs uppercase tracking-widest font-medium text-gray-500">
                                                                        Actions
                                                                  </th>
                                                            </tr>
                                                      </thead>
                                                      <tbody>


                                                            {career_resources?.map((resource) => <tr className="bg-gray-50">
                                                                  <td className="px-4 py-4 text-sm font-bold text-gray-900 align-top lg:align-middle whitespace-nowrap">
                                                                        <div className="flex items-center">
                                                                              {resource.name}
                                                                        </div>

                                                                  </td>
                                                                  <td className="hidden px-4 py-4 text-sm font-medium text-gray-900 lg:table-cell whitespace-nowrap">
                                                                        <div className="flex items-center">
                                                                              {resource.slag}
                                                                        </div>
                                                                  </td>


                                                                  <td className="px-4 py-4 text-sm font-medium text-right text-gray-900 align-top lg:align-middle lg:text-left whitespace-nowrap">
                                                                        {new DOMParser()
                                                                              .parseFromString(resource.description, 'text/html')
                                                                              .body.innerText.split(' ')
                                                                              .slice(0, 10)
                                                                              .join(' ')}..
                                                                  </td>
                                                                  <td className="hidden px-4 py-4 lg:table-cell whitespace-nowrap">
                                                                        <div className="flex items-center space-x-4">
                                                                              <button
                                                                                    type="button"
                                                                                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 transition-all duration-200 bg-gray-100 border border-gray-300 rounded-md shadow-sm hover:bg-indigo-600 focus:outline-none hover:text-white hover:border-indigo-600 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                                                              >
                                                                                    Edit Details
                                                                              </button>
                                                                              <button
                                                                                    type="button"
                                                                                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 transition-all duration-200 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                                                              >
                                                                                    <svg
                                                                                          className="w-5 h-5 mr-2 -ml-1"
                                                                                          xmlns="http://www.w3.org/2000/svg"
                                                                                          fill="none"
                                                                                          viewBox="0 0 24 24"
                                                                                          stroke="currentColor"
                                                                                          strokeWidth={2}
                                                                                    >
                                                                                          <path
                                                                                                strokeLinecap="round"
                                                                                                strokeLinejoin="round"
                                                                                                d="M6 18L18 6M6 6l12 12"
                                                                                          />
                                                                                    </svg>
                                                                                    Remove
                                                                              </button>
                                                                        </div>
                                                                  </td>
                                                            </tr>)}
                                                      </tbody>
                                                </table>
                                          </div>
                                    </div>
                              </div>
                        </div>
                  </div>
            </div>
      );
};

export default Career_resources;
