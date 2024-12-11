import { LogOut, SearchCheck } from "lucide-react";
import { useContext, useEffect } from "react";
import MyContext from "../../context/Dashboard_context";
import { Link } from "react-router-dom";
import { navitems } from "../../utils/dashboard_menu";

const Sidebar = () => {
  const { open, setOpen } = useContext(MyContext);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setOpen(true); // Hide if screen width < 640px (sm breakpoint in Tailwind CSS)
      } else {
        setOpen(false);
      }
    };

    handleResize(); // Run on mount
    window.addEventListener("resize", handleResize); // Update on resize
    return () => window.removeEventListener("resize", handleResize); // Cleanup
  }, [setOpen]);

  return (
    <div
      className={`bg-blue-500 xl:flex h-screen  xl:flex-col relative ${
        open ? "px-6" : "px-10"
      } `}
    >
      <div className="flex flex-col pt-5 overflow-y-auto">
        <div className="flex flex-col justify-between flex-1 h-full">
          <div className="space-y-4">
            <nav className="flex-1 space-y-1">
              <div>
                <Link
                  to="#"
                  className="flex items-center text-white gap-2  space-x-2 p-2  py-2.5 text-sm font-medium "
                >
                  <div>
                    <SearchCheck className="w-8 h-8" />
                  </div>
                  <h2 className={`${open && "hidden"} `}>Easy Jobs</h2>
                </Link>

                {navitems.map((item, index) => (
                  <div key={index} className="flex items-center space-x-2 p-2">
                    <div className="border p-2 transition-all duration-200 text-white hover:text-blue-700 rounded-lg hover:bg-gray-200 cursor-pointer group">
                      <item.icon className="w-6 h-6 " />
                    </div>
                    <h3 className={`${open && "hidden"} text-white`}>
                      {item.title}
                    </h3>
                  </div>
                ))}
              </div>
            </nav>
          </div>

          <div className="pb-4 mt-12 absolute bottom-2">
            <nav className="flex-1 space-y-1">
              <Link
                to="#"
                className="flex items-center gap-2  py-2.5 text-sm font-medium text-white"
              >
                <div className="border p-2 transition-all duration-200 hover:text-blue-700 rounded-lg hover:bg-gray-200 group">
                  <LogOut className="w-5 h-5" />
                </div>

                <h2 className={`${open && "hidden"}`}> Logout</h2>
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
