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
      const pageSize = 10;

      const { data: workspaceData = [], isLoading, refetch } = useQuery({
            queryKey: ["workspace_data", currentPage, searchText],
            queryFn: async () => {
                  const res = await fetch(
                        `${base_url}/workspace/?page=${currentPage}&limit=${pageSize}&search=${searchText}`
                  );
                  const data = await res.json();
                  return data.data.workspaces;
            },
      });

      const deleteFunction = async (data) => {
            try {
                  const res = await fetch(`${base_url}/workspace/workspace-hr/delete?hr_id=${data._id}&token=${user._id}`, {
                        method: 'DELETE',
                  });
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

      console.log(`${base_url}/workspace/?page=${currentPage}&limit=${pageSize}&search=${searchText}`, 'url');
      const updateFeature = async (data) => {
            try {
                  const res = await fetch(`${base_url}/workspace/update?workspace_id=${data._id}&token=${user._id}`, {
                        method: 'PATCH',
                        headers: {
                              'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ feature: !data.feature })
                  });
                  const result = await res.json();
                  if (!result.error) {
                        refetch();
                        message.success(result.message);
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
                        <img className="w-10 h-10 border border-gray-200 rounded" src={logo || "/placeholder.svg"} alt={record.company_name} />
                  ),
            },
            {
                  title: "Name",
                  dataIndex: "company_name",
                  key: "company_name",
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
            },
            {
                  title: "Priority",
                  dataIndex: "priority",
                  key: "priority",
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
                              dataSource={workspaceData}
                              loading={isLoading}
                              pagination={false}
                              rowKey="_id"
                        />

                        <Pagination
                              current={currentPage}
                              total={workspaceData.length}
                              pageSize={pageSize}
                              onChange={(page) => setCurrentPage(page)}
                              className="mt-4 text-center"
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
                                    title="Delete Category"
                                    set_modal={setDeleteModal}
                                    delete_function={deleteFunction}
                                    modal={deleteModal}
                              />
                        )}
                  </div>
            </div>
      );
};

export default OrganizationManagement;
