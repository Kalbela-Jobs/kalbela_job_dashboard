const Custom_Input = ({ label, name, type, placeholder, onchange_function, default_value }) => {
      return (


            <label label
                  htmlFor={name}
                  className="relative block w-full h-10 px-4 rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
            >
                  <input
                        onChange={onchange_function}
                        defaultValue={default_value}
                        type={type}
                        id={name}
                        name={name}
                        placeholder={placeholder}
                        className="peer border-none w-full h-10 bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0"
                  />

                  <span
                        className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs"
                  >
                        {label}
                  </span>
            </label>
      );
};

export default Custom_Input;
