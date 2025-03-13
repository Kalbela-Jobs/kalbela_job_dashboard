import {
  FileTextOutlined,
  UploadOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Modal, Tabs, Upload } from "antd";
import React, { useState } from "react";

const EvaluationPage = () => {
  const [assingmentModal, setAssingmentModal] = useState(false);

  const [fileList, setFileList] = useState([
    {
      uid: "-1",
      name: "image.png",
      status: "done",
      url: "http://www.baidu.com/image.png",
    },
  ]);
  const handleChange = (info) => {
    let newFileList = [...info.fileList];

    // 1. Limit the number of uploaded files
    // Only to show two recent uploaded files, and old ones will be replaced by the new
    newFileList = newFileList.slice(-2);

    // 2. Read from response and show file link
    newFileList = newFileList.map((file) => {
      if (file.response) {
        // Component will show file.url as link
        file.url = file.response.url;
      }
      return file;
    });
    setFileList(newFileList);
  };
  const props = {
    action: "https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload",
    onChange: handleChange,
    multiple: true,
  };

  const items = [
    {
      key: "1",
      label: (
        <div className="flex items-center w-[200px]  gap-10">Assessments</div>
      ),
      children: (
        <div className="w-full mx-auto p-5 border  bg-white">
          {/* Attachment Input */}
          <div className="flex items-center gap-2  justify-between">
            {/* Info Text */}
            <p className="text-gray-500 text-sm flex items-center mt-2 ">
              Add a Assingments
            </p>
            <Button
              onClick={() => setAssingmentModal(true)}
              className="bg-blue-100 text-blue-600 px-4 py-2 rounded-md"
            >
              Assingments
            </Button>
          </div>
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <div className="flex items-center w-[200px]  gap-2">Attachments</div>
      ),
      children: (
        <div className="w-full mx-auto p-5 border  bg-white">
          {/* Attachment Input */}
          <div className="flex items-center  gap-2 mb-4">
            <input
              type="text"
              placeholder="Attachment Name"
              className="w-full border rounded-md p-2 outline-none focus:ring-2 focus:ring-blue-400"
            />

            <Upload {...props} fileList={fileList}>
              <Button
                className="bg-blue-100 text-blue-600 px-4 py-2 rounded-md"
                icon={<UploadOutlined />}
              >
                Browse..
              </Button>
            </Upload>
          </div>

          {/* Comment Box */}
          <textarea
            placeholder="Add comment"
            className="w-full border rounded-md p-3 min-h-[100px] outline-none focus:ring-2 focus:ring-blue-400"
          ></textarea>

          {/* Info Text */}
          <p className="text-gray-500 text-sm flex items-center mt-2">
            🔒 Only team members can see attachments.
          </p>

          {/* Footer Section */}
          <div className="flex justify-end items-center mt-4">
            <div className="flex gap-2">
              <button className="bg-red-100 text-red-500 px-4 py-2 rounded-md">
                Cancel
              </button>
              <button className="bg-blue-100 text-blue-600 px-4 py-2 rounded-md">
                Upload
              </button>
            </div>
          </div>
        </div>
      ),
    },
  ];
  return (
    <div>
      <Tabs
        defaultActiveKey="1"
        items={items}
        className="bg-white w-full rounded-lg p-4"
      />

      <Modal
        title={<span className="text-xl font-bold"> Assign Assessments</span>}
        footer={null}
        open={assingmentModal}
        onCancel={() => setAssingmentModal(false)}
        className="flex items-center justify-center"
      >
        <div className="border-t  w-[450px] mx-auto">
          <div className="w-full p-4 ">
            {/* Select Platform */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Select platform<span className="text-red-500">*</span>
              </label>
              <select className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500">
                <option>EasyJobs</option>
              </select>
            </div>

            {/* Select Assessment */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Select assessment<span className="text-red-500">*</span>
              </label>
              <select className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500">
                <option>Select assessment</option>
              </select>
            </div>

            {/* Expire Date */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Expire date<span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="mm/dd/yyyy"
              />
            </div>
          </div>

          <div className="flex justify-end font-bold ">
            <Button className="bg-blue-700 text-white hover:text-black">
              Assign Assessment
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default EvaluationPage;
