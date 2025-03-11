import React, { useContext, useEffect, useState } from 'react';
import { initialMessages } from '../../../utils/message_data.js';
import './style/chat.css';
import './style/messenger.css';
import './style/sidebar.css';
import Sidebar from './components/Sidebar.jsx';
import ChatArea from './components/ChatArea.jsx';
import { Kalbela_AuthProvider } from '../../../context/MainContext.jsx';
import { useQuery } from '@tanstack/react-query';
import upload_audio from '../../../hooks/upload_audio.js';
import uploadImage from '../../../hooks/upload_image.js';

function Message() {

      const { user, base_url } = useContext(Kalbela_AuthProvider);

      const { data: users = [], isLoading, error, refetch } = useQuery({
            queryKey: ["all_user", user._id],
            queryFn: async () => {
                  const res = await fetch(`${base_url}/chat/get-all-messaged-users?token=${user._id}&user_id=${user._id}`);
                  if (!res.ok) {
                        throw new Error("Failed to fetch candidate data");
                  }
                  const result = await res.json();
                  return result.data;
            },
            enabled: !!user._id && !!base_url,
      });


      const [selectedUser, setSelectedUser] = useState(null);

      useEffect(() => {
            if (users.length > 0) {
                  setSelectedUser(users[0]);
            }
      }, [users]);


      const { data: messages = [], isLoading: isMessagesLoading, error: messagesError, refetch: refetchMessages } = useQuery({
            queryKey: ["chat", user._id, selectedUser?.user_id],
            queryFn: async () => {
                  const res = await fetch(`${base_url}/chat/get-chat-by-user?token=${user._id}&to=${selectedUser?.user_id}&sender=${user._id}`);
                  if (!res.ok) {
                        throw new Error("Failed to fetch candidate data");
                  }
                  const result = await res.json();
                  return result.data;
            },
            enabled: !!user._id && !!base_url && !!selectedUser?.user_id,
      });


      const handleSendMessage = async (message) => {

            const newMessage = {
                  to: selectedUser.user_id,
                  sender: user._id,
                  content: message.text,
                  attachments: message.attachments?.length
                        ? await Promise.all(message.attachments.map(async (attachment) => uploadImage(attachment.file)))
                        : [],
                  audio: message.audio ? await upload_audio(message.audio) : null,
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
                        refetch();
                        refetchMessages();
                  });

            // setMessages(prevMessages => ({
            //       ...prevMessages,
            //       [selectedUser.id]: [...prevMessages[selectedUser.id], newMessage]
            // }));
      };




      return (
            <div className="flex bg-gray-900 ">
                  <div style={{ width: '320px' }}>
                        <Sidebar
                              users={users}
                              onSelectUser={setSelectedUser}
                              selectedUser={selectedUser}

                        />
                  </div>
                  <ChatArea
                        messages={messages}
                        selectedUser={selectedUser}
                        onSendMessage={handleSendMessage}
                        candidate={selectedUser}
                        refetch={refetchMessages}
                        isLoading={isMessagesLoading}
                  />
            </div>
      );
}

export default Message;
