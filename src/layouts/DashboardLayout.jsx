import { Outlet } from "react-router-dom";
import Header from "../components/nav&sidenav/Header";
import Sidebar from "../components/nav&sidenav/Sidebar";
import MyContext from "../context/Dashboard_context";
import { useContext, useState } from "react";
import { Button } from "antd";
import { MenuOutlined } from "@ant-design/icons";

const DashboardLayout = () => {
  const { open, setOpen } = useContext(MyContext);
  //   console.log("check Open", open);
  return (
    <div className="flex">
      {open ? <Sidebar /> : ""}
      <div className={`flex-1 flex flex-col lg:ml-64 md:ml-0 w-[80%]`}>
        <div className="hidden lg:flex">
          <Header />
        </div>
        <div className="z-20 ">
          {open ? (
            ""
          ) : (
            <div className="my-2 ml-4 md:ml-6 lg:hidden">
              <Button onClick={() => setOpen(!open)}>
                <MenuOutlined />
              </Button>
            </div>
          )}

          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
