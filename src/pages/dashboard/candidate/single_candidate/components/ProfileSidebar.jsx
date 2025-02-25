import { Avatar, Modal, Rate, Select } from 'antd'
import { LinkedinFilled, FacebookFilled } from '@ant-design/icons'
import { useContext, useEffect, useState } from 'react';
import TextArea from 'antd/es/input/TextArea';
import ReactQuill from 'react-quill';
import sweet_alert from '../../../../../utils/custom_alert';
import { Kalbela_AuthProvider } from '../../../../../context/MainContext';

const jobApplicationStatuses = [
      "Applied",
      "Review",
      "Shortlisted",
      "Interview",
      "Interviewed",
      "Offered",
      "Accepted",
      "Rejected",
      "Withdrawn"
];

const statusesRequiringNotes = ["Rejected", "Interview", "Offered"];





export default function ProfileSidebar({ data }) {

      console.log(data);

      const { base_url, user } = useContext(Kalbela_AuthProvider);
      const [status, setStatus] = useState(data.status);
      const [isModalVisible, setIsModalVisible] = useState(false);
      const [note, setNote] = useState('');
      const [tempStatus, setTempStatus] = useState('');


      useEffect(() => {
            setStatus(data.status);
      }, [data.status]);

      const handleStatusChange = (newStatus) => {
            console.log(newStatus, 'newStatus');
            if (statusesRequiringNotes.includes(newStatus)) {
                  setTempStatus(newStatus);
                  setIsModalVisible(true);
            } else {
                  setStatus(newStatus);
                  fetch(`${base_url}/employer/update?candidate_id=${data._id}`, {
                        method: 'PUT',
                        headers: {
                              'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                              status: newStatus,
                        }),
                  }).then((res) => res.json())
                        .then((data) => {
                              if (!data.error) {
                                    handleSendMessage(newStatus);
                                    sweet_alert("Success", data.message, "success");
                              }
                              else {
                                    sweet_alert("Error", data.message, "error");
                              }
                        });

            }
      };

      const handleModalCancel = () => {
            setIsModalVisible(false);
            setNote('');
      };

      const stripHtml = (html) => {
            let doc = new DOMParser().parseFromString(html, "text/html");
            return doc.body.textContent || "";
      };

      const handleModalOk = () => {
            setStatus(tempStatus);
            setIsModalVisible(false);
            fetch(`${base_url}/employer/update?candidate_id=${data._id}`, {
                  method: 'PUT',
                  headers: {
                        'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                        status: tempStatus,
                  }),
            }).then((res) => res.json())
                  .then((data) => {
                        handleSendMessage(tempStatus);
                        handleSendNote(note);
                        if (!data.error) {
                              sweet_alert("Success", data.message, "success");
                        }
                        else {
                              sweet_alert("Error", data.message, "error");
                        }
                  });
            setNote('');

      };



      const handleSendMessage = async (status) => {

            const newMessage = {
                  to: data.user_id,
                  sender: user._id,
                  content: `Your job application has been changed to ${status}`,
                  timestamp: new Date().toISOString(),
            };

            fetch(`${base_url}/chat/add-new-chat?token=${user._id}`, {
                  method: "POST",
                  headers: {
                        "Content-Type": "application/json",
                  },
                  body: JSON.stringify(newMessage),
            })
                  .then((res) => res.json())
                  .then((data) => {

                  });


      };

      const handleSendNote = async (note) => {

            const newMessage = {
                  to: data.user_id,
                  sender: user._id,
                  content: note,
                  timestamp: new Date().toISOString(),
            };

            fetch(`${base_url}/chat/add-new-chat?token=${user._id}`, {
                  method: "POST",
                  headers: {
                        "Content-Type": "application/json",
                  },
                  body: JSON.stringify(newMessage),
            })
                  .then((res) => res.json())
                  .then((data) => {

                  });


      };


      return (
            <div className="w-80 bg-white p-6 border-r">
                  <div className="text-center mb-6">
                        <Avatar size={80} src={data?.user?.profile_picture} />
                        <h2 className="text-xl font-semibold mt-2">{data?.user?.fullName}</h2>
                        <p className="text-gray-500 text-sm">{data?.user_email}</p>
                        <Select
                              style={{ width: '100%', marginTop: '16px' }}
                              value={status}
                              onChange={handleStatusChange}
                        >
                              {jobApplicationStatuses.map((statusOption) => (
                                    <Option key={statusOption} value={statusOption}>{statusOption}</Option>
                              ))}
                        </Select>
                  </div>

                  <Modal
                        className="my-modal"
                        title={`Add note for ${tempStatus} status`}
                        visible={isModalVisible}
                        onOk={handleModalOk}
                        onCancel={handleModalCancel}
                        okText="Save"
                        cancelText="Cancel"
                  >
                        <ReactQuill
                              value={note}
                              onChange={(e) => setNote(e)}
                              placeholder="Enter your note here..."
                              aria-label="Status change note"
                        />
                  </Modal>

                  <div className="space-y-4">

                        <div className="space-y-1">
                              <label className="text-sm text-gray-500">Phone Number</label>
                              <p className="font-medium">{data?.user_phone_number}</p>
                        </div>

                        <div className="space-y-1">
                              <label className="text-sm text-gray-500">Date of Application</label>
                              <p className="font-medium">{new Date(data?.created_at).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                              })}</p>
                        </div>

                        <div className="space-y-1 items-center flex gap-2">
                              <label className="text-sm text-gray-500">Rate</label>
                              <Rate defaultValue={0} />
                        </div>

                        {data?.user?.social_media && <div className="space-y-1">
                              <label className="text-sm text-gray-500">Social Profiles</label>
                              <div className="flex gap-2">
                                    <a href="#" className="text-blue-600 hover:text-blue-700">
                                          <LinkedinFilled className="text-xl" />
                                    </a>
                                    <a href="#" className="text-blue-600 hover:text-blue-700">
                                          <FacebookFilled className="text-xl" />
                                    </a>
                              </div>
                        </div>}

                        <button className="w-full bg-blue-50 text-blue-600 rounded-md py-2 mt-4">
                              Email {data?.user?.fullName}
                        </button>
                  </div>
            </div>
      )
}
