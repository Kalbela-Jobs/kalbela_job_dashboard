import { X } from "lucide-react";


const Modal_Component = ({ modal, set_modal, JSX, title }) => {
      return (
            <div
                  className={`fixed z-50 top-0 left-0 flex h-full min-h-screen w-full items-center justify-center bg-black bg-opacity-90 px-4 py-5 ${modal ? "block" : "hidden"
                        }`}
            >
                  <div className="w-full max-w-[800px]  rounded-[20px] bg-white pb-10  text-center ">
                        <div className="flex justify-between z-50 pt-4 items-start w-full sticky top-0 bg-gray-800 border-b border-gray-300 rounded-t-[18px] px-10">
                              <div className="pb-2 text-xl font-bold text-white text-center sm:text-2xl">
                                    {title}
                              </div>
                              <div
                                    onClick={() => set_modal(!modal)}
                                    className="cursor-pointer bg-gray-300 rounded-full  mb-2 p-2 text-2xl hover:bg-gray-400"
                              >
                                    <X className="text-xl" />
                              </div>
                        </div>

                        <div className="max-h-[700px] px-10 text-start bar overflow-y-scroll">
                              {JSX}
                        </div>
                  </div>
            </div>
      );
};

export default Modal_Component;
