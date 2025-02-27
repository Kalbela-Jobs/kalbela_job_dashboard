import { Outlet } from "react-router-dom";
import Sidebar from "../components/nav&sidenav/Sidebar";

const Message_layout = () => {
      return (
            <div>
                  <div className="flex">
                        <Sidebar />
                        <div className={`flex-1 flex flex-col lg:ml-64 md:ml-0 w-[80%]`}>

                              <div className="z-20 ">
                                    <Outlet />
                              </div>
                        </div>
                  </div>
            </div>
      );
};

export default Message_layout;
