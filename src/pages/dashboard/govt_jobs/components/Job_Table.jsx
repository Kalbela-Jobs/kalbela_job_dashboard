import React from 'react';
import { Table, Button, Space } from 'antd';
import { EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';

const JobsTable = ({ jobs, onEdit, onDelete, onView }) => {
      const columns = [
            {
                  title: 'Title',
                  dataIndex: 'title',
                  key: 'title',
            },
            {
                  title: 'Department',
                  dataIndex: 'department',
                  key: 'department',
            },
            {
                  title: 'Advertisement No',
                  dataIndex: 'advertisementNo',
                  key: 'advertisementNo',
            },
            {
                  title: 'Vacancy',
                  dataIndex: 'vacancy',
                  key: 'vacancy',
            },
            {
                  title: 'Application Deadline',
                  dataIndex: 'applicationDeadline',
                  key: 'applicationDeadline',
                  render: (date) => new Date(date).toDateString(),
            },
            {
                  title: 'Actions',
                  key: 'actions',
                  render: (_, record) => (
                        <Space>
                              <Button icon={<EyeOutlined />} onClick={() => onView(record)} />
                              <Button icon={<EditOutlined />} onClick={() => onEdit(record)} />
                              <Button icon={<DeleteOutlined />} onClick={() => onDelete(record._id)} danger />
                        </Space>
                  ),
            },
      ];

      return (
            <Table
                  columns={columns}
                  dataSource={jobs}
                  rowKey="id"
                  pagination={{
                        pageSize: 10,
                        showSizeChanger: true,
                        showQuickJumper: true,
                  }}
                  className="bg-white rounded-lg shadow"
            />
      );
};

export default JobsTable;
