import { Eye, EyeOff } from "lucide-react";
import { useContext, useState } from "react";
import { Kalbela_AuthProvider } from "../../../../context/MainContext";
import Select from "react-select";
import sweet_alert from "../../../../utils/custom_alert";

const Add_new_hr = () => {
      const [isPasswordVisible, setPasswordVisible] = useState(false);
      const { user, workspace, base_url, } = useContext(Kalbela_AuthProvider);
      const [selected_permission, set_selected_permission] = useState([]);

      const data_submit = (e) => {
            e.preventDefault();
            const from_data = e.target
            const name = from_data.full_name.value
            const email = from_data.email.value
            const password = from_data.password.value
            const role = from_data.role.value


            // console.log(name, email, password);
            const data = {
                  name,
                  email,
                  password,
                  company_id: workspace?._id || "",
                  role: role,
                  permission: selected_permission
            }
            console.log(data);

            console.log(data, 'data');
            fetch(`${base_url}/auth/create-hr`, {
                  method: "POST",
                  headers: {
                        "Content-Type": "application/json"
                  },
                  body: JSON.stringify(data)
            }).then((res) => res.json())
                  .then((data) => {
                        console.log(data, 'data');
                        if (!data.error) {
                              sweet_alert("Success", data.message, "success");
                        }
                        else {
                              sweet_alert("Error", data.message, "error");
                        }
                  })
      };

      const handlePermission = (selectedOptions) => {
            const selectedValues = selectedOptions.map(option => option.value);
            set_selected_permission(selectedValues);  // Update the state with the selected values
      };


      return (
            <div className="p-20">
                  <div>
                        <h1 className="text-2xl font-semibold text-center  text-gray-900 ">Add New HR</h1>
                  </div>
                  <form onSubmit={data_submit} className="mt-8 ">
                        <div className="space-y-5">
                              <div>
                                    <label
                                          htmlFor=""
                                          className="text-base font-medium text-gray-900"
                                    >
                                          {" "}
                                          Fast &amp; Last name{" "}
                                    </label>
                                    <div className="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
                                          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                                <svg
                                                      className="w-5 h-5"
                                                      xmlns="http://www.w3.org/2000/svg"
                                                      fill="none"
                                                      viewBox="0 0 24 24"
                                                      stroke="currentColor"
                                                >
                                                      <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                                      />
                                                </svg>
                                          </div>
                                          <input
                                                type="text"
                                                name="full_name"
                                                id=""
                                                placeholder="Enter your full name"
                                                className="block w-full py-4 pl-10 pr-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600"
                                          />
                                    </div>
                              </div>
                              <div>
                                    <label
                                          htmlFor=""
                                          className="text-base font-medium text-gray-900"
                                    >
                                          {" "}
                                          Email address{" "}
                                    </label>
                                    <div className="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
                                          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                                <svg
                                                      className="w-5 h-5"
                                                      xmlns="http://www.w3.org/2000/svg"
                                                      fill="none"
                                                      viewBox="0 0 24 24"
                                                      stroke="currentColor"
                                                >
                                                      <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                                                      />
                                                </svg>
                                          </div>
                                          <input
                                                type="email"
                                                name="email"
                                                id="email"
                                                placeholder="Enter email to get started"
                                                className="block w-full py-4 pl-10 pr-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600"
                                          />
                                    </div>
                              </div>
                              <div>
                                    <label
                                          htmlFor=""
                                          className="text-base font-medium text-gray-900"
                                    >
                                          Type a Role
                                    </label>
                                    <div className="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
                                          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                                <svg
                                                      className="w-5 h-5"
                                                      xmlns="http://www.w3.org/2000/svg"
                                                      fill="none"
                                                      viewBox="0 0 24 24"
                                                      stroke="currentColor"
                                                >
                                                      <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                                                      />
                                                </svg>
                                          </div>
                                          <input
                                                type="text"
                                                name="role"
                                                id="role"
                                                placeholder="Enter role to get started"
                                                className="block w-full py-4 pl-10 pr-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600"
                                          />
                                    </div>
                              </div>
                              <div>
                                    <label
                                          htmlFor=""
                                          className="text-base font-medium text-gray-900"
                                    >
                                          {" "}
                                          Password{" "}
                                    </label>
                                    <div className="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
                                          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                                <svg
                                                      className="w-5 h-5"
                                                      xmlns="http://www.w3.org/2000/svg"
                                                      fill="none"
                                                      viewBox="0 0 24 24"
                                                      stroke="currentColor"
                                                >
                                                      <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
                                                      />
                                                </svg>
                                          </div>
                                          <input
                                                type={isPasswordVisible ? "text" : "password"}
                                                name="password"
                                                id="password"
                                                placeholder="Enter your password"
                                                className="block w-full py-4 pl-10 pr-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600"
                                          />
                                          <button
                                                type="button"
                                                onClick={() => setPasswordVisible(!isPasswordVisible)}
                                                className="absolute inset-y-0 right-0 flex items-center pr-3 focus:outline-none"
                                          >
                                                {isPasswordVisible ? (
                                                      <EyeOff className="w-5 h-5" />
                                                ) : (
                                                      <Eye className="w-5 h-5" />
                                                )}
                                          </button>
                                    </div>
                              </div>
                              <div>
                                    <label
                                          htmlFor=""
                                          className="text-base font-medium text-gray-900"
                                    >
                                          Select Permission
                                    </label>
                                    <Select onChange={handlePermission} name='permission' className="block w-full  text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600" isMulti options={[
                                          { label: "Jobs", value: '/jobs' },
                                          { label: "Candidates", value: '/candidates' },
                                          { label: "HR", value: '/hr' },
                                          { label: "Career Resources", value: '/career-resources' },
                                          { label: "Settings", value: '/settings' },
                                    ]} />
                              </div>

                              <div>
                                    <button
                                          type="submit"
                                          className="inline-flex items-center justify-center w-full px-4 py-4 text-base font-semibold text-white transition-all duration-200 border border-transparent rounded-md bg-gradient-to-r from-fuchsia-600 to-blue-600 focus:outline-none hover:opacity-80 focus:opacity-80"
                                    >
                                          Sign up
                                    </button>
                              </div>
                        </div>
                  </form>
            </div>
      );
};

export default Add_new_hr;
