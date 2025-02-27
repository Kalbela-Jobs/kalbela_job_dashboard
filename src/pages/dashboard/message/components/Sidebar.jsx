import React, { useState } from 'react';
import '../style/chat.css';
import '../style/messenger.css';
import '../style/sidebar.css';
import { Avatar } from 'antd';

function Sidebar({ users, onSelectUser, selectedUser }) {
      const [searchQuery, setSearchQuery] = useState('');
      const [activeFilter, setActiveFilter] = useState('all');

      console.log(users, "users");

      const filteredUsers = users.filter(user =>
            user.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user?.lastMessage?.split('\n').some(msg =>
                  msg.toLowerCase().includes(searchQuery.toLowerCase())
            )
      );

      return (
            <div className="sidebar-container text-white ">
                  <div className="message-header">
                        <h1 className="message-count ">Messages ({users.length})</h1>
                        <div className="py-2">
                              {['all', 'unread', 'groups', 'archived'].map(filter => (
                                    <button
                                          key={filter}
                                          className={`filter-button ${activeFilter === filter ? 'active' : ''}`}
                                          onClick={() => setActiveFilter(filter)}
                                    >
                                          {filter.charAt(0).toUpperCase() + filter.slice(1)}
                                    </button>
                              ))}
                        </div>
                        <div className="">
                              <input
                                    type="text"
                                    placeholder="Search messages..."
                                    className="search-bar"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                              />

                        </div>
                  </div>

                  <div className="chat-list mt-4">
                        {filteredUsers.map((user) => {
                              const isSelected = selectedUser?.user_id === user?.user_id;
                              const hasHTML = /<\/?[a-z][\s\S]*>/i.test(user.lastMessage);

                              return (
                                    <div
                                          key={user.user_id}
                                          className={`chat-item ${isSelected ? 'selected' : ''}`}
                                          onClick={() => onSelectUser(user)}
                                    >
                                          <Avatar
                                                src={user.profile_picture || undefined} // Ensures fallback works properly
                                                alt={user.fullName}
                                                className="avatar"
                                                style={{ width: 45, height: 45, borderRadius: "50%" }}
                                          >
                                                {!user.profile_picture && user.fullName?.charAt(0)} {/* Show first letter if no image */}
                                          </Avatar>
                                          <div className="chat-item-content group">
                                                <div className="chat-item-header">
                                                      <span className="chat-name  group-hover:text-black ">{user.fullName}</span>
                                                      {user.lastMessage && (
                                                            <span className="chat-time">
                                                                  {new Date(user.lastMessageTime).toLocaleTimeString([], {
                                                                        hour: '2-digit',
                                                                        minute: '2-digit'
                                                                  })}
                                                            </span>
                                                      )}
                                                </div>
                                                <div className="chat-preview">

                                                      {hasHTML ? (
                                                            <span dangerouslySetInnerHTML={{ __html: user.lastMessage }} />
                                                      ) : (
                                                            user.lastMessage ? user.lastMessage.split(' ').slice(0, 5).join(' ') : 'No messages yet'
                                                      )}
                                                </div>
                                          </div>
                                    </div>
                              );
                        })}
                  </div>
            </div>
      );
}

export default Sidebar;
