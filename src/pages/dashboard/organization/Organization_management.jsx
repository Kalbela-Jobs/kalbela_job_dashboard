// import Delete_Modal from "../../../components/common/Delete_Modal";
// import Modal_Component from "../../../components/common/Modal_Component";
// import sweet_alert from "../../../utils/custom_alert";
// import { Kalbela_AuthProvider } from "../../../context/MainContext";

// import { useQuery } from "@tanstack/react-query";
// import { useContext, useState } from "react";
// import { Table, Input, Button, Pagination, Switch, message } from "antd";
// import { SearchOutlined } from "@ant-design/icons";

// const OrganizationManagement = () => {
//       const { user, base_url } = useContext(Kalbela_AuthProvider);
//       const [modal, setModal] = useState(false);
//       const [deleteModal, setDeleteModal] = useState(false);
//       const [searchText, setSearchText] = useState("");
//       const [currentPage, setCurrentPage] = useState(1);
//       const pageSize = 10;

//       const { data: workspaceData = [], isLoading, refetch } = useQuery({
//             queryKey: ["workspace_data", currentPage, searchText],
//             queryFn: async () => {
//                   const res = await fetch(
//                         `${base_url}/workspace/?page=${currentPage}&limit=${pageSize}&search=${searchText}`
//                   );
//                   const data = await res.json();
//                   return data.data;
//             },
//       });

//       const deleteFunction = async (data) => {
//             try {
//                   const res = await fetch(`${base_url}/workspace/delete?workspace_id=${data._id}&token=${user._id}`, {
//                         method: 'DELETE',
//                   });
//                   const result = await res.json();
//                   setDeleteModal(false);
//                   if (!result.error) {
//                         refetch();
//                         sweet_alert("Success", result.message, "success");
//                   } else {
//                         sweet_alert("Error", result.message, "error");
//                   }
//             } catch (error) {
//                   sweet_alert("Error", "An error occurred", "error");
//             }
//       };

//       console.log(`${base_url}/workspace/?page=${currentPage}&limit=${pageSize}&search=${searchText}`, 'url');
//       const updateFeature = async (data) => {
//             try {
//                   const res = await fetch(`${base_url}/workspace/update?workspace_id=${data._id}&token=${user._id}`, {
//                         method: 'PATCH',
//                         headers: {
//                               'Content-Type': 'application/json',
//                         },
//                         body: JSON.stringify({ feature: !data.feature })
//                   });
//                   const result = await res.json();
//                   if (!result.error) {
//                         refetch();
//                         message.success(result.message);
//                   } else {
//                         message.error(result.message);
//                   }
//             } catch (error) {
//                   message.error("An error occurred");
//             }
//       };

//       const columns = [
//             {
//                   title: "Logo",
//                   dataIndex: "logo",
//                   key: "logo",
//                   render: (logo, record) => (
//                         <img className="w-10 h-10 border border-gray-200 object-contain rounded" src={logo || "/placeholder.svg"} alt={record.company_name} />
//                   ),
//             },
//             {
//                   title: "Name",
//                   dataIndex: "company_name",
//                   key: "company_name",
//             },
//             {
//                   title: "Size",
//                   dataIndex: "company_size",
//                   key: "company_size",
//             },
//             {
//                   title: "Industry",
//                   dataIndex: "industry",
//                   key: "industry",
//                   render: (industry) => (
//                         industry ? industry.charAt(0).toUpperCase() + industry.slice(1) : ""
//                   ),
//             },
//             {
//                   title: "Priority",
//                   dataIndex: "priority",
//                   key: "priority",
//                   render: (priority) => (
//                         priority ? priority.charAt(0).toUpperCase() + priority.slice(1) : ""
//                   ),
//             },
//             {
//                   title: "Actions",
//                   key: "actions",
//                   render: (_, record) => (
//                         <div className="flex justify-center items-center space-x-4">
//                               <Switch
//                                     checked={record.feature}
//                                     onChange={() => updateFeature(record)}
//                                     checkedChildren="Featured"
//                                     unCheckedChildren="Feature"
//                               />
//                               <Button danger onClick={() => setDeleteModal(record)}>
//                                     Remove
//                               </Button>
//                         </div>
//                   ),
//             },
//       ];

//       return (
//             <div className="py-4 bg-white">
//                   <div className="px-4 sm:px-6 lg:px-8">

