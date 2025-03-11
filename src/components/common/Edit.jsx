const Edit = ({ set_modal, data, handleSubmit, handleInputChange, handleCheckboxChange, copy_url, copied, copyToClipboard }) => {
      console.log(data, "data");
      return (
            <div>
                  <div
                        className=""
                        onClick={(e) => {
                              if (e.target === e.currentTarget) set_modal(false);
                        }}
                  >
                        {/* Modal Container */}
                        {!copy_url ?
                              <div>
                                    {/* Modal Body */}
                                    <div className="my-4">
                                          <form id="addUserForm" onSubmit={handleSubmit}>
                                                {/* Name Field */}
                                                <div className="mb-4">
                                                      <label
                                                            htmlFor="name"
                                                            className="block text-sm font-medium text-gray-700 mb-1"
                                                      >
                                                            Name
                                                      </label>
                                                      <input
                                                            type="text"
                                                            id="name"
                                                            name="name"
                                                            value={data.name}
                                                            onChange={handleInputChange}
                                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                            placeholder="Enter full name"
                                                            required
                                                      />
                                                </div>

                                                {/* Email Field */}
                                                <div className="mb-4">
                                                      <label
                                                            htmlFor="email"
                                                            className="block text-sm font-medium text-gray-700 mb-1"
                                                      >
                                                            Email
                                                      </label>
                                                      <input
                                                            type="email"
                                                            id="email"
                                                            name="email"
                                                            value={data.email}
                                                            onChange={handleInputChange}
                                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                            placeholder="Enter email address"
                                                            required
                                                      />
                                                </div>

                                                {/* Role Field */}
                                                <div className="mb-4">
                                                      <label
                                                            htmlFor="role"
                                                            className="block text-sm font-medium text-gray-700 mb-1"
                                                      >
                                                            Role
                                                      </label>
                                                      <select
                                                            id="role"
                                                            name="role"
                                                            value={data.role}
                                                            onChange={handleInputChange}
                                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                                                            required
                                                      >
                                                            <option value="" disabled>
                                                                  Select a role
                                                            </option>
                                                            <option value="workspace_admin">Super Admin</option>
                                                            <option value="hr">HR</option>
                                                            <option value="manager">Manager</option>
                                                            <option value="employee">Employee</option>
                                                      </select>
                                                </div>

                                                {/* Permissions Field */}
                                                {data.role !== "workspace_admin" && <div className="mb-4">
                                                      <label className="block text-sm font-medium text-gray-700 mb-1">
                                                            Permissions
                                                      </label>
                                                      <div className="bg-gray-50 p-3 rounded-md border border-gray-200">
                                                            <div className="grid grid-cols-2 gap-2">
                                                                  <div className="flex items-center">
                                                                        <input
                                                                              type="checkbox"
                                                                              id="perm_view"
                                                                              name="permissions"
                                                                              value="view"
                                                                              checked={data.permissions.includes("view")}
                                                                              onChange={handleCheckboxChange}
                                                                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                                                        />
                                                                        <label
                                                                              htmlFor="perm_view"
                                                                              className="ml-2 text-sm text-gray-700"
                                                                        >
                                                                              View
                                                                        </label>
                                                                  </div>
                                                                  <div className="flex items-center">
                                                                        <input
                                                                              type="checkbox"
                                                                              id="perm_create"
                                                                              name="permissions"
                                                                              value="create"
                                                                              checked={data.permissions.includes("create")}
                                                                              onChange={handleCheckboxChange}
                                                                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                                                        />
                                                                        <label
                                                                              htmlFor="perm_create"
                                                                              className="ml-2 text-sm text-gray-700"
                                                                        >
                                                                              Create
                                                                        </label>
                                                                  </div>
                                                                  <div className="flex items-center">
                                                                        <input
                                                                              type="checkbox"
                                                                              id="perm_edit"
                                                                              name="permissions"
                                                                              value="edit"
                                                                              checked={data.permissions.includes("edit")}
                                                                              onChange={handleCheckboxChange}
                                                                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                                                        />
                                                                        <label
                                                                              htmlFor="perm_edit"
                                                                              className="ml-2 text-sm text-gray-700"
                                                                        >
                                                                              Edit
                                                                        </label>
                                                                  </div>
                                                                  <div className="flex items-center">
                                                                        <input
                                                                              type="checkbox"
                                                                              id="perm_delete"
                                                                              name="permissions"
                                                                              value="delete"
                                                                              checked={data.permissions.includes("delete")}
                                                                              onChange={handleCheckboxChange}
                                                                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                                                        />
                                                                        <label
                                                                              htmlFor="perm_delete"
                                                                              className="ml-2 text-sm text-gray-700"
                                                                        >
                                                                              Delete
                                                                        </label>
                                                                  </div>
                                                                  <div className="flex items-center">
                                                                        <input
                                                                              type="checkbox"
                                                                              id="perm_approve"
                                                                              name="permissions"
                                                                              value="approve"
                                                                              checked={data.permissions.includes("approve")}
                                                                              onChange={handleCheckboxChange}
                                                                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                                                        />
                                                                        <label
                                                                              htmlFor="perm_approve"
                                                                              className="ml-2 text-sm text-gray-700"
                                                                        >
                                                                              Approve
                                                                        </label>
                                                                  </div>
                                                                  <div className="flex items-center">
                                                                        <input
                                                                              type="checkbox"
                                                                              id="perm_export"
                                                                              name="permissions"
                                                                              value="export"
                                                                              checked={data.permissions.includes("export")}
                                                                              onChange={handleCheckboxChange}
                                                                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                                                        />
                                                                        <label
                                                                              htmlFor="perm_export"
                                                                              className="ml-2 text-sm text-gray-700"
                                                                        >
                                                                              Export
                                                                        </label>
                                                                  </div>
                                                            </div>
                                                      </div>
                                                </div>}
                                          </form>
                                    </div>

                                    {/* Modal Footer */}
                                    <div className="pt-3 border-t flex justify-end space-x-3">
                                          <button
                                                onClick={() => set_modal(false)}
                                                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                                          >
                                                Cancel
                                          </button>
                                          <button
                                                type="submit"
                                                form="addUserForm"
                                                className="px-4 py-2 bg-blue-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                          >
                                                Save User
                                          </button>
                                    </div>
                              </div> : <div className="">
                                    <div className="p-4 py-8">
                                          <div className="flex items-center space-x-2">
                                                <div className="relative flex-1">
                                                      <input
                                                            type="text"
                                                            value={copy_url}
                                                            readOnly
                                                            className="w-full px-3 py-2 border border-gray-300 rounded-md font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                            onClick={(e) => e.target.select()}
                                                            aria-label="Current page URL"
                                                      />
                                                </div>
                                                <button
                                                      onClick={copyToClipboard}
                                                      className={`px-4 py-2 rounded-md border text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${copied
                                                            ? "bg-green-50 text-green-600 border-green-200"
                                                            : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                                                            }`}
                                                      aria-label="Copy URL to clipboard"
                                                >
                                                      <div className="flex items-center">
                                                            {copied ? (
                                                                  <>
                                                                        <svg
                                                                              xmlns="http://www.w3.org/2000/svg"
                                                                              className="h-4 w-4 mr-1"
                                                                              fill="none"
                                                                              viewBox="0 0 24 24"
                                                                              stroke="currentColor"
                                                                        >
                                                                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                                        </svg>
                                                                        <span>Copied</span>
                                                                  </>
                                                            ) : (
                                                                  <>
                                                                        <svg
                                                                              xmlns="http://www.w3.org/2000/svg"
                                                                              className="h-4 w-4 mr-1"
                                                                              fill="none"
                                                                              viewBox="0 0 24 24"
                                                                              stroke="currentColor"
                                                                        >
                                                                              <path
                                                                                    strokeLinecap="round"
                                                                                    strokeLinejoin="round"
                                                                                    strokeWidth={2}
                                                                                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                                                                              />
                                                                        </svg>
                                                                        <span>Copy</span>
                                                                  </>
                                                            )}
                                                      </div>
                                                </button>
                                          </div>
                                    </div>
                              </div>
                        }
                  </div >
            </div >
      );
};

export default Edit;
