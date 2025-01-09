import React from 'react';
import { Card, Typography, Divider, List, Tag } from 'antd';
import { BookOutlined, CalendarOutlined, TrophyOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const Qualification = ({ data }) => {
      const { education, skills } = data;

      return (
            <div className="max-w-3xl mx-auto p-4">
                  <div>


                        <Divider orientation="left" orientationMargin="0">
                              <Title level={4} className="m-0">Education</Title>
                        </Divider>
                        <List
                              itemLayout="vertical"
                              dataSource={education}
                              renderItem={(item) => (
                                    <List.Item className="mb-4">
                                          <div className="flex items-start">
                                                <BookOutlined className="text-2xl text-blue-500 mr-4 mt-1" />
                                                <div>
                                                      <Text strong className="text-lg">{item.universityName}</Text>
                                                      <div className="mt-1">
                                                            <Text>{item.degree} in {item.major}</Text>
                                                      </div>
                                                      <div className="mt-1">
                                                            <Text type="secondary">
                                                                  <CalendarOutlined className="mr-1" />
                                                                  Graduated: {item.graduationYear}
                                                            </Text>
                                                      </div>
                                                      <div className="mt-1">
                                                            <Text type="secondary">
                                                                  <TrophyOutlined className="mr-1" />
                                                                  GPA: {item['gpa/cgpa']}
                                                            </Text>
                                                      </div>
                                                </div>
                                          </div>
                                    </List.Item>
                              )}
                        />

                        <Divider orientation="left" orientationMargin="0">
                              <Title level={4} className="m-0">Skills</Title>
                        </Divider>
                        <div className="flex flex-wrap gap-2">
                              {skills?.map((skill, index) => (
                                    <Tag key={index} color="blue" className="text-sm py-1 px-2 mb-2">
                                          {skill}
                                    </Tag>
                              ))}
                        </div>
                  </div>
            </div>
      );
};

export default Qualification;
