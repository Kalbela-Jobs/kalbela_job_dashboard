import { useContext } from "react";
import MyContext from "../../context/Dashboard_context";
import { Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { Kalbela_AuthProvider } from "../../context/MainContext";
import { Avatar } from "antd";
import { Button } from "antd";
import { MenuOutlined } from "@ant-design/icons";
const Header = () => {
  const { open, setOpen, setSearchQuery } = useContext(MyContext);
  const { user } = useContext(Kalbela_AuthProvider);
  return (
    <header
      className={`bg-white border-b w-full  sticky top-0 z-10 border-gray-200 `}
    >
      <div className="px-4 mx-auto">
        <div className="flex items-center justify-between h-16">
          {open ? (
            ""
          ) : (
            <div className="my-2 ml-4">
              <Button onClick={() => setOpen(!open)}>
                <MenuOutlined />
              </Button>
            </div>
          )}

          {/* <div className="flex-1 hidden max-w-xs ml-40 mr-auto lg:block">
                                    <label htmlFor="" className="sr-only">
                                          Search
                                    </label>
                                    <div className="relative">
                                          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                                <svg
                                                      className="w-5 h-5 text-gray-400"
                                                      xmlns="http://www.w3.org/2000/svg"
                                                      fill="none"
                                                      viewBox="0 0 24 24"
                                                      stroke="currentColor"
                                                      strokeWidth={2}
                                                >
                                                      <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                                      />
                                                </svg>
                                          </div>
                                          <input
                                                type="search"
                                                name=""
                                                id=""

                                                className="block w-full py-2 pl-10 border border-gray-300 rounded-lg focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm"
                                                placeholder="Type to search"
                                          />
                                    </div>
                              </div> */}

          {/* Right side icons */}
          <div className="flex items-center justify-end ml-auto space-x-6">
            <Link to={"/admin/message"} className="relative">
              <button
                type="button"
                className="p-1 text-gray-700 transition-all duration-200 bg-white rounded-full hover:text-gray-900 focus:outline-none hover:bg-gray-100"
              >
                <svg
                  className="w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </button>
              <span className="inline-flex items-center px-1.5 absolute -top-px -right-1 py-0.5 rounded-full text-xs font-semibold bg-indigo-600 text-white">
                2
              </span>
            </Link>

            {/* Notification icon */}
            <div className="relative">
              <button
                type="button"
                className="p-1 text-gray-700 transition-all duration-200 bg-white rounded-full hover:text-gray-900 focus:outline-none hover:bg-gray-100"
              >
                <svg
                  className="w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
              </button>
            </div>

            {/* User avatar */}
            <Link
              to="/admin/profile"
              type="button"
              className="flex items-center max-w-xs rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
            >
              <Avatar
                size={36} // Adjust size as needed
                src={user?.profile_picture} // Use profile picture if available
                className="bg-gray-300"
              >
                {!user?.profile_picture && user?.name?.charAt(0)}{" "}
                {/* Show user's initial if no image */}
              </Avatar>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
