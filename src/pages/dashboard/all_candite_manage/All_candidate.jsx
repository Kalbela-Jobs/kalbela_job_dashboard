import Delete_Modal from "../../../components/common/Delete_Modal";
import Modal_Component from "../../../components/common/Modal_Component";
import sweet_alert from "../../../utils/custom_alert";
import { Kalbela_AuthProvider } from "../../../context/MainContext";

import { useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { Button, Input, message, Pagination, Switch } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { Trash2 } from "lucide-react";

const All_candidate = () => {
  const { user, base_url } = useContext(Kalbela_AuthProvider);
  const [modal, setModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCon, setSelectedCon] = useState(null);

  // const pageSize = 10;
  const [pageSize, setPageSize] = useState(10);
  // pagination
  const {
    data: allCandidates = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["allCandidate", currentPage, searchText, pageSize],
    queryFn: async () => {
      const res = await fetch(
        `${base_url}/admin/get-all-candidate?token=${user?._id}&page=${currentPage}&limit=${pageSize}&search=${searchText}`
      );
      const data = await res.json();
      return data.data;
    },
  });

  // console.log(selectedCon, "allCandidates");

  const deleteFunction = async (candidate_id) => {
    try {
      const res = await fetch(
        `${base_url}/admin/delete-candidate?token=${user?._id}&candidate_id=${candidate_id}`,
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

  // status update function
  const updateStatus = async (candidate) => {
    console.log("no check", candidate);

    try {
      const res = await fetch(
        `${base_url}/admin/update-candidate?token=${user?._id}&candidate_id=${
          candidate?._id
        }&status=${!candidate?.company_status}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            company_status: !candidate?.company_status,
          }),
        }
      );
      const result = await res.json();
      if (!result.error) {
        refetch();
        message.success(result.message);
        if (selectedCon && selectedCon?._id === candidate?._id) {
          setSelectedCon({
            ...candidate,
            company_status: !candidate?.company_status,
          });
        }
      } else {
        message.error(result.message);
      }
    } catch (error) {
      message.error("An error occurred");
    }
  };

  // table headings data here
  const tableHeadings = [
    { id: "Avatar", label: "Avatar", align: "left" },
    { id: "name", label: "Name", align: "left" },
    { id: "email", label: "Email", align: "left" },
    { id: "date", label: "Date", align: "left" },
    { id: "status", label: "Status", align: "left" },
    { id: "action", label: "Action", align: "right" },
  ];

  return (
    <div className="py-4 bg-white">
      <div className="px-4 sm:px-6 lg:px-8">
        <Input
          placeholder="Search Name"
          prefix={<SearchOutlined />}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="mb-4"
        />

        {/* table start here */}
        <div className="container mx-auto py-4">
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {tableHeadings.map((heading) => (
                    <th
                      key={heading.id}
                      className={`px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider ${
                        heading.align === "right" ? "text-right" : "text-left"
                      }`}
                    >
                      {heading.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {allCandidates?.candidates?.map((candidate) => (
                  <tr key={candidate?.id} className="hover:bg-gray-50">
                    <td
                      onClick={() => setSelectedCon(candidate)}
                      className="px-6 py-4 whitespace-nowrap"
                    >
                      {candidate?.profile_picture ? (
                        <img
                          src={candidate?.profile_picture || "/placeholder.svg"}
                          alt={`${candidate?.fullName}'`}
                          className="h-10 w-10 rounded-full"
                        />
                      ) : (
                        <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-semibold">
                          {candidate?.fullName?.charAt(0).toUpperCase()}
                        </div>
                      )}
                    </td>
                    <td
                      onClick={() => setSelectedCon(candidate)}
                      className="px-6 py-4 text-blue-500  whitespace-nowrap font-medium hover:underline cursor-pointer"
                    >
                      {candidate?.fullName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                      {candidate?.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                      {new Intl.DateTimeFormat("en-US", {
                        timeZone: "Asia/Dhaka",
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                      }).format(candidate?.createdAt)}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                      <Switch
                        onChange={() => {
                          updateStatus(candidate);
                        }}
                        checked={candidate?.company_status}
                        checkedChildren="Statused"
                        unCheckedChildren="Status"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-red-600 hover:text-red-900 focus:outline-none">
                        <Trash2 className="h-5 w-5" />
                        <span className="sr-only">Delete</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* table  end here */}
        <div className="flex justify-center items-center mt-4">
          <Pagination
            current={currentPage}
            total={allCandidates.total}
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
        </div>
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
            title="Delete Candidate"
            set_modal={setDeleteModal}
            delete_function={deleteFunction}
            modal={deleteModal}
          />
        )}

        {/* Candidate Details Modal */}
        {selectedCon && (
          <Modal_Component
            title="Candidate  Details"
            modal={!!selectedCon}
            set_modal={setSelectedCon}
            JSX={
              <div className="p-4 space-y-4">
                {/* Logo */}

                <div className="flex justify-start">
                  {selectedCon?.profile_picture ? (
                    <img
                      src={selectedCon?.profile_picture || "/placeholder.svg"}
                      alt={`${selectedCon?.fullName}'`}
                      className="h-10 w-10 rounded-full"
                    />
                  ) : (
                    <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-semibold">
                      {selectedCon?.fullName?.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
                {/* Organization Info */}
                <p>
                  <strong>Name :</strong> {selectedCon?.fullName}
                </p>
                <p>
                  <strong>Title :</strong> {selectedCon?.title || "N/A"}
                </p>
                <p>
                  <strong>Role :</strong> {selectedCon?.role || "N/A"}
                </p>

                <p>
                  <strong>Date_of_birth :</strong>
                  <span className="pl-1">
                    {selectedCon?.date_of_birth
                      ? new Intl.DateTimeFormat("en-US", {
                          timeZone: "Asia/Dhaka",
                          year: "numeric",
                          month: "2-digit",
                          day: "2-digit",
                        }).format(new Date(selectedCon.date_of_birth))
                      : "N/A"}
                  </span>
                </p>

                <p>
                  <strong>Email :</strong> {selectedCon?.email || "N/A"}
                </p>

                <p>
                  <strong>Number :</strong> {selectedCon?.phone_number || "N/A"}
                </p>

                <p>
                  <strong>Created At :</strong>
                  <span className="pl-1">
                    {new Intl.DateTimeFormat("en-US", {
                      timeZone: "Asia/Dhaka",
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    }).format(selectedCon?.createdAt)}
                  </span>
                </p>

                <p>
                  <strong>Number :</strong> {selectedCon?.phone_number || "N/A"}
                </p>

                <p>
                  <strong>Languages :</strong>
                  <span className="pl-1">
                    {selectedCon?.languages?.length > 0
                      ? selectedCon.languages.map((lang, index) => (
                          <Button key={index} type="default" className="mr-2">
                            {lang}
                          </Button>
                        ))
                      : "N/A"}
                  </span>
                </p>
              </div>
            }
          />
        )}
      </div>
    </div>
  );
};

export default All_candidate;
