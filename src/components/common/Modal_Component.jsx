import { X } from "lucide-react";

const Modal_Component = ({ modal, set_modal, JSX, title, controlWidth }) => {
  return (
    <div
      className={`fixed z-40 top-0 ${
        controlWidth ? "lg:left-60" : "left-0"
      } right-0  flex h-full min-h-screen items-center justify-center p-10  bg-black bg-opacity-40 px-4 py-5 ${
        modal ? "block" : "hidden"
      }`}
    >
      <div
        className={`w-full rounded-3xl bg-white pb-10  text-center ${
          controlWidth ? "w-[80%] mx-auto" : " max-w-[850px]"
        } `}
      >
        <div className="flex justify-between z-40 pt-4 items-start w-full sticky top-0 bg-gray-800 border-b border-gray-300 rounded-t-[18px] px-10">
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

        <div className="lg:max-h-[700px] max-h-[450px] px-4 text-start bar rounded overflow-y-auto">
          {JSX}
        </div>
      </div>
    </div>
  );
};

export default Modal_Component;
