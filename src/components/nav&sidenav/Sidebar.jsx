const Sidebar = () => {
  return (
    <div className="hidden xl:flex xl:w-64 xl:flex-col">
      <div className="flex flex-col pt-5 overflow-y-auto">
        <div className="flex flex-col justify-between flex-1 h-full px-4">
          <div className="space-y-4">
            {/* Connect Job Post button */}
            <div>
              <button
                type="button"
                className="inline-flex items-center justify-center w-full px-4 py-3 text-sm font-semibold leading-5 text-white transition-all duration-200 bg-indigo-600 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 hover:bg-indigo-500"
              >
                <svg
                  className="w-5 h-5 mr-1"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                Connect Job Post
              </button>
            </div>

            {/* Navigation items */}
            <nav className="flex-1 space-y-1">
              <a
                href="#"
                className="flex items-center px-4 py-2.5 text-sm font-medium transition-all duration-200 text-gray-900 rounded-lg hover:bg-gray-200 group"
              >
                <svg
                  className="flex-shrink-0 w-5 h-5 mr-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                Dashboard
              </a>
              {/* Add more navigation items here */}
            </nav>

            {/* Analytics section */}
            <div>
              <p className="px-4 text-xs font-semibold tracking-widest text-gray-400 uppercase">
                Analytics
              </p>
              <nav className="flex-1 mt-4 space-y-1">
                {/* Add analytics navigation items here */}
              </nav>
            </div>

            {/* Support section */}
            <div>
              <p className="px-4 text-xs font-semibold tracking-widest text-gray-400 uppercase">
                Support
              </p>
              <nav className="flex-1 mt-4 space-y-1">
                {/* Add support navigation items here */}
              </nav>
            </div>

            {/* Shop section */}
            <div>
              <p className="px-4 text-xs font-semibold tracking-widest text-gray-400 uppercase">
                Shop
              </p>
              <nav className="flex-1 mt-4 space-y-1">
                {/* Add shop navigation items here */}
              </nav>
            </div>
          </div>

          {/* Footer navigation */}
          <div className="pb-4 mt-12">
            <nav className="flex-1 space-y-1">
              {/* Add footer navigation items here */}
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
