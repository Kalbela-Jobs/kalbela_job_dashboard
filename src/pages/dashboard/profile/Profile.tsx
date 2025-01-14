import React, { useState } from 'react';
import { Card, Form, Input, Select, Switch, Button, Upload, message, Typography } from 'antd';
import { EditOutlined, SaveOutlined, UploadOutlined } from '@ant-design/icons';
import type { UploadFile } from 'antd/es/upload/interface';

const { Title, Paragraph } = Typography;
const { Option } = Select;

interface WorkspaceData {
      company_name: string;
      company_size: string;
      company_website: string;
      created_at: string;
      description: string;
      industry: string;
      logo: string;
      package: string;
      priority: string;
      status: boolean;
      updated_at: string;
      _id: string;
      cover_photo?: string;
}

const Profile: React.FC<{ initialData: WorkspaceData }> = ({ initialData }) => {
      const [isEditing, setIsEditing] = useState(false);
      const [form] = Form.useForm();
      const [coverPhoto, setCoverPhoto] = useState<UploadFile | null>(null);

      const onFinish = (values: WorkspaceData) => {
            console.log('Updated values:', values);
            // Here you would typically send the updated data to your backend
            message.success('Workspace updated successfully');
            setIsEditing(false);
      };

      const handleCoverPhotoChange = (info: any) => {
            if (info.file.status === 'done') {
                  setCoverPhoto(info.file);
                  message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === 'error') {
                  message.error(`${info.file.name} file upload failed.`);
            }
      };

      const toggleEdit = () => {
            if (isEditing) {
                  form.submit();
            } else {
                  setIsEditing(true);
            }
      };

      return (
            <Card
                  cover={
                        <div style={{ height: '200px', overflow: 'hidden', position: 'relative' }}>
                              {(coverPhoto || initialData?.cover_photo) && (
                                    <img
                                          alt="Cover Photo"
                                          src={coverPhoto ? URL.createObjectURL(coverPhoto as any) : initialData?.cover_photo}
                                          style={{ width: '100%', objectFit: 'cover', height: '100%' }}
                                    />
                              )}
                              {isEditing && (
                                    <Upload
                                          accept="image/*"
                                          showUploadList={false}
                                          onChange={handleCoverPhotoChange}
                                          style={{ position: 'absolute', bottom: '10px', right: '10px' }}
                                    >
                                          <Button icon={<UploadOutlined />}>Change Cover Photo</Button>
                                    </Upload>
                              )}
                        </div>
                  }
                  actions={[
                        <Button key="edit" onClick={toggleEdit} icon={isEditing ? <SaveOutlined /> : <EditOutlined />}>
                              {isEditing ? 'Save' : 'Edit'}
                        </Button>,
                  ]}
            >
                  <Form
                        form={form}
                        initialValues={initialData}
                        onFinish={onFinish}
                        layout="vertical"
                  >
                        <Form.Item name="company_name" label="Company Name">
                              {isEditing ? <Input /> : <Paragraph>{initialData.company_name}</Paragraph>}
                        </Form.Item>

                        <Form.Item name="company_size" label="Company Size">
                              {isEditing ? (
                                    <Select>
                                          <Option value="1-10">1-10</Option>
                                          <Option value="11-50">11-50</Option>
                                          <Option value="51-100">51-100</Option>
                                          <Option value="101-500">101-500</Option>
                                          <Option value="500+">500+</Option>
                                    </Select>
                              ) : (
                                    <Paragraph>{initialData.company_size}</Paragraph>
                              )}
                        </Form.Item>

                        <Form.Item name="company_website" label="Company Website">
                              {isEditing ? <Input /> : <Paragraph>{initialData.company_website}</Paragraph>}
                        </Form.Item>

                        <Form.Item name="description" label="Description">
                              {isEditing ? <Input.TextArea /> : <Paragraph>{initialData.description}</Paragraph>}
                        </Form.Item>

                        <Form.Item name="industry" label="Industry">
                              {isEditing ? (
                                    <Select>
                                          <Option value="it">IT</Option>
                                          <Option value="finance">Finance</Option>
                                          <Option value="healthcare">Healthcare</Option>
                                          <Option value="education">Education</Option>
                                          <Option value="other">Other</Option>
                                    </Select>
                              ) : (
                                    <Paragraph>{initialData.industry}</Paragraph>
                              )}
                        </Form.Item>

                        <Form.Item name="priority" label="Priority">
                              {isEditing ? (
                                    <Select>
                                          <Option value="low">Low</Option>
                                          <Option value="medium">Medium</Option>
                                          <Option value="high">High</Option>
                                    </Select>
                              ) : (
                                    <Paragraph>{initialData.priority}</Paragraph>
                              )}
                        </Form.Item>

                        <Form.Item name="status" label="Status" valuePropName="checked">
                              {isEditing ? <Switch /> : <Paragraph>{initialData.status ? 'Active' : 'Inactive'}</Paragraph>}
                        </Form.Item>

                        {!isEditing && (
                              <>
                                    <Title level={5}>Additional Information</Title>
                                    <Paragraph>Created At: {new Date(initialData.created_at).toLocaleString()}</Paragraph>
                                    <Paragraph>Updated At: {new Date(initialData.updated_at).toLocaleString()}</Paragraph>
                                    <Paragraph>Package: {initialData.package}</Paragraph>
                                    <Paragraph>ID: {initialData._id}</Paragraph>
                              </>
                        )}
                  </Form>
            </Card>
      );
};

export default Profile;