//                         <Input
//                               placeholder="Search organizations"
//                               prefix={<SearchOutlined />}
//                               value={searchText}
//                               onChange={(e) => setSearchText(e.target.value)}
//                               className="mb-4"
//                         />

//                         <Table
//                               columns={columns}
//                               dataSource={workspaceData.workspaces}
//                               loading={isLoading}
//                               pagination={false}
//                               rowKey="_id"
//                         />

//                         <Pagination
//                               current={currentPage}
//                               total={workspaceData.total}
//                               pageSize={pageSize}
//                               onChange={(page) => setCurrentPage(page)}
//                               className="mt-4 text-center"
//                         />

//                         {modal && (
//                               <Modal_Component
//                                     title="Edit Category"
//                                     modal={modal}
//                                     set_modal={setModal}
//                                     JSX={<Edit refetch={refetch} set_modal={setModal} data={modal} />}
//                               />
//                         )}

//                         {deleteModal && (
//                               <Delete_Modal
//                                     title="Delete Workspace"
//                                     set_modal={setDeleteModal}
//                                     delete_function={deleteFunction}
//                                     modal={deleteModal}
//                               />
//                         )}
//                   </div>
//             </div>
//       );
// };

// export default OrganizationManagement;

import Delete_Modal from "../../../components/common/Delete_Modal";
import Modal_Component from "../../../components/common/Modal_Component";
import sweet_alert from "../../../utils/custom_alert";
import { Kalbela_AuthProvider } from "../../../context/MainContext";

import { useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { Table, Input, Button, Pagination, Switch, message } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const OrganizationManagement = () => {
  const { user, base_url } = useContext(Kalbela_AuthProvider);
  const [modal, setModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOrg, setSelectedOrg] = useState(null); // State to store selected organization
  console.log(selectedOrg, "selectedOrg");
  // const pageSize = 10;
  const [pageSize, setPageSize] = useState(10);

  const {
    data: workspaceData = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["workspace_data", currentPage, searchText, pageSize],
    queryFn: async () => {
      const res = await fetch(
        `${base_url}/workspace/?page=${currentPage}&limit=${pageSize}&search=${searchText}`
      );
      const data = await res.json();
      return data.data;
    },
  });

  const deleteFunction = async (data) => {
    try {
      const res = await fetch(
        `${base_url}/workspace/delete?workspace_id=${data._id}&token=${user._id}`,
        {
          method: "DELETE",
        }
      );
      const result = await res.json();
      setDeleteModal(false);
      if (!result.error) {
        refetch();
        sweet_alert("Success", result.message, "success");
      } else {
        sweet_alert("Error", result.message, "error");
      }
    } catch (error) {
      sweet_alert("Error", "An error occurred", "error");
    }
  };

  const updateFeature = async (data) => {
    try {
      const res = await fetch(
        `${base_url}/workspace/update?workspace_id=${data._id}&token=${user._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ feature: !data.feature }),
        }
      );
      const result = await res.json();
      if (!result.error) {
        refetch();
        message.success(result.message);
        if (selectedOrg && selectedOrg._id === data._id) {
          setSelectedOrg({ ...data, feature: !data.feature });
        }
      } else {
        message.error(result.message);
      }
    } catch (error) {
      message.error("An error occurred");
    }
  };

  const columns = [
    {
      title: "Logo",
      dataIndex: "logo",
      key: "logo",
      render: (logo, record) => (
        <img
          className="w-10 h-10 border border-gray-200 object-contain rounded cursor-pointer"
          src={logo || "/placeholder.svg"}
          alt={record.company_name}
          onClick={() => setSelectedOrg(record)}
        />
      ),
    },
    {
      title: "Name",
      dataIndex: "company_name",
      key: "company_name",
      render: (name, record) => (
        <span
          className="text-blue-600 cursor-pointer hover:underline"
          onClick={() => setSelectedOrg(record)}
        >
          {name}
        </span>
      ),
    },
    {
      title: "Size",
      dataIndex: "company_size",
      key: "company_size",
    },
    {
      title: "Industry",
      dataIndex: "industry",
      key: "industry",
      render: (industry) =>
        industry ? industry.charAt(0).toUpperCase() + industry.slice(1) : "",
    },
    {
      title: "Priority",
      dataIndex: "priority",
      key: "priority",
      render: (priority) =>
        priority ? priority.charAt(0).toUpperCase() + priority.slice(1) : "",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div className="flex justify-center items-center space-x-4">
          <Switch
            checked={record.feature}
            onChange={() => updateFeature(record)}
            checkedChildren="Featured"
            unCheckedChildren="Feature"
          />
          <Button danger onClick={() => setDeleteModal(record)}>
            Remove
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="py-4 bg-white">
      <div className="px-4 sm:px-6 lg:px-8">
        <Input
          placeholder="Search organizations"
          prefix={<SearchOutlined />}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="mb-4"
        />

        <Table
          columns={columns}
          dataSource={workspaceData.workspaces}
          loading={isLoading}
          pagination={false}
          rowKey="_id"
        />

        <Pagination
          current={currentPage}
          total={workspaceData.total}
          pageSize={pageSize}
          showSizeChanger
          pageSizeOptions={["10", "20", "50", "100"]}
          showTotal={(total, range) =>
            `${range[0]}-${range[1]} of ${total} items`
          }
          onChange={(page) => setCurrentPage(page)}
          onShowSizeChange={(current, size) => {
            setPageSize(size);
            setCurrentPage(1); // Reset to first page on size change
          }}
          className="mt-4 "
        />
        {modal && (
          <Modal_Component
            title="Edit Category"
            modal={modal}
            set_modal={setModal}
            JSX={<Edit refetch={refetch} set_modal={setModal} data={modal} />}
          />
        )}

        {deleteModal && (
          <Delete_Modal
            title="Delete Workspace"
            set_modal={setDeleteModal}
            delete_function={deleteFunction}
            modal={deleteModal}
          />
        )}

        {/* Organization Details Modal */}
        {selectedOrg && (
          <Modal_Component
            title="Organization Details"
            modal={!!selectedOrg}
            set_modal={setSelectedOrg}
            JSX={
              <div className="p-4 space-y-4">
                {/* Logo */}

                <div className="flex justify-center">
                  <img
                    src={selectedOrg.logo || "/placeholder.svg"}
                    alt={selectedOrg.company_name}
                    className="w-20 h-20 p-1 border object-contain rounded"
                  />
                </div>
                {/* Organization Info */}
                <p>
                  <strong>Name :</strong> {selectedOrg.company_name}
                </p>
                <p>
                  <strong>Website:</strong>
                  <a
                    href={selectedOrg.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600"
                  >
                    {selectedOrg.website}
                  </a>
                </p>
                <p>
                  <strong>Company Size:</strong> {selectedOrg.company_size}
                </p>
                <p>
                  <strong>Industry:</strong>{" "}
                  {selectedOrg.industry.charAt(0).toUpperCase() +
                    selectedOrg.industry.slice(1)}
                </p>
                <p>
                  <strong>Address:</strong> {selectedOrg.address}
                </p>
                <p>
                  <strong>Priority:</strong>{" "}
                  {selectedOrg.priority.charAt(0).toUpperCase() +
                    selectedOrg.priority.slice(1)}
                </p>
                <p>
                  <strong>Featured:</strong>{" "}
                  <Switch
                    checked={selectedOrg.feature}
                    onChange={() => updateFeature(selectedOrg)}
                    checkedChildren="Featured"
                    unCheckedChildren="Feature"
                  />
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  {selectedOrg.status ? "Active" : "Inactive"}
                </p>
                <p>
                  <strong>Created At:</strong>{" "}
                  {new Date(selectedOrg.created_at).toLocaleString()}
                </p>
                {/* Trade License (if available) */}
                {selectedOrg.trade_license && (
                  <div>
                    <p>
                      <strong>Trade License:</strong>
                    </p>
                    <a
                      href={selectedOrg.trade_license}
                      target="_blank"
                      rel="noopener noreferrer"
                      download
                    >
                      <img
                        src={selectedOrg.trade_license}
                        alt="Trade License"
                        className="w-full max-w-md mx-auto border rounded cursor-pointer"
                      />
                    </a>
                  </div>
                )}
                {/* Staff List */}
                {/* Timestamps */}
                {selectedOrg.staff && selectedOrg.staff.length > 0 && (
                  <div>
                    <p>
                      <strong>Staff Members:</strong>
                    </p>
                    <ul className="list-disc ml-4">
                      {selectedOrg.staff.map((staff) => (
                        <li key={staff._id}>
                          {staff.name} ({staff.role})
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            }
          />
        )}
      </div>
    </div>
  );
};

export default OrganizationManagement;
