import React, { useState } from 'react';
import { users, initialMessages } from '../../../utils/message_data.js';
import './style/chat.css';
import './style/messenger.css';
import './style/sidebar.css';
import Sidebar from './components/Sidebar.jsx';
import ChatArea from './components/ChatArea.jsx';

function Message() {
      const [selectedUser, setSelectedUser] = useState(users[0]);
      const [messages, setMessages] = useState(
            users.reduce((acc, user) => {
                  acc[user.id] = initialMessages.filter(msg => msg.sender === user.id || msg.sender === 'me');
                  return acc;
            }, {})
      );

      const handleSendMessage = (message) => {
            const newMessage = {
                  id: Date.now(),
                  sender: 'me',
                  content: message.text,
                  timestamp: new Date().toISOString(),
            };
            setMessages(prevMessages => ({
                  ...prevMessages,
                  [selectedUser.id]: [...prevMessages[selectedUser.id], newMessage]
            }));
      };

      return (
            <div className="chat-container h-[95vh] overflow-auto">
                  <div style={{ width: '320px' }}>
                        <Sidebar
                              users={users}
                              onSelectUser={setSelectedUser}
                              selectedUser={selectedUser}
                              messages={messages}
                        />
                  </div>
                  <ChatArea

                        messages={messages[selectedUser.id]}
                        selectedUser={selectedUser}
                        onSendMessage={handleSendMessage}
                  />
            </div>
      );
}

export default Message;
