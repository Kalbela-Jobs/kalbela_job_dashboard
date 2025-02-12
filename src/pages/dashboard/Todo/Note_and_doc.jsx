'use client';

import React, { useState, useCallback } from 'react';
import { Upload, List, Button, message, Typography } from 'antd';
import { InboxOutlined, FileOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';

const { Dragger } = Upload;
const { Title } = Typography;

const NoteAndDoc = () => {
      const [files, setFiles] = useState([]);

      const handleUpload = useCallback(({ file, onSuccess }) => {
            setTimeout(() => {
                  setFiles((prevFiles) => [...prevFiles, file]);
                  onSuccess("ok");
            }, 0);
      }, []);

      const handleRemove = (file) => {
            setFiles((prevFiles) => prevFiles.filter((f) => f.uid !== file.uid));
            message.success(`${file.name} removed successfully`);
      };

      const handlePreview = (file) => {
            const previewUrl = URL.createObjectURL(file);
            window.open(previewUrl, '_blank');
      };

      const fileList = files.map((file) => ({
            uid: file.uid,
            name: file.name,
            status: 'done',
            url: URL.createObjectURL(file),
      }));

      return (
            <div className="p-6 bg-white rounded-lg shadow-md w-full max-w-3xl mx-auto">
                  <Title level={2} className="mb-6 text-center">Upload and Preview Notes/Documents</Title>
                  <Dragger
                        customRequest={handleUpload}
                        multiple={true}
                        fileList={fileList}
                        onRemove={handleRemove}
                        className="mb-8"
                  >
                        <p className="ant-upload-drag-icon">
                              <InboxOutlined />
                        </p>
                        <p className="ant-upload-text">Click or drag file to this area to upload</p>
                        <p className="ant-upload-hint">
                              Support for a single or bulk upload. Strictly prohibit from uploading company data or other
                              sensitive files.
                        </p>
                  </Dragger>
                  {files.length > 0 && (
                        <List
                              itemLayout="horizontal"
                              dataSource={fileList}
                              renderItem={(file) => (
                                    <List.Item
                                          actions={[
                                                <Button
                                                      key="preview" // Added key prop here
                                                      icon={<EyeOutlined />}
                                                      onClick={() => handlePreview(file)}
                                                      type="link"
                                                >
                                                      Preview
                                                </Button>,
                                                <Button
                                                      key="remove" // Added key prop here
                                                      icon={<DeleteOutlined />}
                                                      onClick={() => handleRemove(file)}
                                                      type="link"
                                                      danger
                                                >
                                                      Remove
                                                </Button>,
                                          ]}
                                    >
                                          <List.Item.Meta
                                                avatar={<FileOutlined style={{ fontSize: '24px' }} />}
                                                title={file.name}
                                                description={`Size: ${(file.size / 1024).toFixed(2)} KB`}
                                          />
                                    </List.Item>
                              )}
                        />
                  )}
            </div>
      );
};

export default NoteAndDoc;
