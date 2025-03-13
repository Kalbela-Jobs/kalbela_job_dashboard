"use client";

import { useEffect, useState } from "react";
import {
      Button,
      DatePicker,
      Divider,
      Form,
      Input,
      InputNumber,
      Upload,
      Select,
      Modal,
      message,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import JoditEditor from "jodit-react";
import moment from "moment";
import { useQuery } from "@tanstack/react-query";
import uploadImage from "../../../../../hooks/upload_image";

const styles = `
  .upload-list-inline .ant-upload-list-item {
    float: left;
    width: 200px;
    margin-right: 8px;
  }
  .upload-list-inline [class*='-upload-list-rtl'] .ant-upload-list-item {
    float: right;
  }
`;

const { Option } = Select;

const EditGovtJobs = ({ data, onClose, base_url }) => {
      const [job, setJob] = useState(data);
      const [publicationDate, setPublicationDate] = useState(
            data?.publicationDate ? moment(data.publicationDate) : null
      );

      const config = {
            buttons: [
                  "bold",
                  "italic",
                  "underline",
                  "strikethrough",
                  "|",
                  "font",
                  "fontsize",
                  "brush",
                  "|",
                  "paragraph",
                  "align",
                  "|",
                  "ul",
                  "ol",
                  "indent",
                  "outdent",
                  "|",
                  "link",
                  "image",
                  "table",
                  "|",
                  "undo",
                  "redo",
            ],
            buttonsMD: [
                  "bold",
                  "italic",
                  "underline",
                  "strikethrough",
                  "|",
                  "font",
                  "fontsize",
                  "brush",
                  "|",
                  "paragraph",
                  "align",
                  "|",
                  "ul",
                  "ol",
                  "indent",
                  "outdent",
                  "|",
                  "link",
                  "image",
                  "table",
                  "|",
                  "undo",
                  "redo",
            ],
            buttonsSM: [
                  "bold",
                  "italic",
                  "underline",
                  "|",
                  "font",
                  "brush",
                  "|",
                  "align",
                  "ul",
                  "ol",
                  "|",
                  "link",
                  "image",
                  "|",
                  "undo",
                  "redo",
            ],
            buttonsXS: [
                  "bold",
                  "italic",
                  "|",
                  "font",
                  "brush",
                  "|",
                  "ul",
                  "ol",
                  "|",
                  "link",
                  "image",
            ],
            removeButtons: ["source", "fullsize", "about", "dots", "print", "preview"],
            height: 300,
      };

      const [form] = Form.useForm();
      const [fileList, setFileList] = useState([]);

      const { data: organizations = [], isLoading } = useQuery({
            queryKey: ["organizations"],
            queryFn: async () => {
                  const res = await fetch(`${base_url}/workspace/get-all-govt-org`);
                  const data = await res.json();
                  return data.data;
            },
      });

      useEffect(() => {
            form.setFieldsValue({
                  ...data,
                  applicationStartDate: data?.applicationStartDate
                        ? moment(data.applicationStartDate).local()
                        : null,
                  applicationDeadline: data?.applicationDeadline
                        ? moment(data.applicationDeadline).local()
                        : null,
                  publicationDate: data?.publicationDate
                        ? moment(data.publicationDate).local()
                        : null,
                  org_info: data?.organization ? JSON.stringify(data?.organization) : null,
            });

            if (data.uploadDocument) {
                  setFileList([
                        {
                              uid: "-1",
                              name: "Current Document",
                              status: "done",
                              url: data.uploadDocument,
                        },
                  ]);
            }
      }, [data, form]);

      const handleEditJob = async () => {
            const input_value = form.getFieldsValue();

            if (input_value.document?.file) {
                  console.log(input_value.document);
                  const documentUrl = await uploadImage(input_value.document.file); // Upload image and get URL
                  input_value.document_url = documentUrl; // Set the document URL to the form data
            }

            let organization;
            try {
                  organization = JSON.parse(input_value.org_info);
            } catch (error) {
                  organization = data.organization;
            }

            const value = {
                  title: input_value.title,
                  hyperlink: input_value.hyperlink,
                  description: input_value.description,
                  organization: organization,
                  advertisementNo: input_value.advertisementNo,
                  vacancy: input_value.vacancy,
                  applicationStartDate: input_value.applicationStartDate.toISOString(),
                  applicationDeadline: input_value.applicationDeadline.toISOString(),
                  publicationDate: input_value?.publicationDate?.toISOString(),
                  uploadDocument: input_value.document_url
                        ? input_value.document_url
                        : data.uploadDocument, // Attach the document URL
            };
            console.log(value, "data_update_value");
            try {
                  const response = await fetch(
                        `${base_url}/jobs/update-govt-job?job_id=${data._id}`,
                        {
                              method: "PUT",
                              headers: { "Content-Type": "application/json" },
                              body: JSON.stringify(value),
                        }
                  );
                  if (response.ok) {
                        message.success(`Job ${value.title} updated successfully`);
                        onClose();
                  }
            } catch (error) {
                  console.error("Error updating job:", error);
            }
      };

      const handleFileChange = (info) => {
            let fileList = [...info.fileList];
            fileList = fileList.slice(-1);
            setFileList(fileList);

            if (info.file.status === "done") {
                  console.log("Document uploaded successfully:", info.file.name);
                  console.log("image_upload:", true);
            } else if (info.file.status === "error") {
                  console.log("Document upload failed:", info.file.name);
                  console.log("image_upload:", false);
            }
      };

      const selectedOrg = organizations.find(
            (org) => org._id === job?.organization?.id
      );
      const selected_value = selectedOrg
            ? JSON.stringify({
                  id: selectedOrg._id,
                  name: selectedOrg.name,
                  logo: selectedOrg.logo,
                  description: selectedOrg.description,
                  website: selectedOrg?.org_website,
            })
            : null;

      const disabledDeadlineDates = (current) => {
            const startDate = form.getFieldValue("applicationStartDate");
            return startDate && current && current.isBefore(startDate, "day");
      };

      return (
            <>
                  <style>{styles}</style>
                  <Modal
                        title="Edit Govt Jobs"
                        onCancel={() => onClose()}
                        open={data}
                        footer=""
                        width={800}
                  >
                        <Form form={form} layout="vertical" onFinish={handleEditJob}>
                              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                    <Form.Item
                                          name="org_info"
                                          label="Organization"
                                          rules={[
                                                { required: true, message: "Please select an organization" },
                                          ]}
                                    >
                                          <Select
                                                placeholder="Select an organization"
                                                showSearch
                                                optionFilterProp="children"
                                          >
                                                {organizations.map((org) => (
                                                      <Option
                                                            key={org._id}
                                                            value={JSON.stringify({
                                                                  id: org._id,
                                                                  name: org.name,
                                                                  logo: org.logo,
                                                                  description: org.description,
                                                                  website: org?.org_website,
                                                            })}
                                                      >
                                                            <div className="flex items-center gap-2">
                                                                  <img
                                                                        src={org?.logo || "/placeholder.svg"}
                                                                        alt={org?.name}
                                                                        width={24}
                                                                        height={24}
                                                                        className="rounded-full"
                                                                  />
                                                                  <span>{org.name}</span>
                                                            </div>
                                                      </Option>
                                                ))}
                                          </Select>
                                    </Form.Item>

                                   

                                    <Form.Item
                                          name="publicationDate"
                                          label="Publication Date"
                                          rules={[
                                                { required: false, message: "Please enter publication date" },
                                          ]}
                                    >
                                          <DatePicker
                                                className="w-full"
                                                placeholder="Pick a date"
                                                format="DD MMM YYYY hh:mm a"
                                          />
                                    </Form.Item>

                                    <Form.Item
                                          name="applicationStartDate"
                                          label="Application Start Date"
                                          rules={[{ required: true, message: "Please select start date" }]}
                                    >
                                          <DatePicker
                                                className="w-full"
                                                placeholder="Pick a date"
                                                format="DD MMM YYYY hh:mm a"
                                          />
                                    </Form.Item>

                                    <Form.Item
                                          name="applicationDeadline"
                                          label="Application Deadline"
                                          rules={[{ required: true, message: "Please select deadline" }]}
                                    >
                                          <DatePicker
                                                disabledDate={disabledDeadlineDates}
                                                className="w-full"
                                                placeholder="Pick a date"
                                                format="DD MMM YYYY hh:mm a"
                                          />
                                    </Form.Item>

                                    <Form.Item
                                          name="hyperlink"
                                          label="Hyperlink"
                                          rules={[{ required: true, message: "Please enter hyperlink" }]}
                                    >
                                          <Input placeholder="Enter hyperlink" />
                                    </Form.Item>

                                    <Form.Item
                                          name="document"
                                          label="Upload Document"
                                          rules={[{ required: false, message: "Please upload a document" }]}
                                    >
                                          <Upload
                                                maxCount={1}
                                                fileList={fileList}
                                                onChange={handleFileChange}
                                                beforeUpload={() => false}
                                                className="upload-list-inline"
                                          >
                                                <Button
                                                      icon={<UploadOutlined />}
                                                      className="bg-blue-500 text-white hover:bg-blue-600"
                                                >
                                                      Choose File
                                                </Button>
                                          </Upload>
                                    </Form.Item>
                              </div>

                              {fileList.length > 0 && fileList[0].url && (
                                    <div className="mt-4">
                                          <h4 className="text-sm font-medium mb-2">
                                                Current Document Preview:
                                          </h4>
                                          <div className="border rounded p-4">
                                                <a
                                                      href={fileList[0].url}
                                                      target="_blank"
                                                      rel="noopener noreferrer"
                                                      className="text-blue-500 hover:underline"
                                                >
                                                      View Current Document
                                                </a>
                                          </div>
                                    </div>
                              )}

                              <Form.Item
                                    name="description"
                                    label="Description"
                                    initialValue={job?.description}
                                    rules={[{ required: true, message: "Please enter description" }]}
                              >
                                    <JoditEditor config={config} />
                              </Form.Item>

                              <Divider />
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <Form.Item
                                          name="title"
                                          label="Job Title"
                                          rules={[{ required: true, message: "Please enter job title" }]}
                                    >
                                          <Input placeholder="Enter job title" />
                                    </Form.Item>
                                    <Form.Item
                                          name="vacancy"
                                          label="Vacancy"
                                          rules={[{ required: true, message: "Please enter vacancy" }]}
                                    >
                                          <InputNumber
                                                min={1}
                                                className="w-full"
                                                placeholder="Enter vacancy"
                                          />
                                    </Form.Item>
                              </div>
                              <div className="flex justify-end gap-2 mt-4">
                                    <Button
                                          onClick={onClose}
                                          className="bg-gray-400 text-white px-4 py-2 rounded"
                                    >
                                          Cancel
                                    </Button>
                                    <Button
                                          onClick={form.submit}
                                          className="bg-blue-500 text-white px-4 py-2 rounded"
                                    >
                                          Save
                                    </Button>
                              </div>
                        </Form>
                  </Modal>
            </>
      );
};

export default EditGovtJobs;
