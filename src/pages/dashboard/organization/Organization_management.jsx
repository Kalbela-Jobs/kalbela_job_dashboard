import { useQuery } from "@tanstack/react-query";
import Delete_Modal from "../../../components/common/Delete_Modal";
import Modal_Component from "../../../components/common/Modal_Component";
import sweet_alert from "../../../utils/custom_alert";
import { Kalbela_AuthProvider } from "../../../context/MainContext";
import { useContext, useState } from "react";
import Link_Button from "../../../components/small_component/Link_Button";

const Organization_management = () => {
      const { user, base_url, workspace } = useContext(Kalbela_AuthProvider);
      const [modal, set_modal] = useState(false);
      const [delete_modal, set_delete_modal] = useState(false);

      const { data: workspace_data = [], isLoading, refetch } = useQuery({
            queryKey: ["workspace_data",],

            queryFn: async () => {
                  const res = await fetch(
                        `${base_url}/workspace/`
                  );
                  const data = await res.json();
                  return data.data;
            },
      });


      const delete_function = async (data) => {
            fetch(`${base_url}/workspace/workspace-hr/delete?hr_id=${data._id}&token=${user._id}`, {
                  method: 'DELETE',
            }).then(res => res.json())
                  .then(data => {
                        set_delete_modal(false);
                        if (!data.error) {
                              refetch()
                              sweet_alert("Success", data.message, "success");
                        }
                        else {
                              sweet_alert("Error", data.message, "error");
                        }
                  });
      }

      return (
            <div>
                  <div className="py-4 bg-white">
                        <div className="px-4 sm:px-6 lg:px-8">
                              <Link_Button name='Create New HR' url="add-hr" />
                              <div className="sm:flex sm:items-center sm:justify-between">
                                    <div>
                                          <p className="text-xl font-bold text-gray-900">Organization Management</p>
                                    </div>

                              </div>
                              {isLoading ? <>Loading</> : <div className="flex flex-col mt-4 lg:mt-8">
                                    <div className="-mx-4 -my-2  sm:-mx-6 lg:-mx-8">
                                          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                                                <table className="min-w-full overflow-x-auto divide-y divide-gray-200">
                                                      <thead className=" lg:table-header-group">
                                                            <tr>

                                                                  <th className="py-3.5 px-4 text-left text-xs whitespace-nowrap uppercase tracking-widest font-medium text-gray-500">
                                                                        Logo
                                                                  </th>
                                                                  <th className="py-3.5 px-4 text-left text-xs whitespace-nowrap uppercase tracking-widest font-medium text-gray-500">
                                                                        Name
                                                                  </th>
                                                                  <th className="py-3.5 px-4 text-left text-xs whitespace-nowrap uppercase tracking-widest font-medium text-gray-500">
                                                                        Size
                                                                  </th>
                                                                  <th className="py-3.5 px-4 text-left text-xs whitespace-nowrap uppercase tracking-widest font-medium text-gray-500">
                                                                        Industry
                                                                  </th>
                                                                  <th className="py-3.5 px-4 text-left text-xs whitespace-nowrap uppercase tracking-widest font-medium text-gray-500">
                                                                        Priority
                                                                  </th>
                                                                  <th className="py-3.5 px-4 text-center text-xs whitespace-nowrap uppercase tracking-widest font-medium text-gray-500">
                                                                        Actions
                                                                  </th>
                                                            </tr>
                                                      </thead>
                                                      <tbody>


                                                            {workspace_data.map((org) => <tr className="bg-gray-50">
                                                                  <td className=" px-4 py-4 text-sm font-medium text-gray-900 lg:table-cell whitespace-nowrap">
                                                                        <img className="w-10 h-10 border border-gray-200 rounded border-opacity-20" src={org.logo} alt={org.company_name} />
                                                                  </td>
                                                                  <td className=" px-4 py-4 text-sm font-medium text-gray-900 lg:table-cell whitespace-nowrap">
                                                                        {org.company_name}
                                                                  </td>
                                                                  <td className=" px-4 py-4 text-sm font-medium text-gray-900 xl:table-cell whitespace-nowrap">
                                                                        <div className="flex items-center">

                                                                              {org.company_size}
                                                                        </div>
                                                                  </td>
                                                                  <td className="px-4 py-4 text-sm capitalize font-medium text-right text-gray-900 align-top lg:align-middle lg:text-left whitespace-nowrap">
                                                                        {org.industry}
                                                                  </td>
                                                                  <td className="px-4 capitalize py-4 text-sm font-medium text-right text-gray-900 align-top lg:align-middle lg:text-left whitespace-nowrap">
                                                                        {org.
                                                                              priority
                                                                        }
                                                                  </td>
                                                                  <td className=" px-4 py-4 lg:table-cell whitespace-nowrap">
                                                                        <div className="flex justify-center items-center space-x-4">
                                                                              <button
                                                                                    onClick={() => set_modal(hr)}
                                                                                    type="button"
                                                                                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 transition-all duration-200 bg-gray-100 border border-gray-300 rounded-md shadow-sm hover:bg-indigo-600 focus:outline-none hover:text-white hover:border-indigo-600 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                                                              >
                                                                                    Edit Details
                                                                              </button>
                                                                              <button
                                                                                    onClick={() => set_delete_modal(hr)}
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
                              </div>}
                        </div>

                        {
                              modal && <Modal_Component title="Edit Category" modal={modal} set_modal={set_modal} JSX={<Edit refetch={refetch} set_modal={set_modal} data={modal} />} />
                        }

                        {
                              delete_modal && <Delete_Modal title="Delete Category" set_modal={set_delete_modal} delete_function={delete_function} modal={delete_modal} />
                        }

                  </div>
            </div>
      );
};

export default Organization_management;
