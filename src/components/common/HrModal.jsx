import { Button, message } from "antd";
import { useState } from "react";

const HrModal = () => {
  const initialFormState = {
    name: "",
    email: "",
    role: "",
    permissions: [],
  };

  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState(initialFormState);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prev) => {
      if (checked) {
        return {
          ...prev,
          permissions: [...prev.permissions, value],
        };
      } else {
        return {
          ...prev,
          permissions: prev.permissions.filter(
            (permission) => permission !== value
          ),
        };
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("User Data:", formData);
    // Here you would typically send the data to your API

    message.success(" Add New User Successful ");
    // Reset form data to initial state
    setFormData(initialFormState);

    // Close the modal
    setIsOpen(false);
  };

  // Reset form when opening modal to ensure clean state
  const openModal = () => {
    setFormData(initialFormState);
    setIsOpen(true);
  };
  return (
    <div>
      {/* Button to open modal */}
      <button onClick={openModal}>
        <Button> Add New User</Button>
      </button>

      {/* Modal Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 left-0 top-0 lg:-ml-72 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsOpen(false);
          }}
        >
          {/* Modal Container */}
          <div className="bg-white rounded-lg shadow-xl w-full max-w-lg mx-4 overflow-hidden">
            {/* Modal Header */}
            <div className="bg-gray-800 px-6 py-4 border-b flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">Add New User</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-100 hover:text-gray-300"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
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
                    value={formData.name}
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
                    value={formData.email}
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
                    value={formData.role}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                    required
                  >
                    <option value="" disabled>
                      Select a role
                    </option>
                    <option value="super_admin">Super Admin</option>
                    <option value="hr">HR</option>
                    <option value="manager">Manager</option>
                    <option value="employee">Employee</option>
                  </select>
                </div>

                {/* Permissions Field */}
                <div className="mb-4">
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
                          checked={formData.permissions.includes("view")}
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
                          checked={formData.permissions.includes("create")}
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
                          checked={formData.permissions.includes("edit")}
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
                          checked={formData.permissions.includes("delete")}
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
                          checked={formData.permissions.includes("approve")}
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
                          checked={formData.permissions.includes("export")}
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
                </div>
              </form>
            </div>

            {/* Modal Footer */}
            <div className="bg-gray-50 px-6 py-4 border-t flex justify-end space-x-3">
              <button
                onClick={() => setIsOpen(false)}
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
          </div>
        </div>
      )}
    </div>
  );
};

export default HrModal;
