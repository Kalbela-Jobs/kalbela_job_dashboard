import React from 'react';
import { Modal, Descriptions, Image } from 'antd';

const ViewJobModal = ({ job, onClose }) => {
      if (!job) return null;

      return (
            <Modal
                  title="Job Details"
                  visible={!!job}
                  onCancel={onClose}
                  footer={null}
                  width={800}
            >
                  <Descriptions bordered column={1}>
                        <Descriptions.Item label="Title">{job?.title}</Descriptions.Item>
                        <Descriptions.Item label="Department">{job?.department}</Descriptions.Item>
                        <Descriptions.Item label="Organization Logo">
                              <Image src={job?.org_logo_url || "/placeholder.svg"} alt="Organization Logo" width={200} />
                        </Descriptions.Item>
                        <Descriptions.Item label="Advertisement No">{job?.advertisementNo}</Descriptions.Item>
                        <Descriptions.Item label="Vacancy">{job?.vacancy}</Descriptions.Item>
                        <Descriptions.Item label="Application Start Date">
                              {new Date(job?.applicationStartDate).toDateString()}
                        </Descriptions.Item>
                        <Descriptions.Item label="Application Deadline">
                              {new Date(job?.applicationDeadline).toDateString()}
                        </Descriptions.Item>
                        <Descriptions.Item label="Organization Information">{job?.organizationInfo}</Descriptions.Item>
                        <Descriptions.Item label="Document">
                              <a href={job?.document_url} target="_blank" rel="noopener noreferrer">View Document</a>
                        </Descriptions.Item>
                        <Descriptions.Item label="Hyperlink">
                              <a href={job?.hyperlink} target="_blank" rel="noopener noreferrer">{job?.hyperlink}</a>
                        </Descriptions.Item>
                  </Descriptions>
            </Modal>
      );
};

export default ViewJobModal;
