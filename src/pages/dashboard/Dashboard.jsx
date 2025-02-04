import { useState } from "react"
import { Card, Table, Tag, Dropdown, Menu, Button, Avatar } from "antd"
import { MoreOutlined, ArrowUpOutlined, UserOutlined } from "@ant-design/icons"

const Dashboard = () => {
      const [hrData] = useState({
            openPositions: 12,
            totalEmployees: 238,
            ongoingInterviews: 24,
            newApplications: 56,
      })

      const [recentApplications] = useState([
            {
                  key: "1",
                  status: "Pending",
                  name: "John Doe",
                  position: "Software Engineer",
                  appliedDate: "Jan 17, 2024",
                  experience: "5 years",
            },
            {
                  key: "2",
                  status: "Interviewing",
                  name: "Jane Smith",
                  position: "Product Manager",
                  appliedDate: "Jan 16, 2024",
                  experience: "7 years",
            },
            {
                  key: "3",
                  status: "Rejected",
                  name: "Mike Johnson",
                  position: "UX Designer",
                  appliedDate: "Jan 15, 2024",
                  experience: "3 years",
            },
            {
                  key: "4",
                  status: "Hired",
                  name: "Emily Brown",
                  position: "Data Analyst",
                  appliedDate: "Jan 14, 2024",
                  experience: "4 years",
            },
      ])

      const [recentEmployees] = useState([
            {
                  key: "1",
                  name: "Jenny Wilson",
                  position: "HR Manager",
                  department: "Human Resources",
                  joinDate: "Jan 1, 2024",
                  avatar: "/placeholder.svg?height=40&width=40",
            },
            {
                  key: "2",
                  name: "Devon Lane",
                  position: "Software Engineer",
                  department: "Engineering",
                  joinDate: "Jan 5, 2024",
                  avatar: "/placeholder.svg?height=40&width=40",
            },
            {
                  key: "3",
                  name: "Alex Morgan",
                  position: "Marketing Specialist",
                  department: "Marketing",
                  joinDate: "Jan 10, 2024",
                  avatar: "/placeholder.svg?height=40&width=40",
            },
      ])

      const columns = [
            {
                  title: "Status",
                  dataIndex: "status",
                  key: "status",
                  render: (status) => (
                        <Tag
                              color={
                                    status === "Pending" ? "blue" : status === "Interviewing" ? "orange" : status === "Hired" ? "green" : "red"
                              }
                        >
                              {status}
                        </Tag>
                  ),
            },
            {
                  title: "Name",
                  dataIndex: "name",
                  key: "name",
            },
            {
                  title: "Position",
                  dataIndex: "position",
                  key: "position",
            },
            {
                  title: "Applied Date",
                  dataIndex: "appliedDate",
                  key: "appliedDate",
            },
            {
                  title: "Experience",
                  dataIndex: "experience",
                  key: "experience",
            },
            {
                  title: "Action",
                  key: "action",
                  render: () => (
                        <Dropdown overlay={menu} trigger={["click"]}>
                              <Button icon={<MoreOutlined />} />
                        </Dropdown>
                  ),
            },
      ]

      const menu = (
            <Menu>
                  <Menu.Item key="1">View details</Menu.Item>
                  <Menu.Item key="2">Schedule interview</Menu.Item>
                  <Menu.Item key="3">Send email</Menu.Item>
                  <Menu.Item key="4" danger>
                        Reject application
                  </Menu.Item>
            </Menu>
      )

      return (
            <div className="flex flex-col flex-1 overflow-x-hidden">
                  <main className="py-6">
                        <div className="px-4 mx-auto sm:px-6 md:px-8">
                              <h1 className="text-2xl font-semibold text-gray-900 mb-6">HR Dashboard</h1>
                              <div className="space-y-5 sm:space-y-6">
                                    {/* HR Statistics */}
                                    <div className="grid grid-cols-1 gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
                                          <Card>
                                                <p className="text-xs font-medium tracking-wider text-gray-500 uppercase">Open Positions</p>
                                                <div className="flex items-center justify-between mt-3">
                                                      <p className="text-xl font-bold text-gray-900">{hrData.openPositions}</p>
                                                      <span className="inline-flex items-center text-sm font-semibold text-green-500">
                                                            + 2
                                                            <ArrowUpOutlined className="ml-1" />
                                                      </span>
                                                </div>
                                          </Card>

                                          <Card>
                                                <p className="text-xs font-medium tracking-wider text-gray-500 uppercase">Total Employees</p>
                                                <div className="flex items-center justify-between mt-3">
                                                      <p className="text-xl font-bold text-gray-900">{hrData.totalEmployees}</p>
                                                      <span className="inline-flex items-center text-sm font-semibold text-green-500">
                                                            + 5
                                                            <ArrowUpOutlined className="ml-1" />
                                                      </span>
                                                </div>
                                          </Card>

                                          <Card>
                                                <p className="text-xs font-medium tracking-wider text-gray-500 uppercase">Ongoing Interviews</p>
                                                <div className="flex items-center justify-between mt-3">
                                                      <p className="text-xl font-bold text-gray-900">{hrData.ongoingInterviews}</p>
                                                      <span className="inline-flex items-center text-sm font-semibold text-blue-500">
                                                            + 3
                                                            <ArrowUpOutlined className="ml-1" />
                                                      </span>
                                                </div>
                                          </Card>

                                          <Card>
                                                <p className="text-xs font-medium tracking-wider text-gray-500 uppercase">New Applications</p>
                                                <div className="flex items-center justify-between mt-3">
                                                      <p className="text-xl font-bold text-gray-900">{hrData.newApplications}</p>
                                                      <span className="inline-flex items-center text-sm font-semibold text-green-500">
                                                            + 12
                                                            <ArrowUpOutlined className="ml-1" />
                                                      </span>
                                                </div>
                                          </Card>
                                    </div>

                                    {/* Recent Applications */}
                                    <Card title="Recent Applications" extra={<a href="#">View all applications</a>}>
                                          <Table columns={columns} dataSource={recentApplications} pagination={false} />
                                    </Card>

                                    {/* Recent Employees */}
                                    <Card title="Recently Hired Employees" extra={<a href="#">View all employees</a>}>
                                          {recentEmployees.map((employee) => (
                                                <div key={employee.key} className="flex items-center justify-between mb-4">
                                                      <div className="flex items-center">
                                                            <Avatar src={employee.avatar} icon={<UserOutlined />} />
                                                            <div className="ml-4">
                                                                  <p className="text-sm font-bold text-gray-900">{employee.name}</p>
                                                                  <p className="text-sm text-gray-500">{employee.position}</p>
                                                            </div>
                                                      </div>
                                                      <div className="text-right">
                                                            <p className="text-sm font-medium text-gray-900">{employee.department}</p>
                                                            <p className="text-sm text-gray-500">Joined: {employee.joinDate}</p>
                                                      </div>
                                                </div>
                                          ))}
                                    </Card>
                              </div>
                        </div>
                  </main>
            </div>
      )
}

export default Dashboard
