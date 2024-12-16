const Custom_Button = ({ handleClick, name }) => {
      return (
            <div className="pb-4">
                  <button
                        className="group relative inline-flex items-center overflow-hidden rounded bg-gray-900 px-8 py-3 text-white focus:outline-none focus:ring active:bg-gray-500"
                        onClick={handleClick}
                  >
                        <span className="absolute -start-full transition-all group-hover:start-4">
                              <svg
                                    className="size-5 rtl:rotate-180"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                              >
                                    <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth="2"
                                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                                    />
                              </svg>
                        </span>

                        <span className="text-sm font-medium transition-all capitalize group-hover:ms-4"> {name} </span>
                  </button>
            </div>
      );
};

export default Custom_Button;
