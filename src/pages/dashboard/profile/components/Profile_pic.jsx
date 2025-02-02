import React, { useContext, useState } from "react";
import { Upload, Image, message } from "antd";
import ImgCrop from "antd-img-crop";
import { Kalbela_AuthProvider } from "../../../../context/MainContext";
import uploadImage from "../../../../hooks/upload_image";

const ProfilePic = () => {
      const { user, setUser, setCookie, base_url } = useContext(Kalbela_AuthProvider);
      const [previewOpen, setPreviewOpen] = useState(false);
      const [previewImage, setPreviewImage] = useState("");

      const handleChange = async ({ fileList: newFileList }) => {
            if (newFileList.length) {
                  const file = newFileList[0].originFileObj;
                  const profile_pic = await uploadImage(file);

                  fetch(`${base_url}/user/update-profile?id=${user._id}`, {
                        method: "PUT",
                        headers: {
                              "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                              profile_picture: profile_pic,
                        }),
                  })
                        .then((res) => res.json())
                        .then((data) => {
                              setUser(data.data);
                              setCookie("kal_bela_jobs_user", data.data, 365);
                        });
            }
      };

      const beforeUpload = (file) => {
            const isImage = file.type.startsWith("image/");
            if (!isImage) {
                  message.error("You can only upload image files!");
                  return false;
            }
            return true;
      };

      return (
            <div className="flex flex-col items-center gap-4">
                  <ImgCrop rotationSlider>
                        <Upload
                              listType="picture-card"
                              showUploadList={false} // Disable default preview UI
                              onChange={handleChange}
                              beforeUpload={beforeUpload}
                              maxCount={1}
                              className="profile-upload border-none"
                        >
                              <div className="flex flex-col items-center justify-center cursor-pointer">
                                    {user?.profile_picture ? (
                                          <img
                                                src={user.profile_picture}
                                                alt="Profile"
                                                className="w-24 h-24 rounded-full object-cover border border-gray-300 shadow-md"
                                          />
                                    ) : (
                                          <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center shadow-md">
                                                <span className="text-gray-400 text-sm">Upload</span>
                                          </div>
                                    )}
                                    <span className="mt-2 text-blue-500 hover:underline text-sm">
                                          Change Picture
                                    </span>
                              </div>
                        </Upload>
                  </ImgCrop>

                  {previewImage && (
                        <Image
                              wrapperStyle={{ display: "none" }}
                              preview={{
                                    visible: previewOpen,
                                    onVisibleChange: (visible) => setPreviewOpen(visible),
                              }}
                              src={previewImage}
                        />
                  )}
            </div>
      );
};

export default ProfilePic;
