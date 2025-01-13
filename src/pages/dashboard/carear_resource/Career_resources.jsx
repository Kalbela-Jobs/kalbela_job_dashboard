import { useQuery } from "@tanstack/react-query";
import Link_Button from "../../../components/small_component/Link_Button";
import { useContext, useState } from "react";
import { Kalbela_AuthProvider } from "../../../context/MainContext";
import Modal_Component from "../../../components/common/Modal_Component";
import Edit_career_resources from "./add/Edit_career_resources";
import Delete_Modal from "../../../components/common/Delete_Modal";
import sweet_alert from "../../../utils/custom_alert";

const Career_resources = () => {
      const { user, base_url, setWorkspace, setUser, setCookie } = useContext(Kalbela_AuthProvider);
      const [edit, set_edit] = useState(false);
      const [delete_modal, set_delete_modal] = useState(false);
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

      const delete_function = async (data) => {
            console.log(data, 'delete_data');
            fetch(`${base_url}/resource/delete?resource_id=${data._id}&token=${user._id}`, {
                  method: 'DELETE',
            }).then(res => res.json())
                  .then(data => {
                        if (!data.error) {
                              refetch()
                              sweet_alert("Success", data.message, "success");
                              set_delete_modal(false);
                        }
                        else {
                              sweet_alert("Error", data.message, "error");
                              set_delete_modal(false);
                        }
                  });
      };


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


                              <table className="divide-y divide-gray-200 ">
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
                                                                  onClick={() => set_edit(resource)}
                                                                  type="button"
                                                                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 transition-all duration-200 bg-gray-100 border border-gray-300 rounded-md shadow-sm hover:bg-indigo-600 focus:outline-none hover:text-white hover:border-indigo-600 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                                            >
                                                                  Edit Details
                                                            </button>
                                                            <button
                                                                  onClick={() => {
                                                                        set_delete_modal(resource);
                                                                  }}
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

                              <Modal_Component
                                    modal={edit}
                                    set_modal={set_edit}
                                    title="Edit Career Resource"
                                    JSX={<Edit_career_resources data={edit} refetch={refetch} set_modal={set_edit} />}
                              />

                              {
                                    delete_modal && <Delete_Modal title="Delete Career Resource" set_modal={set_delete_modal} delete_function={delete_function} modal={delete_modal} />
                              }

                        </div>
                  </div>
            </div>
      );
};

export default Career_resources;
