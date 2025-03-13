import React from "react";
import { Table, Button, Space } from "antd";
import { EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";

const JobsTable = ({ jobs, onEdit, onDelete, onView }) => {
  console.log(jobs);
  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Organization",
      dataIndex: "organization",
      key: "organization",
      render: (org) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={org.logo}
            alt={org.name}
            style={{
              width: "30px",
              height: "30px",
              marginRight: "10px",
              borderRadius: "50%",
            }}
          />
          <span>{org.name}</span>
        </div>
      ),
    },
    {
      title: "Advertisement No",
      dataIndex: "advertisementNo",
      key: "advertisementNo",
    },
    {
      title: "Vacancy",
      dataIndex: "vacancy",
      key: "vacancy",
    },
    {
      title: "Application Deadline",
      dataIndex: "applicationDeadline",
      key: "applicationDeadline",
      render: (date) => new Date(date).toDateString(),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button icon={<EyeOutlined />} onClick={() => onView(record)} />
          <Button icon={<EditOutlined />} onClick={() => onEdit(record)} />
          <Button
            icon={<DeleteOutlined />}
            onClick={() => onDelete(record._id)}
            danger
          />
        </Space>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={jobs}
      rowKey="id"
      className="bg-white rounded-lg shadow "
    />
  );
};

export default JobsTable;
