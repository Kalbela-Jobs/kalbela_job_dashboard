const Work_space_input = ({ icon, place_holder, id, type, functions }) => {
      return (

            <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                        {icon}
                  </div>

                  <input
                        onChange={functions ?? ''}
                        type={type}
                        name={id}
                        id={id}
                        placeholder={place_holder}
                        className="block w-full  py-4 pl-12 pr-4 overflow-hidden text-base font-normal  text-gray-900 dark:text-white placeholder-gray-600 transition-all duration-200 border border-gray-300  caret-gray-900 rounded-xl bg-gray-50 focus:outline-gray-50 dark:bg-light-dark  focus:border-gray-900 focus:ring-gray-900 font-pj "
                  />
            </div>

      );
};

export default Work_space_input;
