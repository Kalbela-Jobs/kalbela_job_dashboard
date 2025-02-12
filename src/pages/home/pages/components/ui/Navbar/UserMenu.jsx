import { UserOutlined } from "@ant-design/icons";
import { Avatar, Dropdown, Menu } from "antd";
import { Link } from "react-router-dom";

const UserMenu = ({ loginOut, user }) => {
      const menu = (
            <Menu className="shadow-md bg-gray-900 rounded-lg">
                  <div className="p-3 border-b">
                        <p className="text-sm font-semibold">{user.name}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                  <Menu.Item key="dashboard">
                        <Link to="/admin">Dashboard</Link>
                  </Menu.Item>
                  <Menu.Item key="profile">
                        <Link to="/admin/profile">Profile</Link>
                  </Menu.Item>
                  <Menu.Item key="settings">
                        <Link to="/admin/settings">Settings</Link>
                  </Menu.Item>
                  <Menu.Divider />
                  <Menu.Item key="logout">
                        <button onClick={() => loginOut()}>Log out</button>
                  </Menu.Item>
            </Menu>
      );

      return (
            <div className="flex bg-gray-900 items-center gap-x-4">
                  <Dropdown placement="bottomRight" className="bg-gray-900" overlay={menu} trigger={["click"]}>
                        <div className="cursor-pointer bg-gray-900">
                              {user.avatar ? (
                                    <Avatar src={user.avatar} size={40} />
                              ) : (
                                    <Avatar size={40} icon={<UserOutlined />} />
                              )}
                        </div>
                  </Dropdown>
            </div>
      );
};
export default UserMenu;
