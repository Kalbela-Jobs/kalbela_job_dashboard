import React, { useContext } from 'react';
import { Form, Input, DatePicker, Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import moment from 'moment';
import uploadImage from '../../../../../hooks/upload_image';
import { Kalbela_AuthProvider } from '../../../../../context/MainContext';
import sweet_alert from '../../../../../utils/custom_alert';
import { useNavigate } from 'react-router-dom';

const AddEditJobForm = ({ onSubmit, initialValues }) => {
      const [form] = Form.useForm();
      const { base_url, workspace, user } = useContext(Kalbela_AuthProvider)

      const navigate = useNavigate();

      const handleSubmit = async (values) => {
            try {

                  const document_file = values.document.file.originFileObj;
                  const org_logo_file = values.org_logo[0].originFileObj;
                  const document_url = await uploadImage(document_file);
                  const org_logo_url = await uploadImage(org_logo_file);
                  values.document_url = document_url;
                  values.org_logo_url = org_logo_url;
                  delete values.document && delete values.org_logo;
                  fetch(`${base_url}/jobs/create-govt-jobs`, {
                        method: "POST",
                        headers: {
                              "Content-Type": "application/json",
                        },
                        body: JSON.stringify(values),
                  }).then((res) => res.json())
                        .then((data) => {
                              if (!data.error) {
                                    sweet_alert("Success", data.message, "success");
                                    navigate("/admin/govt-jobs");
                              } else {
                                    sweet_alert("Error", data.message, "error");
                              }
                        });;

            } catch (error) {
                  console.error('File upload failed', error);
                  // Notify the user about the failure
            }
      };

      return (
            <Form
                  form={form}
                  layout="vertical"
                  onFinish={handleSubmit}
                  initialValues={{
                        ...initialValues,
                        applicationStartDate: initialValues?.applicationStartDate
                              ? moment(initialValues.applicationStartDate)
                              : null,
                        applicationDeadline: initialValues?.applicationDeadline
                              ? moment(initialValues.applicationDeadline)
                              : null,
                  }}
                  className="mb-8 bg-white p-6 rounded-lg shadow md:m-20 m-4"
            >
                  <Form.Item name="title" label="Title" rules={[{ required: true }]}>
                        <Input maxLength={100} />
                  </Form.Item>
                  <Form.Item name="department" label="Department" rules={[{ required: true }]}>
                        <Input />
                  </Form.Item>
                  <Form.Item
                        name="org_logo"
                        label="Organization Logo"
                        valuePropName="fileList"
                        getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
                        rules={[{ required: true, message: 'Please upload an organization logo' }]}
                  >
                        <Upload accept="image/*" listType="picture" maxCount={1}>
                              <Button icon={<UploadOutlined />}>Click to upload</Button>
                        </Upload>
                  </Form.Item>
                  <Form.Item name="advertisementNo" label="Advertisement No" rules={[{ required: true }]}>
                        <Input />
                  </Form.Item>
                  <Form.Item name="vacancy" label="Vacancy" rules={[{ required: true }]}>
                        <Input type="number" />
                  </Form.Item>
                  <Form.Item name="applicationStartDate" label="Application Start Date" rules={[{ required: true }]}>
                        <DatePicker className="w-full" />
                  </Form.Item>
                  <Form.Item name="applicationDeadline" label="Application Deadline" rules={[{ required: true }]}>
                        <DatePicker className="w-full" />
                  </Form.Item>
                  <Form.Item name="organizationInfo" label="Organization Information" rules={[{ required: true }]}>
                        <Input.TextArea rows={4} />
                  </Form.Item>
                  <Form.Item name="document" label="Upload Document (PDF)" rules={[{ required: true }]}>
                        <Upload accept=".pdf" maxCount={1}>
                              <Button icon={<UploadOutlined />}>Click to upload</Button>
                        </Upload>
                  </Form.Item>
                  <Form.Item name="hyperlink" label="Hyperlink" rules={[{ required: true, type: 'url' }]}>
                        <Input />
                  </Form.Item>
                  <Form.Item>
                        <Button type="primary" htmlType="submit">
                              {initialValues ? 'Update Job' : 'Add Job'}
                        </Button>
                  </Form.Item>
            </Form>
      );
};

export default AddEditJobForm;
